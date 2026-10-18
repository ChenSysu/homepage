# Alpha 子域名部署

- 正式站点：https://chenww.com/ （原 GitHub Pages，保持不变）
- 实验版：https://alpha.chenww.com/
- 实验版中文页：https://alpha.chenww.com/cn.html
- 托管：Sites，公开访问；源码与正式主页分开部署。
- Sites project_id：`appgprj_6ad45402b5e48191acd9a056ad3ca2fa`
- 自定义域名 ID：`appgdom_6ad454c148708191866e4f7d848bd38f`
- Sites 后备地址：https://chenww-alpha.cww10469.chatgpt.site

## DNS

DNS 由 GoDaddy 管理，本次仅添加与 alpha 子域名有关的记录：

| 类型 | 名称（相对 chenww.com） | 用途 |
| --- | --- | --- |
| CNAME | alpha | 指向 `custom-domains.chatgpt.site.` |
| TXT | _openai-site-verification.alpha | Sites 域名所有权验证 |
| TXT | _cf-custom-hostname.alpha | HTTPS 自定义主机名验证 |

正式站点原有 A、www 等记录不变。验证 TXT 的值以 Sites 域名工具返回的当前记录为准。

## 后续修改

实验版的完整可编辑源码已推送到 Sites 关联源码仓库；包含 dist/ 静态页面、图片、论文、简历与引用文件。使用上述 project_id 继续编辑和发布该 Site，不要重新创建 Site。

主仓库 alpha/ 下保留改版内容快照与旧地址兼容入口。修改这些旧地址的页面不会自动更新独立 Site；应打开并更新 Sites 源码。

旧 `/alpha/` 与 `/alpha/cn.html` 通过页面重定向到新子域名。根目录 `index.html`、`cn.html`、`homepage.css`、`CNAME` 不属于此次变更。
