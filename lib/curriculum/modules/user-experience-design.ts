import { CurriculumModule } from '../types';

export const userExperienceDesign: CurriculumModule = {
  id: 'user-experience-design',
  title: 'User Experience (UX) Design',
  description: 'Learn the principles of creating intuitive, user-friendly products that solve real problems.',
  thumbnail: 'https://images.pexels.com/photos/326518/pexels-photo-326518.jpeg?auto=compress&cs=tinysrgb&w=600',
  estimatedTime: 30,
  difficulty: 'Intermediate',
  category: 'Design',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.9,
  studentsEnrolled: 0,
  prerequisites: ['the-digital-landscape'],
  learningOutcomes: [
    'Apply the design thinking process to product development',
    'Conduct effective user research and usability testing',
    'Create wireframes and prototypes to visualize ideas',
    'Understand the principles of intuitive user interface design'
  ],
  lessons: [
    {
      id: 'design-thinking-process',
      title: 'The Design Thinking Process',
      duration: 10,
      coreConcepts: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
      analogy: 'Design thinking is like a detective solving a case—you gather clues, form a theory, test it, and iterate until you find the truth.',
      content: {
        hook: "Ever wondered why some products feel like they read your mind while others are a constant struggle? The secret isn't magic—it's a structured process called Design Thinking. This framework helps you move from guessing what users want to knowing what they need.",
        coreExplanation: [
          "<strong>Design Thinking</strong> is a human-centered approach to innovation that integrates user needs, technological possibilities, and business requirements. It's a structured but non-linear process that helps teams tackle complex problems.",
          "<strong>Empathize:</strong> The first step is to gain a deep, empathetic understanding of your users' problems and realities. This involves observing, engaging, and immersing yourself in their world. You're not just looking for what they say, but what they do, think, and feel.",
          "<strong>Define:</strong> Next, you synthesize your findings to define a clear problem statement. This isn't about listing features; it's about framing the core user need you've identified. A good problem statement is actionable and focused, like 'New parents need a way to quickly and safely find reliable childcare' rather than 'We need to build a babysitter app.'",
          "<strong>Ideate:</strong> With a clear problem, you can start brainstorming solutions. The goal here is quantity over quality—encourage wild ideas and defer judgment. Techniques like 'How Might We' questions can help reframe the problem to spark creativity.",
          "<strong>Prototype:</strong> Now you build a simple, low-cost, experimental version of your best ideas. A prototype isn't a finished product; it's a tool for learning. It can be anything from a paper sketch to an interactive digital mockup.",
          "<strong>Test:</strong> Finally, you put your prototype in front of real users to get feedback. This isn't about defending your idea; it's about learning what works and what doesn't. The insights from testing often lead you back to earlier stages, refining your understanding of the problem or generating new ideas."
        ],
        strategicInsights: [
          "<strong>Problem-Solution Fit First:</strong> Before you worry about product-market fit, use design thinking to ensure you have problem-solution fit. Are you solving a real problem that users care about?",
          "<strong>Reduce Risk, Increase Speed:</strong> The design thinking process helps you de-risk your product development by testing assumptions early and cheaply. It's much faster to change a paper prototype than a fully coded application.",
          "<strong>Foster a Collaborative Culture:</strong> Design thinking is a team sport. It breaks down silos between design, engineering, and business, fostering a shared understanding of the user and the problem."
        ],
        talkingToDevs: [
          "Before we start building, can we run some user interviews to validate our assumptions about this problem?",
          "Instead of fully implementing this feature, could we create a simplified prototype to test with users first?",
          "The user testing showed that people struggled with X. How difficult would it be to pivot our approach to address this?"
        ],
        interactiveElementBrief: "Create a 'Design Challenge Simulator' where users are presented with a realistic business problem. They must work through each stage of the design thinking process, making choices at each step. For example, choosing which user research method to employ, selecting a problem statement from options, picking which ideas to prototype, etc. The simulation provides feedback on their choices and shows how different approaches lead to different outcomes."
      }
    },
    {
      id: 'user-research-methods',
      title: 'User Research Methods',
      duration: 10,
      coreConcepts: ['Interviews', 'Surveys', 'Usability Testing', 'Analytics'],
      analogy: 'User research is like being a journalist—you ask the right questions to uncover the real story behind user behavior.',
      content: {
        hook: "Building products based only on your own perspective is like writing a book about a country you've never visited—filled with assumptions and misconceptions. User research gives you access to the map of your customers' minds and needs.",
        coreExplanation: [
          "<strong>User research</strong> is the systematic investigation of your users' needs, behaviors, and motivations. It comes in many forms, each with distinct strengths and purposes.",
          "<strong>Interviews</strong> are one-on-one conversations with users or potential users. They provide deep, qualitative insights and allow for follow-up questions. Interviews excel at uncovering the 'why' behind behaviors and attitudes. The key is asking open-ended questions and avoiding leading the participant: 'Tell me about the last time you tried to book a flight' rather than 'Don\'t you find booking flights frustrating?'",
          "<strong>Surveys</strong> collect responses from many users through standardized questions. They're excellent for quantitative data ('80% of users prefer feature X') but less effective at understanding nuanced motivations. Surveys shine when you need to validate findings from interviews across a larger sample or prioritize features based on user preferences.",
          "<strong>Usability Testing</strong> involves watching users interact with your product while they complete specific tasks. This reveals real-world friction points that users might not even consciously recognize. The classic format is to give users a task ('Please try to purchase this product') and ask them to think aloud as they work through it, noting where they hesitate or make mistakes.",
          "<strong>Analytics</strong> provide passive, quantitative data about how users actually behave in your product. While interviews tell you what users say they do, analytics show what they actually do. This includes metrics like conversion rates, feature usage, and drop-off points. Analytics excel at answering 'what' and 'how many' but rarely answer 'why.'"
        ],
        strategicInsights: [
          "<strong>Triangulate Methods:</strong> Each research method has blind spots. Combine multiple approaches to get a complete picture. For example, analytics might show users abandoning a sign-up flow, usability testing reveals where they get confused, and interviews uncover why that point is problematic.",
          "<strong>Research Debt:</strong> Skipping research early to 'move fast' creates research debt—you'll eventually have to pay it back with interest in the form of failed features and major pivots. A consistent practice of lightweight research throughout development is more efficient than one massive research project after launch.",
          "<strong>Just Enough Research:</strong> Research exists on a spectrum from quick-and-dirty to comprehensive and rigorous. For early-stage startups, talking to just 5-7 relevant users can identify major issues. Perfect is the enemy of good—some research is vastly better than none."
        ],
        talkingToDevs: [
          "Let's not assume our users will understand this flow—can we schedule a few quick usability tests with some existing customers?",
          "The analytics show high drop-off at this step. Can we implement more detailed event tracking to understand exactly what's happening?",
          "Before we commit to this feature roadmap, should we run a survey to validate which features our users value most?"
        ],
        interactiveElementBrief: "Create a 'Research Method Matchmaker' tool where users are presented with different business questions (e.g., 'Why are users abandoning our checkout flow?' or 'Which pricing tier is most appealing to our target audience?'). For each question, users must select the most appropriate research method. The tool explains why certain methods are better suited to answer specific types of questions."
      }
    },
    {
      id: 'wireframing-prototyping',
      title: 'Wireframing and Prototyping',
      duration: 10,
      coreConcepts: ['Information Architecture', 'User Flows', 'Low-fidelity Prototypes', 'High-fidelity Mockups'],
      analogy: 'Wireframing is like creating a blueprint for a house—you plan the layout before you start decorating.',
      content: {
        hook: "You wouldn't build a house without a blueprint, yet many founders try to build products without wireframes and prototypes. This critical step helps you visualize your product, test assumptions cheaply, and get stakeholder alignment before investing in expensive development.",
        coreExplanation: [
          "<strong>Information Architecture (IA)</strong> is the structural design of your product—how information is organized, labeled, and connected. Good IA ensures users can find what they need intuitively. Think of it as designing the floor plan of a building: which rooms connect to others, what's on each floor, and how people navigate between spaces. For websites and apps, this includes site maps, menu structures, and content organization.",
          "<strong>User Flows</strong> map the path users take to accomplish tasks in your product. They focus on the journey, not just individual screens. A user flow diagram shows each step from entry point to task completion, including decision points and potential branches. For example, a sign-up flow might include: land on homepage → click sign-up button → fill out form → verify email → complete profile.",
          "<strong>Low-fidelity Prototypes</strong> (or 'lo-fi') are simple, quick sketches of your interface that focus on layout, structure, and functionality—not visual design. These can be hand-drawn sketches, simple digital wireframes, or even paper cut-outs. Lo-fi prototypes are perfect for early testing because they're quick to create and easy to change, encouraging iteration without emotional attachment to specific designs.",
          "<strong>High-fidelity Mockups</strong> (or 'hi-fi') look much closer to the final product, with realistic visuals, typography, colors, and sometimes limited interactivity. These help stakeholders visualize the end product and are useful for testing more nuanced aspects of the user experience. However, they take longer to create and can sometimes give the false impression that the design is 'finished' and unchangeable."
        ],
        strategicInsights: [
          "<strong>Fidelity Matches Phase:</strong> Match your prototype's fidelity to your project phase. Early exploration benefits from rough sketches that can be rapidly changed. As you gain confidence in your direction, increase fidelity gradually. This prevents wasting time on pixel-perfect mockups of features that might get cut.",
          "<strong>Prototype Only What's Necessary:</strong> You don't need to prototype every screen and interaction. Focus on key user journeys, novel interactions, and areas of uncertainty or risk. A strategic partial prototype can answer your most important questions without the overhead of building everything.",
          "<strong>Tools Don't Matter, Process Does:</strong> Whether you use specialized software (Figma, Sketch), presentation tools (PowerPoint, Keynote), or pen and paper, your thinking process matters more than your tools. Don't get distracted by learning complex software if simpler tools can communicate your ideas effectively."
        ],
        talkingToDevs: [
          "Here's the user flow and wireframes for the new feature. Can we discuss any technical constraints or opportunities we should consider before finalizing the design?",
          "The prototype shows what we want to achieve, but I'd like your input on the most efficient way to implement this interaction pattern.",
          "I've identified these three areas as potentially complex from a UX perspective. Could we collaborate on some rough prototypes to test different approaches before committing to one?"
        ],
        interactiveElementBrief: "Create a 'Wireframe Evolution Simulator' where users start with a basic product requirement (e.g., 'Create a sign-up process'). They progress through exercises to build an information architecture diagram, sketch a user flow, create a simple wireframe, and finally, a higher-fidelity mockup. At each stage, they're prompted with decisions that highlight the key considerations for that phase of design, showing how early decisions impact later stages."
      }
    }
  ]
};
