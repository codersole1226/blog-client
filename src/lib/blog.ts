import type { EnrichedPost, Post, Topic } from '../types/post';

export const formatDate = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

export const formatMonth = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
});

export const topicBlueprints = [
    {
        name: '设计系统',
        description: '聚焦排版、颜色与组件一致性，让博客具备品牌感。',
    },
    {
        name: '内容策略',
        description: '围绕选题、编辑与分发，建立稳定的长期写作机制。',
    },
    {
        name: '前端工程',
        description: '用 React、TypeScript 和模块化结构支撑可维护的内容站。',
    },
];

export const readingNotes = ['建立首屏节奏', '保留专题入口', '强化持续更新感'];

export function enrichPosts(posts: Post[]): EnrichedPost[] {
    return [...posts]
        .sort(
            (left, right) =>
                new Date(right.published_at).getTime() - new Date(left.published_at).getTime(),
        )
        .map((post, index) => ({
            ...post,
            topic: post.category ?? topicBlueprints[index % topicBlueprints.length].name,
            readTime: `${post.read_time ?? 6 + index} 分钟`,
            body:
                post.body ?? [
                    '这是一篇围绕博客产品化、视觉表达与前端实现展开的文章。',
                    '当文章模型包含分类、标签与阅读时长后，站点就更接近真实可运营的博客项目。',
                ],
            tags: post.tags ?? [],
        }));
}

export function getMetrics(posts: Post[]) {
    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

    return [
        { label: '文章数量', value: `${posts.length}+` },
        { label: '累计阅读', value: `${totalViews.toLocaleString('zh-CN')}+` },
        { label: '更新频率', value: '每周 2 篇' },
    ];
}

export function getTopics(posts: EnrichedPost[]): Topic[] {
    return topicBlueprints.map((topic) => ({
        ...topic,
        count: posts.filter((post) => post.topic === topic.name).length,
    }));
}

export function getJournal(posts: EnrichedPost[]) {
    return posts.slice(0, 4).map((post, index) => ({
        id: post.id,
        title: post.title,
        phase: ['策划', '打磨', '发布', '复盘'][index] ?? '更新',
        date: formatDate.format(new Date(post.published_at)),
    }));
}

export function getArchiveGroups(posts: EnrichedPost[]) {
    return posts.reduce<Record<string, EnrichedPost[]>>((groups, post) => {
        const month = formatMonth.format(new Date(post.published_at));
        groups[month] ??= [];
        groups[month].push(post);
        return groups;
    }, {});
}

export function filterPosts(posts: EnrichedPost[], query: string, topic: string) {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
        const matchTopic = topic === '全部' || post.topic === topic;
        const matchQuery =
            normalizedQuery.length === 0 ||
            post.title.toLowerCase().includes(normalizedQuery) ||
            post.summary.toLowerCase().includes(normalizedQuery) ||
            post.topic.toLowerCase().includes(normalizedQuery) ||
            post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

        return matchTopic && matchQuery;
    });
}
