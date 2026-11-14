import { permissionCopy } from './scenario-copy.js';
import { domains, domainFor } from './domains.js';
import { evaluate, routeFor } from './rules.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function renderCoverage(state, catalog, ui) {
  const result = evaluate(state,catalog);
  const byName = new Map(result.permissions.map(p=>[p.name,p]));
  const selected = new Set(state.extraPermissions || []);
  const confirmed = new Set(state.confirmedQualifications || []);
  const current = domains.find(d=>d.id===ui.domain) || domains[0];
  const matches = catalog.filter(p => (ui.domain==='all'||domainFor(p)===current.id) &&
    `${p.name} ${p.description} ${p.details} ${permissionCopy(p).question} ${permissionCopy(p).example}`.toLowerCase().includes(ui.search.toLowerCase()) &&
    (ui.mode!=='selected'||byName.has(p.name)));
  const needsConfirmation = catalog.filter(p=>selected.has(p.name));
  const selectedInDomain = id => catalog.filter(p=>domainFor(p)===id&&byName.has(p.name)).length;

  return `<div class="coverage-intro"><div><strong>全部 ${catalog.length} 项权限，按 ${domains.length} 个领域逐项覆盖</strong><p>找到应用要做的事，勾选即可。前面已经选过的功能会自动标记；不确定时可以查看申请条件。</p></div><span>已排除废弃权限</span></div>
  <div class="coverage-layout"><nav class="domain-nav" aria-label="能力领域"><button class="domain-button ${ui.domain==='all'?'active':''}" data-domain="all"><span>▦</span><strong>全部能力</strong><small>${catalog.length}</small></button>${domains.map(domain=>`<button class="domain-button ${current.id===domain.id&&ui.domain!=='all'?'active':''}" data-domain="${domain.id}"><span>${domain.icon}</span><strong>${domain.title}</strong><small>${selectedInDomain(domain.id)?`${selectedInDomain(domain.id)} / `:''}${catalog.filter(p=>domainFor(p)===domain.id).length}</small></button>`).join('')}</nav>
  <section class="capabilities-panel"><div class="capabilities-heading"><h2>${ui.domain==='all'?'全部能力':current.title}</h2><p>${ui.domain==='all'?'搜索或逐项核对所有未废弃权限。':current.description}</p></div>
  <div class="capability-filters"><input class="input" id="capability-search" value="${escape(ui.search)}" placeholder="搜索能力、用途或权限名称" aria-label="搜索完整能力"/><select class="input" id="capability-mode" aria-label="能力筛选"><option value="all" ${ui.mode==='all'?'selected':''}>全部能力</option><option value="selected" ${ui.mode==='selected'?'selected':''}>仅看已选</option></select></div>
  <div class="capabilities-count">${matches.length} 项能力 <span>选择表示有此需求，不代表已经获得权限。</span></div>
  <div class="capabilities-list">${matches.map(permission=>{
    const entry=byName.get(permission.name);
    const fromScene=entry?.sceneIds.some(id=>!id.startsWith('permission:'));
    const fromRequirement=entry?.autoAdded===true;
    const checked=Boolean(entry);
    const route=routeFor(permission);
    return `<article class="capability-row ${checked?'is-selected':''}"><label class="capability-choice"><input type="checkbox" data-permission="${permission.name}" ${checked?'checked':''} ${fromScene||fromRequirement?'disabled':''}/><span><strong>${escape(permissionCopy(permission).question)}</strong><small class="capability-example">${escape(permissionCopy(permission).example)}</small><code>${permission.name}</code></span></label><div class="capability-status"><span class="tag ${route==='direct'?'neutral':'red'}">${fromRequirement?'必须一起申请':fromScene?'已由场景加入':route==='direct'?'直接声明':route==='acl'?'官网申请':route==='mdm'?'仅设备管理应用':'企业权限'}</span><button class="text-button" data-detail="${permission.name}">查看条件 ↗</button></div></article>`;
  }).join('')||'<div class="no-results">此领域没有匹配项，试试其他关键词或切换领域。</div>'}</div>
  </section></div>
  ${needsConfirmation.length?`<section class="qualifications-panel"><div class="section-title"><div><h2>补充能力 · 申请条件确认</h2><p>阅读官方条件后逐项确认；未确认或不符合应用类型、设备、版本的条目不会进入配置。</p></div></div>${needsConfirmation.map(permission=>`<div class="qualification-row"><label><input type="checkbox" data-qualification="${permission.name}" ${confirmed.has(permission.name)?'checked':''}/><span>我已阅读官方条件，确认应用符合此权限的主体及业务场景要求。<code>${permission.name}</code></span></label><button class="text-button" data-detail="${permission.name}">阅读官方条件 ↗</button></div>`).join('')}</section>`:''}
  <div class="coverage-actions"><button class="button secondary" data-action="prev">← 返回常见场景</button><button class="button primary" data-action="next">生成权限清单 →</button></div>`;
}
