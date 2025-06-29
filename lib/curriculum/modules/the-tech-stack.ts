import { CurriculumModule } from '../types';

export const theTechStack: CurriculumModule = {
  id: 'the-tech-stack',
  title: 'The Tech Stack (Comprehensive)',
  description: 'A comprehensive guide to understanding the key components of a modern tech stack, from frameworks to databases and hosting.',
  thumbnail: '/thumbnails/module-4.png',
  estimatedTime: 40,
  difficulty: 'Intermediate',
  category: 'Technology & Architecture',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 5,
  studentsEnrolled: 0,
  prerequisites: ['how-software-is-built'],
  learningOutcomes: [
    "Explain the role and benefits of using frameworks.",
    "Differentiate between SQL and NoSQL databases and their use cases.",
    "Compare foundational cloud providers with modern deployment platforms.",
    "Analyze the trade-offs between native and cross-platform mobile development."
  ],
  lessons: [
    {
      id: 'frameworks-explained',
      title: 'Frameworks Explained',
      duration: 10,
      coreConcepts: ['Frameworks', 'Frontend Frameworks', 'Backend Frameworks', 'Hiring', 'Ecosystem'],
      analogy: 'A framework is like a high-quality, prefabricated house kit.',
      content: {
        hook: "How can a small startup build a complex application as quickly as a giant corporation? They don't start from scratch. They use Frameworks, which provide a massive head start in development.",
        coreExplanation: [
          "Think of building an application like building a house. You could, in theory, go chop down trees, mill the lumber, and forge your own nails. This is building from scratch. It gives you ultimate control, but it's incredibly slow and requires immense expertise.",
          "A Framework is like a high-quality, prefabricated house kit. The kit arrives with pre-cut lumber, walls that are already framed, and instructions for how everything fits together. You still have to assemble it, paint it, and add your own custom touches, but you're starting from 80% done. You get the structure, the foundation, and the common components for free.",
          "In the tech world, a Frontend Framework like React or Vue provides pre-built components and a structure for building user interfaces. A Backend Framework like Django, Ruby on Rails, or Laravel provides tools for handling databases, user authentication, and server logic out of the box. Using a framework lets developers focus on building your app's unique features, not on reinventing the wheel."
        ],
        strategicInsights: [
          "Speed vs. Control: Frameworks offer incredible speed, but they come with opinions on \"the right way\" to do things. This is a trade-off against the pure control of building from scratch. For most startups, the speed is well worth it.",
          "Hiring: The popularity of a framework directly impacts how easy it is to hire developers. Choosing a popular, well-supported framework (like React) gives you a much larger talent pool to draw from.",
          "Ecosystem: Mature frameworks have huge ecosystems of pre-built tools, libraries, and community support forums (like Stack Overflow), which can save thousands of hours of development time."
        ],
        talkingToDevs: [
          "\"Why did we choose this particular framework over its competitors? What advantages does it give us?\"",
          "\"What is the long-term support and community like for our chosen framework?\"",
          "\"Are there any parts of our app where the framework's conventions are getting in our way?\""
        ],
        interactiveElementBrief: "Create a 'Framework Matchmaker' quiz. The user answers a few multiple-choice questions about their startup's priorities: \"What's more important: A) Rapid prototyping or B) Extreme performance?\" or \"Is your team more experienced with A) JavaScript or B) Python?\" Based on their answers, the tool recommends a type of framework (e.g., \"A flexible JavaScript frontend framework\" or \"A full-featured Python backend framework\")."
      }
    },
    {
      id: 'databases-sql-vs-nosql',
      title: 'Databases: SQL vs. NoSQL',
      duration: 10,
      coreConcepts: ['SQL', 'NoSQL', 'PostgreSQL', 'MongoDB', 'Data Structure', 'Scalability'],
      analogy: 'SQL databases are like an Excel spreadsheet; NoSQL databases are like a folder of Word documents.',
      content: {
        hook: "Your app's data is its most valuable asset. The choice of database technology is one of the most fundamental architectural decisions you'll make, impacting how you scale, how fast your app feels, and what features you can build.",
        coreExplanation: [
          "There are two main families of databases: SQL and NoSQL. The choice depends entirely on the shape of your data.",
          "SQL (Structured Query Language) databases are like an Excel spreadsheet. The data is highly structured in tables with predefined columns and rows. Every row in the \"Users\" table must have the same columns (e.g., id, name, email). This rigid structure makes the data predictable and reliable, and it's excellent for complex queries, like \"Show me all users in Ghana who signed up in June and purchased a premium plan.\" Examples include PostgreSQL (what Supabase uses) and MySQL.",
          "NoSQL databases are like a folder of Word documents. Each document can have a totally different structure. One user document might have a name and email, while another might have a name, ten phone numbers, and a list of hobbies. This flexibility is great for data that is unstructured or changes often, like user-generated content, social media posts, or IoT sensor data. Examples include MongoDB and DynamoDB."
        ],
        strategicInsights: [
          "Structure vs. Flexibility: SQL is perfect for predictable, mission-critical data like financial transactions and user profiles. NoSQL is great for applications with massive amounts of varied, user-generated content. Most complex apps use both.",
          "Scaling Models: SQL databases traditionally scale vertically (you buy a bigger, more powerful server). NoSQL databases are often designed to scale horizontally (you add more smaller, cheaper servers), which can be more cost-effective at extreme scale.",
          "Data Integrity: The rigid structure of SQL makes it very good at enforcing data consistency and preventing bad data from being saved, which is crucial for financial or e-commerce applications."
        ],
        talkingToDevs: [
          "\"What kind of data are we storing, and why did we choose a SQL/NoSQL database for it?\"",
          "\"As we plan our new social feed feature, would a NoSQL database be a better fit for storing that post data?\"",
          "\"What is our strategy for backing up our database to prevent data loss?\""
        ],
        interactiveElementBrief: "Create a '\"Choose the Right Database\" scenario game.' The user is presented with three different app ideas: 1) An e-commerce store, 2) A blog, 3) An IoT network for weather sensors. They must drag the correct database type (SQL or NoSQL) to each scenario to win."
      }
    },
    {
      id: 'hosting-deployment-platforms',
      title: 'Hosting & Deployment Platforms',
      duration: 10,
      coreConcepts: ['Cloud Providers', 'AWS', 'GCP', 'Azure', 'Deployment Platforms', 'Vercel', 'Netlify'],
      analogy: 'Using a cloud provider is like building a store on a plot of land; using a deployment platform is like renting a fully managed storefront in a mall.',
      content: {
        hook: "Your app is built, but where does it physically live so that users around the world can access it? Understanding hosting is key to ensuring your app is fast, reliable, and secure.",
        coreExplanation: [
          "Think about launching a physical retail store. You have two main options.",
          "You can rent a plot of land and build everything yourself. This is like using a foundational Cloud Provider like Amazon Web Services (AWS), Google Cloud (GCP), or Microsoft Azure. They provide the raw infrastructure: virtual servers (called \"instances\"), databases, storage, and networking tools. This gives you ultimate power and flexibility, but you are responsible for configuring, securing, and managing everything yourself. It's powerful but complex.",
          "Alternatively, you can rent a pre-built, fully managed storefront in a high-end mall. This is like using a modern Deployment Platform like Vercel (made by the creators of Next.js) or Netlify. These platforms are built on top of cloud providers like AWS. They abstract away all the complexity of server management. You simply connect your GitHub account, and they automatically handle the build process, deployment, scaling, and provide a global CDN (Content Delivery Network) to make your app fast everywhere."
        ],
        strategicInsights: [
          "Time to Market vs. Control: For most startups, especially those with a standard web app or frontend, platforms like Vercel offer incredible speed and ease of use, allowing your team to focus on features, not infrastructure.",
          "Cost Structure: Cloud providers (AWS) often have a more complex, usage-based pricing model that can be cheaper at massive scale but harder to predict. Deployment platforms (Vercel) often have simpler, more predictable pricing tiers.",
          "The \"Ops\" in DevOps: Managing your own infrastructure on AWS is a full-time job called \"DevOps\" (Development Operations). Using a platform like Vercel can eliminate the need for a dedicated DevOps hire in the early stages."
        ],
        talkingToDevs: [
          "\"Why did we choose our current hosting platform? What are the biggest pros and cons for our use case?\"",
          "\"What is our estimated monthly hosting cost, and how is that likely to change as we add more users?\"",
          "\"Does our hosting platform provide features like automatic rollbacks if a bad deployment goes out?\""
        ],
        interactiveElementBrief: "Create an 'Infrastructure Builder' simulation. The user is shown two paths. Path A (AWS) shows them a dozen complex icons they have to manually connect (Load Balancer, EC2 Instance, S3 Bucket, etc.). Path B (Vercel) shows a single box where they just have to connect their \"GitHub\" account. This visually demonstrates the trade-off between complexity and convenience."
      }
    },
    {
      id: 'mobile-native-vs-cross-platform',
      title: 'Mobile: Native vs. Cross-Platform',
      duration: 10,
      coreConcepts: ['Native Development', 'Swift', 'Kotlin', 'Cross-Platform', 'React Native', 'Flutter', 'PWA'],
      analogy: 'Native development is hiring specialist chefs; cross-platform is hiring a fusion chef.',
      content: {
        hook: "Your app needs to be on your users' phones. But should you build two separate, native apps for iOS and Android, or one single app that works on both? This is one of the biggest strategic decisions a mobile-first startup will face.",
        coreExplanation: [
          "There are two main paths to building a mobile app.",
          "Native Development is like hiring a specialist chef for Italian food and another for Japanese food. For iOS, developers use Apple's language (Swift) and tools (Xcode). For Android, they use Google's language (Kotlin) and tools (Android Studio). The result is the absolute best performance, a perfect look and feel that matches the operating system, and immediate access to the latest device features (like new camera APIs). However, it's expensive and slow, as you have to build and maintain two completely separate codebases with two separate teams.",
          "Cross-Platform Development is like hiring a fusion chef who can make great sushi and great pasta from the same kitchen. Using a framework like React Native or Flutter, developers write one codebase that can be compiled into both an iOS app and an Android app. This is dramatically faster and cheaper, as you only have one team and one codebase to manage. The trade-off is a slight performance hit and sometimes a small delay in accessing the very latest native features. For the vast majority of apps, this trade-off is more than worth it."
        ],
        strategicInsights: [
          "Budget and Speed are Key: For most startups, cross-platform is the logical choice. It allows you to reach both iOS and Android users with half the team and in half the time.",
          "When to Go Native: Native is the right choice if your app's core value proposition depends on cutting-edge performance, complex animations, or immediate access to the latest OS-specific hardware features (like advanced AR or camera functions).",
          "Don't Forget the Web: A \"Progressive Web App\" (PWA) is a third option. It's a mobile website that can be \"installed\" on a user's home screen and can work offline. It's the fastest and cheapest way to get onto a user's phone, but it's more limited than a true app."
        ],
        talkingToDevs: [
          "\"Let's discuss the native vs. cross-platform trade-off. For our app's core features, do we truly need the performance of a native app?\"",
          "\"If we choose React Native, how will we handle any features that might require custom native code?\"",
          "\"Could we start with a PWA to test the market before investing in a full cross-platform application?\""
        ],
        interactiveElementBrief: "Create a 'Mobile Strategy Calculator'. The user answers questions via sliders: \"How important is budget? (Low/High)\", \"How important is raw performance? (Low/High)\", \"How quickly do you need to launch? (Slow/Fast)\". Based on their inputs, the tool provides a recommendation: \"Cross-Platform Recommended,\" \"Native Recommended,\" or \"Consider a PWA.\""
      }
    }
  ]
};
