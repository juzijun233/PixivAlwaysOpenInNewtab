# Pixiv Always Open in New Tab / Pixiv始终在新标签页打开

一个Tampermonkey用户脚本，用于在Pixiv中点击插画、漫画、小说的超链接时，始终在新标签中打开。

A Tampermonkey userscript that makes all illustrations, manga, and novel links on Pixiv open in new tabs.

## 功能特性 / Features

- ✅ 自动为插画链接添加新标签打开属性 / Automatically opens illustration links in new tabs
- ✅ 自动为漫画链接添加新标签打开属性 / Automatically opens manga links in new tabs  
- ✅ 自动为小说链接添加新标签打开属性 / Automatically opens novel links in new tabs
- ✅ 支持动态加载的内容 / Supports dynamically loaded content
- ✅ 轻量级，无需额外权限 / Lightweight with no extra permissions required

## 安装方法 / Installation

### 前提条件 / Prerequisites

首先需要安装浏览器扩展管理器（任选其一）：
First, install a userscript manager extension (choose one):

- [Tampermonkey](https://www.tampermonkey.net/) (推荐 / Recommended)
- [Violentmonkey](https://violentmonkey.github.io/)
- [Greasemonkey](https://www.greasespot.net/) (仅Firefox / Firefox only)

### 安装脚本 / Install Script

1. 点击以下链接直接安装：
   Click the link below to install directly:
   
   **[安装 pixiv-always-open-in-newtab.user.js / Install pixiv-always-open-in-newtab.user.js](https://github.com/juzijun233/PixivAlwaysOpenInNewtab/raw/main/pixiv-always-open-in-newtab.user.js)**

2. 或者手动安装 / Or install manually:
   - 复制 `pixiv-always-open-in-newtab.user.js` 的内容 / Copy the content of `pixiv-always-open-in-newtab.user.js`
   - 在Tampermonkey中创建新脚本 / Create a new script in Tampermonkey
   - 粘贴内容并保存 / Paste the content and save

## 使用方法 / Usage

安装脚本后，访问 [Pixiv](https://www.pixiv.net/)，所有插画、漫画和小说的链接将自动在新标签页中打开。

After installing the script, visit [Pixiv](https://www.pixiv.net/), and all illustration, manga, and novel links will automatically open in new tabs.

无需任何额外配置！/ No additional configuration needed!

## 兼容性 / Compatibility

- ✅ Chrome / Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Safari (需要Userscripts扩展 / Requires Userscripts extension)
- ✅ Opera

## 技术细节 / Technical Details

脚本会监测以下类型的链接：
The script monitors the following types of links:

- 插画/漫画链接：`/artworks/{id}` / Illustration/Manga links: `/artworks/{id}`
- 小说链接：`/novel/{id}` 或 `/novel/show.php` / Novel links: `/novel/{id}` or `/novel/show.php`

使用 `MutationObserver` 来处理动态加载的内容，确保新添加的链接也会自动处理。
Uses `MutationObserver` to handle dynamically loaded content, ensuring newly added links are automatically processed.

## 许可证 / License

MIT License - 详见 [LICENSE](LICENSE) 文件 / See [LICENSE](LICENSE) file for details

## 贡献 / Contributing

欢迎提交问题和拉取请求！/ Issues and pull requests are welcome!

## 更新日志 / Changelog

### v1.0.0 (2025-12-23)
- 初始版本发布 / Initial release
- 支持插画、漫画、小说链接在新标签页打开 / Support for opening illustrations, manga, and novel links in new tabs
- 支持动态内容 / Support for dynamic content