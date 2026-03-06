
import React from 'react';
import { X, Home, Gamepad2, Info, FileText, Shield, Mail } from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onCategoryClick: (cat: string) => void;
  onHomeClick: () => void;
  onPageClick: (page: string) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onCategoryClick, 
  onHomeClick, 
  onPageClick 
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-white/10 z-[110] transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
           <span className="text-lg font-bold text-slate-900 dark:text-white">Navigation</span>
           <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X size={24} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
           {/* Primary Links */}
           <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3 block px-4">Menu</span>
              <DrawerLink icon={<Home size={18} />} label="Home" onClick={onHomeClick} />
              <DrawerLink icon={<Gamepad2 size={18} />} label="Games" onClick={() => onCategoryClick('Games')} />
           </div>

           {/* Categories */}
           <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3 block px-4">Categories</span>
              {categories.map(cat => (
                <DrawerLink 
                  key={cat} 
                  label={cat} 
                  onClick={() => onCategoryClick(cat)} 
                  className="text-slate-600 dark:text-slate-400 font-medium"
                />
              ))}
           </div>

           {/* Site Links */}
           <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3 block px-4">Info</span>
              <DrawerLink icon={<Info size={16} />} label="About us" onClick={() => onPageClick('about')} />
              <DrawerLink icon={<Mail size={16} />} label="Contact" onClick={() => onPageClick('contact')} />
              <DrawerLink icon={<Shield size={16} />} label="Privacy policy" onClick={() => onPageClick('privacy')} />
              <DrawerLink icon={<FileText size={16} />} label="Terms of use" onClick={() => onPageClick('terms')} />
           </div>
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-600 tracking-wider">© Creative Mind Portal</span>
           </div>
        </div>
      </aside>
    </>
  );
};

const DrawerLink = ({ icon, label, onClick, className = "" }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm font-semibold active:scale-95 text-left group ${className}`}
  >
    {icon && <span className="text-blue-500 group-hover:scale-110 transition-transform">{icon}</span>}
    {label}
  </button>
);

export default SidebarDrawer;
