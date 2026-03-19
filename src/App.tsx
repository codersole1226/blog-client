import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { fetchPosts } from './api/posts';
import SiteLayout from './components/SiteLayout';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import TopicsPage from './pages/TopicsPage';
import {
    enrichPosts,
    filterPosts,
    getArchiveGroups,
    getJournal,
    getMetrics,
    getTopics,
    topicBlueprints,
} from './lib/blog';
import type { Post } from './types/post';
import './App.css';

function PostRoute({
    posts,
}: {
    posts: ReturnType<typeof enrichPosts>;
}) {
    const { slug } = useParams();
    const post = posts.find((item) => item.slug === slug);

    return <PostPage post={post} />;
}

function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTopic, setActiveTopic] = useState('全部');
    const [theme, setTheme] = useState<'paper' | 'night'>('paper');

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                const response = await fetchPosts();
                if (response.success) {
                    setPosts(response.data);
                    setError(null);
                    return;
                }
                setError(response.message);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load posts');
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('blog-theme');
        if (savedTheme === 'paper' || savedTheme === 'night') {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('blog-theme', theme);
    }, [theme]);

    const enrichedPosts = useMemo(() => enrichPosts(posts), [posts]);
    const filteredPosts = useMemo(
        () => filterPosts(enrichedPosts, searchQuery, activeTopic),
        [activeTopic, enrichedPosts, searchQuery],
    );
    const featuredPost = enrichedPosts[0];
    const latestPosts = filteredPosts.slice(0, 4);
    const popularPosts = [...enrichedPosts].sort((left, right) => right.views - left.views).slice(0, 3);
    const metrics = useMemo(() => getMetrics(posts), [posts]);
    const topics = useMemo(() => getTopics(enrichedPosts), [enrichedPosts]);
    const journal = useMemo(() => getJournal(enrichedPosts), [enrichedPosts]);
    const archiveGroups = useMemo(() => getArchiveGroups(enrichedPosts), [enrichedPosts]);
    const topicTabs = useMemo(() => ['全部', ...topicBlueprints.map((topic) => topic.name)], []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SiteLayout
                        theme={theme}
                        onToggleTheme={() =>
                            setTheme((currentTheme) => (currentTheme === 'paper' ? 'night' : 'paper'))
                        }
                    />
                }
            >
                <Route
                    index
                    element={
                        <HomePage
                            featuredPost={featuredPost}
                            latestPosts={latestPosts}
                            popularPosts={popularPosts}
                            topics={topics}
                            journal={journal}
                            metrics={metrics}
                            loading={loading}
                            error={error}
                            onSelectTopic={setActiveTopic}
                        />
                    }
                />
                <Route
                    path="archive"
                    element={
                        <ArchivePage
                            posts={filteredPosts}
                            archiveGroups={archiveGroups}
                            topicTabs={topicTabs}
                            activeTopic={activeTopic}
                            searchQuery={searchQuery}
                            loading={loading}
                            error={error}
                            onSearchChange={setSearchQuery}
                            onTopicChange={setActiveTopic}
                        />
                    }
                />
                <Route
                    path="topics"
                    element={
                        <TopicsPage
                            topics={topics}
                            posts={activeTopic === '全部' ? enrichedPosts : filteredPosts}
                            activeTopic={activeTopic}
                            onTopicChange={setActiveTopic}
                        />
                    }
                />
                <Route path="about" element={<AboutPage metrics={metrics} />} />
                <Route path="posts/:slug" element={<PostRoute posts={enrichedPosts} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
