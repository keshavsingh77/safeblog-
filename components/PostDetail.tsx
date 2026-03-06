
import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost } from '../types';
import { extractFirstImage, formatDate, createSlug } from '../constants';
import { ArrowLeft, Calendar, Share2, Clock, List, ChevronRight, TrendingUp } from 'lucide-react';
import Comments from './Comments';
import AdUnit from './AdUnit';
import { useSafeRedirect, TopButton, BottomButton } from '../hooks/safe';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onCategoryClick: (cat: string) => void;
  recentPosts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
  theme?: 'light' | 'dim' | 'dark';
}

const PostDetail: React.FC<PostDetailProps> = ({ 
  post, 
  onBack, 
  onCategoryClick, 
  recentPosts, 
  onPostClick,
  theme = 'dark'
}) => {
  const heroImage = extractFirstImage(post.content);
  const slug = useMemo(() => createSlug(post.title), [post.title]);
  const currentUrl = (typeof window !== 'undefined' ? window.location.origin : '') + `/p/${slug}`;
  const [heroImgError, setHeroImgError] = useState(false);

  // safe redirect for external links/timers
  const { count, showContinue, redirectUrl, handleContinueClick, isInitialized } = useSafeRedirect();

  const processedContent = useMemo(() => {
    if (!post.content) return { html: '', toc: [] as TOCItem[] };
    
    const toc: TOCItem[] = [];
    const div = document.createElement('div');
    div.innerHTML = post.content;
    
    const headers = div.querySelectorAll('h2, h3');
    headers.forEach((header, index) => {
      const text = header.textContent || '';
      const id = `section-${index}`;
      header.setAttribute('id', id);
      toc.push({
        id,
        text,
        level: parseInt(header.tagName.substring(1))
      });
    });

    return {
      html: div.innerHTML,
      toc
    };
  }, [post.content]);

  const contentChunks = useMemo(() => {
    const raw = processedContent.html || '';
    const parts = raw.split('</p>');
    if (parts.length < 4) return [raw];
    
    const chunks: string[] = [];
    const density = 3; 
    for (let i = 0; i < parts.length; i += density) {
      const chunk = parts.slice(i, i + density).join('</p>');
      chunks.push(chunk + (i + density < parts.length ? '</p>' : ''));
    }
    return chunks;
  }, [processedContent.html]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const bgClass = theme === 'light' ? 'bg-white' : theme === 'dim' ? 'bg-[#15202b]' : 'bg-[#020617]';
  const stickyBg = theme === 'light' ? 'bg-white/95' : theme === 'dim' ? 'bg-[#15202b]/95' : 'bg-slate-900/95';
  const borderClass = theme === 'light' ? 'border-slate-100' : 'border-slate-800';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-white';
  const subTextColor = theme === 'light' ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      <TopButton 
            count={count}
            showContinue={showContinue}
            redirectUrl={redirectUrl}
            handleContinueClick={handleContinueClick}
            isInitialized={isInitialized}
          />
      <div className={`sticky top-16 z-40 ${stickyBg} backdrop-blur border-b ${borderClass} px-6 py-4 flex items-center justify-between`}>
         <a 
           href="/" 
           onClick={(e) => { e.preventDefault(); onBack(); }} 
           className={`flex items-center gap-2 ${textColor} hover:text-blue-500 transition-colors font-semibold text-sm no-underline`}
         >
            <ArrowLeft size={18} /> Back
         </a>
         <div className="flex items-center gap-4">
            <button onClick={() => window.navigator.share?.({ title: post.title, url: currentUrl })} className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition-colors">
               <Share2 size={16} />
            </button>
         </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-12 md:mb-16 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
          
            {post.labels && post.labels.map(category => (
              <a 
                key={category} 
                href={`/c/${encodeURIComponent(category)}`}
                onClick={(e) => { e.preventDefault(); onCategoryClick(category); }} 
                className="bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-500/20 hover:bg-blue-100 transition-all no-underline"
              >
                {category}
              </a>
            ))}
          </div>
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold ${textColor} leading-tight mb-8 tracking-tight`}>
            {post.title}
          </h1>
          
          <div className={`flex flex-wrap justify-center items-center gap-6 text-sm ${subTextColor} pb-12 border-b ${borderClass}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-[10px]">CM</div>
              <span className={`font-semibold ${textColor}`}>{post.author.displayName}</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Calendar size={14} />
              <span>{formatDate(post.published)}</span>
            </div>
          </div>
        </header>
        
        <AdUnit placement="article_top" uniqueKey="art-top-1" />

        {heroImage && !heroImgError && (
          <div className={`my-10 rounded-[2.5rem] overflow-hidden shadow-xl aspect-[16/9] ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-900'}`}>
            <img src={heroImage} alt={post.title} onError={() => setHeroImgError(true)} className="w-full h-full object-cover" />
          </div>
        )}

        {processedContent.toc.length > 1 && (
          <div className={`my-10 ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900/50'} border ${borderClass} rounded-[2rem] p-8 md:p-10`}>
            <div className="flex items-center gap-3 mb-6">
              <List className="text-blue-500" size={20} />
              <h2 className={`${textColor} font-bold text-xl m-0`}>In this story</h2>
            </div>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processedContent.toc.map((item, i) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-start gap-3 text-left group transition-all ${item.level === 3 ? 'ml-6' : ''}`}
                >
                  <span className="text-blue-600 font-bold text-sm">{i + 1}.</span>
                  <span className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} group-hover:text-blue-500 font-medium leading-tight transition-colors`}>
                    {item.text}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        )}

        <div className={`prose ${theme !== 'light' ? 'prose-invert' : 'prose-slate'} prose-lg md:prose-xl max-w-none ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'} leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-32 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-[2rem]`}>
          {contentChunks.map((chunk, index) => (
            <React.Fragment key={index}>
              <div dangerouslySetInnerHTML={{ __html: chunk }} />
              {index < contentChunks.length - 1 && (
                <div className="my-10">
                   <AdUnit key={`mid-ad-${index}`} placement="article_middle" uniqueKey={`mid-ad-${index}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <AdUnit placement="article_bottom" uniqueKey="art-bot-1" />
  <BottomButton 
            count={count}
            showContinue={showContinue}
            redirectUrl={redirectUrl}
            handleContinueClick={handleContinueClick}
            isInitialized={isInitialized}
          />
        <div className={`mt-20 pt-16 border-t ${borderClass}`}>
           <div className="flex items-center gap-3 mb-10">
              <TrendingUp size={20} className="text-blue-500" />
              <h3 className={`text-2xl font-bold ${textColor}`}>Related Stories</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.slice(0, 3).map((p) => {
                 const pSlug = createSlug(p.title);
                 return (
                  <a 
                    key={p.id} 
                    href={`/p/${pSlug}`}
                    className="group cursor-pointer no-underline" 
                    onClick={(e) => { e.preventDefault(); onPostClick(p); }}
                  >
                      <div className={`aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-4 ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-900'} border ${borderClass}`}>
                        <img src={extractFirstImage(p.content) || ''} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className={`font-bold ${textColor} group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug`}>
                        {p.title}
                      </h4>
                  </a>
                 );
              })}
           </div>
        </div>

        <Comments postUrl={currentUrl} postId={post.id} postTitle={post.title} />
      </article>
    </div>
  );
};

export default PostDetail;
