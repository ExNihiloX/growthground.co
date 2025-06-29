import { CurriculumModule } from '../types';

export const leveragingDataAi: CurriculumModule = {
  id: 'leveraging-data-ai',
  title: 'Leveraging Data & AI',
  description: 'Harness the power of data analytics and artificial intelligence to make informed decisions and build intelligent features.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Data+%26+AI',
  estimatedTime: 50, // Updated from 30
  difficulty: 'Intermediate',
  category: 'Business',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.8,
  studentsEnrolled: 0,
  prerequisites: ['backend-development'],
  learningOutcomes: [
    'Understand product analytics and user behavior tracking.',
    'Learn the fundamentals of building a data pipeline.',
    'Differentiate between product, marketing, and business intelligence tools.',
    'Understand the fundamentals of AI and machine learning.',
    'Implement data-driven decision making processes like A/B testing.'
  ],
  lessons: [
    {
      id: 'product-analytics-explained',
      title: 'Product Analytics Explained',
      duration: 10,
      coreConcepts: ['User Events', 'Funnels', 'Cohorts', 'Retention'],
      analogy: 'Product analytics is like installing security cameras and foot traffic counters in your retail store to understand customer behavior.',
      content: {
        hook: 'You\'ve launched your app. Are people using it? Where are they getting stuck? Are they coming back? Answering these questions requires moving beyond guesswork and embracing Product Analytics.',
        coreExplanation: [
          'Product Analytics is the process of understanding how users behave within your product. Think of it like installing security cameras and foot traffic counters in your retail store.',
          'Instead of just knowing your total sales (your revenue), you can now see which aisles are most popular, where customers linger, and at which point in the store they tend to abandon their shopping carts.',
          'In your app, you install a tool like Mixpanel, Amplitude, or PostHog. Then, you track specific <strong>Events</strong>, like User Signed Up, Article Saved, or Plan Upgraded. With this data, you can build:',
          '<strong>Funnels:</strong> To see where users drop off in a critical flow. For example: Viewed Pricing Page -> Clicked "Upgrade" -> Successfully Paid. A huge drop-off between steps 2 and 3 tells you there\'s a problem with your payment form.',
          '<strong>Cohorts:</strong> To group users by when they signed up. You can then track their <strong>Retention</strong> over time. Are users who signed up in June still active in August? This is the ultimate measure of product-market fit.'
        ],
        strategicInsights: [
          '<strong>Data-Informed Decisions:</strong> Product analytics allows you to replace "I think..." with "The data shows..." when making roadmap decisions.',
          '<strong>Identify Friction Points:</strong> Funnel analysis is the best way to find and fix the hidden friction points in your app that are costing you conversions and engagement.',
          '<strong>Measure Product-Market Fit:</strong> Your user retention curve is the most honest indicator of whether you\'ve built something people truly value. A flattening retention curve is the goal.'
        ],
        talkingToDevs: [
          'What is our event tracking plan for this new feature? What key actions do we need to measure?',
          'Can we build a funnel in Mixpanel for our user onboarding flow to see where people are dropping off?',
          'Let\'s review our 30-day retention cohort. Is it improving month over month?'
        ],
        interactiveElementBrief: 'Create a \'Funnel Analysis Simulator.\' The user sees a visual funnel with three steps and the percentage of users who complete each one. They are then given three potential improvements (e.g., "Improve button text," "Fix bug in form," "Change page color"). They must choose the one most likely to fix the biggest drop-off point in the funnel.'
      }
    },
    {
      id: 'data-driven-decisions',
      title: 'Data-Driven Decision Making',
      duration: 10,
      coreConcepts: ['A/B Testing', 'Statistical Significance', 'Metrics vs Vanity Metrics', 'Data Visualization'],
      analogy: 'Data-driven decisions are like using a GPS instead of guessing directions—you get to your destination faster and with fewer wrong turns.',
      content: {
        hook: 'Intuition and gut feelings can take your business far, but data-driven decision making is the rocket fuel that propels startups to scale. Learn how to make decisions that are backed by evidence rather than opinions.',
        coreExplanation: [
          'Data-driven decision making is like navigating with GPS instead of guessing directions. It doesn\'t mean abandoning intuition; it means enhancing it with objective information.',
          '<strong>A/B Testing</strong> is the scientific method for product decisions. Rather than argue about whether a blue or green button will convert better, you show version A to half your users and version B to the other half, then measure which performs better. This requires creating a clear hypothesis, defining success metrics in advance, and ensuring you have enough users to achieve <strong>Statistical Significance</strong>—the confidence that your results aren\'t just random chance.',
          'Not all metrics are created equal. <strong>Vanity Metrics</strong> look impressive but don\'t inform decisions—like total signups (without showing actives) or page views (without engagement). <strong>Actionable Metrics</strong> directly inform decisions by showing clear cause and effect: "When we changed X, metric Y improved by Z%."',
          '<strong>Data Visualization</strong> is the translation layer that makes complex data understandable to humans. A well-designed chart can reveal patterns instantly that would be invisible in a spreadsheet. The best visualizations focus on comparison and context, not just raw numbers.'
        ],
        strategicInsights: [
          '<strong>Small Bets, Fast Learning:</strong> Use data to make many small, reversible decisions rather than few big ones. Each experiment, successful or not, generates learning that compounds over time.',
          '<strong>Decision Velocity:</strong> The startup that makes and tests 100 decisions a month will outperform one that makes 10, even if their accuracy rate is lower. Design your data infrastructure to speed up decision cycles.',
          '<strong>Culture Impact:</strong> Moving to data-driven decisions often meets resistance. It requires reframing the culture from "who has the best opinion" to "who has the best evidence."'
        ],
        talkingToDevs: [
          'Can we implement an A/B testing framework that allows experiments without engineering involvement for each test?',
          'How are we capturing user flow data to identify bottlenecks in our conversion funnel?',
          'What metrics should we track to validate whether our new feature is successful?'
        ],
        interactiveElementBrief: 'Create an "A/B Test Simulator" where users design a simple hypothesis, choose metrics, and simulate an experiment. Based on their design choices, they\'ll see how sample size and statistical significance play out with visualized results that either confirm or reject their hypothesis.'
      }
    },
    {
      id: 'building-your-data-pipeline',
      title: 'Building Your Data Pipeline',
      duration: 10,
      coreConcepts: ['ETL/ELT', 'Data Warehouse', 'Event Tracking', 'Single Source of Truth'],
      analogy: 'A data pipeline is like the water system for a city, collecting, cleaning, and delivering raw data to a central place for analysis.',
      content: {
        hook: 'Your app is generating valuable data every second: user clicks, sign-ups, purchases. But this raw data is useless until it\'s collected, cleaned, and delivered to a place where you can analyze it. This process is your Data Pipeline.',
        coreExplanation: [
          'Think of your data pipeline like the water system for a city.',
          'Raw, unfiltered water (raw event data from your app) is collected from a river. It then goes through a pipeline (a process called ETL or ELT).',
          '<strong>ETL stands for Extract, Transform, Load.</strong>',
          '<strong>Extract:</strong> Pull the raw data from its source (your app\'s database).',
          '<strong>Transform:</strong> Clean it up. Standardize date formats, remove test user accounts, join it with other data to add context. This is like the water filtration plant.',
          '<strong>Load:</strong> Load the clean, structured data into a <strong>Data Warehouse</strong> (like Google BigQuery or Snowflake), which is like the city\'s main water tower.',
          'This clean, aggregated data in the warehouse is what you use to power your analytics dashboards and business intelligence tools. Modern tools like Segment can act as the universal pipeline, collecting data once and sending it to all your different destinations (analytics, marketing, etc.).'
        ],
        strategicInsights: [
          '<strong>Start Collecting Early:</strong> Even if you don\'t have a data scientist, start collecting your core user events from day one. Data is a time-machine; you can\'t go back and get the data you didn\'t collect.',
          '<strong>Garbage In, Garbage Out:</strong> The quality of your analytics depends entirely on the quality of your tracking. A poorly planned data pipeline will lead to misleading conclusions.',
          '<strong>Single Source of Truth:</strong> A data warehouse aims to be the "single source of truth" for all your company\'s metrics, ensuring that the marketing team and the product team are looking at the same numbers.'
        ],
        talkingToDevs: [
          'What is our event tracking plan? Have we defined a clear schema for what user actions we are tracking?',
          'Which ETL/ELT tool are we using to get data from our production database into our data warehouse?',
          'How are we ensuring the data in our warehouse is clean and reliable?'
        ],
        interactiveElementBrief: 'Create a \'Data Pipeline Visualizer.\' The user sees icons for "App Database," "Analytics Tool," and "Marketing Tool." They must drag and drop a "Segment" or "ETL Tool" icon in the middle to correctly connect the data flow, visually understanding the concept of a central data pipeline.'
      }
    },
    {
      id: 'the-analytics-toolbox',
      title: 'The Analytics Toolbox',
      duration: 10,
      coreConcepts: ['Product Analytics', 'Marketing Analytics', 'Business Intelligence (BI)', 'Full Funnel View'],
      analogy: 'Your analytics tools are like the different gauges in an airplane cockpit; each one tells you something different but equally important.',
      content: {
        hook: 'You\'re collecting data. Now what? Different questions require different tools. Understanding the difference between Product Analytics, Marketing Analytics, and Business Intelligence is key to getting the right answers.',
        coreExplanation: [
          'Think of your analytics tools like the different gauges in an airplane cockpit. Each one tells you something different but equally important.',
          '<strong>Product Analytics</strong> (e.g., Mixpanel, Amplitude) tells you what users are doing inside your product. It\'s the gauge that shows engine performance and fuel flow. It answers questions like: "What features do our power users engage with most?" and "Where are users dropping off in the onboarding funnel?"',
          '<strong>Marketing Analytics</strong> (e.g., Google Analytics) tells you how users get to your product. It\'s the navigation system, showing you where you came from and where you\'re going. It answers questions like: "Which marketing channel is driving the most sign-ups?" and "What is the conversion rate of our landing page?"',
          '<strong>Business Intelligence (BI) tools</strong> (e.g., Tableau, Looker) are like the summary screen for the pilot. They connect to your data warehouse and allow you to visualize high-level business metrics by joining data from many sources. BI tools answer questions like: "What is the Lifetime Value (LTV) of a user who came from a Google Ad vs. a Facebook Ad?"'
        ],
        strategicInsights: [
          '<strong>Different Tools for Different Questions:</strong> Don\'t try to use Google Analytics to understand in-product behavior. Use the right tool for the job.',
          '<strong>The Full Funnel View:</strong> True insight comes from connecting these tools. Understanding which marketing channel brings in users with the highest retention (from your product analytics) is a game-changer.',
          '<strong>Start with Product Analytics:</strong> For an early-stage startup, understanding how users engage with your product is the most critical task. Focus on getting your product analytics set up correctly first.'
        ],
        talkingToDevs: [
          'We\'re using Google Analytics for marketing attribution. Which tool are we using for in-product, event-based analytics?',
          'Can we connect our product analytics data to our BI tool so we can see how feature usage impacts customer LTV?',
          'What is the one key metric from our product analytics that we should be reviewing as a team every week?'
        ],
        interactiveElementBrief: 'A \'Tool Matcher\' game. The user is presented with a series of questions (e.g., "Which ad campaign is most effective?", "Why are users leaving the checkout page?"). They must drag the question to the correct tool icon (Google Analytics, Mixpanel, Tableau), learning which tool answers which type of question.'
      }
    },
    {
      id: 'demystifying-ai-ml',
      title: 'Practical AI: From Chatbots to Personalization',
      duration: 10,
      coreConcepts: ['Machine Learning', 'Large Language Models', 'APIs vs Training', 'Use Cases'],
      analogy: 'Machine learning is like training a dog—you don\'t write a rulebook, you show thousands of examples and let it learn patterns.',
      content: {
        hook: '"We should use AI." It\'s the phrase every founder is hearing and thinking. But what does it actually mean? Understanding the basics of AI and Machine Learning is key to separating the hype from the real business opportunities.',
        coreExplanation: [
          'Let\'s break down the buzzwords. <strong>Artificial Intelligence (AI)</strong> is the broad concept of making machines that can perform tasks that typically require human intelligence.',
          '<strong>Machine Learning (ML)</strong> is the most common type of AI today. Think of it not as programming a computer with explicit rules, but as training a dog. You don\'t write a rulebook for "how to catch a frisbee." Instead, you show the dog thousands of examples by throwing the frisbee. It tries, fails, and slowly learns the patterns of flight, speed, and trajectory. ML models work the same way: you feed them massive amounts of data, and they learn to recognize patterns and make predictions. Common examples include:',
          '<strong>Recommendation Engines:</strong> (Netflix, Amazon) - It learns what you like based on your viewing history and recommends similar content.',
          '<strong>Spam Filters:</strong> It learns the patterns of spam emails from millions of examples.',
          '<strong>Large Language Models (LLMs)</strong> like GPT-4 are a type of ML model trained specifically on a massive amount of text and code. They are exceptionally good at understanding and generating human-like language, making them perfect for chatbots and content creation.'
        ],
        strategicInsights: [
          '<strong>AI requires Data:</strong> Machine learning is not magic; it is powered by vast amounts of clean, labeled data. If you don\'t have a strong data strategy, you can\'t have a strong AI strategy.',
          '<strong>Start with the Problem, Not the Tech:</strong> Don\'t ask "How can we use AI?" Ask "What is our biggest business problem?" and then see if an AI/ML approach is a good fit to solve it.',
          '<strong>Buy vs. Build:</strong> For 99% of startups, training your own ML model from scratch is a massive, expensive mistake. The strategy is to use powerful, pre-trained models via APIs (like OpenAI\'s GPT).'
        ],
        talkingToDevs: [
          'Instead of building our own recommendation engine, could we use a third-party API to get started?',
          'What data would we need to start collecting now if we wanted to build a personalization feature in the future?',
          'What are the cost and latency implications of using an LLM API for this feature?'
        ],
        interactiveElementBrief: 'A \'Use Case Sorter.\' The user is given a list of business problems (e.g., "Filter toxic user comments," "Predict which customers are likely to churn," "Summarize long articles"). They must drag each problem to the correct ML category ("Classification," "Regression," "Generation"), learning to map problems to AI solutions.'
      }
    }
  ]
};