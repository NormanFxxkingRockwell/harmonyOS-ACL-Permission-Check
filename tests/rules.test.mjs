import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {initialState,scenes,evaluate,makeConfig,routeFor,compareVersions} from '../src/rules.js';
import {domains,domainFor} from '../src/domains.js';
import {renderResultsPanel} from '../src/results.js';
import {renderCoverage} from '../src/coverage.js';
const catalog=JSON.parse(await readFile(new URL('../data/permissions.json',import.meta.url),'utf8')).permissions;
const full=name=>'ohos.permission.'+name;
const run=(selected=[],extra={})=>evaluate({...initialState(),selected,...extra},catalog);
const names=result=>result.permissions.map(p=>p.name.replace('ohos.permission.','')).sort();
const extra=(names,profile={})=>run([],{extraPermissions:names.map(full),...profile});
const context=state=>({state,deviceNames:{Phone:'手机','PC/2in1':'电脑'},categoryNames:Object.fromEntries([...new Set(catalog.map(p=>p.category))].map(x=>[x,x])),grantLabel:p=>p.grant,sceneCount:scenes.length,catalogCount:290,domainCount:13});

test('目录完整覆盖290项未废弃权限和13领域',()=>{
 assert.equal(catalog.length,290);assert.equal(domains.length,13);
 assert.equal(new Set(catalog.map(p=>p.name)).size,290);
 for(const p of catalog){assert.ok(!p.deprecated);assert.ok(domains.some(d=>d.id===domainFor(p)));}
 for(const scene of scenes)for(const name of scene.permissions)assert.ok(catalog.some(p=>p.name===full(name)));
});
test('默认电脑，不再有API和资格规划输入状态',()=>{
 const state=initialState();assert.equal(state.device,'PC/2in1');
 for(const key of ['api','developerType','form','managedByMdm'])assert.ok(!(key in state));
});
test('网络、相机和录音按所选功能映射并去重',()=>{
 assert.deepEqual(names(run(['internet'])),['INTERNET']);
 assert.deepEqual(names(run(['photo','video'])),['CAMERA']);
 assert.deepEqual(names(run(['photo','video'],{videoAudio:true})),['CAMERA','MICROPHONE']);
 assert.equal(run(['photo','video']).permissions[0].sceneIds.length,2);
 assert.deepEqual(names(run([],{videoAudio:true,accuracy:'precise',background:'permission'})),[]);
});
test('系统替代做法不删除所选权限',()=>{
 const result=run(['photo-picker','photo-save','audio-picker','contacts-picker','paste-control']);
 assert.deepEqual(names(result),['READ_AUDIO','READ_CONTACTS','READ_IMAGEVIDEO','READ_PASTEBOARD','WRITE_IMAGEVIDEO']);
 assert.equal(makeConfig(result).moduleFragment.module.requestPermissions.length,5);
 const html=renderResultsPanel(result,context({...initialState(),selected:[]}));
 for(const p of result.permissions)assert.ok(html.includes(p.name));
 for(const link of ['photoaccesshelper-savebutton','photoaccesshelper-photoviewpicker','contacts-intro','pastebutton'])assert.ok(html.includes(link));
 assert.ok(html.includes('官方提供的其他实现方式'));
});
test('取消场景移除权限，多来源仍只出现一次',()=>{
 assert.ok(!names(run(['photo-picker'])).includes('WRITE_IMAGEVIDEO'));
 const result=run(['photo-picker','photo-bulk']);assert.equal(result.permissions.length,1);assert.equal(result.permissions[0].sceneIds.length,2);
});
test('单纯播放、自身通知和明确文件选择不增加无关权限',()=>{
 const result=run(['audio-play','notification','files-picker']);assert.equal(result.permissions.length,0);assert.equal(result.alternatives.length,3);
});
test('设备、主体和历史API不再用于排除开发者所选权限',()=>{
 for(const profile of [{type:'normal',device:'Phone',api:'9'},{type:'enterprise',device:'TV'},{type:'mdm',device:'PC/2in1'}]){
  const result=extra(['DLP_POLICY_MANAGER','ENTERPRISE_ACCESS_DLP_FILE','GET_WIFI_LOCAL_MAC','SUBSCRIBE_NOTIFICATION'],profile);
  assert.equal(result.permissions.length,4);
  assert.equal(makeConfig(result).moduleFragment.module.requestPermissions.length,4);
  for(const p of result.permissions){assert.ok(!('blocks' in p));assert.ok(!('eligible' in p));}
 }
});
test('申请路径按官方类别与公开条目例外区分，不仅看normal等级',()=>{
 assert.equal(routeFor(catalog.find(p=>p.name===full('INTERNET'))),'direct');
 assert.equal(routeFor(catalog.find(p=>p.name===full('CAMERA'))),'direct');
 for(const name of ['FILE_ACCESS_PERSIST','READ_WRITE_DOWNLOAD_DIRECTORY','READ_WRITE_DOCUMENTS_DIRECTORY','WRITE_IMAGEVIDEO'])assert.equal(routeFor(catalog.find(p=>p.name===full(name))),'acl');
 assert.equal(routeFor(catalog.find(p=>p.name===full('DLP_POLICY_MANAGER'))),'enterprise');
 assert.equal(routeFor(catalog.find(p=>p.name===full('ENTERPRISE_INSTALL_BUNDLE'))),'mdm');
});
test('用户授权和手动设置声明均包含reason和usedScene资源',()=>{
 const config=makeConfig(run(['photo','control-device','internet']));
 assert.equal(config.moduleFragment.module.requestPermissions.length,3);
 for(const name of ['CAMERA','CONTROL_DEVICE']){
  const item=config.moduleFragment.module.requestPermissions.find(p=>p.name===full(name));
  assert.ok(item.usedScene);assert.ok(config.stringFragment.string.some(s=>'$string:'+s.name===item.reason));
 }
});
test('媒体位置与图库权限同选合并授权用途，不增加设备定位',()=>{
 const result=extra(['READ_IMAGEVIDEO','MEDIA_LOCATION']);
 assert.ok(!names(result).includes('LOCATION'));
 assert.ok(makeConfig(result).stringFragment.string.some(p=>p.value.includes('地理位置信息')));
});
test('全部所选权限均保留，配置只按官方声明类型分组',()=>{
 const result=run([],{extraPermissions:catalog.map(p=>p.name)});assert.equal(result.permissions.length,290);
 const config=makeConfig(result);
 assert.equal(config.binaryPermissions.length,3);assert.equal(config.valuePermissions.length,1);
 const represented=[...config.moduleFragment.module.requestPermissions,...config.binaryPermissions,...config.valuePermissions];
 assert.equal(represented.length,290);assert.equal(new Set(represented.map(p=>p.name)).size,290);
 assert.ok(config.moduleFragment.module.requestPermissions.some(p=>p.name===full('RUN_DYN_CODE')));
 for(const item of config.moduleFragment.module.requestPermissions.filter(p=>p.reason))assert.ok(config.stringFragment.string.some(s=>'$string:'+s.name===item.reason));
});
test('自动版本计算随选择升降并按数字分段比较',()=>{
 assert.equal(extra(['INTERNET']).compatibility.minimumApi,'9');
 assert.equal(extra(['INTERNET','USE_FLOAT_BALL']).compatibility.minimumApi,'26.0.0');
 assert.equal(extra(['EXEC_PUBLIC_CLI_TOOL','USE_FLOAT_BALL']).compatibility.minimumApi,'26.0.1');
 assert.equal(extra(['INTERNET']).compatibility.minimumApi,'9');
 assert.equal(run().compatibility.minimumApi,null);
 assert.equal(compareVersions('26.0.1','26.0.0'),1);assert.equal(compareVersions('9','10'),-1);
});
test('API计算保留明确设备版本，移除工具自定API15门槛',()=>{
 assert.equal(extra(['SET_WINDOW_TRANSPARENT'],{device:'Tablet'}).compatibility.minimumApi,'23');
 assert.equal(extra(['CUSTOM_SCREEN_CAPTURE'],{device:'Phone'}).compatibility.minimumApi,'21');
 assert.equal(extra(['FILE_GUARD_MANAGER'],{type:'enterprise'}).compatibility.minimumApi,'14');
 assert.equal(extra(['FILE_GUARD_MANAGER'],{type:'mdm'}).compatibility.minimumApi,'10');
});
test('结果展示官网资料与申请分类，没有自拟资格判定和复核模板',()=>{
 const state={...initialState(),selected:['internet','dlp-policy','photo-save']};
 const html=renderResultsPanel(evaluate(state,catalog),context(state));
 for(const text of ['官网申请','直接声明','官方条目说明','官方条目 ↗'])assert.ok(html.includes(text));
 for(const text of ['条件待满足','不符合','需核对','已核对独立能力','未发现明确','保守按','不代表已获批','权限之间的关联'])assert.ok(!html.includes(text),text);
});
test('完整能力页无需额外确认或资格提醒',()=>{
 const html=renderCoverage({...initialState(),extraPermissions:[full('GET_NETWORK_INFO')]},catalog,{domain:'network',search:'GET_NETWORK_INFO',mode:'all'});
 for(const text of ['data-qualification','申请条件确认','不代表已经获得'])assert.ok(!html.includes(text));
 assert.ok(html.includes('checked'));assert.ok(html.includes('直接声明'));
});
