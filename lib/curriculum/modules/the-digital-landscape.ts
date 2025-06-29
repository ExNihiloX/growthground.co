import { CurriculumModule } from '../types';

export const theDigitalLandscape: CurriculumModule = {
  id: 'the-digital-landscape',
  title: 'The Digital Landscape (Comprehensive)',
  description: 'An introduction to the core components of modern applications, including frontend, backend, databases, and APIs.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Digital+Landscape',
  estimatedTime: 40,
  difficulty: 'Beginner',
  category: 'Fundamentals',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.9,
  studentsEnrolled: 0,
  learningOutcomes: [
    'Understand the anatomy of a web app, including frontend, backend, and database.',
    'Grasp the concept of an API and its role in software communication.',
    'Learn the core technologies of the frontend: HTML, CSS, and JavaScript.',
    'Understand the key responsibilities of the backend, including logic and authentication.'
  ],
  lessons: [
    {
      id: 'anatomy-of-a-web-app',
      title: 'Anatomy of a Web App',
      duration: 10,
      coreConcepts: ['Frontend', 'Backend', 'Database', 'Architecture'],
      analogy: 'Think of your entire application as a high-end restaurant.',
      content: {
        hook: 'Ever wondered why your app feels slow even with great internet, or why a seemingly "simple" feature request can take weeks to build? Understanding the three fundamental parts of your application is the first step to answering those critical business questions.',
        coreExplanation: [
          'Think of your entire application as a high-end restaurant. It\'s a single business, but it operates in three distinct areas.',
          'What your users see and interact with is the Frontend. This is the dining room of your restaurant—the decor, the menus, the tables, the lighting. It\'s everything that creates the user experience (UX) and user interface (UI). In web terms, this is the layout, the colors, the buttons, and the text your users click on.',
          'The engine room, hidden from the diners, is the Backend. This is the kitchen. It\'s where the chefs (your servers and logic) take the orders, cook the food, and handle all the complex operations that make the restaurant function. For your app, this includes user authentication, processing payments, and running the business rules that define what your application does.',
          'Finally, every great kitchen needs a well-stocked pantry. This is your Database. It’s where all the raw ingredients are stored in an organized way—user information, product lists, saved posts, etc. The backend kitchen retrieves ingredients from the database pantry to prepare the final dish that gets sent out to the frontend dining room. These three parts work in perfect harmony to create a seamless experience.',
        ],
        strategicInsights: [
          'Resource Allocation: Knowing this distinction helps you understand why hiring a "frontend developer" won\'t magically fix your database speed. You can hire for the right roles and allocate your budget more effectively.',
          'Diagnosing Problems: When users complain about slowness, you can ask better questions. Is it a Frontend issue (e.g., a slow animation) or a Backend issue (e.g., a slow data query)? This leads to faster fixes.',
          'Scaling & Costs: Your Backend and Database choices will have the biggest impact on your server costs and ability to handle more users. Understanding their role is key to your financial and growth planning.',
        ],
        talkingToDevs: [
          '"Could you walk me through our app\'s architecture? I\'d love to better understand how the frontend and backend communicate."',
          '"As we plan this new feature, where do you foresee the most complexity—on the frontend build or the backend logic?"',
          '"Are there any bottlenecks between our frontend and backend we should be concerned about as we scale?"',
        ],
        interactiveElementBrief: 'The goal is a drag-and-drop game where the user must correctly categorize different app components. They will drag labels like "Login Button," "Password Hashing Logic," and "User Profile Pictures" into three columns labeled "Frontend," "Backend," and "Database" to test their understanding.',
      }
    },
    {
      id: 'what-is-an-api',
      title: 'What is an API?',
      duration: 10,
      coreConcepts: ['API', 'Request/Response', 'JSON', 'Third-Party APIs'],
      analogy: 'An API is the waiter in a restaurant, managing communication between you (the frontend) and the kitchen (the backend).',
      content: {
        hook: 'How does your app get weather data from a weather service, or process a payment with Stripe? The magic behind this communication is the API, the universal language that allows different software to talk to each other.',
        coreExplanation: [
          'Using our restaurant analogy, an API (Application Programming Interface) is the waiter. The waiter is not the kitchen (the Backend) nor the diner (the Frontend), but the crucial intermediary that manages communication between them.',
          'When you, the diner, want a steak, you don\'t walk into the kitchen yourself. You make a structured request to your waiter: "I\'d like the ribeye, medium-rare." The waiter takes this well-defined order (API Request) to the kitchen. The kitchen prepares the dish and hands it back to the waiter, who delivers it to your table (API Response).',
          'APIs work the same way. Your frontend app makes a request to a backend (yours or a third-party\'s like Google Maps) for a specific piece of information. The API is the set of rules for how to ask for that information. The backend processes the request and sends the data back in a predictable format, usually JSON. This allows you to integrate powerful services into your app without having to build them from scratch.'
        ],
        strategicInsights: [
          'Speed to Market: Using third-party APIs (like for payments or maps) is dramatically faster and cheaper than building that functionality yourself.',
          'Risk Management: When an external service you rely on has an outage, its API will fail. Understanding this helps you create backup plans and communicate issues to your users.',
          'Business Development: Offering your own API can be a powerful revenue stream, allowing other businesses to build on top of your platform.'
        ],
        talkingToDevs: [
          '"What third-party APIs are we relying on? What are their rate limits or costs we should be aware of?"',
          '"For this new integration, have you reviewed the quality of their API documentation? Is it clear and easy to work with?"',
          '"Could we expose some of our own data through an API for partners in the future? What would that entail?"'
        ],
        interactiveElementBrief: 'Create a simple "API Request Builder." The user selects from dropdowns to build a request (e.g., GET, /users, id=123). When they click "Send Request," a formatted JSON object appears in a "Response" box, simulating the data being returned.'
      }
    },
    {
      id: 'frontend-deep-dive',
      title: 'Frontend Deep Dive',
      duration: 10,
      coreConcepts: ['HTML', 'CSS', 'JavaScript', 'User Experience'],
      analogy: 'The frontend is like building a house: HTML is the blueprint, CSS is the design, and JavaScript is the electricity and plumbing.',
      content: {
        hook: 'You can have the most powerful app in the world, but if it\'s ugly, confusing, or clunky, no one will use it. Mastering the frontend is the art of crafting a user experience that is both beautiful and effective.',
        coreExplanation: [
          'Let\'s use the analogy of building a house. The Frontend is everything a visitor would see and interact with. It’s composed of three core technologies.',
          'HTML (HyperText Markup Language) is the blueprint and frame of the house. It defines the structure: this is a wall, this is a door, this is a window. For a webpage, HTML defines "this is a heading," "this is a paragraph," "this is an image." It provides the raw, unstyled structure.',
          'CSS (Cascading Style Sheets) is the interior and exterior design. It\'s the paint on the walls, the style of the furniture, the landscaping in the yard. In web terms, CSS controls the colors, fonts, spacing, and layout. It takes the raw HTML structure and makes it visually appealing.',
          'JavaScript (JS) is the electricity and plumbing. It makes the house functional and interactive. When you flip a switch, the lights turn on. When you turn a faucet, water comes out. For your app, JavaScript handles interactivity: when a user clicks a button, a menu opens; when they submit a form, data is sent; when they scroll, new content loads.'
        ],
        strategicInsights: [
          'Brand Identity: The frontend is the primary expression of your brand. Its quality directly reflects on your company\'s perceived professionalism and value.',
          'Conversion Rates: A well-designed frontend with clear calls-to-action can dramatically increase user sign-ups, purchases, and engagement.',
          'Development Time: Complex animations and highly custom interfaces (heavy JavaScript and CSS) take significantly more time to build than simple, clean layouts.'
        ],
        talkingToDevs: [
          '"Is this design feasible with standard CSS, or will it require a lot of custom JavaScript, potentially impacting performance?"',
          '"How are we ensuring our frontend is responsive and looks great on all devices, from mobile phones to desktops?"',
          '"Which part of this new UI do you think will be the most time-consuming to build?"'
        ],
        interactiveElementBrief: 'Create an "Interactive Website Builder" panel. It shows a simple, unstyled webpage. There are two toggles: "Enable CSS" and "Enable JavaScript." Users can turn them on and off to see the page transform from raw HTML to a styled page, and then to a fully interactive one, demonstrating their distinct role of each technology.'
      }
    },
    {
      id: 'backend-deep-dive',
      title: 'Backend Deep Dive',
      duration: 10,
      coreConcepts: ['Server-side Logic', 'Authentication', 'Business Rules', 'Security'],
      analogy: 'The backend is the restaurant\'s entire operational hub—the kitchen, the manager\'s office, and the security system combined.',
      content: {
        hook: 'What happens when a user clicks "Save"? Where does their password get checked? This invisible, powerful world is the backend, the true engine of your application where all the critical logic and operations happen.',
        coreExplanation: [
          'If the frontend is the dining room, the backend is the restaurant\'s entire operational hub—the kitchen, the manager\'s office, and the security system combined. It\'s everything the user doesn\'t see but relies on completely.',
          'The core of the backend is Server-side Logic. This is the "brain" of your application. When a user signs up, the backend runs logic to validate their email, securely hash their password, and create their account in the database. When they want to see their dashboard, the backend logic fetches their specific data and sends it to the frontend. It enforces all your Business Rules—things like "only paying users can access this feature" or "users can only delete their own comments."',
          'Authentication is a critical backend function. It\'s the bouncer at the door, verifying a user\'s identity and ensuring they only have access to the data and features they\'re permitted to see. The frontend might show a login form, but the backend does the actual work of checking the credentials against the database.'
        ],
        strategicInsights: [
          'Security & Compliance: Your app\'s security lives almost entirely on the backend. This is where you protect user data, a responsibility you cannot delegate.',
          'Intellectual Property: Your unique business logic and "secret sauce" are implemented in the backend code, making it your most valuable technical asset.',
          'Performance at Scale: As you get more users, the efficiency of your backend code will determine whether your app stays fast or grinds to a halt.'
        ],
        talkingToDevs: [
          '"How are we handling user authentication and password security on the backend?"',
          '"Could you explain the business logic for our user permissions? I want to make sure we\'ve covered all the edge cases."',
          '"What\'s our strategy for testing our backend logic to prevent bugs?"'
        ],
        interactiveElementBrief: 'The goal is an \'"If This, Then That" Logic Puzzle.\' Users see a visual flowchart and must drag-and-drop conditions (e.g., "User is a \'premium\' member") and actions (e.g., "Allow access to video library") to build a correct business rule, demonstrating their understanding of backend logic.'
      }
    }
  ]
};
