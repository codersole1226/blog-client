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
            <section className="home-intro">
                <div className="hero hero-copy">
                    <p className="eyebrow">Frontend Engineer / Builder / Writer</p>
                    <h2 className="hero-title">把前端、写作和个人项目，整理成一张安静但有温度的主页。</h2>
                    <p className="hero-summary">
                        我在做前端，也持续记录自己的想法和实践。这个站点想表达的不是“我发了多少文章”，而是我如何看待产品、界面和长期创作。
                    </p>
                    <div className="hero-actions">
                        <Link to="/about" className="primary-link">关于我</Link>
                        <Link to="/archive" className="secondary-link">最近写作</Link>
                    </div>
                </div>
                <aside className="hero-panel intro-note">
                    <div className="intro-note-head">
                        <p className="panel-label">Now</p>
                        <span className="intro-note-dot" />
                    </div>
                    <p className="panel-title">希望这里像一间收拾干净的小书桌，能看见我最近在做什么，也能安静地读点东西。</p>
                    <div className="hero-metrics intro-metrics">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="metric-card">
                                <span className="metric-value">{metric.value}</span>
                                <span className="metric-label">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>

            <section className="section quiet-grid">
                <section className="quiet-card quiet-essay">
                    <div className="section-heading compact">
                        <div>
                            <p className="section-kicker">Profile</p>
                            <h3 className="section-title">简单介绍</h3>
                        </div>
                    </div>
                    <div className="mini-post-list">
                        <div className="mini-post-item static-item">
                            <strong>做前端</strong>
                            <span>关心界面的呼吸感、信息层级和细节的一致性。</span>
                        </div>
                        <div className="mini-post-item static-item">
                            <strong>做项目</strong>
                            <span>喜欢把想法做成能运行的页面，而不只是停在概念上。</span>
                        </div>
                        <div className="mini-post-item static-item">
                            <strong>也写东西</strong>
                            <span>记录设计判断、实现过程和做项目时学到的方法。</span>
                        </div>
                    </div>
                </section>

                <section className="quiet-card quiet-topics">
                    <div className="section-heading compact">
                        <div>
                            <p className="section-kicker">Focus</p>
                            <h3 className="section-title">关注方向</h3>
                        </div>
                    </div>
                    <div className="topic-list compact-topic-list">
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
            </section>

            {featuredPost && (
                <section className="section section-featured feature-strip">
                    <div className="section-heading">
                        <div>
                            <p className="section-kicker">Selected Writing</p>
                            <h3 className="section-title">先读这一篇</h3>
                        </div>
                        <p className="section-description">这篇最接近我当前的兴趣和表达方式，可以当作这个站点的入口。</p>
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
                                进入阅读
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
                        <Link to="/archive" className="section-link">查看全部</Link>
                    </div>
                    <PostList
                        posts={latestPosts}
                        loading={loading}
                        error={error}
                        onSelectPost={(post) => navigate(`/posts/${post.slug}`)}
                    />
                </div>

                <aside className="sidebar">
                    <section className="sidebar-card sidebar-soft">
                        <p className="section-kicker">Quick Picks</p>
                        <h3 className="sidebar-title">顺手看看</h3>
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

            <section className="section journal-section home-journal">
                <div className="section-heading">
                    <div>
                        <p className="section-kicker">Diary</p>
                        <h3 className="section-title">最近在做</h3>
                    </div>
                    <p className="section-description">保留一点近况，让这个站点不只是静态页面，也像真实生活里的缓慢更新。</p>
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

            <section className="section subscribe-section home-links">
                <div className="contact-copy">
                    <div>
                        <p className="section-kicker">Elsewhere</p>
                        <h3 className="section-title">接下来去哪里</h3>
                    </div>
                    <p className="section-description">不想把首页做得太满，所以把后续入口收在这里，干净一点，也更容易继续浏览。</p>
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
