
import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface CategoryBarProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (cat: string | null) => void;
  theme: 'light' | 'dim' | 'dark';
}

const CategoryBar: React.FC<CategoryBarProps> = React.memo(({ categories, activeCategory, onCategoryClick, theme }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 flex items-center h-12 sm:h-14 overflow-hidden">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full">
        {/* Fixed Games Category */}
        <CategoryPill 
          label="Arcade" 
          icon={<Gamepad2 size={14} />} 
          active={activeCategory === 'Games'} 
          onClick={() => onCategoryClick('Games')}
          theme={theme}
        />

        <div className={`h-6 w-[1px] mx-2 shrink-0 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}></div>

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <CategoryPill 
            key={cat}
            label={cat} 
            active={activeCategory === cat} 
            onClick={() => onCategoryClick(cat)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
});

const CategoryPill = ({ label, icon, active, onClick, theme }: any) => {
  const activeClass = theme === 'light' 
    ? 'bg-blue-600 text-white shadow-sm' 
    : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20';
    
  const inactiveClass = theme === 'light'
    ? 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
    : 'text-slate-400 hover:text-white hover:bg-white/5';

  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 active:scale-95 ${active ? activeClass : inactiveClass}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};

export default CategoryBar;
