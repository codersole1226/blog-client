interface AboutPageProps {
    metrics: Array<{ label: string; value: string }>;
}

export default function AboutPage({ metrics }: AboutPageProps) {
    return (
        <section className="page-shell">
            <div className="about-hero">
                <div>
                    <p className="section-kicker">About Me</p>
                    <h2 className="page-title">一个把前端、产品和写作放在同一张桌面上的个人网站</h2>
                    <p className="section-description">
                        CoderSole 关注前端实现、产品表达和长期输出。这个项目不是为了把文章塞进模板，而是希望用站点本身传达我的工作方式和判断。
                    </p>
                </div>
                <div className="about-stats">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="metric-card">
                            <span className="metric-value">{metric.value}</span>
                            <span className="metric-label">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="about-grid">
                <section className="sidebar-card">
                    <p className="section-kicker">Working Principles</p>
                    <h3 className="sidebar-title">做事方式</h3>
                    <div className="mini-post-list">
                        <div className="mini-post-item static-item">
                            <strong>先搭骨架</strong>
                            <span>先明确信息结构和用户路径，再开始写界面和细节。</span>
                        </div>
                        <div className="mini-post-item static-item">
                            <strong>表达要有观点</strong>
                            <span>视觉和文案都应该服务于“这个人是谁”，而不是只看起来完整。</span>
                        </div>
                        <div className="mini-post-item static-item">
                            <strong>留出长期空间</strong>
                            <span>每次实现都尽量为后续迭代和新增内容保留扩展余地。</span>
                        </div>
                    </div>
                </section>
                <section className="sidebar-card">
                    <p className="section-kicker">Stack</p>
                    <h3 className="sidebar-title">技术实现</h3>
                    <div className="stack-tags">
                        {['React', 'TypeScript', 'Vite', 'CSS Tokens', 'React Router'].map((item) => (
                            <span key={item} className="reader-note">
                                {item}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
}
