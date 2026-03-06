
import React, { useEffect, useState } from 'react';
import { DISQUS_SHORTNAME } from '../constants';
import { MessageSquare, Send, ThumbsUp, Trash2 } from 'lucide-react';

interface CommentsProps {
  postUrl: string;
  postId: string;
  postTitle: string;
}

const Comments: React.FC<CommentsProps> = ({ postUrl, postId, postTitle }) => {
  // ----------------------------------------------------------------
  // MODE 1: DISQUS INTEGRATION
  // ----------------------------------------------------------------
  useEffect(() => {
    if (DISQUS_SHORTNAME) {
      // Define global Disqus config variable
      (window as any).disqus_config = function () {
        this.page.url = postUrl;
        this.page.identifier = postId;
        this.page.title = postTitle;
      };

      // Create script
      const script = document.createElement('script');
      script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', new Date().toString());
      script.async = true;

      // Append to body
      document.body.appendChild(script);

      return () => {
        // Cleanup function (optional, Disqus is tricky to unload completely)
        const dsq = document.getElementById('disqus_thread');
        if (dsq) dsq.innerHTML = '';
      };
    }
  }, [postUrl, postId, postTitle]);

  if (DISQUS_SHORTNAME) {
    return (
      <div className="mt-12 pt-8 border-t border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <MessageSquare size={24} className="text-blue-600" />
          Comments
        </h3>
        <div id="disqus_thread" className="min-h-[200px]"></div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // MODE 2: NATIVE UI (With LocalStorage Persistence)
  // ----------------------------------------------------------------
  return <NativeComments postId={postId} />;
};

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

const NativeComments: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  // Initial Data
  const defaultComments: Comment[] = [
    {
      id: 1,
      author: 'Alex Morgan',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Morgan&background=e2e8f0&color=64748b',
      date: '2 hours ago',
      text: 'This article was extremely helpful! Thanks for the detailed steps.',
      likes: 12
    },
    {
      id: 2,
      author: 'Sarah Jenkins',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=dbeafe&color=2563eb',
      date: '5 hours ago',
      text: 'Great insights. I have been looking for this information for a while.',
      likes: 8
    }
  ];

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`comments_${postId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      setComments(defaultComments);
    }
  }, [postId]);

  // Save to LocalStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
    }
  }, [comments, postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://ui-avatars.com/api/?name=You&background=f1f5f9&color=64748b',
      date: 'Just now',
      text: newComment,
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (id: number) => {
    setComments(comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
           <MessageSquare size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Input Form */}
      <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px] resize-none"
            placeholder="What are your thoughts?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
             <span className="text-xs text-slate-400 font-medium">Posting publicly</span>
             <button 
               type="submit"
               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               disabled={!newComment.trim()}
             >
               <Send size={16} />
               Post Comment
             </button>
          </div>
        </form>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <img 
               src={comment.avatar} 
               alt={comment.author} 
               className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0" 
             />
             <div className="flex-1">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                   <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900 text-sm">{comment.author}</h4>
                      <span className="text-xs text-slate-400 font-medium">{comment.date}</span>
                   </div>
                   <p className="text-slate-600 text-sm leading-relaxed">{comment.text}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 ml-2">
                   <button 
                     onClick={() => handleLike(comment.id)}
                     className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                   >
                     <ThumbsUp size={12} /> Like {comment.likes > 0 && `(${comment.likes})`}
                   </button>
                   <button className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                     Reply
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
