import { extraConstraints } from './constraints.js';
const s = (id, step, title, description, permissions, extra = {}) => ({ id, step, title, description, permissions, ...extra });
export const steps = [
  { title: '应用概况', subtitle: '先认识一下你的应用', description: '应用的分发方式和运行设备，会影响权限的开放范围。' },
  { title: '网络与连接', subtitle: '你的应用，如何连接世界？', description: '从最常见的联网开始，选择应用实际会用到的能力。' },
  { title: '相机与媒体', subtitle: '记录、创作，还是分享？', description: '拍照不一定要录音，选一张照片也不等于读取整个图库。' },
  { title: '数据与系统', subtitle: '需要访问哪些用户数据？', description: '根据访问方式细分权限，能用系统选择器完成的功能优先使用选择器。' },
  { title: '企业与设备', subtitle: '还有哪些专业能力？', description: '核对文件保护、设备管控等专业场景；不涉及可以直接生成清单。' },
  { title: '完整能力核对', subtitle: '按领域核对全部能力', description: '常见场景之外，按13个能力领域继续检查；只添加真实需要且符合条件的能力。' },
  { title: '权限清单', subtitle: '应用权限清单', description: '按权限分类查看申请路径、授权要求和触发场景。' }
];
export const scenes = [
  s('internet',1,'访问互联网','请求接口、加载网页、上传下载、连接业务服务器。',['INTERNET'],{ icon:'↗', tag:'常用' }),
  s('network',1,'获取网络状态','读取网络连接信息，判断当前网络是否可用。',['GET_NETWORK_INFO'],{ icon:'⌁' }),
  s('wifi',1,'获取 Wi-Fi 信息','读取 Wi-Fi 状态或连接信息；具体接口可能还有其他权限要求。',['GET_WIFI_INFO'],{ icon:'≋' }),
  s('bluetooth',1,'连接蓝牙设备','扫描、配对、连接蓝牙设备，或使用 BLE 广播。',['ACCESS_BLUETOOTH'],{ icon:'ᛒ' }),
  s('nearlink',1,'连接星闪设备','发现、配对或连接星闪外围设备。',['ACCESS_NEARLINK'],{ icon:'✧' }),
  s('nfc',1,'读写 NFC 标签','读取或写入 NFC Tag，不包括支付卡模拟。',['NFC_TAG'],{ icon:'▣' }),
  s('distributed',1,'跨设备交换数据','使用要求分布式数据同步权限的跨设备能力。',['DISTRIBUTED_DATASYNC'],{ icon:'⇄' }),
  s('photo',2,'使用相机拍照','在应用内调用相机拍摄照片。',['CAMERA'],{icon:'◉', tag:'常用'}),
  s('video',2,'使用相机录像','在应用内录制视频；可以继续选择是否录制声音。',['CAMERA'],{icon:'▷'}),
  s('record',2,'单独录音 / 语音通话','采集麦克风声音，例如语音消息、会议和音频录制。',['MICROPHONE'],{icon:'♩'}),
  s('photo-picker',2,'让用户选择图片或视频','用户手动选择素材、上传头像、编辑图片或生成视频。',[],{icon:'▧', note:'使用 PhotoViewPicker 获取用户选中的资源，无需批量图库读取权限。后续编辑、删除等操作仍需遵循对应 API 的确认流程。'}),
  s('photo-bulk',2,'自动读取 / 整理整个图库','用于克隆备份、同步、相册整理或自动选择素材生成视频。',['READ_IMAGEVIDEO'],{icon:'▦', tag:'需申请', note:'仅适用于官网列出的批量或自动处理场景；用户手选素材请使用 PhotoViewPicker。API 26.0.0 起，该权限只覆盖本地公共目录。'}),
  s('photo-save',2,'保存图片或视频到图库','用户主动保存应用生成的图片或视频。',[],{icon:'↓', note:'优先使用安全保存控件或系统授权弹窗，不自动添加 WRITE_IMAGEVIDEO；连续批量写入需另外核对接口和申请条件。'}),
  s('audio-picker',2,'选择 / 播放音频文件','用户选择音频、播放音乐或播放视频声音。',[],{icon:'♫', note:'选择文件使用 AudioViewPicker；单纯播放声音无需麦克风权限。网络播放还需选择“访问互联网”。'}),
  s('audio-backup',2,'批量备份 / 同步音频','批量读取公共目录音频，用于克隆、备份或同步。',['READ_AUDIO'],{icon:'≡',tag:'需申请'}),
  s('location',3,'获取当前位置','用于附近服务、地图展示、导航或位置签到。',[],{icon:'◎',tag:'常用'}),
  s('contacts-picker',3,'让用户选择联系人','用户从系统联系人中选择要分享或使用的联系人。',[],{icon:'♧',note:'使用联系人 Picker 获取用户选择的数据，不自动申请批量通讯录权限。'}),
  s('contacts-sync',3,'批量备份 / 同步联系人','克隆、备份或同步通讯录，继续选择是否需要写回。',['READ_CONTACTS'],{icon:'⇅',tag:'需申请',note:'批量联系人权限仅面向克隆、备份、同步等允许场景。'}),
  s('calendar',3,'读取日历','读取普通日历权限允许范围内的日历信息。',['READ_CALENDAR'],{icon:'▤'}),
  s('calendar-write',3,'创建或修改日历活动','添加、移除或更改日历活动。',['WRITE_CALENDAR'],{icon:'＋'}),
  s('paste-control',3,'用户点击粘贴','通过系统粘贴控件读取用户指定的剪贴板数据。',[],{icon:'▥',note:'优先采用 PasteButton，由用户触发粘贴，不直接申请 READ_PASTEBOARD。'}),
  s('paste-read',3,'直接读取剪贴板','例如文档编辑、银行卡号识别或特定格式口令识别。',['READ_PASTEBOARD'],{icon:'▣',tag:'需申请',note:'手机等设备仅限官网列出的场景；PC/2in1 的首次授权行为与其他设备不同。请核对官方条件。'}),
  s('notification',3,'向用户发送通知','发布应用自己的消息、业务提醒和状态通知。',[],{icon:'♧',note:'通知使能使用 notificationManager.requestEnableNotification 等通知 API；不添加读取其他应用通知的 SUBSCRIBE_NOTIFICATION。'}),
  s('vibrate',3,'触发振动反馈','按钮反馈、事件提醒或预置振动效果。',['VIBRATE'],{icon:'⌁'}),
  s('biometric',3,'指纹 / 人脸身份认证','调用系统生物特征认证能力验证用户身份。',['ACCESS_BIOMETRIC'],{icon:'◎'}),
  s('privacy',3,'保护敏感页面','将窗口设置为隐私窗口，禁止截屏录屏。',['PRIVACY_WINDOW'],{icon:'◇'}),
  s('files-picker',3,'让用户选择文档','用户手动打开或保存指定的文件。',[],{icon:'▱',note:'使用 DocumentViewPicker 等文件选择器，按返回的 URI 和接口要求访问文件；不默认索取全盘或公共目录权限。'}),
  s('persist',3,'持久访问已授权文件','希望在后续会话中继续访问用户已授权的文件 URI。',['FILE_ACCESS_PERSIST'],{icon:'∞',note:'权限本身不代表已获任意文件访问权；仍需获得目标 URI 的有效授权并使用持久化接口。上架时仍走受限申请流程。'}),
  s('download',3,'直接访问下载目录','直接读写公共 Download 目录及子目录。',['READ_WRITE_DOWNLOAD_DIRECTORY'],{icon:'↓',devices:['PC/2in1','Tablet'],note:'即使权限等级为 normal，官网仍要求沿用受限申请方式。'}),
  s('screenshot',4,'获取屏幕截图','获取屏幕图像，供截图或其他屏幕图像业务使用。',['CUSTOM_SCREEN_CAPTURE'],{icon:'▧',note:'手机从 API21 起支持该权限；具体截屏接口另有交互和调用条件。'}),
  s('screen-record',4,'录屏时不再逐次确认','录屏、远程登录或共享桌面，用户在设置中授权后使用。',['CUSTOM_SCREEN_RECORDING'],{icon:'▷',tag:'设置授权',note:'需先申请受限权限，再由用户在系统设置中开启；不是申请后即可静默录屏。TV 从 API26.0.0 起支持。'}),
  s('control-device',4,'远程控制 / 智能体操控设备','远程登录的被控端或辅助操控设备的智能体应用。',['CONTROL_DEVICE'],{icon:'⌘',tag:'设置授权',note:'仅 PC/2in1。需官网审批及用户手动设置授权，不能用于不符合官方场景的自动化。'}),
  s('dlp-plugin',4,'接入 DLP 连云插件','向 DLP 服务注册、解注册连云插件。',['ACCESS_DLP_SERVICE'],{icon:'◇',tag:'需申请'}),
  s('dlp-policy',4,'管理透明加解密策略','配置其他应用的文件加解密策略与算法。',['DLP_POLICY_MANAGER'],{icon:'▣',tag:'企业'}),
  s('file-guard',4,'文件密级与标签管理','扫描公共目录，设置文件密级、标签等扩展属性。',['FILE_GUARD_MANAGER'],{icon:'▤',tag:'企业'}),
  s('audit',4,'查询安全审计事件','企业安全类应用查询安全审计事件。',['QUERY_AUDIT_EVENT'],{icon:'≡',tag:'企业'}),
  s('dlp-file',4,'生成 / 解密 DLP 文件','生成、解密 DLP 文件，查询文件策略。',['ENTERPRISE_ACCESS_DLP_FILE'],{icon:'◇',tag:'MDM'}),
  s('sensitive',4,'识别文件敏感内容','通过设备管理能力识别文件的敏感内容。',['ENTERPRISE_DATA_IDENTIFY_FILE'],{icon:'◎',tag:'MDM'}),
  s('mdm-apps',4,'管理设备上的应用','设备管理应用安装、卸载应用包。',['ENTERPRISE_INSTALL_BUNDLE'],{icon:'▦',tag:'MDM'}),
  s('mdm-usb',4,'管理设备 USB','通过设备管理能力配置 USB 管控策略。',['ENTERPRISE_MANAGE_USB'],{icon:'⇄',tag:'MDM'})
];
export const initialState = () => ({ step:0, name:'', type:'normal', developerType:'unknown', form:'app', device:'Phone', api:'26.0.0', selected:[], extraPermissions:[], confirmedQualifications:[], videoAudio:false, accuracy:'approximate', background:'none', contactsWrite:false });
export function compareVersions(a,b) { const x=String(a).split('.').map(Number),y=String(b).split('.').map(Number); for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return Math.sign(d);}return 0; }
export function routeFor(p) {
  if(p.category==='仅MDM应用可用权限')return 'mdm';
  if(p.category==='企业类应用可用权限')return 'enterprise';
  if(p.category==='受限开放权限'||['READ_WRITE_DOWNLOAD_DIRECTORY','READ_WRITE_DOCUMENTS_DIRECTORY'].some(n=>p.name.endsWith('.'+n)))return 'acl';
  return 'direct';
}
export function evaluate(state, catalog) {
  const wanted=new Map(); const alternatives=[];
  const extraScenes=(state.extraPermissions||[]).map(name=>catalog.find(p=>p.name===name)).filter(p=>p&&!p.deprecated).map(p=>({id:`permission:${p.name}`,title:p.description.replace(/^允许(?:应用|企业应用|设备管理应用)?/,'').replace(/。$/,''),permissions:[p.name.replace('ohos.permission.','')]}));
  const activeScenes=[...scenes.filter(s=>state.selected.includes(s.id)),...extraScenes];
  function add(short,scene){const name='ohos.permission.'+short;if(!wanted.has(name))wanted.set(name,{sceneIds:[],reasons:[]});const item=wanted.get(name);if(!item.sceneIds.includes(scene.id)){item.sceneIds.push(scene.id);item.reasons.push(scene.title);}}
  for(const scene of activeScenes){
    scene.permissions.forEach(p=>add(p,scene));
    if(!scene.permissions.length && scene.id!=='location')alternatives.push(scene);
    if(scene.id==='video'&&state.videoAudio)add('MICROPHONE',scene);
    if(scene.id==='contacts-sync'&&state.contactsWrite)add('WRITE_CONTACTS',scene);
    if(scene.id==='location'){
      add('APPROXIMATELY_LOCATION',scene);if(state.accuracy==='precise')add('LOCATION',scene);
      if(state.background==='permission')add('LOCATION_IN_BACKGROUND',scene);
      if(state.background==='task'){add('KEEP_BACKGROUND_RUNNING',scene);alternatives.push({id:'location-task',title:'后台定位：长时任务路径',note:'前台位置权限 + LOCATION 类型长时任务。还需配置后台模式并符合长时任务场景；不自动添加后台位置权限。'});}
    }
  }
  if(wanted.has('ohos.permission.LOCATION')||wanted.has('ohos.permission.LOCATION_IN_BACKGROUND')) {
    const locationScene=activeScenes.find(s=>s.permissions.includes('LOCATION')||s.permissions.includes('LOCATION_IN_BACKGROUND'));
    if(locationScene)add('APPROXIMATELY_LOCATION',locationScene);
  }
  const permissions=[...wanted].map(([name,why])=>{
    const p=catalog.find(p=>p.name===name);if(!p)throw new Error('Missing permission: '+name);
    const route=routeFor(p),blocks=[],warnings=[];
    if(route==='mdm'&&state.type!=='mdm')blocks.push('仅企业 MDM 应用可申请，当前应用类型不符合。');
    if(route==='enterprise'&&state.type==='normal')blocks.push('仅企业普通应用、企业 MDM 应用可申请。');
    if(compareVersions(state.api,p.since)<0)blocks.push(`所选 API ${state.api} 低于权限起始版本 ${p.since}。`);
    if(p.deprecated&&compareVersions(state.api,p.deprecated)>=0)blocks.push(`此权限在 API ${p.deprecated} 已废弃，请使用替代方案。`);
    if(p.devices && p.devices!=='General' && !p.devices.split('|').map(d=>d.trim()).includes(state.device))blocks.push(`官方列出的支持设备：${p.devices}。`);
    for(const id of why.sceneIds){const scene=activeScenes.find(s=>s.id===id);if(scene?.devices&&!scene.devices.includes(state.device))blocks.push('该场景仅支持 PC/2in1、Tablet。');}
    if(name.endsWith('.CUSTOM_SCREEN_CAPTURE')&&state.device==='Phone'&&compareVersions(state.api,'21')<0)blocks.push('手机设备从 API21 起才支持申请。');
    if(name.endsWith('.CUSTOM_SCREEN_RECORDING')&&state.device==='TV'&&compareVersions(state.api,'26.0.0')<0)blocks.push('TV 从 API26.0.0 起才支持申请。');
    if(name.endsWith('.PRIVACY_WINDOW')&&compareVersions(state.api,'11')<0)blocks.push('API9–10 为 system_basic，本版不生成旧版本的申请配置。');
    if(name.endsWith('.ENTERPRISE_ACCESS_DLP_FILE')&&compareVersions(state.api,'21')<0)blocks.push('此权限从 API21 起才面向 MDM 应用开放。');
    if(name.endsWith('.FILE_GUARD_MANAGER')&&compareVersions(state.api,'15')<0)warnings.push('官网 API14 开放范围描述重叠，需向官方确认目标版本资格。');
    if(route!=='direct')warnings.push('需核对业务场景、开发者资格及审核结果，选择场景不代表已获批。');
    if(!p.devices)warnings.push('权限列表未明确设备范围，需再核对实际 API 的设备支持。');
    if((state.extraPermissions||[]).includes(name)&&!why.sceneIds.some(id=>!id.startsWith('permission:'))&&!(state.confirmedQualifications||[]).includes(name))blocks.push('尚未确认官方申请条件，请在完整能力核对页阅读条件并确认。');
    const additional=extraConstraints(p,state,compareVersions);blocks.push(...additional.blocks);warnings.push(...additional.warnings);
    const sceneNotes=[...new Set(why.sceneIds.map(id=>scenes.find(s=>s.id===id)?.note).filter(Boolean))];
    return {...p,...why,route,blocks:[...new Set(blocks)],warnings,sceneNotes,eligible:blocks.length===0};
  });
  return {permissions,alternatives};
}
export function makeConfig(result) {
  const strings=[];
  const requestPermissions=result.permissions.filter(p=>p.eligible).map((p,i)=>{
    const item={name:p.name};
    if(p.grant.includes('user_grant')){const key=`permission_reason_${i+1}`;item.reason=`$string:${key}`;item.usedScene={abilities:['EntryAbility'],when:p.name.endsWith('.LOCATION_IN_BACKGROUND')?'always':'inuse'};strings.push({name:key,value:`用于${p.reasons.join('、')}`});}
    return item;
  });
  return { moduleFragment:{module:{requestPermissions}}, stringFragment:{string:strings} };
}
