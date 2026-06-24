# KSP 生涯模式教程

交互式《坎巴拉太空计划》生涯模式学习指南，涵盖火箭设计、轨道力学、行星际旅行等核心知识。

## 功能特性

- **7 大章节** — 从生涯模式起步到高级任务规划，系统化学习路径
- **交互式工具** — Δv 计算器、霍曼转移、发射窗口、轨道可视化
- **术语表** — 30+ 航天术语中英对照
- **全文搜索** — 支持 `Ctrl+K` / `/` 快速搜索
- **学习进度** — 本地保存阅读进度
- **深色/亮色主题** — 自适应系统偏好

## 技术栈

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vitejs.dev/) — 构建工具
- [TailwindCSS v4](https://tailwindcss.com/) — 样式
- [React Router v7](https://reactrouter.com/) — 路由
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) — 代码检查

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/          # 通用组件
│   ├── ui/              # UI 基础组件 (Button, GlassCard, Input, ...)
│   ├── ErrorBoundary.tsx
│   └── Layout.tsx       # 全局布局（侧栏 + 顶栏）
├── context/             # React Context
│   ├── ThemeContext.tsx  # 主题切换
│   └── ProgressContext.tsx # 学习进度
├── data/                # 静态数据
│   ├── chapters.ts      # 教程章节内容
│   └── glossary.ts      # 术语表
├── lib/                 # 工具函数
│   └── utils.ts         # cn() 类名合并
├── pages/               # 页面组件
│   ├── Home.tsx         # 首页
│   ├── Chapter.tsx      # 章节列表
│   ├── Section.tsx      # 小节内容（Markdown 渲染）
│   ├── Tools.tsx        # 工具箱入口
│   ├── DvCalculator.tsx # Δv 计算器
│   ├── TransferCalculator.tsx # 霍曼转移
│   ├── LaunchWindow.tsx # 发射窗口
│   ├── OrbitViewer.tsx  # 轨道可视化 (Canvas)
│   ├── Glossary.tsx     # 术语表
│   ├── Search.tsx       # 全文搜索
│   └── NotFound.tsx     # 404 页面
├── App.tsx              # 路由配置
├── main.tsx             # 入口
└── index.css            # 全局样式 + Tailwind 主题
```

## 许可证

MIT
