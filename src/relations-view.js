import { relationDefinitions, permissionReview } from './relations-data.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const typeNames={requires:'必须配套',conditional:'按接口或场景判断',alternative:'可选替代路径',scope:'能力范围不同',authorization:'授权流程例外'};

export function renderRelationshipDetails(name) {
  const facts=relationDefinitions.filter(relation=>relation.permissions.includes(name));
  const review=permissionReview.find(permission=>permission.name===name);
  return `<section class="detail-relations"><h3>关联核对 ${facts.length?`· ${facts.length}条`:''}</h3>${review?`<p>${escape(review.note)}</p>`:''}${facts.map(relation=>`<details><summary>${escape(relation.title)} <small>${typeNames[relation.type]}</small></summary><p>${escape(relation.description)}</p><a href="${escape(relation.source)}" target="_blank" rel="noopener noreferrer">官方依据 ↗</a></details>`).join('')}</section>`;
}

export function renderRelationships(result) {
  const relationships=result.relationships||[];
  if(!relationships.length)return '';
  return `<section class="result-region relations-region"><div class="region-header"><div><h2>权限之间的关联<span class="region-count">本方案 ${relationships.length} 条</span></h2><p>已逐项复核${permissionReview.length}项、记录${relationDefinitions.length}条关系。只自动补齐明确的前置，不把同组和接口可选项无条件联选。</p></div></div><div class="relationship-groups">${Object.entries(typeNames).map(([type,title])=>{
    const rows=relationships.filter(relation=>relation.type===type);if(!rows.length)return '';
    return `<details class="relationship-type" ${type==='requires'?'open':''}><summary>${title}<span>${rows.length}条</span></summary><div>${rows.map(relation=>`<article class="relationship-fact"><div><h3>${escape(relation.title)}</h3><span class="relation-confidence">${relation.confidence==='api-specific'?'接口特定':'官方条目/指南'}</span></div><p>${escape(relation.description)}</p><div class="relation-permissions">${relation.selectedPermissions.map(name=>`<button data-detail="${name}">${escape(name.replace('ohos.permission.',''))}</button>`).join('')}<a href="${escape(relation.source)}" target="_blank" rel="noopener noreferrer">官方依据 ↗</a></div></article>`).join('')}</div></details>`;
  }).join('')}</div></section>`;
}

export function renderMdmPlan(result) {
  const plan=result.authorizationPlan;
  if(!plan?.enabled)return '';
  return `<section class="result-region mdm-plan"><div class="region-header"><div><h2>MDM授权部署计划<span class="tag">不是已授权状态</span></h2><p>同组以目标应用实际声明的成员为单位设置；选择管理权限本身不会触发静默授权。</p></div><button class="text-button" data-step="0">修改部署环境</button></div><div class="mdm-plan-content"><div class="mdm-controller-note"><strong>管控端需要</strong><code>${plan.controllerPermission}</code><p>该权限由有资格且已激活的MDM管理端持有，不自动加入被管理业务App的声明。</p></div>${plan.contextProblems.length?`<div class="mini-warning">${plan.contextProblems.map(escape).join(' ')}</div>`:''}
  ${plan.groups.length?`<div class="mdm-groups">${plan.groups.map(group=>`<div class="mdm-group"><div><h3>${escape(group.title)}</h3><p>${group.permissions.map(name=>escape(name.replace('ohos.permission.',''))).join('、')}</p>${group.problems.length?`<small>${group.problems.map(escape).join(' ')}</small>`:''}</div><label><span>部署策略</span><select class="input" data-mdm-group="${escape(group.id)}" ${!group.mappingConfirmed||plan.contextProblems.length?'disabled':''} aria-label="${escape(group.title)}的MDM策略"><option value="DEFAULT" ${group.requestedState==='DEFAULT'?'selected':''}>DEFAULT · 由用户授权</option><option value="GRANTED" ${group.requestedState==='GRANTED'?'selected':''}>GRANTED · 计划静默授予</option><option value="DENIED" ${group.requestedState==='DENIED'?'selected':''}>DENIED · 计划静默拒绝</option></select></label></div>`).join('')}</div>`:'<p class="mdm-empty">当前清单没有user_grant权限，此策略不影响系统授权或手动设置类权限。</p>'}
  <details class="mdm-requirements"><summary>下发策略前必须满足的条件</summary><ul>${plan.requirements.map(item=>`<li>${escape(item)}</li>`).join('')}</ul></details><div class="mdm-plan-footer"><span>这里只生成部署计划；实际授权以目标应用实例、设备和接口返回结果为准。</span>${plan.policies.length?'<button class="copy-button" data-copy="mdm">复制策略计划</button>':''}<a href="${plan.source}" target="_blank" rel="noopener noreferrer">官方管理接口 ↗</a></div></div></section>`;
}
