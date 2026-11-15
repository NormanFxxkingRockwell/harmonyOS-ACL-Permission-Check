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
const pcOnly = new Set(['SYSTEM_FLOAT_WINDOW','ACCESS_DDK_USB','ACCESS_DDK_HID','READ_WRITE_USER_FILE',
  'READ_WRITE_USB_DEV','GET_ABILITY_INFO','MANAGE_NET_FIREWALL','GET_NET_FIREWALL']);
const binaryOnly = new Set(['kernel.IGNORE_LIBRARY_VALIDATION','kernel.EXEMPT_ANONYMOUS_EXECUTABLE_MEMORY','INHERIT_PARENT_PERMISSION']);
const deviceVersions = {
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
  if (['SET_FILE_GUARD_POLICY','FILE_GUARD_MANAGER'].includes(name)) requirements.push({version:'15',reason:'API14开放边界不明确，本工具从API15计算'});
  return requirements.reduce((highest,item)=>compareVersions(item.version,highest.version)>0?item:highest);
}

export function extraConstraints(permission, state, compareVersions) {
  const name = permission.name.replace('ohos.permission.','');
  const blocks = [], warnings = [];
  if (openingVersions[name] && compareVersions(state.api,openingVersions[name])<0) blocks.push(`当前应用类型从 API ${openingVersions[name]} 起可申请此权限。`);
  if (deviceVersions[name]?.[state.device] && compareVersions(state.api,deviceVersions[name][state.device])<0) blocks.push(`所选设备从 API ${deviceVersions[name][state.device]} 起支持申请。`);
  if (pcOnly.has(name) && state.device!=='PC/2in1') blocks.push('官网业务场景限定 PC/2in1 设备。');
  if (['READ_WRITE_DESKTOP_DIRECTORY','kernel.DISABLE_CODE_MEMORY_PROTECTION'].includes(name) && !['PC/2in1','Tablet'].includes(state.device)) blocks.push('官网业务场景限定 PC/2in1、Tablet。');
  if (name==='RUN_DYN_CODE') blocks.push('此权限仅供部分特定系统应用使用，不生成普通应用配置。');
  if (binaryOnly.has(name)) blocks.push('此权限仅适用于独立二进制程序，不适用本工具生成的 HAP module.json5 片段。');
  if (name==='ACCESS_DDK_DRIVERS') blocks.push('需配置目标驱动等额外 value 数据，不能只声明权限名；请按官方接口指导单独配置。');
  if (['GET_NETWORK_STATS','ACCESS_BOARD_INFO'].includes(name) && state.type!=='mdm') blocks.push('官网当前申请场景仅支持企业 MDM 应用。');
  if (['SUBSCRIBE_NOTIFICATION','ACCESS_DIGITAL_IDENTITY','SYNC_ROOT_MANAGER'].includes(name) && state.developerType!=='enterprise') blocks.push('需企业开发者主体资质；它与应用的企业分发类型是不同概念。');
  if (name.startsWith('atomicService.') && state.form!=='atomicService') blocks.push('此权限面向元服务场景，当前应用形态不匹配。');
  if (['GET_WIFI_LOCAL_MAC','GET_ETHERNET_LOCAL_MAC'].includes(name)) {
    if(state.device==='TV') blocks.push('官网 TV 场景与设备变更描述存在口径差异，需向官方确认后单独配置。');
    else if(state.device!=='PC/2in1') blocks.push('官网变更段限制其他设备仅向系统应用开放。');
    else if(compareVersions(state.api,'16')<0) blocks.push('PC/2in1 从 API16 起面向普通应用开放。');
  }
  if (['SET_FILE_GUARD_POLICY','FILE_GUARD_MANAGER'].includes(name)&&compareVersions(state.api,'15')<0) blocks.push('官网 API14 的开放边界描述重叠；本工具不生成该历史版本的配置。');
  if (name==='SHORT_TERM_WRITE_IMAGEVIDEO') warnings.push('最长30分钟短时授权，超时需要再次确认；不代表永久、无交互授权。');
  if (name==='APP_TRACKING_CONSENT') warnings.push('是否展示授权弹窗受系统“要求应用请求关联”开关影响。');
  if (['kernel.NET_RAW','kernel.USB_CAPTURE','REQUEST_LOCAL_ACCOUNT_AUTHORIZATION'].includes(name)) warnings.push('实际敏感操作仍需用户身份认证或系统交互。');
  if (name==='kernel.ALLOW_WRITABLE_CODE_MEMORY') warnings.push('坚盾守护模式可能禁止相关内存能力，应用需提供降级处理。');
  if (name==='ACCESS_NOTIFICATION_POLICY') warnings.push('仅用于铃声由静音切换到非静音，不是发送普通通知的权限。');
  return { blocks, warnings };
}
