import { permissionCopy, purposeFromQuestion } from './scenario-copy.js';
import { expandRequirements, applyRelationships, requirementEdges } from './relations.js';
import { extraConstraints, minimumPermissionVersion } from './constraints.js';
const s = (id, step, title, description, permissions, extra = {}) => ({ id, step, title, description, permissions, ...extra });
export const steps = [
  { title: '应用概况', subtitle: '先了解应用的基本情况', description: '选择应用如何分发、在哪些设备上运行，帮你排除不能申请的权限。' },
  { title: '网络与连接', subtitle: '应用需要联网或连接设备吗？', description: '按实际功能选择，例如加载网页、连接蓝牙耳机。' },
  { title: '相机与媒体', subtitle: '应用需要拍照、录音或使用照片吗？', description: '选择用户会做的操作。拍照、录音、手选照片和自动备份图库分别判断。' },
  { title: '数据与系统', subtitle: '应用需要读取哪些数据？', description: '按实际操作选择，例如查看位置、读取日历、打开文件。用户手选文件与应用自动读取会分开判断。' },
  { title: '企业与设备', subtitle: '应用需要保护文件或管理设备吗？', description: '这里是企业文件保护、远程控制等功能。不需要可以继续下一步。' },
  { title: '完整能力核对', subtitle: '还有其他功能需要权限吗？', description: '按13个分类检查剩余功能，补上前面没有选到的需求。' },
  { title: '权限清单', subtitle: '所选功能涉及的权限', description: '查看哪些可以直接填写，哪些要去官网申请，以及使用前还需要做什么。' }
];
export const scenes = [
  s('internet',1,'是否需要访问互联网？','例如：登录账号、加载网页、上传照片或下载文件。',['INTERNET'],{ icon:'↗', tag:'常用' }),
  s('network',1,'是否需要判断当前网络状态？','例如：检测设备是否联网，离线时提示稍后再试。',['GET_NETWORK_INFO'],{ icon:'⌁' }),
  s('wifi',1,'是否需要读取 Wi-Fi 信息？','例如：查看当前连接的 Wi-Fi 信息。不同操作可能还需要其他权限。',['GET_WIFI_INFO'],{ icon:'≋' }),
  s('bluetooth',1,'是否需要连接蓝牙设备？','例如：扫描并连接蓝牙手环，或向附近设备发送蓝牙广播。',['ACCESS_BLUETOOTH'],{ icon:'ᛒ' }),
  s('nearlink',1,'是否需要连接星闪设备？','例如：发现附近的星闪配件并建立连接。',['ACCESS_NEARLINK'],{ icon:'✧' }),
  s('nfc',1,'是否需要读写 NFC 标签？','例如：读取贴在物品上的 NFC 标签，或向标签写入内容。',['NFC_TAG'],{ icon:'▣' }),
  s('distributed',1,'是否需要在设备之间同步数据？','例如：通过分布式数据同步能力，让手机和平板共享应用数据。',['DISTRIBUTED_DATASYNC'],{ icon:'⇄' }),
  s('photo',2,'是否需要在应用内拍照？','例如：打开应用内相机，拍摄商品或证件照片。',['CAMERA'],{icon:'◉', tag:'常用'}),
  s('video',2,'是否需要在应用内录像？','例如：打开应用内相机录制短视频，稍后再选择是否录入声音。',['CAMERA'],{icon:'▷'}),
  s('record',2,'是否需要录音或进行语音通话？','例如：发送语音消息、语音通话，或录制会议声音。',['MICROPHONE'],{icon:'♩'}),
  s('photo-picker',2,'是否需要读取或选择照片、视频？','例如：读取相册内容，或让用户选一张照片作为头像。',['READ_IMAGEVIDEO'],{icon:'▧', note:'用系统照片选择器（PhotoViewPicker）获取用户选中的照片或视频，无需申请批量读取图库的权限。后续编辑、删除时，仍需按相应接口要求让用户确认。'}),
  s('photo-bulk',2,'是否需要自动读取或整理图库？','例如：自动备份本地照片，或扫描相册整理重复图片。',['READ_IMAGEVIDEO'],{icon:'▦', tag:'需申请', note:'只有官网列出的批量或自动处理用途才能申请。用户手选照片或视频时，使用系统照片选择器（PhotoViewPicker）。从 API 26.0.0 起，此权限只允许读取本地公共目录中的内容。'}),
  s('photo-save',2,'是否需要把图片或视频保存到图库？','例如：用户点击保存，把应用生成的海报存入相册。',['WRITE_IMAGEVIDEO'],{icon:'↓', note:'已列出 WRITE_IMAGEVIDEO。若由用户主动保存，也可使用系统保存按钮或保存确认弹窗完成，不申请此权限；具体做法和官方链接见结果清单。'}),
  s('audio-picker',2,'是否需要读取或选择本地音频文件？','例如：读取公共目录中的音频，或让用户选择一首本地音乐。',['READ_AUDIO'],{icon:'♫', note:'已列出 READ_AUDIO。其直接读取用途限于克隆、备份、同步等官方场景；用户手选音频时也可使用系统音频选择器，不申请此权限。'}),
  s('audio-play',2,'是否只需要播放音频或视频？','例如：播放应用自带的提示音，或播放已经取得访问权的视频。',[],{icon:'♫',note:'单纯播放已能访问的音视频不需要麦克风或批量读取权限。在线播放还需联网；读取来源文件的需求可另外选择。'}),
  s('audio-backup',2,'是否需要批量备份或同步音频？','例如：扫描公共目录中的音频文件，批量备份到新设备。',['READ_AUDIO'],{icon:'≡',tag:'需申请'}),
  s('location',3,'是否需要获取用户当前位置？','例如：显示附近门店、地图导航，或记录位置签到。',[],{icon:'◎',tag:'常用'}),
  s('contacts-picker',3,'是否需要读取或选择联系人？','例如：读取通讯录信息，或让用户选择一个收件人。',['READ_CONTACTS'],{icon:'♧',note:'已列出 READ_CONTACTS。批量读取仅适用于克隆、备份、同步等官方用途；若只需用户选中的联系人，也可通过系统联系人选择器完成，不申请此权限。'}),
  s('contacts-sync',3,'是否需要批量备份或同步通讯录？','例如：把通讯录备份到新手机，稍后再选择是否需要写回联系人。',['READ_CONTACTS'],{icon:'⇅',tag:'需申请',note:'批量读取通讯录仅限换机克隆、备份、同步等官网允许的用途。'}),
  s('calendar',3,'是否需要读取日历活动？','例如：读取已获授权范围内的日程，展示当天安排。',['READ_CALENDAR'],{icon:'▤'}),
  s('calendar-write',3,'是否需要添加、修改或删除日历活动？','例如：用户报名会议后，把会议时间添加到系统日历。',['WRITE_CALENDAR'],{icon:'＋'}),
  s('paste-control',3,'是否需要读取或粘贴剪贴板内容？','例如：读取复制的文字，并填入应用的输入框。',['READ_PASTEBOARD'],{icon:'▥',note:'已列出 READ_PASTEBOARD。也可让用户点击系统粘贴按钮（PasteButton）读取内容，不申请此权限；直接读取的设备和用途限制见结果清单。'}),
  s('paste-read',3,'是否需要直接读取剪贴板内容？','例如：文档编辑器读取待粘贴内容，或识别复制的银行卡号。',['READ_PASTEBOARD'],{icon:'▣',tag:'需申请',note:'手机等设备只有官网列出的用途才能申请。电脑（PC/2in1）首次使用时的授权方式与其他设备不同，请查看官方条件。'}),
  s('notification',3,'是否需要向用户发送通知？','例如：收到新消息、订单状态变化时，发送应用自己的通知。',[],{icon:'♧',note:'通过系统通知接口请求用户开启通知（如 notificationManager.requestEnableNotification）。发送自己的通知，不需要添加读取其他应用通知的权限（SUBSCRIBE_NOTIFICATION）。'}),
  s('vibrate',3,'是否需要让设备振动？','例如：点击按钮时给出振动反馈，或用振动提醒事件。',['VIBRATE'],{icon:'⌁'}),
  s('biometric',3,'是否需要用指纹或人脸验证身份？','例如：解锁应用内的敏感资料前，调用系统身份验证。',['ACCESS_BIOMETRIC'],{icon:'◎'}),
  s('privacy',3,'是否需要禁止敏感页面被截屏或录屏？','例如：显示保密资料时，把当前窗口设为隐私窗口。',['PRIVACY_WINDOW'],{icon:'◇'}),
  s('files-picker',3,'是否让用户手动选择要打开或保存的文件？','例如：用户在系统文件选择器中，选一份文档打开。',[],{icon:'▱',note:'使用系统文件选择器（如 DocumentViewPicker），按返回的文件地址（URI）及接口要求打开文件，不会因此添加读取全盘或公共文件夹的权限。'}),
  s('persist',3,'是否需要下次继续访问用户选过的文件？','例如：用户授权打开某个文件后，重新启动应用仍能继续编辑。',['FILE_ACCESS_PERSIST'],{icon:'∞',note:'只能继续访问用户已有效授权的文件，不能读取任意文件。还需用持久化接口保留目标文件地址（URI）的访问授权；上架前仍需到官网申请受限权限。'}),
  s('download',3,'是否需要直接读写“下载”文件夹？','例如：自动扫描 Download 文件夹中的文件，并整理保存结果。',['READ_WRITE_DOWNLOAD_DIRECTORY'],{icon:'↓',devices:['PC/2in1','Tablet'],note:'此权限虽然标为普通等级（normal），上架前仍需按官网要求申请受限权限。'}),
  s('screenshot',4,'是否需要获取屏幕截图？','例如：获取当前屏幕图像，用于截图标注。',['CUSTOM_SCREEN_CAPTURE'],{icon:'▧',note:'手机从 API 21 起支持此权限。实际截屏是否需要用户确认、能否调用，还要以具体接口的要求为准。'}),
  s('screen-record',4,'是否需要在用户开启授权后免逐次确认录屏？','例如：远程桌面共享屏幕；用户仍需先在系统设置中开启授权。',['CUSTOM_SCREEN_RECORDING'],{icon:'▷',tag:'设置授权',note:'先到官网申请此权限，再由用户到系统设置中开启。仅申请通过不能直接免确认录屏。电视（TV）从 API 26.0.0 起支持。'}),
  s('control-device',4,'是否需要远程控制或辅助操作设备？','例如：远程桌面的被控端接收鼠标键盘操作，或由智能体辅助操作电脑。',['CONTROL_DEVICE'],{icon:'⌘',tag:'设置授权',note:'仅支持电脑（PC/2in1）。需要官网审批，并由用户到系统设置中手动允许；只能用于官网允许的远程控制或辅助操作等用途。'}),
  s('dlp-plugin',4,'是否需要把企业文件保护服务接入云端？','例如：为系统文件保护服务（DLP）接入企业的连云插件。',['ACCESS_DLP_SERVICE'],{icon:'◇',tag:'需申请'}),
  s('dlp-policy',4,'是否需要管理其他应用的文件加密规则？','例如：企业安全应用指定哪些应用保存文件时需要自动加密。',['DLP_POLICY_MANAGER'],{icon:'▣',tag:'企业'}),
  s('file-guard',4,'是否需要给文件设置密级或安全标签？','例如：企业安全应用扫描公共目录，为文件添加“机密”等标签。',['FILE_GUARD_MANAGER'],{icon:'▤',tag:'企业'}),
  s('audit',4,'是否需要查询设备上的安全审计记录？','例如：企业安全应用查询安全事件，帮助管理员检查风险。',['QUERY_AUDIT_EVENT'],{icon:'≡',tag:'企业'}),
  s('dlp-file',4,'是否需要生成或解密企业保护文件？','例如：设备管理应用生成 DLP 保护文件，或按文件规则进行解密。',['ENTERPRISE_ACCESS_DLP_FILE'],{icon:'◇',tag:'MDM'}),
  s('sensitive',4,'是否需要检查文件里有没有敏感内容？','例如：设备管理应用检查文件是否包含需要保护的信息。',['ENTERPRISE_DATA_IDENTIFY_FILE'],{icon:'◎',tag:'MDM'}),
  s('mdm-apps',4,'是否需要替管理员安装或卸载应用？','例如：企业设备管理应用给办公设备统一安装业务应用。',['ENTERPRISE_INSTALL_BUNDLE'],{icon:'▦',tag:'MDM'}),
  s('mdm-usb',4,'是否需要由管理员管控设备的 USB 使用？','例如：企业设备管理应用按公司规则设置 USB 使用策略。',['ENTERPRISE_MANAGE_USB'],{icon:'⇄',tag:'MDM'})
];
export const initialState = () => ({ step:0, type:'normal', developerType:'unknown', form:'app', device:'PC/2in1', selected:[], extraPermissions:[], managedByMdm:false, mdmGroupPolicies:{}, videoAudio:false, accuracy:'approximate', background:'none', contactsWrite:false });
export function compareVersions(a,b) { const x=String(a).split('.').map(Number),y=String(b).split('.').map(Number); for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return Math.sign(d);}return 0; }
export function routeFor(p) {
  if(p.category==='仅MDM应用可用权限')return 'mdm';
  if(p.category==='企业类应用可用权限')return 'enterprise';
  if(p.category==='受限开放权限'||['READ_WRITE_DOWNLOAD_DIRECTORY','READ_WRITE_DOCUMENTS_DIRECTORY'].some(n=>p.name.endsWith('.'+n)))return 'acl';
  return 'direct';
}
export function evaluate(state, catalog) {
  const wanted=new Map(); const alternatives=[];
  const extraScenes=(state.extraPermissions||[]).map(name=>catalog.find(p=>p.name===name)).filter(p=>p&&!p.deprecated).map(p=>({id:`permission:${p.name}`,title:purposeFromQuestion(permissionCopy(p).question),permissions:[p.name.replace('ohos.permission.','')]}));
  const activeScenes=[...scenes.filter(s=>state.selected.includes(s.id)),...extraScenes];
  function add(short,scene){const name='ohos.permission.'+short;if(!wanted.has(name))wanted.set(name,{sceneIds:[],reasons:[]});const item=wanted.get(name);if(!item.sceneIds.includes(scene.id)){item.sceneIds.push(scene.id);item.reasons.push(purposeFromQuestion(scene.title));}}
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
  expandRequirements(wanted);
  const requiredVersions = new Map([...wanted.keys()].map(name=>{
    const permission=catalog.find(p=>p.name===name);
    if(!permission)throw new Error('Missing permission: '+name);
    return [name,minimumPermissionVersion(permission,state,compareVersions)];
  }));
  const minimumApi = [...requiredVersions.values()].reduce((highest,item)=>!highest||compareVersions(item.version,highest)>0?item.version:highest,null);
  // Explicit API remains available for historical rule tests; the UI always derives it.
  state={...state,api:state.api||minimumApi||'26.0.1'};
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
    const additional=extraConstraints(p,state,compareVersions);blocks.push(...additional.blocks);warnings.push(...additional.warnings);
    const sceneNotes=[...new Set(why.sceneIds.map(id=>scenes.find(s=>s.id===id)?.note).filter(Boolean))];
    return {...p,...why,minimumApi:requiredVersions.get(name).version,minimumApiReason:requiredVersions.get(name).reason,route,blocks:[...new Set(blocks)],warnings,sceneNotes,eligible:blocks.length===0};
  });
  // A derived prerequisite should not leak into configuration when every
  // requesting capability is currently blocked. Explicit selections remain.
  for (let pass=0; pass<permissions.length; pass++) {
    let changed=false;
    for(const edge of requirementEdges){
      const parent=permissions.find(p=>p.name===edge.from),child=permissions.find(p=>p.name===edge.to);
      if(parent?.eligible&&child&&!child.eligible){parent.blocks.push(`必须配套的${edge.to.replace('ohos.permission.','')}尚未满足声明条件。`);parent.eligible=false;changed=true;}
    }
    for (const permission of permissions) {
      if (permission.autoAdded&&permission.eligible&&(permission.requiredBy||[]).every(name=>!permissions.find(p=>p.name===name)?.eligible)) {
        permission.blocks.push('关联来源权限尚未满足条件，本项暂不生成配置。');permission.eligible=false;changed=true;
      }
    }
    if(!changed)break;
  }
  const relationshipResult=applyRelationships(state,permissions,compareVersions);
  return {permissions,alternatives,compatibility:{minimumApi,
    determinedBy:permissions.filter(p=>minimumApi&&compareVersions(p.minimumApi,minimumApi)===0).map(p=>p.name),
    conditionsUnmet:permissions.filter(p=>!p.eligible).map(p=>p.name)
  },...relationshipResult};
}
export function makeConfig(result) {
  const strings=[];
  const requestPermissions=result.permissions.filter(p=>p.eligible).map((p,i)=>{
    const item={name:p.name};
    if(p.grant.includes('user_grant')){const key=`permission_reason_${i+1}`;item.reason=`$string:${key}`;item.usedScene={abilities:['EntryAbility'],when:p.name.endsWith('.LOCATION_IN_BACKGROUND')?'always':'inuse'};const mediaLocation=result.permissions.some(item=>item.eligible&&item.name==='ohos.permission.MEDIA_LOCATION');const reason=`用于${p.reasons.join('、')}`+(p.name==='ohos.permission.READ_IMAGEVIDEO'&&mediaLocation?'，并访问所选媒体中的地理位置信息':'');strings.push({name:key,value:reason});}
    return item;
  });
  return { moduleFragment:{module:{requestPermissions}}, stringFragment:{string:strings} };
}
