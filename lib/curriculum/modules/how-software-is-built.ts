import { CurriculumModule } from '../types';

export const howSoftwareIsBuilt: CurriculumModule = {
  id: 'how-software-is-built',
  title: 'How Software is Built (Comprehensive)',
  description: 'Learn the modern processes and methodologies that successful software teams use to build, test, and deploy products efficiently.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=How+Software+is+Built',
  estimatedTime: 50, // 5 lessons * 10 mins
  difficulty: 'Beginner',
  category: 'Development Process',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 5,
  studentsEnrolled: 0,
  prerequisites: ['the-developers-toolkit'],
  learningOutcomes: [
    "Understand the principles of Agile and the Scrum framework.",
    "Distinguish between a product roadmap and a backlog.",
    "Write effective user stories with clear acceptance criteria.",
    "Grasp the value and mechanics of a CI/CD pipeline.",
    "Strategically manage and communicate technical debt."
  ],
  lessons: [
    {
      id: 'agile-scrum',
      title: 'Agile & Scrum',
      duration: 10,
      coreConcepts: ['Agile', 'Waterfall', 'Sprints', 'Scrum', 'Backlog', 'Retrospective'],
      analogy: 'Agile is like building with LEGOs, not constructing a skyscraper.',
      content: {
        hook: "Why don't developers just take your big idea, disappear for six months, and come back with a finished product? Because that almost always fails. Modern teams use a process called Agile to build better products with less risk and more flexibility.",
        coreExplanation: [
          "Think of building your app not like constructing a skyscraper, but like building with LEGOs.",
          "The old way (Waterfall) was like the skyscraper: create a massive, detailed blueprint for the entire building, then spend months or years constructing it exactly as planned. The problem is, by the time you're done, your market needs might have changed, but it's too late to move a wall.",
          "Agile is like building with LEGOs. You have a vision for a castle, but you start by building just one tower. You work in short, focused bursts called Sprints (usually 1-2 weeks). At the end of the sprint, you have a finished, working LEGO tower. You can look at it, get feedback, and decide what to build next. This iterative process allows you to adapt to change and constantly deliver value.",
          "Scrum is the most popular framework for running Agile. It involves key rituals: a Backlog (a prioritized list of all LEGO pieces to be built), a daily Stand-up (a quick 15-minute meeting to sync up), Sprint Planning (where you decide which pieces to build next), and a Retrospective at the end of each sprint to discuss how to build better in the next one."
        ],
        strategicInsights: [
          "Flexibility & Market Fit: Agile allows you to pivot and change priorities based on user feedback, preventing you from wasting months building the wrong thing.",
          "Visibility & Predictability: With regular sprint reviews, you always have a clear view of the team's progress and a working piece of the product to look at. This creates a predictable rhythm of delivery.",
          "Reduced Risk: By building and releasing small pieces of functionality, you can get user feedback early and often, validating your ideas before you invest heavily in them."
        ],
        talkingToDevs: [
          "\"What is our most important goal for the upcoming sprint? What user problem are we trying to solve?\"",
          "\"Based on our velocity from the last few sprints, is this new feature realistic to complete in one sprint?\"",
          "\"In our next retrospective, I'd love to discuss how we can improve the feedback loop between the business and development.\""
        ],
        interactiveElementBrief: "Create a 'Sprint Planning Game.' The user sees a list of feature \"cards\" on the left (e.g., 'User Login - 5 pts', 'Add Profile Picture - 3 pts'). On the right is a 'Sprint' container with a capacity of '10 points.' The user must drag and drop features into the sprint, trying to maximize value without exceeding the capacity, simulating the real trade-offs of sprint planning."
      }
    },
    {
      id: 'product-roadmap-backlog',
      title: 'The Product Roadmap & Backlog',
      duration: 10,
      coreConcepts: ['Product Roadmap', 'Themes/Initiatives', 'Product Backlog', 'Prioritization'],
      analogy: 'The roadmap is the war campaign map; the backlog is the turn-by-turn GPS navigation.',
      content: {
        hook: "Sprints are great for planning the next two weeks, but how do you plan the next quarter or the next year? That's the role of the Product Roadmap, your strategic guide to where the product is going and why.",
        coreExplanation: [
          "If a sprint is a single battle, the Product Roadmap is the entire war campaign map. It's a high-level, visual summary of the product's direction over time. It doesn't focus on tiny details but on major Themes or Initiatives.",
          "Think of it like planning a road trip from New York to Los Angeles. The Roadmap shows the major milestones: \"Phase 1: Reach Chicago (Launch MVP),\" \"Phase 2: Explore the Rockies (Add social features),\" \"Phase 3: Arrive in LA (Scale to 100k users).\" It communicates the why behind the work to the entire company and to investors.",
          "The Product Backlog, on the other hand, is the detailed, turn-by-turn GPS navigation for the current leg of the journey. It's a single, prioritized list of everything that needs to be built, ever. It contains all the features, bug fixes, and technical tasks. The team pulls items from the top of the prioritized backlog into their sprints. You, as the founder, are responsible for ensuring the backlog is prioritized to align with the strategic goals of the roadmap."
        ],
        strategicInsights: [
          "Strategic Alignment: The roadmap is your primary tool for aligning the development team, marketing, and sales around a single vision and set of priorities.",
          "Investor Communication: A clear and realistic roadmap is essential for raising capital and communicating your long-term vision to investors and the board.",
          "Managing Expectations: A roadmap is not a set-in-stone timeline of features. It's a statement of intent that should be flexible. It helps you say \"no\" to distractions by asking, \"How does this fit into our current roadmap?\""
        ],
        talkingToDevs: [
          "\"How does the work in this sprint ladder up to the goals on our Q3 product roadmap?\"",
          "\"Let's review the backlog together. I want to make sure the items at the top still reflect our most important priorities.\"",
          "\"This new feature idea is great, but where might it fit on our roadmap for the second half of the year?\""
        ],
        interactiveElementBrief: "Create a 'Roadmap Prioritization' tool. The user sees a Kanban-style board with columns: \"Next Up,\" \"Later,\" and \"Maybe.\" They are given a set of feature cards and must drag them into the columns, forcing them to make the strategic trade-offs inherent in roadmap planning."
      }
    },
    {
      id: 'art-of-the-user-story',
      title: 'The Art of the User Story',
      duration: 10,
      coreConcepts: ['User Story', 'As a...', 'Acceptance Criteria', 'Who, What, Why'],
      analogy: 'A user story is like a recipe card for a chef.',
      content: {
        hook: "How do you get the feature in your head into the hands of your developers without anything getting lost in translation? A well-written User Story is the key to clearly communicating user needs and ensuring the right thing gets built.",
        coreExplanation: [
          "Think of a User Story not as a technical document, but as a recipe card for a chef. It's a simple, concise description of a feature from the perspective of the person who will use it.",
          "The most common format is: \"As a [type of user], I want [to perform some action], so that [I can achieve some goal].\"",
          "For example: \"As a new user, I want to sign up with my Google account, so that I don't have to remember another password.\"",
          "This simple structure is powerful because it focuses on the Who, What, and Why. It gives the development team the context they need to make the right technical decisions. The story is completed with Acceptance Criteria, which are like the \"Definition of Done\" on the recipe card. They are a bulleted list of conditions that must be met for the story to be considered complete (e.g., \"User is logged in after clicking,\" \"User's name is pulled from their Google account\")."
        ],
        strategicInsights: [
          "Focus on Problems, Not Solutions: User stories force you to define the user's problem, leaving the technical solution up to the experts—your developers.",
          "Clarity and Reduced Rework: Clear user stories and acceptance criteria are the best way to prevent misunderstandings and the costly rework that comes from building the wrong feature.",
          "Fostering Empathy: Writing from the user's perspective helps keep the entire team focused on solving real user problems, not just shipping code."
        ],
        talkingToDevs: [
          "\"Do you have everything you need in this user story? Is there any ambiguity in the acceptance criteria?\"",
          "\"Let's walk through this user story together to make sure we're all aligned on the user's goal.\"",
          "\"I've written a draft user story for the new analytics feature. Could you review it and let me know if it makes sense from a technical perspective?\""
        ],
        interactiveElementBrief: "Create a 'User Story Builder.' The user is presented with a feature idea (e.g., \"Users should be able to save articles\"). They then have to fill in the blanks for the user story template (\"As a..., I want..., so that...\") and write 2-3 acceptance criteria. The tool can provide simple feedback on their clarity."
      }
    },
    {
      id: 'ci-cd-automated-assembly-line',
      title: 'CI/CD - The Automated Assembly Line',
      duration: 10,
      coreConcepts: ['Continuous Integration (CI)', 'Continuous Deployment (CD)', 'Test Suite', 'Automation'],
      analogy: 'CI/CD is a robotic factory assembly line for your code.',
      content: {
        hook: "How do companies like Netflix and Amazon release new code hundreds of times a day without breaking everything? They use a fully automated process called CI/CD, which acts like a robotic factory assembly line for your code.",
        coreExplanation: [
          "CI/CD stands for Continuous Integration and Continuous Deployment/Delivery. It's the process of automating the journey of your code from a developer's machine to your users.",
          "Continuous Integration (CI) is the first part of the assembly line. Every time a developer merges new code into the main branch (after a Pull Request), an automated process kicks off. This CI \"robot\" automatically:",
          "Builds the application.",
          "Runs the Test Suite (unit tests, integration tests).",
          "If any step fails, the robot immediately alerts the team, and the broken code is blocked from proceeding. This ensures the main branch is always in a healthy, working state.",
          "Continuous Deployment (CD) is the second part. If all the CI checks pass, the CD \"robot\" automatically deploys the new version of the application to your live servers for your users to see. This means that every small, validated change can go live within minutes of being written. (Some teams opt for Continuous Delivery, where the final deployment step requires a manual button click for business approval)."
        ],
        strategicInsights: [
          "Increased Release Velocity: CI/CD allows you to ship value to your customers faster and more frequently, giving you a competitive edge.",
          "Drastically Reduced Risk: By deploying small, tested changes, you dramatically reduce the risk of a major outage. If a bug does slip through, you know it was caused by one of the last few small changes, making it easy to find and fix.",
          "Developer Efficiency: Automating these repetitive, error-prone tasks frees up your developers to focus on what they do best: building features that create business value."
        ],
        talkingToDevs: [
          "\"Do we have a CI/CD pipeline set up for our application? Can you show it to me?\"",
          "\"What automated checks does a piece of code have to pass before it's deployed to our users?\"",
          "\"How long does it take for a change to go from being merged to being live in production?\""
        ],
        interactiveElementBrief: "Create an 'Interactive CI/CD Pipeline' flowchart. The user sees a visual pipeline with stages: \"Code Committed,\" \"Build,\" \"Test,\" and \"Deploy.\" They click a \"Commit Code\" button, and a token moves through the pipeline, lighting up each stage green. Then, they can click \"Commit Buggy Code,\" and the token will stop at the \"Test\" stage, which turns red, showing how the pipeline protects production."
      }
    },
    {
      id: 'understanding-technical-debt',
      title: 'Understanding Technical Debt',
      duration: 10,
      coreConcepts: ['Technical Debt', 'Refactoring', 'Prudent Debt', 'Reckless Debt'],
      analogy: 'Technical Debt is exactly like financial debt.',
      content: {
        hook: "Ever heard your developers say, \"We need to slow down to refactor,\" or \"We're blocked by technical debt\"? This isn't an excuse; it's a critical concept that can bring even the most promising startups to a halt if not managed properly.",
        coreExplanation: [
          "Think of Technical Debt exactly like financial debt. It's the implied cost of rework caused by choosing an easy, limited solution now instead of using a better approach that would take longer.",
          "Sometimes, taking on debt is a smart business decision. Just like taking a business loan to capture a market opportunity, you might intentionally take on Prudent Tech Debt. You choose a \"quick and dirty\" solution to ship an MVP and get user feedback, knowing you will have to \"pay back the loan\" by refactoring (cleaning up) the code later.",
          "The danger is Reckless Tech Debt, which is like racking up high-interest credit card debt on frivolous purchases. This comes from sloppy work, poor communication, or a complete lack of testing. This kind of debt compounds quickly. The \"interest payments\" are the extra time it takes to build any new feature because the codebase is messy and brittle. Eventually, your feature velocity can grind to zero as your team spends all their time fighting the system."
        ],
        strategicInsights: [
          "Velocity is a Balancing Act: Pushing for maximum speed at all times will lead to crippling tech debt. You must balance short-term feature delivery with long-term code health.",
          "Budget for \"Interest Payments\": Your team will need to dedicate time (e.g., 10-20% of each sprint) to refactoring and paying down tech debt. This is not \"wasted time\"; it's essential maintenance that keeps you moving fast.",
          "It's a Strategic Tool: Intentionally taking on tech debt to validate an idea is a valid strategy. The key is to track it and have a clear plan to pay it back before it gets out of control."
        ],
        talkingToDevs: [
          "\"What is the current health of our codebase? Are there areas with high technical debt that are slowing us down?\"",
          "\"I understand this is a quick solution. What is the technical debt we are taking on, and what is our plan to address it later?\"",
          "\"Can we dedicate some time in the next sprint to paying down the debt in the user authentication module?\""
        ],
        interactiveElementBrief: "Create a 'Choice & Consequence Simulator.' The user is presented with a series of development scenarios over a simulated year. For each, they can choose the \"Quick & Dirty\" path or the \"Slow & Steady\" path. Two meters at the top of the screen, \"Feature Velocity\" and \"Tech Debt,\" update with each choice. Choosing the quick path initially boosts velocity but skyrockets debt, eventually causing velocity to plummet."
      }
    }
  ]
};
