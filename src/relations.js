import { relationDefinitions, permissionGroups } from './relations-data.js';

export const mdmControllerPermission = 'ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION';
export const mdmSource = 'https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/';
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
  if (['kernel.NET_RAW','kernel.USB_CAPTURE','REQUEST_LOCAL_ACCOUNT_AUTHORIZATION','ACCESS_BIOMETRIC'].includes(name)) return '安装时授予；实际使用还需身份验证';
  return '系统安装时授予';
}

function groupFor(permission, api, compareVersions) {
  const group=permissionGroups.find(group=>group.permissions.includes(permission.name));
  if (!group) return {id:`unmapped:${permission.name}`,title:'暂未确认能否统一设置',source:mdmSource,mappingConfirmed:false};
  if (group.since&&compareVersions(api,group.since)<0) return {...group,mappingConfirmed:false};
  return {...group,mappingConfirmed:true};
}

// These conditional statements mention other domains only to draw a boundary.
// Trigger them from the actual capability, not every name in the description.
const triggers = {
  'wifi-current-scan-no-location':['GET_WIFI_INFO','GET_WIFI_PEERS_MAC','GET_WIFI_LOCAL_MAC'],
  'biometric-no-camera-dependency':['ACCESS_BIOMETRIC'],
  'media-location-vs-device-location':['MEDIA_LOCATION'],
  'call-downlink-not-microphone':['CAPTURE_PLAYBACK_DOWNLINK'],
  'mdm-policy-location-special':['LOCATION_IN_BACKGROUND']
};

export function applyRelationships(state, permissions, compareVersions) {
  const names=new Set(permissions.map(permission=>permission.name));
  const enabled=state.managedByMdm===true;
  const contextProblems=[];
  if (enabled&&compareVersions(state.api,'20')<0) contextProblems.push('该MDM用户授权策略接口从API20起支持。');
  if (enabled&&!['Phone','PC/2in1','Tablet'].includes(state.device)) contextProblems.push('管理权限列表当前支持Phone、PC/2in1、Tablet；其他设备不生成策略计划。');

  const groups=[];
  for (const permission of permissions.filter(permission=>permission.grant.includes('user_grant'))) {
    const definition=groupFor(permission,state.api,compareVersions);
    let group=groups.find(group=>group.id===definition.id);
    if (!group) {
      const stored=(state.mdmGroupPolicies||{})[definition.id];
      const requestedState=enabled&&['GRANTED','DENIED'].includes(stored)?stored:'DEFAULT';
      group={...definition,permissions:[],requestedState,problems:[]};
      groups.push(group);
    }
    group.permissions.push(permission.name);
    if (!permission.eligible) group.problems.push('这组中有权限还不符合申请条件，请先处理下方提示。');
  }
  for (const group of groups) {
    if (!group.mappingConfirmed) group.problems.push('官方资料尚未明确：这个权限在当前版本能否这样统一设置。请先按正常流程向用户申请。');
    if (group.permissions.includes(full('LOCATION_IN_BACKGROUND'))&&group.requestedState!=='DEFAULT') {
      group.problems.push('后台定位通常还需先获得前台定位授权、再到系统设置开启。目前无法确认企业配置能否替代这些步骤，请在目标设备验证。');
    }
    group.problems=[...new Set([...contextProblems,...group.problems])];
    group.ready=enabled&&group.problems.length===0;
  }

  for (const permission of permissions) {
    const group=groups.find(group=>group.permissions.includes(permission.name));
    const flow=normalAuthorization(permission,state);
    permission.authorization={defaultFlow:flow,display:flow,groupId:group?.id||null,policy:'DEFAULT',planningOnly:true};
    if (group?.ready&&group.requestedState!=='DEFAULT') {
      permission.authorization.policy=group.requestedState;
      permission.authorization.display=group.requestedState==='GRANTED'?'计划由MDM静默授予，部署后核验':'计划由MDM拒绝，功能将受限';
    } else if (enabled&&group?.requestedState!=='DEFAULT'&&group?.requestedState) {
      permission.authorization.display=`${flow}；MDM方案待核实`;
    }
  }

  const active=relationDefinitions.filter(relation=>{
    const prerequisiteEdges=requirementEdges.filter(edge=>edge.relation===relation.id);
    if(prerequisiteEdges.length)return prerequisiteEdges.some(edge=>names.has(edge.from));
    const trigger=(triggers[relation.id]||[]).map(full);
    return (trigger.length?trigger:relation.permissions).some(name=>names.has(name));
  }).map(relation=>({...relation,selectedPermissions:relation.permissions.filter(name=>names.has(name))}));
  for (const permission of permissions) {
    permission.relationIds=active.filter(relation=>relation.permissions.includes(permission.name)).map(relation=>relation.id);
  }

  const authorizationPlan={enabled,planningOnly:true,controllerPermission:mdmControllerPermission,
    source:mdmSource,contextProblems,groups,
    requirements:[
      '需要企业管理员使用有资格、已激活的设备管理应用操作（Stage模型）。业务应用不用为此添加管理权限。',
      '业务应用仍要声明自己需要的权限；需官网申请的，仍要完成审批和授权文件（Profile）配置。管理员还需指定应用、设备账号及分身。',
      '只能统一设置通常需要用户同意的权限（user_grant）。同一组中，本应用声明的权限要一起设置；必须去系统设置开启的权限不适用。',
      '“让用户自己决定”对应DEFAULT，“静默允许”对应GRANTED，“统一拒绝”对应DENIED。选择后还需管理员实际配置并检查结果。'
    ],
    policies:groups.filter(group=>group.ready&&group.requestedState!=='DEFAULT').map(group=>({
      group:group.id,permissions:group.permissions,managedState:group.requestedState,
      managedStateValue:group.requestedState==='GRANTED'?0:-1
    }))
  };
  return {relationships:active,authorizationPlan};
}
