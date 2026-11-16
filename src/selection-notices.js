import {deviceVersions} from './constraints.js';
export const deviceLabels={Phone:'手机',Tablet:'平板','PC/2in1':'鸿蒙电脑（2in1）',Wearable:'手表',TV:'智慧屏',Car:'车机'};
const normalizeDevice=value=>value==='2in1'?'PC/2in1':value;

export function permissionNotices(permission,state) {
  const notices=[];
  if(permission.category==='仅MDM应用可用权限'&&state.type!=='mdm') {
    notices.push({kind:'type',text:'你正在选择仅供 MDM 应用使用的权限，请评估当前应用分发类型是否符合。'});
  } else if(permission.category==='企业类应用可用权限'&&state.type==='normal') {
    notices.push({kind:'type',text:'你正在选择企业应用权限，请评估当前应用分发类型是否符合。'});
  }
  const raw=permission.devices;
  if(raw&&raw!=='General') {
    const devices=new Set(raw.split('|').map(item=>normalizeDevice(item.trim())));
    const short=permission.name.replace('ohos.permission.','');
    // Official later device openings supplement the original device metadata.
    for(const device of Object.keys(deviceVersions[short]||{}))devices.add(device);
    if(!devices.has(normalizeDevice(state.device))) {
      notices.push({kind:'device',text:`此权限支持${[...devices].map(device=>deviceLabels[device]||device).join('、')}，当前选择为${deviceLabels[state.device]||state.device}。`});
    }
  }
  return notices;
}

export function newSelectionNotices(before,after,previousPermissions,currentPermissions) {
  const previous=new Set(previousPermissions.flatMap(permission=>permissionNotices(permission,before).map(notice=>`${permission.name}:${notice.kind}:${notice.text}`)));
  return currentPermissions.map(permission=>({permission,notices:permissionNotices(permission,after).filter(notice=>!previous.has(`${permission.name}:${notice.kind}:${notice.text}`))})).filter(item=>item.notices.length);
}
