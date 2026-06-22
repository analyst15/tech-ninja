import { Code, Heart, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  currentSection: string;
  onNavigate: (section: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact') => void;
}

export default function Footer({ currentSection, onNavigate }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white rounded-t-3xl border-t border-slate-800" id="footer-root">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 space-y-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Logo & Info column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Logo inverse={true} />
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm" id="footer-pitch-paragraph">
              Building powerful websites, systems, and digital solutions designed to drive growth, efficiency, and real business results.
            </p>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold" id="footer-navigation-header">Navigation</h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-sans">
              {[
                { s: 'home', label: 'Home Feed' },
                { s: 'about', label: 'About Us' },
                { s: 'services', label: 'Services Packages' },
                { s: 'portfolio', label: 'Portfolio' },
                { s: 'blog', label: 'Technical Journal' },
                { s: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <button
                  key={link.s}
                  onClick={() => onNavigate(link.s as any)}
                  className={`text-left hover:text-white transition-colors py-1 cursor-pointer capitalize font-semibold ${
                    currentSection === link.s ? 'text-indigo-400 font-bold' : ''
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social connections */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-semibold">Social Coordinates</h4>
            
            <div className="flex gap-3 text-slate-350">
              <a
                href="https://www.facebook.com/profile.php?id=61573337693120"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all text-xs flex items-center gap-1.5"
                id="footer-facebook-link"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all text-xs flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div className="flex items-center gap-1" id="footer-copyright-container">
            <span>© 2026 Tech Ninja</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1 text-slate-405 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold"
            id="scroll-to-top-footer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
