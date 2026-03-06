
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, Loader2, Moon, Sun, Menu, X } from 'lucide-react';
import { fetchPosts, fetchPostById } from './utils/api';
import { BlogPost } from './types';
import PostCard from './components/PostCard';
import Footer from './components/Footer';
import PostDetail from './components/PostDetail';
import FeaturedSlider from './components/FeaturedSlider';
import GameEngine from './components/GameEngine';
import AdUnit from './components/AdUnit';
import LegalPages from './components/LegalPages';
import AboutPage from './components/AboutPage';
import CategoryBar from './components/CategoryBar';
import SidebarDrawer from './components/SidebarDrawer';
import { createSlug } from './constants';
import { useSafeRedirect, RobotTopButton, RobotBottomButton, TopButton, BottomButton } from './hooks/safe'; 

type ViewType = 'home' | 'post' | 'about' | 'contact' | 'privacy' | 'terms' | 'category' | 'game' | 'disclaimer';
type ThemeType = 'light' | 'dim' | 'dark';

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pageTokenHistory, setPageTokenHistory] = useState<(string | undefined)[]>([undefined]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewType>('home');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [theme, setTheme] = useState('dark' as ThemeType);
const safe = useSafeRedirect();
  const initialLoadRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (view === 'game' || isMenuOpen) {
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      if (view === 'game') body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
    }
  }, [view, isMenuOpen]);

  const loadData = useCallback(async (token?: string, query?: string, category?: string, isNewLoad: boolean = false) => {
    try {
      setLoading(true);
      const data = await fetchPosts(token, query, category);
      setPosts(data.posts);
      setNextPageToken(data.nextPageToken);
      
      if (isNewLoad) {
        setPageTokenHistory([undefined]);
        setCurrentPageIndex(0);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const syncRoute = useCallback((path: string, state: any) => {
    if (typeof window === 'undefined' || window.location.protocol === 'blob:') return;
    window.history.pushState(state, '', path);
  }, []);

  /**
   * Resolves a post by its slug keywords.
   * This allows us to keep the URL clean without numeric IDs.
   */
  const handleDeepLinkBySlug = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      // We search for the keywords in the slug
      const keywords = slug.split('-').join(' ');
      const searchResult = await fetchPosts(undefined, keywords);
      
      // Find the exact match by comparing slugs
      const match = searchResult.posts.find(p => createSlug(p.title) === slug);
      
      if (match) {
        setActivePost(match);
        setView('post');
      } else if (searchResult.posts.length > 0) {
        // Fallback to first similar result if slug comparison fails slightly
        setActivePost(searchResult.posts[0]);
        setView('post');
      } else {
        throw new Error("Post not found");
      }
    } catch (error) {
      console.error("Slug resolution failed", error);
      setView('home'); 
      loadData(undefined, undefined, undefined, true);
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  useEffect(() => {
    if (initialLoadRef.current) return;
    
    const path = window.location.pathname;
    if (path === '/game') {
      setView('game');
    } else if (path.startsWith('/p/')) {
      const slug = path.split('/p/')[1];
      if (slug) {
        // If the legacy ID format is still present (with --), extract it, 
        // otherwise treat the whole part as the slug.
        const idPart = slug.includes('--') ? slug.split('--').pop() : null;
        if (idPart) {
          // Legacy support for direct ID fetching
          fetchPostById(idPart).then(p => {
             setActivePost(p);
             setView('post');
             // Silently update to clean URL
             syncRoute(`/p/${createSlug(p.title)}`, { view: 'post' });
          }).catch(() => handleDeepLinkBySlug(slug));
        } else {
          handleDeepLinkBySlug(slug);
        }
      }
    } else if (path.startsWith('/c/')) {
      const cat = decodeURIComponent(path.split('/c/')[1]);
      setSelectedCategory(cat);
      setView('category');
      loadData(undefined, undefined, cat, true);
    } else if (['/about', '/contact', '/privacy', '/terms', '/disclaimer'].includes(path)) {
      setView(path.substring(1) as ViewType);
    } else {
      loadData(undefined, undefined, undefined, true);
    }
    
    initialLoadRef.current = true;
  }, [handleDeepLinkBySlug, loadData, syncRoute]);

  const handlePostClick = useCallback((post: BlogPost) => {
    setActivePost(post);
    setView('post');
    const slug = createSlug(post.title);
    syncRoute(`/p/${slug}`, { view: 'post' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [syncRoute]);

  const handleCategoryClick = useCallback((cat: string | null, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);

    if (cat === 'Games') {
      setView('game');
      syncRoute('/game', { view: 'game' });
      return;
    }
    
    setSelectedCategory(cat);
    setActiveSearch('');
    setSearchQuery('');
    loadData(undefined, undefined, cat || undefined, true); 
    setView(cat ? 'category' : 'home');
    syncRoute(cat ? `/c/${encodeURIComponent(cat)}` : '/', { view: cat ? 'category' : 'home', category: cat });
  }, [loadData, syncRoute]);

  const handleHomeClick = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    setView('home');
    setSelectedCategory(null);
    setActiveSearch('');
    loadData(undefined, undefined, undefined, true);
    syncRoute('/', { view: 'home' });
  }, [loadData, syncRoute]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => post.labels?.forEach(label => cats.add(label)));
    ['Tech', 'Gaming', 'Life', 'Viral'].forEach(d => cats.add(d));
    return Array.from(cats).filter(c => !c.toLowerCase().includes('recent')).sort();
  }, [posts]);

  const themeClasses = useMemo(() => {
    switch (theme) {
      case 'dim': return 'bg-[#15202b] text-slate-100';
      case 'dark': return 'bg-[#020617] text-white';
      default: return 'bg-white text-slate-900';
    }
  }, [theme]);

  if (view === 'game') return <GameEngine onClose={handleHomeClick} />;

  return (
  <>
  <div className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClasses}`}>
      <SidebarDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        categories={allCategories} 
        onCategoryClick={handleCategoryClick}
        onHomeClick={handleHomeClick}
        onPageClick={(p) => { 
          setView(p as any); 
          setIsMenuOpen(false); 
          syncRoute(`/${p}`, { view: p }); 
        }}
      />

      <header className={`sticky top-0 z-[60] backdrop-blur-xl border-b shrink-0 transition-all ${theme === 'light' ? 'bg-white/95 border-slate-200' : 'bg-slate-900/95 border-slate-800'}`}>
         <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
            <div className="flex-1 flex items-center gap-4">
               <button 
                 onClick={() => setIsMenuOpen(true)}
                 className={`p-2 rounded-xl transition-all ${theme === 'light' ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/5 text-white'}`}
                 aria-label="Menu"
               >
                 <Menu size={24} />
               </button>
               <a href="/" onClick={handleHomeClick} className="flex items-center gap-2 group shrink-0" aria-label="Creative Mind Home">
                 <span className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${theme === 'light' ? 'text-blue-600' : 'text-white'}`}>Creative Mind</span>
               </a>
            </div>
            
            <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
               <button 
                 onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
                 className={`p-2 rounded-full transition-all flex items-center justify-center ${theme === 'light' ? 'bg-slate-50 text-orange-500 hover:bg-orange-50' : 'bg-white/5 text-blue-400 hover:bg-blue-400/10'}`} 
               >
                 {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
               </button>
               <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-full hover:bg-black/5" aria-label="Search">
                 <Search size={20} />
               </button>
            </div>
         </div>

         {isSearchOpen && (
           <div className={`absolute inset-x-0 top-full border-b p-4 sm:p-10 shadow-2xl z-50 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'} animate-in slide-in-from-top duration-300`}>
              <form onSubmit={(e) => { e.preventDefault(); loadData(undefined, searchQuery, undefined, true); setIsSearchOpen(false); setActiveSearch(searchQuery); }} className="max-w-4xl mx-auto relative">
                <input 
                  autoFocus 
                  type="text" 
                  placeholder="Search stories..." 
                  className={`w-full px-6 py-4 rounded-xl border outline-none font-medium text-lg transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500' : 'bg-slate-800 border-slate-700 text-white focus:border-blue-400'}`} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-500">
                  <Search size={20} />
                </button>
              </form>
           </div>
         )}
      </header>

      <div className={`sticky top-[64px] sm:top-[80px] z-50 border-b backdrop-blur-md ${theme === 'light' ? 'bg-white/80 border-slate-100' : 'bg-slate-900/80 border-slate-800'}`}>
        <CategoryBar 
          categories={allCategories} 
          activeCategory={selectedCategory} 
          onCategoryClick={handleCategoryClick} 
          theme={theme}
        />
      </div>
<RobotTopButton 
            showRobotCheck={safe.showRobotCheck}
            showRobotTimer={safe.showRobotTimer}
            count={safe.count}
            handleRobotClick={safe.handleRobotClick}
            config={safe.config}
            showVerify={safe.showVerify}
        />
      <main className="flex-1" id="main-content">
        {view === 'post' && activePost ? (
          <PostDetail post={activePost} onBack={handleHomeClick} onCategoryClick={handleCategoryClick} recentPosts={posts.slice(0, 9)} onPostClick={handlePostClick} theme={theme} />
        ) : ['about', 'contact', 'privacy', 'terms', 'disclaimer'].includes(view) ? (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
            {view === 'about' ? <AboutPage /> : <LegalPages type={view as any} />}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            {view === 'home' && !activeSearch && posts.length > 0 && currentPageIndex === 0 && (
              <div className="mb-8 sm:mb-20">
                <FeaturedSlider posts={posts} onPostClick={handlePostClick} />
              </div>
            )}

            <div className="flex items-center gap-6 mb-6 sm:mb-12">
               <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-700 dark:text-slate-300">
                 {activeSearch ? `Search results for: ${activeSearch}` : selectedCategory || 'Latest Stories'}
               </h1>
               <div className={`h-[1px] flex-1 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/5'}`}></div>
            </div>

            {loading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 sm:py-48">
                <Loader2 className="animate-spin text-blue-500 mb-6" size={48} />
                <span className="font-medium text-sm text-slate-400">Syncing...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-12">
                {posts.map((post, i) => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post} onClick={handlePostClick} theme={theme} />
                    {(i + 1) % 6 === 0 && (
                      <div className="col-span-full py-4">
                        <AdUnit placement="home_bottom" uniqueKey={`grid-ad-${i}`} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            
            {(nextPageToken || currentPageIndex > 0) && !loading && (
              <nav className="flex justify-center items-center gap-8 mt-16 sm:mt-24 pt-12 border-t border-slate-200/10" aria-label="Pagination">
                  <button 
                    onClick={() => { if(currentPageIndex > 0) {
                      const prevIndex = currentPageIndex - 1;
                      const prevToken = pageTokenHistory[prevIndex];
                      setCurrentPageIndex(prevIndex);
                      loadData(prevToken, activeSearch || undefined, selectedCategory || undefined);
                    }}} 
                    disabled={currentPageIndex === 0}
                    className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold disabled:opacity-20 transition-all hover:bg-blue-600 hover:text-white"
                  >
                    Prev
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="text-xs sm:text-sm font-bold text-blue-600">Page {currentPageIndex + 1}</span>
                  </div>
                  <button 
                    onClick={() => { if(nextPageToken) {
                      setPageTokenHistory([...pageTokenHistory, nextPageToken]);
                      setCurrentPageIndex(currentPageIndex + 1);
                      loadData(nextPageToken, activeSearch || undefined, selectedCategory || undefined);
                    }}} 
                    disabled={!nextPageToken}
                    className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold disabled:opacity-20 transition-all hover:bg-blue-600 hover:text-white"
                  >
                    Next
                  </button>
              </nav>
            )}
          </div>
        )}
      </main>
<RobotBottomButton 
            showVerify={safe.showVerify}
            isProcessing={safe.isProcessing}
            handleVerifyClick={safe.handleVerifyClick}
            config={safe.config}
        />
      <Footer 
        categories={allCategories} 
        onCategoryClick={handleCategoryClick} 
        onPageClick={(page) => {
          setView(page as ViewType);
          syncRoute(`/${page}`, { view: page });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    </div>
  </>  
  );
};

export default App;
