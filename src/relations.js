const full = name => `ohos.permission.${name}`;

// Only explicit declaration requirements are expanded. API alternatives and
// same-group membership must never become a blanket permission bundle.
export const requirementEdges = [
  { from:full('LOCATION'), to:full('APPROXIMATELY_LOCATION'), relation:'location-precise-requires-approximate' },
  { from:full('LOCATION_IN_BACKGROUND'), to:full('APPROXIMATELY_LOCATION'), relation:'location-background-prerequisite' },
  { from:full('AUTO_RESTORE_MAIN_WINDOW'), to:full('USE_FLOAT_BALL'), relation:'float-ball-restore-requires-ball' },
  { from:full('PERSISTENT_BLUETOOTH_PEERS_MAC'), to:full('ACCESS_BLUETOOTH'), relation:'bluetooth-persistent-requires-access' }
];

export function expandRequirements(wanted) {
  for (let pass=0; pass<requirementEdges.length; pass++) {
    let changed=false;
    for (const edge of requirementEdges) {
      const parent=wanted.get(edge.from);
      if (!parent) continue;
      if (!wanted.has(edge.to)) {
        wanted.set(edge.to, {sceneIds:[...parent.sceneIds],reasons:[...parent.reasons],autoAdded:true,requiredBy:[],requirementIds:[]});
        changed=true;
      }
      const child=wanted.get(edge.to);
      child.requiredBy=[...new Set([...(child.requiredBy||[]),edge.from])];
      child.requirementIds=[...new Set([...(child.requirementIds||[]),edge.relation])];
    }
    if (!changed) break;
  }
}

export function normalAuthorization(permission, state) {
  const name=permission.name.replace('ohos.permission.','');
  if (permission.grant.includes('manual_settings')) return '需在系统设置授权';
  if (name==='LOCATION_IN_BACKGROUND') return '先前台授权，再到设置开启';
  if (name==='READ_PASTEBOARD'&&state.device==='PC/2in1') return 'PC首次默认允许，用户可撤销';
  if (name==='APP_TRACKING_CONSENT') return '是否弹窗取决于系统关联开关';
  if (permission.grant.includes('user_grant')) return '使用前获取用户授权';
  if (name==='SHORT_TERM_WRITE_IMAGEVIDEO') return '安装授予；保存另有短时确认';
  if (name==='PUBLISH_AGENT_REMINDER') return '安装时授予；还需用户允许通知';
  if (name==='USE_FLOAT_BALL') return '安装授予；用户需开启功能';
  if (name==='KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO') return '安装授予；另需后台运行开关';
  if (['kernel.NET_RAW','kernel.USB_CAPTURE','REQUEST_LOCAL_ACCOUNT_AUTHORIZATION'].includes(name)) return '安装时授予；实际使用还需身份验证';
  return '系统安装时授予';
}
