import { keywordsA } from './search-keywords-a.js';
import { keywordsB } from './search-keywords-b.js';
import { permissionCopy } from './scenario-copy.js';

export const permissionKeywords = {...keywordsA,...keywordsB};
const normalize = value => String(value??'').normalize('NFKC').toLowerCase().replace(/[\s._\-—/]+/g,'');
const aliases = [
 ['网络','联网','上网','互联网'],['WiFi','Wi-Fi','无线网','无线网络','WLAN'],
 ['蓝牙','Bluetooth'],['管理','管控','控制'],['读取','查看','获取'],['DLP','文件保护','文件防泄漏','数据防泄漏'],
 ['加密','解密'],['定位','位置','GPS','经纬度'],
 ['相机','摄像头','拍照'],['麦克风','话筒','录音'],
 ['联系人','通讯录','电话本'],['剪贴板','剪切板','复制粘贴','粘贴'],
 ['录屏','屏幕录制','屏幕共享'],['截图','截屏','屏幕截图'],
 ['悬浮窗','悬浮窗口','小窗'],['通知','消息通知'],['设备管理','MDM','企业管控']
].map(group=>group.map(normalize));
const variants = value => {
 const term=normalize(value);
 return [...new Set([term,...aliases.filter(group=>group.includes(term)).flat()])];
};
export function keywordsFor(permission) {
 const keywords=permissionKeywords[permission.name];
 if(!keywords)throw new Error(`Missing search keywords: ${permission.name}`);
 return keywords;
}
export function matchesTopic(permission,topic) {
 if(!topic)return true;
 const terms=variants(topic);
 return keywordsFor(permission).some(keyword=>terms.includes(normalize(keyword)));
}
const indexes=new WeakMap();
function indexFor(permission) {
 if(indexes.has(permission))return indexes.get(permission);
 const copy=permissionCopy(permission);
 const index={name:normalize(permission.name),short:normalize(permission.name.replace('ohos.permission.','')),
  keywords:keywordsFor(permission).map(normalize),purpose:normalize(`${permission.description} ${copy.question} ${copy.example}`),
  details:normalize(permission.details)};
 indexes.set(permission,index);return index;
}
const words=[...new Set([...Object.values(permissionKeywords).flat(),...aliases.flat()])].map(normalize).filter(word=>word.length>=2).sort((a,b)=>b.length-a.length);
function splitKnownQuery(query) {
 let rest=normalize(query);const found=[];
 for(const word of words){
  if(rest.includes(word)){found.push(word);rest=rest.split(word).join(' ');}
 }
 rest=rest.replace(/查询|搜索|查找|权限|相关|需要|功能|使用|的/g,' ');
 const remaining=rest.trim().split(/\s+/).filter(Boolean);
 return found.length?[...found,...remaining].map(variants):[];
}
function rankPermissions(filtered,tokens) {
 return filtered.map((permission,order)=>{
  const i=indexFor(permission);
  const scores=tokens.map(terms=>Math.max(...terms.map(term=>{
   if(i.keywords.includes(term))return 300;
   if(i.name.includes(term))return 180;
   if(i.purpose.includes(term))return 100;
   if(i.keywords.some(keyword=>keyword.includes(term)))return 60;
   return 0;
  })));
  return {permission,order,score:scores.every(Boolean)?scores.reduce((a,b)=>a+b,0):0};
 }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.order-b.order).map(item=>item.permission);
}
export function searchPermissions(catalog,query='',options={}) {
 const filtered=catalog.filter(p=>(!options.category||options.category==='all'||p.category===options.category)&&matchesTopic(p,options.topic));
 if(!query.trim())return filtered;
 const exact=normalize(query.trim());
 const named=filtered.filter(p=>{const i=indexFor(p);return i.name===exact||i.short===exact;});
 if(named.length)return named;
 const tokens=query.trim().split(/[\s,，、;；]+/).filter(Boolean).map(variants);
 const ranked=rankPermissions(filtered,tokens);
 if(ranked.length)return ranked;
 if(/[\u4e00-\u9fff]/.test(query)){
  const parts=splitKnownQuery(query);
  if(parts.length){const broader=rankPermissions(filtered,parts);if(broader.length)return broader;}
 }
 return filtered.filter(p=>tokens.every(terms=>terms.some(term=>indexFor(p).details.includes(term))));
}
export const popularTopics=['蓝牙','网络','WiFi','相机','麦克风','定位','文件','加密','DLP','通讯录','通知','设备管理'];
