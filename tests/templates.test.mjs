import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {initialState,evaluate} from '../src/rules.js';
import {selectTemplate,renderTemplateChoices} from '../src/templates.js';
const catalog=JSON.parse(await readFile(new URL('../data/permissions.json',import.meta.url),'utf8')).permissions;
const names=state=>evaluate(state,catalog).permissions.map(p=>p.name);

test('默认不用模板；DLP模板只预选实际控制面权限，切换不改变分发类型或设备',()=>{
 const state=initialState();assert.equal(state.template,'none');assert.deepEqual(names(state),[]);
 const dlp=selectTemplate(state,'enterprise-dlp');
 assert.deepEqual(names(dlp),['ohos.permission.DLP_POLICY_MANAGER']);
 assert.equal(dlp.type,state.type);assert.equal(dlp.device,state.device);
 assert.deepEqual(names(selectTemplate(dlp,'none')),[]);
 const html=renderTemplateChoices(state);
 assert.ok(html.includes('name="template" value="none" checked'));
 assert.ok(html.includes('开发者自行根据业务场景选择权限'));assert.ok(!html.includes('<select'));
});

test('切换模板保留手动选择，模板与手动重复选择不重复且不会误删',()=>{
 const base={...initialState(),selected:['internet','dlp-policy'],extraPermissions:['ohos.permission.GET_NETWORK_INFO']};
 const dlp=selectTemplate(base,'enterprise-dlp');
 assert.deepEqual(dlp.templateScenes,[]);
 const none=selectTemplate(dlp,'none');
 assert.deepEqual(none.selected,base.selected);assert.deepEqual(none.extraPermissions,base.extraPermissions);
 assert.equal(names(none).filter(name=>name.endsWith('.DLP_POLICY_MANAGER')).length,1);
});

test('模板可作为起点继续增删；取消的场景不会被求值或缓存恢复自动加回',()=>{
 const dlp=selectTemplate(initialState(),'enterprise-dlp');
 const adjusted={...dlp,selected:['internet'],templateScenes:[]};
 assert.deepEqual(names(JSON.parse(JSON.stringify(adjusted))),['ohos.permission.INTERNET']);
 assert.deepEqual(names(selectTemplate(adjusted,'none')),['ohos.permission.INTERNET']);
 assert.deepEqual(names(selectTemplate(selectTemplate(adjusted,'none'),'enterprise-dlp')).sort(),['ohos.permission.DLP_POLICY_MANAGER','ohos.permission.INTERNET']);
});
