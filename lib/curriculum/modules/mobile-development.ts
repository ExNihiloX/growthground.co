import { CurriculumModule } from '../types';

export const mobileDevelopment: CurriculumModule = {
  id: 'mobile-development',
  title: 'Modern Mobile Development',
  description: 'Learn the strategies behind building successful mobile apps, from choosing the right technology to mastering the app store ecosystem.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Mobile+Dev',
  estimatedTime: 30,
  difficulty: 'Intermediate',
  category: 'Development',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.8,
  studentsEnrolled: 0,
  prerequisites: ['the-digital-landscape'],
  learningOutcomes: [
    'Evaluate the trade-offs between native and cross-platform development.',
    'Navigate the Apple App Store and Google Play Store submission processes.',
    'Understand the principles of mobile-first UX design.',
    'Develop an effective strategy for push notifications.'
  ],
  lessons: [
    {
      id: 'native-vs-cross-platform',
      title: 'Mobile: Native vs. Cross-Platform (Deep Dive)',
      duration: 10,
      coreConcepts: ['Native Development', 'Cross-Platform Development', 'React Native', 'Flutter', 'Progressive Web App (PWA)'],
      analogy: "Native is hiring specialist chefs for Italian and Japanese food. Cross-platform is hiring one fusion chef who can cook both.",
      content: {
        hook: "Your app needs to be on your users' phones. But should you build two separate, native apps for iOS and Android, or one single app that works on both? This is one of the biggest strategic decisions a mobile-first startup will face.",
        coreExplanation: [
          "There are two main paths to building a mobile app.",
          "<strong>Native Development</strong> is like hiring a specialist chef for Italian food and another for Japanese food. For iOS, developers use Apple's language (Swift) and tools (Xcode). For Android, they use Google's language (Kotlin) and tools (Android Studio). The result is the absolute best performance, a perfect look and feel that matches the operating system, and immediate access to the latest device features (like new camera APIs). However, it's expensive and slow, as you have to build and maintain two completely separate codebases with two separate teams.",
          "<strong>Cross-Platform Development</strong> is like hiring a fusion chef who can make great sushi and great pasta from the same kitchen. Using a framework like React Native or Flutter, developers write one codebase that can be compiled into both an iOS app and an Android app. This is dramatically faster and cheaper, as you only have one team and one codebase to manage. The trade-off is a slight performance hit and sometimes a small delay in accessing the very latest native features. For the vast majority of apps, this trade-off is more than worth it."
        ],
        strategicInsights: [
          "<strong>Budget and Speed are Key:</strong> For most startups, cross-platform is the logical choice. It allows you to reach both iOS and Android users with half the team and in half the time.",
          "<strong>When to Go Native:</strong> Native is the right choice if your app's core value proposition depends on cutting-edge performance, complex animations, or immediate access to the latest OS-specific hardware features (like advanced AR or camera functions).",
          "<strong>Don't Forget the Web:</strong> A 'Progressive Web App' (PWA) is a third option. It's a mobile website that can be 'installed' on a user's home screen and can work offline. It's the fastest and cheapest way to get onto a user's phone, but it's more limited than a true app."
        ],
        talkingToDevs: [
          "Let's discuss the native vs. cross-platform trade-off. For our app's core features, do we truly need the performance of a native app?",
          "If we choose React Native, how will we handle any features that might require custom native code?",
          "Could we start with a PWA to test the market before investing in a full cross-platform application?"
        ],
        interactiveElementBrief: "Create a 'Mobile Strategy Calculator'. The user answers questions via sliders: 'How important is budget? (Low/High)', 'How important is raw performance? (Low/High)', 'How quickly do you need to launch? (Slow/Fast)'. Based on their inputs, the tool provides a recommendation: 'Cross-Platform Recommended,' 'Native Recommended,' or 'Consider a PWA.'"
      }
    },
    {
      id: 'app-store-ecosystem',
      title: 'The App Store Ecosystem',
      duration: 10,
      coreConcepts: ['App Store Submission', 'Review Process', 'App Store Optimization (ASO)', 'Platform Fees'],
      analogy: "The app stores are the world's two largest and most exclusive shopping malls. To get on their shelves, you have to play by their rules.",
      content: {
        hook: "Building the app is only half the battle. Getting it into the hands of users means navigating the powerful, and sometimes mysterious, ecosystems of the Apple App Store and Google Play Store.",
        coreExplanation: [
          "Think of the app stores as the world's two largest and most exclusive shopping malls. To get your product on their shelves, you have to play by their rules.",
          "The <strong>Submission Process</strong> is like applying for a retail space. You need to provide a huge amount of information: your app's name, description, screenshots, privacy policy, and a demo account for the reviewers. You then submit your app for review.",
          "The <strong>Review Process</strong> is the mall's management team inspecting your product. Apple's review process is notoriously strict. Human reviewers check your app for bugs, quality, content, and adherence to their detailed design and safety guidelines. Rejection is common. Google's review process is faster and more automated, but they are also cracking down on low-quality apps.",
          "<strong>Store Presence</strong> is your storefront. App Store Optimization (ASO) is the art of choosing the right keywords, title, and screenshots to rank higher in search results and convince users to download your app. User ratings and reviews are incredibly important for your store's visibility."
        ],
        strategicInsights: [
          "<strong>Factor Review Time into Your Launch Plan:</strong> Apple's review can take anywhere from a day to over a week. You cannot plan a marketing launch for a specific day without accounting for this uncertainty.",
          "<strong>The 30% 'Mall Fee':</strong> Both Apple and Google take a significant cut (typically 15-30%) of all revenue generated through their platforms, including in-app purchases and subscriptions. You must factor this into your pricing and financial model.",
          "<strong>Guidelines are Law:</strong> Read the App Store Guidelines. A violation can get your app rejected or even removed from the store, which can be an existential threat to your business."
        ],
        talkingToDevs: [
          "What is our checklist of assets we need to prepare for the App Store submission?",
          "Are there any features in our app that might be controversial or at risk of rejection by Apple's review team?",
          "What is our strategy for encouraging users to leave positive ratings and reviews to boost our ASO?"
        ],
        interactiveElementBrief: "Create an 'App Store Submission Simulator'. The user is presented with a checklist of items needed for submission. As they click each item ('Write Description,' 'Take Screenshots,' 'Set Pricing'), it gets checked off. If they try to click 'Submit for Review' before all items are checked, they get an error message, simulating the meticulous nature of the process."
      }
    },
    {
      id: 'mobile-first-ux-push-notifications',
      title: 'Mobile-First UX & Push Notifications',
      duration: 10,
      coreConcepts: ['Mobile-First UX', 'Push Notifications', 'User Engagement', 'Onboarding'],
      analogy: "Mobile-First UX is like packing for a backpacking trip, not a road trip—you must be ruthless about what is essential.",
      content: {
        hook: "A great mobile app isn't just a shrunken-down version of your website. It's a unique experience designed for a small screen, intermittent connectivity, and a user on the go. How do you master this unique environment?",
        coreExplanation: [
          "<strong>Mobile-First UX</strong> means designing for the smallest screen and most limited context first. Think of it like packing for a backpacking trip versus a road trip. For the road trip (desktop), you can pack everything. For the backpacking trip (mobile), you must be ruthless about what is essential. This forces you to focus on the core value proposition of your app and eliminate clutter. Key elements include large, tappable buttons (not tiny links), simple navigation, and prioritizing content over chrome.",
          "<strong>Push Notifications</strong> are your direct line of communication to your users, right on their home screen. They are like a personal text message from your brand. Used well, they can be incredibly powerful for engagement. A notification about a sale, a new message, or a new feature can bring users back into the app.",
          "However, used poorly, they are a one-way ticket to getting your app uninstalled. Abusing push notifications with spammy, irrelevant marketing messages is the fastest way to annoy your users. The golden rule is that every notification must provide clear, immediate value to the user."
        ],
        strategicInsights: [
          "<strong>Design for Thumbs:</strong> All key interactions should be within easy reach of a user's thumb at the bottom of the screen.",
          "<strong>The 'Onboarding' Permission Ask:</strong> The moment you ask for permission to send push notifications is critical. You must first explain the value the user will get before showing the system-level permission pop-up.",
          "<strong>Personalization is Key:</strong> The most effective push notifications are personalized. 'Your order has shipped!' is a great notification. 'Check out our new summer sale!' is a weak one."
        ],
        talkingToDevs: [
          "As we design this feature, how would it look on a small mobile screen first? Let's start there.",
          "What is our strategy for push notifications? What user actions will trigger a notification?",
          "How can we A/B test our push notification copy to improve our open rates?"
        ],
        interactiveElementBrief: "A 'Notification Grader.' The user is shown a series of push notification examples. They must drag each one into a 'Good Notification' or 'Bad Notification' bucket. Examples: (Good) 'Your friend Jessica just commented on your post.' (Bad) 'We miss you! Come back and see what's new.' The tool provides feedback on why each one is good or bad."
      }
    }
  ]
};