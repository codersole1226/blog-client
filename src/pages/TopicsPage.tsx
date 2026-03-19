import { useNavigate } from 'react-router-dom';
import type { EnrichedPost, Topic } from '../types/post';

interface TopicsPageProps {
    topics: Topic[];
    posts: EnrichedPost[];
    activeTopic: string;
    onTopicChange: (topic: string) => void;
}

export default function TopicsPage({
    topics,
    posts,
    activeTopic,
    onTopicChange,
}: TopicsPageProps) {
    const navigate = useNavigate();
    const activeTopicMeta = topics.find((topic) => topic.name === activeTopic) ?? topics[0];
    const topicPosts =
        activeTopic === '全部'
            ? posts
            : posts.filter((post) => post.topic === activeTopic);

    return (
        <section className="page-shell">
            <div className="page-intro">
                <p className="section-kicker">Topics</p>
                <h2 className="page-title">关注方向</h2>
                <p className="section-description">这些主题基本覆盖了我现在持续投入的内容，也能更快说明我是谁、在研究什么。</p>
            </div>
            <div className="topic-overview">
                {topics.map((topic) => (
                    <button
                        key={topic.name}
                        type="button"
                        className={`topic-overview-card${activeTopic === topic.name ? ' active' : ''}`}
                        onClick={() => onTopicChange(topic.name)}
                    >
                        <p className="section-kicker">{topic.name}</p>
                        <h3>{topic.count} 篇文章</h3>
                        <p>{topic.description}</p>
                    </button>
                ))}
            </div>
            <section className="sidebar-card topic-detail-card">
                <p className="section-kicker">Current Topic</p>
                <h3 className="sidebar-title">{activeTopicMeta?.name ?? '全部方向'}</h3>
                <p className="section-description">{activeTopicMeta?.description ?? '浏览当前所有主题下的内容。'}</p>
                <div className="mini-post-list">
                    {topicPosts.map((post) => (
                        <button
                            key={post.id}
                            type="button"
                            className="mini-post-item"
                            onClick={() => navigate(`/posts/${post.slug}`)}
                        >
                            <strong>{post.title}</strong>
                            <span>{post.readTime}</span>
                        </button>
                    ))}
                </div>
            </section>
        </section>
    );
}
