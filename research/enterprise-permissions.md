# 企业普通应用与 MDM 权限核对笔记

核对日期：2026-11-13。范围为官网当前未固定版本的应用权限列表；不是特定系统/设备实测。

## 来源与覆盖

- https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-enterprise-apps.md ：42 条，已逐节阅读。
- https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/permissions-for-mdm-apps.md ：56 条，已逐节阅读。
- Markdown 原文已下载到 research/sources/。HTML 搜索缓存部分停留在 26.0.0，实时 Markdown 含 26.0.1，因此条目数以下载正文为准。
- 企业证书：https://developer.huawei.com/consumer/cn/doc/app/agc-help-enterprise-cert-0000002248177978
- 分类与签名 FAQ：https://developer.huawei.com/consumer/cn/doc/doccenter-dev-faq/faqs-appgallery-78/

## 关键边界

- 企业普通应用不能因为公司内部使用就自动获得企业权限；要有对应企业分发类型、证书与 Profile。普通消费者分发与企业分发有不同适用范围。
- 企业普通应用页目前强调鸿蒙电脑专业版/企业版擎云系列；MDM 页强调企业场景，设备被 HEM 注册管理，或为鸿蒙电脑专业版/企业版 PC。条目支持设备还需单独核对。
- 企业普通权限 42 条均为 system_basic + system_grant。MDM 56 条均为 system_grant，其中 5 条 system_core，51 条 system_basic。
- 企业普通和 MDM 权限不支持自动签名，调试与发布都须手动签名。FAQ 明确企业权限不在普通自助 ACL 列表；先开通企业发布证书相关资格，再按企业流程申请对应权限、生成 Profile。
- 企业应用证书要求企业实名认证、为企业发布另建应用，并按官网邮件流程开通资格；证书申请页目前注明每个账号仅 1 个企业应用发布证书。
- 包体支持 HAP 或 APP；多个 HAP/HSP 须打 APP 且 packOptions.appWithSignedPkg=true。不能在华为应用市场公开或非公开发布。
- 多数权限标注预计 3 个工作日反馈，属于官网预计时长；DLP_POLICY_MANAGER 当前条目未单独列该时长。
- 权限声明、ACL/Profile 准入、设备/版本/API支持、运行时管理员状态是不同检查；清单存在不等于已获准或可在任意设备调用。最后一项为工程判断，具体激活和接口约束需查相应 API。

## 与文件、DLP、安全审计直接相关的区别

- SET_FILE_GUARD_POLICY 下发文件管控策略，FILE_GUARD_MANAGER 扫描公共目录和管理密级/标签，FILE_GUARD_FILE_WRITE 获取指定用户文件写能力，三者不是同一权限。
- QUERY_AUDIT_EVENT 用于查询安全审计事件；kernel.AUTH_AUDIT_EVENT 允许阻断特定文件操作审计事件，属于不同能力。
- DLP_POLICY_MANAGER 管透明加解密策略，为企业普通类 system_basic、PC/2in1、26.0.0；ENTERPRISE_ACCESS_DLP_FILE 为 MDM system_core，生成/解密 DLP 文件并查策略，API20只系统应用，从API21向MDM开放。
- ENTERPRISE_DATA_IDENTIFY_FILE 为 MDM system_core、PC/2in1、API21，处理文件敏感内容识别。
- kernel.TRAFFIC_FILTER 为企业安全应用网络内联过滤/重定向能力，system_basic、PC/2in1、26.0.0，具明确申请场景限制。
- 企业普通权限中的起始版本与开放版本要分开：例如 sec.ACCESS_UDID 起始7，但从20才向企业普通应用开放。
- SET_FILE_GUARD_POLICY 和 FILE_GUARD_MANAGER 官方变更文字同时写 API10–14 与从API14开始，边界有重叠，若目标API14需进一步以对应API文档或实际平台审批规则确认。

## 实时正文新增条目（相对HTML缓存）

- 企业普通：ENTERPRISE_MANAGE_BACKUP，26.0.1，PC/2in1。
- MDM：ENTERPRISE_REQUEST_PUBLISH_FORM（Phone/PC/Tablet）、ENTERPRISE_EXTERNAL_READ（PC，OOBE阶段U盘大文件）、ENTERPRISE_ENCRYPT_BLOCK_DEVICE（PC，加密U盘挂卸载）；均26.0.1。

## 完整条目索引

### 企业类

| 权限 | 等级 | 起始版本 |
|---|---|---|
| ohos.permission.SET_FILE_GUARD_POLICY | system_basic | 10 |
| ohos.permission.FILE_GUARD_MANAGER | system_basic | 10 |
| ohos.permission.FILE_GUARD_FILE_WRITE | system_basic | 20 |
| ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS | system_basic | 7 |
| ohos.permission.GET_LOCAL_ACCOUNT_IDENTIFIERS | system_basic | 26.0.0 |
| ohos.permission.GET_RUNNING_INFO | system_basic | 7 |
| ohos.permission.RUNNING_STATE_OBSERVER | system_basic | 7 |
| ohos.permission.GET_BUNDLE_INFO_PRIVILEGED | system_basic | 7 |
| ohos.permission.GET_WIFI_CONFIG | system_basic | 8 |
| ohos.permission.SET_WIFI_CONFIG | system_basic | 8 |
| ohos.permission.GET_DOMAIN_ACCOUNTS | system_basic | 10 |
| ohos.permission.QUERY_AUDIT_EVENT | system_basic | 12 |
| ohos.permission.KILL_APP_PROCESSES | system_basic | 12 |
| ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION | system_basic | 15 |
| ohos.permission.ACCESS_ENTERPRISE_USER_TRUSTED_CERT | system_basic | 18 |
| ohos.permission.MANAGE_NET_FIREWALL | system_basic | 12 |
| ohos.permission.GET_NET_FIREWALL | system_basic | 12 |
| ohos.permission.GET_DOMAIN_ACCOUNT_SERVER_CONFIGS | system_basic | 18 |
| ohos.permission.MANAGE_DOMAIN_ACCOUNT_SERVER_CONFIGS | system_basic | 18 |
| ohos.permission.MANAGE_DOMAIN_ACCOUNTS | system_basic | 18 |
| ohos.permission.GET_SIGNATURE_INFO | system_basic | 18 |
| ohos.permission.VISIBLE_WINDOW_INFO | system_basic | 18 |
| ohos.permission.kernel.AUTH_AUDIT_EVENT | system_basic | 20 |
| ohos.permission.SUPPORT_APP_SERVICE_EXTENSION | system_basic | 20 |
| ohos.permission.ENTERPRISE_MANAGE_EAP | system_basic | 20 |
| ohos.permission.SUPPORT_INSTALL_ON_U1 | system_basic | 20 |
| ohos.permission.QUERY_LOCAL_WORKSPACES | system_basic | 20 |
| ohos.permission.SET_NET_EXT_ATTRIBUTE | system_basic | 20 |
| ohos.permission.MANAGE_ANTIVIRUS | system_basic | 20 |
| ohos.permission.REGISTER_ANTIVIRUS | system_basic | 20 |
| ohos.permission.CALL_TPM_CMD | system_basic | 20 |
| ohos.permission.ENTERPRISE_WORKSPACES_EVENT_SUBSCRIBE | system_basic | 20 |
| ohos.permission.SCAN_REMEDIATE_VIRUS | system_basic | 24 |
| ohos.permission.sec.ACCESS_UDID | system_basic | 7 |
| ohos.permission.ENTERPRISE_MANAGE_PRINT | system_basic | 24 |
| ohos.permission.DLP_POLICY_MANAGER | system_basic | 26.0.0 |
| ohos.permission.SUPPORT_CROSS_APP_EMBED_FOR_OA | system_basic | 26.0.0 |
| ohos.permission.SUPPORT_NP_PLUGIN_FOR_WEB | system_basic | 26.0.0 |
| ohos.permission.kernel.LOAD_CERTSIGN_LIBRARY_FOR_WEB | system_basic | 26.0.0 |
| ohos.permission.ENTERPRISE_GET_INSTALLED_BUNDLE_LIST | system_basic | 26.0.0 |
| ohos.permission.kernel.TRAFFIC_FILTER | system_basic | 26.0.0 |
| ohos.permission.ENTERPRISE_MANAGE_BACKUP | system_basic | 26.0.1 |

### 仅 MDM

| 权限 | 等级 | 起始版本 |
|---|---|---|
| ohos.permission.ENTERPRISE_GET_DEVICE_INFO | system_basic | 10 |
| ohos.permission.ENTERPRISE_GET_NETWORK_INFO | system_basic | 10 |
| ohos.permission.ENTERPRISE_INSTALL_BUNDLE | system_core | 10 |
| ohos.permission.ENTERPRISE_MANAGE_SET_APP_RUNNING_POLICY | system_basic | 10 |
| ohos.permission.ENTERPRISE_RESET_DEVICE | system_basic | 10 |
| ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY | system_basic | 10 |
| ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY | system_basic | 10 |
| ohos.permission.ENTERPRISE_SET_DATETIME | system_basic | 9 |
| ohos.permission.ENTERPRISE_SET_NETWORK | system_basic | 10 |
| ohos.permission.ENTERPRISE_SET_WIFI | system_basic | 10 |
| ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT | system_basic | 9 |
| ohos.permission.ENTERPRISE_RESTRICT_POLICY | system_basic | 10 |
| ohos.permission.ENTERPRISE_SET_SCREENOFF_TIME | system_basic | 10 |
| ohos.permission.ENTERPRISE_MANAGE_USB | system_basic | 10 |
| ohos.permission.ENTERPRISE_MANAGE_NETWORK | system_basic | 10 |
| ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE | system_basic | 10 |
| ohos.permission.ENTERPRISE_GET_SETTINGS | system_basic | 10 |
| ohos.permission.ENTERPRISE_SET_BROWSER_POLICY | system_basic | 10 |
| ohos.permission.SET_ENTERPRISE_INFO | system_basic | 9 |
| ohos.permission.ENTERPRISE_MANAGE_SECURITY | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_BLUETOOTH | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_SYSTEM | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_WIFI | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_APPLICATION | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_LOCATION | system_basic | 11 |
| ohos.permission.ENTERPRISE_REBOOT | system_basic | 11 |
| ohos.permission.ENTERPRISE_LOCK_DEVICE | system_basic | 11 |
| ohos.permission.ENTERPRISE_MANAGE_SETTINGS | system_basic | 11 |
| ohos.permission.ENTERPRISE_OPERATE_DEVICE | system_basic | 12 |
| ohos.permission.ENTERPRISE_ADMIN_MANAGE | system_basic | 12 |
| ohos.permission.ENTERPRISE_RECOVERY_KEY | system_core | 13 |
| ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY | system_basic | 14 |
| ohos.permission.ENTERPRISE_GET_ALL_BUNDLE_INFO | system_basic | 20 |
| ohos.permission.ENTERPRISE_SET_USER_RESTRICTION | system_basic | 20 |
| ohos.permission.ENTERPRISE_MANAGE_APN | system_basic | 20 |
| ohos.permission.ENTERPRISE_MANAGE_TELEPHONY | system_basic | 20 |
| ohos.permission.ENTERPRISE_SET_KIOSK | system_basic | 20 |
| ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES | system_basic | 20 |
| ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT | system_basic | 20 |
| ohos.permission.ENTERPRISE_SET_WALLPAPER | system_basic | 20 |
| ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS | system_basic | 20 |
| ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION | system_basic | 20 |
| ohos.permission.ENTERPRISE_DATA_IDENTIFY_FILE | system_core | 21 |
| ohos.permission.ENTERPRISE_ACCESS_DLP_FILE | system_core | 20 |
| ohos.permission.ENTERPRISE_MANAGE_DEVICE_ADMIN | system_basic | 23 |
| ohos.permission.ENTERPRISE_START_ABILITIES | system_basic | 23 |
| ohos.permission.ENTERPRISE_READ_LOG | system_basic | 23 |
| ohos.permission.ENTERPRISE_DEACTIVATE_DEVICE_ADMIN | system_basic | 23 |
| ohos.permission.ENTERPRISE_ACTIVATE_DEVICE_ADMIN | system_basic | 24 |
| ohos.permission.ENTERPRISE_MANAGE_LOCAL_ACCOUNTS | system_basic | 26.0.0 |
| ohos.permission.ENTERPRISE_INTERACT_ACROSS_LOCAL_ACCOUNTS | system_core | 26.0.0 |
| ohos.permission.ENTERPRISE_VPN | system_basic | 26.0.0 |
| ohos.permission.ENTERPRISE_REQUEST_PUBLISH_FORM | system_basic | 26.0.1 |
| ohos.permission.ENTERPRISE_EXTERNAL_READ | system_basic | 26.0.1 |
| ohos.permission.ENTERPRISE_ENCRYPT_BLOCK_DEVICE | system_basic | 26.0.1 |
