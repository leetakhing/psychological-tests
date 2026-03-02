// ============================================================
// 心灵方舟 - 心理测试平台配置文件
// ============================================================
// 
// 使用说明：
// 1. 修改此文件来管理测试列表
// 2. enabled: true = 显示, false = 隐藏
// 3. 添加新测试：在 data/tests/ 目录添加 JSON 文件
// 4. 更多配置项见下方
// 
// ============================================================

window.APP_CONFIG = {
    // 网站名称
    siteName: '心灵方舟',
    
    // 网站副标题
    siteSubtitle: '专业心理测试平台',
    
    // 启用/禁用功能开关
    features: {
        showStats: true,        // 显示统计数字
        categoryFilter: true,   // 分类筛选
        testHistory: true,      // 测试历史记录
        shareResult: true       // 分享功能
    },
    
    // 测试列表（只显示 enabled: true 的）
    tests: [
        {
            id: 'mbti-pro',
            title: 'MBTI 人格测试',
            category: 'MBTI',
            questionCount: 12,
            enabled: true
        },
        {
            id: 'mbti-full',
            title: 'MBTI 深度人格测评',
            category: 'MBTI',
            questionCount: 28,
            enabled: true
        },
        {
            id: 'constellation-guardian',
            title: '星座守护神测试',
            category: '星座',
            questionCount: 12,
            enabled: true
        },
        {
            id: 'iq-test',
            title: 'IQ 智商测试',
            category: 'IQ',
            questionCount: 30,
            enabled: true
        },
        {
            id: 'love-personality',
            title: '爱情性格测试',
            category: '情感',
            questionCount: 15,
            enabled: true
        },
        {
            id: 'eq-test',
            title: 'EQ 情商测试',
            category: '情商',
            questionCount: 20,
            enabled: true
        },
        {
            id: 'career-test',
            title: '职业性格测试',
            category: '职场',
            questionCount: 18,
            enabled: true
        },
        {
            id: 'talent-test',
            title: '天赋测试',
            category: '趣味',
            questionCount: 10,
            enabled: true
        },
        {
            id: 'cthulhu-personality',
            title: '克苏鲁人格测试',
            category: '趣味',
            questionCount: 12,
            enabled: true
        }
    ],
    
    // 统计数字（可自定义）
    stats: {
        totalTests: '50,000+',
        totalTestsLabel: '测试完成',
        satisfaction: '98%',
        satisfactionLabel: '用户满意度'
    },
    
    // 底部链接
    footer: {
        showAbout: true,
        showTerms: true,
        showPrivacy: true,
        showContact: true,
        showAdmin: true,
        adminPath: 'admin.html',
        copyright: '© 2026 心灵方舟'
    },
    
    // 主题颜色（后续拓展）
    theme: {
        primaryColor: '#2563EB',
        accentColor: '#F59E0B'
    }
};
