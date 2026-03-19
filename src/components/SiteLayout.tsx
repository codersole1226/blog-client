import { NavLink, Outlet } from 'react-router-dom';

interface SiteLayoutProps {
    theme: 'paper' | 'night';
    onToggleTheme: () => void;
}

export default function SiteLayout({ theme, onToggleTheme }: SiteLayoutProps) {
    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="brand-lockup">
                        <p className="brand-kicker">Personal Website</p>
                        <h1 className="logo">CoderSole</h1>
                    </div>
                    <nav className="nav">
                        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
                            首页
                        </NavLink>
                        <NavLink to="/archive" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                            写作
                        </NavLink>
                        <NavLink to="/topics" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                            方向
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                            关于
                        </NavLink>
                    </nav>
                    <button type="button" className="theme-toggle" onClick={onToggleTheme}>
                        {theme === 'paper' ? '夜间模式' : '纸张模式'}
                    </button>
                </div>
            </header>
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer">
                <p>© 2026 CoderSole. Notes on frontend, products, and independent work.</p>
            </footer>
        </div>
    );
}
