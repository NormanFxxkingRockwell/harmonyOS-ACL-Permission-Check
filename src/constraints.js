// Explicit exceptions reviewed against the official permission descriptions.
// A permission's original API version is not always its third-party opening version.
const openingVersions = {
  MANAGE_INPUT_INFRARED_EMITTER:'16', INPUT_MONITORING:'12', INTERCEPT_INPUT_EVENT:'12',
  GET_WIFI_PEERS_MAC:'14', DLP_GET_HIDE_STATUS:'20', READ_WHOLE_CALENDAR:'20',
  WRITE_WHOLE_CALENDAR:'20', 'kernel.LOAD_INDEPENDENT_LIBRARY':'22', GET_NETWORK_STATS:'26.0.0',
  ENTERPRISE_ACCESS_DLP_FILE:'21', GET_WIFI_CONFIG:'15', SET_WIFI_CONFIG:'15',
  MANAGE_NET_FIREWALL:'15', GET_NET_FIREWALL:'15', INTERACT_ACROSS_LOCAL_ACCOUNTS:'14',
  GET_RUNNING_INFO:'14', RUNNING_STATE_OBSERVER:'14', GET_BUNDLE_INFO_PRIVILEGED:'14',
  GET_DOMAIN_ACCOUNTS:'14', QUERY_AUDIT_EVENT:'14', KILL_APP_PROCESSES:'14', 'sec.ACCESS_UDID':'20'
};
export const deviceVersions = {
  SET_WINDOW_TRANSPARENT:{Tablet:'23'}, PRELOAD_FILE:{Tablet:'26.0.0'},
  WEB_NATIVE_MESSAGING:{Phone:'24',Tablet:'24'}, USE_FLOAT_BALL:{'PC/2in1':'26.0.0'},
  CRYPTO_EXTENSION_REGISTER:{Tablet:'24',Phone:'26.0.0'}, CUSTOM_SCREEN_CAPTURE:{Phone:'21'},
  CUSTOM_SCREEN_RECORDING:{TV:'26.0.0'}
};

// Reuse the reviewed eligibility boundaries when deriving a permission version floor.
export function minimumPermissionVersion(permission, state, compareVersions) {
  const name = permission.name.replace('ohos.permission.','');
  const requirements = [{version:permission.since, reason:'权限起始版本'}];
  if (openingVersions[name]) requirements.push({version:openingVersions[name],reason:'面向当前应用开放的版本'});
  if (deviceVersions[name]?.[state.device]) requirements.push({version:deviceVersions[name][state.device],reason:'所选设备开始支持的版本'});
  if (name==='PRIVACY_WINDOW') requirements.push({version:'11',reason:'面向普通应用开放的版本'});
  if (['GET_WIFI_LOCAL_MAC','GET_ETHERNET_LOCAL_MAC'].includes(name)&&state.device==='PC/2in1') requirements.push({version:'16',reason:'电脑端面向普通应用开放的版本'});
  if (['SET_FILE_GUARD_POLICY','FILE_GUARD_MANAGER'].includes(name)&&state.type!=='mdm') requirements.push({version:'14',reason:'官方变更信息：API14起面向企业普通应用开放'});
  return requirements.reduce((highest,item)=>compareVersions(item.version,highest.version)>0?item:highest);
}
