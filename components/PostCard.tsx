
import React, { useMemo, useState } from 'react';
import { BlogPost } from '../types';
import { extractFirstImage, extractSnippet, createSlug } from '../constants';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
  theme?: 'light' | 'dim' | 'dark';
}

const PostCard: React.FC<PostCardProps> = React.memo(({ post, onClick, theme = 'light' }) => {
  const imageUrl = useMemo(() => {
    const src = extractFirstImage(post.content);
    if (!src) return null;
    if (src.includes('bp.blogspot.com') || src.includes('googleusercontent.com')) {
      return src.replace(/\/(s\d+(-c)?|w\d+(-h\d+)?)\//, '/w800/');
    }
    return src;
  }, [post.content]);

  const snippet = useMemo(() => extractSnippet(post.content, 80), [post.content]);
  const [imageError, setImageError] = useState(false);
  const slug = useMemo(() => createSlug(post.title), [post.title]);

  const cardBg = theme === 'light' ? 'bg-white' : theme === 'dim' ? 'bg-[#192734]' : 'bg-[#1e293b]';
  const titleColor = theme === 'light' ? 'text-slate-900' : 'text-white';
  const snippetColor = theme === 'light' ? 'text-slate-500' : 'text-slate-400';
  const borderColor = theme === 'light' ? 'border-slate-100' : 'border-slate-800';

  return (
    <article 
      className={`group flex flex-col border rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-xl ${cardBg} ${borderColor} will-change-transform`}
      style={{ contentVisibility: 'auto' }}
    >
      <a 
        href={`/p/${slug}`}
        onClick={(e) => { e.preventDefault(); onClick(post); }}
        className="block flex flex-col h-full"
        aria-label={post.title}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
          {imageUrl && !imageError ? (
            <img 
              src={imageUrl} 
              alt="" 
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
               <span className="text-slate-400 font-medium text-[10px]">No image</span>
            </div>
          )}
          {post.labels?.[0] && (
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-blue-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider z-10 shadow-md">
               {post.labels[0]}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-3 sm:p-8">
          <h3 className={`text-sm sm:text-xl font-bold leading-tight sm:leading-snug mb-2 sm:mb-3 ${titleColor} line-clamp-2 transition-colors group-hover:text-blue-500`}>
            {post.title}
          </h3>
          <p className={`text-[11px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 ${snippetColor} opacity-80 font-medium`}>
            {snippet}
          </p>
        </div>
      </a>
    </article>
  );
});

export default PostCard;
