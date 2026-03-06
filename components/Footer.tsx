
import React from 'react';
import { Rocket, Lightbulb } from 'lucide-react';

interface FooterProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  onPageClick: (page: 'about' | 'contact' | 'privacy' | 'terms') => void;
}

export default function Footer({ onPageClick }: FooterProps) {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.location.reload(); // Hard refresh to home if deep linked
    }
  };

  return (
    <footer className="bg-[#0f172a] text-slate-500 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-12">
           <button 
             onClick={handleHomeClick} 
             className="flex items-center gap-3 mb-6 group"
           >
             <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <Lightbulb size={28} fill="currentColor" />
             </div>
             <span className="text-2xl font-black tracking-tight text-white uppercase">Creative Mind</span>
           </button>
           <p className="text-sm max-w-sm text-center leading-relaxed font-medium">
             Synchronizing digital intelligence. Your destination for high-impact tech insights and curated arcade experiences.
           </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-12 border-t border-slate-800/50">
           <FooterLink onClick={handleHomeClick} label="Home" />
           <FooterLink onClick={() => onPageClick('about')} label="About" />
           <FooterLink onClick={() => onPageClick('contact')} label="Contact" />
           <FooterLink onClick={() => onPageClick('privacy')} label="Privacy Policy" />
        </div>
      </div>
      
      <div className="bg-slate-950/50 py-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
              © CREATIVE MIND — ALL RIGHTS RESERVED
            </p>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ onClick, label }: { onClick: () => void, label: string }) => (
  <button onClick={onClick} className="text-slate-400 hover:text-white text-[11px] font-black transition-colors uppercase tracking-[0.2em]">
    {label}
  </button>
);
