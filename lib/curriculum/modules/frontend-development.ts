import { CurriculumModule } from '../types';

export const frontendDevelopment: CurriculumModule = {
  id: 'frontend-development',
  title: 'Modern Frontend Development',
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
    'Understand component-based architecture',
    'Grasp the fundamentals of state management',
    'Identify key frontend performance metrics and strategies',
    'Communicate effectively with developers about frontend topics'
  ],
  lessons: [
    {
      id: 'the-component-revolution',
      title: 'The Component Revolution',
      duration: 10,
      coreConcepts: ['Component-Based Architecture', 'Reusability', 'Composition', 'Design Systems'],
      analogy: 'Building a UI with components is like building with LEGOs instead of carving from a single block of wood.',
      content: {
        hook: "How do teams at companies like Airbnb and Spotify build massive, complex user interfaces without them collapsing into chaos? They don't build pages; they build systems of small, reusable Components.",
        coreExplanation: [
          "Think of building your application's UI like building with LEGOs.",
          "In the past, developers built entire pages as single, monolithic blocks of code. This was like carving a toy car out of one solid piece of wood. If you wanted to change the wheel, you had to re-carve the whole car.",
          "Modern frontend development, powered by frameworks like React, Vue, and Svelte, uses a Component-Based Architecture. This is the LEGO approach. Instead of a single block of wood, you have a box of specialized LEGO pieces: a 'wheel' piece, an 'axle' piece, a 'steering wheel' piece. Each component is a self-contained, reusable piece of the UI. For your app, you might have a <Button> component, a <UserProfileCard> component, or a <SearchBar> component.",
          "You then compose these small, simple components together to build more complex components, which in turn compose your entire page. If you need to change how all the buttons in your app look, you just update the single <Button> component, and the change is reflected everywhere. This makes your UI consistent, scalable, and much faster to build and maintain."
        ],
        strategicInsights: [
          "<strong>Design Systems:</strong> The component model is the foundation of a Design System—a 'single source of truth' library of all your UI components. This is your company's most valuable design asset, ensuring brand consistency and dramatically speeding up both design and development.",
          "<strong>Increased Development Velocity:</strong> Once you have a robust library of components, building new features becomes like assembling LEGOs. Your team can move much faster because they aren't rebuilding common elements from scratch.",
          "<strong>Easier Maintenance & Debugging:</strong> When a bug appears in a UI element, you only need to fix it in one place—the component file—instead of hunting it down on dozens of different pages."
        ],
        talkingToDevs: [
          "Are we using a tool like Storybook to create a visual library of our frontend components?",
          "As we design this new page, what existing components can we reuse, and what new, reusable components will we need to build?",
          "How much time should we budget this quarter for building out and strengthening our core component library?"
        ],
        interactiveElementBrief: "Create a 'UI Assembler' game. On the left, the user has a palette of simple components (Avatar, Button, Text Input). On the right is an empty 'Profile Card' wireframe. The user must drag and drop the components into the correct slots to build the finished card, demonstrating the concept of composition."
      }
    },
    {
      id: 'mastering-state-management',
      title: 'Mastering State Management',
      duration: 10,
      coreConcepts: ['UI State', 'Local State', 'Global State', 'State Management Libraries'],
      analogy: "State is your application's short-term memory. Local state is a sticky note; global state is a central whiteboard.",
      content: {
        hook: "Who is logged in? What's in their shopping cart? Is the side menu open or closed? This information is the 'state' of your application, and managing it properly is one of the biggest challenges in building a complex frontend.",
        coreExplanation: [
          "Think of your application's state as its short-term memory. It's all the information that can change while a user is interacting with your app. There are two fundamental types of state.",
          "<strong>UI State (or Local State)</strong> is memory specific to a single component. It's like a sticky note on your desk for a temporary task. Is a dropdown menu open? What has a user typed into a search bar before hitting enter? This information is simple and only matters to that one component, so it's managed locally.",
          "<strong>Global State</strong> is memory that needs to be shared across your entire application. It's like a central whiteboard in an office that everyone can see and update. Who is the currently logged-in user? What items are in the shopping cart? This information needs to be accessible by many different, unrelated components. Managing this is complex, and it's where tools like Zustand, Redux, or React Context come in. They provide a predictable way to read and update this shared 'whiteboard' without creating chaos."
        ],
        strategicInsights: [
          "<strong>Complexity Determines Tools:</strong> For a simple app, local state might be enough. For a complex app with user accounts and shared data, a robust global state management library is a non-negotiable architectural choice.",
          "<strong>The Source of 'Weird' Bugs:</strong> Many hard-to-pinpoint bugs come from state being out of sync. For example, a user's name is updated in their profile but the old name still shows in the header. This is a classic global state management problem.",
          "<strong>Performance Implications:</strong> How you manage state can have a big impact on performance. Inefficient state management can cause your app to re-render unnecessarily, making it feel slow and sluggish."
        ],
        talkingToDevs: [
          "What is our strategy for managing global state? Which library are we using and why?",
          "For this new feature, does this data need to be in our global store, or can it be managed locally within the component?",
          "Are there any parts of the app where we're seeing performance issues that might be related to how we're handling state updates?"
        ],
        interactiveElementBrief: "Create a 'State Sorter' simulation. The user is presented with different pieces of data (e.g., 'Is the \\'Like\\' button currently hovered?', 'The logged-in user\\'s ID', 'Text in a comment box'). They must drag each item into one of two buckets: 'Local UI State' or 'Global App State,' learning to differentiate between the two."
      }
    },
    {
      id: 'the-quest-for-performance',
      title: 'The Quest for Performance',
      duration: 10,
      coreConcepts: ['Rendering Strategy', 'Asset Optimization', 'Core Web Vitals', 'Code-Splitting'],
      analogy: 'Frontend performance is like running a restaurant kitchen during the dinner rush. Efficiency is everything.',
      content: {
        hook: "You have three seconds. After that, more than half of your mobile users will abandon your site if it hasn't loaded. Frontend performance isn't a 'nice-to-have'; it's a critical business metric that directly impacts your revenue and growth.",
        coreExplanation: [
          "Think of frontend performance like running a restaurant kitchen during the dinner rush. Efficiency is everything. Three key areas determine your performance.",
          "<strong>Rendering Strategy:</strong> This is how your kitchen prepares the meal. Do you pre-cook everything and have it waiting under a heat lamp (Static Site Generation, SSG)? This is incredibly fast for the customer, perfect for blogs or marketing pages. Or do you cook every meal to order when the customer arrives (Client-Side Rendering, CSR)? This is flexible but can be slow. The best modern approach is often a hybrid, like Server-Side Rendering (SSR) or Incremental Static Regeneration (ISR), where you cook the meal on the server just as the order comes in, delivering a perfectly fresh, fast result.",
          "<strong>Asset Optimization:</strong> This is managing your pantry ingredients. Are you using massive, high-resolution images when a smaller, compressed version would do? Are you sending the user your entire cookbook (JavaScript bundle) when they only ordered a single dish? Optimizing images, compressing code, and 'code-splitting' (only sending the code needed for the current page) are crucial for reducing load times.",
          "<strong>The Critical Rendering Path:</strong> This is the precise sequence of steps the browser must take to paint your page. Optimizing this path is like organizing your kitchen for maximum efficiency, ensuring the most important 'ingredients' (like visible text and images) are loaded and rendered first, a concept measured by Google's Core Web Vitals."
        ],
        strategicInsights: [
          "<strong>SEO & Conversion:</strong> Google directly uses Core Web Vitals as a ranking factor. Faster sites rank higher. Faster sites also have demonstrably higher conversion rates.",
          "<strong>The Cost of JavaScript:</strong> Every new third-party script you add (for analytics, chat widgets, etc.) can slow down your site. Be ruthless about evaluating the ROI of each script.",
          "<strong>Perceived Performance Matters:</strong> Sometimes, making a site feel fast is as important as it being fast. Using skeleton loaders and prioritizing visible content can dramatically improve the user's perception of speed."
        ],
        talkingToDevs: [
          "What are our current Core Web Vital scores, and what is our plan to improve them this quarter?",
          "Can we run a bundle analysis? I want to understand what our largest JavaScript dependencies are.",
          "For this new page, what is our rendering strategy? Should it be statically generated or server-rendered?"
        ],
        interactiveElementBrief: "Create a 'Performance Optimizer' game. The user is shown a simulated website with a low performance score (e.g., 45/100). A list of potential optimizations appears ('Compress Images,' 'Enable Caching,' 'Remove Unused Scripts'). As the user clicks on each optimization, the performance score visibly increases, demonstrating the impact of each action."
      }
    }
  ]
};