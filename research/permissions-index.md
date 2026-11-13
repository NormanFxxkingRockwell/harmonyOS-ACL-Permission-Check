# 权限条目索引

核对日期：2026-11-13。来源为 sources 中五份官方 Markdown 正文。设备未注明时记为“原文未注明”，不能推定全设备。场景、例外和版本变更见各条原文。

## 开放权限（系统授权）（70条）

| 权限 | 用途 | APL | 授权 | 设备 | 起始版本 | 废弃版本 |
| --- | --- | --- | --- | --- | --- | --- |
| ohos.permission.USE_BLUETOOTH | 允许应用查看蓝牙的配置。 | normal | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.GET_BUNDLE_INFO | 允许查询应用的基本信息。 | normal | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.PREPARE_APP_TERMINATE | 允许应用关闭前执行自定义的预关闭动作。 | normal | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.PRINT | 允许应用获取打印框架的能力。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV | 10 | 原文未注明 |
| ohos.permission.DISCOVER_BLUETOOTH | 允许应用配置本地蓝牙，查找远端设备且与之配对连接。 | normal | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.ACCELEROMETER | 允许应用读取加速度传感器的数据。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable | 7 | 原文未注明 |
| ohos.permission.ACCESS_BIOMETRIC | 允许应用使用生物特征识别能力进行身份认证。 | normal | 系统授权（system_grant） | 原文未注明 | 6 | 原文未注明 |
| ohos.permission.ACCESS_NOTIFICATION_POLICY | 在本设备上允许应用访问通知策略。 | normal | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.GET_NETWORK_INFO | 允许应用获取数据网络信息。 | normal | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.SET_NETWORK_INFO | 允许应用配置数据网络。 | normal | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.GET_WIFI_INFO | 允许应用获取Wi-Fi信息和使用P2P能力。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable  /  Car | 8 | 原文未注明 |
| ohos.permission.GYROSCOPE | 允许应用读取陀螺仪传感器的数据。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable | 7 | 原文未注明 |
| ohos.permission.INTERNET | 允许使用Internet网络。 | normal | 系统授权（system_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.KEEP_BACKGROUND_RUNNING | 允许Service Ability在后台持续运行。 | normal | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.NFC_CARD_EMULATION | 允许应用实现卡模拟功能。 | normal | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.NFC_TAG | 允许应用读写Tag卡片。 | normal | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.PRIVACY_WINDOW | 允许应用将窗口设置为隐私窗口，禁止截屏录屏。 | normal | 系统授权（system_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.PUBLISH_AGENT_REMINDER | 允许该应用使用后台代理提醒。 | normal | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.SET_WIFI_INFO | 允许应用配置Wi-Fi设备。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable  /  Car | 8 | 原文未注明 |
| ohos.permission.VIBRATE | 允许应用控制马达振动。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable | 7 | 原文未注明 |
| ohos.permission.CLEAN_BACKGROUND_PROCESSES | 允许应用根据其包名来识别并清理相关的后台进程。 | normal | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.COMMONEVENT_STICKY | 允许应用发布粘性公共事件。 | normal | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.RUNNING_LOCK | 允许应用获取运行锁，保证应用在后台的持续运行。 | normal | 系统授权（system_grant） | PC/2in1  /  Tablet  /  Car  /  Phone  /  TV  /  Wearable | 7 | 原文未注明 |
| ohos.permission.ACCESS_CERT_MANAGER | 允许应用进行查询证书及私有凭据等操作。 | normal | 系统授权（system_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.RUN_DYN_CODE | 允许系统方舟运行时引擎在受限模式下执行动态下发的方舟字节码。 | normal | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.READ_CLOUD_SYNC_CONFIG | 允许接入云空间的应用查询应用云同步相关配置信息。 | normal | 系统授权（system_grant） | Phone  /  TV  /  Wearable  /  PC/2in1  /  Tablet  /  Car  /  LiteWearable  /  SmartLock | 11 | 原文未注明 |
| ohos.permission.STORE_PERSISTENT_DATA | 允许应用存储持久化的数据，该数据直到设备恢复出厂设置或重装系统才会被清除。 | normal | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER | 允许应用使用外接设备增强功能。 | normal | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.READ_ACCOUNT_LOGIN_STATE | 允许应用读取用户账号的登录状态。 | normal | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO | 允许应用访问导航信息服务。 | normal | 系统授权（system_grant） | Phone  /  Tablet  /  Car | 12 | 原文未注明 |
| ohos.permission.PROTECT_SCREEN_LOCK_DATA | 允许应用在锁屏后保护本应用敏感数据不被访问。 | normal | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.ACCESS_CAR_DISTRIBUTED_ENGINE | 允许应用访问出行分布式业务引擎。 | normal | 系统授权（system_grant） | Phone  /  Tablet  /  Car | 12 | 原文未注明 |
| ohos.permission.WINDOW_TOPMOST | 允许应用将窗口设置为应用置顶窗口。 | normal | 系统授权（system_grant） | PC/2in1 | 13 | 原文未注明 |
| ohos.permission.MANAGE_INPUT_INFRARED_EMITTER | 允许应用使用红外接口。 | normal | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.INPUT_KEYBOARD_CONTROLLER | 允许应用设置键盘功能键状态。 | normal | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.SET_ABILITY_INSTANCE_INFO | 允许应用单独配置每个Ability的图标和标签信息。 | normal | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.NDK_START_SELF_UI_ABILITY | 允许应用通过C API启动同应用的UIAbility。 | normal | 系统授权（system_grant） | PC/2in1  /  Tablet  /  Phone | 15 | 原文未注明 |
| ohos.permission.GET_FILE_ICON | 允许应用获取指定类型文件的文件图标。 | normal | 系统授权（system_grant） | 原文未注明 | 17 | 原文未注明 |
| ohos.permission.DETECT_GESTURE | 允许应用感知手势操作。 | normal | 系统授权（system_grant） | General | 20 | 原文未注明 |
| ohos.permission.kernel.NET_RAW | 允许应用抓取网络数据包。 | normal | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.kernel.DEBUGGER | 允许应用获取调试能力。 | normal | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.kernel.ALLOW_DEBUG | 允许C/C++程序被调试。 | normal | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.BACKGROUND_MANAGER_POWER_SAVE_MODE | 允许应用设置自身进程的省电模式。 | normal | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.SET_WINDOW_TRANSPARENT | 允许应用设置主窗容器透明和去除主窗外边框阴影。 | normal | 系统授权（system_grant） | PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.START_WINDOW_BELOW_LOCK_SCREEN | 允许应用在锁屏状态下被启动。 | normal | 系统授权（system_grant） | PC/2in1 | 21 | 原文未注明 |
| ohos.permission.kernel.IGNORE_LIBRARY_VALIDATION | 允许独立二进制程序加载具有不同ownerid的独立二进制SO。 | normal | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.TIMEOUT_SCREENOFF_DISABLE_LOCK | 允许应用使能超时息屏不锁屏功能。 | normal | 系统授权（system_grant） | PC/2in1 | 22 | 原文未注明 |
| ohos.permission.LOCK_WINDOW_CURSOR | 允许应用在窗口获焦时锁定鼠标光标。 | normal | 系统授权（system_grant） | General | 22 | 原文未注明 |
| ohos.permission.CUSTOMIZE_MENU_ICON | 允许应用在"文件管理"的右键菜单中配置自定义图标。 | normal | 系统授权（system_grant） | PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.kernel.EXEMPT_ANONYMOUS_EXECUTABLE_MEMORY | 允许声明匿名可执行内存。 | normal | 系统授权（system_grant） | PC/2in1 | 23 | 原文未注明 |
| ohos.permission.INHERIT_PARENT_PERMISSION | 允许子进程继承父进程的权限。 | normal | 系统授权（system_grant） | PC/2in1 | 23 | 原文未注明 |
| ohos.permission.GET_DONOTDISTURB_STATE | 允许应用获取系统的免打扰状态。 | normal | 系统授权（system_grant） | Phone  /  Tablet | 23 | 原文未注明 |
| ohos.permission.ALLOW_COREDUMP | 允许系统将应用进程的内存转储到应用沙箱。 | normal | 系统授权（system_grant） | 2in1 | 23 | 原文未注明 |
| ohos.permission.HDR_BRIGHTNESS | 允许应用使用HDR提亮能力。 | normal | 系统授权（system_grant） | General | 24 | 原文未注明 |
| ohos.permission.CONNECT_OBJECTEDITOR_EXTENSION | 允许应用查询ObjectEditorExtensionAbility信息和拉起ObjectEditorExtensionAbility组件。 | normal | 系统授权（system_grant） | PC/2in1  /  Phone  /  Tablet | 24 | 原文未注明 |
| ohos.permission.QUERY_VOLUME_ENCRYPTION_STATUS | 允许应用查询卷加解密状态。 | normal | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.STYLUS_FRAME_BOOST | 允许应用使用手写笔跟手性的增强接口。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.QUERY_PUBLIC_CLI_TOOL | 允许应用查询可用的CLI工具。 | normal | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.EXEC_PUBLIC_CLI_TOOL | 允许应用执行可用的CLI工具。 | normal | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.GET_ENTERPRISE_CONFIG | 允许应用获取行业定制配置文件。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ACCESS_CAR_AUDIO | 允许应用访问和管理车载音频。 | normal | 系统授权（system_grant） | Car | 26.0.0 | 原文未注明 |
| ohos.permission.DCAS_RUN_MODEL | 允许应用和服务接入端侧模型运行态管理。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.REQUEST_LOCAL_ACCOUNT_AUTHORIZATION | 允许应用获取本地账号授权。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  Car  /  TV  /  Wearable | 26.0.1 | 原文未注明 |
| ohos.permission.vehicle.ACCESS_CAR_SECURITY_PRIVACY | 允许应用访问车载安全隐私服务的接口。 | normal | 系统授权（system_grant） | Car | 26.0.1 | 原文未注明 |
| ohos.permission.vehicle.HIMA_DATA_READ | 允许应用读取HIMA云数据。 | normal | 系统授权（system_grant） | Car | 26.0.1 | 原文未注明 |
| ohos.permission.vehicle.HIMA_DATA_WRITE | 允许应用将数据写入HIMA云。 | normal | 系统授权（system_grant） | Car | 26.0.1 | 原文未注明 |
| ohos.permission.kernel.USB_CAPTURE | 允许应用抓取USB数据包。 | normal | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.ACCESS_USER_PASSIVE_RECOGNITION | 允许应用识别当前使用者是否为用户本人。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  Car | 26.0.1 | 原文未注明 |
| ohos.permission.UPDATE_SCOPE_FONT | 允许应用管理应用级和会话级字体。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.1 | 原文未注明 |
| ohos.permission.GET_STORAGE_VOLUME_INFO | 允许应用查询存储设备基础属性信息。 | normal | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  Car  /  TV | 26.0.1 | 原文未注明 |

## 开放权限（用户授权）（19条）

| 权限 | 用途 | APL | 授权 | 设备 | 起始版本 | 废弃版本 |
| --- | --- | --- | --- | --- | --- | --- |
| ohos.permission.ACCESS_BLUETOOTH | 允许应用接入蓝牙并使用蓝牙功能。 | normal | 用户授权（user_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.MEDIA_LOCATION | 允许应用访问用户媒体文件中的地理位置信息。 | normal | 用户授权（user_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.APP_TRACKING_CONSENT | 允许应用读取开放匿名设备标识符。 | normal | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.ACTIVITY_MOTION | 允许应用读取用户的运动状态。 | normal | 用户授权（user_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable | 7 | 原文未注明 |
| ohos.permission.CAMERA | 允许应用使用相机。 | normal | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.DISTRIBUTED_DATASYNC | 允许不同设备间的数据交换。 | normal | 用户授权（user_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.LOCATION_IN_BACKGROUND | 允许应用在后台运行时获取设备位置信息。 | normal | 用户授权（user_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.LOCATION | 允许应用获取设备位置信息。 | normal | 用户授权（user_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.APPROXIMATELY_LOCATION | 允许应用获取设备模糊位置信息。 | normal | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.MICROPHONE | 允许应用使用麦克风。 | normal | 用户授权（user_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.READ_CALENDAR | 允许应用读取日历信息。 | normal | 用户授权（user_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.WRITE_CALENDAR | 允许应用添加、移除或更改日历活动。 | normal | 用户授权（user_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.READ_HEALTH_DATA | 允许应用读取用户的健康数据，如心率数据等。 | normal | 用户授权（user_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable | 7 | 原文未注明 |
| ohos.permission.ACCESS_NEARLINK | 允许应用接入星闪并使用星闪能力，例如配对、连接外围设备等。 | normal | 用户授权（user_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY | 允许应用访问公共目录下Download目录及子目录。 | normal | 用户授权（user_grant） | PC/2in1  /  Tablet | 11 | 原文未注明 |
| ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY | 允许应用访问公共目录下的Documents目录及子目录。 | normal | 用户授权（user_grant） | PC/2in1  /  Tablet | 11 | 原文未注明 |
| ohos.permission.CUSTOM_SCREEN_CAPTURE | 允许应用获取屏幕图像。 | normal | 用户授权（user_grant） | PC/2in1  /  Tablet  /  Phone | 14 | 原文未注明 |
| ohos.permission.READ_MEDIA | 允许应用读取用户外部存储中的媒体文件信息。 | normal | 用户授权（user_grant） | 原文未注明 | 7 | 22 |
| ohos.permission.WRITE_MEDIA | 允许应用读写用户外部存储中的媒体文件信息。 | normal | 用户授权（user_grant） | 原文未注明 | 7 | 22 |

## 受限开放权限（105条）

| 权限 | 用途 | APL | 授权 | 设备 | 起始版本 | 废弃版本 |
| --- | --- | --- | --- | --- | --- | --- |
| ohos.permission.SYSTEM_FLOAT_WINDOW | 允许应用使用悬浮窗的能力。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.READ_CONTACTS | 允许应用读取联系人数据。 | system_basic | 用户授权（user_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.WRITE_CONTACTS | 允许应用添加、移除或更改联系人数据。 | system_basic | 用户授权（user_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.READ_AUDIO | 允许读取用户公共目录的音频文件。 | system_basic | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.WRITE_AUDIO | 允许修改用户公共目录的音频文件。 | system_basic | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.READ_IMAGEVIDEO | 允许读取用户本地公共目录的图片或视频文件。 | system_basic | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.WRITE_IMAGEVIDEO | 允许修改用户公共目录的图片或视频文件。 | system_basic | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.READ_WRITE_DESKTOP_DIRECTORY | 允许应用访问公共目录下Desktop目录及子目录。 | system_basic | 用户授权（user_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ACCESS_DDK_USB | 允许扩展外设驱动访问USB DDK接口开发USB总线扩展外设驱动。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ACCESS_DDK_HID | 允许扩展外设驱动访问HID DDK接口开发HID类扩展外设驱动。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.READ_PASTEBOARD | 允许应用读取剪贴板。 | system_basic | 用户授权（user_grant） | Phone  /  TV  /  Wearable  /  PC/2in1  /  Tablet  /  Car | 11 | 原文未注明 |
| ohos.permission.FILE_ACCESS_PERSIST | 允许应用支持持久化访问文件Uri。 | normal | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.INTERCEPT_INPUT_EVENT | 允许应用拦截输入事件。 | system_basic | 系统授权（system_grant） | General | 11 | 原文未注明 |
| ohos.permission.INPUT_MONITORING | 允许应用监听输入事件。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO | 允许应用保存图片、视频到用户公共目录。 | system_basic | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.READ_WRITE_USER_FILE | 允许应用访问并修改用户目录下的文件。 | system_basic | 系统授权（system_grant） | 原文未注明 | 13 | 原文未注明 |
| ohos.permission.READ_WRITE_USB_DEV | 允许应用连接设备，并通过USB调试读写该设备。 | system_basic | 系统授权（system_grant） | 原文未注明 | 13 | 原文未注明 |
| ohos.permission.GET_WIFI_PEERS_MAC | 允许应用获取对端Wi-Fi设备的MAC地址。 | system_basic | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.SET_TELEPHONY_ESIM_STATE_OPEN | 允许运营商应用添加eSIM配置文件。 | system_basic | 系统授权（system_grant） | 原文未注明 | 13 | 原文未注明 |
| ohos.permission.kernel.DISABLE_CODE_MEMORY_PROTECTION | 允许应用禁用本应用的代码运行时完整性保护。 | system_basic | 系统授权（system_grant） | 原文未注明 | 14 | 原文未注明 |
| ohos.permission.kernel.ALLOW_WRITABLE_CODE_MEMORY | 允许应用申请可写可执行匿名内存，该能力主要用于为应用自带引擎（如 JS 引擎、游戏脚本引擎等）提供即时编译（JIT）能力，提升代码执行效率。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Tablet | 14 | 原文未注明 |
| ohos.permission.kernel.ALLOW_EXECUTABLE_FORT_MEMORY | 允许系统JS引擎申请带MAP_FORT标识的匿名可执行内存。 | system_basic | 系统授权（system_grant） | 原文未注明 | 14 | 原文未注明 |
| ohos.permission.MANAGE_PASTEBOARD_APP_SHARE_OPTION | 允许应用设置或移除剪贴板数据的可粘贴范围。 | system_basic | 系统授权（system_grant） | Phone  /  TV  /  Wearable  /  PC/2in1  /  Tablet  /  Car | 14 | 原文未注明 |
| ohos.permission.MANAGE_UDMF_APP_SHARE_OPTION | 允许应用设置或移除其使用UDMF支持的数据分享范围。 | system_basic | 系统授权（system_grant） | 原文未注明 | 14 | 原文未注明 |
| ohos.permission.ACCESS_DISK_PHY_INFO | 允许应用获取硬盘的硬件信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.PRELOAD_FILE | 允许应用预加载文件以提升文件打开速度。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Tablet | 15 | 原文未注明 |
| ohos.permission.SET_PAC_URL | 允许应用设置代理自动配置脚本地址。 | system_basic | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.PERSONAL_MANAGE_RESTRICTIONS | 允许设备管理应用管理个人设备限制策略。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 15 | 原文未注明 |
| ohos.permission.START_PROVISIONING_MESSAGE | 允许应用启动设备管理业务部署流程，将该应用激活为个人设备管理应用。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 15 | 原文未注明 |
| ohos.permission.USE_FRAUD_CALL_LOG_PICKER | 允许应用使用诈骗通话记录选择器，获取通话记录内容。 | system_basic | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.USE_FRAUD_MESSAGES_PICKER | 允许应用使用诈骗短信选择器，获取短信内容。 | system_basic | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.PERSISTENT_BLUETOOTH_PEERS_MAC | 允许应用固化对端蓝牙设备MAC对应的虚拟地址。 | system_basic | 系统授权（system_grant） | 原文未注明 | 16 | 原文未注明 |
| ohos.permission.ACCESS_VIRTUAL_SCREEN | 允许应用管控虚拟屏。 | system_basic | 系统授权（system_grant） | 原文未注明 | 16 | 原文未注明 |
| ohos.permission.MANAGE_APN_SETTING | 允许应用读取或设置APN信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 16 | 原文未注明 |
| ohos.permission.GET_WIFI_LOCAL_MAC | 允许应用获取本机的Wi-Fi设备的MAC地址。 | system_basic | 系统授权（system_grant） | 原文未注明 | 8 | 原文未注明 |
| ohos.permission.kernel.ALLOW_USE_JITFORT_INTERFACE | 允许应用调用JITFort接口更新MAP_FORT内存的内容。 | system_basic | 系统授权（system_grant） | 原文未注明 | 16 | 原文未注明 |
| ohos.permission.GET_ETHERNET_LOCAL_MAC | 允许应用查询以太网当前MAC地址。 | system_basic | 系统授权（system_grant） | 原文未注明 | 13 | 原文未注明 |
| ohos.permission.kernel.DISABLE_GOTPLT_RO_PROTECTION | 允许应用关闭进程内.got.plt段的只读保护。 | system_basic | 系统授权（system_grant） | 原文未注明 | 17 | 原文未注明 |
| ohos.permission.USE_FRAUD_APP_PICKER | 允许应用使用诈骗应用选择器，获取应用信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.ACCESS_DDK_DRIVERS | 允许扩展外设驱动客户端绑定到扩展外设驱动服务端。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.ACCESS_DDK_SCSI_PERIPHERAL | 允许扩展外设驱动访问SCSI DDK接口开发SCSI Peripheral扩展外设驱动。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.ACCESS_DDK_USB_SERIAL | 允许扩展外设驱动访问USBSerial DDK接口开发USB Serial扩展外设驱动。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Tablet | 18 | 原文未注明 |
| ohos.permission.CUSTOM_SANDBOX | 允许应用将沙箱类型改为动态沙箱。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.atomicService.MANAGE_STORAGE | 允许元服务小游戏进行存储空间大小的管理。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.MANAGE_SCREEN_TIME_GUARD | 允许应用调用屏幕时间守护相关接口，进行屏幕使用限制、应用访问控制、管控使用时间等操作。 | system_basic | 系统授权（system_grant） | Phone  /  Tablet | 20 | 原文未注明 |
| ohos.permission.CUSTOMIZE_SAVE_BUTTON | 允许应用自定义保存控件的图标和文本。 | system_basic | 系统授权（system_grant） | General | 20 | 原文未注明 |
| ohos.permission.GET_ABILITY_INFO | 允许应用根据URI或者FileType查询Ability信息。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ACCESS_FIDO2_ONLINEAUTH | 允许应用使用通行密钥服务的NDK。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.USE_FLOAT_BALL | 允许应用使用闪控球的能力。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.AUTO_RESTORE_MAIN_WINDOW | 允许应用使用闪控球的自动恢复到应用主窗口的能力。 | system_basic | 系统授权（system_grant） | Phone  /  Tablet | 24 | 原文未注明 |
| ohos.permission.DLP_GET_HIDE_STATUS | 允许应用使用信息隐藏接口，获取信息隐藏状态的能力。 | system_basic | 系统授权（system_grant） | Phone | 18 | 原文未注明 |
| ohos.permission.READ_LOCAL_DEVICE_NAME | 允许应用获取本机的设备显示名。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.KEEP_BACKGROUND_RUNNING_SYSTEM | 允许应用申请特殊类型长时任务，如在手机上申请计算任务类型的长时任务。 | system_basic | 系统授权（system_grant） | General | 20 | 原文未注明 |
| ohos.permission.LINKTURBO | 允许应用使用多网并发等网络加速能力。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ACCESS_NET_TRACE_INFO | 允许应用使用网络探测和获取TraceRoute信息的维测能力，用于检测网络时延较大的可能故障原因。 | system_basic | 系统授权（system_grant） | General | 20 | 原文未注明 |
| ohos.permission.READ_WHOLE_CALENDAR | 允许应用读取所有的日历信息。 | system_basic | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.WRITE_WHOLE_CALENDAR | 允许应用添加、移除或更改所有的日历活动。 | system_basic | 用户授权（user_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.SET_SYSTEMSHARE_APPLAUNCHTRUSTLIST | 允许应用配置系统分享的目标应用名单。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV | 21 | 原文未注明 |
| ohos.permission.HOOK_KEY_EVENT | 允许应用拦截键盘输入事件。 | system_basic | 手动设置授权（manual_settings） | PC/2in1  /  Tablet | 21 | 原文未注明 |
| ohos.permission.WEB_NATIVE_MESSAGING | 允许应用使用Web本地通信能力。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 21 | 原文未注明 |
| ohos.permission.SUBSCRIBE_NOTIFICATION | 允许应用读取系统或者已安装应用发布的通知。 | system_basic | 系统授权（system_grant） | Phone  /  Tablet | 22 | 原文未注明 |
| ohos.permission.CUSTOM_SCREEN_RECORDING | 允许应用无需弹窗录制屏幕。 | system_basic | 手动设置授权（manual_settings） | PC/2in1  /  TV | 22 | 原文未注明 |
| ohos.permission.ALLOW_EXTERNAL_NATIVE_CODE | 允许应用使用外部native程序。 | system_basic | 系统授权（system_grant） | PC/2in1 | 23 | 原文未注明 |
| ohos.permission.GET_IP_MAC_INFO | 允许应用获取网络设备的IP和MAC地址。 | system_basic | 系统授权（system_grant） | General | 22 | 原文未注明 |
| ohos.permission.atomicService.MANAGE_AGING | 允许元服务申请差异化的老化策略。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.ACCESS_USER_FULL_DISK | 允许应用无需弹窗访问用户公共路径。 | system_basic | 手动设置授权（manual_settings） | PC/2in1 | 22 | 原文未注明 |
| ohos.permission.kernel.LOAD_INDEPENDENT_LIBRARY | 允许应用加载二进制证书签名、调试证书签名、自签名的共享库。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.CRYPTO_EXTENSION_REGISTER | 允许应用注册和注销crypto扩展。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Tablet  /  Phone | 22 | 原文未注明 |
| ohos.permission.MANAGE_MEDIA_RESOURCES_FOR_PUBLIC | 允许应用获取和管理当前设备正在播放的媒体资源。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Car | 23 | 原文未注明 |
| ohos.permission.MANAGE_RECENT_SNAPSHOT | 允许应用设置在多任务中和Dock栏悬停显示的预览图。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.SET_WINDOW_ALPHA | 允许应用设置主窗口容器透明。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.MANAGE_CALL_FOR_DEVICES | 允许应用管理通话状态。如获取来电号码、接听、拒接、挂断等。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.SET_WINDOW_TOUCH_AREAS | 允许应用设置窗口事件热区，非热区事件将被透传。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.MANAGE_BLUETOOTH_ADVERTISER_NAME | 允许应用自定义BLE广播名称。 | system_basic | 系统授权（system_grant） | General | 23 | 原文未注明 |
| ohos.permission.INPUT_DEVICE_CONFIGURATOR | 允许应用绑定输入设备与显示屏幕。 | system_basic | 系统授权（system_grant） | PC/2in1 | 24 | 原文未注明 |
| ohos.permission.REGISTER_OBJECTEDITOR_EXTENSION | 允许应用注册ObjectEditorExtensionAbility组件。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 24 | 原文未注明 |
| ohos.permission.ALLOW_ACCESSORY_ACCESS | 允许应用使用配件接入服务完成配件关联和自动唤醒等功能。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  Car | 26.0.0 | 原文未注明 |
| ohos.permission.CHECK_CALL_LOG | 允许应用根据特定条件(手机号码、通话时长)，查询指定时间内系统是否存在匹配的通话记录。 | system_basic | 系统授权（system_grant） | General | 24 | 原文未注明 |
| ohos.permission.GET_NETWORK_STATS | 允许应用查询其他应用的流量数据。 | system_basic | 系统授权（system_grant） | General | 10 | 原文未注明 |
| ohos.permission.ACCESS_DLP_SERVICE | 允许应用或服务使用DLP提供的注册、解注册连云插件功能。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV | 26.0.0 | 原文未注明 |
| ohos.permission.CONTROL_DEVICE | 允许应用注入输入事件以控制本设备。 | system_basic | 手动设置授权（manual_settings） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.KEEP_BACKGROUND_RUNNING_SPECIAL_SCENARIO | 允许应用申请特殊类型长时任务。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 24 | 原文未注明 |
| ohos.permission.FLOAT_VIEW | 允许应用使用闪控窗。 | system_basic | 用户授权（user_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.GET_CALL_TRANSFER_INFO | 允许应用查询呼叫转移状态。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.MANAGE_SKILL | 允许应用使用skill的能力。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.kernel.AS_LDK_DRIVER | 允许应用安装PCIe驱动。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.ACCESS_GAME_BUDDY_SERVICE | 允许应用访问游戏伴随服务。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV | 26.0.0 | 原文未注明 |
| ohos.permission.KNOCK_COLLABORATION | 允许应用通过碰一碰的形式连接指定设备并实现信息交互和应用互动。 | system_basic | 系统授权（system_grant） | Phone | 26.0.0 | 原文未注明 |
| ohos.permission.PRINTER_DRIVER | 允许应用管理打印系统。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Phone  /  Tablet | 24 | 原文未注明 |
| ohos.permission.kernel.SUPPORT_LOCAL_PLUGIN | 允许应用安装与加载自分发插件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.MANAGE_AUDIO_ACCESSORY | 允许应用注册音频配件到系统。 | system_basic | 系统授权（system_grant） | Phone  /  TV  /  PC/2in1  /  Tablet  /  Car | 26.0.0 | 原文未注明 |
| ohos.permission.ALLOW_USE_BM | 允许应用在开发者模式下调用BM工具。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.ACCESS_DIGITAL_IDENTITY | 允许应用使用数字身份服务导入数字凭证。 | system_basic | 系统授权（system_grant） | Phone  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.CAPTURE_PLAYBACK_DOWNLINK | 允许应用录制蜂窝通话下行数据。 | system_basic | 系统授权（system_grant） | Phone  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.MANAGE_SANDBOX_BUNDLE | 允许应用管理沙箱应用。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.DETECT_DEVICE | 允许应用调用智能检测服务获取数据。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.LOCAL_DEBUG_OTHER_APPS | 允许应用在开发者模式下且本地调试时使用aa工具以调试应用。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Tablet | 26.0.1 | 原文未注明 |
| ohos.permission.ACCESS_SE_KEY | 允许应用生成、使用、删除安全芯片密钥。 | system_basic | 系统授权（system_grant） | Phone  /  Wearable  /  TV  /  PC/2in1  /  Tablet  /  Car | 26.0.0 | 原文未注明 |
| ohos.permission.DEFAULT_WEB_BROWSER | 允许应用被设置为用户的默认浏览器。 | system_basic | 系统授权（system_grant） | Phone  /  Wearable  /  TV  /  PC/2in1  /  Tablet  /  Car | 26.0.1 | 原文未注明 |
| ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY | 允许应用加载二进制证书签名与调试证书签名的共享库。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.kernel.ALLOW_PTRACE_READ | 允许应用通过PTRACE读能力获取应用内进程的寄存器及内存信息。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.GET_ALL_BUNDLE_INFO | 允许应用获取设备已安装的应用列表。 | system_basic | 用户授权（user_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.DIRECT_CALL | 允许应用一键拨号。 | system_basic | 用户授权（user_grant） | Phone | 26.0.1 | 原文未注明 |
| ohos.permission.ACCESS_BOARD_INFO | 允许应用获取设备硬件信息。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.SYNC_ROOT_MANAGER | 允许应用管理云盘同步文件夹。 | system_basic | 系统授权（system_grant） | PC/2in1  /  Tablet | 26.0.1 | 原文未注明 |

## 企业类应用可用权限（42条）

| 权限 | 用途 | APL | 授权 | 设备 | 起始版本 | 废弃版本 |
| --- | --- | --- | --- | --- | --- | --- |
| ohos.permission.SET_FILE_GUARD_POLICY | 允许应用下发文件管控策略。 | system_basic | 系统授权（system_grant） | PC/2in1 | 10 | 原文未注明 |
| ohos.permission.FILE_GUARD_MANAGER | 允许应用进行公共目录扫描及设置文件扩展属性。 | system_basic | 系统授权（system_grant） | PC/2in1 | 10 | 原文未注明 |
| ohos.permission.FILE_GUARD_FILE_WRITE | 允许企业应用修改文件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS | 允许应用跨系统本地账号交互。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.GET_LOCAL_ACCOUNT_IDENTIFIERS | 允许应用查询指定或所有本地账号的身份标识（如名称、ID）。 | system_basic | 系统授权（system_grant） | General | 26.0.0 | 原文未注明 |
| ohos.permission.GET_RUNNING_INFO | 允许应用获取运行态信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.RUNNING_STATE_OBSERVER | 允许应用监听应用状态。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.GET_BUNDLE_INFO_PRIVILEGED | 允许查询应用的基本信息和其他敏感信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.GET_WIFI_CONFIG | 允许应用获取Wi-Fi的配置信息。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable  /  Car | 8 | 原文未注明 |
| ohos.permission.SET_WIFI_CONFIG | 允许应用配置Wi-Fi信息。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet  /  TV  /  Wearable  /  Car | 8 | 原文未注明 |
| ohos.permission.GET_DOMAIN_ACCOUNTS | 允许应用查询域账号信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.QUERY_AUDIT_EVENT | 允许企业安全类应用查询安全审计事件。 | system_basic | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.KILL_APP_PROCESSES | 允许系统应用结束其他应用进程。 | system_basic | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION | 允许应用管理Wi-Fi的连接。 | system_basic | 系统授权（system_grant） | 原文未注明 | 15 | 原文未注明 |
| ohos.permission.ACCESS_ENTERPRISE_USER_TRUSTED_CERT | 允许应用管理企业设备的用户CA证书。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.MANAGE_NET_FIREWALL | 允许系统应用配置防火墙规则。 | system_basic | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.GET_NET_FIREWALL | 允许系统应用查询防火墙规则和查询防火墙拦截记录。 | system_basic | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.GET_DOMAIN_ACCOUNT_SERVER_CONFIGS | 允许应用获取域账号服务器配置。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.MANAGE_DOMAIN_ACCOUNT_SERVER_CONFIGS | 允许应用管理域账号服务器配置。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.MANAGE_DOMAIN_ACCOUNTS | 允许应用管理域账号。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.GET_SIGNATURE_INFO | 允许应用获取应用包的签名信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.VISIBLE_WINDOW_INFO | 允许应用获取当前屏幕的可见窗口信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 18 | 原文未注明 |
| ohos.permission.kernel.AUTH_AUDIT_EVENT | 允许企业安全应用阻断安全审计事件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.SUPPORT_APP_SERVICE_EXTENSION | 允许应用作为AppServiceExtension被拉起。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_EAP | 允许企业网络安全软件在EAP报文中新增私有信息。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.SUPPORT_INSTALL_ON_U1 | 允许企业普通应用安装在特定用户下。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.QUERY_LOCAL_WORKSPACES | 允许企业普通应用查询工作空间和不允许删除的空间列表。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.SET_NET_EXT_ATTRIBUTE | 允许应用设置网络扩展属性。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.MANAGE_ANTIVIRUS | 允许企业应用管理防病毒软件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.REGISTER_ANTIVIRUS | 允许企业防病毒软件向系统注册、更新基本信息。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.CALL_TPM_CMD | 允许应用调用TPM（Trusted Platform Module）命令。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_WORKSPACES_EVENT_SUBSCRIBE | 允许企业应用订阅企业数字空间相关事件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.SCAN_REMEDIATE_VIRUS | 允许应用执行病毒扫描和处置操作。 | system_basic | 系统授权（system_grant） | PC/2in1 | 24 | 原文未注明 |
| ohos.permission.sec.ACCESS_UDID | 允许应用获取UDID。 | system_basic | 系统授权（system_grant） | 原文未注明 | 7 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_PRINT | 允许企业应用调用打印管理接口。 | system_basic | 系统授权（system_grant） | PC/2in1 | 24 | 原文未注明 |
| ohos.permission.DLP_POLICY_MANAGER | 允许企业普通应用通过数据防泄露能力管理透明加解密策略。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.SUPPORT_CROSS_APP_EMBED_FOR_OA | 允许应用跨应用拉起EmbeddedUIExtension。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.SUPPORT_NP_PLUGIN_FOR_WEB | 允许应用释放插件库。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY_FOR_WEB | 允许应用加载二进制证书签名的插件库。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.ENTERPRISE_GET_INSTALLED_BUNDLE_LIST | 允许企业普通应用获取已安装全量应用列表。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.kernel.TRAFFIC_FILTER | 允许应用在网络流量路径内检查数据包并决定是否放行，以及将网络流量重定向到本地端口。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_BACKUP | 允许应用使用备份还原能力。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |

## 仅MDM应用可用权限（56条）

| 权限 | 用途 | APL | 授权 | 设备 | 起始版本 | 废弃版本 |
| --- | --- | --- | --- | --- | --- | --- |
| ohos.permission.ENTERPRISE_GET_DEVICE_INFO | 允许设备管理应用获取设备信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_GET_NETWORK_INFO | 允许设备管理应用查询网络信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_INSTALL_BUNDLE | 允许设备管理应用安装和卸载包。 | system_core | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY | 允许设备管理应用设置应用运行管理策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_RESET_DEVICE | 允许设备管理应用恢复设备出厂设置。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY | 允许设备管理应用设置账户管理策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY | 允许设备管理应用设置包安装管理策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_DATETIME | 允许设备管理应用设置系统时间。 | system_basic | 系统授权（system_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_NETWORK | 允许设备管理应用设置网络信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_WIFI | 允许设备管理应用设置和查询WiFi信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT | 允许设备管理应用订阅管理事件。 | system_basic | 系统授权（system_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.ENTERPRISE_RESTRICT_POLICY | 允许设备管理员下发和获取限制类策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME | 允许设备管理员设置系统休眠时间。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_USB | 允许设备管理员管理USB。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_NETWORK | 允许设备管理员管理网络。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE | 允许设备管理员管理证书。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_GET_SETTINGS | 允许设备管理员查询"设置"应用数据。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_BROWSER_POLICY | 允许设备设置/取消浏览器策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 10 | 原文未注明 |
| ohos.permission.SET_ENTERPRISE_INFO | 允许设备管理应用设置企业信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 9 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_SECURITY | 允许设备设置安全管理策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH | 允许设备管理应用设置和查询蓝牙信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_SYSTEM | 允许设备管理系统设置参数策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_WIFI | 允许设备管理应用设置和查询WIFI信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS | 允许设备管理应用管理限制策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_APPLICATION | 允许设备管理应用管理应用策略。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_LOCATION | 允许设备管理应用设置和查询位置信息。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_REBOOT | 允许设备管理应用进行关机重启操作。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_LOCK_DEVICE | 允许设备管理应用锁定设备。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_SETTINGS | 允许设备管理应用管理设置。 | system_basic | 系统授权（system_grant） | 原文未注明 | 11 | 原文未注明 |
| ohos.permission.ENTERPRISE_OPERATE_DEVICE | 允许设备管理应用操作设备。 | system_basic | 系统授权（system_grant） | 原文未注明 | 12 | 原文未注明 |
| ohos.permission.ENTERPRISE_ADMIN_MANAGE | 允许应用管理设备管理应用。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 12 | 原文未注明 |
| ohos.permission.ENTERPRISE_RECOVERY_KEY | 允许设备管理应用管理企业级恢复密钥。 | system_core | 系统授权（system_grant） | 原文未注明 | 13 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY | 允许设备管理应用委托其他应用设置设备管控策略。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 14 | 原文未注明 |
| ohos.permission.ENTERPRISE_GET_ALL_BUNDLE_INFO | 允许设备管理应用获取设备所有应用信息。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_USER_RESTRICTION | 允许设备管理应用限制用户修改系统设置。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_APN | 允许设备管理应用管理设备APN策略。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_TELEPHONY | 允许设备管理应用管理设备通话策略。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_KIOSK | 允许设备管理应用设置Kiosk模式。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES | 允许企业应用启用、创建、删除工作空间。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT | 允许设备管理应用管理文件传输的策略和审计信息。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_SET_WALLPAPER | 允许设备管理应用设置壁纸。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS | 允许设备管理应用管理系统预装的防病毒软件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION | 允许设备管理应用设置user_grant类权限策略。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE | 允许设备管理应用识别文件敏感内容。 | system_core | 系统授权（system_grant） | PC/2in1 | 21 | 原文未注明 |
| ohos.permission.ENTERPRISE_ACCESS_DLP_FILE | 允许设备管理应用生成、解密DLP文件，查询DLP文件策略。 | system_core | 系统授权（system_grant） | PC/2in1 | 20 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN | 允许应用管理其他设备管理应用。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.ENTERPRISE_START_ABILITIES | 允许设备管理应用访问其他组件。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.ENTERPRISE_READ_LOG | 允许设备管理应用收集系统日志。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN | 允许已激活的设备管理应用解除自身的激活状态。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 23 | 原文未注明 |
| ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN | 允许企业设备管理应用自行完成激活操作。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 24 | 原文未注明 |
| ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS | 允许企业设备管理应用管理本地账号。 | system_basic | 系统授权（system_grant） | Phone  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS | 允许企业设备管理应用进行多用户操作。 | system_core | 系统授权（system_grant） | Phone  /  Tablet | 26.0.0 | 原文未注明 |
| ohos.permission.ENTERPRISE_VPN | 允许设备管理应用默认拥有VPN接入权限。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.0 | 原文未注明 |
| ohos.permission.ENTERPRISE_REQUEST_PUBLISH_FORM | 允许设备管理应用在桌面添加卡片。 | system_basic | 系统授权（system_grant） | Phone  /  PC/2in1  /  Tablet | 26.0.1 | 原文未注明 |
| ohos.permission.ENTERPRISE_EXTERNAL_READ | 允许设备管理应用在OOBE阶段拷贝U盘大文件。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |
| ohos.permission.ENTERPRISE_ENCRYPT_BLOCK_DEVICE | 允许MDM应用挂载和卸载加密U盘加密区与交换区。 | system_basic | 系统授权（system_grant） | PC/2in1 | 26.0.1 | 原文未注明 |

