import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, PhoneCall, Star, Quote, Sparkles, Code, Briefcase, FileText, ArrowUpRight, Github, ExternalLink, Play, X, CheckCircle, Globe, Laptop, Cpu, Users, User, CreditCard, RotateCw, Cloud, Terminal, TrendingUp, Palette, Search, Compass, Rocket, Settings } from 'lucide-react';
import { Project, BlogPost } from '../types';

interface HomeSectionProps {
  onNavigate: (section: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact', serviceId?: string) => void;
  featuredProjects: Project[];
  recentPosts: BlogPost[];
  onSelectProject: (project: Project) => void;
  onSelectPost: (post: BlogPost) => void;
}

export default function HomeSection({
  onNavigate,
  featuredProjects,
  recentPosts,
  onSelectProject,
  onSelectPost
}: HomeSectionProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialsCarouselRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000",
      alt: "Corporate Technology Consulting Workshop"
    },
    {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
      alt: "Cyber Digital Network Infrastructure"
    },
    {
      url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2000",
      alt: "Collaborative Software Development & Design Layout"
    }
  ];

  // Hero slideshow auto slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5005);
    return () => clearInterval(timer);
  }, []);

  // Expertise Carousel auto scrolling slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If we've reached the end of the scroll, smoothly reset to beginning
        if (currentScroll >= maxScroll - 15) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            left: currentScroll + 374, // Approximate card width (350px) + gap (24px)
            behavior: 'smooth'
          });
        }
      }
    }, 4500); // Automatically transition every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Testimonials Carousel auto scrolling slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialsCarouselRef.current) {
        const container = testimonialsCarouselRef.current;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        let targetScroll = currentScroll + 384;
        if (currentScroll >= maxScroll - 15) {
          targetScroll = 0;
        }
        
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });

        const nextIndex = targetScroll === 0 ? 0 : Math.round(targetScroll / 384);
        setActiveTestimonialIdx(nextIndex % 4);
      }
    }, 4000); // Automatically transition testimonials every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTestimonialScroll = () => {
    if (testimonialsCarouselRef.current) {
      const container = testimonialsCarouselRef.current;
      const index = Math.round(container.scrollLeft / 384);
      if (index >= 0 && index < 4) {
        setActiveTestimonialIdx(index);
      }
    }
  };

  const handleTestimonialDotClick = (index: number) => {
    if (testimonialsCarouselRef.current) {
      testimonialsCarouselRef.current.scrollTo({
        left: index * 384,
        behavior: 'smooth'
      });
      setActiveTestimonialIdx(index);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 374; // card width + gap
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = currentScroll + (direction === 'left' ? -cardWidth : cardWidth);
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const servicesList = [
    {
      title: 'Website Development',
      sneakPeek: 'Sleek, responsive, and SEO-optimized sites built with cutting-edge frameworks to turn global web visitors into active customers.',
      icon: Globe,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fweb%20development.png?alt=media&token=a0979b0b-c766-4d10-ae41-434ad95b4342'
    },
    {
      title: 'Custom Web Applications',
      sneakPeek: 'Tailored, secure web apps, administrative portals, and data visualization tools designed for ultimate client interactivity.',
      icon: Laptop,
      imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Business Process Automation',
      sneakPeek: 'Intelligent process maps and automated sequences to eradicate error-prone manual handoffs and optimize operations.',
      icon: Cpu,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fbusiness%20process%20automation.png?alt=media&token=8807ab7b-f4bb-475e-8005-702fa320a6b5'
    },
    {
      title: 'CRM Setup & Customization',
      sneakPeek: 'Configuring agile customer pipelines, CRM environments, and synchronized client communications to boost loyalty.',
      icon: Users,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fcrm.png?alt=media&token=16b01eee-71b8-451e-a388-29e06a704379'
    },
    {
      title: 'Payment Gateway Integration',
      sneakPeek: 'Frictionless, compliant multi-provider checkout structures, dynamic invoicing, and secure billing portals.',
      icon: CreditCard,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fpayment.png?alt=media&token=ae32303c-2394-44d7-b71b-d55195bad6fa'
    },
    {
      title: 'Website Maintenance',
      sneakPeek: 'Routine vulnerability auditing, dependency upgrades, speed optimization, and high-availability uptime checks.',
      icon: RotateCw,
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Cloud Solutions',
      sneakPeek: 'Architecting resilient, elastic cloud architectures, Firestore database schemas, and highly secure cloud environments.',
      icon: Cloud,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fcloud%20solutions.png?alt=media&token=0ef35214-0365-4fac-84ad-277ce5ba60fb'
    },
    {
      title: 'Deployment & DevOps',
      sneakPeek: 'Configuring automated CI/CD deployment pipelines, managing docker container environments, and solidifying cloud scale.',
      icon: Terminal,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fdevops.png?alt=media&token=2823a12d-f5f0-4d2a-a57b-bda18d90c12d'
    },
    {
      title: 'Digital Marketing',
      sneakPeek: 'Formulating technical acquisition roadmaps, metadata tags structures, and marketing campaigns to amplify your virtual reach.',
      icon: TrendingUp,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fdigital%20marketing.png?alt=media&token=15e62b47-c868-429f-97f6-d37d79e6c7c4'
    },
    {
      title: 'Graphic Design',
      sneakPeek: 'Shaping magnificent brand identities, vectorized layout assets, custom logos, and gorgeous typographic elements.',
      icon: Palette,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fgraphic%20design.png?alt=media&token=bd01a9ac-9309-4a7b-a742-dc14673a8e92'
    }
  ];

  const clientTestimonials = [
    {
      name: "James Maina",
      role: "Director",
      rating: 5,
      comment: "Working with TechNinja completely transformed our online presence. The website is fast, professional, and has significantly improved our client inquiries."
    },
    {
      name: "Sarah Tom",
      role: "Operations Manager",
      rating: 5,
      comment: "The automation system they built saved us hours of manual work every week. Our operations are now smoother and more efficient."
    },
    {
      name: "Kevin Otieno",
      role: "Business Owner",
      rating: 5,
      comment: "They understood our needs from the start and delivered a system that perfectly fits our business. Highly reliable and professional."
    },
    {
      name: "Linda Mwikali",
      role: "Marketing Manager",
      rating: 5,
      comment: "Our lead management improved immediately after the CRM setup. We’re now tracking and converting clients much more effectively."
    }
  ];

  return (
    <div className="animate-fade-in w-full" id="home-section-root">
      {/* Hero Section styled exactly like the user's attachment & full bleed screen width */}
      <section className="relative overflow-hidden text-white min-h-[500px] md:min-h-[600px] flex items-center bg-slate-950 w-full" id="hero-banner">
        
        {/* Sliding background images with cross-fade transition */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {slides.map((slide, idx) => (
            <img
              key={idx}
              src={slide.url}
              alt={slide.alt}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-center mix-blend-luminosity transition-opacity duration-1000 ease-in-out ${
                idx === activeSlide ? 'opacity-35' : 'opacity-0'
              }`}
            />
          ))}
          {/* Subtle blue & dark gradient shading match the attachment perfectly */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-indigo-950/40" />
        </div>

        {/* Vertical Slide Indicators precisely matching the design attachment are on the right side with connecting track lines and labels on larger viewports */}
        <div className="absolute right-3 sm:right-6 md:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end" id="hero-slide-pagination">
          {/* Vertical Connecting Track Line aligned perfectly behind bullets */}
          <div className="absolute right-[11px] top-4 bottom-4 w-[1px] bg-white/10 pointer-events-none hidden sm:block" />
          
          <div className="flex flex-col gap-6" id="slides-bullet-container">
            {slides.map((slide, idx) => {
              const labels = ["01 / CONSULT", "02 / SECURITY", "03 / DEVELOP"];
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className="group relative flex items-center gap-4 cursor-pointer focus:outline-none select-none text-right flex-row-reverse"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {/* Bullet wrapper to align circles */}
                  <div className="relative flex h-6 w-6 items-center justify-center shrink-0">
                    {idx === activeSlide ? (
                      <>
                        <span className="absolute inline-flex h-full w-full rounded-full border border-blue-500/80 animate-ping opacity-25" />
                        <span className="absolute inline-flex h-[18px] w-[18px] rounded-full border border-blue-500" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                      </>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-white/30 group-hover:bg-blue-400 group-hover:scale-125 transition-all duration-300" />
                    )}
                  </div>
                  
                  {/* Subtle Premium Hover/Active labels next to bullets - keeps the right side highly decorated on large screen sizes */}
                  <div className="hidden md:flex flex-col leading-none">
                    <span className={`font-mono text-[10px] tracking-[0.2em] font-semibold transition-all duration-300 ${
                      idx === activeSlide ? 'text-blue-400 -translate-x-1' : 'text-slate-400/40 group-hover:text-slate-300 group-hover:-translate-x-0.5'
                    }`}>
                      {labels[idx]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Floating Brand Ribbon Decorator on Wide Screen viewports (xl+) */}
        <div className="absolute right-4 top-0 bottom-0 w-8 hidden xl:flex flex-col items-center justify-between py-12 z-20 pointer-events-none select-none text-[8px] font-mono tracking-[0.4em] uppercase text-slate-500 border-l border-white/5" id="right-ribbon-decor">
          <div className="rotate-90 origin-center whitespace-nowrap translate-y-8 font-extrabold text-blue-500/70">
            NINJA.SYS // ONLINE
          </div>
          <div className="rotate-90 origin-center whitespace-nowrap -translate-y-8 tracking-[0.3em] font-light text-slate-600">
            SECURE DIRECTIVE CYCLE
          </div>
        </div>

        {/* Ambient background glow elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none z-1" />



        {/* Responsive dual grid alignment: Spans 12 columns. Text on the left, high-fidelity monitoring widget on the right */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-32 py-16 md:py-24 lg:py-28 z-20 w-full grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero texts spanning 7 columns */}
          <div className="space-y-7 lg:col-span-7">
            {/* Technology Consultancy capsule tag matching attachment */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-white text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] select-none" id="tech-consult-tag">
              <span className="w-4 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Technology Consultancy</span>
            </div>

            {/* Unleash Your Digital Potential Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6.5xl font-sans font-black tracking-tight text-white leading-[1.1] max-w-3xl" id="hero-headline">
              Unleash Your <br className="hidden sm:inline" />
              <span className="text-blue-500">Digital Potential</span>
            </h1>

            {/* Requested description paragraph */}
            <p className="text-base md:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl font-light" id="hero-description">
              Tech Ninja delivers cutting-edge IT solutions including Web Development, Custom Software Development, Web Hosting, Digital Marketing and Graphics Design.
            </p>

            {/* Requested CTA Buttons side by side with modern styling */}
            <div className="flex flex-wrap items-center gap-4 pt-4" id="hero-action-buttons">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-650 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
                id="cta-contact-btn"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg inline-flex items-center gap-2 transition-all border border-slate-700 active:scale-95 cursor-pointer backdrop-blur-md"
                id="cta-projects-btn"
              >
                <span>Browse Projects</span>
              </button>
            </div>
          </div>

          {/* Right Side Column containing high-fidelity Glassmorphic Tech Monitor to fill the previously plain viewport space */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-4 animate-fade-in pl-6" id="hero-right-widget">
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              {/* Background accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
              
              {activeSlide === 0 && (
                <div className="space-y-4 animate-fade-in" id="widget-slide-0">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">SISTEM INTEGRATION</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">ACTIVE SLA</span>
                  </div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Consultancy Dashboard</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Evaluating enterprise transaction speeds & refactoring digital latency to absolute zero.
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Refactoring Pipeline Success</span>
                      <span className="text-blue-400">98.4%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[98.4%]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Updated just now // Node 04</span>
                  </div>
                </div>
              )}

              {activeSlide === 1 && (
                <div className="space-y-4 animate-fade-in" id="widget-slide-1">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">CYBER SECURITY</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[10px]">SECURED</span>
                  </div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Enterprise Integrity</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Hardening database boundaries with multi-tenant Firestore rule directives & token verification.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono text-slate-400">
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="text-slate-500 uppercase">LATENCY</div>
                      <div className="text-emerald-400 text-xs font-bold font-mono">14ms average</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="text-slate-500 uppercase">INTEGRIITY</div>
                      <div className="text-indigo-400 text-xs font-bold font-mono">ISO 27001 SEC</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSlide === 2 && (
                <div className="space-y-4 animate-fade-in" id="widget-slide-2">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">DEVELOP CYCLE</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[10px]">COMPILED</span>
                  </div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Optimized Tech Stack</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Building lightweight bundles via React 18, TypeScript, and high-performance serverless containers.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {['React 18', 'TypeScript', 'Tailwind', 'Cloud Run', 'Firestore'].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick trust metrics subtitle pill below the active widget */}
            <div className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/2 backdrop-blur-xs flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>Zero Trust Architecture Verified</span>
              </span>
              <span className="text-[10px] text-blue-400 font-bold">100%</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive 'How It Works' Workflow Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in" id="how-it-works-modal">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl animate-scale-up">
            
            {/* Close Button */}
            <button
               onClick={() => setIsVideoModalOpen(false)}
               className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full transition-all cursor-pointer z-20"
               id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#4F46E5] dark:text-indigo-400 font-bold">Client Success Story</span>
              <h3 className="text-xl md:text-2xl font-black text-white">Our Strategic Client Feedback</h3>
              <p className="text-xs text-slate-400 max-w-lg">Watch how our customized architectures, streamlined systems, and elite tech delivery empower dynamic businesses.</p>
            </div>

            {/* Dynamic HTML5 Video Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl relative">
              <video 
                src="https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/home%20video.mp4?alt=media&token=bb364949-891f-4381-95f3-db0b946812af"
                controls
                autoPlay
                className="w-full h-full object-contain"
                playsInline
                referrerPolicy="no-referrer"
                id="client-feedback-video"
              ></video>
            </div>

            {/* Bottom Interaction */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-sans font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>99.9% Client SLA Success Rate Verified</span>
              </div>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onNavigate('contact');
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Let's Start Your Solution
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Alignment Container for first part of landing components */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-6 space-y-16">

        {/* Metrics Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4" id="metrics-panel">
        {[
          { icon: Code, value: '7+', label: 'Years Experience', color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
          { icon: Briefcase, value: '30+', label: 'Projects Completed', color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
          { icon: FileText, value: '15+', label: 'Articles Published', color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
          { icon: Sparkles, value: '99.9%', label: 'Uptime & Delivery', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' }
        ].map((met, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center space-y-2">
            <div className={`p-3 rounded-xl border ${met.color}`}>
              <met.icon className="w-5 h-5" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">{met.value}</span>
            <span className="text-sm text-slate-500 font-sans font-medium">{met.label}</span>
          </div>
        ))}
      </section>

      {/* Redesigned What We Do / Our Expertise Carousel with auto slides */}
      <section className="bg-[#0B0F19] rounded-[2.5rem] p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden border border-slate-800 shadow-2xl my-4 w-full animate-fade-in" id="exclusive-it-banner">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        
        {/* Intricately designed Custom Tech Constellation Vector Mesh overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 select-none" id="network-tech-pattern">
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2050/svg">
            <defs>
              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#818CF8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nodeGlowGreen" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                <stop offset="30%" stopColor="#10B981" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Mesh Lines */}
            <path d="M 50,110 L 150,190 L 320,130 L 450,230 L 600,110 L 780,260 L 920,130 L 1100,290 L 1250,160 L 1400,230" stroke="url(#lineGrad1)" strokeWidth="1.2" />
            <path d="M 150,190 L 250,360 L 450,230 L 520,410 L 780,260 L 890,465 L 1100,290 L 1320,420" stroke="url(#lineGrad2)" strokeWidth="1" />
            <path d="M 320,130 L 250,360" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.25" />
            <path d="M 600,110 L 520,410" stroke="#818CF8" strokeWidth="0.8" strokeOpacity="0.2" />
            <path d="M 920,130 L 890,465" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.2" />
            <path d="M 1250,160 L 1320,420" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.15" />
            
            {/* Secondary diagonal linkages */}
            <path d="M 250,360 L 520,390 M 520,410 L 890,465 M 890,465 L 1320,420" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="3,3" strokeOpacity="0.3" />
            
            {/* White glowing nodes */}
            <circle cx="50" cy="110" r="8" fill="url(#nodeGlow)" />
            <circle cx="50" cy="110" r="2.5" fill="#ffffff" />
            
            <circle cx="150" cy="190" r="10" fill="url(#nodeGlow)" />
            <circle cx="150" cy="190" r="3" fill="#ffffff" />

            <circle cx="320" cy="130" r="8" fill="url(#nodeGlow)" />
            <circle cx="320" cy="130" r="2.5" fill="#ffffff" />

            <circle cx="450" cy="230" r="7" fill="url(#nodeGlowGreen)" />
            <circle cx="450" cy="230" r="2" fill="#ffffff" />

            <circle cx="600" cy="110" r="11" fill="url(#nodeGlow)" />
            <circle cx="600" cy="110" r="3.5" fill="#ffffff" />

            <circle cx="780" cy="260" r="9" fill="url(#nodeGlowGreen)" />
            <circle cx="780" cy="260" r="2.5" fill="#ffffff" />

            <circle cx="920" cy="130" r="8" fill="url(#nodeGlow)" />
            <circle cx="920" cy="130" r="2.5" fill="#ffffff" />

            <circle cx="1100" cy="290" r="10" fill="url(#nodeGlow)" />
            <circle cx="1100" cy="290" r="3" fill="#ffffff" />

            <circle cx="1250" cy="160" r="7" fill="url(#nodeGlowGreen)" />
            <circle cx="1250" cy="160" r="2" fill="#ffffff" />

            <circle cx="1400" cy="230" r="10" fill="url(#nodeGlow)" />
            <circle cx="1400" cy="230" r="3" fill="#ffffff" />

            <circle cx="250" cy="360" r="7" fill="url(#nodeGlow)" />
            <circle cx="250" cy="360" r="2" fill="#ffffff" opacity="0.8" />

            <circle cx="520" cy="410" r="8" fill="url(#nodeGlow)" />
            <circle cx="520" cy="410" r="2.5" fill="#ffffff" opacity="0.8" />

            <circle cx="890" cy="465" r="7" fill="url(#nodeGlowGreen)" />
            <circle cx="890" cy="465" r="2" fill="#ffffff" opacity="0.8" />

            <circle cx="1320" cy="420" r="7" fill="url(#nodeGlow)" />
            <circle cx="1320" cy="420" r="2" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
        
        {/* Header Block with navigation controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/60 relative z-10">
          <div className="space-y-3">
            {/* Outline pill shaped badge custom built like screenshot */}
            <div className="inline-flex items-center gap-2 mb-1 select-none">
              <div className="w-6 h-3.5 rounded-full border-2 border-indigo-550/80 bg-indigo-500/15 flex items-center px-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#4F46E5] dark:text-indigo-400">SERVICES WE&#39;RE OFFERING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight leading-none">
              Exclusive IT Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl leading-relaxed">
              Premium scale-ready technology offerings designed to accelerate performance, maximize operational margins, and secure customer trust.
            </p>
          </div>

          {/* Circle Navigation controls matching screenshot */}
          <div className="flex gap-2.5">
            <button
              onClick={() => handleScroll('left')}
              className="w-11 h-11 rounded-full border border-slate-700 bg-slate-900/40 text-white hover:text-white hover:bg-slate-800 hover:border-slate-500 transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-md"
              title="Scroll Left"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-11 h-11 rounded-full border border-slate-700 bg-slate-900/40 text-white hover:text-white hover:bg-slate-800 hover:border-slate-500 transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-md"
              title="Scroll Right"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Container for service cards */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-10"
          id="services-carousel-track"
        >
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className="snap-start shrink-0 w-[290px] xs:w-[320px] sm:w-[350px] bg-slate-900/35 border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col justify-between h-[450px] relative group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                {/* Top Graphic Area */}
                <div className="relative h-56 sm:h-60 shrink-0">
                  <div className="w-full h-full overflow-hidden rounded-t-3xl">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none rounded-t-3xl" />
                  
                  {/* Floating overlap square badge */}
                  <div className="absolute bottom-0 right-6 translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl border border-indigo-500/40 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>

                {/* Bottom White Block with Title and Details */}
                <div className="bg-white flex-1 p-5 sm:p-6 flex flex-col justify-between border-t border-slate-100 text-slate-900">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => onNavigate('services', service.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
                      className="text-lg sm:text-xl font-black text-slate-900 font-sans hover:text-indigo-600 transition-colors cursor-pointer inline-block leading-snug"
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                      {service.sneakPeek}
                    </p>
                  </div>

                  {/* Bottom line: feature indicators or exploration guides */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => onNavigate('services', service.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner matching user screenshot exactly */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[1.25rem] md:rounded-[2rem] overflow-hidden shadow-xl shadow-slate-100/40 dark:shadow-none flex flex-col md:flex-row items-stretch min-h-[140px] md:h-44 relative mt-10 animate-fade-in" id="cta-help-banner">
        {/* Left Area: Suit / Global Globe Graphic Layout */}
        <div className="relative w-full md:w-[45%] bg-[#0B1530] overflow-hidden min-h-[140px] md:min-h-0 flex items-center shrink-0">
          {/* Global network background design */}
          <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80')` }} />
          {/* Suit Overlay */}
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" 
            alt="Consultant Support"
            className="absolute inset-y-0 right-0 w-3/4 object-cover object-left opacity-90 mix-blend-lighten"
            referrerPolicy="no-referrer"
          />
          {/* Deep blue overlay tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-transparent mix-blend-multiply" />
        </div>

        {/* Diagonal Slanted Separator with phone badge overlay */}
        <div className="hidden md:block absolute left-[45%] top-0 bottom-0 w-12 -translate-x-1/2 z-10 overflow-visible pointer-events-none">
          {/* Slant Divider */}
          <div className="w-full h-full bg-white dark:bg-slate-900 origin-bottom-left skew-x-12 transform border-l border-slate-100 dark:border-slate-800" />
          
          {/* High polished nested Blue Phone Badge centered on slant */}
          <a
            href="tel:+254706870680"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-indigo-650 hover:bg-indigo-755 transition-all flex items-center justify-center shadow-lg shadow-indigo-600/30 border-4 border-white dark:border-slate-900 cursor-pointer pointer-events-auto"
            title="Call Support"
          >
            <PhoneCall className="w-5 h-5 text-white animate-bounce" />
          </a>
        </div>

        {/* Mobile nested Phone Badge directly positioned relative */}
        <div className="md:hidden flex justify-center -mt-7 z-10">
          <a
            href="tel:+254706870680"
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg shadow-indigo-600/30 border-4 border-white dark:border-slate-900 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-white animate-pulse" />
          </a>
        </div>

        {/* Right Area: Clean Title and Number layout with chemical/hex pattern background */}
        <div className="flex-1 bg-white dark:bg-slate-900 p-6 md:p-8 md:pl-16 flex flex-col justify-center items-center md:items-start text-center md:text-left relative overflow-hidden">
          {/* Beautifully Infused Tech Hex Network SVG Background */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-20 dark:opacity-35" id="bottom-cta-tech-mesh">
            <svg className="w-full h-full" viewBox="0 0 800 176" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Define subtle gradients matching theme */}
              <defs>
                <linearGradient id="ctaLineGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
                </linearGradient>
                <radialGradient id="ctaNodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Connected Molecular/Hexagonal Paths */}
              <path d="M 500,40 L 530,20 L 560,40 L 560,70 L 530,90 L 500,70 Z" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              <path d="M 560,40 L 590,20 L 620,40 L 620,70 L 590,90 L 560,70" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              <path d="M 530,90 L 530,120 L 560,140 L 590,120 L 590,90" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              
              <path d="M 620,40 L 650,20 L 680,40 L 680,70 L 650,90 L 620,70" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              <path d="M 590,120 L 620,140 L 650,120 L 650,90" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              <path d="M 620,140 L 620,170" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              
              <path d="M 680,40 L 710,20 L 740,40 L 740,70 L 710,90 L 680,70" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              <path d="M 650,120 L 680,140 L 710,120 L 710,90" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              
              <path d="M 740,40 L 770,20 L 800,40 L 800,70 L 770,90 L 740,70" stroke="url(#ctaLineGrad)" strokeWidth="1" />
              <path d="M 710,120 L 740,140 L 770,120 L 770,90" stroke="url(#ctaLineGrad)" strokeWidth="1" />

              {/* Some additional constellation lines linking down */}
              <path d="M 450,80 L 500,70 M 500,40 L 480,10" stroke="url(#ctaLineGrad)" strokeWidth="1" strokeDasharray="3,3" />

              {/* Glowing circular joint nodes at connection points */}
              <circle cx="530" cy="20" r="5" fill="url(#ctaNodeGlow)" />
              <circle cx="530" cy="20" r="1.5" fill="#4F46E5" />

              <circle cx="560" cy="40" r="4" fill="url(#ctaNodeGlow)" />
              <circle cx="560" cy="40" r="1.2" fill="#4F46E5" />

              <circle cx="590" cy="90" r="5" fill="url(#ctaNodeGlow)" />
              <circle cx="590" cy="90" r="1.5" fill="#4F46E5" />

              <circle cx="620" cy="70" r="4" fill="url(#ctaNodeGlow)" />
              <circle cx="620" cy="70" r="1.2" fill="#4F46E5" />

              <circle cx="650" cy="120" r="5" fill="url(#ctaNodeGlow)" />
              <circle cx="650" cy="120" r="1.5" fill="#4F46E5" />

              <circle cx="680" cy="70" r="5" fill="url(#ctaNodeGlow)" />
              <circle cx="680" cy="70" r="1.5" fill="#4F46E5" />

              <circle cx="710" cy="90" r="5" fill="url(#ctaNodeGlow)" />
              <circle cx="710" cy="90" r="1.5" fill="#4F46E5" />

              <circle cx="740" cy="140" r="4" fill="url(#ctaNodeGlow)" />
              <circle cx="740" cy="140" r="1.2" fill="#4F46E5" />

              <circle cx="770" cy="90" r="5" fill="url(#ctaNodeGlow)" />
              <circle cx="770" cy="90" r="1.5" fill="#4F46E5" />
            </svg>
          </div>
          
          <div className="relative z-10 space-y-1">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              Need Any Help?
            </h3>
            <a 
              href="tel:+254706870680" 
              className="block text-2xl md:text-3xl font-black text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-sans tracking-tight transition-colors"
            >
              (+254) 706 870680
            </a>
          </div>
        </div>
      </div>
      </div>

      {/* Full-width Showcase Tech Stack Ticker banner */}
      <section className="bg-[#0F172B] border-y border-slate-900/50 py-12 w-full my-8" id="tech-ticker-banner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-mono block">Trusted Engineering Stack</span>
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-3.5 lg:gap-2.5 xl:gap-4 overflow-x-auto lg:overflow-visible py-2 lg:py-0">
            {['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Firebase', 'Tailwind CSS v4', 'PostgreSQL', 'Docker'].map((tech, idx) => (
              <span key={idx} className="font-sans font-semibold text-xs lg:text-[11px] xl:text-sm tracking-wide bg-slate-800/45 text-slate-200 px-3 py-1.5 lg:px-2.5 lg:py-1.5 rounded-lg border border-slate-700/50 shadow-xs hover:border-slate-500 hover:bg-slate-800/80 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-default whitespace-nowrap">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* Our Development Process Section */}
      <section className="bg-slate-50 border-b border-slate-100 py-20 relative overflow-hidden" id="our-development-process">
        {/* Subtle grid pattern background watermark */}
        <div className="absolute inset-0 opacity-40 pointer-events-none select-none" id="process-bg-grid">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
          {/* Header pill & title */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-1 select-none">
              <div className="w-7 h-4 rounded-full border-2 border-indigo-600/80 bg-indigo-550/10 flex items-center px-0.5">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              </div>
              <span className="text-[11px] sm:text-xs uppercase font-mono font-black tracking-widest text-[#4F46E5]">WORKING PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-slate-900 font-sans tracking-tight leading-none">
              Our Development Process
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-sans leading-relaxed max-w-2xl mx-auto">
              Our structured approach guarantees seamless iterations, continuous verification, and rapid custom deployments for high-scale environments.
            </p>
          </div>

          {/* Cards & Dotted Lines Container */}
          <div className="relative mt-12" id="process-steps-container">
            {/* Curved connecting SVG path visible on desktop only */}
            <div className="hidden lg:block absolute left-[12%] right-[12%] top-[30%] -translate-y-1/2 pointer-events-none z-0">
              <svg className="w-full h-24" viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path 
                  d="M 10 50 C 200 -30, 200 130, 400 50 C 600 -30, 600 130, 790 50" 
                  stroke="#4F46E5" 
                  strokeWidth="2" 
                  strokeDasharray="6 6" 
                  strokeOpacity="0.3"
                  fill="none" 
                />
              </svg>
            </div>

            {/* Grid of four process items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Requirements Gathering",
                  desc: "Collaborative discovery sessions to refine architectural targets, identify user journeys, and specify performance metrics.",
                  icon: Search
                },
                {
                  step: "02",
                  title: "Design and Planning",
                  desc: "Drafting high-fidelity UI blueprints, mapping secure relational database schemas, and defining unified state managers.",
                  icon: Compass
                },
                {
                  step: "03",
                  title: "Development and Testing",
                  desc: "Crafting modern clean TypeScript code alongside rigorous automated testing protocols to guarantee robust functionality.",
                  icon: Code
                },
                {
                  step: "04",
                  title: "Deployment and Maintenance",
                  desc: "Deploying high-availability infrastructure with robust CI/CD, constant version upgrades, and pro-active live performance tuning.",
                  icon: Rocket
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex flex-col items-center group relative p-4 transition-all" id={`process-step-item-${item.step}`}>
                    {/* Circle Node with Hover Effects */}
                    <div className="relative flex items-center justify-center w-26 h-26 sm:w-28 sm:h-28 rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-[#4F46E5] group-hover:shadow-md group-hover:shadow-indigo-500/5 transition-all duration-300 pointer-events-auto">
                      
                      {/* Floating Step Number */}
                      <span className="absolute -top-1.5 -left-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 text-white font-mono text-xs font-black shadow-xs select-none">
                        {index + 1}
                      </span>
                      
                      {/* Icon with beautiful color transitions */}
                      <Icon className="w-9 h-9 text-[#4F46E5] group-hover:text-indigo-700 transition-colors" strokeWidth={1.5} />
                    </div>

                    {/* Step label representing the user content with larger fonts */}
                    <div className="mt-6 text-center space-y-2 max-w-[270px]">
                      <span className="text-xs sm:text-[13px] font-mono font-bold tracking-wider text-indigo-600 uppercase">
                        STEP {item.step}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 font-sans leading-tight group-hover:text-[#4F46E5] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic auto-sliding Testimonials Section matching user image layout */}
      <section className="bg-[#0B0F19] text-white border-y border-slate-900/40 overflow-hidden w-full py-16 relative" id="client-feedback-testimonials">
        {/* Beautiful high-fidelity 3D cyber-wave light-line pattern matching reference image */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" id="cyber-wave-mesh-bg">
          <svg className="w-full h-full min-w-[1440px] opacity-35 dark:opacity-50" viewBox="0 0 1440 450" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cyberWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="65%" stopColor="#60A5FA" stopOpacity="0.7" />
                <stop offset="85%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.05" />
              </linearGradient>
              <radialGradient id="waveDotGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
                <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Render 14 parallel beautifully curving flowing lanes using offset loops */}
            {[...Array(15)].map((_, i) => {
              const offset = i * 16;
              const startY = 30 + offset * 0.8;
              const ctrl1Y = 320 + offset * 0.35;
              const ctrl2Y = 15 + offset * 0.85;
              const endY = 390 + (15 - i) * 8;
              
              const dPath = `M -50,${startY} 
                            C 300,${startY + 90} 
                              550,${ctrl1Y} 
                              850,${ctrl2Y} 
                            C 1050,${ctrl2Y - 110} 
                              1250,${endY - 50} 
                              1500,${endY}`;
              
              return (
                <path 
                  key={i} 
                  d={dPath} 
                  stroke="url(#cyberWaveGrad)" 
                  strokeWidth="1.2" 
                  strokeOpacity={0.15 + (i * 0.035)} 
                />
              );
            })}

            {/* Glowing nodes scattered along the wireframe curvature path intersection coordinates */}
            {[
              { cx: 180, cy: 110, r: 4 },
              { cx: 340, cy: 185, r: 3 },
              { cx: 480, cy: 260, r: 5 },
              { cx: 620, cy: 285, r: 3.5 },
              { cx: 720, cy: 210, r: 4.5 },
              { cx: 830, cy: 140, r: 5 },
              { cx: 940, cy: 115, r: 4 },
              { cx: 1060, cy: 155, r: 3.5 },
              { cx: 1180, cy: 220, r: 4 },
              { cx: 1300, cy: 290, r: 3 },
              // Secondary interlocking glowing coordinates
              { cx: 290, cy: 140, r: 3 },
              { cx: 580, cy: 275, r: 4.5 },
              { cx: 790, cy: 175, r: 4 },
              { cx: 1010, cy: 130, r: 3.5 },
              { cx: 1240, cy: 245, r: 5 },
            ].map((dot, index) => (
              <g key={index}>
                <circle cx={dot.cx} cy={dot.cy} r={dot.r * 2.8} fill="url(#waveDotGlow)" />
                <circle cx={dot.cx} cy={dot.cy} r={dot.r * 0.75} fill="#ffffff" />
              </g>
            ))}
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Video Preview with Play button overlay */}
            <div className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[300px] lg:min-h-0 bg-slate-950 group shadow-2xl z-10">
              <video 
                src="https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/home%20video.mp4?alt=media&token=bb364949-891f-4381-95f3-db0b946812af#t=1"
                className="w-full h-full object-cover absolute inset-0 opacity-70 group-hover:scale-105 transition-all duration-700"
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              {/* Play symbol badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
                  title="Watch Client Success Video"
                >
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </button>
              </div>
            </div>

            {/* Right Column: Title and horizontal carousel track */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-6 overflow-hidden z-10">
              <div className="space-y-2">
                {/* Custom badge matching picture */}
                <div className="inline-flex items-center gap-2 mb-1 select-none">
                  <div className="w-7 h-4 rounded-full border-2 border-indigo-500 bg-indigo-500/15 flex items-center px-0.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] uppercase font-mono font-black tracking-widest text-[#4F46E5] dark:text-indigo-400">TESTIMONIALS</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight leading-none">
                  Our Client Feedback
                </h2>
              </div>

              {/* Scroll wrapper */}
              <div className="relative w-full flex flex-col">
                {/* Horizontal carousel container with cards */}
                <div 
                  ref={testimonialsCarouselRef}
                  onScroll={handleTestimonialScroll}
                  className="flex gap-8 overflow-x-auto pb-4 pt-4 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-10"
                  id="testimonials-scroll-carousel"
                >
                  {clientTestimonials.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className="snap-start shrink-0 w-[280px] xs:w-[320px] sm:w-[360px] md:w-[380px] bg-white rounded-2xl p-6 pl-12 h-[190px] sm:h-[210px] relative flex flex-col justify-between shadow-xl border-l-[6px] border-indigo-600 group hover:border-indigo-500 transition-all duration-300"
                    >
                      {/* Quote indicator in top-right */}
                      <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-600/10 rotate-180 pointer-events-none" />

                      {/* Overlapping profile face avatar on the left border replaced with user icon */}
                      <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-20 w-16 h-16 rounded-full border-4 border-[#0B0F19] shadow-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-slate-800 text-white group-hover:scale-105 duration-300">
                        <User className="w-6 h-6 text-indigo-100" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 font-sans tracking-tight leading-tight">
                          {testimonial.name}
                        </h3>
                        <p className="text-[11px] font-mono tracking-wide text-indigo-600 uppercase font-bold">
                          {testimonial.role}
                        </p>
                        
                        {/* Rating row with elegant indigo-colored stars */}
                        <div className="flex gap-0.5 text-indigo-600 text-xs pt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-indigo-600 stroke-indigo-600" />
                          ))}
                        </div>
                      </div>

                      {/* Testimony content text */}
                      <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 mt-2 font-light italic">
                        &ldquo;{testimonial.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Custom dot navigation indicators centered & moved down with tighter spacing */}
                <div className="flex items-center justify-center gap-2 z-20 select-none mt-6 pb-2 pointer-events-auto" id="testimonial-interactive-dots">
                  {clientTestimonials.map((_, index) => {
                    const isActive = index === activeTestimonialIdx;
                    return (
                      <button
                        key={index}
                        onClick={() => handleTestimonialDotClick(index)}
                        className="relative flex items-center justify-center w-6 h-6 focus:outline-none group cursor-pointer transition-all duration-300"
                        title={`Go to testimonial ${index + 1}`}
                      >
                        {isActive ? (
                          /* Thin high contrast outer concentric ring with solid blue dot inside */
                          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/80 transition-all duration-300 scale-110">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                          </span>
                        ) : (
                          /* Standalone translucent inactive dot */
                          <span className="w-2 h-2 rounded-full bg-slate-600/70 group-hover:bg-slate-400 transition-all duration-200" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Alignment Container for second part of landing components */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">

      {/* Simple CTA Callout Banner */}
      <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6" id="cta-banner">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Have an ambitious project in mind?</h3>
          <p className="text-sm md:text-base text-slate-600 max-w-lg">
            Let's collaborate to build an interactive, blazingfast user experience aligned with industry-best guidelines and standard performance markers.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl active:scale-95 transition-all shadow-md"
          id="cta-contact-btn"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
      </div>
    </div>
  );
}
