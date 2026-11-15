import { permissionCopy } from './scenario-copy.js';
import { makeConfig } from './rules.js';
import { renderAuthorizationHint } from './relations-view.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const groupDescriptions = {
  '开放权限（系统授权）': '在配置文件中声明，安装时由系统授予。',
  '开放权限（用户授权）': '声明后，在对应业务使用前获取用户授权。',
  '受限开放权限': '先核对申请条件，再到官网申请；用户授权要求单独完成。',
  '企业类应用可用权限': '仅符合条件的企业应用可申请；申请通过后，还要下载授权文件（Profile）并完成签名。',
  '仅MDM应用可用权限': '仅企业 MDM 应用可申请，需符合设备管理场景。'
};

function permissionRow(permission, context) {
  const { routeNames, grantLabel } = context;
  const notes = [...permission.blocks, ...permission.sceneNotes, ...permission.warnings];
  if (permission.name.endsWith('.LOCATION_IN_BACKGROUND')) {
    notes.push('先取得前台位置权限，再引导用户在系统设置中授予后台位置权限。');
  }
  return `<tr class="permission-row ${permission.eligible ? '' : 'blocked'}">
    <td class="permission-info">
      <button class="permission-name" data-detail="${permission.name}">${escape(permission.name)}</button>
      <p>${escape(permissionCopy(permission).question.replace(/^是否需要/,'用于').replace(/？$/,''))}</p>
      ${permission.autoAdded?`<div class="inferred-permission">自动补齐 · ${permission.requiredBy.map(name=>escape(name.replace('ohos.permission.',''))).join('、')} 的必需权限</div>`:''}
      ${permission.blocks.length ? `<div class="block-reason">暂不能加入配置：${escape(permission.blocks.join(' '))}</div>` : ''}
      ${notes.length ? `<details class="row-notes"><summary>限制与说明 <span>${notes.length}</span></summary><ul>${notes.map(note => `<li>${escape(note)}</li>`).join('')}</ul></details>` : ''}
    </td>
    <td data-label="申请与授权"><span class="tag ${permission.route === 'direct' ? 'neutral' : 'red'}">${routeNames[permission.route]}</span><span class="grant-line">${grantLabel(permission)}</span></td>
    <td data-label="触发场景" class="row-source">${escape(permission.reasons.join('、'))}</td>
    <td class="row-version" data-label="等级 / 版本"><span>${permission.level}</span><small>API ${permission.since}+</small></td>
  </tr>`;
}

export function renderResultsPanel(result, context) {
  const { state, deviceNames, categoryNames, sceneCount, catalogCount, domainCount } = context;
  const direct = result.permissions.filter(p => p.route === 'direct' && p.eligible).length;
  const apply = result.permissions.filter(p => p.route !== 'direct' && p.eligible).length;
  const blocked = result.permissions.filter(p => !p.eligible).length;
  const config = makeConfig(result);
  const sections = Object.entries(categoryNames).map(([category, title], index) => {
    const rows = result.permissions.filter(p => p.category === category);
    if (!rows.length) return '';
    return `<section class="result-region">
      <div class="region-header"><div><h2><span class="region-index">0${index + 1}</span>${title}<span class="region-count">${rows.length}</span></h2><p>${groupDescriptions[category]}</p></div></div>
      <table class="permission-table"><thead><tr><th scope="col">权限 / 用途</th><th scope="col">申请与授权</th><th scope="col">触发场景</th><th scope="col">等级 / 版本</th></tr></thead><tbody>${rows.map(p => permissionRow(p, context)).join('')}</tbody></table>
    </section>`;
  }).join('');

  return `<div class="result-toolbar">
    <div><h2>当前方案</h2><p>${deviceNames[state.device]} · 最低 API ${escape(state.api)} · ${state.selected.length} 个常见场景 · ${(state.extraPermissions||[]).length} 项补充能力</p></div>
    <div class="result-toolbar-actions"><button class="button secondary" data-step="1">修改场景</button><button class="button primary" data-action="download">导出清单 ↓</button></div>
  </div>
  <div class="result-overview"><span>涉及权限 <b>${result.permissions.length}</b></span><span>可直接声明 <b>${direct}</b></span><span>需官网申请 <b>${apply}</b></span><span class="${blocked ? 'has-blocks' : ''}">条件待满足 <b>${blocked}</b></span></div>
  ${renderAuthorizationHint(result)}
  <div class="result-regions">${sections || (!result.alternatives.length ? '<div class="result-empty">尚未选择场景，返回向导选择需要的功能即可生成清单。</div>' : '')}</div>
  ${result.alternatives.length ? `<section class="result-region alternatives-region"><div class="region-header"><div><h2>无需额外声明的场景<span class="region-count">${result.alternatives.length}</span></h2><p>使用系统选择器、控件或专门授权流程完成接入。</p></div></div><div class="alternatives-grid">${result.alternatives.map(scene => `<article><h3>${scene.title}</h3><p>${scene.note}</p></article>`).join('')}</div></section>` : ''}
  <details class="config-panel"><summary><span><strong>声明配置</strong><small>按需展开并复制 module.json5 片段</small></span><span class="expand-label">展开</span></summary><div class="config-content">
    <div class="config-heading"><h3>module.json5</h3><button class="copy-button" data-copy="module">复制配置</button></div>
    <pre>${escape(JSON.stringify(config.moduleFragment, null, 2))}</pre>
    <p class="config-hint">仅包含条件检查通过的权限。官网申请类仍需审批、签名；请将 EntryAbility 替换成实际使用权限的 Ability。</p>
    ${config.stringFragment.string.length ? `<details class="resource-panel"><summary>权限用途文案 <span>当前配置使用了 $string 引用</span></summary><div class="resource-content"><p>这是用户授权时的用途说明。可以复用项目已有字符串资源；使用上方新生成的引用时，请将以下内容合并到 resources/base/element/string.json。</p><div class="config-heading"><h3>字符串资源片段</h3><button class="copy-button" data-copy="strings">复制用途文案</button></div><pre>${escape(JSON.stringify(config.stringFragment, null, 2))}</pre></div></details>` : ''}
  </div></details>
  <div class="result-footnote"><p>权限声明、官网申请和用户授权是不同步骤。具体可用性仍需结合接口和目标设备确认。</p><a target="_blank" rel="noopener noreferrer" href="https://developer.huawei.com/consumer/cn/doc/app/agc-help-apply-acl-0000002394212138/">官网 ACL 申请指南 ↗</a></div>
  <p class="scope-note">覆盖 ${catalogCount} 项未废弃权限、${domainCount} 个能力领域及 ${sceneCount} 个常见场景。第三方 SDK 和具体 API 的附加要求需结合项目核对。</p>`;
}
