// Plain-language questions and minimal examples, reviewed against the official catalog.
export const copyB = {
  "ohos.permission.HOOK_KEY_EVENT": {
    "question": "是否需要拦截键盘按键？",
    "example": "例如：处理快捷键时先拦截对应按键。"
  },
  "ohos.permission.WEB_NATIVE_MESSAGING": {
    "question": "是否需要让网页与本机程序通信？",
    "example": "例如：浏览器中的页面向本机配套程序发送消息。"
  },
  "ohos.permission.SUBSCRIBE_NOTIFICATION": {
    "question": "是否需要读取系统或其他应用的通知？",
    "example": "例如：汇总设备上的通知消息。"
  },
  "ohos.permission.CUSTOM_SCREEN_RECORDING": {
    "question": "是否需要在授权后录屏，不再每次弹窗确认？",
    "example": "例如：远程协助时持续共享屏幕；仍需先完成申请和设置授权。"
  },
  "ohos.permission.ALLOW_EXTERNAL_NATIVE_CODE": {
    "question": "是否需要运行外部原生程序？",
    "example": "例如：调用随业务另行提供的本机程序。"
  },
  "ohos.permission.GET_IP_MAC_INFO": {
    "question": "是否需要查询网络设备的 IP 和 MAC 地址？",
    "example": "例如：识别局域网内的网络设备。"
  },
  "ohos.permission.atomicService.MANAGE_AGING": {
    "question": "是否需要为元服务申请不同的清理保留策略？",
    "example": "例如：让特定元服务按专门的保留规则被系统清理。"
  },
  "ohos.permission.ACCESS_USER_FULL_DISK": {
    "question": "是否需要免于逐次弹窗访问用户公共文件路径？",
    "example": "例如：按业务需要处理多个公共文件夹中的文件。"
  },
  "ohos.permission.kernel.LOAD_INDEPENDENT_LIBRARY": {
    "question": "是否需要加载多种签名方式的原生共享库？",
    "example": "例如：加载自签名的本机功能库。"
  },
  "ohos.permission.CRYPTO_EXTENSION_REGISTER": {
    "question": "是否需要向系统注册或注销加密服务扩展？",
    "example": "例如：接入 UKey 安全钥匙提供的加密服务扩展。"
  },
  "ohos.permission.MANAGE_MEDIA_RESOURCES_FOR_PUBLIC": {
    "question": "是否需要获取和管理设备正在播放的媒体？",
    "example": "例如：展示并控制当前播放的音乐。"
  },
  "ohos.permission.MANAGE_RECENT_SNAPSHOT": {
    "question": "是否需要自定义任务列表或程序坞里的窗口预览图？",
    "example": "例如：在多任务预览中展示专用封面。"
  },
  "ohos.permission.SET_WINDOW_ALPHA": {
    "question": "是否需要让应用主窗口背景透明？",
    "example": "例如：制作带透明背景的桌面窗口。"
  },
  "ohos.permission.MANAGE_CALL_FOR_DEVICES": {
    "question": "是否需要读取来电号码或接听、拒接、挂断通话？",
    "example": "例如：在配套设备上显示来电并接听。"
  },
  "ohos.permission.SET_WINDOW_TOUCH_AREAS": {
    "question": "是否需要指定窗口中哪些区域接收点击？",
    "example": "例如：让透明区域的点击传给下方窗口。"
  },
  "ohos.permission.MANAGE_BLUETOOTH_ADVERTISER_NAME": {
    "question": "是否需要自定义低功耗蓝牙的广播名称？",
    "example": "例如：让附近设备看到指定的配件名称。"
  },
  "ohos.permission.INPUT_DEVICE_CONFIGURATOR": {
    "question": "是否需要把输入设备绑定到指定屏幕？",
    "example": "例如：让一块触控设备只操作对应显示屏。"
  },
  "ohos.permission.REGISTER_OBJECTEDITOR_EXTENSION": {
    "question": "是否需要向其他应用提供嵌入内容编辑功能？",
    "example": "例如：通过 ObjectEditorExtensionAbility，让文档应用调用你的公式编辑器。"
  },
  "ohos.permission.ALLOW_ACCESSORY_ACCESS": {
    "question": "是否需要关联配件，并让配件自动唤起应用？",
    "example": "例如：关联专用配件后，在连接时打开配套应用。"
  },
  "ohos.permission.CHECK_CALL_LOG": {
    "question": "是否需要判断指定条件的通话记录是否存在？",
    "example": "例如：检查某号码在指定时间内是否有满足时长条件的通话。"
  },
  "ohos.permission.GET_NETWORK_STATS": {
    "question": "是否需要查询其他应用使用了多少网络流量？",
    "example": "例如：生成按应用划分的流量统计。"
  },
  "ohos.permission.ACCESS_DLP_SERVICE": {
    "question": "是否需要向文件防泄露服务接入云端文件插件？",
    "example": "例如：注册企业云盘的 DLP 连云插件。"
  },
  "ohos.permission.CONTROL_DEVICE": {
    "question": "是否需要模拟输入来控制本机？",
    "example": "例如：远程协助时操作本机鼠标或键盘；还需完成设置授权。"
  },
  "ohos.permission.KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO": {
    "question": "是否需要申请特殊场景的长时间后台任务？",
    "example": "例如：按官方支持的特殊业务类型持续在后台运行。"
  },
  "ohos.permission.FLOAT_VIEW": {
    "question": "是否需要使用系统闪控窗？",
    "example": "例如：通过闪控窗展示和操作应用功能。"
  },
  "ohos.permission.GET_CALL_TRANSFER_INFO": {
    "question": "是否需要查询呼叫转移是否开启？",
    "example": "例如：在通话设置页展示当前呼叫转移状态。"
  },
  "ohos.permission.MANAGE_SKILL": {
    "question": "是否需要使用系统 skill 技能能力？",
    "example": "例如：接入 skill 接口提供的技能功能，具体用途需核对接口说明。"
  },
  "ohos.permission.kernel.AS_LDK_DRIVER": {
    "question": "是否需要为 PCIe 硬件安装驱动？",
    "example": "例如：安装专用扩展卡的配套驱动。"
  },
  "ohos.permission.ACCESS_GAME_BUDDY_SERVICE": {
    "question": "是否需要接入系统游戏伴随服务？",
    "example": "例如：在游戏相关功能中调用游戏伴随接口。"
  },
  "ohos.permission.KNOCK_COLLABORATION": {
    "question": "是否需要通过碰一碰与指定设备互动？",
    "example": "例如：碰触另一台设备后交换信息。"
  },
  "ohos.permission.PRINTER_DRIVER": {
    "question": "是否需要管理打印系统？",
    "example": "例如：接入打印机驱动并管理打印相关功能。"
  },
  "ohos.permission.kernel.SUPPORT_LOCAL_PLUGIN": {
    "question": "是否需要安装并加载自行分发的插件？",
    "example": "例如：从自有渠道安装业务插件。"
  },
  "ohos.permission.MANAGE_AUDIO_ACCESSORY": {
    "question": "是否需要向系统注册音频配件？",
    "example": "例如：让系统识别应用接入的专用音频配件。"
  },
  "ohos.permission.ALLOW_USE_BM": {
    "question": "是否需要在开发者模式下使用应用包管理工具？",
    "example": "例如：调试时通过 BM 工具管理应用包。"
  },
  "ohos.permission.ACCESS_DIGITAL_IDENTITY": {
    "question": "是否需要导入数字身份凭证？",
    "example": "例如：把数字凭证导入系统数字身份服务。"
  },
  "ohos.permission.CAPTURE_PLAYBACK_DOWNLINK": {
    "question": "是否需要录制蜂窝通话中对方的声音？",
    "example": "例如：按允许的业务场景采集通话下行音频。"
  },
  "ohos.permission.MANAGE_SANDBOX_BUNDLE": {
    "question": "是否需要管理沙箱中的应用？",
    "example": "例如：管理在隔离沙箱内运行的业务应用。"
  },
  "ohos.permission.DETECT_DEVICE": {
    "question": "是否需要从智能检测服务获取检测数据？",
    "example": "例如：读取智能检测接口返回的设备检测结果。"
  },
  "ohos.permission.LOCAL_DEBUG_OTHER_APPS": {
    "question": "是否需要在本地调试时用 aa 工具调试应用？",
    "example": "例如：开发者模式下通过命令调试应用组件。"
  },
  "ohos.permission.ACCESS_SE_KEY": {
    "question": "是否需要创建、使用或删除安全芯片中的密钥？",
    "example": "例如：使用芯片内的密钥完成加密操作。"
  },
  "ohos.permission.DEFAULT_WEB_BROWSER": {
    "question": "是否需要让用户把应用设为默认浏览器？",
    "example": "例如：由用户选择后，用你的浏览器打开网页链接。"
  },
  "ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY": {
    "question": "是否需要加载二进制证书或调试证书签名的共享库？",
    "example": "例如：加载使用二进制证书签名的原生功能库。"
  },
  "ohos.permission.kernel.ALLOW_PTRACE_READ": {
    "question": "是否需要读取应用内进程的寄存器和内存？",
    "example": "例如：通过 PTRACE 分析本应用进程的运行问题。"
  },
  "ohos.permission.GET_ALL_BUNDLE_INFO": {
    "question": "是否需要获取设备已安装的应用列表？",
    "example": "例如：展示本机应用清单。"
  },
  "ohos.permission.DIRECT_CALL": {
    "question": "是否需要在应用内一键拨打电话？",
    "example": "例如：点击业务联系人后直接发起拨号。"
  },
  "ohos.permission.ACCESS_BOARD_INFO": {
    "question": "是否需要查询设备硬件信息？",
    "example": "例如：在设备诊断页显示硬件资料。"
  },
  "ohos.permission.SYNC_ROOT_MANAGER": {
    "question": "是否需要管理云盘的同步文件夹？",
    "example": "例如：设置用于同步企业云盘的本地文件夹。"
  },
  "ohos.permission.SET_FILE_GUARD_POLICY": {
    "question": "是否需要下发文件管控规则？",
    "example": "例如：为企业文件设置管控策略。"
  },
  "ohos.permission.FILE_GUARD_MANAGER": {
    "question": "是否需要扫描公共文件夹并设置文件标签等属性？",
    "example": "例如：扫描办公文件后标注文件密级。"
  },
  "ohos.permission.FILE_GUARD_FILE_WRITE": {
    "question": "是否需要获取用户数据中指定文件的写入权限？",
    "example": "例如：企业应用获取指定文件的写入权限后修改内容。"
  },
  "ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS": {
    "question": "是否需要跨本机不同账号进行交互？",
    "example": "例如：在两个本地账号之间执行业务交互。"
  },
  "ohos.permission.GET_LOCAL_ACCOUNT_IDENTIFIERS": {
    "question": "是否需要查询本机账号的名称或 ID？",
    "example": "例如：展示可用的本地账号列表。"
  },
  "ohos.permission.GET_RUNNING_INFO": {
    "question": "是否需要查询其他应用及其组件的运行状态？",
    "example": "例如：在企业监控页展示其他应用及其组件的运行情况。"
  },
  "ohos.permission.RUNNING_STATE_OBSERVER": {
    "question": "是否需要监听应用状态变化？",
    "example": "例如：应用切到后台时更新监控记录。"
  },
  "ohos.permission.GET_BUNDLE_INFO_PRIVILEGED": {
    "question": "是否需要查询应用包的基本及敏感信息？",
    "example": "例如：在企业管理台展示应用包的详细资料。"
  },
  "ohos.permission.GET_WIFI_CONFIG": {
    "question": "是否需要读取 Wi-Fi 配置？",
    "example": "例如：检查设备保存的网络配置信息。"
  },
  "ohos.permission.SET_WIFI_CONFIG": {
    "question": "是否需要修改 Wi-Fi 配置？",
    "example": "例如：配置企业无线网络的连接参数。"
  },
  "ohos.permission.GET_DOMAIN_ACCOUNTS": {
    "question": "是否需要查询企业域账号？",
    "example": "例如：显示设备关联的企业域账号信息。"
  },
  "ohos.permission.QUERY_AUDIT_EVENT": {
    "question": "是否需要查询安全审计记录？",
    "example": "例如：企业安全应用查看设备上的安全事件。"
  },
  "ohos.permission.KILL_APP_PROCESSES": {
    "question": "是否需要结束其他应用的进程？",
    "example": "例如：按企业管理要求结束指定应用的运行。"
  },
  "ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION": {
    "question": "是否需要管理企业设备的 Wi-Fi 连接？",
    "example": "例如：让设备连接到指定的企业无线网络。"
  },
  "ohos.permission.ACCESS_ENTERPRISE_USER_TRUSTED_CERT": {
    "question": "是否需要管理企业设备的用户 CA 证书？",
    "example": "例如：安装企业内网使用的受信任证书。"
  },
  "ohos.permission.MANAGE_NET_FIREWALL": {
    "question": "是否需要设置网络防火墙规则？",
    "example": "例如：阻止指定网络连接。"
  },
  "ohos.permission.GET_NET_FIREWALL": {
    "question": "是否需要查询防火墙规则和拦截记录？",
    "example": "例如：排查业务请求是否被防火墙拦截。"
  },
  "ohos.permission.GET_DOMAIN_ACCOUNT_SERVER_CONFIGS": {
    "question": "是否需要读取企业域账号服务器配置？",
    "example": "例如：查看当前域账号使用的服务器参数。"
  },
  "ohos.permission.MANAGE_DOMAIN_ACCOUNT_SERVER_CONFIGS": {
    "question": "是否需要修改企业域账号服务器配置？",
    "example": "例如：更新企业身份服务的连接参数。"
  },
  "ohos.permission.MANAGE_DOMAIN_ACCOUNTS": {
    "question": "是否需要管理企业域账号？",
    "example": "例如：按企业账号流程管理设备上的域账号。"
  },
  "ohos.permission.GET_SIGNATURE_INFO": {
    "question": "是否需要查询应用包的签名信息？",
    "example": "例如：核验应用来自哪个签名主体。"
  },
  "ohos.permission.VISIBLE_WINDOW_INFO": {
    "question": "是否需要查询屏幕上可见的窗口？",
    "example": "例如：获取当前显示窗口的信息。"
  },
  "ohos.permission.kernel.AUTH_AUDIT_EVENT": {
    "question": "是否需要通过安全审计能力阻断相关事件？",
    "example": "例如：企业安全应用按审计规则拦截不允许的操作。"
  },
  "ohos.permission.SUPPORT_APP_SERVICE_EXTENSION": {
    "question": "是否需要以应用服务扩展的方式被唤起？",
    "example": "例如：提供可由系统拉起的 AppServiceExtension 服务。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_EAP": {
    "question": "是否需要在企业网络认证报文中加入自定义信息？",
    "example": "例如：安全软件在 EAP 认证报文中附带企业字段。"
  },
  "ohos.permission.SUPPORT_INSTALL_ON_U1": {
    "question": "是否需要把企业应用安装到指定的特殊用户下？",
    "example": "例如：按企业部署要求安装到接口指定的用户空间。"
  },
  "ohos.permission.QUERY_LOCAL_WORKSPACES": {
    "question": "是否需要查询本机工作空间及不可删除的空间列表？",
    "example": "例如：列出工作空间及其中不允许删除的空间。"
  },
  "ohos.permission.SET_NET_EXT_ATTRIBUTE": {
    "question": "是否需要设置网络的扩展属性？",
    "example": "例如：为企业网络连接写入接口支持的附加属性。"
  },
  "ohos.permission.MANAGE_ANTIVIRUS": {
    "question": "是否需要管理企业防病毒软件？",
    "example": "例如：统一配置设备上的防病毒能力。"
  },
  "ohos.permission.REGISTER_ANTIVIRUS": {
    "question": "是否需要向系统登记防病毒软件的信息？",
    "example": "例如：防病毒软件注册自身并更新基本资料。"
  },
  "ohos.permission.CALL_TPM_CMD": {
    "question": "是否需要调用可信平台模块 TPM 的命令？",
    "example": "例如：使用设备可信硬件提供的安全操作。"
  },
  "ohos.permission.ENTERPRISE_WORKSPACES_EVENT_SUBSCRIBE": {
    "question": "是否需要监听企业数字空间的变化？",
    "example": "例如：在工作空间发生相关事件时更新管理状态。"
  },
  "ohos.permission.SCAN_REMEDIATE_VIRUS": {
    "question": "是否需要扫描并处置病毒？",
    "example": "例如：扫描文件并处理发现的威胁。"
  },
  "ohos.permission.sec.ACCESS_UDID": {
    "question": "是否需要获取设备的唯一标识 UDID？",
    "example": "例如：在企业资产台账中识别同一台设备。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_PRINT": {
    "question": "是否需要管理企业打印功能？",
    "example": "例如：通过企业打印接口设置打印相关规则。"
  },
  "ohos.permission.DLP_POLICY_MANAGER": {
    "question": "是否需要管理文件自动加解密规则？",
    "example": "例如：规定哪些企业应用写出的文件需要自动加密。"
  },
  "ohos.permission.SUPPORT_CROSS_APP_EMBED_FOR_OA": {
    "question": "是否需要在应用内嵌入另一个应用的界面？",
    "example": "例如：办公应用拉起其他应用提供的 EmbeddedUIExtension 界面。"
  },
  "ohos.permission.SUPPORT_NP_PLUGIN_FOR_WEB": {
    "question": "是否需要释放网页原生插件库？",
    "example": "例如：网页插件使用结束后按接口要求释放插件库。"
  },
  "ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY_FOR_WEB": {
    "question": "是否需要加载证书签名的网页插件库？",
    "example": "例如：加载使用二进制证书签名的原生网页插件。"
  },
  "ohos.permission.ENTERPRISE_GET_INSTALLED_BUNDLE_LIST": {
    "question": "是否需要获取设备已安装的全部应用列表？",
    "example": "例如：企业应用盘点设备上的所有已安装应用。"
  },
  "ohos.permission.kernel.TRAFFIC_FILTER": {
    "question": "是否需要检查、拦截或重定向网络数据包？",
    "example": "例如：企业安全软件把待检查的流量转到本地端口。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_BACKUP": {
    "question": "是否需要使用设备备份和还原能力？",
    "example": "例如：按企业迁移流程备份并恢复数据。"
  },
  "ohos.permission.ENTERPRISE_GET_DEVICE_INFO": {
    "question": "是否需要统一查询受管设备的信息？",
    "example": "例如：在企业资产台账中显示设备资料。"
  },
  "ohos.permission.ENTERPRISE_GET_NETWORK_INFO": {
    "question": "是否需要统一查询受管设备的网络信息？",
    "example": "例如：远程查看办公设备当前的网络情况。"
  },
  "ohos.permission.ENTERPRISE_INSTALL_BUNDLE": {
    "question": "是否需要统一安装或卸载设备上的应用？",
    "example": "例如：向办公设备安装企业业务应用。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY": {
    "question": "是否需要统一设置应用运行规则？",
    "example": "例如：为指定企业应用下发运行管理策略。"
  },
  "ohos.permission.ENTERPRISE_RESET_DEVICE": {
    "question": "是否需要让受管设备恢复出厂设置？",
    "example": "例如：设备回收时按企业流程执行重置。"
  },
  "ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY": {
    "question": "是否需要统一设置设备账号管理规则？",
    "example": "例如：对受管设备下发账号使用策略。"
  },
  "ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY": {
    "question": "是否需要统一限制设备能安装哪些应用？",
    "example": "例如：只允许安装企业批准的应用包。"
  },
  "ohos.permission.ENTERPRISE_SET_DATETIME": {
    "question": "是否需要统一设置设备的系统时间？",
    "example": "例如：为企业设备调整时间配置。"
  },
  "ohos.permission.ENTERPRISE_SET_NETWORK": {
    "question": "是否需要统一设置受管设备的网络信息？",
    "example": "例如：向办公设备下发网络配置。"
  },
  "ohos.permission.ENTERPRISE_SET_WIFI": {
    "question": "是否需要统一设置或查询设备的 Wi-Fi 信息？",
    "example": "例如：下发办公 Wi-Fi 配置并查询当前配置。"
  },
  "ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT": {
    "question": "是否需要监听设备管理事件？",
    "example": "例如：在相关管理事件发生时更新企业管理记录。"
  },
  "ohos.permission.ENTERPRISE_RESTRICT_POLICY": {
    "question": "是否需要下发或查询设备功能限制规则？",
    "example": "例如：读取受管设备当前的功能限制策略。"
  },
  "ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME": {
    "question": "是否需要统一设置设备的自动休眠时间？",
    "example": "例如：统一调整办公设备的自动休眠等待时间。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_USB": {
    "question": "是否需要统一管理设备的 USB 功能？",
    "example": "例如：按企业规则限制 USB 的使用。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_NETWORK": {
    "question": "是否需要统一管理设备的网络？",
    "example": "例如：向受管设备下发网络管理策略。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE": {
    "question": "是否需要统一管理设备上的证书？",
    "example": "例如：为办公设备安装企业证书。"
  },
  "ohos.permission.ENTERPRISE_GET_SETTINGS": {
    "question": "是否需要查询设备“设置”里的配置数据？",
    "example": "例如：检查办公设备当前的系统设置。"
  },
  "ohos.permission.ENTERPRISE_SET_BROWSER_POLICY": {
    "question": "是否需要统一设置或取消浏览器规则？",
    "example": "例如：给受管设备下发企业浏览器策略。"
  },
  "ohos.permission.SET_ENTERPRISE_INFO": {
    "question": "是否需要设置设备管理中的企业信息？",
    "example": "例如：更新设备所属企业的资料。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_SECURITY": {
    "question": "是否需要统一设置设备安全管理规则？",
    "example": "例如：向办公设备下发安全策略。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH": {
    "question": "是否需要统一设置或查询设备的蓝牙信息？",
    "example": "例如：检查受管设备的蓝牙配置并按需调整。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_SYSTEM": {
    "question": "是否需要统一设置设备的系统参数规则？",
    "example": "例如：向企业设备下发系统参数策略。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_WIFI": {
    "question": "是否需要统一管理设备的 Wi-Fi 设置？",
    "example": "例如：查询或设置受管设备的无线网络信息。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS": {
    "question": "是否需要统一管理设备功能的限制规则？",
    "example": "例如：调整企业设备允许使用的功能。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_APPLICATION": {
    "question": "是否需要统一设置设备上的应用管理规则？",
    "example": "例如：下发企业应用的管理策略。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_LOCATION": {
    "question": "是否需要统一设置或查询设备的位置信息？",
    "example": "例如：按企业管理流程查询受管设备的位置。"
  },
  "ohos.permission.ENTERPRISE_REBOOT": {
    "question": "是否需要让受管设备关机或重启？",
    "example": "例如：维护完成后远程重启办公设备。"
  },
  "ohos.permission.ENTERPRISE_LOCK_DEVICE": {
    "question": "是否需要锁定受管设备？",
    "example": "例如：办公设备遗失后执行锁定。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_SETTINGS": {
    "question": "是否需要统一管理设备的系统设置？",
    "example": "例如：为受管设备调整接口支持的设置项。"
  },
  "ohos.permission.ENTERPRISE_OPERATE_DEVICE": {
    "question": "是否需要通过企业管理接口操作设备？",
    "example": "例如：执行企业设备管理接口支持的设备操作。"
  },
  "ohos.permission.ENTERPRISE_ADMIN_MANAGE": {
    "question": "是否需要管理设备管理应用本身？",
    "example": "例如：维护设备上的管理应用配置。"
  },
  "ohos.permission.ENTERPRISE_RECOVERY_KEY": {
    "question": "是否需要管理企业恢复密钥？",
    "example": "例如：维护用于企业设备恢复的密钥。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY": {
    "question": "是否需要让其他应用代为设置部分设备规则？",
    "example": "例如：把指定设备管控能力委托给配套应用。"
  },
  "ohos.permission.ENTERPRISE_GET_ALL_BUNDLE_INFO": {
    "question": "是否需要统一查询设备上的所有应用信息？",
    "example": "例如：管理端获取设备的完整应用资料。"
  },
  "ohos.permission.ENTERPRISE_SET_USER_RESTRICTION": {
    "question": "是否需要限制用户修改系统设置？",
    "example": "例如：防止用户更改企业统一配置的设置项。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_APN": {
    "question": "是否需要统一管理移动网络接入点 APN？",
    "example": "例如：向企业设备下发专用移动网络接入配置。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_TELEPHONY": {
    "question": "是否需要统一设置设备通话规则？",
    "example": "例如：按企业要求下发通话管理策略。"
  },
  "ohos.permission.ENTERPRISE_SET_KIOSK": {
    "question": "是否需要把设备设为专用终端模式？",
    "example": "例如：把展台设备设为 Kiosk 模式供专门业务使用。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES": {
    "question": "是否需要启用、创建或删除企业工作空间？",
    "example": "例如：为办公业务创建独立工作空间。"
  },
  "ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT": {
    "question": "是否需要管理文件传输规则和审计信息？",
    "example": "例如：管理企业文件传输并查看相关记录。"
  },
  "ohos.permission.ENTERPRISE_SET_WALLPAPER": {
    "question": "是否需要统一设置设备壁纸？",
    "example": "例如：给企业设备设置公司壁纸。"
  },
  "ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS": {
    "question": "是否需要管理系统预装的防病毒软件？",
    "example": "例如：通过管理端配置设备自带的防病毒软件。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION": {
    "question": "是否需要由管理员统一允许或拒绝应用的部分权限？",
    "example": "例如：在受管设备上统一允许相机权限，免去对应权限的用户授权弹窗；仍需满足管理条件。"
  },
  "ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE": {
    "question": "是否需要识别文件里的敏感内容？",
    "example": "例如：检查企业文件是否含有敏感信息。"
  },
  "ohos.permission.ENTERPRISE_ACCESS_DLP_FILE": {
    "question": "是否需要生成、解密受保护文件，或查询文件使用规则？",
    "example": "例如：生成企业 DLP 加密文件并查询其使用策略。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN": {
    "question": "是否需要管理其他设备管理应用？",
    "example": "例如：管理端对另一设备管理应用执行管理操作。"
  },
  "ohos.permission.ENTERPRISE_START_ABILITIES": {
    "question": "是否需要通过管理端访问其他应用组件？",
    "example": "例如：调用其他业务应用提供的组件。"
  },
  "ohos.permission.ENTERPRISE_READ_LOG": {
    "question": "是否需要收集设备的系统日志？",
    "example": "例如：为企业设备故障排查导出日志。"
  },
  "ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN": {
    "question": "是否需要让已激活的管理应用解除自身激活？",
    "example": "例如：退出企业管理时注销本管理应用的激活状态。"
  },
  "ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN": {
    "question": "是否需要让设备管理应用自行完成激活？",
    "example": "例如：按企业部署流程激活管理应用。"
  },
  "ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS": {
    "question": "是否需要统一管理设备的本地账号？",
    "example": "例如：为办公设备维护本地账号。"
  },
  "ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS": {
    "question": "是否需要跨本机的多个用户执行操作？",
    "example": "例如：管理端对不同本地用户执行管理操作。"
  },
  "ohos.permission.ENTERPRISE_VPN": {
    "question": "是否需要让设备管理应用默认具有 VPN 接入权限？",
    "example": "例如：管理应用按企业部署要求接入 VPN。"
  },
  "ohos.permission.ENTERPRISE_REQUEST_PUBLISH_FORM": {
    "question": "是否需要在受管设备桌面添加卡片？",
    "example": "例如：向企业设备桌面添加办公业务卡片。"
  },
  "ohos.permission.ENTERPRISE_EXTERNAL_READ": {
    "question": "是否需要在设备首次开机配置时拷贝 U 盘大文件？",
    "example": "例如：在首次设置流程中导入企业部署文件。"
  },
  "ohos.permission.ENTERPRISE_ENCRYPT_BLOCK_DEVICE": {
    "question": "是否需要挂载或卸载加密 U 盘的加密区和交换区？",
    "example": "例如：让受管设备按企业流程接入加密 U 盘。"
  }
};
