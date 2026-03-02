/**
 * 测试加载器
 * 加载 JSON 格式的测试数据
 */

const TEST_BASE_URL = 'data/examples/';

/**
 * 加载单个测试
 */
async function loadTest(testId) {
    try {
        const response = await fetch(`${TEST_BASE_URL}${testId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('加载测试失败:', error);
        throw error;
    }
}

/**
 * 加载所有测试列表
 */
async function loadTestList() {
    try {
        const response = await fetch(`${TEST_BASE_URL}index.json`);
        let tests = [];

        if (response.ok) {
            tests = await response.json();
        } else {
            // 如果 index.json 不存在，使用默认列表
            tests = [
                { id: 'mbti-001', file: 'mbti-test' },
                { id: 'constellation-001', file: 'constellation-test' }
            ];
        }

        // 加载每个测试的详细信息
        const testGrid = document.getElementById('testGrid');
        if (!testGrid) return;

        testGrid.innerHTML = '<p style="color:white;text-align:center;">加载测试中...</p>';

        const loadedTests = [];
        for (const test of tests) {
            try {
                // 移除 .json 后缀（如果有）
                const fileName = test.file.replace('.json', '');
                const data = await loadTest(fileName);
                loadedTests.push(data);
            } catch (err) {
                console.warn(`加载测试 ${test.file} 失败:`, err.message);
            }
        }

        renderTestList(loadedTests);
    } catch (error) {
        console.error('加载测试列表失败:', error);
        const testGrid = document.getElementById('testGrid');
        if (testGrid) {
            testGrid.innerHTML = '<p style="color:white;text-align:center;">加载失败，请刷新重试</p>';
        }
    }
}

/**
 * 渲染测试列表
 */
function renderTestList(tests) {
    const testGrid = document.getElementById('testGrid');
    if (!testGrid) return;

    if (tests.length === 0) {
        testGrid.innerHTML = '<p style="color:white;text-align:center;">暂无测试，敬请期待</p>';
        return;
    }

    testGrid.innerHTML = tests.map(test => `
        <div class="test-card" onclick="window.location.href='test.html?test=${test.id}'">
            <div class="test-cover">
                <span>${getTestEmoji(test.category)}</span>
            </div>
            <div class="test-content">
                <span class="test-badge">${test.category || '测试'}</span>
                <h2 class="test-title">${test.title}</h2>
                <p class="test-description">${test.description}</p>
                <div class="test-info">
                    <span>${test.questions ? test.questions.length : 0} 道题目</span>
                    <span>免费测试</span>
                </div>
                <button class="btn-start">开始测试 →</button>
            </div>
        </div>
    `).join('');
}

/**
 * 根据类别获取 emoji
 */
function getTestEmoji(category) {
    const emojis = {
        'MBTI': '🧠',
        '星座': '⭐',
        '智商': '💯',
        '性格': '💝',
        '情感': '❤️',
        '运势': '🔮',
        'IQ': '💯'
    };
    return emojis[category] || '📝';
}

// 导出函数供 HTML 使用
if (typeof window !== 'undefined') {
    window.loadTest = loadTest;
    window.loadTestList = loadTestList;
}
