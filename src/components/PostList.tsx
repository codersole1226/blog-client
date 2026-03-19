import type { Post } from '../types/post';
import './PostList.css';

interface PostListProps {
    posts: Post[];
    loading?: boolean;
    error?: string | null;
    selectedPostId?: number | null;
    onSelectPost?: (post: Post) => void;
}

const formatter = new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
});

export default function PostList({
    posts,
    loading = false,
    error = null,
    selectedPostId = null,
    onSelectPost,
}: PostListProps) {
    if (loading) {
        return <div className="loading">正在整理最近更新...</div>;
    }

    if (error) {
        return <div className="error">内容加载失败：{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="empty">暂时还没有文章。</div>;
    }

    return (
        <div className="post-list">
            {posts.map((post) => (
                <article
                    key={post.id}
                    className={`post-card${selectedPostId === post.id ? ' selected' : ''}`}
                >
                    {post.cover_image && (
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="post-cover"
                        />
                    )}
                    <div className="post-content">
                        <div className="post-copy">
                            <h2 className="post-title">{post.title}</h2>
                            <p className="post-summary">{post.summary}</p>
                        </div>
                        <div className="post-meta">
                            <span className="post-date">{formatter.format(new Date(post.published_at))}</span>
                            <span className="post-views">{post.views.toLocaleString('zh-CN')} 阅读</span>
                        </div>
                        {onSelectPost && (
                            <button
                                type="button"
                                className="post-action"
                                onClick={() => onSelectPost(post)}
                            >
                                打开内容
                            </button>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}
