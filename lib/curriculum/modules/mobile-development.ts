import { CurriculumModule } from '../types';

export const mobileDevelopment: CurriculumModule = {
  id: 'mobile-development',
  title: 'Mobile Development',
  description: 'Create native and cross-platform mobile applications that provide exceptional user experiences.',
  thumbnail: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Mobile+Dev',
  estimatedTime: 40,
  difficulty: 'Intermediate',
  category: 'Development',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 4.6,
  studentsEnrolled: 0,
  prerequisites: ['frontend-development'],
  learningOutcomes: [
    'Understand mobile app development approaches',
    'Learn cross-platform development with React Native',
    'Master mobile UI/UX design principles',
    'Implement app store deployment strategies'
  ],
  lessons: [
    {
      id: 'mobile-platforms',
      title: 'Mobile Platforms Overview',
      duration: 10,
      coreConcepts: ['iOS', 'Android', 'Cross-Platform', 'Native Development'],
      analogy: 'Mobile platforms are like different languages—you can either learn each one separately or use a translator (cross-platform framework).',
      content: {
        hook: "With over 6.8 billion smartphone users globally, mobile platforms represent the largest computing ecosystem in history. Understanding the landscape of iOS, Android, and alternative approaches is crucial for founders making strategic technology decisions.",
        coreExplanation: [
          "<strong>iOS</strong> is Apple's mobile operating system powering iPhones and iPads. It represents about 27% of the global market but dominates in high-income countries and among users with higher purchasing power. iOS is known for its closed ecosystem, strict app review process, and users who spend significantly more on apps and in-app purchases. Native iOS development is done using Swift or Objective-C programming languages in Xcode, Apple's development environment.",
          "<strong>Android</strong> is Google's mobile operating system commanding roughly 71% of the global market. Android devices span a massive price range from budget phones to premium flagships, giving it broader market penetration, especially in developing economies. The Android ecosystem is more open but also more fragmented, with many device manufacturers and OS versions to support. Native Android development uses Kotlin or Java in Android Studio.",
          "<strong>Cross-Platform Development</strong> allows writing code once and deploying to both iOS and Android. The most popular frameworks include React Native (JavaScript/React), Flutter (Dart), and Xamarin (C#). These solutions aim to balance development efficiency with near-native performance and user experience. They're particularly valuable for startups with limited resources who need to reach both iOS and Android users.",
          "<strong>Progressive Web Apps (PWAs)</strong> are an alternative to native or cross-platform development. These are web applications that use modern web capabilities to deliver app-like experiences. They can be 'installed' to the home screen, work offline, and send push notifications (with limitations). PWAs offer the widest reach and fastest development but have limited access to device features and typically lower performance."
        ],
        strategicInsights: [
          "<strong>Know Your Audience:</strong> Your target demographic should drive platform decisions. If you're targeting business professionals in North America, iOS might be your priority. For a mass-market consumer app in India or Southeast Asia, Android would be essential.",
          "<strong>Platform-Specific Monetization:</strong> iOS users typically spend 2-3x more on apps and in-app purchases than Android users. However, Android's larger user base can compensate for lower average revenue per user. Ad-based models often perform well on both platforms but with different CPM rates.",
          "<strong>Feature Access Trade-offs:</strong> Native development gives you immediate access to the latest platform features when they're released. Cross-platform solutions typically have a delay before new OS features are supported. Consider whether cutting-edge features are core to your value proposition."
        ],
        talkingToDevs: [
          "What level of platform-specific functionality do we need? Are we using capabilities like ARKit/ARCore, complex animations, or background processing?",
          "What's our approach to supporting different Android versions and device sizes? What's our minimum supported OS version?",
          "How will our design accommodate both iOS and Android interface guidelines? Are we creating platform-specific designs or a unified approach?"
        ],
        interactiveElementBrief: "Create a 'Platform Strategy Builder' where users input their app's target audience demographics, required device features, budget constraints, and timeline. The tool generates a recommended platform approach (iOS-first, Android-first, or simultaneous) with a visual breakdown showing how their specific requirements influenced the recommendation."
      }
    },
    {
      id: 'react-native-development',
      title: 'React Native Development',
      duration: 10,
      coreConcepts: ['React Native', 'Components', 'Navigation', 'State Management'],
      analogy: 'React Native is like having a universal remote that can control both your TV and stereo with the same buttons.',
      content: {
        hook: "React Native has revolutionized mobile development by allowing teams to ship features to both iOS and Android with a single codebase. For startups with limited resources, this cross-platform approach can cut development time and costs by up to 50% while still delivering a near-native experience.",
        coreExplanation: [
          "<strong>React Native</strong> is a framework developed by Facebook that uses JavaScript and React to build mobile applications. Unlike web-based solutions that run in a browser, React Native compiles to native UI components, resulting in apps that look, feel, and perform like native applications. It's used by major companies including Instagram, Discord, Shopify, and Pinterest.",
          "<strong>Components</strong> are the building blocks of React Native apps. Similar to React for web, you create reusable UI elements, but instead of HTML tags like <div> or <span>, you use React Native's core components like <View>, <Text>, and <Image>. These components map directly to their native equivalents on each platform. For example, a <View> becomes a UIView on iOS and an android.view on Android. This component-based architecture promotes reusability and maintainability.",
          "<strong>Navigation</strong> in React Native handles how users move between screens. Unlike web navigation with URLs, mobile apps use navigation stacks, tabs, and drawers. React Navigation is the most popular library for implementing these patterns. It allows you to create a navigate('ScreenName') function that works identically on both platforms despite their underlying differences, abstracting away platform-specific navigation complexities.",
          "<strong>State Management</strong> is critical for maintaining your app's data and UI state. For simple apps, React's built-in useState and useContext may suffice. For more complex applications, solutions like Redux or MobX provide centralized state management. Effective state management ensures your app data flows predictably and remains consistent across component trees and screen transitions."
        ],
        strategicInsights: [
          "<strong>Balance Cross-Platform with Platform-Specific:</strong> While React Native's philosophy is 'learn once, write anywhere' (not 'write once, run anywhere'), you'll often need platform-specific code for certain features. A good rule is 80/20—aim for 80% shared code with 20% platform-specific customization where necessary for optimal user experience.",
          "<strong>Native Modules Bridge:</strong> React Native has a bridge to native code, allowing you to incorporate native functionality when needed. This means you're never completely limited by React Native's capabilities—you can always extend functionality with platform-specific code, though this requires native development expertise.",
          "<strong>Performance Considerations:</strong> React Native performs well for most apps, but complex animations, heavy computations, or highly custom UI may hit performance bottlenecks due to the JavaScript bridge. Be strategic about what runs in JS versus native code. For computation-heavy tasks, consider moving logic to native modules."
        ],
        talkingToDevs: [
          "How are we structuring our React Native codebase to maximize code sharing between platforms while still accommodating platform-specific UI patterns where appropriate?",
          "What's our state management strategy? As we add features, is our current approach (e.g., Context API, Redux) still appropriate for our growing complexity?",
          "For this feature that requires deep platform integration, should we develop a native module or is there an existing community package that meets our needs?"
        ],
        interactiveElementBrief: "Create a 'React Native Component Builder' where users construct a simple app screen by dragging and dropping core components (View, Text, Image, etc.) onto a canvas. As they build, the tool shows the React Native code being generated and a side-by-side preview of how it would appear on both iOS and Android, highlighting any platform-specific rendering differences."
      }
    },
    {
      id: 'mobile-ui-ux',
      title: 'Mobile UI/UX Design',
      duration: 10,
      coreConcepts: ['Touch Interfaces', 'Mobile Navigation', 'Performance', 'Accessibility'],
      analogy: 'Mobile UI design is like designing for a keyhole—you have limited space but need to provide a complete experience.',
      content: {
        hook: "Users form impressions of your app in just 50 milliseconds and will abandon it within a minute if the interface is confusing or slow. In the hyper-competitive mobile space, thoughtful UI/UX design isn't a luxury—it's the difference between adoption and abandonment.",
        coreExplanation: [
          "<strong>Touch Interfaces</strong> transform how we design interactive elements. Unlike desktop interfaces with precise cursor control, mobile interfaces must accommodate fingers of different sizes interacting with varying levels of precision. This has led to important design principles including: making touch targets at least 44x44 points (about 10mm) to ensure they're easily tappable; providing visual feedback for all interactions (like button states or subtle animations); and maintaining adequate spacing between interactive elements to prevent accidental taps. The touch paradigm also introduces gestures (swipe, pinch, long-press) that can make interactions more intuitive but must be used consistently and with proper visual affordances.",
          "<strong>Mobile Navigation</strong> patterns have evolved to accommodate small screens and one-handed use. Key patterns include tab bars (bottom navigation on iOS and Android) for primary destinations, hamburger menus for less frequently accessed sections, and back gestures/buttons for hierarchical navigation. Since screen transitions provide important context, navigation animations should clearly communicate whether users are moving deeper into content (slide from right), switching contexts (cross-fade), or returning to a previous screen (slide from left). Effective mobile navigation maintains user orientation and enables quick access to core functionality without overwhelming the limited screen space.",
          "<strong>Performance</strong> is particularly crucial on mobile due to variable network conditions and device capabilities. Design choices directly impact performance: complex animations, heavy images, or excessive interface elements can cause lag and battery drain. A performance-conscious design implements principles like: progressive loading with appropriate skeleton screens or placeholders; optimized images and assets for different screen densities; minimal use of shadows, blurs, and transparency effects on scroll views; and reducing UI reflows that force the device to recalculate layouts. For crucial actions like form submissions, design should incorporate optimistic UI updates that give immediate feedback while operations complete in the background.",
          "<strong>Accessibility</strong> ensures your app is usable by people with different abilities. Beyond being ethically important, it expands your potential user base. Mobile accessibility includes: supporting dynamic text sizes for users with visual impairments; ensuring sufficient color contrast (at least 4.5:1 for normal text); designing for screen readers by providing proper labels for all interactive elements; accommodating different input methods for users with motor limitations; and supporting both portrait and landscape orientations. The best practice is to regularly test your app with accessibility features enabled to identify and address issues early."
        ],
        strategicInsights: [
          "<strong>Platform Consistency vs. Brand Identity:</strong> Strike a balance between following platform-specific design guidelines (iOS Human Interface Guidelines or Material Design) and maintaining your unique brand identity. Users expect certain patterns on each platform, but a completely generic interface won't be memorable. Adapt your brand to each platform rather than forcing an identical look across both.",
          "<strong>Ruthless Prioritization:</strong> Mobile success depends on identifying and elevating your app's core value. Every additional feature, button, or menu item creates cognitive load. A useful exercise is to identify your app's single most important action, ensure it's prominent and frictionless, then carefully evaluate every other element against this priority.",
          "<strong>Test on Real Devices:</strong> Emulators and design tools can't fully replicate the experience of using your app on actual devices. Performance issues, touch target problems, and readability concerns often only become apparent on real hardware. Build device testing into your design process, particularly with older or lower-end devices your target audience might use."
        ],
        talkingToDevs: [
          "How can we optimize image loading and caching to ensure the interface remains responsive even on slower connections?",
          "This animation feels sluggish on mid-range Android devices. Can we simplify it or implement a more performance-friendly alternative?",
          "How are we handling accessibility features like VoiceOver/TalkBack? Have we tested the app with these enabled?"
        ],
        interactiveElementBrief: "Create a 'Mobile Design Analyzer' tool where users upload screenshots of mobile apps (their own or competitors'). The tool highlights common mobile design issues like undersized touch targets, poor contrast ratios, or overcrowded navigation. For each issue, it offers a brief explanation and a simple visual showing the 'before' and an improved 'after' version."
      }
    },
    {
      id: 'native-vs-cross-platform',
      title: 'Native vs. Cross-Platform',
      duration: 10,
      coreConcepts: ['Performance Trade-offs', 'Development Speed', 'Platform Features', 'Team Structure'],
      analogy: 'Choosing between native and cross-platform is like hiring a specialist chef for Italian food versus a fusion chef who can make great sushi and pasta from the same kitchen.',
      content: {
        hook: 'Your app needs to be on your users\' phones. But should you build two separate, native apps for iOS and Android, or one single app that works on both? This is one of the biggest strategic decisions a mobile-first startup will face.',
        coreExplanation: [
          'There are two main paths to building a mobile app.',
          '<strong>Native Development</strong> is like hiring a specialist chef for Italian food and another for Japanese food. For iOS, developers use Apple\'s language (Swift) and tools (Xcode). For Android, they use Google\'s language (Kotlin) and tools (Android Studio). The result is the absolute best performance, a perfect look and feel that matches the operating system, and immediate access to the latest device features (like new camera APIs). However, it\'s expensive and slow, as you have to build and maintain two completely separate codebases with two separate teams.',
          '<strong>Cross-Platform Development</strong> is like hiring a fusion chef who can make great sushi and great pasta from the same kitchen. Using a framework like React Native or Flutter, developers write one codebase that can be compiled into both an iOS app and an Android app. This is dramatically faster and cheaper, as you only have one team and one codebase to manage. The trade-off is a slight performance hit and sometimes a small delay in accessing the very latest native features. For the vast majority of apps, this trade-off is more than worth it.',
          'Don\'t forget the web: A "Progressive Web App" (PWA) is a third option. It\'s a mobile website that can be "installed" on a user\'s home screen and can work offline. It\'s the fastest and cheapest way to get onto a user\'s phone, but it\'s more limited than a true app.'
        ],
        strategicInsights: [
          '<strong>Budget and Speed are Key:</strong> For most startups, cross-platform is the logical choice. It allows you to reach both iOS and Android users with half the team and in half the time.',
          '<strong>When to Go Native:</strong> Native is the right choice if your app\'s core value proposition depends on cutting-edge performance, complex animations, or immediate access to the latest OS-specific hardware features (like advanced AR or camera functions).',
          '<strong>Don\'t Forget the Web:</strong> A "Progressive Web App" (PWA) is a third option. It\'s a mobile website that can be "installed" on a user\'s home screen and can work offline. It\'s the fastest and cheapest way to get onto a user\'s phone, but it\'s more limited than a true app.'
        ],
        talkingToDevs: [
          'Let\'s discuss the native vs. cross-platform trade-off. For our app\'s core features, do we truly need the performance of a native app?',
          'If we choose React Native, how will we handle any features that might require custom native code?',
          'Could we start with a PWA to test the market before investing in a full cross-platform application?'
        ],
        interactiveElementBrief: 'Create a \'Mobile Strategy Calculator\'. The user answers questions via sliders: "How important is budget? (Low/High)", "How important is raw performance? (Low/High)", "How quickly do you need to launch? (Slow/Fast)". Based on their inputs, the tool provides a recommendation: "Cross-Platform Recommended," "Native Recommended," or "Consider a PWA."' 
      }
    }
  ]
};
