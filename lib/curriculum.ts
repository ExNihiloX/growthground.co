// Master curriculum for GrowthGround - A comprehensive learning path for founders and entrepreneurs

export interface CurriculumLesson {
  id: string;
  title: string;
  duration: number; // in minutes
  coreConcepts: string[];
  analogy: string;
  content?: {
    hook: string;
    coreExplanation: string[];
    strategicInsights: string[];
    talkingToDevs: string[];
    interactiveElementBrief: string;
  };
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: CurriculumLesson[];
  estimatedTime: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isLocked: boolean;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  prerequisites?: string[];
  learningOutcomes: string[];
}

export const masterCurriculum: CurriculumModule[] = [
  {
    id: 'app-fundamentals',
    title: 'App Fundamentals',
    description: 'Understand the core building blocks of modern applications and how they work together.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 180,
    difficulty: 'Beginner',
    category: 'Fundamentals',
    isLocked: false,
    instructor: 'Sarah Johnson',
    rating: 4.9,
    studentsEnrolled: 15420,
    learningOutcomes: [
      'Understand the anatomy of modern web applications',
      'Learn how frontend and backend communicate',
      'Grasp the role of databases in applications',
      'Understand hosting and deployment basics'
    ],
    lessons: [
      {
        id: 'anatomy-web-app',
        title: 'Anatomy of a Web App',
        duration: 45,
        coreConcepts: ['Frontend', 'Backend', 'Database', 'API'],
        analogy: 'A web app is like a restaurant with a dining room (frontend), kitchen (backend), and pantry (database).',
        content: {
          hook: 'Every successful app you use daily—from Instagram to Uber—follows the same basic architecture. Understanding this foundation is crucial for making informed decisions about your product.',
          coreExplanation: [
            'Think of a web application like a restaurant. The <strong>Frontend</strong> is the dining room where customers (users) sit and interact with the menu and waitstaff. It\'s what users see and touch—the buttons, forms, and visual design.',
            'The <strong>Backend</strong> is the kitchen where the real work happens. When a customer orders food, the waitstaff takes that request to the kitchen. Similarly, when a user clicks a button, the frontend sends a request to the backend to process it.',
            'The <strong>Database</strong> is like the restaurant\'s pantry and recipe book. It stores all the ingredients (user data, content, settings) and remembers how to prepare each dish (business logic and rules).',
            'The <strong>API</strong> (Application Programming Interface) is like the waitstaff—it carries messages between the dining room and kitchen, ensuring orders are communicated clearly and responses are delivered properly.'
          ],
          strategicInsights: [
            '<strong>User Experience Drives Frontend Decisions:</strong> Your frontend technology choice should prioritize user experience and development speed over technical complexity.',
            '<strong>Backend Scalability Matters Early:</strong> While you can redesign your frontend easily, backend architecture changes are expensive. Plan for growth from day one.',
            '<strong>Data is Your Moat:</strong> Your database becomes more valuable over time. Invest in proper data structure and security from the beginning.',
            '<strong>API Design Affects Everything:</strong> Well-designed APIs make it easier to build mobile apps, integrate with partners, and scale your team.'
          ],
          talkingToDevs: [
            'What frontend framework are we using and why is it the best choice for our user experience goals?',
            'How is our backend architected to handle growth, and what are the potential bottlenecks?',
            'What\'s our database strategy for ensuring data consistency and performance as we scale?',
            'How are we designing our APIs to be flexible for future features and integrations?'
          ],
          interactiveElementBrief: 'Create a \'Web App Builder\' where users drag and drop components (Frontend, Backend, Database, API) to build a simple app architecture, learning how each piece connects and communicates.'
        }
      },
      {
        id: 'frontend-backend-communication',
        title: 'How Frontend and Backend Talk',
        duration: 60,
        coreConcepts: ['HTTP Requests', 'REST APIs', 'JSON', 'Authentication'],
        analogy: 'Frontend and backend communicate like ordering at a drive-through: you make a request, wait for processing, and receive a response.',
        content: {
          hook: 'When you tap "Post" on social media, a complex conversation happens in milliseconds between your phone and servers around the world. Understanding this conversation is key to building reliable products.',
          coreExplanation: [
            'Communication between frontend and backend happens through <strong>HTTP requests</strong>—think of them as digital letters with specific formats and purposes.',
            'A <strong>REST API</strong> is like a well-organized post office with clear rules: GET requests retrieve information (like checking your mailbox), POST requests send new information (like mailing a letter), PUT requests update existing information, and DELETE requests remove information.',
            '<strong>JSON</strong> (JavaScript Object Notation) is the common language both sides speak—it\'s like having a universal translator that ensures your frontend\'s request is understood by any backend.',
            '<strong>Authentication</strong> is like showing your ID at the post office—it ensures only authorized users can access certain information or perform specific actions.'
          ],
          strategicInsights: [
            '<strong>API-First Development Accelerates Growth:</strong> Building your API before your frontend allows multiple teams to work in parallel and makes future platform expansion easier.',
            '<strong>Error Handling Defines User Experience:</strong> How your app handles failed requests (network issues, server errors) often determines user satisfaction more than happy-path features.',
            '<strong>Authentication Strategy Affects Everything:</strong> Your login and security approach impacts user onboarding, data privacy compliance, and integration capabilities.',
            '<strong>Real-time Features Require Different Architecture:</strong> Features like chat or live updates need WebSockets or similar technologies beyond basic HTTP requests.'
          ],
          talkingToDevs: [
            'What\'s our error handling strategy when the backend is unavailable or slow?',
            'How are we structuring our API endpoints to be intuitive and consistent?',
            'What authentication method are we using and how does it impact user experience?',
            'Do we need real-time features, and how would that change our architecture?'
          ],
          interactiveElementBrief: 'Build an \'API Request Simulator\' where users can construct different types of HTTP requests (GET, POST, PUT, DELETE) and see how the backend responds, including error scenarios.'
        }
      },
      {
        id: 'databases-data-storage',
        title: 'Databases and Data Storage',
        duration: 75,
        coreConcepts: ['SQL vs NoSQL', 'Data Modeling', 'Relationships', 'Scalability'],
        analogy: 'Databases are like different types of filing systems: SQL is like a filing cabinet with strict folders and labels, while NoSQL is like a flexible storage room.',
        content: {
          hook: 'Your database choice will impact your app\'s performance, scalability, and development speed for years to come. Making the right choice early can save millions in engineering costs later.',
          coreExplanation: [
            '<strong>SQL databases</strong> are like traditional filing cabinets with strict organization. Every piece of information has a specific place, and you must follow the filing system rules. They\'re perfect when you need guaranteed consistency and complex relationships between data.',
            '<strong>NoSQL databases</strong> are like flexible storage rooms where you can organize things however makes sense for each situation. They\'re ideal for rapid development and handling varied data types, but require more careful planning for consistency.',
            '<strong>Data modeling</strong> is like designing the blueprint for your filing system before you start storing documents. Poor planning here leads to expensive reorganization later.',
            '<strong>Relationships</strong> in databases are like cross-references in a library—they help you find connected information quickly, but too many can slow down the system.'
          ],
          strategicInsights: [
            '<strong>Start Simple, Plan for Complexity:</strong> Begin with a straightforward database structure, but design it to handle future complexity without complete rewrites.',
            '<strong>Data Consistency vs. Speed Trade-offs:</strong> Understand when you need guaranteed consistency (financial transactions) versus when eventual consistency is acceptable (social media feeds).',
            '<strong>Backup and Recovery Are Non-negotiable:</strong> Your database backup strategy is as important as your product features—data loss can kill a company overnight.',
            '<strong>Compliance Shapes Architecture:</strong> GDPR, HIPAA, and other regulations may dictate your database choices and data handling procedures.'
          ],
          talkingToDevs: [
            'What type of database best fits our data structure and query patterns?',
            'How are we handling data relationships and ensuring consistency?',
            'What\'s our backup and disaster recovery plan for the database?',
            'How will our database choice affect our ability to scale and comply with regulations?'
          ],
          interactiveElementBrief: 'Create a \'Database Designer\' tool where users choose between SQL and NoSQL for different scenarios (e-commerce, social media, analytics) and see the trade-offs in real-time.'
        }
      }
    ]
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    description: 'Master the art of creating beautiful, responsive user interfaces that users love to interact with.',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 240,
    difficulty: 'Intermediate',
    category: 'Development',
    isLocked: false,
    instructor: 'Michael Chen',
    rating: 4.8,
    studentsEnrolled: 12350,
    prerequisites: ['app-fundamentals'],
    learningOutcomes: [
      'Understand modern frontend frameworks and their trade-offs',
      'Learn responsive design principles and mobile-first development',
      'Master state management and component architecture',
      'Implement performance optimization techniques'
    ],
    lessons: [
      {
        id: 'html-css-javascript',
        title: 'HTML, CSS, and JavaScript',
        duration: 60,
        coreConcepts: ['HTML Structure', 'CSS Styling', 'JavaScript Interactivity', 'DOM Manipulation'],
        analogy: 'HTML is the skeleton, CSS is the clothing and makeup, and JavaScript is the personality that brings everything to life.'
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        duration: 90,
        coreConcepts: ['Mobile-First Design', 'Flexbox', 'CSS Grid', 'Media Queries'],
        analogy: 'Responsive design is like water—it adapts to fit any container, whether it\'s a phone, tablet, or desktop.'
      },
      {
        id: 'frontend-frameworks',
        title: 'Frontend Frameworks',
        duration: 90,
        coreConcepts: ['React', 'Vue', 'Angular', 'Component Architecture'],
        analogy: 'Frontend frameworks are like IKEA furniture kits—they provide pre-built components that you can assemble into custom solutions.'
      }
    ]
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    description: 'Build robust server-side applications that can handle millions of users and complex business logic.',
    thumbnail: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 300,
    difficulty: 'Advanced',
    category: 'Development',
    isLocked: false,
    instructor: 'David Rodriguez',
    rating: 4.7,
    studentsEnrolled: 8920,
    prerequisites: ['app-fundamentals', 'frontend-development'],
    learningOutcomes: [
      'Design and implement RESTful APIs',
      'Understand database design and optimization',
      'Learn authentication and security best practices',
      'Master server deployment and scaling strategies'
    ],
    lessons: [
      {
        id: 'server-architecture',
        title: 'Server Architecture',
        duration: 90,
        coreConcepts: ['Server Types', 'Load Balancing', 'Microservices', 'Monoliths'],
        analogy: 'Server architecture is like city planning—you need to decide between a single large building (monolith) or multiple specialized buildings (microservices).'
      },
      {
        id: 'apis-endpoints',
        title: 'APIs and Endpoints',
        duration: 120,
        coreConcepts: ['REST', 'GraphQL', 'API Design', 'Documentation'],
        analogy: 'APIs are like a restaurant menu—they tell other applications what services you offer and how to order them.'
      },
      {
        id: 'authentication-security',
        title: 'Authentication and Security',
        duration: 90,
        coreConcepts: ['JWT Tokens', 'OAuth', 'Encryption', 'Security Headers'],
        analogy: 'Authentication is like a bouncer at a club—it checks IDs and decides who gets in and what they can access.'
      }
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Create native and cross-platform mobile applications that provide exceptional user experiences.',
    thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 320,
    difficulty: 'Intermediate',
    category: 'Development',
    isLocked: false,
    instructor: 'Emily Watson',
    rating: 4.6,
    studentsEnrolled: 7234,
    prerequisites: ['frontend-development'],
    learningOutcomes: [
      'Understand mobile app development approaches',
      'Learn cross-platform development with React Native',
      'Master mobile UI/UX design principles',
      'Implement app store deployment strategies'
    ],
    lessons: [
      {
        id: 'mobile-platforms',
        title: 'Mobile Platforms Overview',
        duration: 60,
        coreConcepts: ['iOS', 'Android', 'Cross-Platform', 'Native Development'],
        analogy: 'Mobile platforms are like different languages—you can either learn each one separately or use a translator (cross-platform framework).'
      },
      {
        id: 'react-native-development',
        title: 'React Native Development',
        duration: 120,
        coreConcepts: ['React Native', 'Components', 'Navigation', 'State Management'],
        analogy: 'React Native is like having a universal remote that can control both your TV and stereo with the same buttons.'
      },
      {
        id: 'mobile-ui-ux',
        title: 'Mobile UI/UX Design',
        duration: 80,
        coreConcepts: ['Touch Interfaces', 'Mobile Navigation', 'Performance', 'Accessibility'],
        analogy: 'Mobile UI design is like designing for a keyhole—you have limited space but need to provide a complete experience.'
      },
      {
        id: 'native-vs-cross-platform',
        title: 'Native vs. Cross-Platform',
        duration: 60,
        coreConcepts: ['Performance Trade-offs', 'Development Speed', 'Platform Features', 'Team Structure'],
        analogy: 'Choosing between native and cross-platform is like hiring a specialist chef for Italian food versus a fusion chef who can make great sushi and pasta from the same kitchen.',
        content: {
          hook: 'Your app needs to be on your users\' phones. But should you build two separate, native apps for iOS and Android, or one single app that works on both? This is one of the biggest strategic decisions a mobile-first startup will face.',
          coreExplanation: [
            'There are two main paths to building a mobile app.',
            '<strong>Native Development</strong> is like hiring a specialist chef for Italian food and another for Japanese food. For iOS, developers use Apple\'s language (Swift) and tools (Xcode). For Android, they use Google\'s language (Kotlin) and tools (Android Studio). The result is the absolute best performance, a perfect look and feel that matches the operating system, and immediate access to the latest device features (like new camera APIs). However, it\'s expensive and slow, as you have to build and maintain two completely separate codebases with two separate teams.',
            '<strong>Cross-Platform Development</strong> is like hiring a fusion chef who can make great sushi and great pasta from the same kitchen. Using a framework like React Native or Flutter, developers write one codebase that can be compiled into both an iOS app and an Android app. This is dramatically faster and cheaper, as you only have one team and one codebase to manage. The trade-off is a slight performance hit and sometimes a small delay in accessing the very latest native features. For the vast majority of apps, this trade-off is more than worth it.',
            'Don\'t forget the web: A "Progressive Web App" (PWA) is a third option. It\'s a mobile website that can be "installed" on a user\'s home screen and can work offline. It\'s the fastest and cheapest way to get onto a user\'s phone, but it\'s more limited than a true app.'
          ],
          strategicInsights: [
            '<strong>Budget and Speed are Key:</strong> For most startups, cross-platform is the logical choice. It allows you to reach both iOS and Android users with half the team and in half the time.',
            '<strong>When to Go Native:</strong> Native is the right choice if your app\'s core value proposition depends on cutting-edge performance, complex animations, or immediate access to the latest OS-specific hardware features (like advanced AR or camera functions).',
            '<strong>Don\'t Forget the Web:</strong> A "Progressive Web App" (PWA) is a third option. It\'s a mobile website that can be "installed" on a user\'s home screen and can work offline. It\'s the fastest and cheapest way to get onto a user\'s phone, but it\'s more limited than a true app.'
          ],
          talkingToDevs: [
            'Let\'s discuss the native vs. cross-platform trade-off. For our app\'s core features, do we truly need the performance of a native app?',
            'If we choose React Native, how will we handle any features that might require custom native code?',
            'Could we start with a PWA to test the market before investing in a full cross-platform application?'
          ],
          interactiveElementBrief: 'Create a \'Mobile Strategy Calculator\'. The user answers questions via sliders: "How important is budget? (Low/High)", "How important is raw performance? (Low/High)", "How quickly do you need to launch? (Slow/Fast)". Based on their inputs, the tool provides a recommendation: "Cross-Platform Recommended," "Native Recommended," or "Consider a PWA."'
        }
      }
    ]
  },
  {
    id: 'user-experience-design',
    title: 'User Experience Design',
    description: 'Design intuitive, user-centered experiences that solve real problems and delight your customers.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 200,
    difficulty: 'Beginner',
    category: 'Design',
    isLocked: false,
    instructor: 'Anna Martinez',
    rating: 4.9,
    studentsEnrolled: 11234,
    learningOutcomes: [
      'Master the design thinking process',
      'Learn user research and validation techniques',
      'Create wireframes and prototypes',
      'Understand visual design principles'
    ],
    lessons: [
      {
        id: 'design-thinking-process',
        title: 'Design Thinking Process',
        duration: 60,
        coreConcepts: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
        analogy: 'Design thinking is like being a detective—you gather clues about user problems, form hypotheses, and test your theories.'
      },
      {
        id: 'user-research-methods',
        title: 'User Research Methods',
        duration: 70,
        coreConcepts: ['Interviews', 'Surveys', 'Usability Testing', 'Analytics'],
        analogy: 'User research is like being a journalist—you ask the right questions to uncover the real story behind user behavior.'
      },
      {
        id: 'wireframing-prototyping',
        title: 'Wireframing and Prototyping',
        duration: 70,
        coreConcepts: ['Information Architecture', 'User Flows', 'Low-fidelity Prototypes', 'High-fidelity Mockups'],
        analogy: 'Wireframing is like creating a blueprint for a house—you plan the layout before you start decorating.'
      }
    ]
  },
  {
    id: 'quality-security',
    title: 'Ensuring Quality & Security',
    description: 'Build robust, secure applications with comprehensive testing strategies and security best practices.',
    thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 280,
    difficulty: 'Advanced',
    category: 'Operations',
    isLocked: false,
    instructor: 'Dr. James Wilson',
    rating: 4.8,
    studentsEnrolled: 6789,
    prerequisites: ['backend-development'],
    learningOutcomes: [
      'Implement comprehensive testing strategies',
      'Understand web security fundamentals',
      'Learn performance optimization techniques',
      'Master accessibility best practices'
    ],
    lessons: [
      {
        id: 'full-testing-spectrum',
        title: 'The Full Testing Spectrum',
        duration: 90,
        coreConcepts: ['Unit Tests', 'Integration Tests', 'End-to-End Tests', 'Manual QA'],
        analogy: 'Testing your app is like ensuring a new car is safe—you test individual parts, how they work together, and the complete driving experience.',
        content: {
          hook: 'Unit and Integration tests are great for checking if the code works. But how do you verify the entire user journey works as expected from start to finish? That requires a broader spectrum of testing.',
          coreExplanation: [
            'Think of testing your app like ensuring a new car is safe.',
            '<strong>Unit Tests</strong> are for the smallest parts: Does the spark plug fire? Do the brake pads have friction?',
            '<strong>Integration Tests</strong> check if parts work together: Does pressing the brake pedal engage the brake pads?',
            'But you still need to test the whole car. <strong>End-to-End (E2E) Tests</strong> are like putting a crash test dummy in the driver\'s seat and running the car through a real-world course. An E2E test for your app would be an automated script that: Opens a real web browser, navigates to your sign-up page, fills out the form and creates a new user, logs in as that user, navigates to the dashboard and clicks a button, and verifies that the expected text appears on the screen. These tests are slow and brittle, but they give you the highest confidence that critical user flows are working.',
            'Finally, <strong>Manual QA</strong> (Quality Assurance) is having a human test driver take the car on the road to "feel" how it handles and look for subtle issues the robots might have missed. Your team or a dedicated QA specialist will manually click through the app, trying to break it and checking for visual polish and usability issues.'
          ],
          strategicInsights: [
            '<strong>The Testing Pyramid:</strong> A healthy project has many fast unit tests at the base, fewer integration tests in the middle, and a small number of critical E2E tests at the top. Relying only on E2E or manual testing is slow and inefficient.',
            '<strong>User Flow Confidence:</strong> E2E tests are essential for giving you confidence that your most critical business flows—like user sign-up and checkout—are always working.',
            '<strong>The Human Element:</strong> Automation can\'t catch everything. Budgeting for manual QA, especially before a major release, is crucial for ensuring a high-quality user experience.'
          ],
          talkingToDevs: [
            'What are the most critical user journeys for our business, and do we have E2E tests covering them?',
            'What is our strategy for manual QA? Who is responsible for it, and when does it happen in our release cycle?',
            'How can I help with QA? Is there a test plan I can follow to check new features?'
          ],
          interactiveElementBrief: 'Create a \'Testing Pyramid Builder.\' The user sees a pyramid shape divided into three sections. They must drag labels ("Unit Test", "Integration Test", "E2E Test", "Manual QA") into the correct section of the pyramid, reinforcing the concept of how many of each test type a healthy project should have.'
        }
      },
      {
        id: 'web-security-fundamentals',
        title: 'Web Security Fundamentals',
        duration: 100,
        coreConcepts: ['Injection Attacks', 'XSS', 'Authentication', 'HTTPS'],
        analogy: 'Web security is like securing your house—you need multiple layers of defense including locks, alarms, and security cameras.',
        content: {
          hook: 'A single security breach can destroy your startup\'s reputation and user trust overnight. As a founder, you don\'t need to be a hacker, but you absolutely must understand the fundamental principles of keeping your users and your company safe.',
          coreExplanation: [
            'Think of your app\'s security like securing your house. You need multiple layers of defense. Here are a few of the most common threats to be aware of (part of the famous "OWASP Top 10"):',
            '<strong>Injection Attacks</strong> are like a burglar tricking your smart lock into opening by shouting a malicious command through the mail slot. In code, this happens when your app takes user input (like from a search box) and runs it on the database without cleaning it first. An attacker can "inject" a malicious database command to steal or delete all your data. Defense: Always sanitize and validate all user input.',
            '<strong>Cross-Site Scripting (XSS)</strong> is like someone leaving a fake, dangerous package on your doorstep for another visitor to open. An attacker posts malicious JavaScript code onto your site (e.g., in a comment). When another user views that comment, the script runs in their browser and can steal their login token or redirect them to a phishing site. Defense: Always encode output to ensure browsers treat it as text, not runnable code.',
            '<strong>Broken Authentication</strong> is simply leaving your front door unlocked. This includes weak password policies, predictable session IDs, or not properly invalidating a user\'s session when they log out. Defense: Use a trusted, battle-tested authentication provider (like Supabase Auth, which you\'re using!) and enforce Multi-Factor Authentication (MFA).'
          ],
          strategicInsights: [
            '<strong>Security is a Process, Not a Feature:</strong> It\'s an ongoing responsibility. You should conduct regular security audits and vulnerability scans.',
            '<strong>The Biggest Weakness is Human:</strong> The most common security failures come from social engineering (phishing) of your employees. Train your team on security best practices.',
            '<strong>Compliance is Non-Negotiable:</strong> If you handle sensitive data (health, finance), you are subject to strict legal regulations like GDPR or HIPAA. A breach can result in massive fines.'
          ],
          talkingToDevs: [
            'How are we protecting against the most common threats, like SQL Injection and XSS?',
            'What third-party services are we using to help with security, like vulnerability scanning or firewall services?',
            'What is our incident response plan? What do we do the moment we suspect we\'ve had a security breach?'
          ],
          interactiveElementBrief: 'A \'Security Threat Simulator.\' The user is shown a simple code snippet with a vulnerability. They are then asked to choose which type of attack it\'s vulnerable to from a list (e.g., "SQL Injection," "XSS"). Selecting the right one provides a brief explanation of how the attack would work.'
        }
      },
      {
        id: 'performance-accessibility',
        title: 'Performance & Accessibility',
        duration: 90,
        coreConcepts: ['Page Load Speed', 'Core Web Vitals', 'Screen Readers', 'Keyboard Navigation'],
        analogy: 'Performance and accessibility are like having both a fast car and wheelchair ramps—everyone should be able to use your product quickly and easily.',
        content: {
          hook: 'It\'s not enough for your app to work and be secure; it must also be fast and usable by everyone. Performance and Accessibility are not "nice-to-haves"; they are core components of a quality product that directly impact your bottom line.',
          coreExplanation: [
            '<strong>Performance</strong> is all about speed and responsiveness. Think of it like a well-optimized retail store. Customers will leave if the checkout line is too long or if they can\'t find what they\'re looking for quickly. For your app, this translates to:',
            '<strong>Page Load Speed:</strong> How quickly your content appears. Key metrics include First Contentful Paint (FCP) and Largest Contentful Paint (LCP). Slow load times are a primary reason users abandon a site.',
            '<strong>Bundle Size:</strong> The total size of all the code, images, and assets a user has to download. Keeping this small is critical, especially for users on slow mobile connections.',
            '<strong>Responsiveness:</strong> How quickly the UI responds to user input, like a button click.',
            '<strong>Accessibility (a11y)</strong> is about making your app usable by people with disabilities. This is like ensuring your retail store has wheelchair ramps, braille signage, and aisles wide enough for everyone. In web terms, this means:',
            '<strong>Semantic HTML:</strong> Using the correct HTML tags so screen readers can understand the page structure.',
            '<strong>Alt Text:</strong> Providing text descriptions for images for visually impaired users.',
            '<strong>Keyboard Navigation:</strong> Ensuring a user can navigate and use your entire app without a mouse.',
            '<strong>Color Contrast:</strong> Making sure your text is clearly readable against its background.'
          ],
          strategicInsights: [
            '<strong>Performance is a Feature:</strong> A faster app leads to higher conversion rates, better user engagement, and higher SEO rankings from Google.',
            '<strong>Accessibility Expands Your Market:</strong> Building an accessible app is not only the right thing to do, but it also makes your product available to millions of more users.',
            '<strong>Legal Requirements:</strong> In many regions, web accessibility is a legal requirement, and failing to comply can lead to lawsuits.'
          ],
          talkingToDevs: [
            'What are our performance goals for Core Web Vitals like LCP? How are we monitoring them?',
            'Can we run a Lighthouse audit on our key pages to identify performance and accessibility issues?',
            'As we design this new component, how are we ensuring it is fully accessible and keyboard-navigable?'
          ],
          interactiveElementBrief: 'A \'Lighthouse Report Analyzer.\' The user is shown a simplified version of a Google Lighthouse report with scores for Performance and Accessibility. They can click on a low score (e.g., "Performance: 55") to see a list of common issues (e.g., "Large, unoptimized images," "Unused JavaScript"), explaining the cause and effect.'
        }
      }
    ]
  },
  {
    id: 'leveraging-data-ai',
    title: 'Leveraging Data & AI',
    description: 'Harness the power of data analytics and artificial intelligence to make informed decisions and build intelligent features.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
    estimatedTime: 240,
    difficulty: 'Intermediate',
    category: 'Business',
    isLocked: false,
    instructor: 'Dr. Lisa Park',
    rating: 4.8,
    studentsEnrolled: 9876,
    prerequisites: ['backend-development'],
    learningOutcomes: [
      'Understand product analytics and user behavior tracking',
      'Learn the fundamentals of AI and machine learning',
      'Implement data-driven decision making processes',
      'Design AI-powered features for your product'
    ],
    lessons: [
      {
        id: 'product-analytics-explained',
        title: 'Product Analytics Explained',
        duration: 80,
        coreConcepts: ['User Events', 'Funnels', 'Cohorts', 'Retention'],
        analogy: 'Product analytics is like installing security cameras and foot traffic counters in your retail store to understand customer behavior.',
        content: {
          hook: 'You\'ve launched your app. Are people using it? Where are they getting stuck? Are they coming back? Answering these questions requires moving beyond guesswork and embracing Product Analytics.',
          coreExplanation: [
            'Product Analytics is the process of understanding how users behave within your product. Think of it like installing security cameras and foot traffic counters in your retail store.',
            'Instead of just knowing your total sales (your revenue), you can now see which aisles are most popular, where customers linger, and at which point in the store they tend to abandon their shopping carts.',
            'In your app, you install a tool like Mixpanel, Amplitude, or PostHog. Then, you track specific <strong>Events</strong>, like User Signed Up, Article Saved, or Plan Upgraded. With this data, you can build:',
            '<strong>Funnels:</strong> To see where users drop off in a critical flow. For example: Viewed Pricing Page -> Clicked "Upgrade" -> Successfully Paid. A huge drop-off between steps 2 and 3 tells you there\'s a problem with your payment form.',
            '<strong>Cohorts:</strong> To group users by when they signed up. You can then track their <strong>Retention</strong> over time. Are users who signed up in June still active in August? This is the ultimate measure of product-market fit.'
          ],
          strategicInsights: [
            '<strong>Data-Informed Decisions:</strong> Product analytics allows you to replace "I think..." with "The data shows..." when making roadmap decisions.',
            '<strong>Identify Friction Points:</strong> Funnel analysis is the best way to find and fix the hidden friction points in your app that are costing you conversions and engagement.',
            '<strong>Measure Product-Market Fit:</strong> Your user retention curve is the most honest indicator of whether you\'ve built something people truly value. A flattening retention curve is the goal.'
          ],
          talkingToDevs: [
            'What is our event tracking plan for this new feature? What key actions do we need to measure?',
            'Can we build a funnel in Mixpanel for our user onboarding flow to see where people are dropping off?',
            'Let\'s review our 30-day retention cohort. Is it improving month over month?'
          ],
          interactiveElementBrief: 'Create a \'Funnel Analysis Simulator.\' The user sees a visual funnel with three steps and the percentage of users who complete each one. They are then given three potential improvements (e.g., "Improve button text," "Fix bug in form," "Change page color"). They must choose the one most likely to fix the biggest drop-off point in the funnel.'
        }
      },
      {
        id: 'demystifying-ai-ml',
        title: 'Demystifying AI/ML',
        duration: 100,
        coreConcepts: ['Machine Learning', 'Large Language Models', 'APIs vs Training', 'Use Cases'],
        analogy: 'Machine learning is like training a dog—you don\'t write a rulebook, you show thousands of examples and let it learn patterns.',
        content: {
          hook: '"We should use AI." It\'s the phrase every founder is hearing and thinking. But what does it actually mean? Understanding the basics of AI and Machine Learning is key to separating the hype from the real business opportunities.',
          coreExplanation: [
            'Let\'s break down the buzzwords. <strong>Artificial Intelligence (AI)</strong> is the broad concept of making machines that can perform tasks that typically require human intelligence.',
            '<strong>Machine Learning (ML)</strong> is the most common type of AI today. Think of it not as programming a computer with explicit rules, but as training a dog. You don\'t write a rulebook for "how to catch a frisbee." Instead, you show the dog thousands of examples by throwing the frisbee. It tries, fails, and slowly learns the patterns of flight, speed, and trajectory. ML models work the same way: you feed them massive amounts of data, and they learn to recognize patterns and make predictions. Common examples include:',
            '<strong>Recommendation Engines:</strong> (Netflix, Amazon) - It learns what you like based on your viewing history and recommends similar content.',
            '<strong>Spam Filters:</strong> It learns the patterns of spam emails from millions of examples.',
            '<strong>Large Language Models (LLMs)</strong> like GPT-4 are a type of ML model trained specifically on a massive amount of text and code. They are exceptionally good at understanding and generating human-like language, making them perfect for chatbots and content creation.'
          ],
          strategicInsights: [
            '<strong>AI requires Data:</strong> Machine learning is not magic; it is powered by vast amounts of clean, labeled data. If you don\'t have a strong data strategy, you can\'t have a strong AI strategy.',
            '<strong>Start with the Problem, Not the Tech:</strong> Don\'t ask "How can we use AI?" Ask "What is our biggest business problem?" and then see if an AI/ML approach is a good fit to solve it.',
            '<strong>Buy vs. Build:</strong> For 99% of startups, training your own ML model from scratch is a massive, expensive mistake. The strategy is to use powerful, pre-trained models via APIs (like OpenAI\'s GPT).'
          ],
          talkingToDevs: [
            'Instead of building our own recommendation engine, could we use a third-party API to get started?',
            'What data would we need to start collecting now if we wanted to build a personalization feature in the future?',
            'What are the cost and latency implications of using an LLM API for this feature?'
          ],
          interactiveElementBrief: 'A \'Use Case Sorter.\' The user is given a list of business problems (e.g., "Filter toxic user comments," "Predict which customers are likely to churn," "Summarize long articles"). They must drag each problem to the correct ML category ("Classification," "Regression," "Generation"), learning to map problems to AI solutions.'
        }
      },
      {
        id: 'data-driven-decisions',
        title: 'Data-Driven Decision Making',
        duration: 60,
        coreConcepts: ['A/B Testing', 'Statistical Significance', 'Metrics vs Vanity Metrics', 'Data Visualization'],
        analogy: 'Data-driven decisions are like using a GPS instead of guessing directions—you get to your destination faster and with fewer wrong turns.'
      }
    ]
  }
];

// Helper functions
export function getModuleById(id: string): CurriculumModule | undefined {
  return masterCurriculum.find(module => module.id === id);
}

export function getLessonById(moduleId: string, lessonId: string): CurriculumLesson | undefined {
  const module = getModuleById(moduleId);
  return module?.lessons.find(lesson => lesson.id === lessonId);
}

export function getModuleProgress(moduleId: string, completedLessons: Set<string>): number {
  const module = getModuleById(moduleId);
  if (!module) return 0;
  
  const completedCount = module.lessons.filter(lesson => 
    completedLessons.has(lesson.id)
  ).length;
  
  return Math.round((completedCount / module.lessons.length) * 100);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(masterCurriculum.map(module => module.category)));
}

export function getModulesByCategory(category: string): CurriculumModule[] {
  return masterCurriculum.filter(module => module.category === category);
}

export function getPrerequisites(moduleId: string): CurriculumModule[] {
  const module = getModuleById(moduleId);
  if (!module?.prerequisites) return [];
  
  return module.prerequisites
    .map(prereqId => getModuleById(prereqId))
    .filter((module): module is CurriculumModule => module !== undefined);
}

export function isModuleUnlocked(moduleId: string, completedModules: string[]): boolean {
  const module = getModuleById(moduleId);
  if (!module?.prerequisites) return true;
  
  return module.prerequisites.every(prereqId => completedModules.includes(prereqId));
}