import { Link } from 'react-router-dom';
import { formatDate, readingNotes } from '../lib/blog';
import type { EnrichedPost } from '../types/post';

interface PostPageProps {
    post?: EnrichedPost;
}

export default function PostPage({ post }: PostPageProps) {
    if (!post) {
        return (
            <section className="page-shell">
                <div className="empty">未找到对应文章。</div>
            </section>
        );
    }

    return (
        <section className="page-shell">
            <Link to="/archive" className="back-link">
                返回文章归档
            </Link>
            <article className="reader-card standalone-reader">
                <div className="reader-cover">
                    <img src={post.cover_image} alt={post.title} />
                </div>
                <div className="reader-body">
                    <div className="reader-meta">
                        <span className="reader-topic">{post.topic}</span>
                        <span>{formatDate.format(new Date(post.published_at))}</span>
                        <span>{post.readTime}</span>
                        <span>{post.views.toLocaleString('zh-CN')} 阅读</span>
                    </div>
                    <h2 className="reader-title">{post.title}</h2>
                    <p className="reader-lead">{post.summary}</p>
                    <div className="reader-content">
                        {post.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="reader-notes">
                        {(post.tags.length ? post.tags : readingNotes).map((tag) => (
                            <span key={tag} className="reader-note">
                                {post.tags.length ? `#${tag}` : tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </section>
    );
}
