# HarmonyOS 权限资料研读

核对日期：2026-11-13。本次范围为[应用权限列表](https://developer.huawei.com/consumer/cn/doc/doccenter-capabilities/app-permissions)链接的五类权限正文及相关授权、ACL、企业签名指南，不代表系统内部全部权限，也不代表已实测全部 API。

## 阅读覆盖

| 官网分类 | 条目数 |
| --- | ---: |
| 开放权限（系统授权） | 70 |
| 开放权限（用户授权） | 19 |
| 受限开放权限 | 105 |
| 企业类应用可用权限 | 42 |
| 仅MDM应用可用权限 | 56 |
| 合计 | 292 |

以官网直接提供的 `.md` 正文建立本次快照；搜索服务缓存的 HTML 可能较旧。已核对292个名称无重复，全部具有权限等级、授权方式和起始版本。统计包含已废弃条目，不是292个当前可用权限。

## 判断权限的顺序

1. 从具体 API 的权限要求确定权限名及 AND/OR 关系。
2. 核对开放范围、业务场景、开发者资格和应用分发类型。
3. 核对设备、起始版本、开放范围变更及废弃信息；未写设备范围不推定全设备可用。
4. 区分应用 APL 与权限 APL；必要时按支持的证书授权/ACL渠道申请，获批后使用包含权限的新 Profile。
5. 在 `module.json5` 声明，再按该权限的实际授权方式完成授权。
6. 结合接口文档检查其他前置条件，并在目标设备验证权限状态与实际调用结果。

APL分为normal、system_basic、system_core；ACL提供部分权限的跨级申请渠道。授权方式则为system_grant、user_grant、manual_settings，后者自API21引入，只能在系统设置中授予。三个维度不能相互替代。官方依据：[应用权限管控概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-mgmt-overview/)。

## 已确认的例外

- LOCATION需要与APPROXIMATELY_LOCATION一起申请；后台定位有前台定位前置条件及设置授权流程。
- READ_MEDIA、WRITE_MEDIA在列表中标记API22废弃；不应据此推导所有版本立即无法安装或所有调用均被拒绝。
- READ_WRITE_DOWNLOAD_DIRECTORY、READ_WRITE_DOCUMENTS_DIRECTORY虽为normal，正文仍要求采用受限权限申请方式，设备为PC/2in1及Tablet。
- FILE_ACCESS_PERSIST自API12为normal；仅适配API12及以后且本地调试可以直接声明，上架仍需受限申请流程。
- normal和system_grant不保证无其他条件。例如RUN_DYN_CODE正文限制为特定系统应用；部分抓包能力仍需用户认证。
- 用户选取照片、音频、联系人等操作，官网多处提供Picker或安全控件方案，不能默认需要批量读取权限。
- 企业与MDM列表均要求手动签名；MDM权限并非全部system_basic，存在5条system_core权限。不要据此修改普通应用APL为system_core。
- ACCESS_DDK_DRIVERS是可携带额外数据的权限，不能仅按名称检查。

## DLP相关权限的区别

| 权限 | 用途和入口 |
| --- | --- |
| ACCESS_DLP_SERVICE | 受限开放；注册、解注册DLP连云插件 |
| DLP_GET_HIDE_STATUS | 受限开放；信息隐藏状态 |
| DLP_POLICY_MANAGER | 企业类；透明加解密策略管理 |
| ENTERPRISE_ACCESS_DLP_FILE | MDM；DLP文件生成、解密和策略查询 |
| ENTERPRISE_DATA_IDENTIFY_FILE | MDM；识别文件敏感内容 |
| FILE_GUARD_MANAGER / SET_FILE_GUARD_POLICY | 企业类；文件标签、密级与文件管控策略 |
| QUERY_AUDIT_EVENT / kernel.AUTH_AUDIT_EVENT | 企业类；审计事件查询与阻断 |

## 文件导航和限制

- [全部条目索引](permissions-index.md)：用途、等级、授权、设备、起始/废弃版本。
- [结构化索引](permissions-index.json)：逐条元数据及完整条目正文，便于后续查找；不是运行时判定规则库。
- [受限权限笔记](restricted-permissions.md)、[企业及MDM笔记](enterprise-permissions.md)：申请场景、签名与例外。
- `sources/`：五类官网正文快照。正文内若有相对锚点，应回官网原页面使用。

文档尚存两处需按目标版本确认的口径：本机Wi-Fi/以太网MAC权限的TV场景与变更段范围不完全一致；SET_FILE_GUARD_POLICY、FILE_GUARD_MANAGER的API14历史范围描述重叠。关联ACL声明指南和企业Profile单页未能稳定获取全文，相关流程交叉参考已读取的官方管理ACL、证书及FAQ资料，不声称关联文档全量阅读。

未登录开发者后台、未申请权限、未修改签名、未进行真机或API调用验证。本次仅完成资料研读和索引，不实现权限检查器。
