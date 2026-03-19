import { Link, useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import { formatDate } from '../lib/blog';
import type { EnrichedPost, Topic } from '../types/post';

interface HomePageProps {
    featuredPost?: EnrichedPost;
    latestPosts: EnrichedPost[];
    popularPosts: EnrichedPost[];
    topics: Topic[];
    journal: Array<{ id: number; title: string; phase: string; date: string }>;
    metrics: Array<{ label: string; value: string }>;
    loading: boolean;
    error: string | null;
    onSelectTopic: (topic: string) => void;
}

export default function HomePage({
    featuredPost,
    latestPosts,
    popularPosts,
    topics,
    journal,
    metrics,
    loading,
    error,
    onSelectTopic,
}: HomePageProps) {
    const navigate = useNavigate();

    return (
        <>
            <section className="hero">
                <div className="hero-copy">
                    <p className="eyebrow">Frontend Engineer / Builder / Writer</p>
                    <h2 className="hero-title">这里不是博客封面，而是我的个人工作台与长期输出。</h2>
                    <p className="hero-summary">
                        我关注前端体验、产品表达和个人项目。写作只是其中一部分，这个首页更像一张持续更新的个人名片：你可以快速知道我在做什么、关心什么、最近写了什么。
                    </p>
                    <div className="hero-actions">
                        <Link to="/about" className="primary-link">认识我</Link>
                        <Link to="/archive" className="secondary-link">查看最近写作</Link>
                    </div>
                </div>
                <aside className="hero-panel">
                    <p className="panel-label">Current Focus</p>
                    <p className="panel-title">把个人网站做成一个真实的人，而不是一个自动排版的文章仓库。</p>
                    <div className="hero-metrics">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="metric-card">
                                <span className="metric-value">{metric.value}</span>
                                <span className="metric-label">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>

            {featuredPost && (
                <section className="section section-featured">
                    <div className="section-heading">
                        <div>
                            <p className="section-kicker">Selected Writing</p>
                            <h3 className="section-title">先看这篇</h3>
                        </div>
                        <p className="section-description">如果你只读一篇，就从这里开始。这篇最能代表我最近在思考的问题和表达方式。</p>
                    </div>
                    <article className="feature-card">
                        <div className="feature-media">
                            <img src={featuredPost.cover_image} alt={featuredPost.title} />
                        </div>
                        <div className="feature-body">
                            <span className="feature-badge">{featuredPost.topic}</span>
                            <h4>{featuredPost.title}</h4>
                            <p>{featuredPost.summary}</p>
                            <div className="feature-meta">
                                <span>{formatDate.format(new Date(featuredPost.published_at))}</span>
                                <span>{featuredPost.views.toLocaleString('zh-CN')} 阅读</span>
                            </div>
                            <Link to={`/posts/${featuredPost.slug}`} className="primary-link feature-link">
                                读这篇文章
                            </Link>
                        </div>
                    </article>
                </section>
            )}

            <section className="section content-grid">
                <div className="content-main">
                    <div className="section-heading compact">
                        <div>
                            <p className="section-kicker">Recent Writing</p>
                            <h3 className="section-title">最近更新</h3>
                        </div>
                    </div>
                    <PostList
                        posts={latestPosts}
                        loading={loading}
                        error={error}
                        onSelectPost={(post) => navigate(`/posts/${post.slug}`)}
                    />
                </div>

                <aside className="sidebar">
                    <section className="sidebar-card">
                        <p className="section-kicker">About Me</p>
                        <h3 className="sidebar-title">我在做什么</h3>
                        <div className="mini-post-list">
                            <div className="mini-post-item static-item">
                                <strong>前端体验</strong>
                                <span>关注界面层次、动效节奏和更稳定的交互表达。</span>
                            </div>
                            <div className="mini-post-item static-item">
                                <strong>个人项目</strong>
                                <span>把想法快速做成可运行的产品，而不是只停留在笔记里。</span>
                            </div>
                            <div className="mini-post-item static-item">
                                <strong>长期写作</strong>
                                <span>持续记录实现过程、设计判断和做项目时踩过的坑。</span>
                            </div>
                        </div>
                    </section>

                    <section className="sidebar-card">
                        <p className="section-kicker">Focus Areas</p>
                        <h3 className="sidebar-title">当前方向</h3>
                        <div className="topic-list">
                            {topics.map((topic) => (
                                <button
                                    key={topic.name}
                                    type="button"
                                    className="topic-card topic-button"
                                    onClick={() => {
                                        onSelectTopic(topic.name);
                                        navigate('/topics');
                                    }}
                                >
                                    <div className="topic-head">
                                        <h4>{topic.name}</h4>
                                        <span>{topic.count} 篇</span>
                                    </div>
                                    <p>{topic.description}</p>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="sidebar-card">
                        <p className="section-kicker">Quick Picks</p>
                        <h3 className="sidebar-title">值得先读</h3>
                        <div className="rank-list">
                            {popularPosts.map((post, index) => (
                                <button
                                    key={post.id}
                                    type="button"
                                    className="rank-item rank-button"
                                    onClick={() => navigate(`/posts/${post.slug}`)}
                                >
                                    <span className="rank-index">0{index + 1}</span>
                                    <div>
                                        <h4>{post.title}</h4>
                                        <p>{post.topic} · {post.views.toLocaleString('zh-CN')} 阅读</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                </aside>
            </section>

            <section className="section journal-section">
                <div className="section-heading">
                    <div>
                        <p className="section-kicker">Now</p>
                        <h3 className="section-title">最近在推进</h3>
                    </div>
                    <p className="section-description">除了文章，我也想让这里保留一点个人状态，告诉你这个站点背后的人最近在忙什么。</p>
                </div>
                <div className="journal-list">
                    {journal.map((entry) => (
                        <article key={entry.id} className="journal-item">
                            <span className="journal-phase">{entry.phase}</span>
                            <div>
                                <h4>{entry.title}</h4>
                                <p>{entry.date}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section subscribe-section">
                <div className="contact-copy">
                    <div>
                        <p className="section-kicker">Elsewhere</p>
                        <h3 className="section-title">想继续了解，可以从这里往下走</h3>
                    </div>
                    <p className="section-description">如果你想看完整写作、按主题浏览，或者先快速了解我，这里保留了三个最直接的入口。</p>
                </div>
                <div className="contact-grid">
                    <Link to="/archive" className="contact-card">
                        <span className="contact-label">Writing</span>
                        <strong>进入写作归档</strong>
                        <p>按时间查看所有文章和更新。</p>
                    </Link>
                    <Link to="/topics" className="contact-card">
                        <span className="contact-label">Focus</span>
                        <strong>查看关注方向</strong>
                        <p>从主题结构理解我长期关心的问题。</p>
                    </Link>
                    <Link to="/about" className="contact-card">
                        <span className="contact-label">Profile</span>
                        <strong>读读关于页</strong>
                        <p>快速了解这个站点和我的工作方式。</p>
                    </Link>
                </div>
            </section>
        </>
    );
}
