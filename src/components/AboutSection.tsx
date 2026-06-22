import React, { useState } from 'react';
import { Calendar, Award, GraduationCap, Briefcase, Sparkles, CheckCircle2, Star, Plus, Layers, Target, ShieldCheck, Search, LayoutTemplate, Code2, Rocket } from 'lucide-react';
import { Experience, Skill } from '../types';

interface AboutSectionProps {
  experiences: Experience[];
  skills: Skill[];
  onAddSkill: (skill: Skill) => void;
}

export default function AboutSection({ experiences, skills, onAddSkill }: AboutSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'design' | 'tools'>('all');
  const [customBiography, setCustomBiography] = useState(
    `We are a results-driven digital solutions company focused on helping businesses grow through technology, design, and innovation. Our goal is simple—to provide smart, reliable, and scalable solutions that solve real business challenges.\n\n` +
    `We specialize in website development, custom web applications, automation systems, and digital marketing. By combining strategy, design, and technology, we help businesses improve efficiency, attract customers, and increase revenue.\n\n` +
    `At our core, we believe technology should work for you—not complicate your operations. That’s why we take time to understand your business, your goals, and your challenges before building solutions tailored specifically to your needs.\n\n` +
    `We don’t just deliver projects—we build long-term partnerships. From the initial idea to ongoing support, we are committed to helping your business succeed and grow in a competitive digital landscape.\n\n` +
    `Our Mission\nTo empower businesses with innovative digital solutions that drive growth, efficiency, and long-term success.\n\n` +
    `Our Vision\nTo be a trusted technology partner for businesses looking to scale and thrive in the digital world.`
  );
  const [isEditingBio, setIsEditingBio] = useState(false);

  // New skill form fields
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  const [newSkillCategory, setNewSkillCategory] = useState<'frontend' | 'backend' | 'design' | 'tools'>('frontend');
  const [skillSuccessMsg, setSkillSuccessMsg] = useState('');

  const filteredSkills = skills.filter(
    (sk) => activeCategory === 'all' || sk.category === activeCategory
  );

  const handleCreateSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    onAddSkill({
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
      category: newSkillCategory
    });

    setNewSkillName('');
    setSkillSuccessMsg('Custom skill added successfully!');
    setTimeout(() => setSkillSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-16 animate-fade-in" id="about-section-root">
      {/* Bio and Focus Grid */}
      <section className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 font-bold">About Us</span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">Designing with Intention and Logic</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditingBio(!isEditingBio)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-sm"
              >
                {isEditingBio ? 'Save Change' : 'Edit Text'}
              </button>
            </div>

            {isEditingBio ? (
              <div className="space-y-3 pt-4">
                <textarea
                  value={customBiography}
                  onChange={(e) => setCustomBiography(e.target.value)}
                  className="w-full min-h-[220px] text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-3 font-sans focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  placeholder="Rewrite biography..."
                />
                <p className="text-[11px] text-slate-400">Feel free to customize this text directly in our interactive preview.</p>
              </div>
            ) : (
              <div className="space-y-4 text-slate-600 font-sans leading-relaxed text-sm md:text-base">
                {customBiography.split('\n\n').map((para, i) => {
                  if (para.startsWith('Our Mission')) {
                    const lines = para.split('\n');
                    return (
                      <div key={i} className="pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black uppercase font-mono tracking-wider text-indigo-600 mb-1">{lines[0]}</h3>
                        {lines[1] && <p className="text-slate-600 font-sans">{lines[1]}</p>}
                      </div>
                    );
                  }
                  if (para.startsWith('Our Vision')) {
                    const lines = para.split('\n');
                    return (
                      <div key={i} className="pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black uppercase font-mono tracking-wider text-indigo-600 mb-1">{lines[0]}</h3>
                        {lines[1] && <p className="text-slate-600 font-sans">{lines[1]}</p>}
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-slate-600 font-sans">
                      {para}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Photo Portrait / Identity Mock */}
        <div className="md:col-span-5 space-y-6">
          <div className="relative group overflow-hidden rounded-3xl bg-slate-950 p-2 shadow-lg border border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
            
            {/* Generating an aesthetic avatar vector placeholder */}
            <div className="aspect-square w-full rounded-2xl bg-linear-to-br from-indigo-700 via-slate-900 to-cyan-800 flex flex-col items-center justify-center text-center p-8 text-white relative">
              <div className="absolute inset-0 bg-radial-gradient(from_center,_var(--tw-gradient-stops)) from-indigo-500/20 via-transparent to-transparent opacity-80" />
              
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-slate-800/80 border border-slate-500/30 flex items-center justify-center p-1 backdrop-blur-md shadow-inner">
                  <div className="w-full h-full rounded-full bg-linear-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-3xl font-extrabold font-mono tracking-tighter text-slate-950">
                    AO
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight">Alex Okeyo</h3>
                  <span className="text-xs font-mono text-cyan-400 tracking-wider font-semibold uppercase">Lead Staff Engineer</span>
                </div>

                <div className="flex gap-2 text-indigo-200">
                  <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <Star className="w-4 h-4 fill-cyan-400 text-cyan-400 opacity-60" />
                </div>

                <p className="text-slate-350 text-xs mt-2 max-w-xs leading-relaxed font-sans">
                  "Writing software is user-first storytelling. Let's design structures that make humans empowered."
                </p>
              </div>
            </div>
          </div>

          {/* Quick contact / social indicators */}
          <div className="bg-slate-900 hover:bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-4">
            <span className="text-xs font-mono uppercase text-indigo-300 block">Current Status & Signal</span>
            <div className="space-y-2.5 text-xs text-slate-300 font-sans">
              <p className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-500">Based in</span>
                <span className="font-semibold text-white">Nairobi, Kenya</span>
              </p>
              <p className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-500">Phone Number</span>
                <a href="tel:+254707440516" className="font-semibold text-cyan-400 hover:underline">+(254) 707 440516</a>
              </p>
              <p className="flex justify-between pb-1">
                <span className="text-slate-500">Email</span>
                <a href="mailto:info@techninja.co.ke" className="font-semibold text-cyan-400 hover:underline">info@techninja.co.ke</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Choose Us" High-Fidelity Showcase Section */}
      <section 
        className="-mx-4 sm:-mx-6 lg:-mx-8 bg-[#0B0F19] text-white rounded-3xl overflow-hidden mt-20 relative py-12 sm:py-16 lg:py-20" 
        id="why-choose-us-showcase"
      >
        {/* Sleek abstract lines overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none" id="why-choose-us-abstract-curves">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <path d="M-100,200 C300,50 400,450 800,150 C1200,-150 1400,300 1800,200" fill="none" stroke="url(#curve-gradient)" strokeWidth="4" />
            <path d="M-50,250 C350,100 450,500 850,200 C1250,-100 1450,350 1850,250" fill="none" stroke="url(#curve-gradient)" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
        </div>

        <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 flex flex-col justify-center space-y-8 max-w-4xl">
          {/* Header pill & title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 mb-1 select-none">
              <div className="w-6 h-3.5 rounded-full border-2 border-indigo-400 bg-indigo-500/10 flex items-center px-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              </div>
              <span className="text-[10px] sm:text-xs uppercase font-mono font-black tracking-widest text-[#818CF8]">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight leading-tight">
              What Make Us Different
            </h2>
          </div>

          {/* List items */}
          <div className="space-y-6">
            {[
              {
                title: 'We Focus on Results, Not Just Deliverables',
                desc: (
                  <span>
                    Most agencies build websites or systems – we build solutions that <strong className="text-white font-black">drive leads, improve efficiency, and increase revenue</strong>. Everything we create is aligned with your business goals.
                  </span>
                ),
                icon: Layers
              },
              {
                title: 'We Combine Strategy, Design & Technology',
                desc: 'Instead of offering isolated services, we bring everything together: business strategy, high-quality design, and powerful technology to deliver complete, effective solutions.',
                icon: Target
              },
              {
                title: 'We Build for Growth, Not Just Launch',
                desc: (
                  <span>
                    We don’t disappear after delivery. We create scalable systems and provide ongoing support to ensure your business <strong className="text-white font-black">continues to grow, adapt, and succeed over time</strong>.
                  </span>
                ),
                icon: ShieldCheck
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex gap-4 sm:gap-6 items-start group" id={`why-us-item-${idx}`}>
                  {/* Icon Card Container - styled matching screenshot */}
                  <div className="bg-white text-[#4F46E5] shrink-0 p-4 rounded-xl border border-slate-100 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                  </div>
                  {/* Content text */}
                  <div className="space-y-1 py-1">
                    <h3 className="text-lg font-black font-sans text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="space-y-10 pt-8" id="our-process-section">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 font-bold">WORKFLOW</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">Our Proven 4-Step Process</h2>
          <p className="text-slate-500 font-sans text-sm sm:text-base">
            From strategic concept to long-term scalability, we work side-by-side with you to ensure continuous progress and high-impact results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mt-12">
          {/* Subtle connecting lines for desktop */}
          <div className="hidden lg:block absolute top-[2.25rem] left-[12%] right-[12%] h-0.5 bg-slate-200/80 z-0 animate-pulse" />

          {[
            {
              step: '01',
              title: 'Discovery & Strategy',
              desc: 'We start by understanding your brand, target market, and exact business objectives. We don’t guess; we map out a clear, result-focused strategy.',
              icon: Search,
              color: 'from-blue-500 to-indigo-500'
            },
            {
              step: '02',
              title: 'Design & Architecture',
              desc: 'We sketch, prototype, and build beautiful user interfaces while planning a powerful, secure back-end architecture tailored to your growth.',
              icon: LayoutTemplate,
              color: 'from-indigo-500 to-violet-500'
            },
            {
              step: '03',
              title: 'Clean Engineering',
              desc: 'Our engineers transform designs into pixel-perfect, lightning-fast solutions with absolute precision, complete type safety, and clean code.',
              icon: Code2,
              color: 'from-violet-500 to-fuchsia-500'
            },
            {
              step: '04',
              title: 'Launch & Adapt',
              desc: 'We launch seamlessly, and we continue providing hands-on partnership, monitoring outcomes, and helping you scale and pivot as you grow.',
              icon: Rocket,
              color: 'from-fuchsia-500 to-pink-500'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 relative z-10 flex flex-col justify-between group hover:-translate-y-1"
                id={`process-step-${idx}`}
              >
                <div className="space-y-4">
                  {/* Step Badge & Icon */}
                  <div className="flex justify-between items-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg shadow-indigo-500/10`}>
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-black font-mono tracking-tighter text-slate-200 group-hover:text-indigo-200/80 transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-sans text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
