
import React from 'react';
import { Users, Zap, Globe, Award, Twitter, Linkedin, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 border-b border-gray-100">
        <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-6">
          <Zap className="text-blue-600 w-8 h-8" fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
          We are <span className="text-blue-600">Solve Point</span>.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Your daily dose of viral news, tech insights, and digital culture. We curate the stories that matter most to the modern web, served fresh every morning.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 px-4">
        {[
          { label: 'Monthly Readers', value: '2.4M', icon: Users },
          { label: 'Articles Published', value: '5k+', icon: Globe },
          { label: 'Journalism Awards', value: '12', icon: Award },
          { label: 'Coffee Consumed', value: '∞', icon: Zap },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <stat.icon className="w-6 h-6 mx-auto mb-3 text-blue-500" />
            <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="px-4 py-8 mb-12">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl shadow-blue-200">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl mx-auto">
            "To democratize information and provide a platform where technology meets culture. We believe in fast, accurate, and engaging storytelling that respects your time and intelligence."
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 mb-20">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
             <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
             Meet the Editors
           </h2>
           <button className="text-blue-600 font-bold text-sm hover:underline">Join our team →</button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Jenkins', role: 'Editor in Chief', img: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random' },
            { name: 'David Chen', role: 'Tech Lead', img: 'https://ui-avatars.com/api/?name=David+Chen&background=random' },
            { name: 'Marcus Johnson', role: 'Culture Writer', img: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=random' },
          ].map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md relative z-10" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
              <div className="flex gap-3">
                <button className="text-gray-400 hover:text-blue-500 transition-colors"><Twitter size={16} /></button>
                <button className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin size={16} /></button>
                <button className="text-gray-400 hover:text-gray-900 transition-colors"><Mail size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
