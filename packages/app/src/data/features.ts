// features data section for landing page

import { TechStackCategory } from "@veloz/shared/types";

export const STACKS_NOT_AVAILABLE = [
  "golang",
  "laravel",
  "vuejs",
  "nuxtjs",
  "stripe",
];

type FeaturesDataType = {
  key: TechStackCategory;
  title: string;
  description: string;
  includeStacks: boolean;
  features: {
    title: string;
  }[];
};

export const FeaturesData = [
  {
    key: "frontend",
    title: "Frontend Frameworks / Libraries",
    description:
      "Craft responsive interfaces effortlessly with ready-made components and support for modern frontend frameworks.",
    includeStacks: true,
    features: [
      {
        title: "Integrate seamlessly with your preferred frontend frameworks.",
      },
      {
        title:
          "Optimize performance with intelligent caching and lazy loading.",
      },
      {
        title: "Built-in support for state management in complex applications.",
      },
      {
        title:
          "Ensure a smooth user experience with client-side routing and navigation.",
      },
      {
        title:
          "Simplify development with reusable components and efficient UI tools.",
      },
    ],
  },
  {
    key: "backend",
    title: "Backend Language / Frameworks",
    description:
      "Efficiently develop backend services with versatile languages, frameworks, and automated testing tools.",
    includeStacks: true,
    features: [
      {
        title:
          "Develop effortlessly with versatile backend languages and frameworks.",
      },
      {
        title:
          "APIs and SDKs built-in for quick and efficient backend development.",
      },
      {
        title: "Simplify error handling and debugging with comprehensive logs.",
      },
      {
        title: "Implement scalable architecture with microservices support.",
      },
      {
        title: "Ensure robust functionality with automated testing tools.",
      },
    ],
  },
  {
    key: "database",
    title: "Database ( NOSQL / SQL )",
    description:
      "Enjoy flexible database support with seamless data modeling, migration utilities, and support for both NoSQL and SQL databases.",
    includeStacks: true,
    features: [
      {
        title:
          "Flexible support for both NoSQL (MongoDB) and SQL (PostgreSQL, MySQL).",
      },
      {
        title: "Efficient schema management for seamless data modeling.",
      },
      {
        title: "Simplify updates with built-in database migration utilities.",
      },
      {
        title:
          "Ensure data integrity with ACID compliance in relational databases.",
      },
      {
        title: "Optimize query performance with advanced indexing strategies.",
      },
    ],
  },
  {
    key: "authentication",
    title: "Authentication",
    description:
      "Streamline user authentication with magic links, social logins, and customizable authorization levels.",
    includeStacks: true,
    features: [
      {
        title:
          "Hassle-free authentication setup, including magic links and social logins.",
      },
      {
        title: "Customize authorization levels and user roles effortlessly.",
      },
      {
        title: "Seamlessly integrate with popular authentication providers.",
      },
      {
        title: "Implement two-factor authentication for enhanced security.",
      },
      {
        title: "User-friendly password recovery and account management.",
      },
    ],
  },
  {
    key: "mailing",
    title: "Mailing",
    description:
      "Simplify email management with webhook integration, transactional email support, and DNS setup to avoid spam folders.",
    includeStacks: true,
    features: [
      {
        title: "Send transactional emails with ease.",
      },
      {
        title: "Webhook integration for receiving and forwarding emails.",
      },
      {
        title:
          "DNS setup to avoid spam folders (DKIM, DMARC, SPF in subdomain).",
      },
      {
        title: "Efficiently manage and organize your email communications.",
      },
      {
        title: "Enjoy a stress-free process.",
      },
    ],
  },
  {
    key: "payment",
    title: "Payment",
    description:
      "Simplify payment processing with checkout sessions, real-time updates, and guidelines to reduce chargebacks.",
    includeStacks: true,
    features: [
      {
        title: "Simplify payment processing with checkout sessions.",
      },
      {
        title:
          "Real-time updates on user accounts through efficient webhook management.",
      },
      {
        title:
          "Guidelines to reduce chargebacks and enhance financial security.",
      },
      {
        title:
          "Support for various payment gateways to cater to global audiences.",
      },
      {
        title:
          "Integrate subscription billing and manage recurring payments seamlessly.",
      },
    ],
  },
  {
    key: "seo",
    title: "SEO",
    description:
      "Optimize your SaaS product for search engines and secure a prime spot on Google's first page.",
    includeStacks: false,
    features: [
      {
        title: "Implement best practices for SEO to enhance online visibility.",
      },
      {
        title: "Customize meta tags, titles, and descriptions for each page.",
      },
      {
        title:
          "Generate SEO-friendly sitemaps for improved search engine indexing.",
      },
      {
        title: "Ensure mobile responsiveness for a positive user experience.",
      },
    ],
  },
] as FeaturesDataType[];
