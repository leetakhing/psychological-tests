# 心理测试中心

简单、高效的心理测试系统。使用 JSON 格式存储测试数据，无需服务器即可运行。

## 快速开始

### 本地运行

```bash
# 进入 tests 目录
cd tests

# 用任何静态服务器运行，例如：
python -m http.server 8000

# 或用 Node.js
npx serve

# 然后访问 http://localhost:8000
```

### 在线部署

#### GitHub Pages（推荐，免费）

1. 将 `tests` 目录推送到 GitHub
2. 仓库设置 → Pages → 选择 main 分支
3. 访问 `https://username.github.io/repository/tests/`

#### Vercel（推荐，免费）

1. 安装 Vercel CLI: `npm i -g vercel`
2. 在 tests 目录运行: `vercel`

#### Netlify（免费）

拖放 `tests` 文件夹到 https://app.netlify.com/drop

---

## 目录结构

```
tests/
├── index.html              # 主页，列出所有测试
├── test.html               # 测试页面（通用模板）
├── js/
│   └── loader.js           # 加载测试数据的脚本
└── data/
    └── examples/           # 测试数据（可修改）
        ├── index.json      # 测试列表
        ├── mbti-test.json  # MBTI 测试示例
        └── constellation-test.json  # 星座测试示例
```

---

## 添加新测试

### 1. 创建 JSON 文件

在 `data/examples/` 目录下新建 `.json` 文件，例如 `my-test.json`：

```json
{
  "id": "my-test-001",
  "title": "测试标题",
  "description": "测试描述",
  "category": "性格",
  "cover": "https://via.placeholder.com/400x300",
  "questions": [
    {
      "id": 1,
      "question": "问题文本",
      "options": [
        {"id": "A", "text": "选项 A"},
        {"id": "B", "text": "选项 B"}
      ]
    }
  ],
  "results": {
    "typeA": {
      "title": "结果标题 A",
      "description": "结果描述",
      "traits": ["特征1", "特征2"],
      "tips": "建议"
    }
  }
}
```

### 2. 更新 index.json

在 `data/examples/index.json` 中添加：

```json
[
  {
    "id": "my-test-001",
    "file": "my-test.json"
  }
]
```

### 3. 完成！

刷新页面，新测试会自动显示。

---

## JSON 格式说明

### 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 测试ID（唯一） |
| `title` | string | 测试标题 |
| `description` | string | 测试描述 |
| `questions` | array | 问题数组 |
| `results` | object | 结果对象 |

### 可选字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `category` | string | 分类（MBTI、星座等） |
| `cover` | string | 封面图片URL |

### questions 格式

```json
{
  "id": 1,
  "question": "问题文本",
  "options": [
    {"id": "选项ID", "text": "选项文字"}
  ]
}
```

### results 格式

```json
{
  "结果ID": {
    "title": "结果标题",
    "description": "结果描述",
    "traits": ["特征1", "特征2"],
    "tips": "建议"
  }
}
```

---

## 更换计分逻辑

默认计分：选择最多的选项ID对应结果。

如需自定义，修改 `test.html` 中的 `calculateResult()` 函数。

### MBTI 计分示例（已内置）

```javascript
if (testData.category === 'MBTI') {
    let resultType =
        (scores['E'] >= scores['I'] ? 'E' : 'I') +
        (scores['N'] >= scores['S'] ? 'N' : 'S') +
        (scores['T'] >= scores['F'] ? 'T' : 'F') +
        (scores['J'] >= scores['P'] ? 'J' : 'P');
    return testData.results[resultType];
}
```

---

## 样式定制

### 修改颜色

在 `index.html` 和 `test.html` 中找到 `linear-gradient`：

```css
background: linear-gradient(135deg, #颜色1 0%, #颜色2 100%);
```

### 修改字体

在 CSS 中添加：

```css
body {
    font-family: "你的字体", sans-serif;
}
```

---

## 常见问题

### Q: 如何添加图片？

**封面图**：在 JSON 的 `cover` 字段添加图片URL。

**测试内图片**：在问题或结果中插入：

```json
{
  "question": "看这张图片，你的感觉是？",
  "image": "images/pic1.jpg"
}
```

### Q: 如何设置不同的计分方式？

修改 `test.html` 的 `calculateResult()` 函数，实现自己的逻辑。

### Q: 可以加付费功能吗？

当前版本为免费。付费需：
1. 添加支付接口（微信支付/支付宝）
2. 后端验证支付
3. 隐藏结果直到支付完成

---

## 性能优化

- JSON 文件尽量小（< 50KB）
- 图片使用 CDN 或压缩
- 考虑懒加载更多测试

---

## 下一步计划

- [ ] 添加测试搜索功能
- [ ] 支持多语言
- [ ] 添加分享功能
- [ ] 社交媒体优化（Open Graph）
- [ ] 用户反馈收集

---

## License

MIT License - 自由使用和修改

---

## 联系方式

如有问题或建议，欢迎反馈！
