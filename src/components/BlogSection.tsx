import React, { useState } from 'react';
import { Search, Eye, ArrowLeft, MessageSquare, Plus, FileText, Check, Calendar, Clock, Send } from 'lucide-react';
import { BlogPost, Comment } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  onSelectPost: (post: BlogPost | null) => void;
  onAddPost: (post: BlogPost) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: Comment) => void;
}

export default function BlogSection({
  posts,
  selectedPost,
  onSelectPost,
  onAddPost,
  onLikePost,
  onAddComment
}: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'technology' | 'coding' | 'design' | 'tutorials'>('all');

  // Comment form states
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');

  // Filtering implementation
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Like submit
  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onLikePost(postId);
  };

  // Comment submit
  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: commentName.trim(),
      content: commentContent.trim(),
      createdAt: new Date().toISOString()
    };

    onAddComment(postId, newComment);
    setCommentName('');
    setCommentContent('');
  };

  return (
    <div className="space-y-12 animate-fade-in" id="blog-section-root">
      {/* 🚀 CASE A: Detailed Single-post Article View */}
      {selectedPost ? (
        <article className="space-y-8 max-w-3xl mx-auto" id="full-article-view">
          {/* Back button and stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 shrink-0">
            <button
              onClick={() => onSelectPost(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
              id="back-to-articles"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles list</span>
            </button>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-slate-300" />
                <b>{selectedPost.views}</b> views
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-indigo-600 bg-indigo-55/10 px-3 py-1 rounded-md font-bold border border-indigo-100/50">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight font-sans">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 font-sans">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-150">
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rich content display */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-705 leading-relaxed font-sans text-sm md:text-base">
            {selectedPost.content.split('\n\n').map((para, i) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl font-bold text-slate-900 pt-4 font-sans tracking-tight">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1.5 font-sans">
                    {para.split('\n').map((li, index) => (
                      <li key={index}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (para.startsWith('```')) {
                const codeLines = para.split('\n').filter(line => !line.startsWith('```'));
                return (
                  <pre key={i} className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto select-all leading-relaxed shadow-sm">
                    <code>{codeLines.join('\n')}</code>
                  </pre>
                );
              }
              return (
                <p key={i} className="whitespace-pre-wrap">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Comment Stream */}
          <div className="border-t border-slate-150 pt-10 space-y-8" id="comment-board">
            <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span>Discussion Board ({selectedPost.comments.length})</span>
            </h3>

            {/* Existing comments */}
            <div className="space-y-4">
              {selectedPost.comments.length === 0 ? (
                <p className="text-xs text-slate-400 font-sans">No questions or comments posted on this article yet. Be the first to start the thread!</p>
              ) : (
                selectedPost.comments.map((com) => (
                  <div key={com.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-105-half space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 font-sans">{com.author}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(com.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-650 font-sans leading-relaxed whitespace-pre-wrap">
                      {com.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Post a comment form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 space-y-4">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">Share Your Inquiry & Feedback</h4>
              
              <form onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono text-slate-500 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full text-xs font-sans bg-slate-50 border border-slate-205 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden"
                      placeholder="e.g. Rachel Foster"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-mono text-slate-500 font-medium">Comment or Question Details</label>
                  <textarea
                    required
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    rows={3}
                    className="w-full text-xs font-sans bg-slate-50 border border-slate-205 rounded-lg p-3 text-slate-800 focus:outline-hidden"
                    placeholder="Ask about design systems, web worker threads, or project setups..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold active:scale-95 transition-all shadow-xs"
                    id="submit-comment"
                  >
                    <span>Post Comment</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
      ) : (
        // 📚 CASE B: Main Blog Board Grid
        <div className="space-y-12">
          {/* Header */}
          <section className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 font-bold">Articles & Columns</span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">The Technical Dev Journal</h2>
            <p className="text-sm text-slate-500 font-sans">
              Conversations centering on user experience principles, database stability models, component rendering chains, and responsive interface setups.
            </p>
          </section>

          {/* Toolbar: Category pills + Search input filter */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-205 items-center">
              {[
                { id: 'all', label: 'All Articles' },
                { id: 'coding', label: 'Coding / React' },
                { id: 'technology', label: 'System Design' },
                { id: 'design', label: 'UI & Styling' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveCategory(pill.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === pill.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by text..."
                className="w-full text-xs font-sans bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                id="blog-search-query"
              />
            </div>
          </section>

          {/* Blog Feed Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="articles-feed-grid">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                onClick={() => onSelectPost(post)}
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-[10px] font-bold tracking-widest uppercase">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Article Footer Stats */}
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-slate-300" />
                    <b>{post.views}</b> Views
                  </span>
                </div>

              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="md:col-span-3 text-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <span className="text-sm text-slate-450 font-sans">No technical articles found aligning with query settings. Explore other keywords!</span>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
