# 受限开放权限研究

核对日期：2026-11-13。完整读取华为页面提供的 Markdown 正文，共 105 个权限条目；该数目仅为此页面条目数，不代表所有系统权限数量。

来源：[受限开放权限](https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions)；[官方 Markdown 正文](https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/restricted-permissions.md)。以下为事实索引，具体资格和使用场景应回查原文。

## 主要结论

- APL、ACL 与授权方式是不同维度。normal 应用获得 ACL 跨级申请资格，不等于所有用户权限已授权。
- 该页并非全为 system_basic：FILE_ACCESS_PERSIST 自 API12 为 normal，但上架仍需按受限权限流程。
- 授权方式存在 system_grant、user_grant、manual_settings 三类；manual_settings 条目为 HOOK_KEY_EVENT、CUSTOM_SCREEN_RECORDING、ACCESS_USER_FULL_DISK、CONTROL_DEVICE。
- 大部分预计三个工作日审核，部分立即通过，另有条目未列审核时长，不能统一当作三天。
- READ_IMAGEVIDEO API26 起只读本地公共目录；用户手动选媒体处理通常应使用 Picker，不符合批量/自动读取场景不应申请。
- READ/WRITE_CONTACTS、READ/WRITE_AUDIO 限定克隆、备份、同步；WRITE_IMAGEVIDEO 可立即审核但仍为 user_grant。
- SHORT_TERM_WRITE_IMAGEVIDEO 虽标 system_grant，正文另明确短时授权最长30分钟并涉及用户确认，不可按永不弹窗理解。
- CONTROL_DEVICE 当前也面向模拟用户输入操控设备的智能体应用，限 PC/2in1；MANAGE_SKILL、MANAGE_SANDBOX_BUNDLE、GET_ALL_BUNDLE_INFO 为智能体相关权限，后者为 user_grant/API26.0.1。
- ACCESS_DLP_SERVICE 用于 DLP 连云插件注册/解注册，system_grant，API26，Phone/PC/Tablet/TV；DLP_GET_HIDE_STATUS 为屏幕窥视状态，Phone，自 API20 普通应用开放。
- ACCESS_DDK_DRIVERS 带额外 value 数据，要校验目标驱动已上架或一并上架且业务能力一致，不能只建权限名集合。
- GET_WIFI_LOCAL_MAC、GET_ETHERNET_LOCAL_MAC 当前场景段出现 TV 视频应用，而变更段仍表述其他设备仅系统应用，存在同页口径不完全一致，实际申请应确认平台和接口版本。

## ACL 申请流程

官方依据：[管理ACL权限](https://developer.huawei.com/consumer/cn/doc/app/agc-help-apply-acl-0000002394212138/)、[常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-faqs/faqs-appgallery-25/)、[访问控制概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-mgmt-overview/)。

先判断使用场景是否符合资格，在开发者中心“开发者管理 > ID、证书和Profile > APP ID > ACL权限”按需申请，获批后重新创建含 ACL 的 Profile，再在软件包配置中声明，运行时另完成相应 user_grant/manual_settings 授权。ACL变化后需要重新创建 Profile。审核通过权限会写入新 Profile，不使用的权限从 module.json5 声明移除。一次申请最多30条；可申请项受应用/开发者类型影响，以平台实际展示为准。ACL获得后超使用场景仍影响调试/上架。申请页面还存在一次性进入试用调试Profile入口，关闭后须等待正式审批，不宜假设可随时重建。

## 全部105条事实索引

| 权限 | 能力摘要 | 等级、授权、设备及版本元数据 |
| --- | --- | --- |
| ohos.permission.SYSTEM_FLOAT_WINDOW | 允许应用使用悬浮窗的能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：7 |
| ohos.permission.READ_CONTACTS | 允许应用读取联系人数据。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：8 |
| ohos.permission.WRITE_CONTACTS | 允许应用添加、移除或更改联系人数据。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：8 |
| ohos.permission.READ_AUDIO | 允许读取用户公共目录的音频文件。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：9 |
| ohos.permission.WRITE_AUDIO | 允许修改用户公共目录的音频文件。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：9 |
| ohos.permission.READ_IMAGEVIDEO | 允许读取用户本地公共目录的图片或视频文件。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：9<br>**变更信息**：在API版本9-24，申请该权限可访问云上和本地图片或视频文件；从API版本26.0.0开始，申请该权限仅能读取用户本地公共目录的图片或视频文件。 |
| ohos.permission.WRITE_IMAGEVIDEO | 允许修改用户公共目录的图片或视频文件。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：9 |
| ohos.permission.READ_WRITE_DESKTOP_DIRECTORY | 允许应用访问公共目录下Desktop目录及子目录。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：11 |
| ohos.permission.ACCESS_DDK_USB | 允许扩展外设驱动访问USB DDK接口开发USB总线扩展外设驱动。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：11 |
| ohos.permission.ACCESS_DDK_HID | 允许扩展外设驱动访问HID DDK接口开发HID类扩展外设驱动。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：11 |
| ohos.permission.READ_PASTEBOARD | 允许应用读取剪贴板。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**支持设备**：Phone  /  TV  /  Wearable  /  PC/2in1  /  Tablet  /  Car<br>**起始版本**：11 |
| ohos.permission.FILE_ACCESS_PERSIST | 允许应用支持持久化访问文件Uri。 | **权限级别**：normal<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：11<br>**变更信息：** 在API 11，权限等级为system_basic；从API 12开始，权限等级变更为normal，向普通应用开放。 |
| ohos.permission.INTERCEPT_INPUT_EVENT | 允许应用拦截输入事件。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：11<br>**变更信息**：API 11，权限等级为system_core；从API 12开始，权限等级变更为system_basic，向普通应用开放。从API 26.0.0开始，该权限支持在全设备上申请。 |
| ohos.permission.INPUT_MONITORING | 允许应用监听输入事件。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：7<br>**变更信息**：API 7-11，权限等级为system_core；从API 12开始，权限等级变更为system_basic，向普通应用开放。 |
| ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO | 允许应用保存图片、视频到用户公共目录。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：12 |
| ohos.permission.READ_WRITE_USER_FILE | 允许应用访问并修改用户目录下的文件。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：13 |
| ohos.permission.READ_WRITE_USB_DEV | 允许应用连接设备，并通过USB调试读写该设备。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：13 |
| ohos.permission.GET_WIFI_PEERS_MAC | 允许应用获取对端Wi-Fi设备的MAC地址。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：8<br>**变更信息**：API 8-13，权限等级为system_core；从API 14开始，权限等级变更为system_basic，向普通应用开放。 |
| ohos.permission.SET_TELEPHONY_ESIM_STATE_OPEN | 允许运营商应用添加eSIM配置文件。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：13<br>**变更信息**：在API 13，权限等级为normal；从API 14开始，权限等级变更为system_basic。 |
| ohos.permission.kernel.DISABLE_CODE_MEMORY_PROTECTION | 允许应用禁用本应用的代码运行时完整性保护。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：14 |
| ohos.permission.kernel.ALLOW_WRITABLE_CODE_MEMORY | 允许应用申请可写可执行匿名内存，该能力主要用于为应用自带引擎（如 JS 引擎、游戏脚本引擎等）提供即时编译（JIT）能力，提升代码执行效率。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1  /  Tablet<br>**起始版本**：14 |
| ohos.permission.kernel.ALLOW_EXECUTABLE_FORT_MEMORY | 允许系统JS引擎申请带MAP_FORT标识的匿名可执行内存。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：14 |
| ohos.permission.MANAGE_PASTEBOARD_APP_SHARE_OPTION | 允许应用设置或移除剪贴板数据的可粘贴范围。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  TV  /  Wearable  /  PC/2in1  /  Tablet  /  Car<br>**起始版本**：14 |
| ohos.permission.MANAGE_UDMF_APP_SHARE_OPTION | 允许应用设置或移除其使用UDMF支持的数据分享范围。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：14 |
| ohos.permission.ACCESS_DISK_PHY_INFO | 允许应用获取硬盘的硬件信息。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：15 |
| ohos.permission.PRELOAD_FILE | 允许应用预加载文件以提升文件打开速度。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1  /  Tablet<br>**起始版本**：15<br>**变更信息**：从API版本26.0.0开始，增加支持在平板上申请。 |
| ohos.permission.SET_PAC_URL | 允许应用设置代理自动配置脚本地址。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：15 |
| ohos.permission.PERSONAL_MANAGE_RESTRICTIONS | 允许设备管理应用管理个人设备限制策略。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：15 |
| ohos.permission.START_PROVISIONING_MESSAGE | 允许应用启动设备管理业务部署流程，将该应用激活为个人设备管理应用。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：15 |
| ohos.permission.USE_FRAUD_CALL_LOG_PICKER | 允许应用使用诈骗通话记录选择器，获取通话记录内容。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：15 |
| ohos.permission.USE_FRAUD_MESSAGES_PICKER | 允许应用使用诈骗短信选择器，获取短信内容。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：15 |
| ohos.permission.PERSISTENT_BLUETOOTH_PEERS_MAC | 允许应用固化对端蓝牙设备MAC对应的虚拟地址。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：16 |
| ohos.permission.ACCESS_VIRTUAL_SCREEN | 允许应用管控虚拟屏。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：16 |
| ohos.permission.MANAGE_APN_SETTING | 允许应用读取或设置APN信息。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：16 |
| ohos.permission.GET_WIFI_LOCAL_MAC | 允许应用获取本机的Wi-Fi设备的MAC地址。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：8<br>**变更信息**：API 8-15该权限仅向系统应用开放；从API 16开始，在PC/2in1设备上面向普通应用开放，在其余设备上仍仅面向系统应用开放。 |
| ohos.permission.kernel.ALLOW_USE_JITFORT_INTERFACE | 允许应用调用JITFort接口更新MAP_FORT内存的内容。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：16 |
| ohos.permission.GET_ETHERNET_LOCAL_MAC | 允许应用查询以太网当前MAC地址。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：13<br>**变更信息**：API 13，该权限仅面向MDM应用开放；从API 14开始，开放范围从MDM应用变更为企业普通应用；从API 16开始，在PC/2in1设备上面向普通应用开放，在其余设备上仍仅面向系统应用开放。 |
| ohos.permission.kernel.DISABLE_GOTPLT_RO_PROTECTION | 允许应用关闭进程内.got.plt段的只读保护。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：17 |
| ohos.permission.USE_FRAUD_APP_PICKER | 允许应用使用诈骗应用选择器，获取应用信息。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：18 |
| ohos.permission.ACCESS_DDK_DRIVERS | 允许扩展外设驱动客户端绑定到扩展外设驱动服务端。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：18 |
| ohos.permission.ACCESS_DDK_SCSI_PERIPHERAL | 允许扩展外设驱动访问SCSI DDK接口开发SCSI Peripheral扩展外设驱动。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：18 |
| ohos.permission.ACCESS_DDK_USB_SERIAL | 允许扩展外设驱动访问USBSerial DDK接口开发USB Serial扩展外设驱动。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备：** PC/2in1  /  Tablet<br>**起始版本**：18 |
| ohos.permission.CUSTOM_SANDBOX | 允许应用将沙箱类型改为动态沙箱。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**起始版本**：18 |
| ohos.permission.atomicService.MANAGE_STORAGE | 允许元服务小游戏进行存储空间大小的管理。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：20 |
| ohos.permission.MANAGE_SCREEN_TIME_GUARD | 允许应用调用屏幕时间守护相关接口，进行屏幕使用限制、应用访问控制、管控使用时间等操作。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Tablet<br>**起始版本**：20 |
| ohos.permission.CUSTOMIZE_SAVE_BUTTON | 允许应用自定义保存控件的图标和文本。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：20 |
| ohos.permission.GET_ABILITY_INFO | 允许应用根据URI或者FileType查询Ability信息。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**: PC/2in1<br>**起始版本**：20 |
| ohos.permission.ACCESS_FIDO2_ONLINEAUTH | 允许应用使用通行密钥服务的NDK。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：20 |
| ohos.permission.USE_FLOAT_BALL | 允许应用使用闪控球的能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：20<br>**变更信息**：从API版本26.0.0开始，增加支持在PC/2in1上申请。 |
| ohos.permission.AUTO_RESTORE_MAIN_WINDOW | 允许应用使用闪控球的自动恢复到应用主窗口的能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Tablet<br>**起始版本**：24 |
| ohos.permission.DLP_GET_HIDE_STATUS | 允许应用使用信息隐藏接口，获取信息隐藏状态的能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**: Phone<br>**起始版本**：18<br>**变更信息**：在API18-19，该权限面向系统应用开放；从API20开始，面向普通应用开放。 |
| ohos.permission.READ_LOCAL_DEVICE_NAME | 允许应用获取本机的设备显示名。 | **权限级别**：system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: Phone  /  PC/2in1  /  Tablet<br>**起始版本**: 20 |
| ohos.permission.KEEP_BACKGROUND_RUNNING_SYSTEM | 允许应用申请特殊类型长时任务，如在手机上申请计算任务类型的长时任务。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：20 |
| ohos.permission.LINKTURBO | 允许应用使用多网并发等网络加速能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：20 |
| ohos.permission.ACCESS_NET_TRACE_INFO | 允许应用使用网络探测和获取TraceRoute信息的维测能力，用于检测网络时延较大的可能故障原因。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：20 |
| ohos.permission.READ_WHOLE_CALENDAR | 允许应用读取所有的日历信息。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：9<br>**变更信息**：在API 9-19，该权限面向系统应用开放；从API 20开始，面向普通应用开放。 |
| ohos.permission.WRITE_WHOLE_CALENDAR | 允许应用添加、移除或更改所有的日历活动。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**起始版本**：9<br>**变更信息**：在API 9-19，该权限面向系统应用开放；从API 20开始，面向普通应用开放。 |
| ohos.permission.SET_SYSTEMSHARE_APPLAUNCHTRUSTLIST | 允许应用配置系统分享的目标应用名单。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet  /  TV<br>**起始版本**：21 |
| ohos.permission.HOOK_KEY_EVENT | 允许应用拦截键盘输入事件。 | **权限级别**：system_basic<br>**授权方式**：手动设置授权（manual_settings）<br>**支持设备**：PC/2in1  /  Tablet<br>**起始版本**：21 |
| ohos.permission.WEB_NATIVE_MESSAGING | 允许应用使用Web本地通信能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：21<br>**变更信息**：从API版本24开始，增加支持在手机和平板上申请。 |
| ohos.permission.SUBSCRIBE_NOTIFICATION | 允许应用读取系统或者已安装应用发布的通知。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Tablet<br>**起始版本**：22 |
| ohos.permission.CUSTOM_SCREEN_RECORDING | 允许应用无需弹窗录制屏幕。 | **权限级别**：system_basic<br>**授权方式**：手动设置授权（manual_settings）<br>**支持设备**：PC/2in1  /  TV<br>**起始版本**：22<br>**变更信息**：从API版本26.0.0开始，增加支持在TV上申请。 |
| ohos.permission.ALLOW_EXTERNAL_NATIVE_CODE | 允许应用使用外部native程序。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：23 |
| ohos.permission.GET_IP_MAC_INFO | 允许应用获取网络设备的IP和MAC地址。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：22 |
| ohos.permission.atomicService.MANAGE_AGING | 允许元服务申请差异化的老化策略。 | **权限级别**：system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: Phone  /  PC/2in1  /  Tablet<br>**起始版本**: 23 |
| ohos.permission.ACCESS_USER_FULL_DISK | 允许应用无需弹窗访问用户公共路径。 | **权限级别**：system_basic<br>**授权方式**：手动设置授权（manual_settings）<br>**支持设备**：PC/2in1<br>**起始版本**：22 |
| ohos.permission.kernel.LOAD_INDEPENDENT_LIBRARY | 允许应用加载二进制证书签名、调试证书签名、自签名的共享库。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：20<br>**变更信息**：在API 20-21，该权限面向系统应用开放；从API 22开始，面向普通应用开放。 |
| ohos.permission.CRYPTO_EXTENSION_REGISTER | 允许应用注册和注销crypto扩展。 | **权限级别**：system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: PC/2in1  /  Tablet  /  Phone<br>**起始版本**: 22<br>**变更信息：** 从API版本24开始，增加支持在平板上申请；从API版本26.0.0开始，增加支持在手机上申请。 |
| ohos.permission.MANAGE_MEDIA_RESOURCES_FOR_PUBLIC | 允许应用获取和管理当前设备正在播放的媒体资源。 | **权限级别**：system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: Phone  /  PC/2in1  /  Tablet  /  TV  /  Car<br>**起始版本**: 23 |
| ohos.permission.MANAGE_RECENT_SNAPSHOT | 允许应用设置在多任务中和Dock栏悬停显示的预览图。 | **权限级别**: system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: PC/2in1<br>**起始版本**: 26.0.0 |
| ohos.permission.SET_WINDOW_ALPHA | 允许应用设置主窗口容器透明。 | **权限级别**: system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: PC/2in1<br>**起始版本**: 26.0.0 |
| ohos.permission.MANAGE_CALL_FOR_DEVICES | 允许应用管理通话状态。如获取来电号码、接听、拒接、挂断等。 | **权限级别**: system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: Phone  /  PC/2in1  /  Tablet<br>**起始版本**: 23 |
| ohos.permission.SET_WINDOW_TOUCH_AREAS | 允许应用设置窗口事件热区，非热区事件将被透传。 | **权限级别**: system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**: 26.0.0 |
| ohos.permission.MANAGE_BLUETOOTH_ADVERTISER_NAME | 允许应用自定义BLE广播名称。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：23 |
| ohos.permission.INPUT_DEVICE_CONFIGURATOR | 允许应用绑定输入设备与显示屏幕。 | **权限级别**: system_basic<br>**授权方式**: 系统授权（system_grant）<br>**支持设备**: PC/2in1<br>**起始版本**: 24 |
| ohos.permission.REGISTER_OBJECTEDITOR_EXTENSION | 允许应用注册ObjectEditorExtensionAbility组件。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：24 |
| ohos.permission.ALLOW_ACCESSORY_ACCESS | 允许应用使用配件接入服务完成配件关联和自动唤醒等功能。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet  /  Car<br>**起始版本**：26.0.0 |
| ohos.permission.CHECK_CALL_LOG | 允许应用根据特定条件(手机号码、通话时长)，查询指定时间内系统是否存在匹配的通话记录。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：24 |
| ohos.permission.GET_NETWORK_STATS | 允许应用查询其他应用的流量数据。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：General<br>**起始版本**：10<br>**变更信息**：API 10-11，ACL使能为false；从API 12开始，变更为true。对于API版本10-24，权限的开放范围为系统应用；从API版本26.0.0开始，开放范围变更为普通应用。 |
| ohos.permission.ACCESS_DLP_SERVICE | 允许应用或服务使用DLP提供的注册、解注册连云插件功能。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet  /  TV<br>**起始版本**：26.0.0 |
| ohos.permission.CONTROL_DEVICE | 允许应用注入输入事件以控制本设备。 | **权限级别**：system_basic<br>**授权方式**：手动设置授权（manual_settings）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.0 |
| ohos.permission.KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO | 允许应用申请特殊类型长时任务。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：24 |
| ohos.permission.FLOAT_VIEW | 允许应用使用闪控窗。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：26.0.0 |
| ohos.permission.GET_CALL_TRANSFER_INFO | 允许应用查询呼叫转移状态。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：26.0.0 |
| ohos.permission.MANAGE_SKILL | 允许应用使用skill的能力。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.0 |
| ohos.permission.kernel.AS_LDK_DRIVER | 允许应用安装PCIe驱动。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.0 |
| ohos.permission.ACCESS_GAME_BUDDY_SERVICE | 允许应用访问游戏伴随服务。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet  /  TV<br>**起始版本**：26.0.0<br>**变更信息：** 从API版本26.0.0开始，增加支持在平板、PC/2in1、TV上申请。 |
| ohos.permission.KNOCK_COLLABORATION | 允许应用通过碰一碰的形式连接指定设备并实现信息交互和应用互动。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone<br>**起始版本**：26.0.0 |
| ohos.permission.PRINTER_DRIVER | 允许应用管理打印系统。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1  /  Phone  /  Tablet<br>**起始版本**：24 |
| ohos.permission.kernel.SUPPORT_LOCAL_PLUGIN | 允许应用安装与加载自分发插件。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.0 |
| ohos.permission.MANAGE_AUDIO_ACCESSORY | 允许应用注册音频配件到系统。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  TV  /  PC/2in1  /  Tablet  /  Car<br>**起始版本**：26.0.0 |
| ohos.permission.ALLOW_USE_BM | 允许应用在开发者模式下调用BM工具。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.0 |
| ohos.permission.ACCESS_DIGITAL_IDENTITY | 允许应用使用数字身份服务导入数字凭证。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Tablet<br>**起始版本**：26.0.0 |
| ohos.permission.CAPTURE_PLAYBACK_DOWNLINK | 允许应用录制蜂窝通话下行数据。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Tablet<br>**起始版本**：26.0.0 |
| ohos.permission.MANAGE_SANDBOX_BUNDLE | 允许应用管理沙箱应用。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.0 |
| ohos.permission.DETECT_DEVICE | 允许应用调用智能检测服务获取数据。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  PC/2in1  /  Tablet<br>**起始版本**：26.0.0 |
| ohos.permission.LOCAL_DEBUG_OTHER_APPS | 允许应用在开发者模式下且本地调试时使用aa工具以调试应用。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1  /  Tablet<br>**起始版本**：26.0.1 |
| ohos.permission.ACCESS_SE_KEY | 允许应用生成、使用、删除安全芯片密钥。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Wearable  /  TV  /  PC/2in1  /  Tablet  /  Car<br>**起始版本**：26.0.0 |
| ohos.permission.DEFAULT_WEB_BROWSER | 允许应用被设置为用户的默认浏览器。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：Phone  /  Wearable  /  TV  /  PC/2in1  /  Tablet  /  Car<br>**起始版本**：26.0.1 |
| ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY | 允许应用加载二进制证书签名与调试证书签名的共享库。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.1 |
| ohos.permission.kernel.ALLOW_PTRACE_READ | 允许应用通过PTRACE读能力获取应用内进程的寄存器及内存信息。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.1 |
| ohos.permission.GET_ALL_BUNDLE_INFO | 允许应用获取设备已安装的应用列表。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.1 |
| ohos.permission.DIRECT_CALL | 允许应用一键拨号。 | **权限级别**：system_basic<br>**授权方式**：用户授权（user_grant）<br>**支持设备**：Phone<br>**起始版本**：26.0.1 |
| ohos.permission.ACCESS_BOARD_INFO | 允许应用获取设备硬件信息。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1<br>**起始版本**：26.0.1 |
| ohos.permission.SYNC_ROOT_MANAGER | 允许应用管理云盘同步文件夹。 | **权限级别**：system_basic<br>**授权方式**：系统授权（system_grant）<br>**支持设备**：PC/2in1  /  Tablet<br>**起始版本**：26.0.1 |
