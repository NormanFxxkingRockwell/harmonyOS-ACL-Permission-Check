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
  if (name==='PUBLISH_AGENT_REMINDER') return '安装授予；另需通知使能';
  if (name==='USE_FLOAT_BALL') return '安装授予；用户需开启功能';
  if (name==='KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO') return '安装授予；另需后台运行开关';
  if (['kernel.NET_RAW','kernel.USB_CAPTURE','REQUEST_LOCAL_ACCOUNT_AUTHORIZATION','ACCESS_BIOMETRIC'].includes(name)) return '安装授予；操作另需认证交互';
  return '系统安装时授予';
}

function groupFor(permission, api, compareVersions) {
  const group=permissionGroups.find(group=>group.permissions.includes(permission.name));
  if (!group) return {id:`unmapped:${permission.name}`,title:'权限组待官方确认',source:mdmSource,mappingConfirmed:false};
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
    if (!permission.eligible) group.problems.push('组内存在声明条件尚未满足的权限。');
  }
  for (const group of groups) {
    if (!group.mappingConfirmed) group.problems.push('当前官方权限组资料未明确覆盖此权限或目标API，不推测分组。');
    if (group.permissions.includes(full('LOCATION_IN_BACKGROUND'))&&group.requestedState!=='DEFAULT') {
      group.problems.push('后台定位另有前台与设置流程；尚无明确条文保证此策略替代全部特殊步骤，需目标设备核实。');
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
      '由有资格且已激活的Stage模型MDM管控端调用，业务App无需为了被管理而声明管理权限。',
      '目标应用仍需完成自己的权限声明、受限审批及Profile；按应用标识、本地账号和分身确定实例。',
      '仅管理user_grant，按目标应用已声明的同组全部项下发；不适用于manual_settings。',
      'DEFAULT表示用户授权，GRANTED/DENIED均是待管理员实际下发并检查返回值的部署计划。'
    ],
    policies:groups.filter(group=>group.ready&&group.requestedState!=='DEFAULT').map(group=>({
      group:group.id,permissions:group.permissions,managedState:group.requestedState,
      managedStateValue:group.requestedState==='GRANTED'?0:-1
    }))
  };
  return {relationships:active,authorizationPlan};
}
