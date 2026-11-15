import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {initialState,evaluate} from '../src/rules.js';
import {requirementEdges,normalAuthorization} from '../src/relations.js';
import {officialFacts,configKind} from '../src/official-info.js';
const catalog=JSON.parse(await readFile(new URL('../data/permissions.json',import.meta.url),'utf8')).permissions;
const full=n=>'ohos.permission.'+n;
const extra=names=>evaluate({...initialState(),extraPermissions:names.map(full)},catalog);
const normalize=s=>s.replace(/\r\n?/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
test('仅明确单向前置自动补齐，前置不会反向添加上层权限',()=>{
 for(const edge of requirementEdges){
  const source=edge.from.replace('ohos.permission.',''),target=edge.to.replace('ohos.permission.','');
  const result=extra([source]);assert.ok(result.permissions.some(p=>p.name===edge.to));
  assert.ok(!extra([target]).permissions.some(p=>p.name===edge.from));
 }
});
test('精确定位、后台定位与长时任务按所选方式声明',()=>{
 const run=overrides=>evaluate({...initialState(),selected:['location'],...overrides},catalog).permissions.map(p=>p.name).sort();
 assert.deepEqual(run({accuracy:'precise'}),[full('APPROXIMATELY_LOCATION'),full('LOCATION')]);
 assert.deepEqual(run({background:'permission'}),[full('APPROXIMATELY_LOCATION'),full('LOCATION_IN_BACKGROUND')]);
 assert.deepEqual(run({background:'task'}),[full('APPROXIMATELY_LOCATION'),full('KEEP_BACKGROUND_RUNNING')]);
});
test('290项官方说明均能提取，提取文字直接来自对应原文',()=>{
 for(const p of catalog)for(const fact of officialFacts(p))assert.ok(normalize(p.details).includes(normalize(fact.text)),p.name+':'+fact.label);
 const saved=catalog.find(p=>p.name===full('WRITE_IMAGEVIDEO'));
 assert.ok(officialFacts(saved).some(f=>f.text.includes('申请后立即通过')));
 const guard=catalog.find(p=>p.name===full('FILE_GUARD_MANAGER'));
 assert.ok(officialFacts(guard).some(f=>f.text.includes('API 14')));
});
test('特殊声明类型只反映官方格式，不判定用户资格',()=>{
 assert.equal(catalog.filter(p=>configKind(p)==='binary').length,3);
 assert.equal(catalog.filter(p=>configKind(p)==='value').length,1);
 for(const p of catalog.filter(p=>configKind(p)==='binary'))assert.match(p.details,/二进制/);
});
test('生物认证权限查询不被描述为必须先验证身份',()=>{
 const p=catalog.find(p=>p.name===full('ACCESS_BIOMETRIC'));
 assert.equal(normalAuthorization(p,initialState()),'系统安装时授予');
 assert.match(normalAuthorization(catalog.find(p=>p.name===full('kernel.NET_RAW')),initialState()),/身份验证/);
});
