import { permissionCopy } from './scenario-copy.js';
import { domains, domainFor } from './domains.js';
import { evaluate, routeFor } from './rules.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function renderCoverage(state, catalog, ui) {
  const result = evaluate(state,catalog);
  const byName = new Map(result.permissions.map(p=>[p.name,p]));
  const current = domains.find(d=>d.id===ui.domain) || domains[0];
  const matches = catalog.filter(p => (ui.domain==='all'||domainFor(p)===current.id) &&
    `${p.name} ${p.description} ${p.details} ${permissionCopy(p).question} ${permissionCopy(p).example}`.toLowerCase().includes(ui.search.toLowerCase()) &&
    (ui.mode!=='selected'||byName.has(p.name)));
  const selectedInDomain = id => catalog.filter(p=>domainFor(p)===id&&byName.has(p.name)).length;

  return `  <div class="coverage-layout"><nav class="domain-nav" aria-label="能力领域"><button class="domain-button ${ui.domain==='all'?'active':''}" data-domain="all"><span>▦</span><strong>全部能力</strong><small>${catalog.length}</small></button>${domains.map(domain=>`<button class="domain-button ${current.id===domain.id&&ui.domain!=='all'?'active':''}" data-domain="${domain.id}"><span>${domain.icon}</span><strong>${domain.title}</strong><small>${selectedInDomain(domain.id)?`${selectedInDomain(domain.id)} / `:''}${catalog.filter(p=>domainFor(p)===domain.id).length}</small></button>`).join('')}</nav>
  <section class="capabilities-panel"><div class="capabilities-heading"><h2>${ui.domain==='all'?'全部能力':current.title}</h2>${ui.domain==='all'?'':`<p>${current.description}</p>`}</div>
  <div class="capability-filters"><input class="input" id="capability-search" value="${escape(ui.search)}" placeholder="搜索能力、用途或权限名称" aria-label="搜索完整能力"/><select class="input" id="capability-mode" aria-label="能力筛选"><option value="all" ${ui.mode==='all'?'selected':''}>全部能力</option><option value="selected" ${ui.mode==='selected'?'selected':''}>仅看已选</option></select></div>
  <div class="capabilities-count">${matches.length} 项能力</div>
  <div class="capabilities-list">${matches.map(permission=>{
    const entry=byName.get(permission.name);
    const fromScene=entry?.sceneIds.some(id=>!id.startsWith('permission:'));
    const fromRequirement=entry?.autoAdded===true;
    const checked=Boolean(entry);
    const route=routeFor(permission);
    return `<article class="capability-row ${checked?'is-selected':''}"><label class="capability-choice"><input type="checkbox" data-permission="${permission.name}" ${checked?'checked':''} ${fromScene||fromRequirement?'disabled':''}/><span><strong>${escape(permissionCopy(permission).question)}</strong><small class="capability-example">${escape(permissionCopy(permission).example)}</small><code>${permission.name}</code></span></label><div class="capability-status"><span class="tag ${route==='direct'?'neutral':'red'}">${fromRequirement?'必须一起申请':fromScene?'已由场景加入':route==='direct'?'直接声明':route==='acl'?'官网申请':route==='mdm'?'仅设备管理应用':'企业权限'}</span><button class="text-button" data-detail="${permission.name}">查看详情 ↗</button></div></article>`;
  }).join('')||'<div class="no-results">此领域没有匹配项，试试其他关键词或切换领域。</div>'}</div>
  </section></div>
  <div class="coverage-actions"><button class="button secondary" data-action="prev">← 返回常见场景</button><button class="button primary" data-action="next">生成权限清单 →</button></div>`;
}
