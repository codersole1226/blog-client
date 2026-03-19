import type { Post, PostsResponse } from '../types/post';

const API_BASE_URL = 'http://localhost:3000';

const fallbackPosts: Post[] = [
    {
        id: 1,
        title: '把博客做成产品，而不是文章仓库',
        slug: 'design-blog-as-a-product',
        summary:
            '从信息架构、阅读节奏到内容复用，把个人博客从单纯的发布页升级成持续经营的内容产品。',
        cover_image:
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        views: 1420,
        created_at: '2026-03-01T08:00:00.000Z',
        published_at: '2026-03-03T08:00:00.000Z',
        category: '内容策略',
        tags: ['博客产品', '信息架构', '内容运营'],
        read_time: 8,
        body: [
            '一个成熟的博客首先要解决的不是页面是否足够花哨，而是读者是否能迅速理解内容价值。首页承担的不是简单导航，而是编辑部首页的职责。',
            '当你开始用产品视角看待博客时，就会自然考虑精选文章、栏目入口、订阅转化以及内容复用。它们共同构成读者对站点专业度的判断。',
            '这也是为什么博客前端不该停留在“文章列表 + 详情页”的最低配置。真正完整的博客项目，需要把内容发现、阅读和回访放在同一个体验闭环里。',
        ],
    },
    {
        id: 2,
        title: 'React 博客首页的层次感来自哪里',
        slug: 'react-editorial-homepage',
        summary:
            '不是多几个阴影和渐变，而是通过信息密度、留白和模块节奏建立真正的质感。',
        cover_image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        views: 1108,
        created_at: '2026-03-05T08:00:00.000Z',
        published_at: '2026-03-08T08:00:00.000Z',
        category: '设计系统',
        tags: ['视觉层次', '前端设计', 'React'],
        read_time: 7,
        body: [
            '很多首页做不出质感，不是因为组件少，而是因为层级感太弱。标题、摘要、图片区和边界的优先级如果都相似，阅读路径就会变得模糊。',
            '在 React 里实现层次感，关键并不在于引入多少动画，而是在于模块结构是否有主次。首屏、精选、列表、侧栏和归档应承担不同信息职责。',
            '把这些层级翻译成组件和样式系统后，博客首页才会具备一种类似出版物的稳定气质。',
        ],
    },
    {
        id: 3,
        title: '写给独立开发者的内容增长工作流',
        slug: 'content-growth-workflow',
        summary:
            '把选题、写作、分发、复盘拆成一套稳定流程，保证博客持续产出且能形成传播。',
        cover_image:
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        views: 1826,
        created_at: '2026-02-18T08:00:00.000Z',
        published_at: '2026-02-20T08:00:00.000Z',
        category: '内容策略',
        tags: ['独立开发', '增长', '写作流程'],
        read_time: 9,
        body: [
            '内容增长本质上是一个连续动作，而不是某一篇文章偶然爆发。你需要一套能重复执行的机制，而不是等待状态好时才写。',
            '选题池、发布节奏、分发渠道和复盘记录都是博客系统的一部分。前端呈现出来的专题、时间线和排行，本质上在传达这套机制的存在。',
            '当读者看到一个持续更新、有明确栏目结构的站点时，对内容的信任会明显提高。',
        ],
    },
    {
        id: 4,
        title: '高质量技术文章的版式系统',
        slug: 'technical-writing-layout-system',
        summary:
            '标题尺度、摘要结构、代码段密度和图片节奏，决定一篇文章是否具备专业出版感。',
        cover_image:
            'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        views: 965,
        created_at: '2026-01-16T08:00:00.000Z',
        published_at: '2026-01-18T08:00:00.000Z',
        category: '设计系统',
        tags: ['排版', '版式系统', '长文阅读'],
        read_time: 6,
        body: [
            '版式系统决定文章是否有“出版感”。标题节奏、正文宽度、段落呼吸和图片间距，都在影响读者是否愿意停留。',
            '技术博客尤其容易忽略版式，因为工程实现通常优先于阅读体验。但真正高质量的内容站会把可读性视为核心功能。',
            '一旦版式成为系统而不是临时拼接，整个博客的品质感就会稳定下来。',
        ],
    },
    {
        id: 5,
        title: '从设计语言到组件语言：统一博客体验',
        slug: 'design-language-for-blog',
        summary:
            '把颜色、字重、卡片、按钮和分隔方式收束成一致规则，页面自然会变得高级。',
        cover_image:
            'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        views: 1284,
        created_at: '2026-03-10T08:00:00.000Z',
        published_at: '2026-03-12T08:00:00.000Z',
        category: '前端工程',
        tags: ['组件语言', '设计令牌', 'UI 一致性'],
        read_time: 8,
        body: [
            '博客体验的一致性来自设计语言，也来自组件语言。颜色变量、圆角尺度、卡片边界和按钮层级都应该有稳定规则。',
            '如果视觉和代码是分离的，页面就会逐渐失控。最好的状态是每个模块既能独立存在，又遵守同一套设计令牌。',
            '这样的博客项目更容易扩展文章页、专题页和归档页，而不需要每次都重新设计。',
        ],
    },
    {
        id: 6,
        title: '内容网站也要有产品思维的数据看板',
        slug: 'content-dashboard-thinking',
        summary:
            '阅读时长、完读率、收藏率和回访频次，比单一浏览量更能反映博客内容质量。',
        cover_image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        views: 1537,
        created_at: '2026-03-13T08:00:00.000Z',
        published_at: '2026-03-15T08:00:00.000Z',
        category: '前端工程',
        tags: ['数据看板', '内容分析', '指标'],
        read_time: 10,
        body: [
            '内容站点不该只盯着浏览量。完读率、收藏行为、回访频率和阅读时长，往往比单一流量数字更有价值。',
            '因此完整博客项目通常需要在前端上预留数据视图的位置，比如热门文章、专题热度和更新频率模块。',
            '这些区块不仅是装饰，更是在把“内容产品”这件事可视化。',
        ],
    },
];

export async function fetchPosts(): Promise<PostsResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        return response.json();
    } catch {
        return {
            success: true,
            message: 'Fallback posts loaded',
            data: fallbackPosts,
        };
    }
}
