import { alternativeFor } from './permission-alternatives.js';
import { makeConfig } from './rules.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const officialText = value => escape(value).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
const sourceUrl = permission => permission.source.replace(/\.md$/,'');
const categoryDescriptions = {
  '开放权限（系统授权）':'直接在项目中声明，安装时由系统授予。',
  '开放权限（用户授权）':'直接在项目中声明；授权方式为用户授权。',
  '受限开放权限':'通过官网申请，具体申请方式见官方条目。',
  '企业类应用可用权限':'官方面向企业应用和企业MDM应用开放的权限。',
  '仅MDM应用可用权限':'官方面向企业MDM应用开放的权限。'
};
function permissionRow(permission, context) {
  const alternative=alternativeFor(permission);
  const facts=permission.officialFacts||[];
  return `<tr class="permission-row"><td class="permission-info">
    <button class="permission-name" data-detail="${permission.name}">${escape(permission.name)}</button>
    <p>${escape(permission.description)}</p>
    ${permission.autoAdded?`<div class="inferred-permission">配套声明：${permission.requiredBy.map(name=>escape(name.replace('ohos.permission.',''))).join('、')} → ${escape(permission.name.replace('ohos.permission.',''))}</div>`:''}
    ${permission.configKind==='binary'?'<p class="declaration-kind">官方适用范围：二进制程序</p>':permission.configKind==='value'?'<p class="declaration-kind">官方声明格式：包含额外 value 数据</p>':''}
    ${alternative?`<div class="permission-alternative"><strong>官方提供的其他实现方式</strong><p>${escape(alternative.text)}</p><a href="${escape(alternative.url)}" target="_blank" rel="noopener noreferrer">官方实现说明 ↗</a></div>`:''}
    ${facts.length?`<details class="row-notes"><summary>官方条目说明</summary>${facts.map(fact=>`<div class="official-fact"><strong>${escape(fact.label)}</strong><p>${officialText(fact.text)}</p></div>`).join('')}</details>`:''}
  </td><td data-label="申请与授权"><span class="tag ${permission.route==='direct'?'neutral':'red'}">${permission.route==='direct'?'直接声明':'官网申请'}</span><span class="grant-line">${escape(context.grantLabel(permission))}</span><a class="official-entry-link" href="${escape(sourceUrl(permission))}" target="_blank" rel="noopener noreferrer">官方条目 ↗</a></td>
  <td class="row-source" data-label="所选功能">${escape(permission.reasons.join('、'))}</td>
  <td class="row-version" data-label="等级 / 所需 API"><span>${escape(permission.level)}</span><small title="${escape(permission.minimumApiReason||'权限起始版本')}">API ${escape(permission.minimumApi||permission.since)}+</small></td></tr>`;
}
export function renderResultsPanel(result, context) {
  const {state,deviceNames,categoryNames,sceneCount,catalogCount,domainCount}=context;
  const direct=result.permissions.filter(p=>p.route==='direct').length;
  const apply=result.permissions.length-direct;
  const config=makeConfig(result);
  const sections=Object.entries(categoryNames).map(([category,title],index)=>{
    const rows=result.permissions.filter(p=>p.category===category);
    return rows.length?`<section class="result-region"><div class="region-header"><div><h2><span class="region-index">0${index+1}</span>${title}<span class="region-count">${rows.length}</span></h2><p>${categoryDescriptions[category]}</p></div></div><table class="permission-table"><thead><tr><th scope="col">权限 / 官方用途</th><th scope="col">申请与授权</th><th scope="col">所选功能</th><th scope="col">等级 / 所需 API</th></tr></thead><tbody>${rows.map(p=>permissionRow(p,context)).join('')}</tbody></table></section>`:'';
  }).join('');
  return `<div class="result-toolbar"><div><h2>当前清单</h2><p>${deviceNames[state.device]||state.device} · ${state.selected.length} 个场景 · ${(state.extraPermissions||[]).length} 项补充能力</p></div><div class="result-toolbar-actions"><button class="button secondary" data-step="1">修改场景</button><button class="button primary" data-action="download">导出清单 ↓</button></div></div>
  <div class="result-overview"><span>涉及权限 <b>${result.permissions.length}</b></span><span>直接声明 <b>${direct}</b></span><span>官网申请 <b>${apply}</b></span></div>
  <div class="compatibility-summary">${result.compatibility?.minimumApi?`<strong>根据所选权限，应用运行的 API 版本应不低于 API ${escape(result.compatibility.minimumApi)}。</strong>`:'<p>当前未选择需要声明的权限。</p>'}</div>
  <div class="result-regions">${sections}</div>
  ${result.alternatives.length?`<section class="result-region alternatives-region"><div class="region-header"><div><h2>不涉及额外声明的操作</h2></div></div><div class="alternatives-grid">${result.alternatives.map(scene=>`<article><h3>${escape(scene.title)}</h3><p>${escape(scene.note)}</p></article>`).join('')}</div></section>`:''}
  <details class="config-panel"><summary><span><strong>声明配置</strong></span><span class="expand-label">展开</span></summary><div class="config-content"><div class="config-heading"><h3>module.json5</h3><button class="copy-button" data-copy="module">复制配置</button></div><pre>${escape(JSON.stringify(config.moduleFragment,null,2))}</pre><p class="config-hint">EntryAbility：组件名称占位。</p>
  ${config.stringFragment.string.length?`<details class="resource-panel"><summary>权限用途文案</summary><div class="resource-content"><div class="config-heading"><h3>resources/base/element/string.json</h3><button class="copy-button" data-copy="strings">复制用途文案</button></div><pre>${escape(JSON.stringify(config.stringFragment,null,2))}</pre></div></details>`:''}
  ${config.binaryPermissions.length?`<section class="special-config"><h3>二进制程序权限</h3><pre>${escape(JSON.stringify(config.binaryPermissions,null,2))}</pre></section>`:''}
  ${config.valuePermissions.length?`<section class="special-config"><h3>包含 value 的声明</h3>${config.valuePermissions.map(p=>`<button class="text-button" data-detail="${p.name}">${escape(p.name)} · 官方声明格式 ↗</button>`).join('')}</section>`:''}</div></details>
  <p class="scope-note">${catalogCount} 项未废弃权限 · ${domainCount} 个能力分类 · ${sceneCount} 个场景</p>`;
}
