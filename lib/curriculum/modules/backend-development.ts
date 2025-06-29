import { CurriculumModule } from '../types';

export const backendDevelopment: CurriculumModule = {
  id: 'backend-development',
  title: 'Modern Backend Development',
  description: 'Understand the critical architectural decisions that power scalable, high-performance applications.',
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
    'Differentiate between REST and GraphQL API designs.',
    'Compare monolith and microservice architectures.',
    'Identify key strategies for backend scaling.',
    'Effectively communicate backend concepts to a development team.'
  ],
  lessons: [
    {
      id: 'api-design-rest-vs-graphql',
      title: 'API Design: REST vs. GraphQL',
      duration: 10,
      coreConcepts: ['API Design', 'REST', 'GraphQL', 'Endpoints', 'Over-fetching'],
      analogy: "API design is the menu at a restaurant. REST is a fixed à la carte menu; GraphQL is a custom sushi checklist.",
      content: {
        hook: "You know that an API is the 'waiter' for your application, but what language does the waiter speak? The design of your API determines how efficiently your frontend can request data, impacting performance and developer productivity.",
        coreExplanation: [
          "Think of your API design as the menu at a restaurant. It defines what a customer can order and how they can order it. There are two popular 'menu' styles today.",
          "<strong>REST (Representational State Transfer)</strong> is like a traditional, à la carte menu. You have a fixed list of options (called endpoints). If you want user data, you order from the /users endpoint. If you want their posts, you have to place a separate order to the /users/123/posts endpoint. It's predictable, structured, and very reliable. However, if you need data from three different endpoints, you have to make three separate trips to the kitchen, which can be inefficient. This is called over-fetching (getting more data than you need) or under-fetching (having to make multiple requests).",
          "<strong>GraphQL</strong> is like ordering from a sushi restaurant with a checklist menu. You are given a list of every possible ingredient the kitchen has, and you can create your own perfect custom roll in a single order. You send one request to the kitchen that says, 'I want one roll with tuna, avocado, the user's name, and their last three posts.' The kitchen prepares exactly that and sends it back in a single delivery. This is incredibly efficient, as you get exactly the data you need in one request, but it can be more complex to set up in the kitchen (the backend)."
        ],
        strategicInsights: [
          "<strong>Complexity vs. Efficiency:</strong> REST is simpler to build and is a great default choice. GraphQL is more powerful and efficient for complex applications with many interconnected data types (like a social network), but it requires more upfront investment.",
          "<strong>Frontend-Backend Collaboration:</strong> GraphQL can empower your frontend team to move faster, as they can change the data they need without having to ask the backend team to create a new endpoint.",
          "<strong>Ecosystem and Tooling:</strong> REST is the established standard with universal support. GraphQL has a rapidly growing ecosystem but can sometimes have less mature tooling for things like caching and monitoring."
        ],
        talkingToDevs: [
          "Why did we choose REST/GraphQL for our API? What are the key benefits for our specific application?",
          "For this new feature, the frontend will need data from three different sources. Is this a good candidate for a GraphQL query, or should we stick with our REST endpoints?",
          "How are we handling the documentation for our API so that frontend developers (or external partners) know what's available?"
        ],
        interactiveElementBrief: "Create an 'API Order Simulator'. The user has a goal: 'Get a user's name and the titles of their last 3 posts.' They can choose the 'REST' path, which forces them to make two separate 'API calls,' or the 'GraphQL' path, where they visually build a single query to get all the data at once, demonstrating the efficiency gain."
      }
    },
    {
      id: 'architectural-patterns-monolith-vs-microservices',
      title: 'Architectural Patterns: Monolith vs. Microservices',
      duration: 10,
      coreConcepts: ['Monolith', 'Microservices', 'Architectural Patterns', 'Scalability', 'Modular Monolith'],
      analogy: "A monolith is one large, integrated restaurant kitchen. Microservices are a food hall with many small, independent kitchens.",
      content: {
        hook: "How should you structure your backend 'kitchen'? Should it be one large, integrated kitchen that does everything, or a collection of small, specialized stations? This is the core architectural decision of Monolith vs. Microservices.",
        coreExplanation: [
          "This is a debate about how you organize your backend codebase.",
          "A <strong>Monolith</strong> is like a large, traditional restaurant kitchen. Everything is in one place. The pizza station, the grill station, and the dessert station are all part of one large, interconnected unit. The code for Users, Payments, and Notifications all lives in a single, large codebase that is developed and deployed as one unit. This is simple to start, easy to test, and fast to develop initially.",
          "<strong>Microservices</strong> are like a modern food hall with many independent ghost kitchens. You have one kitchen that only makes pizza, another that only makes tacos, and a third that only makes milkshakes. Each service (Users, Payments, Notifications) is its own small, independent application with its own database and its own deployment process. They communicate with each other over APIs."
        ],
        strategicInsights: [
          "<strong>Start with a Monolith:</strong> For 99% of startups, starting with a well-structured Monolith is the right choice. It's faster to build, easier to manage, and avoids the immense operational complexity of microservices.",
          "<strong>The Complexity Tax:</strong> Microservices are powerful for huge, complex applications (like Netflix or Uber) because they allow hundreds of teams to work independently. But for a small team, they add a massive 'complexity tax' in terms of infrastructure, monitoring, and debugging.",
          "<strong>Evolve, Don't Pre-Optimize:</strong> The best practice is often to build a 'modular monolith'—a well-organized single application—and only break out a piece into a microservice later if it becomes a clear bottleneck or requires a separate team."
        ],
        talkingToDevs: [
          "We're starting with a monolith, which I agree is the right choice. How are we structuring the code internally to make it modular and easy to maintain?",
          "At what point of scale or team size should we start considering breaking a piece of our application out into its own microservice?",
          "If we were to split out our 'Notifications' service, what would the API between it and the main application look like?"
        ],
        interactiveElementBrief: "Create an 'Architecture Scalability Game'. The user starts with a 'Monolith' structure and a small team. As they click 'Add More Users' and 'Add More Developers,' new problems pop up (e.g., 'Deployment conflicts!', 'Database under heavy load!'). The user can then choose to 'Break out a Microservice,' which solves one problem but adds a new 'Complexity' cost. This demonstrates the trade-offs visually."
      }
    },
    {
      id: 'scaling-your-backend',
      title: 'Scaling Your Backend',
      duration: 10,
      coreConcepts: ['Vertical Scaling', 'Horizontal Scaling', 'Load Balancer', 'Caching', 'Stateless Applications'],
      analogy: "Scaling a backend is like managing a popular grocery store: you can hire a faster cashier (vertical) or open more lanes (horizontal).",
      content: {
        hook: "You've been featured on the front page of the App Store and your traffic just increased by 100x. Does your app crash and burn, or does it scale gracefully? The ability to handle success is built into your backend architecture from day one.",
        coreExplanation: [
          "Scaling is the process of handling more users and more data. Think of it like managing a popular grocery store.",
          "When you only have a few customers, one checkout lane is enough. This is your single server. As you get more popular, the line gets too long. You can either hire a faster cashier (<strong>Vertical Scaling</strong> - buying a bigger, more powerful server) or open more checkout lanes (<strong>Horizontal Scaling</strong> - adding more, cheaper servers). Horizontal scaling is almost always the better long-term strategy.",
          "A <strong>Load Balancer</strong> is like the store manager at the front who directs customers to the next available checkout lane. It sits in front of your servers and distributes incoming traffic evenly among them, preventing any single server from becoming overwhelmed.",
          "<strong>Caching</strong> is like putting the most popular items (milk, eggs) in a small, refrigerated case right at the front of the store. Instead of every customer walking all the way to the back dairy case, they can grab it quickly from the cache. In your app, a cache is a super-fast, in-memory store (like Redis) that holds the results of common, expensive database queries. When a request comes in, the app checks the cache first. If the data is there (a cache hit), it's returned instantly without ever touching the slower database."
        ],
        strategicInsights: [
          "<strong>Design for Horizonal Scaling:</strong> Ensure your team is building a 'stateless' application, where any server can handle any request. This is the key to effective horizontal scaling.",
          "<strong>Caching is a Silver Bullet:</strong> Caching is often the single most effective and cheapest way to improve backend performance and reduce database load.",
          "<strong>Monitoring is Crucial:</strong> You can't fix a bottleneck you can't see. Implementing tools to monitor your server CPU, memory, and database response times is essential for knowing when and where to scale."
        ],
        talkingToDevs: [
          "What is our strategy for horizontal scaling? Are our application servers stateless?",
          "What are the most expensive queries we're making to our database, and are they good candidates for caching?",
          "What monitoring tools do we have in place to alert us if our server load gets too high?"
        ],
        interactiveElementBrief: "A 'Traffic Spike Simulator.' The user sees a single server handling incoming requests. As they move a 'Traffic' slider up, the server icon turns red and a 'High Latency' warning appears. The user can then click 'Add Load Balancer' and 'Add More Servers' to see the traffic distribute and the icons turn green again. They can also click 'Enable Cache' to see the load on the database icon decrease dramatically."
      }
    }
  ]
};