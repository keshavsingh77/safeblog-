
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { extractFirstImage } from '../constants';

interface FeaturedSliderProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ posts, onPostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredPosts = posts.slice(0, 4);

  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  if (featuredPosts.length === 0) return null;

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer bg-slate-900 group border border-white/5 shadow-2xl" onClick={() => onPostClick(featuredPosts[currentIndex])}>
      {featuredPosts.map((post, index) => {
         const imageUrl = extractFirstImage(post.content);
         return (
          <div key={post.id} className={`absolute inset-0 transition-all duration-1000 ${index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110'}`}>
            <img src={imageUrl || ''} alt={post.title} className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 sm:p-12 w-full max-w-4xl">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-2 sm:mb-4">Editor's Choice</span>
              <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                {post.title}
              </h2>
              <div className="hidden sm:block h-1.5 w-12 bg-blue-600 rounded-full"></div>
            </div>
          </div>
         );
      })}

      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {featuredPosts.map((_, idx) => (
          <button 
            key={idx} 
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }} 
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-10 bg-blue-500' : 'w-2 bg-white/20'}`} 
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;
