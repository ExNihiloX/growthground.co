import { CurriculumModule } from '../types';

export const buildingWithAiIdes: CurriculumModule = {
  id: 'building-with-ai-ides',
  title: 'Building with AI-Assisted IDEs',
  description: 'Learn how to leverage the power of AI-Assisted IDEs to build applications faster than ever before, from writing the perfect prompt to managing a hybrid AI-human workflow.',
  thumbnail: '/thumbnails/module-6.png',
  estimatedTime: 30, // 3 lessons * 10 mins
  difficulty: 'Advanced',
  category: 'AI & Development',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 5,
  studentsEnrolled: 0,
  prerequisites: ['quality-security'],
  learningOutcomes: [
    'Understand the paradigm shift from traditional development to AI-assisted development.',
    'Master the art of writing effective master prompts for AI code generation.',
    'Implement a hybrid workflow combining AI generation with manual developer intervention.',
    'Dramatically accelerate the process of building and prototyping applications.'
  ],
  lessons: [
    {
      id: 'ai-copilot-revolution',
      title: 'The AI Co-Pilot Revolution',
      duration: 10,
      coreConcepts: ['AI-Assisted IDE', 'Master Prompt', 'GitHub Copilot', 'Prototyping Speed'],
      analogy: 'The difference between a solo pilot and a pilot with an advanced AI co-pilot.',
      content: {
        hook: 'What if you could describe an entire application in plain English and have a working prototype built in minutes, not months? Welcome to the new frontier of software development, powered by AI-Assisted IDEs.',
        coreExplanation: [
          'Think of this new way of building software as the difference between a solo pilot and a pilot with an advanced AI co-pilot.',
          'The traditional solo pilot (a human developer) has to manually handle every control, every calculation, and every system check. It\'s skillful but time-consuming. Traditional AI tools like GitHub Copilot are like a basic autopilot—they can suggest the next line of code, but they can\'t fly the whole plane.',
          'An AI-Assisted IDE (like Bolt or Lovable) is a true AI co-pilot. It understands the entire flight plan. You, as the main pilot or \"director,\" provide a comprehensive mission brief (a \"master prompt\"). The AI co-pilot then takes that brief and executes the entire flight plan—generating the folder structure, writing the component code, setting up the layout, and wiring it all together. It translates your high-level strategic intent into low-level, functional code.'
        ],
        strategicInsights: [
          'Unprecedented Speed to Prototype: The single greatest advantage is speed. You can go from idea to a fully interactive, high-fidelity prototype in a fraction of the time, allowing you to test ideas with real users faster than ever before.',
          'The Founder as Architect: Your role shifts from being a manager of developers to being the architect of the prompt. Your ability to think clearly and specify your vision in detail becomes your most valuable skill.',
          'Lowering the Barrier to Entry: These tools dramatically lower the cost and time required to build an initial product, democratizing the ability to create new software.'
        ],
        talkingToDevs: [
          '\"How can we leverage an AI IDE to build the v1 of our frontend so we can focus our manual engineering effort on the complex backend logic?\"',
          '\"This prompt I\'ve written—is it clear enough for an AI? Have I removed all ambiguity?\"',
          '\"Let\'s use the AI to generate the first pass of this feature, and then we can refine it manually.\"'
        ],
        interactiveElementBrief: "Create a 'Then vs. Now' slider. The left side shows a complex timeline of a traditional 3-month development process (Design -> Frontend Dev -> Backend Dev -> QA). The right side shows a simplified 1-week process: \"Write Master Prompt -> AI Generation -> Human Refinement.\" This visually communicates the dramatic speed increase."
      }
    },
    {
      id: 'art-of-the-master-prompt',
      title: 'The Art of the Master Prompt',
      duration: 10,
      coreConcepts: ['Master Prompt', 'Declarative Specifications', 'Imperative Roadmap', 'Golden Rules', 'Intellectual Property'],
      analogy: 'Hiring the world\'s most literal-minded freelance developer.',
      content: {
        hook: 'You\'ve hired your new AI co-pilot. Now you need to give it the flight plan. The success or failure of your entire project hinges on the quality of your \"Master Prompt.\" A great prompt yields a great product; a vague prompt yields chaos.',
        coreExplanation: [
          'Think of writing a Master Prompt as hiring the world\'s most literal-minded freelance developer. They are incredibly fast and skilled, but they have zero creativity or common sense. They will build exactly what you write, for better or worse.',
          'A world-class prompt has three key sections:',
          'Declarative Specifications (The \"What\"): This is where you define the universe. You must be ruthlessly specific. Don\'t say \"a blue button\"; say \"a primary button with the hex code #38BDF8.\" This section includes your Tech Stack, your Design System (colors, fonts, spacing), your Data Models, and your client-side State Architecture. You are creating the rulebook.',
          'Imperative Roadmap (The \"How\"): This is the sequential, step-by-step build plan. You must break down the entire build process into small, logical steps. For example: Step 1: Set up project. Step 2: Build the UI components. Step 3: Assemble the main view. Each step must be clear and build upon the last.',
          'Golden Rules & Meta-Instructions (The \"Constraints\"): This is the first thing the AI reads. You define its role (\"You are an expert frontend developer\"), its constraints (\"Do not use any backend logic\"), and its core operating principles (\"Execute the roadmap in strict sequential order\").'
        ],
        strategicInsights: [
          'Front-load the Thinking: Writing a master prompt forces you to make all the hard product and design decisions upfront. This clarity is invaluable, regardless of whether a human or AI builds it.',
          'Deterministic Results: A highly specific prompt removes ambiguity and leads to a predictable, deterministic outcome. You get what you asked for.',
          'The Prompt is Your Core IP: In an AI-first workflow, the quality and detail of your master prompt become a core piece of your company\'s intellectual property.'
        ],
        talkingToDevs: [
          '\"Have I provided a specific hex code for every color? A specific font size for every heading?\"',
          '\"If I gave this step-by-step plan to a junior developer, could they succeed without asking me any questions?\"',
          '\"Have I defined all my data structures and component props in TypeScript first?\"'
        ],
        interactiveElementBrief: "Create a 'Prompt Quality Checker.' The user sees a list of phrases and must drag them into \"Good Prompt\" and \"Bad Prompt\" buckets. Examples for \"Good Prompt\" would be \"Use hex code #1E293B\" and \"Create a component named ModuleCard.tsx.\" Examples for \"Bad Prompt\" would be \"Use a nice dark blue\" and \"Make a card for the modules.\""
      }
    },
    {
      id: 'hybrid-workflow-ai-human',
      title: 'The Hybrid Workflow: AI + Human',
      duration: 10,
      coreConcepts: ['Hybrid Workflow', 'AI Generation', 'Manual Intervention', 'Iterative Prompts', 'Separation of Concerns'],
      analogy: 'AI laying the foundation and building the house, while the human hooks up the city\'s power and water lines.',
      content: {
        hook: 'Your AI Co-Pilot has built a stunning prototype in minutes. It\'s 90% of the way there. But what about the last 10%—the parts that require connecting to the outside world? This is where the beautiful partnership between AI and human developers begins.',
        coreExplanation: [
          'The most effective workflow is not AI-only; it\'s a hybrid. Think of it as AI laying the foundation and building the house, while the human hooks up the city\'s power and water lines.',
          'The workflow has three phases:',
          'AI Generation: You start with a Frontend-Only Master Prompt (like the one in this course!). The AI builds the entire user interface and all the interactive components using mock data. It\'s a fully clickable, beautiful, self-contained prototype. This is the fastest way to get to a version you can show users and stakeholders.',
          'Manual Intervention (The Handoff): This is where the human takes over to do things the AI cannot. The AI is in a secure sandbox; it can\'t log into your accounts. The human developer\'s job is to: go to Supabase (or your chosen backend) and set up the database tables, get the secret API keys and plug them into the environment variables (.env.local) file that the AI created.',
          'Iterative AI Prompts (Connecting the Wires): Now that the backend exists and the keys are in place, you return to the AI. You use smaller, more targeted prompts to replace the mock data with live data. For example: \"In /components/Dashboard.tsx, remove the mock curriculum import and instead fetch the data from our Supabase client.\" The AI then performs this surgical change, wiring up the app one piece at a time.'
        ],
        strategicInsights: [
          'De-risking Your Project: Building the UI first allows you to perfect the user experience and get buy-in before you invest any time in complex backend engineering.',
          'Clear Division of Labor: This workflow creates a clean separation of concerns. The AI excels at rapid UI generation and boilerplate. The human excels at security-sensitive tasks and complex, custom logic.',
          'Faster Iteration: Once the app is live, you can continue to use the AI for adding new features. A prompt like \"Add a search bar to the Dashboard component that filters modules by title\" is far faster than building it manually.'
        ],
        talkingToDevs: [
          '\"The AI has generated the frontend prototype. Your next task is to set up the database schema as defined in the prompt and secure the API keys.\"',
          '\"Let\'s use the AI to generate the boilerplate for this new component, and then you can take over to implement the custom payment logic.\"',
          '\"I\'ve written a small, targeted prompt to add a new filter to the dashboard. Can you review it before we run it?\"'
        ],
        interactiveElementBrief: "Create a 'Workflow Sorter.' The user is presented with a jumbled list of actions. They must drag them into the correct order on a timeline with two phases: \"AI Generation\" and \"Human + AI Iteration.\" Actions would include \"Write Master Prompt,\" \"Setup Supabase tables,\" \"Generate frontend,\" and \"Write prompt to connect to API.\""
      }
    }
  ]
};
