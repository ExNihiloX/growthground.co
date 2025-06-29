import { CurriculumModule } from '../types';

export const frontendDevelopment: CurriculumModule = {
  id: 'frontend-development',
  title: 'Frontend Development',
  description: 'Master the art of creating beautiful, responsive user interfaces that users love to interact with.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Frontend+Dev',
  estimatedTime: 30,
  difficulty: 'Intermediate',
  category: 'Development',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.8,
  studentsEnrolled: 0,
  prerequisites: ['the-digital-landscape'],
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
      duration: 10,
      coreConcepts: ['HTML Structure', 'CSS Styling', 'JavaScript Interactivity', 'DOM Manipulation'],
      analogy: 'HTML is the skeleton, CSS is the clothing and makeup, and JavaScript is the personality that brings everything to life.',
      content: {
        hook: "Every website and web application you've ever used—from Amazon to your local pizza place—is built with these three technologies. As a founder, understanding their roles helps you communicate effectively with your team and make informed product decisions.",
        coreExplanation: [
          "<strong>HTML (HyperText Markup Language)</strong> is the skeleton of your web page—the foundation that gives it structure. It defines elements like headings, paragraphs, images, and links. Without HTML, there is no web page at all. HTML tags tell the browser what each piece of content represents: <code>&lt;h1&gt;</code> for main headings, <code>&lt;p&gt;</code> for paragraphs, <code>&lt;img&gt;</code> for images, etc.",
          "<strong>CSS (Cascading Style Sheets)</strong> is the appearance—the clothing, makeup, and visual styling of your web page. It controls colors, fonts, spacing, layout, and responsive design (how your site looks on different devices). Without CSS, your site would be plain black text on a white background with blue links. CSS transforms your skeleton into something visually appealing.",
          "<strong>JavaScript</strong> is the personality and behavior—it makes your site interactive and dynamic. While HTML and CSS are primarily about presentation, JavaScript lets users interact with your site: clicking buttons that update content without reloading the page, validating form inputs before submission, animating elements, and much more.",
          "The <strong>DOM (Document Object Model)</strong> is JavaScript's way of accessing and modifying HTML elements. It's like JavaScript's remote control for the web page, allowing it to change content, attributes, and styles dynamically based on user actions."
        ],
        strategicInsights: [
          "<strong>Separation of Concerns:</strong> Keep structure (HTML), presentation (CSS), and behavior (JavaScript) separate for easier maintenance and updates. This principle makes it possible for different team members to work on different aspects without stepping on each other's toes.",
          "<strong>Progressive Enhancement:</strong> Build your core functionality with HTML first, enhance with CSS, and add JavaScript last. This ensures your site remains functional even if JavaScript fails to load or is disabled.",
          "<strong>Framework Decision:</strong> While you can build sites with vanilla HTML/CSS/JS, most modern projects use frameworks like React, Vue, or Angular. These provide structure and tools for large applications but come with learning curves. For simple sites, frameworks may be overkill."
        ],
        talkingToDevs: [
          "Are we adhering to semantic HTML principles to ensure accessibility and SEO?",
          "What's our approach to CSS organization? Are we using a methodology like BEM, SMACSS, or a CSS-in-JS solution?",
          "How are we minimizing JavaScript bundle size to ensure fast page loads, especially for mobile users?"
        ],
        interactiveElementBrief: "Create a simple 'Web Tech Playground' where users can edit basic HTML, CSS, and JavaScript in separate panels and see their combined result rendered live. Include pre-made examples that demonstrate how the three technologies work together."
      }
    },
    {
      id: 'responsive-design',
      title: 'Responsive Design',
      duration: 10,
      coreConcepts: ['Mobile-First Design', 'Flexbox', 'CSS Grid', 'Media Queries'],
      analogy: 'Responsive design is like water—it adapts to fit any container, whether it\'s a phone, tablet, or desktop.',
      content: {
        hook: "More than 60% of web traffic now comes from mobile devices. If your product doesn't work well on phones, you're losing over half your potential customers before they even see what you offer.",
        coreExplanation: [
          "<strong>Mobile-First Design</strong> is an approach that starts with designing for the smallest screen first, then progressively enhancing for larger screens. It's like building a tiny house first, then adding rooms as space allows. This forces you to prioritize the most important content and features from the beginning.",
          "<strong>Flexbox</strong> is a CSS layout model that makes it easy to create flexible, responsive layouts without resorting to hacks. Think of it as arranging items in a row or column that can automatically adjust based on screen size, like elastic containers that grow or shrink.",
          "<strong>CSS Grid</strong> takes this a step further, allowing two-dimensional layouts (rows AND columns simultaneously). Imagine being able to place items precisely on a blueprint, then having the blueprint itself resize intelligently for different devices.",
          "<strong>Media Queries</strong> are the triggers that activate different CSS rules based on device characteristics. They're like instructions that say, 'When the screen is smaller than X pixels, use these layout rules instead.'"
        ],
        strategicInsights: [
          "<strong>Responsive Is Not Optional:</strong> Treating mobile as an afterthought is a critical business mistake in today's market. Your MVP should be mobile-friendly from day one.",
          "<strong>Testing Is Essential:</strong> Responsive designs must be tested on real devices—emulators aren't enough. What works on your iPhone may fail on Android devices with different screen ratios.",
          "<strong>Performance Matters Most on Mobile:</strong> Mobile users have less processing power and often slower connections. Heavy sites that work fine on desktop can be unusably slow on mobile."
        ],
        talkingToDevs: [
          "How are we ensuring our site performs well on low-end devices and slower connections?",
          "What's our approach to images and media for responsive design? Are we using responsive images to avoid downloading large files on mobile?",
          "Are we using a mobile-first CSS approach or retrofitting desktop designs to work on mobile?"
        ],
        interactiveElementBrief: "Create a 'Responsive Design Simulator' where users can see how a webpage transforms across different devices (phone, tablet, laptop, desktop). They can toggle between designs that use and don't use responsive principles to see the difference in user experience."
      }
    },
    {
      id: 'frontend-frameworks',
      title: 'Frontend Frameworks',
      duration: 10,
      coreConcepts: ['React', 'Vue', 'Angular', 'Component Architecture'],
      analogy: 'Frontend frameworks are like pre-designed kitchen systems with modular cabinets—they provide structure, reusable components, and best practices to build user interfaces faster.',
      content: {
        hook: "Why do most tech companies build their web applications with React, Vue, or Angular instead of plain JavaScript? The right framework choice can dramatically accelerate development while the wrong one can saddle your team with technical debt.",
        coreExplanation: [
          "<strong>Frontend frameworks</strong> evolved to solve the complexity of building modern web applications. As sites grew from simple documents to full applications with complex state management and dynamic updates, vanilla JavaScript became unwieldy and difficult to maintain.",
          "<strong>React</strong>, developed by Facebook, focuses on a component-based architecture where UI elements are broken into reusable pieces. Its key innovation is the virtual DOM, which efficiently updates only what's changed rather than re-rendering the entire page. React has the largest ecosystem and community, making it easy to find both developers and ready-made components. However, it's not a complete framework—you'll need to choose additional libraries for routing, state management, etc.",
          "<strong>Vue</strong> offers a more incremental adoption path and is often considered easier to learn. It combines React's component model with Angular's template syntax and provides more built-in features out of the box. Vue excels at optimizing the developer experience and achieves high performance with minimal configuration. It's particularly popular with startups and in Asia.",
          "<strong>Angular</strong>, maintained by Google, is a comprehensive framework rather than just a UI library. It comes with everything included—HTTP client, forms handling, routing, state management—providing a consistent, opinionated structure. This comprehensive approach means faster setup for standard applications but less flexibility for unique needs. Angular uses TypeScript by default, which adds type safety but also increases the learning curve.",
          "All three frameworks share the concept of <strong>Component Architecture</strong>, which breaks UIs into reusable, self-contained building blocks. Like LEGO pieces, components can be assembled in various ways to create complex interfaces while keeping code organized and maintainable."
        ],
        strategicInsights: [
          "<strong>Framework Choice Is About People, Not Just Technology:</strong> Your framework decision should consider your team's expertise and the local talent market. It's far easier to build with a less-optimal technology that your team knows than to use the 'perfect' framework that nobody understands.",
          "<strong>Consider the Full Ecosystem:</strong> Don't evaluate frameworks in isolation. Look at the surrounding ecosystem of tools, libraries, and community support. A thriving ecosystem means problems are solved faster, and hiring is easier.",
          "<strong>Avoid Premature Optimization:</strong> Many founders worry about framework performance before they even have users. Focus first on developer productivity and time-to-market. Optimize performance when it becomes a real bottleneck."
        ],
        talkingToDevs: [
          "What's the learning curve for our team if we choose this framework? How quickly can we start shipping features?",
          "How mature are the libraries in this ecosystem for features we'll need, like authentication, forms, or data visualization?",
          "What's the long-term maintenance overhead? Will we be fighting the framework as our application grows more complex?"
        ],
        interactiveElementBrief: "Create a 'Framework Fit Calculator' where founders answer questions about their project requirements (team size, complexity, timeline, specific features needed) and team background. The tool provides personalized recommendations for which framework might best fit their specific situation, explaining the tradeoffs of each option for their context."
      }
    }
  ]
};
