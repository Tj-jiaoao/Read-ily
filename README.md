# Read-ily - 智能阅读与知识管理平台

<div align="center">

<img src="public/ChatGPT%20Image%20Jul%2026,%202025,%2007_26_25%20PM.png" width="200"/>

**Read-ily** - 你的私人知识大脑，让阅读更智能，让知识更有价值

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![EPUB.js](https://img.shields.io/badge/EPUB.js-0.3.93-FF6B6B?style=for-the-badge)](https://github.com/futurepress/epub.js/)
[![Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue?style=for-the-badge&logo=vercel)](https://readily.zeabur.app/)


[在线演示](https://readily.zeabur.app/) • [功能特性](#-核心功能) • [快速开始](#-快速开始)

</div>

---

## 🚀 项目简介

Read-ily 是一个革命性的智能阅读与知识管理平台，专为深度阅读者和知识工作者设计。我们致力于解决现代阅读中的核心痛点，通过AI技术将碎片化的阅读体验转化为系统化的知识构建过程。

### 🎯 解决的核心痛点

- **阅读中断问题** - 忘记上次阅读位置，重新进入状态困难
- **知识碎片化** - 阅读内容缺乏系统性整理
- **理解深度不足** - 缺乏有效的回顾和关联
- **记忆衰减** - 缺乏科学的复习和巩固机制

---

## ✨ 核心功能

### 📍 ReMind - 断点追踪助理
**断点续读 · 时间流自动总结**

- [x] 🎯 **智能断点记忆** - 自动记录阅读位置和上下文
- [x] 📝 **时间流总结** - 基于阅读历史生成智能
- [x] 🧠 **上下文重建** - AI辅助理解当前章节

### 🔍 ReSearch - 阅读拓展引擎  
**高质量提问 · 举一反三**

- [x] 🤖 **AI主动提问** - 基于内容生成深度思考问题
- [x] 💭 **引导式反思** - 促进批判性思维和知识内化
- [x] 🔗 **知识关联发现** - 连接不同章节和书籍间的知识点

### 📚 ReCap - 章节检测机制
**温故知新 · 书中自有 Duolingo**

- [x] 🎮 **互动式小测** - 每章结束自动生成知识检测
- [x] 📊 **学习进度追踪** - 可视化掌握程度和薄弱环节
- [ ] 🔄 **智能复习提醒** - 基于遗忘曲线安排复习计划[ ] 
- [ ] 🏆 **成就系统** - 激励持续学习和知识巩固

### 🔗 ReLink - 笔记结构重塑链接
**关联识别 · 重构知识结构**

- [x] 🧩 **智能关联识别** - 自动发现知识点间的潜在联系
- [x] 📋 **私域智库连接** - 推荐已有知识库中的相关内容
- [x] 🕸️ **知识网络构建** - 形成有机的知识卡片网络
- [x] 🔄 **动态知识演化** - 随阅读深入不断优化知识结构

### 🧠 ReMesh - 私域智库图谱
**可视化网络 · 私人知识大脑**

- [x] 🌐 **知识图谱可视化** - 直观展示知识关联网络
- [x] 🎨 **交互式探索** - 支持节点拖拽、缩放、展开
- [x]  📈 **知识演化追踪** - 记录知识体系的成长历程
- [x] 🔍 **智能知识检索** - 基于语义的精准内容查找

---

## 🛠️ 技术栈

### 前端技术
- **Vue.js 3.2.13** - 渐进式JavaScript框架
- **Vue Router 4.0.3** - 官方路由管理器
- **EPUB.js 0.3.93** - 电子书解析和渲染引擎
- **LocalForage 1.10.0** - 本地数据存储解决方案

### 开发工具
- **Vue CLI 5.0** - Vue.js开发工具链
- **ESLint** - 代码质量检查
- **Sass** - CSS预处理器
- **PostCSS** - CSS后处理器
- **Autoprefixer** - CSS自动前缀

### AI与数据处理
- **Google Generative AI** - 智能内容生成和分析
- **Vis.js Network** - 知识图谱可视化
- **知识图谱算法** - Graphitti

---

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/Read-ily.git
cd Read-ily
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run serve
```

4. **构建生产版本**
```bash
npm run build
```

5. **代码检查**
```bash
npm run lint
```

## 🎨 功能演示

### 书架视图
- 支持拖拽上传EPUB文件
- 智能封面提取和元数据解析
- 个性化颜色主题

### 阅读器
- 流畅的EPUB阅读体验
- 智能断点记忆
- 实时笔记和高亮功能

### 知识图谱
- 交互式知识网络可视化
- 节点详情弹窗
- 关联内容智能推荐

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是功能建议、bug报告还是代码贡献，都对我们非常重要。

### 贡献方式

1. **Fork 项目**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 开发规范

- 遵循 Vue.js 官方风格指南
- 使用 ESLint 进行代码检查
- 编写清晰的提交信息
- 添加必要的测试用例

### 问题反馈

如果您发现了bug或有功能建议，请通过以下方式联系我们：

- [GitHub Issues](https://github.com/Tj-jiaoao/Read-ily/issues)
- [功能讨论](hhttps://github.com/Tj-jiaoao/Read-ily/discussions)

---

## 🙏 致谢

本项目得以落成（pao tong），除了四位小伙伴四天时间分工明确地高效合作外，还要感谢开源阅读器框架[minimal reader](https://github.com/MattKevan/minimal-reader)搭建的精简阅读器框架，以及[graphitti](https://github.com/getzep/graphiti)知识图谱提供的增量式图谱更新技术。

除此之外，还要特别感谢同济大学🌰兄的推荐让本人了解到这次黑客松活动，能够参加这次活动，认识这么多有趣的灵魂，能够有机会运用学过的技术，结合AI Agent，切实解决自己以及他人在生活中遇到的烦恼，荣幸之至。

---

## 📞 支持与联系

- **项目主页**: [Read-ily](https://github.com/Tj-jiaoao/Read-ily)
- **在线演示**: [Demo](https://readily.zeabur.app/)
- **问题反馈**: [GitHub Issues](https://github.com/Tj-jiaoao/Read-ily/issues)
- **功能讨论**: 
![Function discussion](public/3da09a036648d21496a59e30a4e829d4.JPG)
---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个星标！**

Made with ❤️ by the Read-ily Team