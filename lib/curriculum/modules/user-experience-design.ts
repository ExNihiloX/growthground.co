import { CurriculumModule } from '../types';

export const userExperienceDesign: CurriculumModule = {
  id: 'user-experience-design',
  title: 'User Experience (UX) Design',
  description: 'Learn the art and science of creating products that users love, from initial research to final testing.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=UX+Design',
  estimatedTime: 40,
  difficulty: 'Intermediate',
  category: 'Design',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.9,
  studentsEnrolled: 0,
  prerequisites: ['the-digital-landscape'],
  learningOutcomes: [
    'Conduct effective user research to understand user needs.',
    'Structure information and design intuitive user flows.',
    'Create wireframes and prototypes to visualize and test ideas.',
    'Perform usability testing to identify and fix product flaws.'
  ],
  lessons: [
    {
      id: 'user-research',
      title: 'It Starts with Research',
      duration: 10,
      coreConcepts: ['User Interviews', 'Personas', 'Pain Points', 'Empathy'],
      analogy: 'User research is like being a detective investigating a case; you have to go out and gather evidence.',
      content: {
        hook: 'You are not your user. The features you think are brilliant might be confusing or useless to your actual customers. The only way to know for sure is to get out of the building and do User Research.',
        coreExplanation: [
          "User research is the process of understanding your users' behaviors, needs, and motivations. Think of yourself as a detective investigating a case. You can't solve it by sitting in your office and guessing; you have to go out and gather evidence.",
          "The two most important investigative techniques are: <strong>User Interviews</strong>: These are one-on-one conversations where you ask open-ended questions to understand a user's world. The goal is not to ask 'Would you use our product?' but 'Tell me about the last time you tried to solve [the problem your app addresses].' You are trying to uncover their pain points and existing workflows.",
          "<strong>Personas</strong>: After several interviews, you'll start to see patterns. A Persona is a fictional character you create that represents your target user. For example, 'Marketing Mary, a 35-year-old marketing manager at a mid-sized company who struggles to collaborate with her design team.' This persona is not a real person, but it's based on real data from your interviews. It helps your entire team build empathy and constantly ask, 'Would Mary understand this?'"
        ],
        strategicInsights: [
          '<strong>De-risk Your Roadmap:</strong> User research is the single best way to de-risk your product roadmap. It helps ensure you are building features that people actually need and will pay for.',
          '<strong>Find Your Marketing Language:</strong> By listening to how your users describe their problems, you will discover the exact language to use on your landing page and in your marketing copy.',
          "<strong>A Founder's Job:</strong> In the early days, the founder should be directly involved in as many user interviews as possible. There is no better way to understand your customer and your market."
        ],
        talkingToDevs: [
          "'Based on our interviews with 'Marketing Mary,' it seems like collaboration is a bigger pain point than we thought. How might we reflect that in our product?'",
          "'Before we start designing this feature, have we talked to any users to validate that this is a problem they actually have?'",
          "'Let's set a goal to talk to at least five users every month.'"
        ],
        interactiveElementBrief: "Create a 'Good Question, Bad Question' game. The user is shown a series of questions to ask in a user interview. They must sort them into two buckets. 'Bad' questions would be leading ones like 'Don't you think this feature is great?' 'Good' questions would be open-ended ones like 'Can you tell me about your current process for...?'"
      }
    },
    {
      id: 'information-architecture-user-flows',
      title: 'Information Architecture & User Flows',
      duration: 10,
      coreConcepts: ['Information Architecture', 'User Flows', 'Navigation', 'Friction Points'],
      analogy: 'Information Architecture is the blueprint for a grocery store, organizing everything logically so you can find what you need.',
      content: {
        hook: "Your app has a dozen features. How do you organize them so that users can easily find what they're looking for without getting lost? This is the discipline of Information Architecture.",
        coreExplanation: [
          "<strong>Information Architecture (IA)</strong> is like the blueprint for a grocery store. The architects intentionally place the milk at the back so you have to walk past other items. They group all the produce together and all the frozen foods together. This logical organization makes it easy for you to navigate and find what you need. For your app, IA is the practice of organizing and labeling your content and features in a logical and intuitive way.",
          "A <strong>User Flow</strong> is the path a shopper takes through that store to complete a specific task, like buying ingredients for a birthday cake. It's a diagram that maps out every step and decision a user makes. For example, a user flow for your app might be: Homepage -> Clicks 'Login' -> Enters Credentials -> Lands on Dashboard -> Clicks 'Create New Project'.",
          "Visualizing these flows before you design any screens helps you identify potential friction points and simplify the user's journey."
        ],
        strategicInsights: [
          "<strong>Clarity Reduces Churn:</strong> If users can't find the feature they're looking for, they will assume it doesn't exist and churn. Good IA is essential for user retention.",
          "<strong>Foundation for Design:</strong> A clear IA and user flow diagram are the necessary prerequisites for your design team. You can't design the screens until you know what screens you need and how they connect.",
          "<strong>Identify Unnecessary Steps:</strong> Mapping out a user flow often reveals that you are making the user take seven steps to do something that could be done in three. It's a powerful tool for simplification."
        ],
        talkingToDevs: [
          "'Have we created a user flow diagram for the new onboarding process? I want to make sure we've simplified it as much as possible.'",
          "'Based on our IA, where in the main navigation should this new feature live?'",
          "'I feel like getting to the 'Settings' page is too complicated. Can we map out the current user flow and see where we can remove steps?'"
        ],
        interactiveElementBrief: "A 'User Flow Puzzle.' The user is given a set of scrambled screen thumbnails for a common task (like posting a photo on Instagram). They must drag and drop the screens into the correct sequential order to build the logical user flow."
      }
    },
    {
      id: 'wireframing-prototyping',
      title: 'From Lo-Fi to Hi-Fi (Wireframing & Prototyping)',
      duration: 10,
      coreConcepts: ['Low-Fidelity Wireframes', 'High-Fidelity Mockups', 'Interactive Prototypes', 'Figma'],
      analogy: 'The design process is like an architect designing a house, moving from napkin sketches to photorealistic renderings to a walkable VR model.',
      content: {
        hook: 'How do you design and test an idea for a new feature without spending weeks building the whole thing? The answer is a phased design process that moves from cheap, low-fidelity sketches to beautiful, high-fidelity prototypes.',
        coreExplanation: [
          "This process is like an architect designing a house. They don't start by picking out doorknobs.",
          "1. <strong>Lo-Fi Wireframes:</strong> This is the architect's initial pencil sketch on a napkin. Wireframes are simple, black-and-white block diagrams that focus purely on the structure and layout of a page. What are the key elements? Where do the buttons go? What is the hierarchy of information? They are intentionally rough, which makes them fast to create and easy to throw away if the idea is bad.",
          "2. <strong>Hi-Fi Mockups:</strong> This is the architect creating a full-color, photorealistic 3D rendering of the house. A high-fidelity mockup is a static but visually perfect image of what the final screen will look like. It includes the final colors, fonts, spacing, and branding. This is what you would show to stakeholders for final design approval.",
          "3. <strong>Interactive Prototypes:</strong> This is the architect building a walkable, virtual reality model of the house. A prototype, built in a tool like Figma or Sketch, links the static mockups together to create a clickable, interactive simulation of the app. Users can tap on buttons and navigate between screens as if it were a real app. This is the best way to get user feedback before a single line of code is written."
        ],
        strategicInsights: [
          '<strong>Fail Cheaply:</strong> Wireframing allows you to explore and discard dozens of ideas cheaply and quickly. It\'s much cheaper to change a sketch than to change a finished product.',
          '<strong>Get Better Feedback:</strong> A clickable prototype is the gold standard for user testing. Watching a user try to complete a task in a prototype will give you far more accurate insights than just showing them a static image.',
          '<strong>Clarity for Developers:</strong> Providing your development team with a complete, interactive prototype removes almost all ambiguity. They know exactly what to build, which reduces rework and saves money.'
        ],
        talkingToDevs: [
          "'Before we move to high-fidelity mockups, can we test these low-fi wireframes with a few users to validate the core layout?'",
          "'Is this interactive prototype ready for a round of usability testing?'",
          "'Please make sure the Figma prototype includes all the different states for this screen, including the error state and the success state.'"
        ],
        interactiveElementBrief: "Create a 'Fidelity Slider.' The user sees an image of a screen. There is a slider below labeled 'Fidelity.' As they move the slider from left to right, the image transforms from a rough pencil sketch (Lo-Fi Wireframe) to a blocky grayscale diagram, and finally to a full-color, pixel-perfect design (Hi-Fi Mockup)."
      }
    },
    {
      id: 'usability-testing',
      title: 'Usability Testing',
      duration: 10,
      coreConcepts: ['Usability Testing', 'Think Aloud Protocol', 'Friction Points', 'User Observation'],
      analogy: "Usability testing is like inviting someone to your house and watching them try to find the bathroom without giving any hints.",
      content: {
        hook: "Your designs are beautiful, your prototype is interactive—but is it actually easy to use? You can't answer that question yourself because you already know how it's supposed to work. Usability testing is the art of watching real users interact with your product to find its hidden flaws.",
        coreExplanation: [
          "Think of usability testing as inviting someone to your house for the first time and watching them try to find the bathroom. You don't give them a map. You don't give them hints. You just watch. Do they turn left when they should have turned right? Do they try to open a closet door? Their confusion reveals flaws in your home's layout.",
          "In a <strong>usability test</strong>, you give a user your prototype and a simple task to complete, like 'Imagine you want to sign up for this service and create your first project.' Then, you stay quiet and watch. You encourage them to think out loud, narrating their thought process. 'Okay, I'm looking for a 'Sign Up' button... hmm, I don't see one, but I see 'Get Started,' so I'll click that...'",
          "Your goal is not to defend your design, but to identify where users get stuck, confused, or frustrated. These friction points are gold. They provide a clear, prioritized list of the problems you need to fix to improve your product."
        ],
        strategicInsights: [
          "<strong>Five Users is Enough:</strong> You don't need a massive sample size. Famously, the Nielsen Norman Group proved that testing with just five users will reveal about 85% of the core usability problems in your design.",
          "<strong>Test Early, Test Often:</strong> Don't wait until the end. Test your low-fi wireframes. Test your hi-fi prototype. Test your live app. It's a continuous process, not a one-time event.",
          "<strong>You will always be surprised.</strong> No matter how smart you and your team are, real users will always interact with your product in ways you never expected. This is why testing is indispensable."
        ],
        talkingToDevs: [
          "'We're scheduling five usability tests for the new prototype this Friday. What are the key tasks we want users to complete?'",
          "'What were the top three usability issues that came out of our last testing session, and how are we addressing them in the next sprint?'",
          "'I'd like to sit in and observe the next usability test, just to listen and learn.'"
        ],
        interactiveElementBrief: "A 'Find the Flaw' simulation. The user watches a short, pre-recorded video of someone's mouse moving around a screen, trying to complete a task. The user's goal is to click on the part of the screen where the person in the video got confused or stuck. A correct click reveals a text bubble explaining the usability problem (e.g., 'The button label was unclear')."
      }
    }
  ]
};