import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import type { EnrichedPost } from '../types/post';

interface ArchivePageProps {
    posts: EnrichedPost[];
    archiveGroups: Record<string, EnrichedPost[]>;
    topicTabs: string[];
    activeTopic: string;
    searchQuery: string;
    loading: boolean;
    error: string | null;
    onSearchChange: (value: string) => void;
    onTopicChange: (topic: string) => void;
}

export default function ArchivePage({
    posts,
    archiveGroups,
    topicTabs,
    activeTopic,
    searchQuery,
    loading,
    error,
    onSearchChange,
    onTopicChange,
}: ArchivePageProps) {
    const navigate = useNavigate();

    return (
        <section className="page-shell">
            <div className="page-intro">
                <p className="section-kicker">Archive</p>
                <h2 className="page-title">写作归档</h2>
                <p className="section-description">这里收纳所有文章。可以按关键词搜索，也可以按关注方向筛选。</p>
            </div>
            <section className="filter-panel">
                <label className="search-input">
                    <span className="search-label">搜索</span>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="搜索文章标题、摘要或专题"
                        aria-label="搜索文章"
                    />
                </label>
                <div className="topic-tabs">
                    {topicTabs.map((topic) => (
                        <button
                            key={topic}
                            type="button"
                            className={`topic-tab${activeTopic === topic ? ' active' : ''}`}
                            onClick={() => onTopicChange(topic)}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </section>
            <div className="archive-layout">
                <div>
                    <PostList
                        posts={posts}
                        loading={loading}
                        error={error}
                        onSelectPost={(post) => navigate(`/posts/${post.slug}`)}
                    />
                </div>
                <aside className="sidebar">
                    <section className="sidebar-card">
                        <p className="section-kicker">By Month</p>
                        <h3 className="sidebar-title">更新时间轴</h3>
                        <div className="archive-groups">
                            {Object.entries(archiveGroups).map(([month, monthPosts]) => (
                                <div key={month} className="archive-group">
                                    <strong>{month}</strong>
                                    <span>{monthPosts.length} 篇</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </section>
    );
}
