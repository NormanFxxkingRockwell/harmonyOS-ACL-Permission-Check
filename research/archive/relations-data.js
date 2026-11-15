// Official-document review facts. Updated manually; not a runtime permission grant.
export const relationDefinitions = [
  {
    "id": "network-capabilities-independent",
    "type": "scope",
    "permissions": [
      "ohos.permission.INTERNET",
      "ohos.permission.GET_NETWORK_INFO",
      "ohos.permission.SET_NETWORK_INFO",
      "ohos.permission.GET_WIFI_INFO",
      "ohos.permission.SET_WIFI_INFO"
    ],
    "title": "联网、网络状态与Wi-Fi配置分别判断",
    "description": "普通业务联网不自动要求Wi-Fi控制或定位权限；网络状态、Wi-Fi信息和配置能力依各自接口申请，不因名称相近全部联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "wifi-current-scan-no-location",
    "type": "conditional",
    "permissions": [
      "ohos.permission.GET_WIFI_INFO",
      "ohos.permission.GET_WIFI_PEERS_MAC",
      "ohos.permission.GET_WIFI_LOCAL_MAC",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION"
    ],
    "title": "扫描结果、真实地址与旧接口权限不同",
    "description": "getScanInfoList只要求GET_WIFI_INFO；需要真实BSSID再评估GET_WIFI_PEERS_MAC，读取本机真实MAC另看GET_WIFI_LOCAL_MAC。旧getScanResults的AND/OR组合不能套用到所有新Wi-Fi接口。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-wifimanager/",
    "confidence": "api-specific"
  },
  {
    "id": "wifi-enterprise-switch-permissions",
    "type": "conditional",
    "permissions": [
      "ohos.permission.SET_WIFI_INFO",
      "ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION"
    ],
    "title": "Wi-Fi开关接口另需管理资格",
    "description": "API20+的disableWifi要求SET_WIFI_INFO，并需要系统连接管理权限或企业MANAGE_ENTERPRISE_WIFI_CONNECTION。该接口组合不能反推普通Wi-Fi查询也需企业权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-wifimanager/",
    "confidence": "api-specific"
  },
  {
    "id": "wifi-query-versus-sensitive-config",
    "type": "scope",
    "permissions": [
      "ohos.permission.GET_WIFI_INFO",
      "ohos.permission.GET_WIFI_CONFIG",
      "ohos.permission.SET_WIFI_INFO",
      "ohos.permission.SET_WIFI_CONFIG",
      "ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION"
    ],
    "title": "普通Wi-Fi信息与企业敏感配置不同",
    "description": "普通连接信息、包含PSK等敏感配置、企业连接管控是不同开放能力；GET_WIFI_INFO并不授予读取密码或企业Wi-Fi管理资格。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "wifi-mac-device-ambiguity",
    "type": "scope",
    "permissions": [
      "ohos.permission.GET_WIFI_LOCAL_MAC",
      "ohos.permission.GET_ETHERNET_LOCAL_MAC",
      "ohos.permission.GET_IP_MAC_INFO",
      "ohos.permission.GET_WIFI_PEERS_MAC"
    ],
    "title": "本机、对端和网络设备地址分开",
    "description": "本机Wi-Fi、以太网、对端设备和网络IP/MAC权限不互相替代。两种本机MAC权限的TV场景与变更段存在差异，需按目标设备向官方确认。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "bluetooth-persistent-requires-access",
    "type": "requires",
    "permissions": [
      "ohos.permission.PERSISTENT_BLUETOOTH_PEERS_MAC",
      "ohos.permission.ACCESS_BLUETOOTH"
    ],
    "title": "蓝牙地址持久化还需要蓝牙访问",
    "description": "addPersistentDeviceId、deletePersistentDeviceId、getPersistentDeviceIds均同时要求ACCESS_BLUETOOTH和PERSISTENT_BLUETOOTH_PEERS_MAC；固化本身不是已连接或已配对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-references/api/js-apis-bluetooth-access",
    "confidence": "api-specific"
  },
  {
    "id": "bluetooth-api-version-permission",
    "type": "conditional",
    "permissions": [
      "ohos.permission.USE_BLUETOOTH",
      "ohos.permission.DISCOVER_BLUETOOTH",
      "ohos.permission.ACCESS_BLUETOOTH"
    ],
    "title": "旧蓝牙权限不等价于新接口授权",
    "description": "当前扫描、连接和开关等接口按ACCESS_BLUETOOTH要求处理；getState从API13起不再要求此前权限，stateChange从API18起不再校验。不能把旧条目名称一并当新接口前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-references/api/js-apis-bluetooth-access",
    "confidence": "api-specific"
  },
  {
    "id": "bluetooth-power-user-confirmation",
    "type": "authorization",
    "permissions": [
      "ohos.permission.ACCESS_BLUETOOTH"
    ],
    "title": "蓝牙权限不替代开关确认",
    "description": "enableBluetooth等接口另有用户确认蓝牙开关的交互。已有蓝牙权限或MDM用户权限策略不等于可跳过接口自身的开关确认。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-references/api/js-apis-bluetooth-access",
    "confidence": "api-specific"
  },
  {
    "id": "bluetooth-advertising-name-scope",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ACCESS_BLUETOOTH",
      "ohos.permission.MANAGE_BLUETOOTH_ADVERTISER_NAME"
    ],
    "title": "自定义广播名称只在相应广播业务增加",
    "description": "蓝牙接入与自定义BLE广播名称是不同能力。只有发送自定义广播名称的业务才考虑名称管理权限，不为所有蓝牙连接自动追加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "distributed-and-transport-independent",
    "type": "scope",
    "permissions": [
      "ohos.permission.DISTRIBUTED_DATASYNC",
      "ohos.permission.ACCESS_BLUETOOTH",
      "ohos.permission.ACCESS_NEARLINK",
      "ohos.permission.ALLOW_ACCESSORY_ACCESS",
      "ohos.permission.ACCESS_CAR_DISTRIBUTED_ENGINE",
      "ohos.permission.KNOCK_COLLABORATION"
    ],
    "title": "分布式授权不替代具体互联服务",
    "description": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user",
    "confidence": "documented"
  },
  {
    "id": "nfc-tags-versus-emulation",
    "type": "scope",
    "permissions": [
      "ohos.permission.NFC_TAG",
      "ohos.permission.NFC_CARD_EMULATION"
    ],
    "title": "NFC标签读写与卡模拟分开",
    "description": "标签读写和卡模拟服务是两种能力；选择一种不意味着必须申请另一种。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "vehicle-cloud-read-write",
    "type": "scope",
    "permissions": [
      "ohos.permission.vehicle.HIMA_DATA_READ",
      "ohos.permission.vehicle.HIMA_DATA_WRITE",
      "ohos.permission.ACCESS_CAR_AUDIO",
      "ohos.permission.vehicle.ACCESS_CAR_SECURITY_PRIVACY"
    ],
    "title": "车载音频、隐私和HIMA数据按操作分工",
    "description": "HIMA云读取与写入、车载音频、车载隐私服务分别对应不同操作，不把读权限当作写权限，也不由云数据名称自动推导整个网络或账号权限组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "network-policy-diagnostics-independent",
    "type": "scope",
    "permissions": [
      "ohos.permission.SET_PAC_URL",
      "ohos.permission.MANAGE_APN_SETTING",
      "ohos.permission.LINKTURBO",
      "ohos.permission.ACCESS_NET_TRACE_INFO",
      "ohos.permission.GET_NETWORK_STATS",
      "ohos.permission.GET_IP_MAC_INFO"
    ],
    "title": "代理、专网、加速与诊断各有独立范围",
    "description": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "firewall-query-write-separate",
    "type": "scope",
    "permissions": [
      "ohos.permission.MANAGE_NET_FIREWALL",
      "ohos.permission.GET_NET_FIREWALL",
      "ohos.permission.kernel.TRAFFIC_FILTER",
      "ohos.permission.SET_NET_EXT_ATTRIBUTE",
      "ohos.permission.ENTERPRISE_MANAGE_EAP"
    ],
    "title": "企业网络防护能力不等于一个总权限",
    "description": "防火墙配置、查询、流量路径处理、内外网属性和EAP私有信息分别按具体操作和接口选择，不能按企业网络功能将全部权限联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "network-capture-authentication",
    "type": "authorization",
    "permissions": [
      "ohos.permission.kernel.NET_RAW",
      "ohos.permission.REQUEST_LOCAL_ACCOUNT_AUTHORIZATION"
    ],
    "title": "抓包权限之外仍需用户认证",
    "description": "NET_RAW属于系统授权，但实际网络抓包仍需用户认证。是否联用本地账号授权接口取决于实际API，不自动把账号授权入口当所有网络能力前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "camera-audio-conditional",
    "type": "conditional",
    "permissions": [
      "ohos.permission.CAMERA",
      "ohos.permission.MICROPHONE"
    ],
    "title": "有声录像才增加麦克风",
    "description": "相机拍照或静音录像不因使用相机而自动需要MICROPHONE；调用AVRecorder且涉及录音时，才另申请麦克风权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avrecorder/",
    "confidence": "api-specific"
  },
  {
    "id": "location-precise-requires-approximate",
    "type": "requires",
    "permissions": [
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION"
    ],
    "title": "精确定位需要同时申请模糊定位",
    "description": "LOCATION必须与APPROXIMATELY_LOCATION共同申请；模糊定位可独立申请，不反向要求精确定位。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user",
    "confidence": "documented"
  },
  {
    "id": "location-background-prerequisite",
    "type": "requires",
    "permissions": [
      "ohos.permission.LOCATION_IN_BACKGROUND",
      "ohos.permission.APPROXIMATELY_LOCATION",
      "ohos.permission.LOCATION"
    ],
    "title": "后台定位先取得前台授权",
    "description": "前台可选择模糊定位，或模糊+精确定位；先向用户申请并获得前台权限，再引导到系统设置授予后台位置权限。并非后台定位一定要精确定位。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user",
    "confidence": "documented"
  },
  {
    "id": "location-continuous-task-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.LOCATION_IN_BACKGROUND",
      "ohos.permission.KEEP_BACKGROUND_RUNNING",
      "ohos.permission.APPROXIMATELY_LOCATION",
      "ohos.permission.LOCATION"
    ],
    "title": "符合长时任务场景时可不申请后台位置",
    "description": "按业务需要使用LOCATION类型长时任务加前台位置权限，可在后台获取位置；仍需配置与启动长时任务，不是仅声明KEEP_BACKGROUND_RUNNING就替代。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user",
    "confidence": "documented"
  },
  {
    "id": "imagevideo-location-reason",
    "type": "authorization",
    "permissions": [
      "ohos.permission.READ_IMAGEVIDEO",
      "ohos.permission.MEDIA_LOCATION"
    ],
    "title": "图库位置用途合并到读取权限文案",
    "description": "同时申请READ_IMAGEVIDEO和MEDIA_LOCATION时，仅展示READ_IMAGEVIDEO的reason，后者文案应同时说明媒体位置信息用途。该关系不表示申请MEDIA_LOCATION必需批量读取图库。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/",
    "confidence": "documented"
  },
  {
    "id": "media-location-vs-device-location",
    "type": "scope",
    "permissions": [
      "ohos.permission.MEDIA_LOCATION",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION"
    ],
    "title": "媒体位置不等于实时定位",
    "description": "MEDIA_LOCATION是媒体文件内被隐私处理的地理位置信息；LOCATION/APPROXIMATELY_LOCATION是设备当前位置，不应互相自动添加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-faqs/faqs-image-61/",
    "confidence": "api-specific"
  },
  {
    "id": "media-picker-read-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.READ_IMAGEVIDEO"
    ],
    "title": "手选素材优先系统图库选择器",
    "description": "用户手动选择、处理或分享素材优先PhotoViewPicker；读取本应用自身写入图库的资源也不默认需要批量读取权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "media-save-control-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.WRITE_IMAGEVIDEO",
      "ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO",
      "ohos.permission.CUSTOMIZE_SAVE_BUTTON"
    ],
    "title": "保存控件与写入权限是不同接入路径",
    "description": "用户指定保存优先安全保存控件或授权弹窗；自定义控件样式权限不等于替代用户触发授权，不自动追加WRITE_IMAGEVIDEO。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "media-write-short-term",
    "type": "authorization",
    "permissions": [
      "ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO"
    ],
    "title": "系统授权字段不代表全程不弹窗",
    "description": "此权限标记system_grant，但实际保存为最长30分钟的短时授权，超时需再次确认。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "audio-picker-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.READ_AUDIO",
      "ohos.permission.WRITE_AUDIO"
    ],
    "title": "用户选音频可用文件选择器",
    "description": "批量音频读写限克隆、备份、同步等允许场景；手选读取或保存音频优先AudioPicker。读写是独立操作，不自动一起添加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "contacts-picker-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.READ_CONTACTS",
      "ohos.permission.WRITE_CONTACTS"
    ],
    "title": "联系人读写与Picker按场景选择",
    "description": "批量读写限定克隆、备份、同步；手选联系人使用联系人Picker，普通修改引导联系人应用；读取不自动要求写入。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "calendar-scope-alternatives",
    "type": "scope",
    "permissions": [
      "ohos.permission.READ_CALENDAR",
      "ohos.permission.WRITE_CALENDAR",
      "ohos.permission.READ_WHOLE_CALENDAR",
      "ohos.permission.WRITE_WHOLE_CALENDAR"
    ],
    "title": "普通日历与全部日历按范围选择",
    "description": "普通权限主要覆盖本应用相关账户和本应用创建的日程；WHOLE权限覆盖全部账户/日程。API21+所列读接口接受READ_CALENDAR或READ_WHOLE_CALENDAR，写接口接受WRITE_CALENDAR或WRITE_WHOLE_CALENDAR；不是普遍AND依赖，旧API需单独核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-calendarmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "permission-groups-not-dependencies",
    "type": "authorization",
    "permissions": [
      "ohos.permission.READ_AUDIO",
      "ohos.permission.WRITE_AUDIO",
      "ohos.permission.READ_IMAGEVIDEO",
      "ohos.permission.WRITE_IMAGEVIDEO",
      "ohos.permission.MEDIA_LOCATION",
      "ohos.permission.READ_CONTACTS",
      "ohos.permission.WRITE_CONTACTS",
      "ohos.permission.READ_CALENDAR",
      "ohos.permission.WRITE_CALENDAR",
      "ohos.permission.READ_WHOLE_CALENDAR",
      "ohos.permission.WRITE_WHOLE_CALENDAR",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION",
      "ohos.permission.LOCATION_IN_BACKGROUND"
    ],
    "title": "同组授权不代表要申请全部组内权限",
    "description": "同组通常合并弹窗和授权，但位置、通讯录、日历组有例外。只声明业务需要的权限，不能为减少弹窗就把组内权限全选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/",
    "confidence": "documented"
  },
  {
    "id": "clipboard-paste-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.READ_PASTEBOARD"
    ],
    "title": "用户触发粘贴可不用直接读取权限",
    "description": "采用系统粘贴控件处理用户指定数据，替代主动读取剪贴板的受限路径。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "clipboard-pc-default-grant",
    "type": "authorization",
    "permissions": [
      "ohos.permission.READ_PASTEBOARD"
    ],
    "title": "PC首次默认允许仍可撤销",
    "description": "PC/2in1首次申请剪贴板时不弹窗、默认允许，但用户仍可在设置中修改；其他设备的允许选项与场景限制不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "clipboard-sharing-scope",
    "type": "scope",
    "permissions": [
      "ohos.permission.READ_PASTEBOARD",
      "ohos.permission.MANAGE_PASTEBOARD_APP_SHARE_OPTION",
      "ohos.permission.MANAGE_UDMF_APP_SHARE_OPTION"
    ],
    "title": "读取数据与管控分享范围分别处理",
    "description": "READ_PASTEBOARD访问剪贴板；后两项管理应用剪贴板或UDMF数据的分享范围，不能由名称推导互相必需或自动授予。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "file-picker-uri-persist",
    "type": "conditional",
    "permissions": [
      "ohos.permission.FILE_ACCESS_PERSIST"
    ],
    "title": "文件URI先临时授权，再持久化和激活",
    "description": "先通过Picker等取得可持久化的临时URI权限，再persistPermission保存；应用或设备重启后按需activatePermission。只能持久化已取得的权限，不获得任意目录访问。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/file-persistpermission/",
    "confidence": "documented"
  },
  {
    "id": "file-persist-release-path",
    "type": "authorization",
    "permissions": [
      "ohos.permission.FILE_ACCESS_PERSIST"
    ],
    "title": "本地调试与上架流程不同",
    "description": "API12及以后仅本地调试可直接声明；上架仍须受限申请流程。权限等级normal不能单独决定申请路径。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "directory-permission-scope",
    "type": "scope",
    "permissions": [
      "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
      "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY",
      "ohos.permission.READ_WRITE_DESKTOP_DIRECTORY"
    ],
    "title": "公共目录权限按目标目录申请",
    "description": "三项各自覆盖Download/Documents/Desktop及子目录；同组不表示需要一起声明。Download/Documents虽normal，官网仍要求受限申请。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user",
    "confidence": "documented"
  },
  {
    "id": "directory-device-source-conflict",
    "type": "scope",
    "permissions": [
      "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
      "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY",
      "ohos.permission.READ_WRITE_DESKTOP_DIRECTORY"
    ],
    "title": "文件夹设备范围存在来源差异",
    "description": "权限组指南写仅2in1，权限列表或正文又包含Tablet；平板场景需继续核对目标API和版本，不应据单个来源保证可用。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/",
    "confidence": "documented"
  },
  {
    "id": "health-device-source-conflict",
    "type": "scope",
    "permissions": [
      "ohos.permission.ACTIVITY_MOTION",
      "ohos.permission.READ_HEALTH_DATA"
    ],
    "title": "健康与运动设备支持存在来源差异",
    "description": "权限组指南说明ACTIVITY_MOTION不支持2in1、READ_HEALTH_DATA仅穿戴；与权限列表的更广设备元数据不一致，应明确提示或保守处理。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/",
    "confidence": "documented"
  },
  {
    "id": "screen-capture-vs-recording",
    "type": "scope",
    "permissions": [
      "ohos.permission.CUSTOM_SCREEN_CAPTURE",
      "ohos.permission.CUSTOM_SCREEN_RECORDING"
    ],
    "title": "截图和录屏授权路径不同",
    "description": "CUSTOM_SCREEN_CAPTURE为用户授权类；CUSTOM_SCREEN_RECORDING为手动设置类，用户开启后录屏不再逐次确认。不能仅按同属屏幕采集自动相互添加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "full-disk-manual-settings",
    "type": "authorization",
    "permissions": [
      "ohos.permission.ACCESS_USER_FULL_DISK"
    ],
    "title": "访问公共路径前仍需手动设置授权",
    "description": "只有用户先在系统设置授权，访问公共路径时才不再额外逐次弹窗；不等于普通应用可默认无授权访问全部文件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "print-capability-vs-enterprise-control",
    "type": "scope",
    "permissions": [
      "ohos.permission.PRINT",
      "ohos.permission.ENTERPRISE_MANAGE_PRINT"
    ],
    "title": "打印使用与企业打印管理是不同能力",
    "description": "PRINT用于打印框架能力，ENTERPRISE_MANAGE_PRINT用于企业打印状态及打印机信息管理；条目没有说明一方自动授予或必需包含另一方。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "audio-accessory-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.MANAGE_AUDIO_ACCESSORY"
    ],
    "title": "音频配件可考虑智慧生活插件接入",
    "description": "音频配件注册管理可按官网建议以插件接入智慧生活；注册管理本身不自动表示采集麦克风音频。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "mdm-policy-user-grant",
    "type": "authorization",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION",
      "ohos.permission.ACCESS_BLUETOOTH",
      "ohos.permission.MEDIA_LOCATION",
      "ohos.permission.APP_TRACKING_CONSENT",
      "ohos.permission.ACTIVITY_MOTION",
      "ohos.permission.CAMERA",
      "ohos.permission.DISTRIBUTED_DATASYNC",
      "ohos.permission.LOCATION_IN_BACKGROUND",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION",
      "ohos.permission.MICROPHONE",
      "ohos.permission.READ_CALENDAR",
      "ohos.permission.WRITE_CALENDAR",
      "ohos.permission.READ_HEALTH_DATA",
      "ohos.permission.ACCESS_NEARLINK",
      "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
      "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY",
      "ohos.permission.CUSTOM_SCREEN_CAPTURE",
      "ohos.permission.READ_CONTACTS",
      "ohos.permission.WRITE_CONTACTS",
      "ohos.permission.READ_AUDIO",
      "ohos.permission.WRITE_AUDIO",
      "ohos.permission.READ_IMAGEVIDEO",
      "ohos.permission.WRITE_IMAGEVIDEO",
      "ohos.permission.READ_WRITE_DESKTOP_DIRECTORY",
      "ohos.permission.READ_PASTEBOARD",
      "ohos.permission.READ_WHOLE_CALENDAR",
      "ohos.permission.WRITE_WHOLE_CALENDAR",
      "ohos.permission.FLOAT_VIEW",
      "ohos.permission.GET_ALL_BUNDLE_INFO",
      "ohos.permission.DIRECT_CALL"
    ],
    "title": "MDM可管理被管应用的用户授权策略",
    "description": "API20+的设备管理接口可对指定应用实例已声明的user_grant权限下发GRANTED或DENIED。管控端持有管理权限不等于业务App自动获权；业务App也无需为了被管理而自行声明此MDM权限。这里只表达可规划的管理路径，不保证所有版本和设备对每项权限实际执行成功。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/",
    "confidence": "documented"
  },
  {
    "id": "mdm-policy-default",
    "type": "authorization",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION"
    ],
    "title": "DEFAULT不是静默授予",
    "description": "PermissionManagedState.DEFAULT=1表示默认由用户授予，GRANTED=0表示静默授予，DENIED=-1表示静默拒绝。用户选择或声明此管理权限本身不等于已下发GRANTED策略。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/",
    "confidence": "documented"
  },
  {
    "id": "mdm-policy-group-boundary",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION",
      "ohos.permission.ACCESS_BLUETOOTH",
      "ohos.permission.MEDIA_LOCATION",
      "ohos.permission.APP_TRACKING_CONSENT",
      "ohos.permission.ACTIVITY_MOTION",
      "ohos.permission.CAMERA",
      "ohos.permission.DISTRIBUTED_DATASYNC",
      "ohos.permission.LOCATION_IN_BACKGROUND",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION",
      "ohos.permission.MICROPHONE",
      "ohos.permission.READ_CALENDAR",
      "ohos.permission.WRITE_CALENDAR",
      "ohos.permission.READ_HEALTH_DATA",
      "ohos.permission.ACCESS_NEARLINK",
      "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
      "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY",
      "ohos.permission.CUSTOM_SCREEN_CAPTURE",
      "ohos.permission.READ_CONTACTS",
      "ohos.permission.WRITE_CONTACTS",
      "ohos.permission.READ_AUDIO",
      "ohos.permission.WRITE_AUDIO",
      "ohos.permission.READ_IMAGEVIDEO",
      "ohos.permission.WRITE_IMAGEVIDEO",
      "ohos.permission.READ_WRITE_DESKTOP_DIRECTORY",
      "ohos.permission.READ_PASTEBOARD",
      "ohos.permission.READ_WHOLE_CALENDAR",
      "ohos.permission.WRITE_WHOLE_CALENDAR",
      "ohos.permission.FLOAT_VIEW",
      "ohos.permission.GET_ALL_BUNDLE_INFO",
      "ohos.permission.DIRECT_CALL"
    ],
    "title": "按应用已声明的权限组下发策略",
    "description": "接口以权限组为单位，需要同时传入目标应用在module.json5已声明的同组全部权限。不是要求把该组所有可能权限都补进应用声明。策略目标仅是user_grant，不应套用于manual_settings或替代权限开放资格、Profile和声明。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/",
    "confidence": "documented"
  },
  {
    "id": "mdm-policy-instance",
    "type": "scope",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION"
    ],
    "title": "策略作用于具体应用实例",
    "description": "目标由appIdentifier或appId、accountId、appIndex确定；同一应用不同本地账号和分身须区分。多MDM对同一实例同一权限存在策略冲突规则，不能把一个设备策略视为所有实例通用。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/",
    "confidence": "documented"
  },
  {
    "id": "mdm-policy-location-special",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION",
      "ohos.permission.LOCATION_IN_BACKGROUND",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION"
    ],
    "title": "后台定位仍有特殊前置条件",
    "description": "定位权限组包含前台和后台位置权限。管理接口泛称支持user_grant，但未找到明确条文保证GRANTED可替代后台定位指南的前台授权及设置流程；网站应保留该特殊步骤并提示按目标版本实测，不宣称已自动绕过。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/",
    "confidence": "api-specific"
  },
  {
    "id": "mdm-disallowed-exception",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_SECURITY",
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION"
    ],
    "title": "权限禁用例外名单不等于授权",
    "description": "API26的setDisallowedPermission先禁止某权限，addAllowedPermissionBundle仅让指定已申请该权限的应用不受该禁用策略限制。它不是GRANTED授权接口；解除禁用会清理相应例外名单。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/",
    "confidence": "api-specific"
  },
  {
    "id": "mdm-delegation-keeps-permission",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY"
    ],
    "title": "委托策略仍需被委托应用的对应权限",
    "description": "setDelegatedPolicies由有效管理员调用；被委托应用需为enterprise_normal或enterprise_mdm，并申请委托策略对应接口所需权限。拥有委托权限不能代替所有目标接口权限，也不应把委托权限自动加到被委托App。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-adminmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "mdm-administrator-state",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ENTERPRISE_GET_DEVICE_INFO",
      "ohos.permission.ENTERPRISE_GET_NETWORK_INFO",
      "ohos.permission.ENTERPRISE_INSTALL_BUNDLE",
      "ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY",
      "ohos.permission.ENTERPRISE_RESET_DEVICE",
      "ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY",
      "ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY",
      "ohos.permission.ENTERPRISE_SET_DATETIME",
      "ohos.permission.ENTERPRISE_SET_NETWORK",
      "ohos.permission.ENTERPRISE_SET_WIFI",
      "ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT",
      "ohos.permission.ENTERPRISE_RESTRICT_POLICY",
      "ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME",
      "ohos.permission.ENTERPRISE_MANAGE_USB",
      "ohos.permission.ENTERPRISE_MANAGE_NETWORK",
      "ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE",
      "ohos.permission.ENTERPRISE_GET_SETTINGS",
      "ohos.permission.ENTERPRISE_SET_BROWSER_POLICY",
      "ohos.permission.SET_ENTERPRISE_INFO",
      "ohos.permission.ENTERPRISE_MANAGE_SECURITY",
      "ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH",
      "ohos.permission.ENTERPRISE_MANAGE_SYSTEM",
      "ohos.permission.ENTERPRISE_MANAGE_WIFI",
      "ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS",
      "ohos.permission.ENTERPRISE_MANAGE_APPLICATION",
      "ohos.permission.ENTERPRISE_MANAGE_LOCATION",
      "ohos.permission.ENTERPRISE_REBOOT",
      "ohos.permission.ENTERPRISE_LOCK_DEVICE",
      "ohos.permission.ENTERPRISE_MANAGE_SETTINGS",
      "ohos.permission.ENTERPRISE_OPERATE_DEVICE",
      "ohos.permission.ENTERPRISE_ADMIN_MANAGE",
      "ohos.permission.ENTERPRISE_RECOVERY_KEY",
      "ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY",
      "ohos.permission.ENTERPRISE_GET_ALL_BUNDLE_INFO",
      "ohos.permission.ENTERPRISE_SET_USER_RESTRICTION",
      "ohos.permission.ENTERPRISE_MANAGE_APN",
      "ohos.permission.ENTERPRISE_MANAGE_TELEPHONY",
      "ohos.permission.ENTERPRISE_SET_KIOSK",
      "ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES",
      "ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT",
      "ohos.permission.ENTERPRISE_SET_WALLPAPER",
      "ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS",
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION",
      "ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE",
      "ohos.permission.ENTERPRISE_ACCESS_DLP_FILE",
      "ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_START_ABILITIES",
      "ohos.permission.ENTERPRISE_READ_LOG",
      "ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS",
      "ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS",
      "ohos.permission.ENTERPRISE_VPN",
      "ohos.permission.ENTERPRISE_REQUEST_PUBLISH_FORM",
      "ohos.permission.ENTERPRISE_EXTERNAL_READ",
      "ohos.permission.ENTERPRISE_ENCRYPT_BLOCK_DEVICE"
    ],
    "title": "MDM权限声明与管理员激活是不同步骤",
    "description": "MDM权限列表面向企业设备管理场景；大量MDM接口还校验有效设备管理员及管理范围。签名声明并不自动变成已激活管理员。HEM部署、管理员类型、权限和接口所需系统能力需分别满足；不自动为所有MDM能力添加某个激活权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-adminmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "mdm-activation-paths",
    "type": "scope",
    "permissions": [
      "ohos.permission.ENTERPRISE_ADMIN_MANAGE",
      "ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN"
    ],
    "title": "管理员激活和取消激活按调用方角色区分",
    "description": "enableDeviceAdmin由SDA激活其他DA，当前接口仅PC/2in1；enableSelfDeviceAdmin用于HEM商用部署企业设备上的自身激活，需凭证，接口从API26.0.0起且当前仅PC/2in1。权限条目起始版本不等于某个接口起始版本；自激活权限不代表已激活。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-adminmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "uad-provisioning-versus-policy",
    "type": "conditional",
    "permissions": [
      "ohos.permission.PERSONAL_MANAGE_RESTRICTIONS",
      "ohos.permission.START_PROVISIONING_MESSAGE"
    ],
    "title": "UAD部署与个人设备策略相互区分",
    "description": "两项均要求UAD场景。START_PROVISIONING_MESSAGE用于启动部署/激活流程，PERSONAL_MANAGE_RESTRICTIONS用于管理个人设备限制策略。startAdminProvision当前API描述为BYOD管理员页面且Phone/Tablet可用，不能把通用MDM/企业应用混同为UAD。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-adminmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "enterprise-signing-boundary",
    "type": "scope",
    "permissions": [
      "ohos.permission.SET_FILE_GUARD_POLICY",
      "ohos.permission.FILE_GUARD_MANAGER",
      "ohos.permission.FILE_GUARD_FILE_WRITE",
      "ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS",
      "ohos.permission.GET_LOCAL_ACCOUNT_IDENTIFIERS",
      "ohos.permission.GET_DOMAIN_ACCOUNTS",
      "ohos.permission.QUERY_AUDIT_EVENT",
      "ohos.permission.ACCESS_ENTERPRISE_USER_TRUSTED_CERT",
      "ohos.permission.GET_DOMAIN_ACCOUNT_SERVER_CONFIGS",
      "ohos.permission.MANAGE_DOMAIN_ACCOUNT_SERVER_CONFIGS",
      "ohos.permission.MANAGE_DOMAIN_ACCOUNTS",
      "ohos.permission.GET_SIGNATURE_INFO",
      "ohos.permission.kernel.AUTH_AUDIT_EVENT",
      "ohos.permission.MANAGE_ANTIVIRUS",
      "ohos.permission.REGISTER_ANTIVIRUS",
      "ohos.permission.CALL_TPM_CMD",
      "ohos.permission.SCAN_REMEDIATE_VIRUS",
      "ohos.permission.sec.ACCESS_UDID",
      "ohos.permission.DLP_POLICY_MANAGER",
      "ohos.permission.ENTERPRISE_GET_DEVICE_INFO",
      "ohos.permission.ENTERPRISE_GET_NETWORK_INFO",
      "ohos.permission.ENTERPRISE_INSTALL_BUNDLE",
      "ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY",
      "ohos.permission.ENTERPRISE_RESET_DEVICE",
      "ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY",
      "ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY",
      "ohos.permission.ENTERPRISE_SET_DATETIME",
      "ohos.permission.ENTERPRISE_SET_NETWORK",
      "ohos.permission.ENTERPRISE_SET_WIFI",
      "ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT",
      "ohos.permission.ENTERPRISE_RESTRICT_POLICY",
      "ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME",
      "ohos.permission.ENTERPRISE_MANAGE_USB",
      "ohos.permission.ENTERPRISE_MANAGE_NETWORK",
      "ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE",
      "ohos.permission.ENTERPRISE_GET_SETTINGS",
      "ohos.permission.ENTERPRISE_SET_BROWSER_POLICY",
      "ohos.permission.SET_ENTERPRISE_INFO",
      "ohos.permission.ENTERPRISE_MANAGE_SECURITY",
      "ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH",
      "ohos.permission.ENTERPRISE_MANAGE_SYSTEM",
      "ohos.permission.ENTERPRISE_MANAGE_WIFI",
      "ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS",
      "ohos.permission.ENTERPRISE_MANAGE_APPLICATION",
      "ohos.permission.ENTERPRISE_MANAGE_LOCATION",
      "ohos.permission.ENTERPRISE_REBOOT",
      "ohos.permission.ENTERPRISE_LOCK_DEVICE",
      "ohos.permission.ENTERPRISE_MANAGE_SETTINGS",
      "ohos.permission.ENTERPRISE_OPERATE_DEVICE",
      "ohos.permission.ENTERPRISE_ADMIN_MANAGE",
      "ohos.permission.ENTERPRISE_RECOVERY_KEY",
      "ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY",
      "ohos.permission.ENTERPRISE_GET_ALL_BUNDLE_INFO",
      "ohos.permission.ENTERPRISE_SET_USER_RESTRICTION",
      "ohos.permission.ENTERPRISE_MANAGE_APN",
      "ohos.permission.ENTERPRISE_MANAGE_TELEPHONY",
      "ohos.permission.ENTERPRISE_SET_KIOSK",
      "ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES",
      "ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT",
      "ohos.permission.ENTERPRISE_SET_WALLPAPER",
      "ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS",
      "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION",
      "ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE",
      "ohos.permission.ENTERPRISE_ACCESS_DLP_FILE",
      "ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_START_ABILITIES",
      "ohos.permission.ENTERPRISE_READ_LOG",
      "ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN",
      "ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS",
      "ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS",
      "ohos.permission.ENTERPRISE_VPN",
      "ohos.permission.ENTERPRISE_REQUEST_PUBLISH_FORM",
      "ohos.permission.ENTERPRISE_EXTERNAL_READ",
      "ohos.permission.ENTERPRISE_ENCRYPT_BLOCK_DEVICE"
    ],
    "title": "企业分发资格不等于运行时授权",
    "description": "企业普通和MDM应用需对应分发资格、证书及Profile，企业权限指南要求手动签名。业务App是否被MDM管理与它自身申请何种开放范围权限是两个判断，静默用户授权不能推导出免除受限权限审批或配置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "dlp-capabilities-separated",
    "type": "scope",
    "permissions": [
      "ohos.permission.ACCESS_DLP_SERVICE",
      "ohos.permission.DLP_GET_HIDE_STATUS",
      "ohos.permission.DLP_POLICY_MANAGER",
      "ohos.permission.ENTERPRISE_ACCESS_DLP_FILE",
      "ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE"
    ],
    "title": "DLP各能力不是一个总开关",
    "description": "连云插件注册、屏幕窥视隐藏状态、透明加解密策略、DLP文件生成解密、文件敏感内容识别分别由不同权限保护；前两项可受限开放、策略属于企业普通、后两项仅MDM。没有依据把它们互相替代或一选全部附加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "file-guard-separated",
    "type": "scope",
    "permissions": [
      "ohos.permission.SET_FILE_GUARD_POLICY",
      "ohos.permission.FILE_GUARD_MANAGER",
      "ohos.permission.FILE_GUARD_FILE_WRITE"
    ],
    "title": "文件管控策略、标签扫描与文件写入分别选择",
    "description": "下发文件管控策略、扫描公共目录及设置密级标签、获取指定文件写权限是不同操作。列表没有定义三者必须同时声明，按实际接口分别选择；标签/策略权限不代表已有任意文件写权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "audit-query-versus-block",
    "type": "scope",
    "permissions": [
      "ohos.permission.QUERY_AUDIT_EVENT",
      "ohos.permission.kernel.AUTH_AUDIT_EVENT"
    ],
    "title": "审计查询不等于阻断权限",
    "description": "QUERY_AUDIT_EVENT用于查询安全审计事件；kernel.AUTH_AUDIT_EVENT用于对文件创建、打开、删除等安全事件阻断。它们不应互相推导或默认联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "antivirus-separate-actors",
    "type": "scope",
    "permissions": [
      "ohos.permission.MANAGE_ANTIVIRUS",
      "ohos.permission.REGISTER_ANTIVIRUS",
      "ohos.permission.SCAN_REMEDIATE_VIRUS",
      "ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS"
    ],
    "title": "防病毒管理、注册、扫描和预装管理分开",
    "description": "企业管理者、防病毒软件自身注册、杀毒扫描处置、MDM管理预装杀毒软件分别是不同角色与能力。不因选择杀毒功能而给普通应用附加全部企业/MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "enterprise-vpn-consent",
    "type": "authorization",
    "permissions": [
      "ohos.permission.ENTERPRISE_VPN"
    ],
    "title": "MDM的VPN接入授权例外",
    "description": "该权限允许设备管理应用无需用户确认默认接入VPN，仅当前条目的PC/2in1企业MDM场景。它不是所有用户授权权限的总免确认开关，也不替代网络、VPN接口自身配置要求。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-mdm-apps/",
    "confidence": "documented"
  },
  {
    "id": "tracking-system-switch",
    "type": "authorization",
    "permissions": [
      "ohos.permission.APP_TRACKING_CONSENT"
    ],
    "title": "关联开关影响是否弹窗",
    "description": "该权限仍属于user_grant，但系统跨应用关联开关关闭时请求可不弹窗并默认授予，开启时需用户确认。这是该权限自身授权例外，不是由其他普通权限自动授予。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/",
    "confidence": "documented"
  },
  {
    "id": "local-authorization-interaction",
    "type": "conditional",
    "permissions": [
      "ohos.permission.REQUEST_LOCAL_ACCOUNT_AUTHORIZATION",
      "ohos.permission.kernel.NET_RAW",
      "ohos.permission.kernel.USB_CAPTURE"
    ],
    "title": "系统授权类也可能有身份认证交互",
    "description": "REQUEST_LOCAL_ACCOUNT_AUTHORIZATION提供本地账号授权入口，在用户通过系统身份认证后授予目标特权。网络/USB抓包条目也要求用户认证；仅系统安装授予权限并不保证实际敏感操作无弹窗。具体是否联用此入口依实际API，不自动附加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "biometric-no-camera-dependency",
    "type": "scope",
    "permissions": [
      "ohos.permission.ACCESS_BIOMETRIC",
      "ohos.permission.CAMERA",
      "ohos.permission.MICROPHONE"
    ],
    "title": "系统身份认证与相机麦克风采集区分",
    "description": "ACCESS_BIOMETRIC允许调用系统生物特征身份认证能力，权限列表没有规定因此必须申请CAMERA或MICROPHONE。只有应用自己采集相机/麦克风数据时才另按相应场景选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "certificate-distinct-access",
    "type": "scope",
    "permissions": [
      "ohos.permission.ACCESS_CERT_MANAGER",
      "ohos.permission.ACCESS_ENTERPRISE_USER_TRUSTED_CERT",
      "ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE",
      "ohos.permission.CRYPTO_EXTENSION_REGISTER",
      "ohos.permission.ACCESS_SE_KEY"
    ],
    "title": "证书查询、企业CA、MDM证书策略和密码扩展不同",
    "description": "这些权限分别保护证书/凭据查询、企业用户CA管理、MDM证书管理、crypto扩展注册及安全芯片密钥。不得因都涉及证书或密钥而视作继承权限或全部联选；硬件与厂商资质仍按条目核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "account-distinct-operations",
    "type": "scope",
    "permissions": [
      "ohos.permission.GET_LOCAL_ACCOUNT_IDENTIFIERS",
      "ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS",
      "ohos.permission.GET_DOMAIN_ACCOUNTS",
      "ohos.permission.GET_DOMAIN_ACCOUNT_SERVER_CONFIGS",
      "ohos.permission.MANAGE_DOMAIN_ACCOUNT_SERVER_CONFIGS",
      "ohos.permission.MANAGE_DOMAIN_ACCOUNTS",
      "ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS",
      "ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS"
    ],
    "title": "账号发现、跨用户交互与账号管理分开",
    "description": "查询账号标识、跨本地账号交互、域账号查询/管理、MDM本地账号管理和多用户操作是不同权限。读取标识不等于已获管理权限；企业普通与MDM的相似名称不能互换。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "digital-identity-issuer",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ACCESS_DIGITAL_IDENTITY",
      "ohos.permission.ACCESS_SE_KEY",
      "ohos.permission.ACCESS_FIDO2_ONLINEAUTH"
    ],
    "title": "数字凭证、数字盾和通行密钥不是等价授权",
    "description": "数字凭证导入需企业主体和颁发/授权资格，安全芯片密钥受数字盾场景及硬件支持限制，FIDO2权限保护通行密钥NDK。选择一种身份认证不能推导另两项必需或已授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "float-ball-restore-requires-ball",
    "type": "requires",
    "permissions": [
      "ohos.permission.AUTO_RESTORE_MAIN_WINDOW",
      "ohos.permission.USE_FLOAT_BALL"
    ],
    "title": "自动恢复主窗口须共同申请闪控球",
    "description": "AUTO_RESTORE_MAIN_WINDOW 的申请条件明确要求同时申请 USE_FLOAT_BALL；两项仍各自受设备、版本及职业抢单场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions#ohospermissionauto_restore_main_window",
    "confidence": "documented"
  },
  {
    "id": "float-ball-user-switch",
    "type": "authorization",
    "permissions": [
      "ohos.permission.USE_FLOAT_BALL",
      "ohos.permission.AUTO_RESTORE_MAIN_WINDOW"
    ],
    "title": "系统授权不代表可以自行开启闪控球",
    "description": "USE_FLOAT_BALL 要求应用提供默认关闭的独立开关，由用户主动开启；自动恢复主窗口不能免除这一接入要求。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions#ohospermissionuse_float_ball",
    "confidence": "documented"
  },
  {
    "id": "floating-window-pip-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.SYSTEM_FLOAT_WINDOW"
    ],
    "title": "悬浮窗范围外可改用画中画",
    "description": "SYSTEM_FLOAT_WINDOW 当前限PC/2in1的允许场景；其他设备或场景应评估画中画，不为画中画自动追加该权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions#ohospermissionsystem_float_window",
    "confidence": "documented"
  },
  {
    "id": "privacy-window-capture-boundary",
    "type": "scope",
    "permissions": [
      "ohos.permission.PRIVACY_WINDOW",
      "ohos.permission.CUSTOM_SCREEN_CAPTURE",
      "ohos.permission.CUSTOM_SCREEN_RECORDING"
    ],
    "title": "截图或录屏权限不覆盖隐私窗口保护",
    "description": "对同一个窗口启用隐私模式后，截图、录屏和投屏无法获得其正常画面。两类功能可用于不同窗口，不能把权限同时声明当作绕过隐私保护。",
    "source": "https://developer.huawei.com/consumer/cn/doc/HarmonyOS-Guides/screenshot-and-privacy-mode/",
    "confidence": "documented"
  },
  {
    "id": "screen-input-separate-capabilities",
    "type": "conditional",
    "permissions": [
      "ohos.permission.INPUT_MONITORING",
      "ohos.permission.INTERCEPT_INPUT_EVENT",
      "ohos.permission.HOOK_KEY_EVENT",
      "ohos.permission.CONTROL_DEVICE",
      "ohos.permission.CUSTOM_SCREEN_RECORDING"
    ],
    "title": "录屏、监听、拦截和注入分别判断",
    "description": "录屏中展示按键、指针或触摸效果时才评估输入监听；远程客户端拦截、金融键盘钩子、远端被控端或智能体注入分别受各自场景限制。不是录屏的通用必选组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "manual-settings-not-system-grant",
    "type": "authorization",
    "permissions": [
      "ohos.permission.HOOK_KEY_EVENT",
      "ohos.permission.CONTROL_DEVICE",
      "ohos.permission.CUSTOM_SCREEN_RECORDING"
    ],
    "title": "设置授权不能被普通授权弹窗替代",
    "description": "这些权限属于 manual_settings，先满足受限申请条件，再由用户到系统设置授予；仅声明权限、ACL审批或调用普通user_grant弹窗不能替代设置授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-mgmt-overview/",
    "confidence": "documented"
  },
  {
    "id": "window-transparency-api-scope",
    "type": "scope",
    "permissions": [
      "ohos.permission.SET_WINDOW_TRANSPARENT",
      "ohos.permission.SET_WINDOW_ALPHA",
      "ohos.permission.SET_WINDOW_TOUCH_AREAS"
    ],
    "title": "窗口样式相似不等于同一授权",
    "description": "普通窗口透明、虚拟机场景容器透明、事件热区透传是不同能力。按所用窗口接口选择，不因为窗口透明就自动索取虚拟机专用权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "object-editor-client-provider",
    "type": "scope",
    "permissions": [
      "ohos.permission.CONNECT_OBJECTEDITOR_EXTENSION",
      "ohos.permission.REGISTER_OBJECTEDITOR_EXTENSION"
    ],
    "title": "内容编辑调用端和提供端分开",
    "description": "CONNECT用于查询和拉起内容编辑组件；REGISTER用于注册并向其他应用提供内容编辑服务。是否需要两项取决于应用是否同时承担两端角色。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "lockscreen-capabilities-separate",
    "type": "scope",
    "permissions": [
      "ohos.permission.START_WINDOW_BELOW_LOCK_SCREEN",
      "ohos.permission.TIMEOUT_SCREENOFF_DISABLE_LOCK"
    ],
    "title": "锁屏启动与超时不锁屏不是相互替代",
    "description": "锁屏状态下被启动、超时息屏后不进入锁屏界面分别是独立能力；不自动互相追加，也不据此推断可解锁设备或跳过身份认证。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "background-task-permission-by-mode",
    "type": "conditional",
    "permissions": [
      "ohos.permission.KEEP_BACKGROUND_RUNNING",
      "ohos.permission.KEEP_BACKGROUND_RUNNING_SYSTEM",
      "ohos.permission.KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO"
    ],
    "title": "按后台任务类型申请基础和附加权限",
    "description": "长时任务接口要求 KEEP_BACKGROUND_RUNNING；计算任务和特殊场景按具体模式、设备、API版本补充各自受限权限。普通媒体、定位等长时任务不应统一追加全部受限后台权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resourceschedule-backgroundtaskmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "special-background-user-authorization",
    "type": "authorization",
    "permissions": [
      "ohos.permission.KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO",
      "ohos.permission.KEEP_BACKGROUND_RUNNING_SYSTEM"
    ],
    "title": "特殊后台场景仍有接入和用户开关要求",
    "description": "计算任务、特殊场景任务分别按官方任务类型办理；特殊场景后台运行开关需用户授权，相关任务需按业务主动申请并在结束后取消。受限权限获批不是任意持续保活许可。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/bgtask-design-formula/",
    "confidence": "documented"
  },
  {
    "id": "running-lock-not-background-task",
    "type": "scope",
    "permissions": [
      "ohos.permission.RUNNING_LOCK",
      "ohos.permission.KEEP_BACKGROUND_RUNNING",
      "ohos.permission.BACKGROUND_MANAGER_POWER_SAVE_MODE"
    ],
    "title": "运行锁、省电模式与长时任务职责不同",
    "description": "运行锁控制系统休眠，长时任务控制规范内后台执行，省电模式权限用于特定PC计算场景。不要因选后台运行而一并申请这三项；具体锁类型另有设备和系统应用限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-runninglock/",
    "confidence": "api-specific"
  },
  {
    "id": "app-query-scope-and-qualification",
    "type": "scope",
    "permissions": [
      "ohos.permission.GET_BUNDLE_INFO",
      "ohos.permission.GET_BUNDLE_INFO_PRIVILEGED",
      "ohos.permission.GET_ALL_BUNDLE_INFO",
      "ohos.permission.ENTERPRISE_GET_INSTALLED_BUNDLE_LIST",
      "ohos.permission.GET_RUNNING_INFO",
      "ohos.permission.RUNNING_STATE_OBSERVER"
    ],
    "title": "应用基本信息、全量列表和运行态分开",
    "description": "查询指定应用基本信息、查询敏感信息、AI智能体获取应用列表、企业全量列表、运行态查询和状态监听有不同开放范围；不能自动把高权限查询作为普通查询前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps",
    "confidence": "documented"
  },
  {
    "id": "app-service-allowlist",
    "type": "scope",
    "permissions": [
      "ohos.permission.SUPPORT_APP_SERVICE_EXTENSION"
    ],
    "title": "后台服务仍需组件和调用方名单配置",
    "description": "该权限不替代AppServiceExtension组件及appidentifierAllowList配置；应用作为服务提供方被同应用或名单内应用拉起，与任意后台常驻或跨应用调用授权不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps#ohospermissionsupport_app_service_extension",
    "confidence": "documented"
  },
  {
    "id": "agent-capabilities-separate",
    "type": "scope",
    "permissions": [
      "ohos.permission.MANAGE_SKILL",
      "ohos.permission.MANAGE_SANDBOX_BUNDLE",
      "ohos.permission.GET_ALL_BUNDLE_INFO",
      "ohos.permission.QUERY_PUBLIC_CLI_TOOL",
      "ohos.permission.EXEC_PUBLIC_CLI_TOOL"
    ],
    "title": "智能体各项能力按操作选择",
    "description": "Skill访问、沙箱应用管理、应用列表、CLI查询和CLI执行分别对应不同操作；智能体身份本身不会自动授予这些能力，且不能把所有智能体权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "native-binary-permissions-not-hap",
    "type": "scope",
    "permissions": [
      "ohos.permission.kernel.IGNORE_LIBRARY_VALIDATION",
      "ohos.permission.kernel.EXEMPT_ANONYMOUS_EXECUTABLE_MEMORY",
      "ohos.permission.INHERIT_PARENT_PERMISSION"
    ],
    "title": "独立二进制权限不写入通用HAP配置",
    "description": "这些条目针对独立二进制程序，分别影响库owner校验、可执行内存或子进程继承；INHERIT_PARENT_PERMISSION不表示可获得父进程原本没有的权限，也不等于MDM用户权限管理。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all",
    "confidence": "documented"
  },
  {
    "id": "dynamic-code-system-only",
    "type": "scope",
    "permissions": [
      "ohos.permission.RUN_DYN_CODE",
      "ohos.permission.kernel.SUPPORT_LOCAL_PLUGIN"
    ],
    "title": "动态下发系统字节码与自分发插件不同",
    "description": "RUN_DYN_CODE仍限特定系统应用；普通应用有ArkTS扩展插件需求时应核对自分发插件接口和申请条件，不能用插件权限推断可调用系统动态字节码接口。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "jit-permission-by-engine",
    "type": "conditional",
    "permissions": [
      "ohos.permission.kernel.ALLOW_WRITABLE_CODE_MEMORY",
      "ohos.permission.kernel.ALLOW_EXECUTABLE_FORT_MEMORY",
      "ohos.permission.kernel.ALLOW_USE_JITFORT_INTERFACE",
      "ohos.permission.kernel.DISABLE_CODE_MEMORY_PROTECTION",
      "ohos.permission.kernel.DISABLE_GOTPLT_RO_PROTECTION"
    ],
    "title": "JIT和代码保护权限按引擎及操作核对",
    "description": "自带引擎可写可执行内存、系统JS引擎MAP_FORT、JITFort更新、代码完整性和GOT/PLT保护涉及不同操作。列表未规定统一捆绑；需按引擎、二进制进程和目标接口确认，坚盾模式也可能禁止相关能力。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "api-specific"
  },
  {
    "id": "native-library-signing-scope",
    "type": "conditional",
    "permissions": [
      "ohos.permission.ALLOW_EXTERNAL_NATIVE_CODE",
      "ohos.permission.kernel.LOAD_INDEPENDENT_LIBRARY",
      "ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY",
      "ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY_FOR_WEB",
      "ohos.permission.SUPPORT_NP_PLUGIN_FOR_WEB"
    ],
    "title": "外部native和共享库按代码来源与签名处理",
    "description": "外部native调用、独立库加载、证书签名库和浏览器插件库的应用资格、签名与接口不同；只在实际加载链路要求时组合，不自动向所有含native代码应用添加全部权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "api-specific"
  },
  {
    "id": "debugger-subject-target-capability",
    "type": "conditional",
    "permissions": [
      "ohos.permission.kernel.DEBUGGER",
      "ohos.permission.kernel.ALLOW_DEBUG",
      "ohos.permission.kernel.ALLOW_PTRACE_READ",
      "ohos.permission.ALLOW_COREDUMP",
      "ohos.permission.LOCAL_DEBUG_OTHER_APPS",
      "ohos.permission.ALLOW_USE_BM"
    ],
    "title": "调试主体、被调试程序与崩溃采集分开",
    "description": "PTRACE调试、允许C/C++被调试、读取应用内进程崩溃信息、沙箱内存转储、aa和bm调测属于不同链路；应核对目标程序、开发者模式和具体接口，不能把这些权限一并作为调试通用前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "api-specific"
  },
  {
    "id": "crash-events-ptrace-alternative",
    "type": "alternative",
    "permissions": [
      "ohos.permission.kernel.ALLOW_PTRACE_READ"
    ],
    "title": "崩溃事件订阅优先于直接ptrace读取",
    "description": "仅当无法适配系统崩溃事件且强依赖crashpad等直接ptrace机制时考虑此受限权限；其他场景使用HiAppEvent订阅崩溃事件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions#ohospermissionkernelallow_ptrace_read",
    "confidence": "documented"
  },
  {
    "id": "ddk-client-and-driver-roles",
    "type": "scope",
    "permissions": [
      "ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER",
      "ohos.permission.ACCESS_DDK_DRIVERS",
      "ohos.permission.ACCESS_DDK_USB",
      "ohos.permission.ACCESS_DDK_HID",
      "ohos.permission.ACCESS_DDK_SCSI_PERIPHERAL",
      "ohos.permission.ACCESS_DDK_USB_SERIAL",
      "ohos.permission.kernel.AS_LDK_DRIVER",
      "ohos.permission.PRINTER_DRIVER"
    ],
    "title": "外设客户端与总线驱动权限分别申请",
    "description": "客户端绑定驱动需目标服务端和value数据；USB、HID、SCSI、串口、PCIe与打印驱动按硬件类型和提供方角色选择，不能自动给每个外设客户端追加全套驱动开发权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "notification-sending-vs-reading",
    "type": "scope",
    "permissions": [
      "ohos.permission.ACCESS_NOTIFICATION_POLICY",
      "ohos.permission.SUBSCRIBE_NOTIFICATION",
      "ohos.permission.GET_DONOTDISTURB_STATE",
      "ohos.permission.PUBLISH_AGENT_REMINDER"
    ],
    "title": "发送通知、订阅他人通知与通知策略分开",
    "description": "自身通知通过通知使能流程；SUBSCRIBE_NOTIFICATION是符合资格的手表官方管理App读取通知，ACCESS_NOTIFICATION_POLICY仅静音转非静音，免打扰状态查询和代理提醒也是独立能力。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationmanager/",
    "confidence": "documented"
  },
  {
    "id": "agent-reminder-notification-enable",
    "type": "authorization",
    "permissions": [
      "ohos.permission.PUBLISH_AGENT_REMINDER"
    ],
    "title": "代理提醒仍需通知使能",
    "description": "publishReminder在声明PUBLISH_AGENT_REMINDER之外，还要求调用通知授权流程；system_grant只描述该权限自身的授予方式，不代表整个提醒业务无需用户交互。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-references/api/js-apis-reminderagentmanager/",
    "confidence": "api-specific"
  },
  {
    "id": "watch-notification-transport",
    "type": "conditional",
    "permissions": [
      "ohos.permission.SUBSCRIBE_NOTIFICATION",
      "ohos.permission.ACCESS_BLUETOOTH"
    ],
    "title": "转发手表通知按实际传输方式补能力",
    "description": "订阅权限只保护读取通知；如果应用直接使用蓝牙扫描、连接或传输接口，还要核对其蓝牙权限。短距离传输不固定只有蓝牙，不能把二者设为无条件必选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions#ohospermissionsubscribe_notification",
    "confidence": "documented"
  },
  {
    "id": "call-capabilities-scope",
    "type": "scope",
    "permissions": [
      "ohos.permission.MANAGE_CALL_FOR_DEVICES",
      "ohos.permission.CHECK_CALL_LOG",
      "ohos.permission.GET_CALL_TRANSFER_INFO",
      "ohos.permission.DIRECT_CALL"
    ],
    "title": "通话控制、记录匹配、转移状态与拨号不同",
    "description": "穿戴配套通话控制、职业应用通话匹配、银行转账风险评估和职业场景一键拨号有不同用途及资格；选其中一项不代表自动获得或需要其余通话权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  },
  {
    "id": "call-downlink-not-microphone",
    "type": "scope",
    "permissions": [
      "ohos.permission.CAPTURE_PLAYBACK_DOWNLINK",
      "ohos.permission.MICROPHONE"
    ],
    "title": "蜂窝下行录音不等于麦克风采集",
    "description": "CAPTURE_PLAYBACK_DOWNLINK仅描述蜂窝通话下行数据，MICROPHONE保护本地麦克风采集；二者不互相替代，是否组合取决于具体录音接口和合规业务需求。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions#ohospermissioncapture_playback_downlink",
    "confidence": "documented"
  },
  {
    "id": "fraud-pickers-scoped",
    "type": "scope",
    "permissions": [
      "ohos.permission.USE_FRAUD_CALL_LOG_PICKER",
      "ohos.permission.USE_FRAUD_MESSAGES_PICKER",
      "ohos.permission.USE_FRAUD_APP_PICKER"
    ],
    "title": "反诈选择器不是全量数据读取许可",
    "description": "三个权限分别面向反诈通话记录、短信和应用选择器，只在对应反诈功能中选择；不因存在通话或短信业务就自动添加，也不能解释为任意后台批量读取。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions",
    "confidence": "documented"
  }
];

export const permissionGroups = [
  {
    "id": "location",
    "title": "位置",
    "permissions": [
      "ohos.permission.LOCATION_IN_BACKGROUND",
      "ohos.permission.LOCATION",
      "ohos.permission.APPROXIMATELY_LOCATION"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "camera",
    "title": "相机",
    "permissions": [
      "ohos.permission.CAMERA"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "microphone",
    "title": "麦克风",
    "permissions": [
      "ohos.permission.MICROPHONE"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "contacts",
    "title": "通讯录",
    "permissions": [
      "ohos.permission.READ_CONTACTS",
      "ohos.permission.WRITE_CONTACTS"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "calendar",
    "title": "日历",
    "permissions": [
      "ohos.permission.READ_CALENDAR",
      "ohos.permission.WRITE_CALENDAR",
      "ohos.permission.READ_WHOLE_CALENDAR",
      "ohos.permission.WRITE_WHOLE_CALENDAR"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "motion",
    "title": "运动数据",
    "permissions": [
      "ohos.permission.ACTIVITY_MOTION"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "health",
    "title": "身体传感器",
    "permissions": [
      "ohos.permission.READ_HEALTH_DATA"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "imagevideo",
    "title": "图片和视频",
    "permissions": [
      "ohos.permission.WRITE_IMAGEVIDEO",
      "ohos.permission.READ_IMAGEVIDEO",
      "ohos.permission.MEDIA_LOCATION"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "audio",
    "title": "音乐和音频",
    "permissions": [
      "ohos.permission.WRITE_AUDIO",
      "ohos.permission.READ_AUDIO"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "tracking",
    "title": "跨应用关联",
    "permissions": [
      "ohos.permission.APP_TRACKING_CONSENT"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "discovery",
    "title": "设备发现和连接",
    "permissions": [
      "ohos.permission.ACCESS_BLUETOOTH",
      "ohos.permission.ACCESS_NEARLINK",
      "ohos.permission.DISTRIBUTED_DATASYNC"
    ],
    "since": "13",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "pasteboard",
    "title": "剪贴板",
    "permissions": [
      "ohos.permission.READ_PASTEBOARD"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "screenshot",
    "title": "截屏",
    "permissions": [
      "ohos.permission.CUSTOM_SCREEN_CAPTURE"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "id": "folders",
    "title": "文件夹",
    "permissions": [
      "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
      "ohos.permission.READ_WRITE_DESKTOP_DIRECTORY",
      "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY"
    ],
    "since": null,
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  }
];

export const unmappedUserGrantPermissions = [
  "ohos.permission.FLOAT_VIEW",
  "ohos.permission.GET_ALL_BUNDLE_INFO",
  "ohos.permission.DIRECT_CALL"
];

export const permissionReview = [
  {
    "name": "ohos.permission.USE_BLUETOOTH",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "当前扫描、连接和开关等接口按ACCESS_BLUETOOTH要求处理；getState从API13起不再要求此前权限，stateChange从API18起不再校验。不能把旧条目名称一并当新接口前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.DISCOVER_BLUETOOTH",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "当前扫描、连接和开关等接口按ACCESS_BLUETOOTH要求处理；getState从API13起不再要求此前权限，stateChange从API18起不再校验。不能把旧条目名称一并当新接口前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GET_NETWORK_INFO",
    "domain": "network",
    "disposition": "relation",
    "note": "普通业务联网不自动要求Wi-Fi控制或定位权限；网络状态、Wi-Fi信息和配置能力依各自接口申请，不因名称相近全部联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.SET_NETWORK_INFO",
    "domain": "network",
    "disposition": "relation",
    "note": "普通业务联网不自动要求Wi-Fi控制或定位权限；网络状态、Wi-Fi信息和配置能力依各自接口申请，不因名称相近全部联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GET_WIFI_INFO",
    "domain": "network",
    "disposition": "relation",
    "note": "普通连接信息、包含PSK等敏感配置、企业连接管控是不同开放能力；GET_WIFI_INFO并不授予读取密码或企业Wi-Fi管理资格。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.INTERNET",
    "domain": "network",
    "disposition": "relation",
    "note": "普通业务联网不自动要求Wi-Fi控制或定位权限；网络状态、Wi-Fi信息和配置能力依各自接口申请，不因名称相近全部联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.NFC_CARD_EMULATION",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "标签读写和卡模拟服务是两种能力；选择一种不意味着必须申请另一种。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.NFC_TAG",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "标签读写和卡模拟服务是两种能力；选择一种不意味着必须申请另一种。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.SET_WIFI_INFO",
    "domain": "network",
    "disposition": "relation",
    "note": "普通连接信息、包含PSK等敏感配置、企业连接管控是不同开放能力；GET_WIFI_INFO并不授予读取密码或企业Wi-Fi管理资格。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_CAR_DISTRIBUTED_ENGINE",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.MANAGE_INPUT_INFRARED_EMITTER",
    "domain": "connectivity",
    "disposition": "standalone",
    "note": "逐项核对条目，未见通用的其他权限共同声明要求；具体接口及场景仍需单独判断。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.kernel.NET_RAW",
    "domain": "network",
    "disposition": "relation",
    "note": "NET_RAW属于系统授权，但实际网络抓包仍需用户认证。是否联用本地账号授权接口取决于实际API，不自动把账号授权入口当所有网络能力前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_CAR_AUDIO",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "HIMA云读取与写入、车载音频、车载隐私服务分别对应不同操作，不把读权限当作写权限，也不由云数据名称自动推导整个网络或账号权限组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.vehicle.ACCESS_CAR_SECURITY_PRIVACY",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "HIMA云读取与写入、车载音频、车载隐私服务分别对应不同操作，不把读权限当作写权限，也不由云数据名称自动推导整个网络或账号权限组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.vehicle.HIMA_DATA_READ",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "HIMA云读取与写入、车载音频、车载隐私服务分别对应不同操作，不把读权限当作写权限，也不由云数据名称自动推导整个网络或账号权限组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.vehicle.HIMA_DATA_WRITE",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "HIMA云读取与写入、车载音频、车载隐私服务分别对应不同操作，不把读权限当作写权限，也不由云数据名称自动推导整个网络或账号权限组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_BLUETOOTH",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.DISTRIBUTED_DATASYNC",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.ACCESS_NEARLINK",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.GET_WIFI_PEERS_MAC",
    "domain": "network",
    "disposition": "relation",
    "note": "本机Wi-Fi、以太网、对端设备和网络IP/MAC权限不互相替代。两种本机MAC权限的TV场景与变更段存在差异，需按目标设备向官方确认。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SET_PAC_URL",
    "domain": "network",
    "disposition": "relation",
    "note": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.PERSISTENT_BLUETOOTH_PEERS_MAC",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "addPersistentDeviceId、deletePersistentDeviceId、getPersistentDeviceIds均同时要求ACCESS_BLUETOOTH和PERSISTENT_BLUETOOTH_PEERS_MAC；固化本身不是已连接或已配对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_APN_SETTING",
    "domain": "network",
    "disposition": "relation",
    "note": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_WIFI_LOCAL_MAC",
    "domain": "network",
    "disposition": "relation",
    "note": "本机Wi-Fi、以太网、对端设备和网络IP/MAC权限不互相替代。两种本机MAC权限的TV场景与变更段存在差异，需按目标设备向官方确认。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_ETHERNET_LOCAL_MAC",
    "domain": "network",
    "disposition": "relation",
    "note": "本机Wi-Fi、以太网、对端设备和网络IP/MAC权限不互相替代。两种本机MAC权限的TV场景与变更段存在差异，需按目标设备向官方确认。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_LOCAL_DEVICE_NAME",
    "domain": "connectivity",
    "disposition": "standalone",
    "note": "逐项核对条目，未见通用的其他权限共同声明要求；具体接口及场景仍需单独判断。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.LINKTURBO",
    "domain": "network",
    "disposition": "relation",
    "note": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_NET_TRACE_INFO",
    "domain": "network",
    "disposition": "relation",
    "note": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_IP_MAC_INFO",
    "domain": "network",
    "disposition": "relation",
    "note": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_BLUETOOTH_ADVERTISER_NAME",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "蓝牙接入与自定义BLE广播名称是不同能力。只有发送自定义广播名称的业务才考虑名称管理权限，不为所有蓝牙连接自动追加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ALLOW_ACCESSORY_ACCESS",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_NETWORK_STATS",
    "domain": "network",
    "disposition": "relation",
    "note": "代理设置、APN办公专网、网络加速、链路诊断和其他应用流量统计不是普通联网的通用前置；GET_NETWORK_STATS还受MDM场景限制。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.KNOCK_COLLABORATION",
    "domain": "connectivity",
    "disposition": "relation",
    "note": "跨设备数据交换、蓝牙/星闪、配件授信、车联和碰一碰分别保护各自服务。业务实际调用多个服务时分别核对接口，不把所有传输权限设为固定组合。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_WIFI_CONFIG",
    "domain": "network",
    "disposition": "relation",
    "note": "普通连接信息、包含PSK等敏感配置、企业连接管控是不同开放能力；GET_WIFI_INFO并不授予读取密码或企业Wi-Fi管理资格。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SET_WIFI_CONFIG",
    "domain": "network",
    "disposition": "relation",
    "note": "普通连接信息、包含PSK等敏感配置、企业连接管控是不同开放能力；GET_WIFI_INFO并不授予读取密码或企业Wi-Fi管理资格。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION",
    "domain": "network",
    "disposition": "relation",
    "note": "普通连接信息、包含PSK等敏感配置、企业连接管控是不同开放能力；GET_WIFI_INFO并不授予读取密码或企业Wi-Fi管理资格。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.MANAGE_NET_FIREWALL",
    "domain": "network",
    "disposition": "relation",
    "note": "防火墙配置、查询、流量路径处理、内外网属性和EAP私有信息分别按具体操作和接口选择，不能按企业网络功能将全部权限联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.GET_NET_FIREWALL",
    "domain": "network",
    "disposition": "relation",
    "note": "防火墙配置、查询、流量路径处理、内外网属性和EAP私有信息分别按具体操作和接口选择，不能按企业网络功能将全部权限联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_EAP",
    "domain": "network",
    "disposition": "relation",
    "note": "防火墙配置、查询、流量路径处理、内外网属性和EAP私有信息分别按具体操作和接口选择，不能按企业网络功能将全部权限联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SET_NET_EXT_ATTRIBUTE",
    "domain": "network",
    "disposition": "relation",
    "note": "防火墙配置、查询、流量路径处理、内外网属性和EAP私有信息分别按具体操作和接口选择，不能按企业网络功能将全部权限联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.kernel.TRAFFIC_FILTER",
    "domain": "network",
    "disposition": "relation",
    "note": "防火墙配置、查询、流量路径处理、内外网属性和EAP私有信息分别按具体操作和接口选择，不能按企业网络功能将全部权限联选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.PRINT",
    "domain": "files",
    "disposition": "relation",
    "note": "普通打印框架使用与企业打印管理的权限用途不同，不自动互相包含。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCELEROMETER",
    "domain": "location-health",
    "disposition": "standalone",
    "note": "读取加速度类传感器；条目没有与陀螺仪、运动状态或定位的共同声明要求。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GYROSCOPE",
    "domain": "location-health",
    "disposition": "standalone",
    "note": "读取陀螺仪类传感器；不因同属传感器自动添加加速度、运动状态或定位权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.READ_CLOUD_SYNC_CONFIG",
    "domain": "files",
    "disposition": "standalone",
    "note": "只查询接入云空间应用的云同步配置，不从名称推导图库/音频/用户文件读写权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.STORE_PERSISTENT_DATA",
    "domain": "files",
    "disposition": "standalone",
    "note": "持久存储应用数据，与持久化文件URI授权是不同概念，不应自动添加FILE_ACCESS_PERSIST。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO",
    "domain": "location-health",
    "disposition": "api-dependent",
    "note": "导航信息服务数据接口不等同于实时定位；若业务另调定位API，按定位权限独立申请。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GET_FILE_ICON",
    "domain": "files",
    "disposition": "standalone",
    "note": "获取指定类型文件图标，未发现条目级其他权限依赖；不等于文件内容访问授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.CUSTOMIZE_MENU_ICON",
    "domain": "files",
    "disposition": "standalone",
    "note": "配置文件管理器右键菜单图标，未发现条目级其他权限依赖。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.HDR_BRIGHTNESS",
    "domain": "media",
    "disposition": "standalone",
    "note": "HDR组件提亮；官方条目未要求相机、麦克风或媒体库读写权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.QUERY_VOLUME_ENCRYPTION_STATUS",
    "domain": "files",
    "disposition": "standalone",
    "note": "查询卷加解密状态及订阅事件，不等于管理加解密策略或读取卷内文件内容。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GET_STORAGE_VOLUME_INFO",
    "domain": "files",
    "disposition": "api-dependent",
    "note": "查询存储设备基础属性，与ACCESS_DISK_PHY_INFO的硬盘硬件信息业务资格和接口范围不同，不能按名称认定替代。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.MEDIA_LOCATION",
    "domain": "media",
    "disposition": "relation",
    "note": "访问媒体文件内的地理位置，与实时设备定位不同；和READ_IMAGEVIDEO同申请时应合并后者reason用途文案，不自动要求批量图库读取。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.ACTIVITY_MOTION",
    "domain": "location-health",
    "disposition": "relation",
    "note": "权限组指南说明2in1无相关传感器不可申请，与目录设备元数据口径冲突；应提示核对设备/接口，而非保证全设备可用。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "name": "ohos.permission.CAMERA",
    "domain": "media",
    "disposition": "relation",
    "note": "相机拍照或静音录像不自动要求麦克风；录制声音才另需MICROPHONE。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.LOCATION_IN_BACKGROUND",
    "domain": "location-health",
    "disposition": "relation",
    "note": "必须先有前台定位；可选模糊前台或模糊+精确前台。用户先同意前台，再到设置授权后台；LOCATION长时任务可替代部分后台定位场景。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.LOCATION",
    "domain": "location-health",
    "disposition": "relation",
    "note": "必须与APPROXIMATELY_LOCATION共同申请；这是明确依赖，不是同组全部权限均要申请。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.APPROXIMATELY_LOCATION",
    "domain": "location-health",
    "disposition": "relation",
    "note": "可独立申请；精确定位和后台定位会依赖或以它作前台路径，不因申请它自动需要精确或后台权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.MICROPHONE",
    "domain": "media",
    "disposition": "relation",
    "note": "采集麦克风音频才需要；播放音视频不自动需要，亦不自动要求相机。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.READ_CALENDAR",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "普通读权限限默认/本应用相关账户与本应用创建日程；API21+部分读接口接受它或READ_WHOLE_CALENDAR，不能无条件一起申请。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.WRITE_CALENDAR",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "普通写权限限本应用相关日历与日程；API21+写接口接受它或WRITE_WHOLE_CALENDAR，按操作范围选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.READ_HEALTH_DATA",
    "domain": "location-health",
    "disposition": "relation",
    "note": "权限组指南仅允许穿戴设备申请，与列表支持设备元数据冲突；应保守展示并核对目标设备API。",
    "source": "https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/"
  },
  {
    "name": "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
    "domain": "files",
    "disposition": "relation",
    "note": "Download范围独立于Documents/Desktop；normal仍按受限流程。权限组指南设备范围与列表Tablet支持有口径差异。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY",
    "domain": "files",
    "disposition": "relation",
    "note": "Documents范围独立于Download/Desktop；normal仍按受限流程。目录预授权与Picker临时URI授权需区分。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.CUSTOM_SCREEN_CAPTURE",
    "domain": "media",
    "disposition": "relation",
    "note": "截屏用户授权，与CUSTOM_SCREEN_RECORDING手动设置的录屏路径不同；不能按同为屏幕采集自动互相添加。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.READ_CONTACTS",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "仅克隆/备份/同步等批量读取场景；用户选择联系人用Picker，不因读取而自动添加写入权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.WRITE_CONTACTS",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "仅克隆/备份/同步写回联系人场景；读写独立，普通修改应引导联系人应用。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_AUDIO",
    "domain": "media",
    "disposition": "relation",
    "note": "批量克隆/备份/同步音频的读取权限；用户选音频优先AudioPicker，读取不自动要求写入。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.WRITE_AUDIO",
    "domain": "media",
    "disposition": "relation",
    "note": "批量克隆/备份/同步音频的写入权限；保存用户选音频可用AudioPicker，写入不自动要求读取。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_IMAGEVIDEO",
    "domain": "media",
    "disposition": "relation",
    "note": "批量/自动图库场景可申请；用户手选素材或读取自身写入资源不默认需要；与MEDIA_LOCATION同申请须整合reason。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.WRITE_IMAGEVIDEO",
    "domain": "media",
    "disposition": "relation",
    "note": "媒体库修改权限；安全保存控件或系统授权弹窗可替代常见保存场景；不等于读取权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_WRITE_DESKTOP_DIRECTORY",
    "domain": "files",
    "disposition": "relation",
    "note": "Desktop范围独立于Download/Documents；受限+用户授权，不能把同组各目录都作为强制依赖。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_PASTEBOARD",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "粘贴控件替代直接读取；PC首次申请不弹窗默认允许但用户可撤销，其他设备有场景限制；分享范围管理并不替代读取授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.FILE_ACCESS_PERSIST",
    "domain": "files",
    "disposition": "relation",
    "note": "先取得可持久化的临时URI授权，再persist，重启后按需activate；不是全盘/全目录授权。API12+本地调试与上架申请流程不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO",
    "domain": "media",
    "disposition": "relation",
    "note": "不能使用保存控件/确认弹窗的连续保存场景；system_grant仍有最长30分钟短期确认周期。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_WRITE_USER_FILE",
    "domain": "files",
    "disposition": "api-dependent",
    "note": "仅PC开发调试工具访问用户目录，不能据名称认定与ACCESS_USER_FULL_DISK互相替代或共同必需。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_PASTEBOARD_APP_SHARE_OPTION",
    "domain": "personal-data",
    "disposition": "api-dependent",
    "note": "设置/移除可粘贴范围，与读取剪贴板是不同能力；条目未声明READ_PASTEBOARD为必需前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_UDMF_APP_SHARE_OPTION",
    "domain": "personal-data",
    "disposition": "api-dependent",
    "note": "控制应用UDMF数据分享范围，不等于剪贴板读取或其他应用数据访问；未发现明确权限名级依赖。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DISK_PHY_INFO",
    "domain": "files",
    "disposition": "api-dependent",
    "note": "金融证券场景硬盘硬件信息；与GET_STORAGE_VOLUME_INFO基础属性不是通用替代关系。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.PRELOAD_FILE",
    "domain": "files",
    "disposition": "api-dependent",
    "note": "文档编辑应用预加载文件；预加载能力不自动代表已获得目标文件URI访问授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.atomicService.MANAGE_STORAGE",
    "domain": "files",
    "disposition": "standalone",
    "note": "仅元服务小游戏调节存储空间；与用户文件授权或普通应用持久存储未发现明确共同声明关系。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CUSTOMIZE_SAVE_BUTTON",
    "domain": "files",
    "disposition": "relation",
    "note": "仅自定义保存控件样式，不替代控件自身由用户触发的安全授权流程，也不自动要求WRITE_IMAGEVIDEO。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_WHOLE_CALENDAR",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "读取所有日历/所有应用日程，区别普通READ范围；API21+部分接口为二选一，不据名称强制补普通读权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.WRITE_WHOLE_CALENDAR",
    "domain": "personal-data",
    "disposition": "relation",
    "note": "修改所有日历/日程，区别普通WRITE范围；API21+部分接口为二选一，不自动推导必须补普通写权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SET_SYSTEMSHARE_APPLAUNCHTRUSTLIST",
    "domain": "personal-data",
    "disposition": "api-dependent",
    "note": "配置企业系统分享目标应用名单；名单过滤和文件URI授权不是同一机制，条目未列其他权限为必需前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CUSTOM_SCREEN_RECORDING",
    "domain": "media",
    "disposition": "relation",
    "note": "需用户先到系统设置授权，之后不再每次弹出录屏隐私告警；不是声明后自动静默，也不由MDM user_grant策略直接覆盖。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_USER_FULL_DISK",
    "domain": "files",
    "disposition": "relation",
    "note": "远程登录/杀毒场景经用户手动设置授权后访问公共路径不再逐次确认；不能当system_grant或默认授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_MEDIA_RESOURCES_FOR_PUBLIC",
    "domain": "media",
    "disposition": "api-dependent",
    "note": "外部设备配套应用管理正在播放媒体资源；不据此推导READ_AUDIO、相机或麦克风的依赖或授予。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_GAME_BUDDY_SERVICE",
    "domain": "media",
    "disposition": "api-dependent",
    "note": "游戏AI陪玩获取游戏截图与运行态；与通用截屏权限的替代或依赖需按实际游戏伴随API核对，条目未写强制共同申请。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_AUDIO_ACCESSORY",
    "domain": "media",
    "disposition": "relation",
    "note": "管理并注册音频配件；可考虑智慧生活插件方案，不因配件注册自动添加麦克风录制权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SYNC_ROOT_MANAGER",
    "domain": "files",
    "disposition": "api-dependent",
    "note": "管理云盘同步根在文件管理器中的展示，限定大陆实名认证企业主体；不推定获取任意文件内容授权。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_PRINT",
    "domain": "files",
    "disposition": "relation",
    "note": "企业打印状态/打印机管理，与普通PRINT框架能力不同；未发现相互必需的统一权限名级关系。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_BACKUP",
    "domain": "files",
    "disposition": "api-dependent",
    "note": "企业备份恢复用户及沙箱数据；条目未明确其与各类READ/WRITE权限的授予替代关系，应按具体备份API核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ACCESS_BIOMETRIC",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "使用系统认证能力不自动需要CAMERA或MICROPHONE。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_CERT_MANAGER",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.READ_ACCOUNT_LOGIN_STATE",
    "domain": "identity-security",
    "disposition": "api-dependent",
    "note": "条目未定义其他权限的必选依赖；不能仅按功能相近推导关联。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.PROTECT_SCREEN_LOCK_DATA",
    "domain": "identity-security",
    "disposition": "api-dependent",
    "note": "条目未定义其他权限的必选依赖；不能仅按功能相近推导关联。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GET_ENTERPRISE_CONFIG",
    "domain": "enterprise-protection",
    "disposition": "api-dependent",
    "note": "条目未定义其他权限的必选依赖；不能仅按功能相近推导关联。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.REQUEST_LOCAL_ACCOUNT_AUTHORIZATION",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "system_grant只允许调用入口，目标特权仍需系统身份认证。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_USER_PASSIVE_RECOGNITION",
    "domain": "identity-security",
    "disposition": "api-dependent",
    "note": "条目未定义其他权限的必选依赖；不能仅按功能相近推导关联。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.APP_TRACKING_CONSENT",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "系统关联开关决定请求是否弹窗，不改变user_grant分类。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all-user"
  },
  {
    "name": "ohos.permission.PERSONAL_MANAGE_RESTRICTIONS",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "UAD个人设备策略与企业MDM策略不同；激活流程与实际限制能力分开。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.START_PROVISIONING_MESSAGE",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "用于UAD/BYOD部署激活流程，不能据此推定所有企业设备管理能力。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_FIDO2_ONLINEAUTH",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.DLP_GET_HIDE_STATUS",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "屏幕窥视隐藏状态，不是DLP文件操作或策略管理。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CRYPTO_EXTENSION_REGISTER",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DLP_SERVICE",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "连云插件注册/解注册，不自动需要DLP策略或DLP文件权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DIGITAL_IDENTITY",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_SE_KEY",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SET_FILE_GUARD_POLICY",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.FILE_GUARD_MANAGER",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.FILE_GUARD_FILE_WRITE",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.GET_LOCAL_ACCOUNT_IDENTIFIERS",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.GET_DOMAIN_ACCOUNTS",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.QUERY_AUDIT_EVENT",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ACCESS_ENTERPRISE_USER_TRUSTED_CERT",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.GET_DOMAIN_ACCOUNT_SERVER_CONFIGS",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.MANAGE_DOMAIN_ACCOUNT_SERVER_CONFIGS",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.MANAGE_DOMAIN_ACCOUNTS",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.GET_SIGNATURE_INFO",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.kernel.AUTH_AUDIT_EVENT",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.MANAGE_ANTIVIRUS",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.REGISTER_ANTIVIRUS",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.CALL_TPM_CMD",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SCAN_REMEDIATE_VIRUS",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.sec.ACCESS_UDID",
    "domain": "identity-security",
    "disposition": "relation",
    "note": "能力边界已核对，相关名称不代表权限继承或强制联选，按实际接口选择。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.DLP_POLICY_MANAGER",
    "domain": "enterprise-protection",
    "disposition": "relation",
    "note": "透明加解密策略管理与DLP文件读写、识别及连云插件不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_GET_DEVICE_INFO",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_GET_NETWORK_INFO",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_INSTALL_BUNDLE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_RESET_DEVICE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_DATETIME",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_NETWORK",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_WIFI",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_RESTRICT_POLICY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_USB",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_NETWORK",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_GET_SETTINGS",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_BROWSER_POLICY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.SET_ENTERPRISE_INFO",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_SECURITY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "权限禁用和禁用例外名单不等于静默授予；不同策略接口不可互换。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_SYSTEM",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_WIFI",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_APPLICATION",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_LOCATION",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_REBOOT",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_LOCK_DEVICE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_SETTINGS",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_OPERATE_DEVICE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_ADMIN_MANAGE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "管理员管理权限不是管理员已激活状态；按具体激活路线核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_RECOVERY_KEY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "管控端委托其他企业应用；受托端仍需对应策略接口权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_GET_ALL_BUNDLE_INFO",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_USER_RESTRICTION",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_APN",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_TELEPHONY",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_KIOSK",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_SET_WALLPAPER",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION",
    "domain": "mdm",
    "disposition": "relation",
    "note": "管理目标App的user_grant策略；声明/获批不等于GRANTED已下发，DEFAULT仍由用户。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "敏感内容识别是MDM能力，不等于DLP文件解密或标签扫描。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_ACCESS_DLP_FILE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "DLP文件生成解密是MDM能力，非透明加解密策略或连云插件注册。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN",
    "domain": "mdm",
    "disposition": "relation",
    "note": "SDA管理其他DA与自激活不同，不能作为所有MDM权限的自动依赖。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_START_ABILITIES",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_READ_LOG",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN",
    "domain": "mdm",
    "disposition": "relation",
    "note": "只保护已激活管理员解除自身激活的能力，不是静默用户授权开关。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN",
    "domain": "mdm",
    "disposition": "relation",
    "note": "自激活需HEM部署和激活凭证；当前enableSelfDeviceAdmin为API26、PC接口。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_VPN",
    "domain": "mdm",
    "disposition": "relation",
    "note": "仅MDM VPN接入的默认确认例外，不是任意user_grant静默能力。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_REQUEST_PUBLISH_FORM",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_EXTERNAL_READ",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_ENCRYPT_BLOCK_DEVICE",
    "domain": "mdm",
    "disposition": "relation",
    "note": "需要对应MDM资格及实际接口要求；没有依据从此名称自动追加其他MDM权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps"
  },
  {
    "name": "ohos.permission.GET_BUNDLE_INFO",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.PREPARE_APP_TERMINATE",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_NOTIFICATION_POLICY",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.KEEP_BACKGROUND_RUNNING",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.PRIVACY_WINDOW",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.PUBLISH_AGENT_REMINDER",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.VIBRATE",
    "domain": "notifications-calls",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.CLEAN_BACKGROUND_PROCESSES",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "清理自身相关后台任务与企业结束其他应用进程能力不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.COMMONEVENT_STICKY",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.RUNNING_LOCK",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.RUN_DYN_CODE",
    "domain": "development",
    "disposition": "relation",
    "note": "普通应用不可申请，仅特定系统应用；不与其他动态代码权限互为替代。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.WINDOW_TOPMOST",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "应用置顶窗口本身不等于系统悬浮窗或闪控窗，无明确共同申请条款。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.INPUT_KEYBOARD_CONTROLLER",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "仅输入法应用设置功能键，不等于输入监听、拦截或事件注入。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.SET_ABILITY_INSTANCE_INFO",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.NDK_START_SELF_UI_ABILITY",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.DETECT_GESTURE",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.kernel.DEBUGGER",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.kernel.ALLOW_DEBUG",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.BACKGROUND_MANAGER_POWER_SAVE_MODE",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.SET_WINDOW_TRANSPARENT",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.START_WINDOW_BELOW_LOCK_SCREEN",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.kernel.IGNORE_LIBRARY_VALIDATION",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.TIMEOUT_SCREENOFF_DISABLE_LOCK",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.LOCK_WINDOW_CURSOR",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.kernel.EXEMPT_ANONYMOUS_EXECUTABLE_MEMORY",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.INHERIT_PARENT_PERMISSION",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.GET_DONOTDISTURB_STATE",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.ALLOW_COREDUMP",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.CONNECT_OBJECTEDITOR_EXTENSION",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.STYLUS_FRAME_BOOST",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.QUERY_PUBLIC_CLI_TOOL",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.EXEC_PUBLIC_CLI_TOOL",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.DCAS_RUN_MODEL",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.kernel.USB_CAPTURE",
    "domain": "development",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.UPDATE_SCOPE_FONT",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-all"
  },
  {
    "name": "ohos.permission.SYSTEM_FLOAT_WINDOW",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DDK_USB",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DDK_HID",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.INTERCEPT_INPUT_EVENT",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.INPUT_MONITORING",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.READ_WRITE_USB_DEV",
    "domain": "development",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SET_TELEPHONY_ESIM_STATE_OPEN",
    "domain": "notifications-calls",
    "disposition": "standalone",
    "note": "限运营商添加eSIM配置场景，未发现与其他电话权限共同申请条款。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.DISABLE_CODE_MEMORY_PROTECTION",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.ALLOW_WRITABLE_CODE_MEMORY",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.ALLOW_EXECUTABLE_FORT_MEMORY",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.USE_FRAUD_CALL_LOG_PICKER",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.USE_FRAUD_MESSAGES_PICKER",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_VIRTUAL_SCREEN",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.ALLOW_USE_JITFORT_INTERFACE",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.DISABLE_GOTPLT_RO_PROTECTION",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.USE_FRAUD_APP_PICKER",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DDK_DRIVERS",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DDK_SCSI_PERIPHERAL",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_DDK_USB_SERIAL",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CUSTOM_SANDBOX",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "PC开发调测工具动态沙箱资格独立，不自动推导外部native或系统级权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_SCREEN_TIME_GUARD",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_ABILITY_INFO",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "限PC浏览器按URI或FileType查询Ability，与获取全量应用列表不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.USE_FLOAT_BALL",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.AUTO_RESTORE_MAIN_WINDOW",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.KEEP_BACKGROUND_RUNNING_SYSTEM",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.HOOK_KEY_EVENT",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.WEB_NATIVE_MESSAGING",
    "domain": "development",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SUBSCRIBE_NOTIFICATION",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "企业主体的第三方手表官方管理App才能申请；读取权限与蓝牙等转发能力分别核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ALLOW_EXTERNAL_NATIVE_CODE",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.atomicService.MANAGE_AGING",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "元服务小游戏老化策略，不是长时后台执行权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.LOAD_INDEPENDENT_LIBRARY",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_RECENT_SNAPSHOT",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SET_WINDOW_ALPHA",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_CALL_FOR_DEVICES",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.SET_WINDOW_TOUCH_AREAS",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.INPUT_DEVICE_CONFIGURATOR",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "输入设备和屏幕绑定属于外设驱动的具体操作，不推定与事件监听权限共同必选。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.REGISTER_OBJECTEDITOR_EXTENSION",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CHECK_CALL_LOG",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CONTROL_DEVICE",
    "domain": "windows-input",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.FLOAT_VIEW",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_CALL_TRANSFER_INFO",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "限手机银行且有转账风险评估业务，不能将其当成通话控制前置。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_SKILL",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.AS_LDK_DRIVER",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.PRINTER_DRIVER",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.SUPPORT_LOCAL_PLUGIN",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ALLOW_USE_BM",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.CAPTURE_PLAYBACK_DOWNLINK",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.MANAGE_SANDBOX_BUNDLE",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.DETECT_DEVICE",
    "domain": "development",
    "disposition": "api-dependent",
    "note": "二手设备回收资质及DSA前置，不推定需要ACCESS_BOARD_INFO。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.LOCAL_DEBUG_OTHER_APPS",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.DEFAULT_WEB_BROWSER",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "需浏览器品类及三项审核，默认浏览器身份不自动附赠其他浏览器专用权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.kernel.ALLOW_PTRACE_READ",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_ALL_BUNDLE_INFO",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.DIRECT_CALL",
    "domain": "notifications-calls",
    "disposition": "relation",
    "note": "直接拨号还受默认SIM卡条件限制；不因此自动添加读取联系人权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.ACCESS_BOARD_INFO",
    "domain": "development",
    "disposition": "api-dependent",
    "note": "MDM政企合规审计资格独立，不因硬件检测场景就能申请。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions"
  },
  {
    "name": "ohos.permission.GET_RUNNING_INFO",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.RUNNING_STATE_OBSERVER",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.GET_BUNDLE_INFO_PRIVILEGED",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.KILL_APP_PROCESSES",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "企业场景结束其他应用进程与CLEAN_BACKGROUND_PROCESSES的关联后台任务不同。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.VISIBLE_WINDOW_INFO",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "已核对列表用途与限制，未发现明确的其他权限必选前置；不表示所有API无附加条件。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SUPPORT_APP_SERVICE_EXTENSION",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SUPPORT_INSTALL_ON_U1",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.QUERY_LOCAL_WORKSPACES",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_WORKSPACES_EVENT_SUBSCRIBE",
    "domain": "app-runtime",
    "disposition": "api-dependent",
    "note": "权限条目未指定共同申请关系；具体接口、组件配置及设备支持另行核对。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SUPPORT_CROSS_APP_EMBED_FOR_OA",
    "domain": "windows-input",
    "disposition": "standalone",
    "note": "跨应用嵌入办公内容有浏览器NPAPI或流版签应用限定，不等于任意组件拉起。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.SUPPORT_NP_PLUGIN_FOR_WEB",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY_FOR_WEB",
    "domain": "development",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  },
  {
    "name": "ohos.permission.ENTERPRISE_GET_INSTALLED_BUNDLE_LIST",
    "domain": "app-runtime",
    "disposition": "relation",
    "note": "已核对独立能力边界或条件性组合，见关系条目；不按名称相近自动增加权限。",
    "source": "https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps"
  }
];
