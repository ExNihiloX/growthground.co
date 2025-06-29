import { CurriculumModule } from '../types';

export const theDevelopersToolkit: CurriculumModule = {
  id: 'the-developers-toolkit',
  title: "The Developer's Toolkit (Comprehensive)",
  description: "Master the essential tools and workflows that professional developers use every day, from version control with Git to automated testing.",
  thumbnail: '/thumbnails/module-2.png',
  estimatedTime: 60,
  difficulty: 'Beginner',
  category: 'Development Practices',
  isLocked: false,
  instructor: 'GrowthGround Staff',
  rating: 5,
  studentsEnrolled: 0,
  prerequisites: ['the-digital-landscape'],
  learningOutcomes: [
    "Understand and use the Git workflow for version control.",
    "Navigate and perform basic tasks using the command line.",
    "Identify the key components and benefits of an IDE.",
    "Manage project dependencies using a package manager like npm.",
    "Implement linters and formatters to maintain code quality.",
    "Grasp the importance and types of automated testing."
  ],
  lessons: [
    {
      id: 'version-control-with-git',
      title: 'Version Control with Git',
      duration: 10,
      coreConcepts: ['Git', 'Repository', 'Commit', 'Branch', 'Pull Request', 'Merge'],
      analogy: 'Git is Google Docs for code, but with superpowers.',
      content: {
        hook: "What if a new feature breaks your entire app? How do you go back to the version that worked? How do multiple developers work on the same code at once without chaos? The answer is Git, the single most important safety net in modern software development.",
        coreExplanation: [
          "Forget complex code. Think of Git as Google Docs for code, but with superpowers.",
          "Your entire codebase is stored in a Repository (Repo), which is like a main project folder hosted on a service like GitHub or GitLab. When a developer makes a change, they don't just \"save\". They take a snapshot of the changes called a Commit. Each commit has a unique ID and a message describing what was changed (e.g., \"Added a new login button\"). This creates a detailed, chronological history of your entire project.",
          "The real power comes from Branches. Imagine you want to add a new feature. Instead of working on the main main document, you create a copy, or a \"branch,\" called feature/new-checkout. You can make all your changes on this branch safely, without affecting the live, working version of the app.",
          "Once the feature is complete and tested on its branch, you create a Pull Request (PR). This is like saying, \"Hey team, I'm done with my changes on this branch. Please review them.\" Other developers can look at the code and leave comments. Once everyone agrees it's good, you Merge the branch, combining your new feature into the main main codebase, ready for deployment."
        ],
        strategicInsights: [
          "Risk Mitigation: Git is your ultimate undo button. You can revert to any previous version of your app instantly, which is invaluable when a bug goes live. A clear commit history helps pinpoint exactly where a bug was introduced.",
          "Team Velocity: Git allows your entire development team to work in parallel on different features without overwriting each other's work, dramatically increasing productivity and reducing \"merge conflicts.\"",
          "Code Quality & Onboarding: The Pull Request process is a powerful quality assurance and knowledge-sharing tool. It ensures multiple sets of eyes have reviewed code and helps new developers learn the codebase by seeing how others work."
        ],
        talkingToDevs: [
          "\"Do we have a clear branching strategy? How do we name our branches to stay organized?\"",
          "\"What is our policy for reviewing pull requests? How many approvals are needed before a merge?\"",
          "\"Could you show me the GitHub history for the last major feature? I'd like to understand the steps it took to build.\""
        ],
        interactiveElementBrief: "Create a 'Visual Git Simulator.' Users see a simple graph representing the main branch. They can click buttons like \"Create Branch,\" \"Make a Commit,\" and \"Merge Branch.\" Each action visually updates the graph, showing how branches diverge and merge, helping them understand the workflow."
      }
    },
    {
      id: 'the-command-line',
      title: 'The Command Line',
      duration: 10,
      coreConcepts: ['CLI', 'Commands', 'Scripts', 'Automation', 'Server Management'],
      analogy: "The command line is a pilot's cockpit, offering ultimate power and control over the computer's systems.",
      content: {
        hook: "Ever seen a developer staring at a black screen with flashing text and wondered what they were doing? That's the command line, and while it looks intimidating, it's the powerful, universal language for controlling computers and servers.",
        coreExplanation: [
          "Think of the Command Line Interface (CLI) as a pilot's cockpit. A passenger interacts with a simple, graphical interface (the seatback screen). It's easy but limited. The pilot uses a complex cockpit with direct access to all the plane's systems. It requires training, but it offers ultimate power and control.",
          "The command line is the same. Instead of clicking on folders and icons, developers type text commands to perform actions. For example, cd my-project to 'change directory' into a folder, or npm install to install a new piece of software.",
          "Why use this? Speed, power, and automation. Developers can chain commands together to perform complex sequences of tasks. They can write Scripts—short programs that automate repetitive work, like running tests or deploying a new version of the app to a server. Most importantly, nearly all web servers are managed exclusively through the command line, making it an essential skill."
        ],
        strategicInsights: [
          "Understanding Automation: Many critical development processes, like testing and deployment, are run via command-line scripts. This is the heart of your team's efficiency.",
          "Server Management: When your team talks about \"SSH-ing into the server,\" they are using the command line to securely log in and manage your production environment.",
          "Demystifying \"The Black Screen\": Simply knowing that the command line is a text-based way to control a computer demystifies a huge part of the development process you might see."
        ],
        talkingToDevs: [
          "\"What are the key command-line scripts we use to automate our build and deployment processes?\"",
          "\"Can you explain the automated script you use to run our test suite?\"",
          "\"Is there a way we can simplify or speed up a common task you perform on the command line?\""
        ],
        interactiveElementBrief: "Create a 'Sandboxed Terminal.' It's a fake, safe command-line window showing a simple file structure. A tutorial guides the user to type basic commands like ls (list files), pwd (show current location), and cd (change directory) to navigate the folders, getting a feel for the environment without any risk."
      }
    },
    {
      id: 'intro-to-ides',
      title: 'Intro to IDEs',
      duration: 10,
      coreConcepts: ['IDE', 'Code Editor', 'Debugger', 'Extensions', 'VS Code'],
      analogy: "An IDE is like a chef's professional kitchen, with every tool integrated and within arm's reach.",
      content: {
        hook: "Where does a developer actually write code? They don't use Microsoft Word or Google Docs. They use a specialized tool called an IDE, a digital workshop that brings all their essential tools together.",
        coreExplanation: [
          "An IDE (Integrated Development Environment) is like a chef's professional kitchen. A home cook might have a knife, a cutting board, and a pan. A professional chef has a fully integrated station with ovens, refrigerators, spice racks, and every tool within arm's reach, all designed to work together.",
          "An IDE is a software application that combines many of the tools a developer needs into one place. At its core is a Code Editor with \"syntax highlighting\" that colors the code to make it readable. But it also integrates:",
          "The File Explorer: To navigate the project structure.",
          "A Terminal: The built-in command line.",
          "Git Integration: Visual tools to see branches and commit changes.",
          "A Debugger: A powerful tool to pause the code line-by-line to find and squash bugs.",
          "Extensions: A marketplace of mini-apps to add new features, like Linters and Formatters (more on those soon!)."
        ],
        strategicInsights: [
          "Productivity Tools: An IDE is a force multiplier for developer productivity. A well-configured IDE helps developers write better code, faster.",
          "Debugging: IDEs have powerful built-in debuggers that are essential for finding and fixing complex bugs, a process that directly impacts your timeline and product stability.",
          "Standardization: Knowing your team has standardized on an IDE (like VS Code, the most popular choice) means they can easily share configurations and extensions, making onboarding new developers easier."
        ],
        talkingToDevs: [
          "\"Which IDE does our team primarily use, and why did we choose it?\"",
          "\"Are there any key extensions or configurations you'd recommend for a new developer joining our team?\"",
          "\"Could you show me how you use the debugger in your IDE to solve a problem?\""
        ],
        interactiveElementBrief: "The goal is an 'IDE Scavenger Hunt.' Users are shown an image or interactive mock-up of a popular IDE like VS Code. A series of prompts will appear, asking them to click on different parts of the interface: \"Click on the File Explorer,\" \"Click on the Code Editor,\" \"Click on the integrated Terminal.\""
      }
    },
    {
      id: 'package-managers-npm-yarn',
      title: 'Package Managers (NPM & Yarn)',
      duration: 10,
      coreConcepts: ['Package Manager', 'npm', 'Yarn', 'Dependencies', 'package.json'],
      analogy: "A Package Manager is like the App Store for your code.",
      content: {
        hook: "How does your app get that cool charting library or the software needed to connect to your database? Developers don't write everything from scratch; they use a Package Manager to safely install code from a global library.",
        coreExplanation: [
          "Think of a Package Manager like the App Store for your code. If you need a calculator on your phone, you don't build one; you go to the App Store and download a trusted, pre-built one.",
          "In software, these pre-built pieces of code are called packages or dependencies. They are open-source tools created by other developers and shared publicly. For the JavaScript ecosystem, the \"App Store\" is called the npm registry, a massive online database of packages.",
          "Tools like npm (Node Package Manager) or Yarn are the clients—the App Store app on your phone—that allow developers to easily install, update, and manage these dependencies. They read a file in your project called package.json, which is a list of all the \"apps\" your project needs to run. With one command (npm install), the package manager automatically downloads all the correct versions of every dependency."
        ],
        strategicInsights: [
          "Understanding Dependencies: Your app is not just the code your team writes; it's also built on dozens or hundreds of open-source packages. This is a huge leverage point but also introduces risk.",
          "Security & Maintenance: Packages can have security vulnerabilities or become outdated. Regularly updating dependencies is a critical maintenance task for your team.",
          "Licensing: Every package comes with a license (e.g., MIT, GPL). Understanding these licenses is important to ensure your commercial product is in legal compliance."
        ],
        talkingToDevs: [
          "\"Could you show me our package.json file? I'd like to understand our project's key dependencies.\"",
          "\"What is our process for vetting and updating our packages to protect against security vulnerabilities?\"",
          "\"Are there any dependencies that are no longer maintained or might pose a risk in the future?\""
        ],
        interactiveElementBrief: "A simple simulation. The user sees a package.json file with a \"dependencies\" list. They can click an \"Add Package\" button, type in a fake package name like \"charting-library,\" and see the file automatically update, mimicking how a developer adds a new dependency."
      }
    },
    {
      id: 'linters-formatters-eslint-prettier',
      title: 'Linters & Formatters (ESLint & Prettier)',
      duration: 10,
      coreConcepts: ['Linter', 'Formatter', 'ESLint', 'Prettier', 'Code Quality'],
      analogy: "Linters and Formatters act as a tireless style guide and proofreader for your codebase.",
      content: {
        hook: "How do you ensure every developer on your team writes code that looks and feels the same, preventing small, silly mistakes from becoming big bugs? Automated tools called Linters and Formatters act as a tireless style guide and proofreader for your codebase.",
        coreExplanation: [
          "Imagine your company has a strict style guide for all public documents: always use a specific font, specific margins, and specific grammar rules. A Formatter (like Prettier) is like an auto-format tool that instantly rewrites the document to match the visual style guide (e.g., spacing, line breaks, indentation). A Linter (like ESLint) is like a powerful spell-checker and grammar tool. It reads the document and flags potential problems: \"This sentence is a run-on,\" or \"This word is deprecated and shouldn't be used.\"",
          "In code, this is crucial. Prettier ensures all code written by any developer is formatted identically upon saving, eliminating arguments about style. ESLint analyzes the code for potential problems that aren't technically errors but are common sources of bugs, like using a variable that hasn't been defined yet. These tools run automatically in the developer's IDE, providing instant feedback."
        ],
        strategicInsights: [
          "Increased Code Quality: Linters catch a significant number of bugs before the code is ever committed, saving time and improving stability.",
          "Faster Onboarding: New developers can get up to speed faster because the linter and formatter guide them to write code that matches the team's established standards.",
          "More Efficient Code Reviews: When code is automatically formatted, developers can focus on the logic of a Pull Request, not on trivial comments about spacing or style."
        ],
        talkingToDevs: [
          "\"Are we using a linter and formatter on this project? Are the rules committed to our repository?\"",
          "\"Could you walk me through some of the key linting rules we've enabled to protect our code quality?\"",
          "\"How are these tools integrated into our workflow? Do they run automatically before a commit?\""
        ],
        interactiveElementBrief: "A 'Code Formatter' simulation. The user sees two boxes of poorly formatted code side-by-side. When they click the \"Format Code\" button, one of the boxes instantly snaps into a clean, perfectly formatted state, visually demonstrating the power of a tool like Prettier."
      }
    },
    {
      id: 'the-role-of-testing',
      title: 'The Role of Testing',
      duration: 10,
      coreConcepts: ['Unit Tests', 'Integration Tests', 'Test Suite', 'Code Coverage'],
      analogy: "Writing tests is like having a safety net for your code, catching bugs before they reach users.",
      content: {
        hook: "How can you be confident that a new feature didn't secretly break your user login page? You can't manually test every part of your app every time. This is why professional teams write automated tests to act as a safety net.",
        coreExplanation: [
          "Writing tests is the process of writing code that checks if your main application code is working as expected. Think of it like a factory assembly line.",
          "Unit Tests are like checking individual components. Does this screw fit this hole? Does this plastic part meet the quality standard? In code, a unit test checks a tiny, isolated piece of logic: if you give the add(2, 2) function two numbers, does it return 4? These tests are fast and numerous.",
          "Integration Tests are like checking how components work together. If you attach the wheel assembly to the axle, does it spin correctly? In code, an integration test checks if several parts of your app work together: if a user clicks the \"Add to Cart\" button (frontend), does the backend correctly update the shopping cart in the database?",
          "The collection of all these tests is called a Test Suite. Developers run this suite automatically before merging new code. If any test fails, the merge is blocked, preventing the bug from ever reaching users."
        ],
        strategicInsights: [
          "Confidence & Speed: A good test suite allows your team to develop new features and refactor old code with confidence, knowing that if they break something, the tests will catch it. This actually increases development speed in the long run.",
          "Living Documentation: Well-written tests act as a documentation, describing exactly what a piece of code is supposed to do.",
          "Reduced Manual QA: While not a replacement for all manual testing, a strong automated test suite dramatically reduces the time and cost required for manual Quality Assurance (QA)."
        ],
        talkingToDevs: [
          "\"What is our code coverage? What are the most critical parts of the app that need better test coverage?\"",
          "\"How long does it take to run our full test suite? Is it part of our automated CI/CD pipeline?\"",
          "\"Could you show me an example of a unit test and an integration test for our codebase?\""
        ],
        interactiveElementBrief: "A 'Test Runner' simulation. The user sees a list of features with green checkmarks. They click a button labeled \"Add New Buggy Code.\" One of the checkmarks turns into a red 'X' and a \"TEST FAILED\" message appears, simulating how an automated test suite catches regressions."
      }
    }
  ]
};
