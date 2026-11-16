export const appTemplates = [
  {id:'none',title:'不使用模板',description:'开发者自行根据业务场景选择权限',scenes:[]},
  {id:'enterprise-dlp',title:'企业 DLP · 透明加解密',description:'管理受控应用与透明加解密策略',scenes:['dlp-policy']}
];

export function selectTemplate(state,id) {
  const template=appTemplates.find(item=>item.id===id);
  if(!template||state.template===id)return state;
  const owned=new Set(state.templateScenes||[]);
  const selected=state.selected.filter(scene=>!owned.has(scene));
  const added=template.scenes.filter(scene=>!selected.includes(scene));
  return {...state,template:id,templateScenes:added,selected:[...selected,...added]};
}

export function renderTemplateChoices(state) {
  return `<fieldset class="template-field"><legend class="field-label">应用模板</legend><div class="template-options">${appTemplates.map(item=>`<label class="template-option ${state.template===item.id?'selected':''}"><input type="radio" name="template" value="${item.id}" ${state.template===item.id?'checked':''}/><span><strong>${item.title}</strong><small>${item.description}</small></span></label>`).join('')}</div></fieldset>`;
}
