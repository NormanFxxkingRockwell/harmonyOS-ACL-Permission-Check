import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {permissionNotices,newSelectionNotices} from '../src/selection-notices.js';
import {initialState,evaluate} from '../src/rules.js';
import {selectTemplate} from '../src/templates.js';
const catalog=JSON.parse(await readFile(new URL('../data/permissions.json',import.meta.url),'utf8')).permissions;
const get=name=>catalog.find(p=>p.name==='ohos.permission.'+name);
const state=initialState();

test('企业与MDM权限按分发类型提醒，受限开放不误判为企业权限',()=>{
 const enterprise=get('DLP_POLICY_MANAGER'),mdm=get('ENTERPRISE_ACCESS_DLP_FILE');
 assert.equal(permissionNotices(enterprise,state).length,1);
 assert.deepEqual(permissionNotices(enterprise,{...state,type:'enterprise'}),[]);
 assert.deepEqual(permissionNotices(enterprise,{...state,type:'mdm'}),[]);
 for(const type of ['normal','enterprise'])assert.equal(permissionNotices(mdm,{...state,type}).length,1);
 assert.deepEqual(permissionNotices(mdm,{...state,type:'mdm'}),[]);
 assert.deepEqual(permissionNotices(get('READ_WRITE_DESKTOP_DIRECTORY'),state),[]);
});

test('明确设备范围不匹配才提醒，未知范围和General不生成推断',()=>{
 assert.equal(permissionNotices(get('DLP_POLICY_MANAGER'),{...state,type:'enterprise',device:'Phone'})[0].kind,'device');
 assert.deepEqual(permissionNotices(get('DLP_POLICY_MANAGER'),{...state,type:'enterprise'}),[]);
 assert.deepEqual(permissionNotices(get('INTERNET'),{...state,device:'Phone'}),[]);
 assert.deepEqual(permissionNotices({...get('INTERNET'),devices:'General'},state),[]);
 assert.deepEqual(permissionNotices({...get('INTERNET'),devices:'2in1'},state),[]);
 for(const device of ['Phone','Tablet'])assert.deepEqual(permissionNotices(get('CRYPTO_EXTENSION_REGISTER'),{...state,device}),[]);
});

test('只提醒新出现的不匹配，模板合并且不移除所选权限；切换设备或分发类型也检查',()=>{
 const dlp=selectTemplate(state,'enterprise-dlp');const permissions=evaluate(dlp,catalog).permissions;
 const notices=newSelectionNotices(state,dlp,[],permissions);
 assert.equal(notices.length,3);assert.equal(permissions.length,8);
 assert.deepEqual(newSelectionNotices(dlp,dlp,permissions,permissions),[]);
 const enterprise={...dlp,type:'enterprise'};
 assert.deepEqual(newSelectionNotices(dlp,enterprise,permissions,permissions),[]);
 assert.equal(newSelectionNotices(enterprise,dlp,permissions,permissions).length,3);
 assert.ok(newSelectionNotices(dlp,{...dlp,device:'Phone'},permissions,permissions).some(item=>item.notices.some(n=>n.kind==='device')));
 assert.deepEqual(newSelectionNotices(dlp,state,permissions,[]),[]);
});
