import { useState, useEffect } from 'react';
import { Code, Menu, X, ArrowRight, Laptop, Briefcase, FileText, Send, Sparkles, Star, ChevronDown, PhoneCall, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Project, BlogPost, Service, Experience, Skill, ContactMessage, Comment } from './types';
import { INITIAL_EXPERIENCES, INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_BLOG_POSTS, INITIAL_SKILLS } from './data';

// Import sub-sections
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Logo from './components/Logo';

const NAV_SERVICES = [
  { id: 'website-development', label: 'Website Development' },
  { id: 'custom-web-applications', label: 'Custom Web Applications' },
  { id: 'business-process-automation', label: 'Business & Automation' },
  { id: 'crm-setup-customization', label: 'CRM Setup & Customization' },
  { id: 'payment-gateway-integration', label: 'Payment Gateway' },
  { id: 'website-maintenance', label: 'Website Maintenance' },
  { id: 'cloud-solutions', label: 'Cloud Solutions' },
  { id: 'deployment-devops', label: 'Deployment & DevOps' },
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'graphic-design', label: 'Graphic Design' },
];

export default function App() {
  // Navigation & coordination states
  const [currentSection, setCurrentSection] = useState<'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatedQuoteSubject, setCalculatedQuoteSubject] = useState('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<string | null>(null);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  // Data states backed by persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Project[];
        // Sync vital details (like demoUrl and imageUrl) from INITIAL_PROJECTS in case they were updated
        const syncedParsed = parsed.map(p => {
          const matchingInit = INITIAL_PROJECTS.find(init => init.id === p.id);
          if (matchingInit) {
            return {
              ...p,
              demoUrl: matchingInit.demoUrl,
              imageUrl: matchingInit.imageUrl
            };
          }
          return p;
        });

        const ids = new Set(syncedParsed.map(p => p.id));
        const missing = INITIAL_PROJECTS.filter(p => !ids.has(p.id));
        if (missing.length > 0) {
          // Keep internal order matching INITIAL_PROJECTS, appending at correct locations
          const merged = [...syncedParsed];
          INITIAL_PROJECTS.forEach((initProj, i) => {
            if (!ids.has(initProj.id)) {
              // Prepend or insert at correct theoretical index so new ones go first
              merged.splice(i, 0, initProj);
            }
          });
          localStorage.setItem('portfolio_projects_v5', JSON.stringify(merged));
          return merged;
        }
        localStorage.setItem('portfolio_projects_v5', JSON.stringify(syncedParsed));
        return syncedParsed;
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const hasResetViews = localStorage.getItem('blog_views_reset_v2');
    const saved = localStorage.getItem('portfolio_blog_posts');
    if (saved && hasResetViews) {
      try {
        const parsed = JSON.parse(saved) as BlogPost[];
        let modified = false;
        const migrated = parsed.map(post => {
          if (post.imageUrl && post.imageUrl.includes('picsum.photos')) {
            modified = true;
            const original = INITIAL_BLOG_POSTS.find(p => p.id === post.id);
            if (original) {
              return { ...post, imageUrl: original.imageUrl };
            }
          }
          return post;
        });
        if (modified) {
          localStorage.setItem('portfolio_blog_posts', JSON.stringify(migrated));
          return migrated;
        }
        return parsed;
      } catch (e) {
        return INITIAL_BLOG_POSTS;
      }
    }

    // Force reset all views to 0 for a clean start as requested
    localStorage.setItem('blog_views_reset_v2', 'true');
    let postsToUse = INITIAL_BLOG_POSTS;
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as BlogPost[];
        postsToUse = parsed.map(post => ({ ...post, views: 0 }));
      } catch (e) {
        postsToUse = INITIAL_BLOG_POSTS.map(post => ({ ...post, views: 0 }));
      }
    } else {
      postsToUse = INITIAL_BLOG_POSTS.map(post => ({ ...post, views: 0 }));
    }
    localStorage.setItem('portfolio_blog_posts', JSON.stringify(postsToUse));
    return postsToUse;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('portfolio_projects_v5', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('portfolio_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Dynamic SEO compliance updates
  useEffect(() => {
    let title = 'Tech Ninja | Powerful Websites, Systems & Digital Solutions';
    let description = 'Tech Ninja builds powerful websites, high-performance systems, custom CRMs, payment gateways, and custom digital solutions designed to drive growth, efficiency, and real business results.';

    if (currentSection === 'about') {
      title = 'About Us | Tech Ninja';
      description = 'Learn more about Tech Ninja - our journey, core values, and dedication to building scalable, responsive visual paradigms and custom systems for business growth.';
    } else if (currentSection === 'services') {
      if (selectedServiceDetail) {
        const formatted = selectedServiceDetail
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        title = `${formatted} | Tech Ninja Services`;
        description = `Professional ${formatted} by Tech Ninja. Scalable, tested, and optimized to drive growth, efficiency, and real business results.`;
      } else {
        title = 'Exclusive IT Services | Tech Ninja';
        description = 'Explore professional high-performance CRM design, website development, custom payment gateways, and automated DevOps configurations engineered by Tech Ninja.';
      }
    } else if (currentSection === 'portfolio') {
      if (selectedProject) {
        title = `${selectedProject.title} | Tech Ninja Portfolio`;
        description = `${selectedProject.description || 'Enterprise project build and high-performance system configuration details.'} Done by Tech Ninja.`;
      } else {
        title = 'Portfolio | Tech Ninja Solutions';
        description = 'Browse our structural system integrations, responsive interface applications, and high-performance digital projects built by Tech Ninja.';
      }
    } else if (currentSection === 'blog') {
      if (selectedPost) {
        title = `${selectedPost.title} | Tech Ninja Blog`;
        description = `${selectedPost.excerpt || 'Technical article, engineering insights, and dev log by Tech Ninja.'}`;
      } else {
        title = 'Technical Journal | Tech Ninja Blog';
        description = 'Read our technical articles and dev logs about scalable codebases, modern API integrations, and optimal web paradigms.';
      }
    } else if (currentSection === 'contact') {
      title = 'Contact Us | Get in Touch with Tech Ninja';
      description = 'Reach out to Tech Ninja today to request quote estimates, project builds, system tuning, or digital solution consultation.';
    }

    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update Open Graph and Twitter tags for fully compliant SEO
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

  }, [currentSection, selectedServiceDetail, selectedProject, selectedPost]);

  // Section transition helper ensuring smooth scrolls
  const handleNavigate = (section: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact', serviceId?: string) => {
    setCurrentSection(section);
    if (section === 'services' && serviceId) {
      setSelectedServiceDetail(serviceId);
    } else if (section === 'services') {
      setSelectedServiceDetail(null);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State modification events
  const handleAddProject = (p: Project) => {
    setProjects((prev) => [p, ...prev]);
  };

  const handleAddSkill = (s: Skill) => {
    setSkills((prev) => [...prev, s]);
  };

  const handleAddBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
  };

  // Direct estimates to contact
  const handleEstimateQuerySubmit = (subject: string) => {
    setCalculatedQuoteSubject(subject);
    handleNavigate('contact');
  };

  const handleLikePost = (postId: string) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );

    // Sync immersion post details if open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleAddComment = (postId: string, comment: Comment) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      })
    );

    // Sync immersion post details if open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? { ...prev, comments: [...prev.comments, comment] }
          : null
      );
    }
  };

  const handleAddMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'unread'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      unread: true
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const handleClearMessages = () => {
    setContactMessages([]);
  };

  const incrementPostViews = (post: BlogPost) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
    );
    setSelectedPost({ ...post, views: post.views + 1 });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-indigo-100 selection:text-indigo-900" id="application-container-root">
      
      {/* Dynamic Header Toolbar Navigation */}
      <header className={`sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-200 ${mobileMenuOpen ? 'z-[100]' : 'z-50'}`} id="global-navbar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div
            onClick={() => handleNavigate('home')}
            className="cursor-pointer group select-none"
            id="navbar-brand-logo"
          >
            <Logo />
          </div>

          {/* Regular Desktop Links Grid */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-150 relative" id="desktop-links">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'blog', label: 'Blog' },
              { id: 'contact', label: 'Contact Us' }
            ].map((tab) => {
              if (tab.id === 'services') {
                return (
                  <div
                    key={tab.id}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    id="desktop-services-dropdown-container"
                  >
                    <button
                      onClick={() => {
                        handleNavigate('services');
                        setServicesDropdownOpen(false);
                      }}
                      className={`px-4 py-2 font-sans text-sm font-semibold tracking-wide rounded-lg transition-all cursor-pointer ${
                        currentSection === 'services'
                          ? 'bg-white text-indigo-700 shadow-xs border-slate-100 font-extrabold'
                          : 'text-slate-650 hover:text-slate-900'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>

                    {/* Desktop Dropdown Content */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-50 animate-fade-in" id="services-desktop-dropdown">
                        <div className="px-1 py-1 space-y-0.5 overflow-y-auto max-h-[350px]">
                          {NAV_SERVICES.map((srv) => (
                            <button
                              key={srv.id}
                              onClick={() => {
                                handleNavigate('services', srv.id);
                                setServicesDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all ${
                                selectedServiceDetail === srv.id
                                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                                  : 'text-slate-655 hover:bg-slate-50 hover:text-indigo-700'
                              }`}
                            >
                              <span>{srv.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.id as any)}
                  className={`px-4 py-2 font-sans text-sm font-semibold tracking-wide rounded-lg transition-all cursor-pointer ${
                    currentSection === tab.id
                      ? 'bg-white text-indigo-700 shadow-xs border-slate-100 font-extrabold'
                      : 'text-slate-650 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Consultation Portal call-to-action Button & Call Us Now Widget */}
          <div className="hidden lg:flex items-center gap-6 select-none" id="cta-header-group">
            <button
              onClick={() => handleNavigate('contact')}
              className="inline-flex items-center gap-1 px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-97 border border-slate-950"
              id="cta-quick-booking"
            >
              <span>Get in Touch</span>
            </button>

            {/* Call Us Now Widget styled matching the mockup perfectly */}
            <a 
              href="tel:+254707440516"
              className="flex items-center gap-2.5 cursor-pointer group hover:opacity-95 transition-all text-left"
              id="header-call-us-widget"
            >
              {/* Concentric Double Circle Icon Container */}
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full border border-slate-300/80 p-0.5 group-hover:border-slate-500 transition-all bg-white" id="call-circle-outer">
                <div className="flex items-center justify-center w-full h-full rounded-full bg-slate-950 text-white shadow-sm group-hover:bg-slate-900 transition-all" id="call-circle-inner">
                  <PhoneCall className="w-4 h-4 text-white" fill="none" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 font-extrabold font-sans uppercase tracking-wider leading-none mb-1" id="call-label">Call Us Now</span>
                <span className="text-sm font-black text-slate-900 font-sans tracking-tight leading-none" id="call-number">+(254) 707 440516</span>
              </div>
            </a>
          </div>

          {/* Mobile hamburger toggle button */}
          <div className="flex lg:hidden select-none">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              id="mobile-drawer-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile slide-in drawer Menu with Backdrop */}
      {/* Dark blur backdrop */}
      <div
        className={`fixed inset-0 z-[110] bg-black/75 backdrop-blur-xs lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        id="mobile-drawer-backdrop"
      />

      {/* Sidebar drawer container */}
      <div
        className={`fixed inset-y-0 right-0 z-[120] w-full max-w-[340px] bg-[#111215] text-white shadow-2xl py-6 px-6 overflow-y-auto flex flex-col justify-between border-l-4 border-indigo-500 lg:hidden transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-drawer"
      >
        <div className="space-y-6">
          {/* Header Brand & Close Button */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                handleNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer group"
            >
              <Logo inverse={true} />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
              id="close-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Brief Brand Description summary */}
          <p className="text-xs text-slate-450 font-sans leading-relaxed pt-2">
            We deliver elite software solutions, custom corporate platforms, secure digital commerce systems, and real-time interactive web applications.
          </p>

          {/* Styled Menu Accordion Stream */}
          <nav className="space-y-4 pt-6" id="mobile-accordion-links">
            
            {/* HOME SECTION (Simple Link) */}
            <div className="border-b border-slate-800/80 pb-3">
              <div
                className="flex items-center justify-between py-1 cursor-pointer group"
                onClick={() => {
                  handleNavigate('home');
                  setMobileMenuOpen(false);
                }}
              >
                <span className={`text-[15px] font-sans font-bold tracking-wide transition-colors ${currentSection === 'home' ? 'text-indigo-400' : 'text-slate-100 group-hover:text-indigo-400'}`}>
                  Home
                </span>
              </div>
            </div>

            {/* ABOUT SECTION (Simple Link) */}
            <div className="border-b border-slate-800/80 pb-3">
              <div
                className="flex items-center justify-between py-1 cursor-pointer group"
                onClick={() => {
                  handleNavigate('about');
                  setMobileMenuOpen(false);
                }}
              >
                <span className={`text-[15px] font-sans font-bold tracking-wide transition-colors ${currentSection === 'about' ? 'text-indigo-400' : 'text-slate-100 group-hover:text-indigo-400'}`}>
                  About Us
                </span>
              </div>
            </div>

            {/* SERVICES SECTION */}
            <div className="border-b border-slate-800/80 pb-3">
              <div
                className="flex items-center justify-between py-1 cursor-pointer group"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                <span className={`text-[15px] font-sans font-bold tracking-wide transition-colors ${currentSection === 'services' ? 'text-indigo-400' : 'text-slate-100 group-hover:text-indigo-400'}`}>
                  Services
                </span>
                <span className="text-indigo-400 text-lg font-mono font-bold select-none pr-1">
                  {mobileServicesOpen ? '−' : '+'}
                </span>
              </div>
              {mobileServicesOpen && (
                <div className="pl-3 mt-2.5 space-y-2 border-l border-l-slate-800/80 max-h-[180px] overflow-y-auto animate-fade-in">
                  {NAV_SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        handleNavigate('services', srv.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left text-xs font-medium py-1 transition-colors ${
                        selectedServiceDetail === srv.id
                          ? 'text-indigo-400 font-bold'
                          : 'text-slate-400 hover:text-indigo-400'
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PORTFOLIO SECTION (Simple Link) */}
            <div className="border-b border-slate-800/80 pb-3">
              <div
                className="flex items-center justify-between py-1 cursor-pointer group"
                onClick={() => {
                  handleNavigate('portfolio');
                  setMobileMenuOpen(false);
                }}
              >
                <span className={`text-[15px] font-sans font-bold tracking-wide transition-colors ${currentSection === 'portfolio' ? 'text-indigo-400' : 'text-slate-100 group-hover:text-indigo-400'}`}>
                  Portfolio
                </span>
              </div>
            </div>

            {/* BLOG SECTION */}
            <div className="border-b border-slate-800/80 pb-3">
              <div
                className="flex items-center justify-between py-1 cursor-pointer group"
                onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
              >
                <span className={`text-[15px] font-sans font-bold tracking-wide transition-colors ${currentSection === 'blog' ? 'text-indigo-400' : 'text-slate-100 group-hover:text-indigo-400'}`}>
                  Blog
                </span>
                <span className="text-indigo-400 text-lg font-mono font-bold select-none pr-1">
                  {mobileBlogOpen ? '−' : '+'}
                </span>
              </div>
              {mobileBlogOpen && (
                <div className="pl-3 mt-2.5 space-y-2 border-l border-l-slate-800/80 animate-fade-in">
                  <button
                    onClick={() => {
                      handleNavigate('blog');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors py-1"
                  >
                    Technical Articles Core
                  </button>
                  <button
                    onClick={() => {
                      handleNavigate('blog');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors py-1"
                  >
                    Guides & Software Tutorials
                  </button>
                </div>
              )}
            </div>

            {/* CONTACT SECTION (Simple Link) */}
            <div className="border-b border-slate-800/80 pb-3">
              <div
                className="flex items-center justify-between py-1 cursor-pointer group"
                onClick={() => {
                  handleNavigate('contact');
                  setMobileMenuOpen(false);
                }}
              >
                <span className={`text-[15px] font-sans font-bold tracking-wide transition-colors ${currentSection === 'contact' ? 'text-indigo-400' : 'text-slate-100 group-hover:text-indigo-400'}`}>
                  Contact Us
                </span>
              </div>
            </div>

          </nav>
        </div>

        {/* Bottom instant engagement link or info */}
        <div className="pt-8 select-none">
          <button
            onClick={() => {
              handleNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>Instant Consultation</span>
          </button>
        </div>
      </div>

      {/* Main Structural Page Body with spacing bounds */}
      <main className="flex-1 w-full" id="root-content-space">
        
        {currentSection === 'home' && (
          <HomeSection
            onNavigate={handleNavigate}
            featuredProjects={projects.filter((p) => p.featured)}
            recentPosts={blogPosts}
            onSelectProject={(p) => {
              setSelectedProject(p);
              handleNavigate('portfolio');
            }}
            onSelectPost={(post) => {
              incrementPostViews(post);
              handleNavigate('blog');
            }}
          />
        )}

        {currentSection === 'about' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <AboutSection
              experiences={INITIAL_EXPERIENCES}
              skills={skills}
              onAddSkill={handleAddSkill}
            />
          </div>
        )}

        {currentSection === 'services' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <ServicesSection
              services={INITIAL_SERVICES}
              onNavigateToContact={handleEstimateQuerySubmit}
              selectedServiceDetail={selectedServiceDetail}
              onSelectServiceDetail={setSelectedServiceDetail}
            />
          </div>
        )}

        {currentSection === 'portfolio' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <PortfolioSection
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onAddProject={handleAddProject}
            />
          </div>
        )}

        {currentSection === 'blog' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <BlogSection
              posts={blogPosts}
              selectedPost={selectedPost}
              onSelectPost={(post) => {
                if (post) {
                  incrementPostViews(post);
                } else {
                  setSelectedPost(null);
                }
              }}
              onAddPost={handleAddBlogPost}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
            />
          </div>
        )}

        {currentSection === 'contact' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <ContactSection
              messages={contactMessages}
              onSubmitMessage={handleAddMessage}
              calculatedQuoteSubject={calculatedQuoteSubject}
              onClearMessages={handleClearMessages}
            />
          </div>
        )}

      </main>

      {/* Footer Wrapper */}
      <Footer currentSection={currentSection} onNavigate={handleNavigate} />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/254706870680"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group font-sans font-semibold text-sm"
        id="whatsapp-floating-button"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366] group-hover:scale-110 transition-transform" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
