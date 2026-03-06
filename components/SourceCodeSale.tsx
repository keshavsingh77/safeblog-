
import React from 'react';
import { Code2, Cpu, Rocket, Terminal, Settings, Layers, Zap, CheckCircle2, DollarSign, Globe } from 'lucide-react';

const SourceCodeSale: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 animate-fade-in">
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/20">
          <Code2 size={14} /> Developer Premium Assets
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter italic uppercase">
          Own the <span className="text-blue-500">Creative Mind</span> Intelligence Portal
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-serif italic">
          A high-performance, AdSense-optimized intelligence portal and arcade engine built with the latest modern web technologies.
        </p>
      </header>

      <section className="prose prose-invert prose-slate prose-xl max-w-none mb-20">
        <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl">
          <h2 className="flex items-center gap-4 text-white font-black uppercase tracking-tight text-3xl mb-8">
            <Cpu className="text-blue-500" /> Technical Architecture
          </h2>
          <p className="text-slate-300">
            This platform is engineered for speed, SEO, and scalability. It utilizes a <strong>Headless CMS</strong> approach, using Google Blogger as a free, high-availability backend while delivering a premium, custom-built frontend experience.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12 not-prose">
            <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
              <h3 className="text-blue-400 font-black uppercase text-xs tracking-widest mb-4">Core Language</h3>
              <p className="text-white text-2xl font-bold">TypeScript & React 19</p>
              <p className="text-slate-500 text-sm mt-2">Type-safe development with the latest React rendering engine for maximum performance.</p>
            </div>
            <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
              <h3 className="text-blue-400 font-black uppercase text-xs tracking-widest mb-4">Styling Engine</h3>
              <p className="text-white text-2xl font-bold">Tailwind CSS 3.4</p>
              <p className="text-slate-500 text-sm mt-2">Utility-first CSS ensuring minimal bundle size and lightning-fast customization.</p>
            </div>
          </div>
        </div>

        <h2 className="text-white font-black uppercase tracking-tight text-3xl mt-20 mb-8 flex items-center gap-4">
          <Settings className="text-blue-500" /> How It Works
        </h2>
        <p>
          The site functions as a sophisticated wrapper around the <strong>Google Blogger API v3</strong>. This means you get a professional blogging interface (Blogger) for free, with all the features of a custom React application.
        </p>
        <ul className="space-y-4">
          <li className="flex gap-4">
             <CheckCircle2 className="text-green-500 shrink-0" />
             <span><strong>Dynamic Content:</strong> Posts are fetched in real-time, cached with React useMemo for instant navigation.</span>
          </li>
          <li className="flex gap-4">
             <CheckCircle2 className="text-green-500 shrink-0" />
             <span><strong>Arcade Integration:</strong> A custom-built 'Space Flap' game engine integrated directly into the React lifecycle.</span>
          </li>
          <li className="flex gap-4">
             <CheckCircle2 className="text-green-500 shrink-0" />
             <span><strong>AI Headline Engine:</strong> Integrated with Google Gemini API to generate viral social snippets for game results.</span>
          </li>
          <li className="flex gap-4">
             <CheckCircle2 className="text-green-500 shrink-0" />
             <span><strong>AdSense Ready:</strong> Strategic ad placement logic built to maximize CTR without compromising UX.</span>
          </li>
        </ul>

        <div className="my-20 bg-black border border-blue-500/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <h2 className="text-white font-black uppercase tracking-tight text-3xl mb-8 flex items-center gap-4">
            <Terminal className="text-blue-500" /> Quick Installation
          </h2>
          <p className="text-slate-400 mb-8 font-serif italic">Deploy your own version of Creative Mind in minutes by following these simple steps:</p>
          
          <div className="space-y-6 not-prose">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black shrink-0 text-white">1</div>
              <div>
                <h4 className="text-white font-bold mb-1">Environment Setup</h4>
                <p className="text-slate-500 text-sm">Download the source files and run <code className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">npm install</code> to fetch dependencies.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black shrink-0 text-white">2</div>
              <div>
                <h4 className="text-white font-bold mb-1">Configure API Keys</h4>
                <p className="text-slate-500 text-sm">Open <code className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">constants.ts</code> and replace the Blogger API Key and Blog ID with your own.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black shrink-0 text-white">3</div>
              <div>
                <h4 className="text-white font-bold mb-1">Branding</h4>
                <p className="text-slate-500 text-sm">Modify the site name and description in <code className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">metadata.json</code>.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black shrink-0 text-white">4</div>
              <div>
                <h4 className="text-white font-bold mb-1">Launch</h4>
                <p className="text-slate-500 text-sm">Run <code className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">npm run dev</code> to see your site live locally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <div className="relative group overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-700">
           <Zap size={200} fill="white" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
          Ready to launch your portal?
        </h2>
        <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium">
          Get the complete source code, including the arcade engine, AI integrations, and AdSense-optimized layouts. 
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-xl flex items-center gap-4">
             <DollarSign size={24} /> Get Source Code
          </button>
          <div className="flex flex-col items-start text-left">
            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Instant Delivery</span>
            <span className="text-white font-bold text-sm">Full Technical Documentation Included</span>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center items-center gap-8 pt-8 border-t border-white/10">
           <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
             <Globe size={16} /> Worldwide License
           </div>
           <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
             <Layers size={16} /> Multi-Site Ready
           </div>
        </div>
      </div>
    </div>
  );
};

export default SourceCodeSale;
