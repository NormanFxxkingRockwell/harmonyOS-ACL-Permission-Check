# 鸿蒙权限向导

面向 HarmonyOS 开发者的纯静态权限规划工具。先确认应用场景，再按业务领域核对完整能力，最后得到分类清单、申请路径和可复制配置。

## 使用

在线地址：https://normanfxxkingrockwell.github.io/harmonyOS-ACL-Permission-Check/

本地需要 Node.js 20 或更高版本，无需安装依赖：

```powershell
npm run dev
```

打开 http://127.0.0.1:4173 。开发服务器仅绑定本机，可用环境变量 PORT 更换端口。

```powershell
npm test
npm run build
```

构建输出 dist/，可部署到静态托管服务。所有资源地址支持仓库子路径，包含 GitHub Pages 项目站点。

## 功能

- 40个常见业务场景，包含有声录像、位置精度、后台定位、联系人写回等条件追问。
- 全部290项未废弃权限均可在13个能力领域中检索和选择，并显示官方申请条件。
- 区分应用分发类型、开发者主体、应用形态、运行设备和最低兼容API。
- 官网五类权限分区展示，申请路径与运行时授权分开说明，保留触发场景。
- 全量入口的补充能力需确认官方条件；不满足资格、设备或版本的条目保留说明但排除声明配置。
- 只供系统应用、独立二进制或需要额外value的数据型权限，不生成误导性的通用HAP声明。
- 全量复核290项权限，整理90条关联；明确前置自动补齐，其余按条件、替代、范围和授权例外显示依据。
- 可按企业受管部署环境，对已声明权限组规划MDM授权策略，明确区分DEFAULT、GRANTED、DENIED与实际授权状态。
- module.json5 配置默认折叠；用户授权用途文案作为其下级折叠项提供，可复用已有字符串资源。
- 导出JSON清单，查看官方正文快照和来源链接，支持手机与宽屏。
- 选择保存在本浏览器localStorage；“重新开始”清空当前方案。无后端、账号、统计跟踪或外部字体依赖。

## 发布

.github/workflows/pages.yml 在 main 推送和手动触发时运行测试、构建并部署 GitHub Pages。PR只验证和构建，不发布。仓库Pages的发布来源为GitHub Actions。

## 数据维护

网站只读取 data/permissions.json，没有网站抓取脚本、自动扫描或权限数据更新任务。后续人工核对官网后，更新静态数据、领域归类与相关规则，再运行测试和构建。

- src/rules.js：常见场景、权限推导与配置生成。
- src/domains.js：290项权限的逐项业务领域归类。
- src/constraints.js：主体、历史开放版本、设备和特殊配置例外。
- src/relations.js / src/relations-data.js：前置关系、授权例外、官方组映射和290项复核台账。
- src/relations-view.js：关系说明与MDM部署计划展示。
- src/coverage.js：完整能力选择与官方申请条件确认。
- src/results.js：紧凑分类清单和折叠配置。
- src/app.js / src/style.css：页面流程、状态和红灰视觉样式。
- research/：研读资料和历史原文，供维护参考，不打包进站点。

资料核对日期：2026-11-13。覆盖范围是当前五类官方列表中未标记废弃的290项权限，不代表穷尽全部业务场景和系统内部权限。接口附加条件、第三方SDK、真实设备行为以及官方审批结果仍需结合具体项目确认。生成配置是合并片段，EntryAbility及用途文案应按项目修改。

关联复核说明：[权限关联全量复核](research/PERMISSION-RELATIONSHIP-AUDIT.md)。
