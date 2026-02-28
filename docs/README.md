# 心灵方舟 - 心理测试平台

一个轻量级、可配置的心理测试平台，可打包部署到任意环境。

## 快速开始

1. 下载项目文件
2. 修改 `config.js` 配置
3. 上传到任意静态服务器

## 配置说明

### config.js

```javascript
window.APP_CONFIG = {
    // 网站名称
    siteName: '心灵方舟',
    
    // 启用/禁用的功能
    features: {
        showStats: true,
        categoryFilter: true,
        testHistory: true,
        shareResult: true
    },
    
    // 测试列表（只需改这里）
    tests: [
        {
            id: 'test-id',           // 测试ID
            title: '测试标题',         // 显示名称
            category: '分类',          // 分类
            questionCount: 10,       // 题目数量
            enabled: true             // true=显示, false=隐藏
        }
    ],
    
    // 底部配置
    footer: {
        showAdmin: true,
        adminPath: 'admin.html',
        copyright: '© 2026 你的公司'
    }
};
```

## 添加新测试

1. 在 `data/tests/` 目录添加 JSON 文件
2. 在 `config.js` 的 `tests` 数组中添加配置

### 测试 JSON 格式

```json
{
  "id": "test-id",
  "title": "测试标题",
  "subtitle": "副标题",
  "description": "测试描述",
  "category": "分类",
  "questions": [
    {
      "id": 1,
      "question": "问题内容",
      "options": [
        {"id": "A", "text": "选项A"},
        {"id": "B", "text": "选项B"}
      ]
    }
  ],
  "results": {
    "A": {
      "title": "结果标题",
      "description": "结果描述",
      "traits": ["特质1", "特质2"]
    }
  }
}
```

## 文件结构

```
├── index.html      # 首页
├── test.html      # 测试页
├── admin.html     # 管理后台
├── config.js      # 配置文件（修改这个）
├── data/
│   └── tests/    # 测试数据目录
│       ├── mbti-pro.json
│       └── ...
└── assets/       # 静态资源（可选）
```

## 部署

### 方式1: GitHub Pages
1. 推送到 GitHub 仓库
2. 开启 GitHub Pages

### 方式2: 任意静态服务器
直接上传所有文件即可

### 方式3: 打包出售
1. 修改 config.js 中的配置
2. 打包成 zip
3. 客户上传到自己的服务器

## 商业版本

- 可定制品牌（Logo、颜色）
- 可添加付费功能
- 可对接支付
- 支持更多测试类型

## 开源协议

MIT License - 可商用，可修改
