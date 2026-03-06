
import React from 'react';

// Simple banner ad component useful for lists
export const BannerAd: React.FC = () => {
  return (
    <div className="w-full h-[80px] bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden my-4">
      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
        Advertisement
      </div>
    </div>
  );
};
