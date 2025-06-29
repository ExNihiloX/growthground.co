import { CurriculumModule } from '../types';

export const backendDevelopment: CurriculumModule = {
  id: 'backend-development',
  title: 'Backend Development',
  description: 'Build robust server-side applications that power your frontend and manage your data efficiently.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Backend+Dev',
  estimatedTime: 30,
  difficulty: 'Intermediate',
  category: 'Development',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.7,
  studentsEnrolled: 0,
  prerequisites: ['the-digital-landscape'],
  learningOutcomes: [
    'Understand server architecture and deployment options',
    'Master API design and implementation',
    'Learn authentication and authorization strategies',
    'Implement data persistence and database interactions'
  ],
  lessons: [
    {
      id: 'server-architecture',
      title: 'Server Architecture',
      duration: 10,
      coreConcepts: ['Serverless Functions', 'Containers', 'Microservices', 'Monoliths'],
      analogy: 'Server architecture is like city planning—you can build a single massive apartment building (monolith), separate houses (microservices), or temporary event venues (serverless functions).',
      content: {
        hook: "The database query is taking 30 seconds. The payment processor is down. Your app is suddenly featured on Product Hunt, and traffic is 100x normal. How your server is architected will determine whether these are minor hiccups or total disasters.",
        coreExplanation: [
          "<strong>Monolithic Architecture</strong> is like a single large apartment building where everything—residents, amenities, utilities—exists in one structure. All your code (authentication, business logic, database access) lives in a single application. This approach is simple to develop and deploy initially but can become unwieldy as it grows. Changes to any part require redeploying the entire application, and scaling means scaling everything together, even if only one feature needs more resources.",
          "<strong>Microservices Architecture</strong> breaks your application into separate, specialized services that communicate via APIs—like a neighborhood of single-purpose buildings. Each service handles one business capability (user management, payments, notifications) and can be developed, deployed, and scaled independently. This approach offers more flexibility and resilience but introduces complexity in service coordination and data consistency.",
          "<strong>Serverless Functions</strong> are like pop-up venues that exist only when needed. Rather than running a server 24/7, serverless functions spin up on-demand to handle specific requests and disappear afterward. You pay only for the exact compute time used, making this approach cost-effective for variable or low-traffic workloads. However, serverless functions have limitations in execution time and aren't suitable for all use cases.",
          "<strong>Containers</strong> (like Docker) provide a standardized package that includes your code and all its dependencies, ensuring it runs the same way in any environment. Think of containers as fully furnished, movable tiny homes that can be placed anywhere and function identically. Containers make deployment more reliable and allow you to scale by adding more instances of the same container."
        ],
        strategicInsights: [
          "<strong>Monolith First:</strong> For early-stage startups with limited engineering resources, starting with a well-organized monolith allows faster development and simpler operations. You can incrementally extract microservices as specific needs arise.",
          "<strong>Right-size Your Architecture:</strong> Your architecture should match your business stage and team size. Overengineering with complex microservices too early creates unnecessary overhead; staying with a monolith too long creates technical debt and scaling challenges.",
          "<strong>Cloud Provider Lock-in:</strong> Serverless offerings like AWS Lambda or Google Cloud Functions provide tremendous convenience but can create dependency on a specific cloud provider. Consider whether the trade-off makes sense for your business's long-term strategy."
        ],
        talkingToDevs: [
          "What are the scalability bottlenecks in our current architecture, and how would a different approach address them?",
          "How would our deployment and testing processes change if we moved toward a microservices approach?",
          "What parts of our application would benefit most from serverless functions, and which parts wouldn't be appropriate?"
        ],
        interactiveElementBrief: "Create an 'Architecture Decision Simulator' where users are presented with different scenarios (startup launch, rapid scaling, enterprise migration) and must choose between architectural approaches. For each decision, they see the immediate benefits and long-term consequences in areas like development speed, operational complexity, and cost."
      }
    },
    {
      id: 'apis-endpoints',
      title: 'APIs and Endpoints',
      duration: 10,
      coreConcepts: ['REST', 'GraphQL', 'Webhooks', 'Documentation'],
      analogy: 'APIs are like restaurant menus—they show what your backend can serve, how to order it, and what customers will receive.',
      content: {
        hook: "Your API is often the first impression other developers have of your product. A well-designed API can become your most powerful growth channel, while a poorly designed one will drive integrators away and limit your product's potential.",
        coreExplanation: [
          "<strong>API (Application Programming Interface)</strong> is the contract between your backend service and any client that wants to use it. It specifies what functionality is available, how to request it, and what format responses will take. A well-designed API is intuitive, consistent, and evolves without breaking existing integrations.",
          "<strong>REST (Representational State Transfer)</strong> is the most common API design pattern, organizing resources around URLs (e.g., /users, /products) and using standard HTTP methods (GET, POST, PUT, DELETE) to interact with them. REST is like a structured menu where each dish has a clear name and ordering process. It's widely understood and supported but can become inefficient when clients need complex combinations of data.",
          "<strong>GraphQL</strong> is a newer approach that gives API consumers more control. Instead of fixed endpoints returning predetermined data, clients specify exactly what fields they want. It's like a build-your-own meal where you list precisely what ingredients you need. This reduces over-fetching (getting more data than needed) and under-fetching (having to make multiple requests to assemble complete data), but requires more upfront design and server-side implementation.",
          "<strong>Webhooks</strong> invert the traditional request-response pattern. Rather than clients repeatedly asking 'Has anything changed?', the server proactively notifies clients when events occur. It's like subscribing to a newsletter instead of checking a website daily. Webhooks are essential for real-time features and integrations."
        ],
        strategicInsights: [
          "<strong>API as Product:</strong> If third-party developers might use your API, treat it as a product with its own user research, documentation, versioning strategy, and developer experience considerations.",
          "<strong>Balance Flexibility and Simplicity:</strong> The most powerful APIs are often the simplest. While your internal data model may be complex, your API should present an abstracted view that hides implementation details and focuses on common use cases.",
          "<strong>Version From Day One:</strong> Even if your API is only internal now, implement versioning from the start. The /v1/ prefix in your endpoints costs nothing today but saves massive pain when you need to make breaking changes later."
        ],
        talkingToDevs: [
          "How are we handling API versioning and backward compatibility as the product evolves?",
          "What's our rate limiting strategy to prevent abuse while ensuring good service for legitimate users?",
          "How comprehensive is our API documentation, and does it include examples for common use cases?"
        ],
        interactiveElementBrief: "Build an 'API Design Workshop' where users are presented with a real-world product scenario and must design API endpoints for key features. They make choices about URL structure, authentication method, and response format, then receive feedback on their design's usability and robustness."
      }
    },
    {
      id: 'authentication-security',
      title: 'Authentication and Security',
      duration: 10,
      coreConcepts: ['JWT', 'OAuth', 'Password Hashing', 'CORS'],
      analogy: 'Authentication is like checking ID at a nightclub—you verify identity at entry, issue a wristband (token), and security can check it throughout the night.',
      content: {
        hook: "A single security breach can destroy user trust in seconds. As founders, our first responsibility is to protect the data users entrust to us. Understanding authentication and security fundamentals isn't optional—it's essential.",
        coreExplanation: [
          "<strong>Authentication</strong> is the process of verifying who a user is, while <strong>authorization</strong> determines what they're allowed to do. Together, they ensure that only the right people can access or modify specific resources. It's like checking ID at the door (authentication) and then determining which areas of the venue the person can enter (authorization).",
          "<strong>JWT (JSON Web Tokens)</strong> are a method for securely transmitting information between parties as a JSON object. Think of a JWT as a tamper-proof ID card—it contains user information and is digitally signed to ensure it hasn't been altered. JWTs are commonly used for maintaining user sessions because they can contain all necessary user data and permissions, eliminating the need for database lookups on every request.",
          "<strong>OAuth</strong> is an authorization protocol that allows users to grant third-party applications limited access to their accounts without sharing passwords. It's like using your hotel key card to access specific hotel amenities without giving full access to your room. 'Sign in with Google' and similar options use OAuth to simplify user onboarding while maintaining security.",
          "<strong>Password Hashing</strong> is a one-way function that converts passwords into scrambled text that cannot be reversed. If your database is compromised, attackers see only the hashes, not the original passwords. Modern hashing algorithms like bcrypt automatically incorporate 'salt' (random data) to prevent attackers from using precomputed tables to crack common passwords."
        ],
        strategicInsights: [
          "<strong>Delegation vs. DIY:</strong> Authentication is complex and high-stakes. For most startups, using a specialized auth provider (like Auth0, Firebase Auth, or Supabase Auth) is safer and more cost-effective than building your own system from scratch.",
          "<strong>UX/Security Balance:</strong> Strong security often creates friction in the user experience. The art is finding the right balance—enough security to protect users without making the process so cumbersome that they give up.",
          "<strong>Progressive Security:</strong> Implement security proportional to sensitivity. A note-taking app needs less stringent measures than a financial service. As your product handles more sensitive data or gains more users, gradually enhance your security practices."
        ],
        talkingToDevs: [
          "How are we storing sensitive user data? Are we following best practices for encryption and data minimization?",
          "What's our approach to session management and handling token expiration?",
          "How comprehensive are our automated security tests? Are we regularly testing for common vulnerabilities?"
        ],
        interactiveElementBrief: "Create a 'Security Decision Tree' interactive exercise where founders work through common authentication scenarios (user signup, password reset, third-party access). For each scenario, they make implementation decisions and see the security and UX implications of their choices."
      }
    }
  ]
};
