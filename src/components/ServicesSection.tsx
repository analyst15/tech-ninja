import { useState, useRef, useEffect } from 'react';
import { Laptop, Zap, Palette, Check, ArrowRight, DollarSign, Sparkles, Globe, Cpu, Users, CreditCard, RotateCw, Cloud, Terminal, TrendingUp, ArrowLeft } from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onNavigateToContact: (calculatedQuoteSubject: string) => void;
  selectedServiceDetail?: string | null;
  onSelectServiceDetail?: (serviceName: string | null) => void;
}

const SERVICES_DETAILS_DATA: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  whatYouGet: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  whyUs: string[];
}> = {
  'website-development': {
    title: 'Website Development',
    subtitle: 'High-Impact, Conversion-Driven Digital Powerhouses',
    description: 'Your website is more than just an online presence—it’s your most powerful sales tool. If it’s not attracting, engaging, and converting visitors into customers, it’s costing you business. We design and develop high-impact, conversion-driven websites that don’t just look impressive—they deliver results. From corporate websites to fully customized digital platforms, we build solutions that are engineered to grow your business.',
    icon: Globe,
    whatYouGet: [
      { title: 'High-Converting Custom Websites', desc: 'We don’t use generic templates. Every website is strategically designed to reflect your brand, capture attention, and turn visitors into paying customers.' },
      { title: 'Mobile-First, Responsive Design', desc: 'With the majority of users browsing on mobile, we ensure your website performs flawlessly across all devices—maximizing reach and engagement.' },
      { title: 'E-commerce That Sells', desc: 'We build powerful online stores with seamless user experiences, secure payment integrations, and optimized checkout flows that increase conversions.' },
      { title: 'Speed & Performance Optimization', desc: 'Slow websites lose customers. We develop lightning-fast platforms that keep users engaged and improve your search rankings.' },
      { title: 'SEO-Ready Structure', desc: 'We position your website to be found by the right audience, helping you generate consistent, organic traffic.' },
      { title: 'Easy Content Management', desc: 'Take control of your website with simple, user-friendly systems that allow you to update content anytime—no technical skills required.' }
    ],
    process: [
      { title: 'Strategy First', desc: 'We identify what your business needs to grow and design your website around those goals.' },
      { title: 'Design That Converts', desc: 'Every layout, section, and interaction is built with one purpose—driving action.' },
      { title: 'Development That Performs', desc: 'We use modern, scalable technologies to ensure your website is fast, secure, and future-ready.' },
      { title: 'Launch With Confidence', desc: 'We test, optimize, and deploy your website to ensure it performs at the highest level from day one.' },
      { title: 'Ongoing Growth & Support', desc: 'We don’t disappear after launch—we help you continuously improve and scale.' }
    ],
    whyUs: [
      'We focus on results, not just design',
      'We build websites that generate leads and revenue',
      'We combine strategy, design, and technology into one solution',
      'We deliver professional, scalable systems built for growth',
      'We partner with you for long-term success'
    ]
  },
  'custom-web-applications': {
    title: 'Custom Web Applications',
    subtitle: 'Powerful, Custom-Tailored Systems Engineered to Grow Your Business',
    description: 'Off-the-shelf software can only take your business so far. When your operations, workflows, or growth strategy demand more, you need a solution built specifically for you. We design and develop powerful, custom web applications that streamline operations, automate processes, and give your business a competitive edge. Whether you need an internal system, a client-facing platform, or a fully integrated digital solution, we build applications that are tailored to how your business works—and where it’s going.',
    icon: Laptop,
    whatYouGet: [
      { title: 'Tailor-Made Business Systems', desc: 'From CRMs and dashboards to booking platforms and management systems, we build applications designed around your exact processes—no compromises, no unnecessary features.' },
      { title: 'Process Automation', desc: 'Eliminate repetitive tasks and reduce human error with intelligent automation that saves time, cuts costs, and improves efficiency.' },
      { title: 'Scalable Architecture', desc: 'Our applications are built to grow with your business, handling increased users, data, and complexity without performance issues.' },
      { title: 'Secure & Reliable Platforms', desc: 'We implement industry-standard security practices to protect your data, users, and transactions at every level.' },
      { title: 'Seamless Integrations', desc: 'Connect your application with payment gateways, APIs, third-party tools, and existing systems for a unified digital ecosystem.' },
      { title: 'Real-Time Data & Insights', desc: 'Gain full visibility into your operations with dashboards and reporting tools that support smarter, data-driven decisions.' }
    ],
    process: [
      { title: 'Business Analysis', desc: 'We take the time to understand your workflows, challenges, and objectives before writing a single line of code.' },
      { title: 'Solution Architecture', desc: 'We design a system that aligns perfectly with your operations and future growth plans.' },
      { title: 'Agile Development', desc: 'We build in phases, allowing flexibility, faster delivery, and continuous improvement.' },
      { title: 'Testing & Optimization', desc: 'We ensure your application is stable, secure, and performs flawlessly under real-world conditions.' },
      { title: 'Deployment & Continuous Support', desc: 'We launch your system with confidence and provide ongoing support to keep it running at peak performance.' }
    ],
    whyUs: [
      'We build solutions, not just software',
      'We focus on efficiency, automation, and business growth',
      'We create systems that save time and reduce operational costs',
      'We deliver secure, scalable, and high-performance applications',
      'We partner with you for long-term innovation and success'
    ]
  },
  'business-process-automation': {
    title: 'Business & Automation Services',
    subtitle: 'Streamline workflows, eliminate manual redundancies, and unlock your full potential',
    description: 'Most businesses lose time, money, and opportunities because of inefficient processes, manual work, and disconnected systems. If your operations rely heavily on repetitive tasks, scattered tools, or human intervention, you are operating below your potential. We help businesses streamline operations, automate workflows, and build intelligent systems that increase efficiency, reduce costs, and accelerate growth. Our solutions are designed to eliminate bottlenecks and allow you to focus on what truly matters—scaling your business.',
    icon: Cpu,
    whatYouGet: [
      { title: 'Process Automation', desc: 'We identify repetitive tasks in your business and automate them—from data entry and follow-ups to reporting and approvals—saving you time and reducing costly errors.' },
      { title: 'Workflow Optimization', desc: 'We redesign your internal processes to improve efficiency, ensuring that your team works smarter, faster, and more effectively.' },
      { title: 'CRM Systems & Lead Management', desc: 'We implement and customize systems that help you capture, track, and convert leads—ensuring no opportunity is ever lost.' },
      { title: 'Email & Communication Automation', desc: 'Automate customer communication, notifications, and follow-ups to improve engagement and maintain consistency.' },
      { title: 'System Integration', desc: 'We connect your existing tools—websites, payment systems, CRMs, and third-party platforms—into one seamless ecosystem.' },
      { title: 'Data & Performance Insights', desc: 'Gain real-time visibility into your business operations with dashboards and reports that support better decision-making.' }
    ],
    process: [
      { title: 'Business Assessment', desc: 'We analyze your current processes, identify inefficiencies, and uncover opportunities for automation.' },
      { title: 'Strategic Planning', desc: 'We design a tailored automation strategy aligned with your business goals.' },
      { title: 'Implementation', desc: 'We build and integrate solutions that streamline your operations without disrupting your workflow.' },
      { title: 'Testing & Optimization', desc: 'We ensure everything runs smoothly, efficiently, and reliably.' },
      { title: 'Continuous Improvement', desc: 'We monitor and refine your systems to keep your business operating at peak performance.' }
    ],
    whyUs: [
      'We focus on business outcomes, not just technology',
      'We help you save time, reduce costs, and increase productivity',
      'We eliminate inefficiencies that slow down your growth',
      'We build systems that scale with your business',
      'We act as a long-term partner in your digital transformation'
    ]
  },
  'crm-setup-customization': {
    title: 'CRM Setup & Customization',
    subtitle: 'Custom systems that bring clarity, control, and consistent growth to your sales process',
    description: 'If you’re managing leads, customers, and follow-ups manually—or across disconnected tools—you’re losing opportunities every single day. Missed follow-ups, poor tracking, and lack of visibility can directly impact your revenue. We help businesses take control of their sales process by implementing and customizing powerful CRM systems that capture, organize, and convert leads efficiently. Our solutions are designed to give you full visibility, better control, and a structured path to consistent growth.',
    icon: Users,
    whatYouGet: [
      { title: 'Custom CRM Implementation', desc: 'We set up CRM systems tailored to your business processes—ensuring every lead, interaction, and deal is tracked accurately from start to finish.' },
      { title: 'Lead Capture & Management', desc: 'Automatically capture leads from your website, forms, or campaigns and manage them in one centralized system—no more lost opportunities.' },
      { title: 'Sales Pipeline Optimization', desc: 'We design clear, structured pipelines that help you track progress, prioritize deals, and close faster.' },
      { title: 'Automation & Follow-Ups', desc: 'Never miss a follow-up again. We automate emails, reminders, and notifications to keep your sales process active and consistent.' },
      { title: 'Integration with Your Systems', desc: 'Connect your CRM with your website, payment gateways, email platforms, and other tools for a seamless workflow.' },
      { title: 'Reporting & Insights', desc: 'Gain real-time insights into your sales performance, team productivity, and customer behavior to make smarter business decisions.' }
    ],
    process: [
      { title: 'Understanding Your Sales Process', desc: 'We analyze how you currently manage leads and identify gaps that are costing you conversions.' },
      { title: 'CRM Strategy & Design', desc: 'We structure a system that aligns with your business model and sales goals.' },
      { title: 'Setup & Customization', desc: 'We configure your CRM to match your exact workflows—no unnecessary complexity.' },
      { title: 'Training & Onboarding', desc: 'We ensure your team understands how to use the system effectively from day one.' },
      { title: 'Ongoing Support & Optimization', desc: 'We continuously refine your CRM to improve performance and adapt to your growth.' }
    ],
    whyUs: [
      'We build CRMs that increase conversions and revenue',
      'We eliminate manual tracking and reduce missed opportunities',
      'We create systems that bring clarity and control to your sales process',
      'We focus on simplicity, efficiency, and scalability',
      'We support you as a long-term growth partner'
    ]
  },
  'payment-gateway-integration': {
    title: 'Payment Gateway Integration',
    subtitle: 'Secure, efficient, and user-friendly payment systems built to maximize conversions',
    description: 'If your business is not set up to accept payments seamlessly, securely, and reliably, you are leaving money on the table. A complicated or unreliable checkout process can cost you customers at the final and most critical stage. We help businesses implement secure, efficient, and user-friendly payment systems that make it easy for customers to pay—anytime, from anywhere. Whether you’re running an e-commerce store, event platform, or service-based business, we ensure your payment process is smooth, fast, and built to convert.',
    icon: CreditCard,
    whatYouGet: [
      { title: 'Seamless Payment Integration', desc: 'We integrate trusted payment gateways into your website or application, enabling you to accept payments effortlessly from your customers.' },
      { title: 'Multiple Payment Options', desc: 'Support for card payments, mobile money, and other payment methods to maximize your reach and convenience for customers.' },
      { title: 'Optimized Checkout Experience', desc: 'We design streamlined checkout flows that reduce friction, minimize drop-offs, and increase successful transactions.' },
      { title: 'Secure Transactions', desc: 'We implement industry-standard security measures to protect sensitive data and ensure safe, reliable transactions.' },
      { title: 'Subscription & Recurring Payments', desc: 'Set up automated billing systems for subscriptions, memberships, or recurring services.' },
      { title: 'Payment Tracking & Reporting', desc: 'Monitor transactions, track payment statuses, and gain insights into your revenue through integrated dashboards.' }
    ],
    process: [
      { title: 'Business Requirements Analysis', desc: 'We assess your payment needs, target market, and preferred payment methods.' },
      { title: 'Gateway Selection & Strategy', desc: 'We help you choose the right payment providers that align with your business model and region.' },
      { title: 'Integration & Testing', desc: 'We integrate the payment system and thoroughly test all transaction flows to ensure reliability.' },
      { title: 'Launch & Monitoring', desc: 'We deploy your payment system and monitor performance to ensure smooth operations.' },
      { title: 'Ongoing Support', desc: 'We provide continuous support, updates, and enhancements as your business grows.' }
    ],
    whyUs: [
      'We build payment systems that maximize conversions and revenue',
      'We ensure secure, reliable, and compliant integrations',
      'We optimize checkout flows to reduce abandoned transactions',
      'We support both local and international payment solutions',
      'We provide ongoing support for long-term scalability'
    ]
  },
  'website-maintenance': {
    title: 'Website Maintenance',
    subtitle: 'Proactive maintenance services that keep your platform secure, fast, and performing at its best at all times',
    description: 'Launching a website is only the beginning. Without proper maintenance, even the best websites become slow, vulnerable, and outdated costing you traffic, credibility, and revenue. We provide proactive website maintenance services that keep your platform secure, fast, and performing at its best at all times. Our goal is simple: ensure your website continues to work for your business 24/7 without interruptions.',
    icon: RotateCw,
    whatYouGet: [
      { title: 'Ongoing Updates & Improvements', desc: 'We keep your website up to date with the latest features, enhancements, and technology improvements to ensure optimal performance.' },
      { title: 'Security Monitoring & Protection', desc: 'We actively monitor your website for vulnerabilities, apply security patches, and protect it against threats and attacks.' },
      { title: 'Performance Optimization', desc: 'We continuously optimize your website’s speed and performance to deliver a seamless user experience and reduce bounce rates.' },
      { title: 'Bug Fixes & Technical Support', desc: 'Issues happen—we fix them quickly. From broken links to functionality errors, we ensure your website runs smoothly at all times.' },
      { title: 'Regular Backups', desc: 'We implement automated backups to protect your data and ensure quick recovery in case of any issues.' },
      { title: 'Content Updates', desc: 'Need to update text, images, or sections? We handle content changes so your website always stays relevant and accurate.' }
    ],
    process: [
      { title: 'Initial Audit', desc: 'We assess your website’s current condition, identifying risks, inefficiencies, and areas for improvement.' },
      { title: 'Maintenance Plan Setup', desc: 'We create a structured plan tailored to your website’s needs and business goals.' },
      { title: 'Continuous Monitoring', desc: 'We keep a close watch on your website’s performance, uptime, and security.' },
      { title: 'Proactive Optimization', desc: 'We don’t wait for problems we prevent them before they impact your business.' },
      { title: 'Ongoing Support', desc: 'We remain available to implement updates, improvements, and enhancements as your business evolves.' }
    ],
    whyUs: [
      'We keep your website secure, stable, and always online',
      'We prevent issues that could cost you traffic and revenue',
      'We ensure your website remains fast, modern, and competitive',
      'We provide fast response times and reliable support',
      'We offer a long-term partnership, not just a one-time service'
    ]
  },
  'cloud-solutions': {
    title: 'Cloud Solutions',
    subtitle: 'Move to the cloud, optimize your infrastructure, and build scalable, secure systems that support growth',
    description: 'Relying on outdated infrastructure, limited storage, or unreliable systems is a risk your business cannot afford. Downtime, data loss, and lack of scalability can slow your growth and impact your bottom line. We help businesses move to the cloud, optimize their infrastructure, and build scalable, secure systems that support growth, flexibility, and performance. Our cloud solutions are designed to give you the power, reliability, and efficiency your business needs to operate without limitations.',
    icon: Cloud,
    whatYouGet: [
      { title: 'Cloud Migration', desc: 'We seamlessly move your applications, data, and systems to the cloud with minimal disruption, ensuring improved performance and accessibility.' },
      { title: 'Scalable Infrastructure', desc: 'Easily scale your systems as your business grows—handle more users, data, and traffic without performance issues.' },
      { title: 'Secure Cloud Environments', desc: 'We implement strong security protocols to protect your data, applications, and users from threats and breaches.' },
      { title: 'Cloud Hosting & Deployment', desc: 'We deploy and manage your websites and applications on reliable cloud platforms for maximum uptime and performance.' },
      { title: 'Backup & Disaster Recovery', desc: 'Protect your data with automated backups and recovery strategies that ensure your data is always safe and recoverable.' },
      { title: 'Cost Optimization', desc: 'We help you reduce unnecessary infrastructure costs by optimizing your cloud usage and resources.' }
    ],
    process: [
      { title: 'Assessment & Strategy', desc: 'We evaluate your current infrastructure and design a cloud strategy aligned with your business goals.' },
      { title: 'Architecture Design', desc: 'We build a scalable and efficient cloud architecture tailored to your needs.' },
      { title: 'Migration & Implementation', desc: 'We execute a smooth transition to the cloud with minimal downtime.' },
      { title: 'Monitoring & Optimization', desc: 'We continuously monitor your systems and optimize performance, cost, and security.' },
      { title: 'Ongoing Support', desc: 'We provide long-term support to ensure your cloud environment evolves with your business.' }
    ],
    whyUs: [
      'We build cloud systems that support growth and scalability',
      'We ensure high availability, performance, and reliability',
      'We prioritize security and data protection',
      'We optimize your infrastructure to reduce costs and increase efficiency',
      'We act as your long-term technology partner'
    ]
  },
  'deployment-devops': {
    title: 'Deployment & DevOps',
    subtitle: 'Accelerate delivery, run reliably, and scale effortlessly with robust automated infrastructure',
    description: 'Building a great application is only half the job. If your system is slow to deploy, prone to downtime, or difficult to scale, it will hold your business back. We implement robust deployment and DevOps solutions that ensure your applications are delivered faster, run reliably, and scale effortlessly. Our approach eliminates deployment risks, reduces downtime, and gives you the confidence to grow without technical limitations.',
    icon: Terminal,
    whatYouGet: [
      { title: 'Seamless Deployment Pipelines', desc: 'We automate your deployment process so updates can be released quickly, consistently, and without errors.' },
      { title: 'CI/CD Implementation', desc: 'We set up continuous integration and continuous deployment pipelines to accelerate development cycles and improve software quality.' },
      { title: 'Cloud-Based Deployment', desc: 'We deploy your applications on secure, high-performance cloud infrastructure for maximum reliability and uptime.' },
      { title: 'Server & Environment Configuration', desc: 'We configure production-ready environments optimized for performance, security, and scalability.' },
      { title: 'Monitoring & Logging', desc: 'We implement real-time monitoring and logging systems to detect issues early and maintain system stability.' },
      { title: 'Scalability & Load Management', desc: 'We design systems that can handle increasing traffic and usage without performance degradation.' }
    ],
    process: [
      { title: 'Infrastructure Assessment', desc: 'We evaluate your current setup and identify gaps that could affect performance or reliability.' },
      { title: 'Pipeline & Architecture Design', desc: 'We design a deployment workflow and infrastructure tailored to your application and business needs.' },
      { title: 'Implementation & Automation', desc: 'We automate deployments, testing, and updates to eliminate manual errors and delays.' },
      { title: 'Testing & Validation', desc: 'We ensure your system performs reliably under real-world conditions before going live.' },
      { title: 'Ongoing Optimization', desc: 'We continuously refine your deployment processes to improve speed, stability, and efficiency.' }
    ],
    whyUs: [
      'We ensure fast, reliable, and error-free deployments',
      'We reduce downtime and minimize operational risks',
      'We build systems that scale with your business growth',
      'We automate processes to increase efficiency and consistency',
      'We provide ongoing support and optimization'
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    subtitle: 'Performance-driven strategies designed to increase visibility, generate qualified leads, and convert attention into revenue',
    description: 'In today’s digital economy, visibility is not optional—it is everything. If your business is not consistently attracting the right audience online, your competitors are capturing the customers you should be converting. We deliver performance-driven digital marketing strategies designed to increase visibility, generate qualified leads, and convert attention into revenue. Our focus is not vanity metrics—it is measurable business growth.',
    icon: TrendingUp,
    whatYouGet: [
      { title: 'Strategic Campaign Planning', desc: 'We design targeted marketing strategies aligned with your business goals, audience, and industry to ensure every campaign delivers real impact.' },
      { title: 'Social Media Marketing', desc: 'We create and manage high-quality content across platforms to build brand awareness, engage your audience, and drive consistent traffic.' },
      { title: 'Paid Advertising (Ads Management)', desc: 'We run optimized ad campaigns across platforms such as Google and social media to generate leads, sales, and conversions at the lowest possible cost.' },
      { title: 'Content Creation & Branding', desc: 'We develop compelling visuals, graphics, and messaging that position your brand as professional, trustworthy, and authoritative.' },
      { title: 'Lead Generation Campaigns', desc: 'We build systems that attract and capture qualified leads, turning online traffic into real business opportunities.' },
      { title: 'Analytics & Performance Tracking', desc: 'We track campaign performance, measure results, and continuously optimize to maximize return on investment.' }
    ],
    process: [
      { title: 'Market & Audience Analysis', desc: 'We identify your ideal customers and understand how to reach them effectively.' },
      { title: 'Strategy Development', desc: 'We create a focused marketing plan designed to generate measurable results, not random activity.' },
      { title: 'Execution & Campaign Management', desc: 'We launch and manage campaigns across multiple channels with continuous optimization.' },
      { title: 'Performance Optimization', desc: 'We analyze data and refine campaigns to improve conversions and reduce cost per result.' },
      { title: 'Reporting & Growth Scaling', desc: 'We provide clear insights and scale successful campaigns to maximize growth.' }
    ],
    whyUs: [
      'We focus on leads, conversions, and revenue—not likes or followers',
      'We create campaigns that are data-driven and performance-optimized',
      'We help businesses attract consistent, high-quality customers',
      'We combine strategy, design, and technology for maximum impact',
      'We are focused on measurable business growth'
    ]
  },
  'graphic-design': {
    title: 'Graphic Design',
    subtitle: 'High-impact design solutions that position your brand as credible, modern, and market-ready',
    description: 'Your brand is judged long before you ever speak to a client. If your visuals look inconsistent, outdated, or unprofessional, you lose trust and with it, potential business. We deliver high-impact graphic design solutions that position your brand as credible, modern, and market-ready. Our designs are not just visually appealing they are strategically crafted to attract attention, communicate value, and drive action.',
    icon: Palette,
    whatYouGet: [
      { title: 'Brand Identity Design', desc: 'We create strong, memorable brand identities including logos, color systems, typography, and brand guidelines that define how your business is perceived.' },
      { title: 'Social Media Design', desc: 'We design engaging and conversion-focused social media content that builds awareness, increases engagement, and strengthens your online presence.' },
      { title: 'Marketing & Advertising Creatives', desc: 'We develop high-performing visuals for campaigns, ads, and promotions designed to capture attention and generate leads.' },
      { title: 'Business & Corporate Design', desc: 'We create professional materials such as company profiles, brochures, presentations, and business cards that elevate your credibility.' },
      { title: 'Web & Digital Assets', desc: 'We design banners, icons, and visual elements that enhance websites, applications, and digital platforms.' }
    ],
    process: [
      { title: 'Brand Understanding', desc: 'We analyze your business, audience, and market positioning to ensure every design aligns with your goals.' },
      { title: 'Concept Development', desc: 'We develop strong creative directions that communicate your message clearly and effectively.' },
      { title: 'Design Execution', desc: 'We produce clean, modern, and professional visuals optimized for both digital and print use.' },
      { title: 'Refinement & Consistency', desc: 'We ensure every design maintains consistency across all platforms to strengthen brand recognition.' },
      { title: 'Delivery & Support', desc: 'We provide ready-to-use design assets and ongoing support for future creative needs.' }
    ],
    whyUs: [
      'We create designs that are strategic, not just decorative',
      'We help businesses build strong, recognizable brand identities',
      'We focus on clarity, consistency, and conversion impact',
      'We deliver professional-quality visuals tailored for business growth',
      'We position your brand to stand out in a competitive market'
    ]
  }
};

export default function ServicesSection({ 
  services, 
  onNavigateToContact,
  selectedServiceDetail,
  onSelectServiceDetail
}: ServicesSectionProps) {
  // Normalize key lookup to handle title changes gracefully
  let activeKey = selectedServiceDetail;
  if (activeKey) {
    const norm = activeKey.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    if (norm === 'business-automation-services' || norm === 'business-and-automation-services' || norm === 'business-automation' || norm === 'business-process-automation') {
      activeKey = 'business-process-automation';
    }
  }

  // Conditional single service detail page matching layout instructions perfectly
  if (activeKey && SERVICES_DETAILS_DATA[activeKey]) {
    const detail = SERVICES_DETAILS_DATA[activeKey];
    const IconComponent = detail.icon;
    return (
      <div className="space-y-12 animate-fade-in" id="detailed-service-slate">
        {/* Navigation back */}
        <div className="flex items-center justify-between border-b border-slate-105 pb-6">
          <button
            onClick={() => onSelectServiceDetail?.(null)}
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-slate-500 hover:text-indigo-650 transition-colors cursor-pointer"
            id="back-to-services-list"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>
          
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-150">
            Specialized Offering
          </span>
        </div>

        {/* Hero Segment */}
        <section className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-indigo-750">
              <IconComponent className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-sans tracking-tight leading-none">
              {detail.title}
            </h1>
            <p className="text-sm md:text-md text-indigo-650 dark:text-indigo-300 font-bold font-sans tracking-wide leading-relaxed">
              {detail.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-2 max-w-3xl">
              {detail.description}
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-50/60 border border-slate-150 p-6 rounded-2xl space-y-4 text-center">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-450 block font-bold">Start Building Now</span>
            <p className="text-xs text-slate-505 font-sans">Need a bespoke quote or consultation concerning {detail.title}?</p>
            <button
              onClick={() => onNavigateToContact(`Expert Consultation Inquiry concerning ${detail.title}`)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-xs active:scale-97 border border-slate-950"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Split Grid for features, process and advantages */}
        <div className="grid lg:grid-cols-12 gap-8" id="detail-split-architecture">
          
          {/* Main info cards block */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* What you get */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 font-sans tracking-tight border-b border-slate-100 pb-4">
                What You Get
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6" id="features-highlights">
                {detail.whatYouGet.map((feat, i) => (
                  <div key={i} className="space-y-1.5 p-4 rounded-xl hover:bg-slate-50/60 border border-transparent hover:border-slate-100 transition-all duration-305">
                    <span className="text-indigo-600 text-xs font-extrabold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {feat.title}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-light pl-3.5">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Process Accordion List */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 font-sans tracking-tight border-b border-slate-100 pb-4">
                Our Process
              </h2>

              <div className="space-y-4" id="process-timeline">
                {detail.process.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center font-mono text-xs font-bold text-indigo-700">
                        {idx + 1}
                      </div>
                      {idx < detail.process.length - 1 && (
                        <div className="w-[1px] flex-1 bg-slate-150 animate-pulse" />
                      )}
                    </div>
                    <div className="space-y-1 pb-4">
                      <h4 className="text-xs font-bold text-slate-950 font-sans">{step.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar block */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Why Work With Us bullet list */}
            <div className="bg-indigo-950 text-white rounded-3xl p-6 relative overflow-hidden border border-indigo-900 shadow-md">
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-md font-bold tracking-tight">Why Work With Us</h3>
                
                <ul className="space-y-3" id="why-us-list">
                  {detail.whyUs.map((advantage, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-indigo-200 leading-relaxed">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* General CTA backup card */}
            <div className="bg-white border border-slate-105 rounded-3xl p-6 text-center space-y-3.5">
              <h4 className="text-xs font-bold text-slate-900">Explore Other Services</h4>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed font-sans">Want to browse the complete digital operations package and discover new ways to accelerate your growth?</p>
              <button
                onClick={() => onSelectServiceDetail?.(null)}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-855 tracking-wide transition-all uppercase font-mono tracking-widest text-[10px] cursor-pointer"
              >
                View All Services
              </button>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // Scroll container reference for functional carousel navigation
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-sliding carousel state and effect
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 370; // Approx card width + gap
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: "smooth" });
        }
      }
    }, 4500); // Trigger slide every 4.5 seconds

    return () => clearInterval(interval);
  }, [isHovered, services.length]);

  // Smooth scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370; // Approx card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Icon lookup helper
  const renderServiceIcon = (iconName: string, customClass?: string) => {
    const iconClass = customClass || "w-6 h-6 text-indigo-600";
    switch (iconName) {
      case 'Globe':
        return <Globe className={iconClass} />;
      case 'Laptop':
        return <Laptop className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'CreditCard':
        return <CreditCard className={iconClass} />;
      case 'RotateCw':
        return <RotateCw className={iconClass} />;
      case 'Cloud':
        return <Cloud className={iconClass} />;
      case 'Terminal':
        return <Terminal className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      default:
        return <Laptop className={iconClass} />;
    }
  };

  const getDetailedServiceKey = (serviceId: string) => {
    if (serviceId === 'service-1') return 'custom-web-applications';
    if (serviceId === 'service-2') return 'cloud-solutions';
    if (serviceId === 'service-3') return 'business-process-automation';
    return serviceId;
  };

  return (
    <div className="space-y-16 animate-fade-in" id="services-section-root">
      
      {/* Dark Premium Outer Container with background lines */}
      <section className="bg-[#0F172B] rounded-[2.5rem] p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden border border-slate-800 shadow-2xl" id="exclusive-it-banner">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        
        {/* Elegant background curves */}
        <div className="absolute top-1/4 left-0 w-48 h-96 -translate-x-12 opacity-25 pointer-events-none" id="decorative-service-curves">
          <svg viewBox="0 0 100 200" fill="none" className="w-full h-full text-indigo-550/30">
            <path d="M-50,20 C10,50 -20,120 40,150 S100,50 150,110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M-50,40 C20,70 -10,140 50,170 S110,70 160,130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M-50,60 C30,90 0,160 60,190 S120,90 170,150" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,4" />
          </svg>
        </div>

        {/* Header Block with navigation controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/60 relative z-10">
          <div className="space-y-3">
            {/* Outline pill shaped badge custom built like screenshot */}
            <div className="inline-flex items-center gap-2 mb-1 select-none">
              <div className="w-6 h-3.5 rounded-full border-2 border-indigo-505 bg-indigo-505/10 flex items-center px-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#4F46E5] dark:text-indigo-400">Services We&#39;re Offering</span>
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
              className="w-11 h-11 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-slate-500 transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-md"
              title="Scroll Left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-11 h-11 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-slate-500 transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-md"
              title="Scroll Right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Container for service cards */}
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-10"
          id="services-carousel-track"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="snap-start shrink-0 w-[290px] xs:w-[320px] sm:w-[340px] md:w-[350px] bg-[#111827]/35 border border-slate-800/85 rounded-3xl overflow-hidden flex flex-col justify-between h-[450px] relative group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
            >
              {/* Top Graphic Area */}
              <div className="relative h-56 sm:h-60 shrink-0">
                <div className="w-full h-full overflow-hidden rounded-t-[22px]">
                  <img 
                    src={service.imageUrl || 'https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?auto=format&fit=crop&w=600&q=80'} 
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Floating overlap square badge */}
                <div className="absolute bottom-0 right-6 translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl border border-indigo-500/40 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 duration-300">
                  {renderServiceIcon(service.iconName, "w-6 h-6 text-indigo-600")}
                </div>
              </div>

              {/* Bottom White Block with Title and Details */}
              <div className="bg-white flex-1 p-5 sm:p-6 flex flex-col justify-between border-t border-slate-100 text-slate-900">
                <div className="space-y-2">
                  <h3 
                    onClick={() => onSelectServiceDetail?.(getDetailedServiceKey(service.id))}
                    className="text-lg sm:text-xl font-black text-slate-900 font-sans hover:text-indigo-600 transition-colors cursor-pointer inline-block leading-snug"
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Bottom line: feature indicators or exploration guides */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-105 mt-2">
                  <button
                    onClick={() => onSelectServiceDetail?.(getDetailedServiceKey(service.id))}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic, High-Converting Call to Action Section */}
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800" id="services-cta-section">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold font-mono">
            <span>Ready to Scale Your Digital Presence?</span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight leading-none">
            Let&#39;s Build Something Incredible Together
          </h3>
          
          <p className="text-slate-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
            Whether you need a custom-built web application, streamlined business process automation, or a high-performing website, we deliver result-focused digital operations tailored to your business objectives.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <button
              onClick={() => onNavigateToContact("Custom IT Services Consultation Request")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-2xl text-xs sm:text-sm active:scale-95 transition-all shadow-lg hover:shadow-white/20 duration-300 cursor-pointer border border-transparent font-sans tracking-wide"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectServiceDetail?.(getDetailedServiceKey('website-development'))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-800/60 hover:bg-slate-850/90 text-white font-black rounded-2xl text-xs sm:text-sm active:scale-95 transition-all duration-300 cursor-pointer border border-slate-700/80 font-sans tracking-wide"
            >
              <span>Explore Our Scope</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
