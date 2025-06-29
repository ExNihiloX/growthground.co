import { CurriculumModule } from '../types';

export const leadershipCommunication: CurriculumModule = {
  id: 'leadership-communication',
  title: 'Leadership & Communication',
  description: 'Master the essential skills for building a great team, managing stakeholders, and leading your startup to success.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Leadership',
  estimatedTime: 30,
  difficulty: 'Intermediate',
  category: 'Leadership & Communication',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 5,
  studentsEnrolled: 0,
  prerequisites: ['building-with-ai-ides'],
  learningOutcomes: [
    'Develop effective strategies for hiring technical talent.',
    'Master the art of stakeholder communication',
    'Learn to pitch your product and vision effectively',
    'Build a strong and positive company culture'
  ],
  lessons: [
    {
      id: 'hiring-your-technical-team',
      title: 'Hiring Your Technical Team',
      duration: 10,
      coreConcepts: ['Problem-Solving', 'Communication', 'Culture Fit', 'Bus Factor', 'Hiring Process'],
      analogy: "Hiring your first technical lead is like hiring a co-pilot for a plane you've designed but can't fly.",
      content: {
        hook: "The most important technical decision you'll make isn't about technology—it's about people. How do you find and hire the right technical partner, whether it's a co-founder, freelancer, or your first engineer?",
        coreExplanation: [
          "Think of hiring your first technical lead as hiring a co-pilot for a plane you've designed but can't fly. You need more than just someone who knows the controls.",
          "First, you need to assess their technical skill, but not by asking them to code. Instead, focus on Problem-Solving. Give them a real business problem you're facing and ask them how they would approach it. Listen for clarifying questions, discussion of trade-offs, and simple explanations. A great developer makes complex things seem simple.",
          "Second, prioritize Communication. Your co-pilot needs to be able to tell you \"we have a problem with engine one\" in a way you can understand, without you needing to be an aeronautical engineer. Can they explain a technical concept using an analogy? Can they describe a project's status clearly and concisely?",
          "Finally, look for Culture Fit and business sense. Do they seem genuinely interested in your business goals, or just the tech? Do they offer suggestions that align with your vision? You're not hiring a pair of hands to type code; you're hiring a strategic partner to help you build your vision."
        ],
        strategicInsights: [
          "The 'Bus Factor': Avoid hiring a \"genius\" who no one else can understand. If they get hit by a bus (or just quit), your company is in deep trouble. Prioritize developers who document their work and collaborate well.",
          "Experience vs. Potential: A senior developer can be expensive but will build a solid foundation. A junior developer is cheaper but will require more management and may make architectural mistakes. Understand the trade-off.",
          "The Agency Option: Hiring a development agency can be a great way to get a full team quickly, but ensure you have a clear point of contact and understand their process."
        ],
        talkingToDevs: [
          "\"Tell me about a time you had to solve a really ambiguous problem. How did you start?\"",
          "\"Explain a complex technical project you worked on as if you were explaining it to a client.\"",
          "\"Based on what you know about our business, what technical challenges do you think we will face in the next year?\""
        ],
        interactiveElementBrief: "Create a 'Resume Review Simulation.' Users are shown two or three sample developer profiles. They must click on the \"green flags\" (e.g., links to a live project, clear descriptions of business impact) and \"red flags\" (e.g., only listing technologies with no context, poor grammar) to test their evaluation skills."
      }
    },
    {
      id: 'stakeholder-communication',
      title: 'Stakeholder Communication',
      duration: 10,
      coreConcepts: ['Investor Updates', 'Board Management', 'User Communication', 'Transparency'],
      analogy: 'Communicating with stakeholders is like being an air traffic controller—you need to give clear, concise information to different parties to keep everything running smoothly.',
      content: {
        hook: 'Your startup doesn\'t exist in a vacuum. You have investors, users, and employees, all of whom have a stake in your success. Mastering how to communicate with each of them is a critical leadership skill.',
        coreExplanation: [
          'Think of yourself as an air traffic controller. You have multiple planes in the air (investors, users, your team) and you need to give each of them clear, concise, and timely information to keep everything moving in the right direction.',
          '<strong>Investor Updates:</strong> Your investors are your partners. Send them a regular (monthly or quarterly) update email. It should be concise and include: Key metrics (KPIs), progress against goals, challenges and what you\'re doing about them, and a clear "ask" (e.g., introductions to potential customers).',
          '<strong>Board Management:</strong> If you have a board of directors, prepare for meetings diligently. Send out materials well in advance. The meeting itself should be focused on strategic discussion, not just status updates.',
          '<strong>User Communication:</strong> Be proactive in communicating with your users, especially about changes to your product or service. This includes release notes, bug notifications, and changes to pricing or terms. Transparency builds trust.',
          '<strong>Internal Communication:</strong> Your team is your most important stakeholder. Keep them informed about the company\'s performance, strategy, and challenges. An all-hands meeting is a great forum for this.'
        ],
        strategicInsights: [
          '<strong>Tell a Consistent Story:</strong> The narrative you share with your investors, users, and team should be consistent. Everyone should be aligned on the company\'s mission, vision, and progress.',
          '<strong>Under-promise and Over-deliver:</strong> It\'s always better to set realistic expectations and exceed them than to make bold promises you can\'t keep.',
          '<strong>The Bad News Is More Important:</strong> Don\'t hide your challenges. Being upfront about problems shows maturity and allows your stakeholders (especially investors) to help you solve them.'
        ],
        talkingToDevs: [
          'How can we better communicate product changes to our users before they go live?',
          'Let\'s draft the next investor update together. What are the key technical achievements we should highlight?',
          'I want to share our company goals with the team. What is the best way to present this information to make sure everyone is aligned?'
        ],
        interactiveElementBrief: 'Create an "Investor Update Grader." The user writes a short investor update in a text box. An AI then gives them feedback on their update, checking for clarity, conciseness, inclusion of key metrics, and a clear "ask."'
      }
    },
    {
      id: 'pitching-storytelling',
      title: 'Pitching & Storytelling',
      duration: 10,
      coreConcepts: ['Elevator Pitch', 'Problem-Solution Narrative', 'Market Sizing', 'Traction'],
      analogy: 'A good pitch is like a great movie trailer—it grabs your attention, tells you what the story is about, and leaves you wanting more.',
      content: {
        hook: 'You are always pitching. To investors, to customers, to potential hires. The ability to craft a compelling narrative around your business is one of the most powerful tools a founder can possess.',
        coreExplanation: [
          'A good pitch is like a great movie trailer. It needs to grab attention, explain the core story, and leave the audience wanting to see the full movie. The most effective pitches are built on a simple, powerful narrative structure.',
          '<strong>The Problem:</strong> Start with a relatable problem. What is the pain point you are solving? Who are you solving it for? Make it clear and compelling.',
          '<strong>The Solution:</strong> Introduce your product or service as the hero that solves the problem. Explain what it is and how it works in simple terms. This is your "aha!" moment.',
          '<strong>The Market:</strong> How big is this opportunity? Investors want to know that you are tackling a large and growing market. Use data to show the potential scale of your business.',
          '<strong>The Traction:</strong> This is your proof. What have you achieved so far? This could be user growth, revenue, key partnerships, or product milestones. Traction turns your story from a dream into a reality.',
          '<strong>The Team:</strong> Why are you and your team the right people to solve this problem? Highlight your relevant experience and passion.'
        ],
        strategicInsights: [
          '<strong>One Pitch Doesn\'t Fit All:</strong> You need to tailor your pitch to your audience. A pitch to an investor will be different from a pitch to a customer.',
          '<strong>Data Backs Up the Story:</strong> A good story is emotional, but a great pitch combines that story with data. Use metrics to validate your claims about the problem, market, and traction.',
          '<strong>The Ask:</strong> Every pitch should end with a clear "ask." What do you want from your audience? Are you asking for funding, a sale, or a partnership?'
        ],
        talkingToDevs: [
          'How can we describe our technology in a way that is simple and powerful, even for a non-technical audience?',
          'What are the key data points from our product that can show our traction and user engagement?',
          'Let\'s practice our elevator pitch. Can we explain what we do and why it matters in 30 seconds?'
        ],
        interactiveElementBrief: 'Create a "Pitch Deck Builder." The user is guided through the key slides of a pitch deck (Problem, Solution, Market, etc.). For each slide, they are given prompts and examples to help them fill in the content. At the end, they can download a simple PDF of their generated pitch deck.'
      }
    }
  ]
};
