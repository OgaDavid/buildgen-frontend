// Data generator for dynamic product ideas based on input combinations
// This file creates different product ideas based on the user's space, vibe, and timeframe selections

export type ProductIdea = {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  stack: {
    frontend: string;
    backend: string;
    auth: string;
    ai?: string;
    deployment: string;
    other?: string;
  };
  flowDiagram: string;
  erdDiagram: string;
  tasks: Array<{
    name: string;
    tool: string;
    time: string;
  }>;
  competitors: string[];
  domains: Array<{
    name: string;
    available: boolean;
  }>;
  legal: string[];
  monetization: string[];
  growth: string[];
};

// Base product ideas for different spaces
const spaceIdeas: Record<string, Partial<ProductIdea>> = {
  Fintech: {
    name: "CashFlow",
    tagline: "Personal finance, simplified.",
    description:
      "An AI-powered personal finance platform for young professionals that tracks income, expenses, and financial goals. CashFlow auto-categorizes transactions, sends proactive budget alerts, and generates personalized savings tips based on spending patterns and financial behavior. Users can connect multiple bank accounts and visualize trends to improve money habits over time.",
    icon: "DollarSign",
    stack: {
      frontend: "Next.js + Tailwind CSS",
      backend: "Node.js + Firebase Firestore",
      auth: "Firebase Auth",
      ai: "TensorFlow.js for behavioral clustering",
      deployment: "Firebase Hosting",
    },
    competitors: ["Mint", "YNAB", "PocketGuard"],
    domains: [
      { name: "cashflow.app", available: false },
      { name: "cashflowai.com", available: true },
      { name: "mycashflow.io", available: true },
    ],
  },

  Education: {
    name: "LearnLoop",
    tagline: "Never forget what you learn.",
    description:
      "LearnLoop helps students and lifelong learners retain knowledge using spaced repetition flashcards enhanced by AI. It tracks performance to optimize review schedules, integrates with Google Docs and PDFs for instant flashcard creation, and offers personalized quizzes based on weak points detected over time.",
    icon: "BookOpen",
    stack: {
      frontend: "React + MUI",
      backend: "Django + PostgreSQL",
      auth: "Auth0",
      ai: "PyTorch for knowledge decay prediction",
      deployment: "Render + Cloudflare CDN",
    },
    competitors: ["Anki", "Quizlet", "Memrise"],
    domains: [
      { name: "learnloop.app", available: true },
      { name: "learnloop.io", available: true },
      { name: "getlearnloop.com", available: true },
    ],
  },

  Productivity: {
    name: "FlowTrack",
    tagline: "Get back your time with workflows that don't suck.",
    description:
      "FlowTrack is a minimalist productivity OS for indie builders and startup founders to track goals, automate personal workflows, and maintain deep focus. It integrates calendar, to-dos, Pomodoro timers, and a knowledge graph with AI-powered summaries and suggestions based on usage patterns and burnout indicators.",
    icon: "Lightbulb",
    stack: {
      frontend: "Next.js + TailwindCSS",
      backend: "Supabase + Edge Functions",
      auth: "Clerk",
      ai: "OpenAI (GPT-4) + Pinecone for memory indexing",
      deployment: "Vercel + Supabase Edge",
    },
    competitors: ["Notion", "Tana", "Sunsama"],
    domains: [
      { name: "flowtrack.dev", available: true },
      { name: "flowtrack.io", available: true },
      { name: "flowtrack.app", available: false },
    ],
  },

  Health: {
    name: "FitPulse",
    tagline: "Fitness that fits your life.",
    description:
      "FitPulse is a hyper-personalized virtual fitness coach that adjusts workout plans daily based on biometric feedback, wearables data (like Apple Watch or Fitbit), time availability, and user feedback. It features video-guided sessions, progressive difficulty, and AI-generated nutrition guidance that adapts to performance and lifestyle.",
    icon: "Heart",
    stack: {
      frontend: "Flutter",
      backend: "Firebase + Cloud Functions",
      auth: "Firebase Auth",
      ai: "TensorFlow for adaptive programming",
      deployment: "App Store + Play Store",
    },
    competitors: ["Fitbod", "Strong", "Nike Training Club"],
    domains: [
      { name: "fitpulse.app", available: true },
      { name: "fitpulse.ai", available: true },
      { name: "getfitpulse.com", available: true },
    ],
  },

  AI: {
    name: "CopilotGPT",
    tagline: "AI that works alongside you.",
    description:
      "CopilotGPT is a multi-modal AI assistant that integrates natively with productivity suites like Gmail, Notion, and VSCode to act as a real-time collaborator. It drafts context-aware emails, summarizes long documents, generates bug fixes, and learns your preferences over time to adapt communication tone and suggestions.",
    icon: "Cpu",
    stack: {
      frontend: "Vue.js + Tailwind",
      backend: "Node.js + MongoDB + LangChain",
      auth: "Auth0",
      ai: "OpenAI API + vector memory with Pinecone",
      deployment: "AWS Amplify + Lambda",
    },
    competitors: ["Jasper AI", "Copy.ai", "GitHub Copilot"],
    domains: [
      { name: "copilotgpt.ai", available: true },
      { name: "copilot-gpt.com", available: true },
      { name: "aicompanion.app", available: true },
    ],
  },

  "Creator Tools": {
    name: "ContentForge",
    tagline: "Create content that converts.",
    description:
      "ContentForge is a creation and planning tool for social media creators and brands. It offers AI-driven content generation based on trends, audience data, and posting history. Users can collaborate with team members, schedule posts, generate captions, and view performance analytics across platforms like TikTok, LinkedIn, and Instagram.",
    icon: "Video",
    stack: {
      frontend: "React + Chakra UI",
      backend: "Node.js + PostgreSQL",
      auth: "Supabase Auth",
      ai: "OpenAI API + social trend scraping",
      deployment: "Netlify + Railway",
    },
    competitors: ["Later", "Buffer", "Hootsuite"],
    domains: [
      { name: "contentforge.io", available: true },
      { name: "contentforge.app", available: true },
      { name: "getcontentforge.com", available: true },
    ],
  },

  Food: {
    name: "MealMaster",
    tagline: "Meal planning made delicious.",
    description:
      "MealMaster helps busy individuals and families eat smarter by generating weekly meal plans based on inventory, diet preferences, and local grocery prices. The app includes AI-generated recipes, smart pantry tracking via barcode scan or receipt parsing, and one-click shopping list creation for delivery services like Instacart or Uber Eats.",
    icon: "Utensils",
    stack: {
      frontend: "React Native",
      backend: "Firebase + Express",
      auth: "Firebase Auth",
      ai: "TensorFlow.js + Gemini for categorization",
      deployment: "App Store + Play Store",
    },
    competitors: ["Mealime", "Paprika", "Yummly"],
    domains: [
      { name: "mealmaster.app", available: true },
      { name: "mealmaster.io", available: false },
      { name: "getmealmaster.com", available: true },
    ],
  },

  Logistics: {
    name: "ShipSmart",
    tagline: "Ship smarter, not harder.",
    description:
      "ShipSmart simplifies logistics for small e-commerce brands by aggregating shipping providers, automating label generation, and offering end-to-end package tracking. It also offers customs-ready documentation, volume-based discounts, and analytics to optimize fulfillment workflows. Integrates with Shopify, WooCommerce, and Etsy.",
    icon: "Package",
    stack: {
      frontend: "React + Bootstrap",
      backend: "Node.js + MongoDB + Redis",
      auth: "JWT + Passport.js",
      deployment: "Digital Ocean + Cloudflare",
    },
    competitors: ["ShipStation", "Shippo", "EasyPost"],
    domains: [
      { name: "shipsmart.io", available: false },
      { name: "shipsmartapp.com", available: true },
      { name: "getshipsmart.com", available: true },
    ],
  },
};

// Vibe modifiers based on the team size/composition
const vibeModifiers: Record<
  string,
  (idea: Partial<ProductIdea>) => Partial<ProductIdea>
> = {
  "Solo Builder": (idea) => {
    return {
      ...idea,
      stack: {
        frontend: idea.stack?.frontend || "React",
        backend: idea.stack?.backend?.includes("Firebase")
          ? idea.stack.backend
          : "Supabase", // Simpler backend
        auth: idea.stack?.auth || "JWT",
        ai: idea.stack?.ai,
        deployment: idea.stack?.deployment || "Vercel",
        other: idea.stack?.other,
      },
      legal: [
        "Basic Privacy Policy",
        "Simple Terms of Service",
        "Cookie notice",
        "GDPR compliance basics",
      ],
      monetization: [
        "Freemium model",
        "$9/mo Pro plan",
        "$99 lifetime deal",
        "Launch on AppSumo",
      ],
      growth: [
        "Product Hunt launch",
        "Twitter/X build in public",
        "Join indie hacker communities",
        "Create content around your niche",
      ],
    };
  },
  "Student Team": (idea) => {
    return {
      ...idea,
      stack: {
        frontend: idea.stack?.frontend?.includes("React")
          ? idea.stack.frontend
          : "React + Chakra UI", // Simpler UI framework
        backend: idea.stack?.backend || "Firebase",
        auth: idea.stack?.auth || "Firebase Auth",
        ai: idea.stack?.ai,
        deployment: "Vercel or Netlify", // Free tier friendly
        other: idea.stack?.other,
      },
      legal: [
        "Open source license",
        "Simple Privacy Policy",
        "Basic Terms of Use",
      ],
      monetization: [
        "Free for students",
        "Open core model",
        "Optional donations",
        "School/university partnerships",
      ],
      growth: [
        "Campus ambassador program",
        "Student hackathons",
        "University startup competitions",
        "Educational partnerships",
      ],
    };
  },
  "Early-stage Startup": (idea) => {
    return {
      ...idea,
      stack: {
        frontend: idea.stack?.frontend || "React + Redux",
        backend: idea.stack?.backend?.includes("Firebase")
          ? idea.stack.backend
          : "AWS or GCP stack", // More scalable
        auth: idea.stack?.auth || "Auth0",
        ai: idea.stack?.ai,
        deployment: idea.stack?.deployment || "AWS/GCP",
        other: "Analytics + CRM integration",
      },
      legal: [
        "Comprehensive Privacy Policy",
        "Detailed Terms of Service",
        "User data agreement",
        "GDPR & CCPA compliance",
        "Investor-friendly structure",
      ],
      monetization: [
        "Tiered subscription model",
        "Enterprise plan",
        "White label options",
        "API access for premium users",
      ],
      growth: [
        "SEO optimization",
        "Content marketing strategy",
        "Paid acquisition channels",
        "Affiliate program",
        "Partnerships with complementary tools",
      ],
    };
  },
};

// Time modifiers based on implementation timeframe
const timeModifiers: Record<
  string,
  (idea: Partial<ProductIdea>) => Partial<ProductIdea>
> = {
  "24 hours": (idea) => {
    return {
      ...idea,
      tasks: [
        { name: "Set up project scaffolding", tool: "CLI tools", time: "1h" },
        { name: "Implement core UI", tool: "Component library", time: "4h" },
        {
          name: "Add basic functionality",
          tool: idea.stack?.frontend || "React",
          time: "6h",
        },
        {
          name: "Connect to backend",
          tool: idea.stack?.backend || "Firebase",
          time: "3h",
        },
        {
          name: "Deploy MVP",
          tool: idea.stack?.deployment || "Vercel",
          time: "1h",
        },
      ],
      flowDiagram: `
        graph TD
          A[User Interface] --> B[Core Features]
          B --> C[Simple Backend]
          C --> D[Deploy MVP]
      `,
      erdDiagram: `
        erDiagram
          User ||--o{ Data : creates
          Data {
            string id
            string content
            date createdAt
          }
          User {
            string id
            string email
          }
      `,
    };
  },
  "A Weekend": (idea) => {
    return {
      ...idea,
      tasks: [
        { name: "Plan architecture", tool: "Diagrams", time: "2h" },
        { name: "Set up project", tool: "CLI tools", time: "1h" },
        {
          name: "Build frontend",
          tool: idea.stack?.frontend || "React",
          time: "8h",
        },
        {
          name: "Implement backend",
          tool: idea.stack?.backend || "Firebase",
          time: "6h",
        },
        {
          name: "Add auth system",
          tool: idea.stack?.auth || "Auth0",
          time: "3h",
        },
        {
          name: "Basic AI/ML features",
          tool: idea.stack?.ai || "API",
          time: "4h",
        },
        {
          name: "Testing & deployment",
          tool: idea.stack?.deployment || "Vercel",
          time: "2h",
        },
      ],
      flowDiagram: `
        graph TD
          A[User Interface] --> B[Auth System]
          B --> C[Core Features]
          C --> D[Backend API]
          D --> E[Data Storage]
          C --> F[Deploy]
      `,
      erdDiagram: `
        erDiagram
          User ||--o{ Project : creates
          Project ||--|{ Item : contains
          Item {
            string id
            string content
            date createdAt
          }
          User {
            string id
            string email
          }
          Project {
            string id
            string name
            date createdAt
          }
      `,
    };
  },
  "A Month": (idea) => {
    return {
      ...idea,
      tasks: [
        { name: "User research", tool: "Interviews/Survey", time: "2d" },
        { name: "UX design & wireframes", tool: "Figma", time: "3d" },
        { name: "Architecture planning", tool: "Technical docs", time: "1d" },
        {
          name: "Frontend development",
          tool: idea.stack?.frontend || "React",
          time: "1w",
        },
        {
          name: "Backend API development",
          tool: idea.stack?.backend || "Node.js",
          time: "1w",
        },
        {
          name: "Auth & user management",
          tool: idea.stack?.auth || "Auth0",
          time: "2d",
        },
        { name: "Advanced features", tool: "Various", time: "1w" },
        { name: "Testing & QA", tool: "Testing framework", time: "3d" },
        {
          name: "Deployment & CI/CD",
          tool: idea.stack?.deployment || "AWS",
          time: "2d",
        },
        { name: "Analytics integration", tool: "GA/Mixpanel", time: "1d" },
      ],
      flowDiagram: `
        graph TD
          A[User Research] --> B[Design]
          B --> C[Frontend Dev]
          C --> D[Backend Dev]
          D --> E[Auth System]
          E --> F[Advanced Features]
          F --> G[Testing]
          G --> H[Analytics]
          H --> I[Deployment]
      `,
      erdDiagram: `
        erDiagram
          User ||--o{ Project : creates
          Project ||--|{ Item : contains
          Item ||--o{ SubItem : has
          User ||--o{ Settings : configures
          User {
            string id
            string email
            date createdAt
            date lastLogin
          }
          Project {
            string id
            string name
            date createdAt
            boolean isPublic
          }
          Item {
            string id
            string content
            date createdAt
            string status
          }
          SubItem {
            string id
            string content
            boolean completed
          }
          Settings {
            string id
            json preferences
          }
      `,
    };
  },
};

// Generate a complete product idea based on inputs
export function generateProductIdea(
  space: string,
  vibe: string,
  time: string
): ProductIdea {
  // Start with the base idea for the selected space
  let baseIdea = spaceIdeas[space] || spaceIdeas["Productivity"];

  // Apply vibe modifier
  let modifiedIdea = vibeModifiers[vibe]?.(baseIdea) || baseIdea;

  // Apply time modifier
  let finalIdea = timeModifiers[time]?.(modifiedIdea) || modifiedIdea;

  // Fill in any missing fields with defaults
  return {
    name: finalIdea.name || "ProductName",
    tagline: finalIdea.tagline || "A great product for your needs.",
    description:
      finalIdea.description ||
      "A detailed description of the product would go here.",
    icon: finalIdea.icon || "Box",
    stack: {
      frontend: finalIdea.stack?.frontend || "React",
      backend: finalIdea.stack?.backend || "Node.js",
      auth: finalIdea.stack?.auth || "JWT",
      ai: finalIdea.stack?.ai,
      deployment: finalIdea.stack?.deployment || "Vercel",
      other: finalIdea.stack?.other,
    },
    flowDiagram:
      finalIdea.flowDiagram ||
      `
      graph TD
        A[Frontend] --> B[API]
        B --> C[Database]
        B --> D[Auth]
    `,
    erdDiagram:
      finalIdea.erdDiagram ||
      `
      erDiagram
        User ||--o{ Data : creates
        Data {
          string id
          string content
        }
        User {
          string id
          string email
        }
    `,
    tasks: finalIdea.tasks || [
      { name: "Setup project", tool: "CLI", time: "1h" },
      { name: "Build UI", tool: "React", time: "4h" },
      { name: "Implement backend", tool: "Node.js", time: "4h" },
    ],
    competitors: finalIdea.competitors || ["Competitor A", "Competitor B"],
    domains: finalIdea.domains || [
      { name: "product.com", available: false },
      { name: "getproduct.io", available: true },
    ],
    legal: finalIdea.legal || [
      "Privacy Policy",
      "Terms of Service",
      "Cookie notice",
    ],
    monetization: finalIdea.monetization || [
      "Free tier",
      "$10/mo subscription",
      "$100/yr plan",
    ],
    growth: finalIdea.growth || [
      "Social media",
      "Content marketing",
      "SEO optimization",
    ],
  };
}
