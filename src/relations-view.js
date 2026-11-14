import { relationDefinitions, permissionReview } from './relations-data.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const typeNames={requires:'这些权限要一起申请',conditional:'这些情况才需要',alternative:'也可以换一种做法',scope:'这些权限分别能做什么',authorization:'授权时还要注意什么'};

export function renderRelationshipDetails(name) {
  const facts=relationDefinitions.filter(relation=>relation.permissions.includes(name));
  const review=permissionReview.find(permission=>permission.name===name);
  return `<section class="detail-relations"><h3>关联核对 ${facts.length?`· ${facts.length}条`:''}</h3>${review?`<p>${escape(review.note)}</p>`:''}${facts.map(relation=>`<details><summary>${escape(relation.title)} <small>${typeNames[relation.type]}</small></summary><p>${escape(relation.description)}</p><a href="${escape(relation.source)}" target="_blank" rel="noopener noreferrer">官方依据 ↗</a></details>`).join('')}</section>`;
}

export function renderRelationships(result) {
  const relationships=result.relationships||[];
  if(!relationships.length)return '';
  return `<section class="result-region relations-region"><div class="region-header"><div><h2>权限之间的关联<span class="region-count">本方案 ${relationships.length} 条</span></h2><p>已逐项复核${permissionReview.length}项、记录${relationDefinitions.length}条关系。确实必须一起申请的权限会自动补上；其他情况请按实际功能判断。</p></div></div><div class="relationship-groups">${Object.entries(typeNames).map(([type,title])=>{
    const rows=relationships.filter(relation=>relation.type===type);if(!rows.length)return '';
    return `<details class="relationship-type" ${type==='requires'?'open':''}><summary>${title}<span>${rows.length}条</span></summary><div>${rows.map(relation=>`<article class="relationship-fact"><div><h3>${escape(relation.title)}</h3><span class="relation-confidence">${relation.confidence==='api-specific'?'接口特定':'官方条目/指南'}</span></div><p>${escape(relation.description)}</p><div class="relation-permissions">${relation.selectedPermissions.map(name=>`<button data-detail="${name}">${escape(name.replace('ohos.permission.',''))}</button>`).join('')}<a href="${escape(relation.source)}" target="_blank" rel="noopener noreferrer">官方依据 ↗</a></div></article>`).join('')}</div></details>`;
  }).join('')}</div></section>`;
}

export function renderMdmPlan(result) {
  const plan=result.authorizationPlan;
  if(!plan?.enabled)return '';
  return `<section class="result-region mdm-plan"><div class="region-header"><div><h2>免弹窗授权方案<span class="tag">待管理员配置</span></h2><p>选择哪些权限交给企业管理员统一允许或拒绝。例如：允许相机、禁止麦克风。同一组中，本应用申请的权限会一起设置。</p></div><button class="text-button" data-step="0">修改应用设置</button></div><div class="mdm-plan-content"><details class="mdm-controller-note"><summary>企业管理员如何配置？</summary><code>${plan.controllerPermission}</code><p>管理员需要通过已激活的设备管理应用配置。上面的管理权限属于管理应用，你的业务应用不必为了接受管理而添加它。</p></details>${plan.contextProblems.length?`<div class="mini-warning">${plan.contextProblems.map(escape).join(' ')}</div>`:''}
  ${plan.groups.length?`<div class="mdm-groups">${plan.groups.map(group=>`<div class="mdm-group"><div><h3>${escape(group.title)}</h3><p>${group.permissions.map(name=>escape(name.replace('ohos.permission.',''))).join('、')}</p>${group.problems.length?`<small>${group.problems.map(escape).join(' ')}</small>`:''}</div><label><span>希望如何授权？</span><select class="input" data-mdm-group="${escape(group.id)}" ${!group.mappingConfirmed||plan.contextProblems.length?'disabled':''} aria-label="${escape(group.title)}的MDM策略"><option value="DEFAULT" ${group.requestedState==='DEFAULT'?'selected':''}>让用户自己决定</option><option value="GRANTED" ${group.requestedState==='GRANTED'?'selected':''}>静默允许（无需用户确认）</option><option value="DENIED" ${group.requestedState==='DENIED'?'selected':''}>统一拒绝（禁止使用）</option></select></label></div>`).join('')}</div>`:'<p class="mdm-empty">当前选择的权限没有可在这里统一管理的用户授权项。安装时自动授予的权限、必须去系统设置开启的权限不在此范围。</p>'}
  <details class="mdm-requirements"><summary>管理员配置前，还需要做什么？</summary><ul>${plan.requirements.map(item=>`<li>${escape(item)}</li>`).join('')}</ul></details><div class="mdm-plan-footer"><span>这里只整理方案。需要管理员在实际设备上配置并确认生效。</span>${plan.policies.length?'<button class="copy-button" data-copy="mdm">复制给管理员</button>':''}<a href="${plan.source}" target="_blank" rel="noopener noreferrer">管理员接入文档 ↗</a></div></div></section>`;
}
