# 权限关联全量复核

核对日期：2026-11-14。范围为网站当前五类官方权限目录中290项未废弃权限。逐项阅读权限条目，针对关键关系追加核对当前官方API和指南；不代表已穷尽每个API的权限AND/OR组合，也不是290项真机验证。

## 覆盖记录

| 分工 | 已复核条目 | 关系记录 | 明细 |
| --- | ---: | ---: | --- |
| network | 41 | 15 | [逐项记录](relations-network.json) |
| media | 52 | 25 | [逐项记录](relations-media.json) |
| mdm | 91 | 22 | [逐项记录](relations-mdm.json) |
| system | 106 | 28 | [逐项记录](relations-system.json) |

共290个不重复权限，完整覆盖当前网站数据；共90条关系。`standalone`仅表示权限条目未明示固定共同声明要求，不能推导其所有API都无附加条件。

## 实现方式

只有以下四条明确前置自动补齐，新增项会展示来源并一起进行资格、设备、API检查：

| 选择项 | 自动补齐 |
| --- | --- |
| LOCATION | APPROXIMATELY_LOCATION |
| LOCATION_IN_BACKGROUND | 至少APPROXIMATELY_LOCATION，不强加精确定位 |
| AUTO_RESTORE_MAIN_WINDOW | USE_FLOAT_BALL |
| PERSISTENT_BLUETOOTH_PEERS_MAC | ACCESS_BLUETOOTH |

其他关系按“按接口/场景判断、可选替代、能力范围、授权例外”展示官方来源，不据名称做隐式捆绑。前置不满足时，不生成缺失必需配套的上游配置；来源不符合条件时，不单独输出多余派生权限。

## MDM授权模型

- 被管理业务App与MDM管控端分开：业务App不因被管理而自行申请管理权限，普通分发App也可能处于企业受管设备环境。
- 管理端需要ENTERPRISE_MANAGE_USER_GRANT_PERMISSION、有效设备管理员和管理范围，使用Stage模型接口，从API20起核对支持设备。
- 界面只生成部署计划，DEFAULT表示由用户授权，GRANTED/DENIED都须管理员按目标实例实际下发并检查结果，不宣称已授权。
- 策略按目标应用已声明的同组全部成员设置，不能补齐全组所有可能权限，也不能取消目标权限声明、reason、受限审批或Profile。
- manual_settings不受user_grant管理策略覆盖。后台定位的特殊前置尚无明确MDM替代条文，不生成相应组的静默策略。
- 当前官方组页明确14组、27项未废弃user_grant；FLOAT_VIEW、GET_ALL_BUNDLE_INFO、DIRECT_CALL尚未列出，不自行虚构组。
- 权限禁用例外名单不是授予；委托策略仍须受托应用自己的权限；管理员自激活权限不是已激活状态。

## 其他重要变化

- 同时声明图库读取和媒体位置时，将媒体地理位置用途合并进READ_IMAGEVIDEO的reason，避免实际弹窗漏掉说明。
- 系统授权不等于整个业务无交互：短时图库保存、网络/USB抓包认证、生物识别、代理提醒通知使能、闪控球开关和特殊后台开关分别展示。
- 普通/全部日历范围的OR组合、Wi-Fi旧新接口差异、录屏与输入监听、自带引擎与系统JIT、驱动客户端与提供端、DLP细分能力均不自动全选。
- 运动/健康和文件夹设备说明存在来源口径差异，仅以“待核对”关系提示，不把旧权限组指南直接视作对更新权限列表的全面覆盖。

## 官方依据入口

- [MDM安全管理接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/)
- [MDM管理员与委托接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-adminmanager/)
- [应用权限组](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list/)
- [蓝牙访问接口](https://developer.huawei.com/consumer/cn/doc/doccenter-references/api/js-apis-bluetooth-access)
- [Wi-Fi接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-wifimanager/)

每条关系的具体官方链接和证据范围保存在逐项JSON及src/relations-data.js中；网站详情可直接查看。未来人工更新权限数据时，需同时复核领域归类、组映射、关系证据和测试。
