# Feilan Global 官网 · Cloudflare Pages 部署文档

> 品牌：Feilan Global / 飞澜国际 · 域名：flgj.net · 托管：Cloudflare Pages（境外）
> 平台定位：**医疗信息咨询与就医协调服务**（非医疗机构，非医疗广告）

---

## 1. 文件结构

```
/
├── index.html                  # 语言选择/自动跳转页（hreflang x-default）
├── en/index.html               # 英文完整页面
├── zh/index.html               # 中文完整页面
├── privacy-policy.html         # 隐私政策占位页（Coming Soon，中英双语）
├── terms-of-service.html       # 服务条款占位页（Coming Soon，中英双语）
├── 404.html
├── sitemap.xml                 # 含 xhtml:link hreflang 双通道闭环
├── robots.txt                  # Allow 全站 + Sitemap 声明
├── favicon.ico / favicon-16x16.png / favicon-32x32.png / apple-touch-icon.png
├── og-image.png                # 1200×630 品牌 OG 图
├── logo_mark.png / logo_white.png
├── assets/team/*.png           # 9 张团队照片（注意：均为 .png）
├── assets/img/placeholder-whatsapp.svg   # TODO: 换成真实 WhatsApp 二维码
├── assets/img/placeholder-wechat.svg     # TODO: 换成真实微信二维码
├── css/main.css
├── js/config.js                # ★ 所有第三方 ID 与可配置文案都在这里
├── js/main.js                  # 导航/移动端菜单/滚动动效
├── js/forms.js                 # Forminit 表单提交 + 同意勾选校验 + toast
├── js/consent.js               # GDPR Cookie 同意横幅（内置降级方案）
├── js/analytics.js             # Cloudflare Web Analytics + sendBeacon 转化打点
└── README.md
```

## 2. GitHub 上传

1. 账号 `dicksq2007` 创建仓库 `feilan-global-site`（Public/Private 均可）。
2. 将本文件包**保持目录结构**上传（git push 或网页直接上传）。
3. 根目录确认存在 `index.html`，Cloudflare Pages 会将其作为站点入口。

## 3. Cloudflare Pages 部署

1. Cloudflare 控制台 → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 选择 `dicksq2007/feilan-global-site` 仓库。
3. 构建设置：**Framework preset = None**；**Build command = 留空**；**Build output directory = `/`**（根目录）。
4. ⚠️ 新版 Cloudflare 项目的 Deploy command 默认为 `npx wrangler deploy`（Workers Static Assets 模式）。**仓库根目录必须包含 `wrangler.jsonc`**（本文件包已含），其中 `"assets": { "directory": "." }` 声明静态资源就在根目录；缺少该文件会报 `Could not detect a directory containing static files`。`"not_found_handling": "404-page"` 表示未匹配路径自动返回根目录的 `404.html`。
5. 部署完成后，Pages 默认分配 `*.pages.dev` 预览域名。

## 4. 域名绑定（flgj.net）

1. 在域名注册商处，将 `flgj.net` 的 nameserver 改为 Cloudflare 分配的两个 NS（Pages 项目或 Add a site 时会给出）。
2. Pages 项目 → **Custom domains** → 添加 `flgj.net`（可同时加 `www.flgj.net` 做跳转）。
3. 等待 SSL 证书签发（通常几分钟到几小时），确认 `https://flgj.net` 可访问。

## 5. 第三方服务配置（★ 上线前必做）

打开 `js/config.js`，替换以下占位：

| 配置项 | 当前占位 | 说明 |
|---|---|---|
| `FORM_PATIENT_ENDPOINT` | `https://forminit.com/f/YOUR_PATIENT_FORM_ID` | Forminit 患者咨询表单 ID |
| `FORM_PARTNER_ENDPOINT` | `https://forminit.com/f/YOUR_PARTNER_FORM_ID` | Forminit 商务合作表单 ID |
| `ANALYTICS_TOKEN` | `YOUR_CLOUDFLARE_WEB_ANALYTICS_TOKEN` | Cloudflare Web Analytics token |

**Forminit 配置步骤：**
1. 注册 Forminit，创建两个 form：①患者咨询（字段与本站表单 name 一致：name/email/treatment/travel_time/details/medical_consent）；②商务合作（name/email/org_type/region/message）。
2. 每个 form 的**转发邮箱（notification email）填：`chansq2007@hotmail.com`**（⚠️ 该邮箱只出现在 Forminit 后台与本文档，**禁止**显示在页面）。
3. 将两个 Form ID 分别填入 `js/config.js`。

**Cloudflare Web Analytics：**
- Analytics → Web Analytics → Add a site → 获得 token → 填入 `ANALYTICS_TOKEN`。无 Cookie，不会被同意横幅阻断。

**转化打点：** `js/analytics.js` 仅在表单提交成功时 `sendBeacon('/api/collect', {type, lang, timestamp})`，不含任何个人数据；无后端时静默失败，不影响用户体验。如需接收数据，后续可在 Cloudflare Workers 加一个 `/api/collect` 路由。

**Cookie 同意横幅：**
- 页面已引入 `cookie-consent-gdpr`（unpkg CDN）。若 CDN 不可用，`js/consent.js` 自动启用内置横幅：Accept / Reject 等权重、Preferences 可撤回、同意记录（UUID/时间戳/类别/URL/UA）存 localStorage。
- Analytics 类别标注"无 Cookie 分析，无需同意"，不阻断 Cloudflare Web Analytics。

## 6. 资源替换清单（TODO）

| 事项 | 位置 | 操作 |
|---|---|---|
| 企业邮箱开通 | `js/config.js` + `en/zh/index.html` 联系版块 | 替换 `contact@flgj.net`，移除 "Coming Soon" 标注后可启用 `mailto:`（当前未启用） |
| 企业电话开通 | 同上 | 替换 `+86-000-0000-0000`，移除 Coming Soon 后可启用 `tel:` |
| WhatsApp 二维码 | `assets/img/placeholder-whatsapp.svg`（路径在 config.js `QR_WHATSAPP`） | 换真实二维码 PNG/SVG，保留 width/height |
| 微信二维码 | `assets/img/placeholder-wechat.svg`（`QR_WECHAT`） | 同上 |
| 隐私政策正式文本 | `privacy-policy.html` | 法务提供后整页替换 |
| 服务条款正式文本 | `terms-of-service.html` | 法务提供后整页替换 |
| 官网维护状态 | en/zh 页 `www.flgj.net (维护升级中)` | 建站完成后移除该标注 |

## 7. 合规待办（法务确认）

- [ ] 全站宣传文案（费用优势等定性表述）经**广告合规**审核——当前已按"方案 A"移除所有具体节省百分比与比例承诺。
- [ ] 页脚医疗免责声明 + 患者表单简短版免责声明经法务确认。
- [ ] GDPR/PIPL 健康信息同意勾选文案经法务确认。
- [ ] JSON-LD `MedicalBusiness` 仅描述协调/信息服务，未列具体医院与疗效；后续如加内容需保持此边界。

## 8. 验收清单（部署后自查）

- [ ] `https://flgj.net/` 自动按浏览器语言跳转，可手动选 EN/中文
- [ ] `/en/`、`/zh/` 独立可访问；互相切换正常；查看源代码 hreflang 双向闭环
- [ ] F12 Network 面板：无 404 资源；团队照片为 `.png`；favicon/og-image 正常
- [ ] 患者表单**不勾选同意框无法提交**（出现红色提示）；勾选后提交成功 toast
- [ ] 商务表单可直接提交成功
- [ ] 页脚全站可见医疗免责声明；患者表单按钮上方有简短版
- [ ] Cookie 横幅 Accept/Reject 等权重；点击后 localStorage 出现 `feilan_consent` 记录
- [ ] 搜索全站无 `−80%` / `−78%` / `1/6–1/8` / `80%` 计数动画等旧表述
- [ ] `https://flgj.net/sitemap.xml`、`robots.txt`、`404.html`（访问不存在路径验证）正常

## 9. 后续：接入 Decap CMS（可选）

本站文案已抽离至 `js/config.js`（表单 endpoint、分析 token、联系方式、地址、二维码路径、免责声明、费用注释）。如需编辑体验升级：
1. 在 `/admin` 接入 Decap CMS（Git Gateway + Cloudflare Access）。
2. 将 `config.js` 中的文案键迁移为 CMS 集合字段，前端改为构建期注入或运行期拉取。
3. 本次不强制接入，静态 config.js 方案已满足上线需求。

---
*© 2026 Hangzhou Feilan Global Travel Co., Ltd. · 本文档为内部部署资料，请勿公开*
