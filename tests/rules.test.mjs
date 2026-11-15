import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { scenes, initialState, evaluate, makeConfig, compareVersions, routeFor } from '../src/rules.js';
import { domains, domainFor } from '../src/domains.js';
import { renderCoverage } from '../src/coverage.js';
import { renderResultsPanel } from '../src/results.js';
const catalog=JSON.parse(await readFile(new URL('../data/permissions.json',import.meta.url),'utf8')).permissions;
const run=(selected,extra={})=>evaluate({...initialState(),device:'Phone',selected,...extra},catalog);
const names=result=>result.permissions.map(p=>p.name.replace('ohos.permission.','')).sort();
test('仅访问互联网不会额外索取网络信息或Wi-Fi权限',()=>assert.deepEqual(names(run(['internet'])),['INTERNET']));
test('拍照、静音录像与有声录像区分麦克风，重复来源去重',()=>{
 assert.deepEqual(names(run(['photo','video'])),['CAMERA']);
 assert.deepEqual(names(run(['photo','video'],{videoAudio:true})),['CAMERA','MICROPHONE']);
 assert.equal(run(['photo','video'],{videoAudio:true}).permissions.find(p=>p.name.endsWith('.CAMERA')).sceneIds.length,2);
 assert.deepEqual(names(run(['record'],{videoAudio:false})),['MICROPHONE']);
});
test('选择功能保留对应权限，系统替代方案不自动删除权限',()=>{
 const selected=['photo-picker','audio-picker','photo-save','contacts-picker','paste-control'];
 const result=run(selected);
 assert.deepEqual(names(result),['READ_AUDIO','READ_CONTACTS','READ_IMAGEVIDEO','READ_PASTEBOARD','WRITE_IMAGEVIDEO']);
 assert.equal(result.alternatives.length,0);
 assert.ok(makeConfig(result).moduleFragment.module.requestPermissions.some(p=>p.name==='ohos.permission.WRITE_IMAGEVIDEO'));
 const html=renderResultsPanel(result,{state:{...initialState(),selected},deviceNames:{Phone:'手机','PC/2in1':'电脑'},categoryNames:{'受限开放权限':'受限开放'},routeNames:{acl:'官网申请'},grantLabel:()=>'',sceneCount:scenes.length,catalogCount:290,domainCount:13});
 for(const permission of result.permissions) assert.ok(html.includes(permission.name));
 assert.match(html,/也可不申请此权限/);
 assert.match(html,/photoaccesshelper-savebutton/);
 assert.match(html,/photoaccesshelper-photoviewpicker/);
 assert.match(html,/contacts-intro/);
 assert.match(html,/pastebutton/);
 const deselected=run(['photo-picker']);
 assert.ok(!names(deselected).includes('WRITE_IMAGEVIDEO'));
 const shared=run(['photo-picker','photo-bulk']);
 assert.equal(shared.permissions.length,1);
 assert.equal(shared.permissions[0].sceneIds.length,2);
});

test('单纯播放、自身通知和手选文档不凭空关联无关权限',()=>{
 const result=run(['audio-play','notification','files-picker']);
 assert.equal(result.permissions.length,0);
 assert.equal(result.alternatives.length,3);
});

test('精确定位必须包含模糊定位，长时任务和后台权限分别处理',()=>{
 assert.deepEqual(names(run(['location'])),['APPROXIMATELY_LOCATION']);
 assert.deepEqual(names(run(['location'],{accuracy:'precise',background:'permission'})),['APPROXIMATELY_LOCATION','LOCATION','LOCATION_IN_BACKGROUND']);
 assert.deepEqual(names(run(['location'],{background:'task'})),['APPROXIMATELY_LOCATION','KEEP_BACKGROUND_RUNNING']);
});
test('取消录像和定位场景不会泄漏其追问权限',()=>assert.deepEqual(names(run([],{videoAudio:true,accuracy:'precise',background:'permission'})),[]));
test('普通应用不能生成企业或MDM配置，企业普通仍不能使用MDM权限',()=>{
 const ordinary=run(['dlp-policy','dlp-file'],{device:'PC/2in1'});
 assert.ok(ordinary.permissions.every(p=>!p.eligible));assert.deepEqual(makeConfig(ordinary).moduleFragment.module.requestPermissions,[]);
 const enterprise=run(['dlp-policy','dlp-file'],{device:'PC/2in1',type:'enterprise'});
 assert.equal(enterprise.permissions.find(p=>p.name.endsWith('.DLP_POLICY_MANAGER')).eligible,true);
 assert.equal(enterprise.permissions.find(p=>p.name.endsWith('.ENTERPRISE_ACCESS_DLP_FILE')).eligible,false);
 assert.ok(run(['dlp-policy','dlp-file'],{device:'PC/2in1',type:'mdm'}).permissions.every(p=>p.eligible));
});
test('设备与历史开放版本限制排除配置',()=>{
 assert.equal(run(['screenshot'],{api:'20'}).permissions[0].eligible,false);
 assert.equal(run(['screenshot'],{api:'21'}).permissions[0].eligible,true);
 assert.equal(run(['screen-record'],{device:'TV',api:'24'}).permissions[0].eligible,false);
 assert.equal(run(['screen-record'],{device:'TV',api:'26.0.0'}).permissions[0].eligible,true);
 assert.equal(run(['download']).permissions[0].eligible,false);
 assert.equal(run(['dlp-file'],{type:'mdm',device:'PC/2in1',api:'20'}).permissions[0].eligible,false);
});
test('normal等级例外仍提示官网申请',()=>{
 for(const suffix of ['FILE_ACCESS_PERSIST','READ_WRITE_DOWNLOAD_DIRECTORY','READ_WRITE_DOCUMENTS_DIRECTORY']){
  const p=catalog.find(p=>p.name.endsWith('.'+suffix));assert.equal(p.level,'normal');assert.equal(routeFor(p),'acl');
 }
});
test('用户授权声明含资源引用和实际理由，手动设置权限单独处理',()=>{
 const config=makeConfig(run(['photo','video','internet'],{videoAudio:true}));
 assert.equal(config.moduleFragment.module.requestPermissions.length,3);
 assert.equal(config.stringFragment.string.length,2);
 for(const p of config.moduleFragment.module.requestPermissions.filter(p=>p.reason))assert.ok(config.stringFragment.string.some(s=>p.reason==='$string:'+s.name));
 const manual=run(['control-device'],{device:'PC/2in1'}).permissions[0];assert.match(manual.grant,/manual_settings/);assert.equal(manual.route,'acl');
});
test('所有场景映射存在且不包含废弃项',()=>{
 assert.equal(new Set(catalog.map(p=>p.name)).size,catalog.length);
 assert.ok(catalog.every(p=>!p.deprecated));
 assert.ok(!catalog.some(p=>['ohos.permission.READ_MEDIA','ohos.permission.WRITE_MEDIA'].includes(p.name)));
 for(const s of scenes)for(const p of s.permissions)assert.ok(catalog.some(row=>row.name==='ohos.permission.'+p),`${s.id}: ${p}`);
 evaluate({...initialState(),selected:scenes.map(s=>s.id),videoAudio:true,accuracy:'precise',background:'permission',contactsWrite:true},catalog);
});
test('新版 API 按分段数字比较而非字符串比较',()=>{
 assert.equal(compareVersions('26.0.1','26.0.0'),1);assert.equal(compareVersions('9','10'),-1);assert.equal(compareVersions('26','26.0.0'),0);
});
test('290项未废弃权限逐项归属13个能力领域，未知权限需人工归类',()=>{
 assert.equal(catalog.length,290);
 assert.equal(domains.length,13);
 for(const permission of catalog)assert.ok(domains.some(domain=>domain.id===domainFor(permission)),permission.name);
 assert.throws(()=>domainFor('ohos.permission.UNKNOWN_NEW_PERMISSION'),/reviewed business domain/);
});
test('补充开放能力无需额外确认，仍按官方条件检查资格',()=>{
 for(const name of ['GET_NETWORK_INFO','PRINT','CAMERA']){
  const full='ohos.permission.'+name;
  const result=run([],{extraPermissions:[full]});
  assert.equal(result.permissions[0].eligible,true,name);
  assert.ok(makeConfig(result).moduleFragment.module.requestPermissions.some(p=>p.name===full));
 }
 const restricted=['ohos.permission.ENTERPRISE_INSTALL_BUNDLE'];
 assert.equal(run([],{extraPermissions:restricted}).permissions[0].eligible,false);
 const deviceRestricted=run([],{extraPermissions:['ohos.permission.PRINT'],device:'Car'});
 assert.equal(deviceRestricted.permissions[0].eligible,false);
});
test('全量入口的精确与后台定位自动补齐前台模糊权限',()=>{
 assert.deepEqual(names(run([],{extraPermissions:['ohos.permission.LOCATION']})),['APPROXIMATELY_LOCATION','LOCATION']);
 assert.deepEqual(names(run([],{extraPermissions:['ohos.permission.LOCATION_IN_BACKGROUND']})),['APPROXIMATELY_LOCATION','LOCATION_IN_BACKGROUND']);
});
test('仅系统、二进制专用与需额外value的权限不会生成无效HAP声明',()=>{
 const extraPermissions=['RUN_DYN_CODE','kernel.IGNORE_LIBRARY_VALIDATION','kernel.EXEMPT_ANONYMOUS_EXECUTABLE_MEMORY','INHERIT_PARENT_PERMISSION','ACCESS_DDK_DRIVERS'].map(p=>'ohos.permission.'+p);
 const result=run([],{extraPermissions,confirmedQualifications:extraPermissions,device:'PC/2in1',api:'26.0.1'});
 assert.ok(result.permissions.every(p=>!p.eligible));assert.equal(makeConfig(result).moduleFragment.module.requestPermissions.length,0);
});
test('企业开发者主体与企业分发类型分开校验',()=>{
 const extraPermissions=['ohos.permission.SUBSCRIBE_NOTIFICATION'];
 assert.equal(run([],{extraPermissions,confirmedQualifications:extraPermissions,type:'enterprise'}).permissions[0].eligible,false);
 assert.equal(run([],{extraPermissions,confirmedQualifications:extraPermissions,developerType:'enterprise'}).permissions[0].eligible,true);
});
test('历史开放版本、MDM资格和设备范围仍作用于全量选择',()=>{
 for(const [short,extra] of [['MANAGE_INPUT_INFRARED_EMITTER',{api:'15'}],['GET_NETWORK_STATS',{type:'normal'}],['SET_WINDOW_TRANSPARENT',{device:'Tablet',api:'22'}],['GET_WIFI_LOCAL_MAC',{device:'TV'}]]){
  const extraPermissions=['ohos.permission.'+short];
  assert.equal(run([],{extraPermissions,confirmedQualifications:extraPermissions,...extra}).permissions[0].eligible,false,short);
 }
});
test('所有290能力均可独立选择并说明结果；配置条目不丢失资源引用',()=>{
 for(const permission of catalog){
  const result=run([],{extraPermissions:[permission.name],confirmedQualifications:[permission.name],type:'mdm',developerType:'enterprise',device:'PC/2in1',api:'26.0.1'});
  assert.ok(result.permissions.some(p=>p.name===permission.name),permission.name);
  const config=makeConfig(result);
  for(const item of config.moduleFragment.module.requestPermissions.filter(p=>p.reason))assert.ok(config.stringFragment.string.some(s=>item.reason==='$string:'+s.name));
 }
});
test('结果按分类区域展示，配置及资源文案默认折叠',()=>{
 const state={...initialState(),selected:['internet','photo']};
 const result=evaluate(state,catalog);
 const html=renderResultsPanel(result,{state,deviceNames:{Phone:'手机'},categoryNames:{'开放权限（系统授权）':'系统授权','开放权限（用户授权）':'用户授权'},routeNames:{direct:'直接声明'},grantLabel:()=>'',sceneCount:40,catalogCount:290,domainCount:13});
 assert.equal((html.match(/class="result-region"/g)||[]).length,2);
 assert.match(html,/<table class="permission-table">/);
 assert.match(html,/<details class="config-panel">/);
 assert.match(html,/<details class="resource-panel">/);
 assert.ok(!html.includes('result-side'));
 assert.ok(!html.includes('企业设备提示：'));
 assert.ok(!html.includes('data-mdm-group'));
 assert.ok(!html.includes('免弹窗授权方案'));
 assert.ok(!html.includes('权限之间的关联'));
 assert.ok(!html.includes('关联 1 条'));
});

test('完整能力核对页不展示额外申请条件确认入口',()=>{
 const html=renderCoverage({...initialState(),extraPermissions:['ohos.permission.GET_NETWORK_INFO']},catalog,{domain:'network',search:'GET_NETWORK_INFO',mode:'all'});
 assert.ok(!html.includes('data-qualification'));
 assert.ok(!html.includes('申请条件确认'));
 assert.match(html,/直接声明/);
});
