
import React from 'react';
import { Shield, Mail, FileText, AlertTriangle, Info } from 'lucide-react';

interface PageProps {
  type: 'privacy' | 'contact' | 'dmca' | 'terms' | 'disclaimer';
}

const LegalPages: React.FC<PageProps> = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <Shield size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <div className="prose prose-slate max-w-none mt-6">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p>At Solve Point, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Solve Point and how we use it.</p>
              
              <h3>Log Files</h3>
              <p>Solve Point follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>

              <h3>Cookies and Web Beacons</h3>
              <p>Like any other website, Solve Point uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            </div>
          </>
        );
      case 'contact':
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Mail size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            </div>
            <div className="prose prose-slate max-w-none mt-6">
              <p>If you have any questions about our site, advertising, or copyright issues, please feel free to contact us.</p>
              
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 not-prose mt-8">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="How can we help?"></textarea>
                  </div>
                  <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </>
        );
      case 'dmca':
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">DMCA Disclaimer</h1>
            </div>
            <div className="prose prose-slate max-w-none mt-6">
              <p>Solve Point respects the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes the copyright or other intellectual property infringement of any person.</p>
              <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, you must submit your notice in writing.</p>
            </div>
          </>
        );
      case 'terms':
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <FileText size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            </div>
            <div className="prose prose-slate max-w-none mt-6">
              <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Solve Point if you do not agree to take all of the terms and conditions stated on this page.</p>
              <h3>License</h3>
              <p>Unless otherwise stated, Solve Point and/or its licensors own the intellectual property rights for all material on Solve Point. All intellectual property rights are reserved.</p>
            </div>
          </>
        );
      case 'disclaimer':
        return (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                <Info size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
            </div>
            <div className="prose prose-slate max-w-none mt-6">
              <p>The information provided by Solve Point on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
              <h3>External Links Disclaimer</h3>
              <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-5 bg-white min-h-[60vh] animate-fade-in shadow-sm rounded-xl">
      {renderContent()}
    </div>
  );
};

export default LegalPages;
