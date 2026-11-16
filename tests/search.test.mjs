import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {permissionKeywords,keywordsFor,searchPermissions,matchesTopic} from '../src/search-index.js';
import {renderLibrary,renderLibraryResults} from '../src/library.js';
import {bindSearchInputs} from '../src/search-input.js';
const catalog=JSON.parse(await readFile(new URL('../data/permissions.json',import.meta.url),'utf8')).permissions;
const names=rows=>rows.map(p=>p.name).sort();
const full=n=>'ohos.permission.'+n;

test('290项权限都有逐项通俗关键词，没有漏项、多余项或空标签',()=>{
 assert.deepEqual(Object.keys(permissionKeywords).sort(),catalog.map(p=>p.name).sort());
 for(const p of catalog){
  const tags=keywordsFor(p);assert.ok(tags.length>=3&&tags.length<=7,p.name);
  assert.equal(new Set(tags).size,tags.length,p.name);
  assert.ok(tags.every(t=>t.trim()===t&&t.length>0),p.name);
  assert.ok(tags.filter(t=>/[\u4e00-\u9fff]/.test(t)).length>=2,p.name);
 }
});
test('中文常用词和英文别名可查到对应能力',()=>{
 assert.deepEqual(names(searchPermissions(catalog,'蓝牙')),names(searchPermissions(catalog,'Bluetooth')));
 assert.deepEqual(names(searchPermissions(catalog,'Wi-Fi')),names(searchPermissions(catalog,'无线网络')));
 assert.deepEqual(names(searchPermissions(catalog,'剪贴板')),names(searchPermissions(catalog,'剪切板')));
 for(const [term,permission] of [['联网','INTERNET'],['定位','LOCATION'],['加密','DLP_POLICY_MANAGER'],['DLP','ENTERPRISE_ACCESS_DLP_FILE'],['通讯录','READ_CONTACTS'],['文档文件夹','READ_WRITE_DOCUMENTS_DIRECTORY']])assert.ok(searchPermissions(catalog,term).some(p=>p.name===full(permission)),term);
 assert.ok(!searchPermissions(catalog,'加密').some(p=>p.name===full('ENTERPRISE_SET_WALLPAPER')));
});
test('完整或简写权限名精确定位，不被泛化关键词淹没',()=>{
 assert.deepEqual(names(searchPermissions(catalog,'ohos.permission.ACCESS_BIOMETRIC')),[full('ACCESS_BIOMETRIC')]);
 assert.deepEqual(names(searchPermissions(catalog,'internet')),[full('INTERNET')]);
 assert.deepEqual(names(searchPermissions(catalog,'kernel.NET_RAW')),[full('kernel.NET_RAW')]);
});
test('多词、关键词分类和官方分类可以共同筛选',()=>{
 assert.ok(searchPermissions(catalog,'蓝牙管理').some(p=>p.name===full('ENTERPRISE_MANAGE_BLUETOOTH')));
 assert.ok(searchPermissions(catalog,'读取文档文件夹').some(p=>p.name===full('READ_WRITE_DOCUMENTS_DIRECTORY')));
 assert.ok(searchPermissions(catalog,'加密权限').some(p=>p.name===full('DLP_POLICY_MANAGER')));
 const bluetooth=searchPermissions(catalog,'蓝牙 管理');assert.ok(bluetooth.some(p=>p.name===full('ENTERPRISE_MANAGE_BLUETOOTH')));
 const encrypted=searchPermissions(catalog,'DLP 加密');assert.ok(encrypted.some(p=>p.name===full('DLP_POLICY_MANAGER')));assert.ok(!encrypted.some(p=>p.name===full('DLP_GET_HIDE_STATUS')));
 const filtered=searchPermissions(catalog,'',{topic:'蓝牙',category:'受限开放权限'});
 assert.ok(filtered.length>0);assert.ok(filtered.every(p=>p.category==='受限开放权限'&&matchesTopic(p,'蓝牙')));
 assert.equal(searchPermissions(catalog,'').length,290);
 assert.equal(searchPermissions(catalog,'不存在的权限xyz123').length,0);
});
test('资料库显示可点击的通俗词，并安全处理搜索内容',()=>{
 const ui={search:'蓝牙',filter:'all',topic:'',checkedOn:'2026-11-13',categoryNames:{},grantLabel:p=>p.grant};
 const html=renderLibrary(catalog,ui);
 assert.ok(html.includes('data-topic="蓝牙"'));assert.ok(html.includes('aria-label="搜索权限"'));
 assert.ok(!html.includes('maxlength='));
 assert.ok(renderLibraryResults(catalog,ui).includes('ohos.permission.ACCESS_BLUETOOTH'));
 const unsafe=renderLibrary(catalog,{...ui,search:'"><script>alert(1)</script>'});
 assert.ok(!unsafe.includes('<script>'));
});
test('中文组词期间不触发搜索，确认候选字后提交完整中文',()=>{
 const root=new EventTarget();root.id='search';root.value='';
 const values=[];bindSearchInputs(root,{search:value=>values.push(value)});
 root.dispatchEvent(new Event('compositionstart'));
 root.value='ding';const composing=new Event('input');Object.defineProperty(composing,'isComposing',{value:true});root.dispatchEvent(composing);
 root.value='定位';root.dispatchEvent(new Event('input'));assert.deepEqual(values,[]);
 root.dispatchEvent(new Event('compositionend'));assert.deepEqual(values,['定位']);
 root.value='相机';root.dispatchEvent(new Event('input'));assert.deepEqual(values,['定位','相机']);
});
