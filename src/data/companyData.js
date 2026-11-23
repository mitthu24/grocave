// Official Company Details as per Government Registration & Brand Guidelines
export const COMPANY_INFO = {
  tradeName: "GROCAVE",
  legalName: "GROCAVE",
  constitution: "Proprietorship",
  gstin: "10BHSPM4951N1ZU",
  registrationDate: "29/06/2022",
  tagline: "BUILD • GROW • THRIVE",
  subTagline: "Powering Innovations for a Healthier, Smarter Tomorrow.",
  industry: "Software Engineering, Cloud SaaS & Enterprise Problem Solving",
  
  contact: {
    phone: "7371005525",
    phoneFormatted: "+91 73710 05525",
    email: "info.grocave@gmail.com",
    supportEmail: "info.grocave@gmail.com",
    whatsapp: "https://wa.me/917371005525?text=Hello%20Grocave%20Team%2C%20I%20would%20like%20to%20discuss%20a%20software%20project.",
  },

  businessAddress: {
    line1: "BUILDING NATHUNI MAHATO, DHOI Road",
    line2: "Dhoi Branch Post Office, DHOI",
    city: "Darbhanga",
    state: "Bihar",
    pincode: "846009",
    country: "India",
    full: "Dhoi Branch Post Office, BUILDING NATHUNI MAHATO, DHOI Road, DHOI, Darbhanga, Bihar, 846009, India"
  },

  compliance: {
    grievanceOfficer: "Grocave Compliance & Grievance Cell",
    grievanceEmail: "info.grocave@gmail.com",
    responseSLA: "Within 24-48 business hours",
    jurisdiction: "Competent courts in Darbhanga, Bihar, India"
  },

  brandColors: {
    primaryPurple: "#6A00FF",
    darkBackground: "#0B0B0F",
    lightBackground: "#F7F8FA"
  }
};

export const SERVICES = [
  {
    id: "custom-software",
    title: "Custom Problem-Solving Software",
    category: "Enterprise Systems",
    icon: "Cpu",
    badge: "Core Expertise",
    description: "Tailor-made software architectures engineered to eradicate operational friction, automate legacy manual processes, and drive measurable revenue expansion.",
    features: [
      "Process Automation & Workflow Orchestration",
      "Legacy Codebase Modernization & Migration",
      "Bespoke Internal Business Portals & ERPs",
      "High-concurrency Database Design"
    ]
  },
  {
    id: "saas-engineering",
    title: "Scalable SaaS Platform Engineering",
    category: "Product Development",
    icon: "Layers",
    badge: "Cloud-Native",
    description: "From architecture to deployment, we build high-availability multi-tenant cloud platforms designed for tens of thousands of concurrent users.",
    features: [
      "Multi-tenant Database & Data Isolation",
      "Stripe & Razorpay Recurring Billing Integration",
      "Role-Based Access Control (RBAC) & Single Sign-On",
      "Real-time Telemetry & Usage Analytics"
    ]
  },
  {
    id: "ai-automation",
    title: "AI Workflows & Intelligent Engines",
    category: "Next-Gen Tech",
    icon: "Sparkles",
    badge: "Intelligent",
    description: "Inject smart machine intelligence, predictive models, and automated document / data pipelines directly into your operational systems.",
    features: [
      "Custom LLM & Agentic Workflow Integration",
      "Automated OCR & Document Parsing Engines",
      "Predictive Inventory & Demand Forecasting",
      "Conversational Client Support Agents"
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    category: "Infrastructure",
    icon: "ShieldCheck",
    badge: "99.99% Reliability",
    description: "Resilient containerized environments (AWS, GCP, Docker, Kubernetes) with automated CI/CD pipelines and bank-grade data security.",
    features: [
      "Zero-downtime CI/CD Automated Pipelines",
      "Kubernetes & Docker Container Orchestration",
      "Automated Daily Offsite Backups & Disaster Recovery",
      "End-to-End TLS & Data-at-Rest Encryption"
    ]
  },
  {
    id: "mobile-web",
    title: "Cross-Platform Mobile & Web Apps",
    category: "User Experience",
    icon: "Smartphone",
    badge: "Phone-First",
    description: "Pixel-perfect, hyper-responsive applications engineered with mobile-first fluidity, offline caching, and instant load speeds.",
    features: [
      "Progressive Web Apps (PWA) & Offline Sync",
      "React Native & Flutter Cross-Platform Apps",
      "Sub-second First Contentful Paint (FCP)",
      "Adaptive Layouts For All Screen Breakpoints"
    ]
  },
  {
    id: "api-integrations",
    title: "API Ecosystem & Enterprise Integration",
    category: "Connectivity",
    icon: "Network",
    badge: "High Throughput",
    description: "Seamlessly interconnect your CRM, ERP, payment gateways, WhatsApp Business APIs, and third-party logistics services.",
    features: [
      "REST & GraphQL Microservices Architecture",
      "Payment Gateway Integration (Razorpay, Stripe, UPI)",
      "WhatsApp Cloud API & SMS Gateways",
      "Webhook Architecture & Event-driven Queues"
    ]
  }
];

export const PRODUCTS = [
  {
    name: "Grocave CoreFlow™",
    tagline: "Enterprise Operations & Inventory Intelligence",
    description: "An all-in-one business management engine that eliminates inventory stockouts, synchronizes multi-warehouse logistics, and automates GST invoicing in real-time.",
    metrics: "42% Reduction in Operating Costs",
    status: "Live & Deployed",
    tags: ["Inventory Intelligence", "GST Automation", "Multi-Store Sync"]
  },
  {
    name: "Grocave OmniPulse™",
    tagline: "Customer Engagement & WhatsApp Automation Engine",
    description: "Unifies multi-channel customer communications, automated transactional updates, and ticketing into a unified high-speed dashboard.",
    metrics: "3.8x Faster Support Resolution",
    status: "Live & Deployed",
    tags: ["WhatsApp API", "CRM Telemetry", "Automated Ticketing"]
  },
  {
    name: "Grocave CloudShield™",
    tagline: "Compliance, Audit & Security Telemetry",
    description: "Automated audit logs, Indian DPDP Act & GDPR compliance monitoring, and real-time vulnerability detection for modern tech applications.",
    metrics: "100% Audit Readiness",
    status: "Enterprise Tier",
    tags: ["DPDP 2023 Compliance", "Role Security", "Audit Telemetry"]
  }
];

export const STATS = [
  { value: "99.9%", label: "System Uptime SLA", icon: "Activity" },
  { value: "45+", label: "Problem-Solving Systems Built", icon: "Terminal" },
  { value: "< 24h", label: "Guaranteed Support Response", icon: "Clock" },
  { value: "100%", label: "Indian & Global Compliance", icon: "ShieldCheck" }
];
