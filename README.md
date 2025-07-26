# Read-ily - 智能阅读与知识管理平台

<div align="center">

<img src="public/ChatGPT%20Image%20Jul%2026,%202025,%2007_26_25%20PM.png" width="200"/>

**Read-ily** - 你的私人知识大脑，让阅读更智能，让知识更有价值

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![EPUB.js](https://img.shields.io/badge/EPUB.js-0.3.93-FF6B6B?style=for-the-badge)](https://github.com/futurepress/epub.js/)
[![Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue?style=for-the-badge&logo=vercel)](https://readily.zeabur.app/)


<div class="language-switcher" style="margin: 20px 0;">
  <a href="#zh" onclick="switchLanguage('zh')" style="text-decoration: none; padding: 8px 16px; margin: 0 8px; border-radius: 6px; background: #007bff; color: white; font-weight: 500;">中文</a>
  <a href="#en" onclick="switchLanguage('en')" style="text-decoration: none; padding: 8px 16px; margin: 0 8px; border-radius: 6px; background: #6c757d; color: white; font-weight: 500;">English</a>
</div>

[在线演示](https://readily.zeabur.app/) • [功能特性](#-核心功能) • [快速开始](#-快速开始)

</div>

---

## 🚀 项目简介

Read-ily 是一个革命性的智能阅读与知识管理平台，专为深度阅读者和知识工作者设计。我们致力于解决现代阅读中的核心痛点，通过AI技术将碎片化的阅读体验转化为系统化的知识构建过程。

### 🎯 解决的核心痛点

- **阅读中断问题** - 忘记上次阅读位置，重新进入状态困难
- **知识碎片化** - 阅读内容缺乏系统性整[ ] 
- **理解深度不足** - 缺乏有效的回顾和[ ] 
- **知识[ ]  - 不同书籍间的知识无法[ ] 
- **记忆衰减** - 缺乏科学的复习和巩固机制

---

## ✨ 核心功能

### 📍 ReMind - 断点追踪助理
**断点续读 · 时间流自动总结**

- 🎯 **智能断点记忆** - 自动记录阅读位置和上下文
- 📝 **时间流总结** - 基于阅读历史生成智能[ ] 
- 🧠 **上下文重建** - AI辅助理解当前章节[ ] 

### 🔍 ReSearch - 阅读拓展引擎  
**高质量提问 · 举一反三**

- 🤖 **AI主动提问** - 基于内容生成深度思考问题
- 💭 **引导式反思** - 促进批判性思维和知识内化[ ] 
- 🔗 **知识关联发现** - 连接不同章节和书籍间的知识点

### 📚 ReCap - 章节检测机制
**温故知新 · 书中自有 Duolingo**

- 🎮 **互动式小测** - 每章结束自动生成知识检测
- 📊 **学习进度追踪** - 可视化掌握程度和薄弱环节
- [ ] 🔄 **智能复习提醒** - 基于遗忘曲线安排复习计划[ ] 
- 🏆 **成就系统** - 激励持续学习和知识巩固

### 🔗 ReLink - 笔记结构重塑链接
**关联识别 · 重构知识结构**

- 🧩 **智能关联识别** - 自动发现知识点间的潜在联系
- 📋 **私域智库连接** - 推荐已有知识库中的相关内容
- 🕸️ **知识网络构建** - 形成有机的知识卡片网络
- 🔄 **动态知识演化** - 随阅读深入不断优化知识结构

### 🧠 ReMesh - 私域智库图谱
**可视化网络 · 私人知识大脑**

- 🌐 **知识图谱可视化** - 直观展示知识关联网络
- 🎨 **交互式探索** - 支持节点拖拽、缩放、搜索
- 📈 **知识演化追踪** - 记录知识体系的成长历程
- 🔍 **智能知识检索** - 基于语义的精准内容查找

---

## 🛠️ 技术栈

### 前端技术
- **Vue.js 3.2.13** - 渐进式JavaScript框架
- **Vue Router 4.0.3** - 官方路由管理器
- **Tailwind CSS 3.4.4** - 实用优先的C[ ] 
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
- **自定义知识图谱算法** - 知识关联分析

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

### 项目结构
```
Read-ily/
├── public/                 # 静态资源
├── src/
│   ├── components/         # Vue组件
│   │   └── common/        # 通用组件
│   ├── views/             # 页面视图
│   ├── router/            # 路由配置
│   ├── assets/            # 资源文件
│   └── main.js           # 应用入口
├── package.json           # 项目配置
└── README.md             # 项目说明
```

---

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

- [GitHub Issues](https://github.com/your-username/Read-ily/issues)
- [功能讨论](https://github.com/your-username/Read-ily/discussions)

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户：

- [EPUB.js](https://github.com/futurepress/epub.js/) - 优秀的EPUB解析库
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Vis.js](https://visjs.org/) - 动态可视化库

---

## 📞 支持与联系

- **项目主页**: [https://github.com/your-username/Read-ily](https://github.com/your-username/Read-ily)
- **在线演示**: [https://readily.zeabur.app/](https://readily.zeabur.app/)
- **问题反馈**: [GitHub Issues](https://github.com/your-username/Read-ily/issues)
- **功能讨论**: [GitHub Discussions](https://github.com/your-username/Read-ily/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个星标！**

Made with ❤️ by the Read-ily Team

</div>

<!-- English Version (Hidden by default) -->
<div id="en-content" style="display: none;">

# Read-ily - Intelligent Reading & Knowledge Management Platform

<div align="center">

![Read-ily Logo](public/logo.svg)

**Read-ily** - Your Personal Knowledge Brain, Making Reading Smarter and Knowledge More Valuable

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![EPUB.js](https://img.shields.io/badge/EPUB.js-0.3.93-FF6B6B?style=for-the-badge)](https://github.com/futurepress/epub.js/)
[![Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue?style=for-the-badge&logo=vercel)](https://readily.zeabur.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<div class="language-switcher" style="margin: 20px 0;">
  <a href="#zh" onclick="switchLanguage('zh')" style="text-decoration: none; padding: 8px 16px; margin: 0 8px; border-radius: 6px; background: #6c757d; color: white; font-weight: 500;">中文</a>
  <a href="#en" onclick="switchLanguage('en')" style="text-decoration: none; padding: 8px 16px; margin: 0 8px; border-radius: 6px; background: #007bff; color: white; font-weight: 500;">English</a>
</div>

[Live Demo](https://readily.zeabur.app/) • [Features](#-core-features) • [Quick Start](#-quick-start)

</div>

---

## 🚀 Project Introduction

Read-ily is a revolutionary intelligent reading and knowledge management platform designed for deep readers and knowledge workers. We are committed to solving the core pain points of modern reading, transforming fragmented reading experiences into systematic knowledge construction processes through AI technology.

### 🎯 Core Pain Points Solved

- **Reading Interruption** - Forgetting the last reading position and difficulty re-entering the state
- **Knowledge Fragmentation** - Lack of systematic organization and association of reading content
- **Insufficient Understanding Depth** - Lack of effective review and reflection mechanisms
- **Knowledge Islands** - Inability to effectively connect knowledge between different books
- **Memory Decay** - Lack of scientific review and consolidation mechanisms

---

## ✨ Core Features

### 📍 ReMind - Breakpoint Tracking Assistant
**Resume Reading · Time Flow Auto Summary**

- 🎯 **Smart Breakpoint Memory** - Automatically record reading position and context
- 📝 **Time Flow Summary** - Generate intelligent summaries based on reading history
- 🔄 **Quick State Recovery** - One-click return to the last reading state
- 🧠 **Context Reconstruction** - AI-assisted understanding of current chapter background

### 🔍 ReSearch - Reading Expansion Engine
**High-Quality Questions · Learn by Analogy**

- 🤖 **AI Active Questioning** - Generate deep thinking questions based on content
- 💭 **Guided Reflection** - Promote critical thinking and knowledge internalization
- 🎯 **Personalized Learning Path** - Adjust question difficulty based on understanding level
- 🔗 **Knowledge Association Discovery** - Connect knowledge points between different chapters and books

### 📚 ReCap - Chapter Assessment Mechanism
**Review and Learn · Built-in Duoling[ ] 
- 🎮 **Interactive Quizzes** - Automatically generate knowledge assessments at the end of each chapter
- 📊 **Learning Progress Tracking** - Visualize mastery level and weak areas
- 🔄 **Smart Review Reminders** - Schedule review plans based on forgetting curve
- 🏆 **Achievement System** - Motivate continuous learning and knowledge consolidation

### 🔗 ReLink - Note Structure Reconstruction
**Association Recognition · Knowledge Structure Reconstruction**

- 🧩 **Intelligent Association Recognition** - Automatically discover potential connections between knowledge points
- 📋 **Private Knowledge Base Connection** - Recommend related content from existing knowledge base
- 🕸️ **Knowledge Network Construction** - Form organic knowledge card networks
- 🔄 **Dynamic Knowledge Evolution** - Continuously optimize knowledge structure as reading deepens

### 🧠 ReMesh - Private Knowledge Graph
**Visual Network · Personal Knowledge Brain**

- 🌐 **Knowledge Graph Visualization** - Intuitively display knowledge association networks
- 🎨 **Interactive Exploration** - Support node drag, zoom, and search
- 📈 **Knowledge Evolution Tracking** - Record the growth process of knowledge systems
- 🔍 **Intelligent Knowledge Retrieval** - Semantic-based precise content search

---

## 🛠️ Tech Stack

### Frontend Technologies
- **Vue.js 3.2.13** - Progressive JavaScript Framework
- **Vue Router 4.0.3** - Official Router Manager
- **Tailwind CSS 3.4.4** - Utility-First CSS Framework
- **EPUB.js 0.3.93** - E-book Parsing and Rendering Engine
- **LocalForage 1.10.0** - Local Data Storage Solution

### Development Tools
- **Vue CLI 5.0** - Vue.js Development Toolchain
- **ESLint** - Code Quality Checker
- **Sass** - CSS Preprocessor
- **PostCSS** - CSS Postprocessor
- **Autoprefixer** - CSS Auto Prefixer

### AI & Data Processing
- **Google Generative AI** - Intelligent Content Generation and Analysis
- **Vis.js Network** - Knowledge Graph Visualization
- **Custom Knowledge Graph Algorithms** - Knowledge Association Analysis

---

## 🚀 Quick Start

### Requirements
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/your-username/Read-ily.git
cd Read-ily
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run serve
```

4. **Build for Production**
```bash
npm run build
```

5. **Code Linting**
```bash
npm run lint
```

### Project Structure
```
Read-ily/
├── public/                 # Static Assets
├── src/
│   ├── components/         # Vue Components
│   │   └── common/        # Common Components
│   ├── views/             # Page Views
│   ├── router/            # Router Configuration
│   ├── assets/            # Asset Files
│   └── main.js           # Application Entry
├── package.json           # Project Configuration
└── README.md             # Project Documentation
```

---

## 🎨 Feature Demo

### Bookshelf View
- Drag & Drop EPUB File Upload
- Intelligent Cover Extraction and Metadata Parsing
- Personalized Color Themes

### Reader
- Smooth EPUB Reading Experience
- Smart Breakpoint Memory
- Real-time Notes and Highlighting

### Knowledge Graph
- Interactive Knowledge Network Visualization
- Node Detail Popup
- Intelligent Related Content Recommendations

---

## 🤝 Contributing

We welcome all forms of contributions! Whether it's feature suggestions, bug reports, or code contributions, they are all very important to us.

### How to Contribute

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to Branch** (`git push origin feature/AmazingFeature`)
5. **Create Pull Request**

### Development Standards

- Follow Vue.js Official Style Guide
- Use ESLint for Code Checking
- Write Clear Commit Messages
- Add Necessary Test Cases

### Issue Reporting

If you find bugs or have feature suggestions, please contact us through the following ways:

- [GitHub Issues](https://github.com/your-username/Read-ily/issues)
- [Feature Discussions](https://github.com/your-username/Read-ily/discussions)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Thanks to all developers and users who contributed to this project:

- [EPUB.js](https://github.com/futurepress/epub.js/) - Excellent EPUB Parsing Library
- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework
- [Vis.js](https://visjs.org/) - Dynamic Visualization Library

---

## 📞 Support & Contact

- **Project Homepage**: [https://github.com/Tj-jiaoao/Re-Mesh/tree/main)
- **Live Demo**: [https://readily.zeabur.app/](https://readily.zeabur.app/)
- **Issue Reporting**: [GitHub Issues](https://github.com/Tj-jiaoao/Re-Mesh/tree/main/issues)
- **Feature Discussions**: 
  
![feature discussions](public/3da09a036648d21496a59e30a4e829d4.JPG)
---

<div align="center">

**⭐ If this project helps you, please give us a star!**

Made with ❤️ by the Read-ily Team

</div>

</div>

<script>
function switchLanguage(lang) {
  const zhContent = document.querySelector('body > div:not(#en-content)');
  const enContent = document.getElementById('en-content');
  
  if (lang === 'zh') {
    zhContent.style.display = 'block';
    enContent.style.display = 'none';
    // Update button styles
    document.querySelectorAll('.language-switcher a').forEach(btn => {
      if (btn.textContent === '中文') {
        btn.style.background = '#007bff';
      } else {
        btn.style.background = '#6c757d';
      }
    });
  } else {
    zhContent.style.display = 'none';
    enContent.style.display = 'block';
    // Update button styles
    document.querySelectorAll('.language-switcher a').forEach(btn => {
      if (btn.textContent === 'English') {
        btn.style.background = '#007bff';
      } else {
        btn.style.background = '#6c757d';
      }
    });
  }
  
  // Update URL hash
  window.location.hash = lang;
}

// Initialize language based on URL hash or default to Chinese
document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.substring(1);
  if (hash === 'en') {
    switchLanguage('en');
  } else {
    switchLanguage('zh');
  }
});
</scri[ ] 