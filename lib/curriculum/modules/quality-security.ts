import { CurriculumModule } from '../types';

export const qualitySecurity: CurriculumModule = {
  id: 'quality-security',
  title: 'Ensuring Quality & Security',
  description: 'A deep dive into the practices that ensure your application is not only functional but also robust, secure, and user-friendly for everyone.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Quality+%26+Security',
  estimatedTime: 30,
  difficulty: 'Intermediate',
  category: 'Quality & Security',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 5,
  studentsEnrolled: 0,
  prerequisites: ['the-tech-stack'],
  learningOutcomes: [
    'Distinguish between different types of software testing and their purposes.',
    'Identify common web security vulnerabilities and their defenses.',
    'Understand the importance of web performance and accessibility.',
    'Develop a strategy for implementing quality and security practices in a project.'
  ],
  lessons: [
    {
      id: 'full-testing-spectrum',
      title: 'The Full Testing Spectrum',
      duration: 10,
      coreConcepts: ['Unit Tests', 'Integration Tests', 'End-to-End (E2E) Tests', 'Manual QA', 'Testing Pyramid'],
      analogy: 'Testing an app is like ensuring a new car is safe, from checking individual spark plugs to taking it for a real-world test drive.',
      content: {
        hook: 'Unit and Integration tests are great for checking if the code works. But how do you verify the entire user journey works as expected from start to finish? That requires a broader spectrum of testing.',
        coreExplanation: [
          'Think of testing your app like ensuring a new car is safe.',
          'Unit Tests are for the smallest parts: Does the spark plug fire? Do the brake pads have friction?',
          'Integration Tests check if parts work together: Does pressing the brake pedal engage the brake pads?',
          'But you still need to test the whole car. End-to-End (E2E) Tests are like putting a crash test dummy in the driver\'s seat and running the car through a real-world course. An E2E test for your app would be an automated script that: opens a real web browser, navigates to your sign-up page, fills out the form and creates a new user, logs in as that user, navigates to the dashboard and clicks a button, and verifies that the expected text appears on the screen.',
          'These tests are slow and brittle, but they give you the highest confidence that critical user flows are working.',
          'Finally, Manual QA (Quality Assurance) is having a human test driver take the car on the road to \"feel\" how it handles and look for subtle issues the robots might have missed. Your team or a dedicated QA specialist will manually click through the app, trying to break it and checking for visual polish and usability issues.'
        ],
        strategicInsights: [
          'The Testing Pyramid: A healthy project has many fast unit tests at the base, fewer integration tests in the middle, and a small number of critical E2E tests at the top. Relying only on E2E or manual testing is slow and inefficient.',
          'User Flow Confidence: E2E tests are essential for giving you confidence that your most critical business flows—like user sign-up and checkout—are always working.',
          'The Human Element: Automation can\'t catch everything. Budgeting for manual QA, especially before a major release, is crucial for ensuring a high-quality user experience.'
        ],
        talkingToDevs: [
          '\"What are the most critical user journeys for our business, and do we have E2E tests covering them?\"',
          '\"What is our strategy for manual QA? Who is responsible for it, and when does it happen in our release cycle?\"',
          '\"How can I help with QA? Is there a test plan I can follow to check new features?\"'
        ],
        interactiveElementBrief: "Create a 'Testing Pyramid Builder.' The user sees a pyramid shape divided into three sections. They must drag labels (\"Unit Test\", \"Integration Test\", \"E2E Test\", \"Manual QA\") into the correct section of the pyramid, reinforcing the concept of how many of each test type a healthy project should have."
      }
    },
    {
      id: 'web-security-fundamentals',
      title: 'Web Security Fundamentals',
      duration: 10,
      coreConcepts: ['OWASP Top 10', 'Injection Attacks', 'Cross-Site Scripting (XSS)', 'Broken Authentication', 'Incident Response'],
      analogy: 'Securing your app is like securing your house; it requires multiple layers of defense.',
      content: {
        hook: "A single security breach can destroy your startup's reputation and user trust overnight. As a founder, you don't need to be a hacker, but you absolutely must understand the fundamental principles of keeping your users and your company safe.",
        coreExplanation: [
          'Think of your app\'s security like securing your house. You need multiple layers of defense. Here are a few of the most common threats to be aware of (part of the famous \"OWASP Top 10\"):',
          'Injection Attacks are like a burglar tricking your smart lock into opening by shouting a malicious command through the mail slot. In code, this happens when your app takes user input (like from a search box) and runs it on the database without cleaning it first. An attacker can \"inject\" a malicious database command to steal or delete all your data. Defense: Always sanitize and validate all user input.',
          'Cross-Site Scripting (XSS) is like someone leaving a fake, dangerous package on your doorstep for another visitor to open. An attacker posts malicious JavaScript code onto your site (e.g., in a comment). When another user views that comment, the script runs in their browser and can steal their login token or redirect them to a phishing site. Defense: Always encode output to ensure browsers treat it as text, not runnable code.',
          'Broken Authentication is simply leaving your front door unlocked. This includes weak password policies, predictable session IDs, or not properly invalidating a user\'s session when they log out. Defense: Use a trusted, battle-tested authentication provider (like Supabase Auth, which you\'re using!) and enforce Multi-Factor Authentication (MFA).'
        ],
        strategicInsights: [
          'Security is a Process, Not a Feature: It\'s an ongoing responsibility. You should conduct regular security audits and vulnerability scans.',
          'The Biggest Weakness is Human: The most common security failures come from social engineering (phishing) of your employees. Train your team on security best practices.',
          'Compliance is Non-Negotiable: If you handle sensitive data (health, finance), you are subject to strict legal regulations like GDPR or HIPAA. A breach can result in massive fines.'
        ],
        talkingToDevs: [
          '\"How are we protecting against the most common threats, like SQL Injection and XSS?\"',
          '\"What third-party services are we using to help with security, like vulnerability scanning or firewall services?\"',
          '\"What is our incident response plan? What do we do the moment we suspect we\'ve had a security breach?\"'
        ],
        interactiveElementBrief: "A 'Security Threat Simulator.' The user is shown a simple code snippet with a vulnerability. They are then asked to choose which type of attack it's vulnerable to from a list (e.g., \"SQL Injection,\" \"XSS\"). Selecting the right one provides a brief explanation of how the attack would work."
      }
    },
    {
      id: 'performance-accessibility',
      title: 'Performance & Accessibility',
      duration: 10,
      coreConcepts: ['Core Web Vitals', 'Bundle Size', 'Accessibility (a11y)', 'Semantic HTML', 'Lighthouse'],
      analogy: 'Performance and accessibility are like ensuring a store is easy to get into and quick to shop in.',
      content: {
        hook: 'It\'s not enough for your app to work and be secure; it must also be fast and usable by everyone. Performance and Accessibility are not \"nice-to-haves\"; they are core components of a quality product that directly impact your bottom line.',
        coreExplanation: [
          'Performance is all about speed and responsiveness. Think of it like a well-optimized retail store. Customers will leave if the checkout line is too long or if they can\'t find what they\'re looking for quickly. For your app, this translates to:',
          'Page Load Speed: How quickly your content appears. Key metrics include First Contentful Paint (FCP) and Largest Contentful Paint (LCP). Slow load times are a primary reason users abandon a site.',
          'Bundle Size: The total size of all the code, images, and assets a user has to download. Keeping this small is critical, especially for users on slow mobile connections.',
          'Responsiveness: How quickly the UI responds to user input, like a button click.',
          'Accessibility (a11y) is about making your app usable by people with disabilities. This is like ensuring your retail store has wheelchair ramps, braille signage, and aisles wide enough for everyone. In web terms, this means:',
          'Semantic HTML: Using the correct HTML tags so screen readers can understand the page structure.',
          'Alt Text: Providing text descriptions for images for visually impaired users.',
          'Keyboard Navigation: Ensuring a user can navigate and use your entire app without a mouse.',
          'Color Contrast: Making sure your text is clearly readable against its background.'
        ],
        strategicInsights: [
          'Performance is a Feature: A faster app leads to higher conversion rates, better user engagement, and higher SEO rankings from Google.',
          'Accessibility Expands Your Market: Building an accessible app is not only the right thing to do, but it also makes your product available to millions of more users.',
          'Legal Requirements: In many regions, web accessibility is a legal requirement, and failing to comply can lead to lawsuits.'
        ],
        talkingToDevs: [
          '\"What are our performance goals for Core Web Vitals like LCP? How are we monitoring them?\"',
          '\"Can we run a Lighthouse audit on our key pages to identify performance and accessibility issues?\"',
          '\"As we design this new component, how are we ensuring it is fully accessible and keyboard-navigable?\"'
        ],
        interactiveElementBrief: "A 'Lighthouse Report Analyzer.' The user is shown a simplified version of a Google Lighthouse report with scores for Performance and Accessibility. They can click on a low score (e.g., \"Performance: 55\") to see a list of common issues (e.g., \"Large, unoptimized images,\" \"Unused JavaScript\"), explaining the cause and effect."
      }
    }
  ]
};
