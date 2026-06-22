import { Experience, Skill, Project, BlogPost, Service } from './types';

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Staff Engineer',
    company: 'NexusTech Systems',
    duration: '2024 - Present',
    description: 'Spearheaded migration to micro-frontend architectures, resulting in a 40% reduction in first-contentful-paint across core platforms. Orchestrated a team of 8 senior developers building cloud-native SaaS services.',
    tags: ['Next.js', 'System Design', 'GCP', 'Kubernetes']
  },
  {
    id: 'exp-2',
    role: 'Senior Full-Stack Developer',
    company: 'Aura Interactive',
    duration: '2021 - 2024',
    description: 'Designed and implemented end-to-end user-centric web applications and offline synchronization systems. Leveraged serverless workflows and Firestore to cut infrastructure overhead by 30%.',
    tags: ['React', 'Node.js', 'Firestore', 'Tailwind CSS']
  },
  {
    id: 'exp-3',
    role: 'Software Engineer',
    company: 'ByteLabs Studio',
    duration: '2019 - 2021',
    description: 'Coordinated building and refactoring legacy web apps to performant TypeScript web interfaces. Optimized complex database queries and refined GraphQL schemas to improve responsiveness.',
    tags: ['TypeScript', 'GraphQL', 'PostgreSQL', 'Vite']
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 92, category: 'frontend' },
  { name: 'Tailwind CSS v4', level: 98, category: 'frontend' },
  { name: 'Node.js / Express', level: 88, category: 'backend' },
  { name: 'PostgreSQL / SQL', level: 85, category: 'backend' },
  { name: 'Firebase & Firestore', level: 90, category: 'backend' },
  { name: 'Systems Architecture', level: 82, category: 'backend' },
  { name: 'UI / UX Design', level: 80, category: 'design' },
  { name: 'Figma', level: 85, category: 'design' },
  { name: 'Docker / Kubernetes', level: 75, category: 'tools' },
  { name: 'CI/CD Pipelines', level: 83, category: 'tools' },
  { name: 'Git & Command Line', level: 95, category: 'tools' }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'ilearn',
    title: 'iLearn',
    category: 'web',
    description: 'An advanced, high-performance learning management system (LMS) optimized for seamless remote coursework and evaluation.',
    detailedDescription: 'iLearn is a custom, feature-rich educational learning management platform. Engineered with dynamic module progression tracking, automated quiz evaluation systems, and secure student/instructor interfaces. Designed with React, TypeScript, and Tailwind CSS to deliver sub-second response times and high student retention.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2Filearn.png?alt=media&token=fa889523-1a15-4dcc-8eb7-d87b442dbbb0',
    demoUrl: 'https://i-learn-roan.vercel.app/',
    githubUrl: 'https://github.com/example/ilearn',
    featured: true,
    duration: '3 Weeks'
  },
  {
    id: 'econ-event',
    title: 'Econ Event',
    category: 'web',
    description: 'An immersive, high-volume conference and corporate event presentation gateway for financial summit indexing & scheduling.',
    detailedDescription: 'Econ Event is a complex event management ecosystem tailored for regional economic symposiums and corporate coordination. Includes dynamic timeline agendas, interactive seating layouts, and live ticket reservation widgets. Built using premium layout components and real-time backend notification pathways for instantaneous updates.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2Fecon%20event.png?alt=media&token=3e4d03e4-3d81-42b9-aab2-001434956eed',
    demoUrl: 'https://eventify-tau-roan.vercel.app/',
    githubUrl: 'https://github.com/example/econ-event',
    featured: true,
    duration: '2.5 Weeks'
  },
  {
    id: 'helkon-kenya-limited',
    title: 'Helkon Kenya Limited',
    category: 'web',
    description: 'A custom, lightning-fast corporate web presentation engineered for supreme digital accessibility and real-time user chat capabilities.',
    detailedDescription: 'Designed and crafted for Helkon Kenya Limited, this corporate landing platform features a modular grid design, high-contrast typography, and fully optimized assets. Standard HTML and Bootstrap-based layouts ensure top performance and SEO readiness. In addition, vanilla JavaScript interaction binds an integrated Tawk.to live chat console for sub-second lead acquisition, custom communication modules, and rich interactive layouts.',
    techStack: ['HTML', 'Bootstrap', 'Javascript', 'Tawk'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2Fhelkon.PNG?alt=media&token=302c10c7-c35a-43c5-b054-a10fad2d758a',
    demoUrl: 'https://helkonkenya.com/',
    githubUrl: 'https://github.com/example/helkon',
    featured: true,
    duration: '1.5 Weeks'
  },
  {
    id: 'akwaya',
    title: 'Akwaya Supplies Solutions',
    category: 'web',
    description: 'A responsive, end-to-end food delivery and digital commerce ecosystem with server-rendered routing and offline state handling.',
    detailedDescription: 'Akwaya is a full-featured online reservation, ordering, and management platform designed with Next.js and fully structured TypeScript. Leveraged the robust security model of Firebase Auth for consumer accounts along with real-time Cloud Firestore subscription listeners. This ensures instant synchronization of current menus, billing invoices, and order status timelines.',
    techStack: ['Next.js', 'Typescript', 'Firebase'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2FAkwaya.PNG?alt=media&token=384a91be-7bfe-49ba-9b99-1816541670d0',
    demoUrl: 'https://akwayasolutions.com/',
    githubUrl: 'https://github.com/example/akwaya',
    featured: true,
    duration: '3 Weeks'
  },
  {
    id: 'palizi',
    title: 'Palizi',
    category: 'web',
    description: 'A modern, high-converting digital business card and corporate identity platform engineered for professional networking.',
    detailedDescription: 'Palizi is a sleek personal branding and corporate presentation portal crafted with highly structured layout systems. Implemented via Bootstrap and vanilla JavaScript, it facilitates professional networking, instant contact exchanges, and service catalogs. Standardized design rules ensure extreme performance, fast page-loads, and a highly responsive user experience across both mobile devices and desktop views.',
    techStack: ['HTML', 'Bootstrap', 'Javascript'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2FPalizi.PNG?alt=media&token=4236ab6d-94f1-4437-851a-8e565d744d71',
    demoUrl: 'https://palizi.biz/',
    githubUrl: 'https://github.com/example/palizi',
    featured: true,
    duration: '1 Week'
  },
  {
    id: 'gpt-3',
    title: 'GPT 3',
    category: 'web',
    description: 'A modern and fully responsive landing presentation showcasing a sleek futuristic visual layout inspired by OpenAI\'s language models.',
    detailedDescription: 'An immersive, visually spectacular promotional experience designed with React and Tailwind CSS. Hosted on Netlify, the application includes customizable visual containers, dynamic CTA buttons, grid lists for features representation, and high-fidelity typography. The page transitions are smooth, fully interactive, and optimized for low-latency asset loads.',
    techStack: ['React', 'JSX', 'Vite', 'Tailwind'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2FGPT%203.PNG?alt=media&token=a720effb-148f-4d17-b81c-430491589c6c',
    demoUrl: 'https://gpt3-1.netlify.app/',
    githubUrl: 'https://github.com/example/gpt3',
    featured: true,
    duration: '1 Week'
  },
  {
    id: 'econ-africa',
    title: 'Econ Africa',
    category: 'web',
    description: 'An executive consultation and corporate presentation gateway dedicated to financial and economic advisory services across the region.',
    detailedDescription: 'Crafted for Econ Africa, this enterprise portal presents strategic research documents, policy advice sections, and interaction modules. Engineered using responsive Bootstrap grid structures and clean HTML/JS modules, the site offers accessible navigation patterns, detailed service boards, and rapid document-retrieval pathways for stakeholders and corporate partners.',
    techStack: ['HTML', 'Bootstrap', 'Javascript'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2FEcon.PNG?alt=media&token=2ce745f6-a691-42a8-9d00-37b61be6a112',
    demoUrl: 'https://econ.africa/',
    githubUrl: 'https://github.com/example/econ-africa',
    featured: true,
    duration: '2 Weeks'
  },
  {
    id: 'pilosen-kenya',
    title: 'Pilosen Kenya',
    category: 'web',
    description: 'A responsive healthcare presentation and product discovery portal featuring integrated real-time patient support channels.',
    detailedDescription: 'Designed and deployed for Pilosen Kenya, this digital health presentation platform features dynamic product catalogs, safety documentation, and client advice sections. Features an integrated Tawk.to live chat console for sub-second communication, Bootstrap-based responsive styling, and vanilla JavaScript event handlers ensuring continuous user engagement and seamless interface responses.',
    techStack: ['HTML', 'Bootstrap', 'Javascript', 'Tawk'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2FPilosen.PNG?alt=media&token=bbaa5660-4553-4fa0-b672-5f427c108e61',
    demoUrl: 'https://pilosenkenya.com/',
    githubUrl: 'https://github.com/example/pilosen-kenya',
    featured: true,
    duration: '1.5 Weeks'
  },
  {
    id: '24-7',
    title: '24-7',
    category: 'web',
    description: 'A continuous, around-the-clock emergency assistance and logistics coordination hub optimized for immediate multi-channel contact.',
    detailedDescription: '24-7 provides a rapid response support and logistics gateway equipped with persistent help triggers, navigation maps, and interactive support panels. Leveraged high-availability HTML/Bootstrap code bases coupled with Tawk.to real-time communication agents to maximize visitor retention and coordinate rapid service responses for critical needs.',
    techStack: ['HTML', 'Bootstrap', 'Javascript', 'Tawk'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2F24-7.PNG?alt=media&token=ef46b225-9790-4d5f-8614-3f767f084cc0',
    demoUrl: 'https://24-7.co.ke/',
    githubUrl: 'https://github.com/example/247-co-ke',
    featured: true,
    duration: '2 Weeks'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Sleek, responsive, and SEO-optimized sites built with cutting-edge frameworks to turn global web visitors into active customers.',
    priceStart: 1200,
    features: [
      'High-Converting Custom Websites',
      'Mobile-First Responsive Design',
      'SEO Ready Code Skeletons',
      'Performance Up To 100% Google Core Vitals'
    ],
    iconName: 'Globe',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fweb%20development.png?alt=media&token=a0979b0b-c766-4d10-ae41-434ad95b4342'
  },
  {
    id: 'custom-web-applications',
    title: 'Custom Web Applications',
    description: 'Tailored, secure web apps, administrative portals, and data visualization tools designed for ultimate client interactivity.',
    priceStart: 3500,
    features: [
      'Tailor-Made Operational Interfaces',
      'Scalable Backend State Coordination',
      'Secure Identity & Authentications',
      'Full-screen Data Charts Integration'
    ],
    iconName: 'Laptop',
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'business-process-automation',
    title: 'Business Process Automation',
    description: 'Intelligent process maps and automated sequences to eradicate error-prone manual handoffs and optimize operations.',
    priceStart: 2500,
    features: [
      'Repetitive Workflow Automations',
      'Third-Party Webhook Registries',
      'Custom Background Job Schedulers',
      'Human Error Latency Reductions'
    ],
    iconName: 'Cpu',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fbusiness%20process%20automation.png?alt=media&token=8807ab7b-f4bb-475e-8005-702fa320a6b5'
  },
  {
    id: 'crm-setup-customization',
    title: 'CRM Setup & Customization',
    description: 'Configuring agile customer pipelines, CRM environments, and synchronized client communications to boost loyalty.',
    priceStart: 1500,
    features: [
      'Custom Funnel Pipeline Engineering',
      'Automated Lead Retention Alerters',
      'Activity Thread Synchronizations',
      'Integrated User Communication Hubs'
    ],
    iconName: 'Users',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fcrm.png?alt=media&token=16b01eee-71b8-451e-a388-29e06a704379'
  },
  {
    id: 'payment-gateway-integration',
    title: 'Payment Gateway Integration',
    description: 'Frictionless, compliant multi-provider checkout structures, dynamic invoicing, and secure billing portals.',
    priceStart: 1800,
    features: [
      'Multi-Currency Gateway Checkout Handles',
      'Encrypted Payment Card Shields',
      'Recurring Customer Subscription Plans',
      'Invoice Manifest Document Generation'
    ],
    iconName: 'CreditCard',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fpayment.png?alt=media&token=ae32303c-2394-44d7-b71b-d55195bad6fa'
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance',
    description: 'Routine vulnerability auditing, dependency upgrades, speed optimization, and high-availability uptime checks.',
    priceStart: 900,
    features: [
      'Weekly Dependency Patch Rollouts',
      '24/7 Global Live Service Ping Monitors',
      'Database Defragment & Optimization Run',
      'Continuous Version-Control Branch Audits'
    ],
    iconName: 'RotateCw',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Architecting resilient, elastic cloud architectures, Firestore database schemas, and highly secure cloud environments.',
    priceStart: 2800,
    features: [
      'Bare-Metal Cloud Instances Configuration',
      'Secure Firestore Database Schema Sets',
      'Distributed Data Caching Segments',
      'Disaster Recovery Automated Backups'
    ],
    iconName: 'Cloud',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fcloud%20solutions.png?alt=media&token=0ef35214-0365-4fac-84ad-277ce5ba60fb'
  },
  {
    id: 'deployment-devops',
    title: 'Deployment & DevOps',
    description: 'Configuring automated CI/CD deployment pipelines, managing docker container environments, and solidifying cloud scale.',
    priceStart: 2200,
    features: [
      'YAML-Based Action Pipelines',
      'Docker Swarm/Kubernetes Manifests',
      'Zero-Downtime Server Rollovers',
      'Active Event Logging & Alerts Trace'
    ],
    iconName: 'Terminal',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fdevops.png?alt=media&token=2823a12d-f5f0-4d2a-a57b-bda18d90c12d'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Formulating technical acquisition roadmaps, metadata tags structures, and marketing campaigns to amplify your virtual reach.',
    priceStart: 2000,
    features: [
      'Multi-Channel Lead Optimization Plan',
      'Search Engine Meta Attribute Tags',
      'Conversion Analytics Visualizers',
      'Targeted Customer Funnel Campaigns'
    ],
    iconName: 'TrendingUp',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fdigital%20marketing.png?alt=media&token=15e62b47-c868-429f-97f6-d37d79e6c7c4'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Shaping magnificent brand identities, vectorized layout assets, custom logos, and gorgeous typographic elements.',
    priceStart: 1000,
    features: [
      'Vector Scalable Canvas Logo Outlines',
      'Corporate Layout Document Blueprints',
      'Premium Color Scheme Style Guides',
      'Eye-Safe Web Contrast Layout Assets'
    ],
    iconName: 'Palette',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Services%2Fgraphic%20design.png?alt=media&token=bd01a9ac-9309-4a7b-a742-dc14673a8e92'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Accelerating React Performance: Advanced Component Orchestration',
    summary: 'Master key patterns to prevent redundant React renders, optimize lazy-loading bundles, and leverage robust web workers.',
    content: `Rendering bottlenecks are the most common source of lag in modern client web applications. In this article, we dive deep into strategies for building lightweight, responsive web interfaces that maintain fluid 60FPS responses even during intense data processing.

### 1. The React Re-render Chain
Whenever a state variable updates, React sweeps down the component tree, re-evaluating each child element. If the child's structure is complex or involves intensive calculations, this overhead piles up.
To prevent this, leverage:
- **'React.memo' for static UI structures**: Pure components that depend strictly on static properties should be memorized to completely halt evaluation when independent root state shifts.
- **'useMemo' for compute-heavy transformations**: If sorting a dataset of 5,000 nodes, keep the computation behind a strict property key tracker.

### 2. Offloading with Web Workers
Don't hog the main thread! For large file parsing or image decoding filters, offload tasks directly using local web worker scripts:

const worker = new Worker('/workers/analyzer.js');
worker.postMessage({ data: rawAnalytics });

This leaves the main rendering thread entirely clear to respond instantly to clicks, swipes, and animations.

### 3. CSS-Based Layout Stability
Ensure you specify image placeholders and structural layout grid sizing explicitly. This stabilizes Content Layout Shifts (CLS), boosting your professional Core Web Vitals rankings on major search engines.`,
    category: 'coding',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    date: 'June 05, 2026',
    views: 0,
    likes: 84,
    comments: [
      { id: 'com-1', author: 'Alexandra Vance', content: 'Remarkably clear breakdown. Implementing Web Workers solved our dashboard lagging issues instantly!', createdAt: '2026-06-06T09:30:00Z' },
      { id: 'com-2', author: 'Markus Chen', content: 'Nice advice on using explicit image sizes. That layout shift error was bugging my Lighthouse score.', createdAt: '2026-06-07T14:15:00Z' }
    ],
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Mastering Styling Constraints with Tailwind CSS v4.0',
    summary: 'Explore the newly refined design possibilities, native dark-mode tokens, and ultra-fast compilation architectures.',
    content: `The launch of Tailwind CSS v4.0 streamlines how modern designers approach system configurations. By eliminating complex config boilerplates and prioritizing bare-metal CSS rules, styling complex web assets has never been more straightforward.

### 1. Zero-Config Design Customizations
Instead of maintaining lengthy JavaScript configurations, Tailwind v4.0 handles configuration directly inside your global CSS file using standard '@theme' declarations:

@import "tailwindcss";

@theme {
  --color-brand-primary: #0f172a;
  --font-display: "Space Grotesk", sans-serif;
}

This makes standard variable lookups, code completion, and project compilation extremely responsive.

### 2. High-Performance Fluid Layouts
Use standard flex combinations paired with responsive prefixes ('md:text-lg', 'lg:px-12') to craft dynamic grid structures that gracefully scale from mobile phone touchscreens to ultra-wide desktop monitors. 

### 3. Dynamic Dark Mode Integration
With native-level class structures, applying visual themes requires zero JS overhead. Simply add standard system classes and enjoy flawless background transitions across your portfolio containers.`,
    category: 'design',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    date: 'May 28, 2026',
    views: 0,
    likes: 56,
    comments: [
      { id: 'com-3', author: 'Devin Cole', content: 'The shift from JS config files to @theme in CSS in v4 is such a relief. Great post!', createdAt: '2026-05-29T18:20:00Z' }
    ],
    featured: false
  },
  {
    id: 'blog-3',
    title: 'The Blueprint of a Resilient System Architecture',
    summary: 'A developer guide on caching layers, security credentials management, and high-availability API service patterns.',
    content: `Scalability isn't just a buzzword; it's a structural discipline. How do you design systems that remain fully available even when experiencing massive traffic spikes or partial regional outages?

### 1. Multi-Tier Cache Topologies
Don't query the primary relational database for static catalog properties repeatedly. Implement:
1. **In-Memory Caches**: For lightning-fast key lookups.
2. **CDN Edge Caching**: Pulling assets and page templates direct from global geographic networks closest to the end user.
3. **Browser Storage (LocalStorage/IndexedDB)**: To maintain local continuity and offline interaction support within client web apps.

### 2. Hardening Security Envelopes
Ensure sensitive credentials or API parameters are strictly quarantined on server routes. Never export keys to the web browser where anyone can extract them. Instead, utilize backend API proxies:
- Expose a simple '/api/proxy' endpoint.
- Attach credentials in a secure environment file inside the cloud dashboard.
- Return filtered, sanitized JSON results to the client safely.`,
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read',
    date: 'April 19, 2026',
    views: 0,
    likes: 110,
    comments: [],
    featured: false
  }
];
