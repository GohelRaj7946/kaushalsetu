// Mock Data Generator for SIH Jury Fail-Safe Mode

function getFallbackGapAnalysis({ name, targetField, currentSkills, experienceLevel }) {
  const skillsArray = Array.isArray(currentSkills) ? currentSkills : (currentSkills ? currentSkills.split(',').map(s => s.trim()) : []);
  const hasAdvanced = skillsArray.length >= 4;
  const matchScore = hasAdvanced ? 82 : 44;
  const isHighMatch = matchScore >= 75;

  return {
    candidateName: name || 'Candidate',
    targetField: targetField || 'Full Stack Web Development',
    overallMatchScore: matchScore,
    industryDemandLevel: 'Surging (94% Hiring Surge in Q3 2026)',
    readinessStatus: isHighMatch ? 'High Skill Match' : 'Skill Gap Identified',
    branchingTrigger: isHighMatch ? 'high_skill_match' : 'low_skill_gap',
    summary: isHighMatch
      ? `Candidate demonstrates strong foundational and architectural competencies aligned with 2026 industry demand for ${targetField}. Immediate placement readiness is high.`
      : `Candidate has foundational programming basics, but lacks modern production frameworks, cloud-native deployments, and distributed systems required for top-tier ${targetField} roles.`,
    strengths: skillsArray.length ? skillsArray.slice(0, 3) : ['Core Programming Logic', 'Problem Solving Mindset'],
    criticalGaps: ['Microservices & Scalable APIs', 'Cloud Deployment & CI/CD', 'Automated Testing & Containerization'],
    heatmap: [
      {
        categoryName: 'Core Technologies',
        skills: [
          { name: 'JavaScript (ES6+) / TypeScript', demandPercentage: 96, userProficiencyPercentage: skillsArray.some(s => /javascript|ts|js/i.test(s)) ? 85 : 35, status: skillsArray.some(s => /javascript|ts|js/i.test(s)) ? 'Mastered' : 'Needs Practice', marketTrend: 'Surging', heatLevel: 'high' },
          { name: 'Data Structures & Algorithms', demandPercentage: 92, userProficiencyPercentage: 65, status: 'Needs Practice', marketTrend: 'High Demand', heatLevel: 'high' },
          { name: 'Asynchronous Programming & Event Loop', demandPercentage: 90, userProficiencyPercentage: 50, status: 'Needs Practice', marketTrend: 'Surging', heatLevel: 'medium' }
        ]
      },
      {
        categoryName: 'Advanced Frameworks & Architecture',
        skills: [
          { name: 'React.js / Next.js SSR', demandPercentage: 95, userProficiencyPercentage: skillsArray.some(s => /react|next/i.test(s)) ? 88 : 25, status: skillsArray.some(s => /react|next/i.test(s)) ? 'Mastered' : 'Critical Gap', marketTrend: 'Surging', heatLevel: 'critical-gap' },
          { name: 'Node.js & Express REST/GraphQL APIs', demandPercentage: 94, userProficiencyPercentage: skillsArray.some(s => /node|express/i.test(s)) ? 80 : 30, status: skillsArray.some(s => /node|express/i.test(s)) ? 'Mastered' : 'Critical Gap', marketTrend: 'High Demand', heatLevel: 'critical-gap' },
          { name: 'State Management (Redux Toolkit / Zustand)', demandPercentage: 88, userProficiencyPercentage: 20, status: 'Critical Gap', marketTrend: 'High Demand', heatLevel: 'critical-gap' }
        ]
      },
      {
        categoryName: 'Databases & Storage',
        skills: [
          { name: 'PostgreSQL & Prisma ORM', demandPercentage: 92, userProficiencyPercentage: 40, status: 'Critical Gap', marketTrend: 'Surging', heatLevel: 'critical-gap' },
          { name: 'MongoDB & Mongoose Schemas', demandPercentage: 86, userProficiencyPercentage: 70, status: 'Needs Practice', marketTrend: 'Stable', heatLevel: 'medium' },
          { name: 'Redis Caching & Session Management', demandPercentage: 89, userProficiencyPercentage: 15, status: 'Critical Gap', marketTrend: 'Surging', heatLevel: 'critical-gap' }
        ]
      },
      {
        categoryName: 'Cloud, DevOps & Tooling',
        skills: [
          { name: 'Docker Containerization', demandPercentage: 93, userProficiencyPercentage: 20, status: 'Critical Gap', marketTrend: 'Surging', heatLevel: 'critical-gap' },
          { name: 'GitHub Actions & CI/CD Pipelines', demandPercentage: 89, userProficiencyPercentage: 30, status: 'Critical Gap', marketTrend: 'High Demand', heatLevel: 'critical-gap' },
          { name: 'AWS / Cloud Deployment (EC2, S3)', demandPercentage: 91, userProficiencyPercentage: 25, status: 'Critical Gap', marketTrend: 'Surging', heatLevel: 'critical-gap' }
        ]
      },
      {
        categoryName: 'Engineering Practices & Soft Skills',
        skills: [
          { name: 'System Design & Scalability', demandPercentage: 94, userProficiencyPercentage: 35, status: 'Critical Gap', marketTrend: 'Surging', heatLevel: 'critical-gap' },
          { name: 'Git Team Collaboration & PR Review', demandPercentage: 90, userProficiencyPercentage: 75, status: 'Mastered', marketTrend: 'Stable', heatLevel: 'high' },
          { name: 'Technical Articulation & Problem Deconstruction', demandPercentage: 88, userProficiencyPercentage: 70, status: 'Mastered', marketTrend: 'High Demand', heatLevel: 'high' }
        ]
      }
    ]
  };
}

function getFallbackRoadmap({ targetField }) {
  return {
    domain: targetField || 'Full Stack Web Development',
    estimatedWeeks: 8,
    recommendedDailyHours: 3,
    modules: [
      {
        moduleId: 1,
        title: 'Module 1: Advanced Full-Stack Architecture & TypeScript Core',
        description: 'Bridge core type-safety and architectural gaps using TypeScript, modern ESNext patterns, and clean modular backend structures.',
        durationWeeks: '2 Weeks',
        difficulty: 'Intermediate',
        coreTopics: ['TypeScript Generics & Interfaces', 'Clean Architecture in Node.js', 'REST API Contract Design', 'Error Handling Middlewares'],
        youtubeCourses: [
          {
            title: 'TypeScript Full Course 2025 - Beginner to Advanced Playlist',
            channel: 'freeCodeCamp.org',
            rating: 4.5,
            duration: '4h 15m',
            totalLectures: 14,
            url: 'https://www.youtube.com/results?search_query=freeCodeCamp+TypeScript+course+playlist',
            thumbnailTopic: 'TypeScript Architecture'
          },
          {
            title: 'Node.js & Express Production Backend Complete Playlist',
            channel: 'Traversy Media',
            rating: 4.4,
            duration: '3h 40m',
            totalLectures: 12,
            url: 'https://www.youtube.com/results?search_query=Traversy+Media+Node.js+Express+crash+course+playlist',
            thumbnailTopic: 'Node.js Express'
          }
        ],
        githubProjects: [
          {
            title: 'Enterprise API Gateway & Auth Microservice',
            description: 'A production-ready TypeScript Express backend with JWT refresh tokens, role-based access control (RBAC), and Winston structured logging.',
            keyFeatures: ['JWT Authentication with Cookie Rotation', 'Zod Schema Validation', 'Dockerized Postgres with Prisma'],
            techStack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL'],
            repoIdea: 'kaushalsetu-api-gateway'
          }
        ],
        leetCodePractice: {
          topic: 'Array Hashing, HashMaps & Two Pointers',
          targetCount: 10,
          difficulty: 'Easy/Medium',
          problems: [
            { title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' },
            { title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy' },
            { title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium' },
            { title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium' },
            { title: 'Valid Sudoku', url: 'https://leetcode.com/problems/valid-sudoku/', difficulty: 'Medium' },
            { title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' }
          ]
        },
        totalLecturesTarget: 26,
        totalQuestionsTarget: 10
      },
      {
        moduleId: 2,
        title: 'Module 2: High-Performance Frontend & State Management',
        description: 'Build enterprise-grade single page applications with React, Next.js App Router, Tailwind CSS, and optimized global state.',
        durationWeeks: '2 Weeks',
        difficulty: 'Intermediate',
        coreTopics: ['Next.js 15 Server Components', 'Zustand & TanStack Query', 'Optimistic UI Updates', 'Responsive Glassmorphism Styling'],
        youtubeCourses: [
          {
            title: 'Next.js 15 Complete Masterclass Playlist (App Router)',
            channel: 'Chai aur Code',
            rating: 4.5,
            duration: '5h 10m',
            totalLectures: 18,
            url: 'https://www.youtube.com/results?search_query=Chai+aur+Code+Next.js+full+course+playlist',
            thumbnailTopic: 'Next.js App Router'
          },
          {
            title: 'React State Management (Zustand & Redux Toolkit) Course Series',
            channel: 'Dave Gray',
            rating: 4.3,
            duration: '2h 50m',
            totalLectures: 10,
            url: 'https://www.youtube.com/results?search_query=Dave+Gray+React+State+Management+playlist',
            thumbnailTopic: 'Modern React State'
          }
        ],
        githubProjects: [
          {
            title: 'Real-time Collaborative Whiteboard & Kanban',
            description: 'Interactive real-time productivity workspace with live multi-user cursors, optimistic state sync, and drag-and-drop mechanics.',
            keyFeatures: ['Live WebSockets via Socket.io', 'Zustand persistent local storage', 'Tailwind CSS Dark Mode'],
            techStack: ['React', 'Next.js', 'Socket.io', 'Tailwind CSS'],
            repoIdea: 'collab-canvas-hub'
          }
        ],
        leetCodePractice: {
          topic: 'Sliding Window & Fast/Slow Pointers',
          targetCount: 8,
          difficulty: 'Medium',
          problems: [
            { title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy' },
            { title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
            { title: 'Longest Repeating Character Replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium' },
            { title: 'Permutation in String', url: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium' },
            { title: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard' }
          ]
        },
        totalLecturesTarget: 28,
        totalQuestionsTarget: 8
      },
      {
        moduleId: 3,
        title: 'Module 3: Database Optimization, Caching & Relational Modeling',
        description: 'Master relational SQL indexing, ACID transactions, Prisma ORM migrations, and sub-millisecond Redis distributed caching.',
        durationWeeks: '2 Weeks',
        difficulty: 'Advanced',
        coreTopics: ['PostgreSQL Indexing & Explain Analyze', 'Prisma ORM Relations', 'Redis Cache-Aside Pattern', 'Database Connection Pooling'],
        youtubeCourses: [
          {
            title: 'PostgreSQL Deep Dive for Software Engineers Series',
            channel: 'Hussein Nasser',
            rating: 4.5,
            duration: '3h 30m',
            totalLectures: 12,
            url: 'https://www.youtube.com/results?search_query=Hussein+Nasser+PostgreSQL+database+course+playlist',
            thumbnailTopic: 'PostgreSQL Database'
          },
          {
            title: 'Redis Caching & Scalability Playlist',
            channel: 'Web Dev Simplified',
            rating: 4.4,
            duration: '2h 15m',
            totalLectures: 8,
            url: 'https://www.youtube.com/results?search_query=web+dev+simplified+redis+crash+course+playlist',
            thumbnailTopic: 'Redis Caching'
          }
        ],
        githubProjects: [
          {
            title: 'High-Throughput E-Commerce Flash Sale Engine',
            description: 'Scalable backend with distributed locking using Redis Redlock, preventing race conditions during ultra-high traffic flash checkouts.',
            keyFeatures: ['Redis distributed locks', 'Idempotent payment webhooks', 'PostgreSQL database transactions'],
            techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
            repoIdea: 'flash-sale-concurrency-engine'
          }
        ],
        leetCodePractice: {
          topic: 'Stacks, Monotonic Queues & Heaps',
          targetCount: 8,
          difficulty: 'Medium',
          problems: [
            { title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy' },
            { title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium' },
            { title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium' },
            { title: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium' },
            { title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium' },
            { title: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard' }
          ]
        },
        totalLecturesTarget: 20,
        totalQuestionsTarget: 8
      },
      {
        moduleId: 4,
        title: 'Module 4: DevOps, Docker, CI/CD & Cloud Deployment',
        description: 'Package microservices into lightweight Docker containers, set up automated GitHub Actions CI/CD pipelines, and deploy on cloud infrastructure.',
        durationWeeks: '2 Weeks',
        difficulty: 'Advanced',
        coreTopics: ['Multi-stage Docker Builds', 'GitHub Actions Test & Deploy Pipeline', 'Nginx Reverse Proxy & SSL', 'AWS EC2 / Cloud Monitoring'],
        youtubeCourses: [
          {
            title: 'Docker & Kubernetes Full Masterclass Series',
            channel: 'TechWorld with Nana',
            rating: 4.5,
            duration: '4h 45m',
            totalLectures: 16,
            url: 'https://www.youtube.com/results?search_query=TechWorld+with+Nana+Docker+Kubernetes+course+playlist',
            thumbnailTopic: 'Docker & Containers'
          },
          {
            title: 'Complete DevOps & GitHub Actions Playlist',
            channel: 'Kunal Kushwaha',
            rating: 4.4,
            duration: '2h 30m',
            totalLectures: 8,
            url: 'https://www.youtube.com/results?search_query=Kunal+Kushwaha+DevOps+bootcamp+playlist',
            thumbnailTopic: 'DevOps & CI/CD'
          }
        ],
        githubProjects: [
          {
            title: 'Full-Stack Automated Deployment Pipeline',
            description: 'End-to-end repository equipped with automated linting, unit test runners, Docker container builder, and automated zero-downtime deployment triggers.',
            keyFeatures: ['Multi-stage Dockerfile optimization', 'Automated PR preview environments', 'Health check monitoring'],
            techStack: ['Docker', 'GitHub Actions', 'AWS / Render', 'Nginx'],
            repoIdea: 'devops-cicd-pipeline-blueprint'
          }
        ],
        leetCodePractice: {
          topic: 'Graphs, Trees, BFS/DFS & System Design Primer',
          targetCount: 10,
          difficulty: 'Medium/Hard',
          problems: [
            { title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy' },
            { title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy' },
            { title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' },
            { title: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium' },
            { title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium' },
            { title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium' }
          ]
        },
        totalLecturesTarget: 24,
        totalQuestionsTarget: 10
      }
    ]
  };
}

function getFallbackPostCompletionData({ targetField }) {
  return {
    hackathonsAndSummits: {
      hackathons: [
        {
          id: 'sih-2025',
          title: 'Smart India Hackathon (SIH 2025/2026)',
          organizer: 'Ministry of Education Innovation Cell & AICTE',
          prizePool: '₹1,00,000 / Problem Statement',
          deadline: 'October 30, 2026',
          mode: 'Nationwide Hybrid',
          tags: ['Govt of India', 'National Flagship', 'Ministry Level'],
          link: 'https://www.sih.gov.in/'
        },
        {
          id: 'gsc-2026',
          title: 'Google Solution Challenge 2026',
          organizer: 'Google Developer Student Clubs',
          prizePool: '$10,000 + Google Mentorship',
          deadline: 'November 15, 2026',
          mode: 'Online Global',
          tags: ['Google Global', 'UN SDGs', 'Mentorship'],
          link: 'https://developers.google.com/community/gdsc-solution-challenge'
        },
        {
          id: 'unstop-national',
          title: 'Unstop National Tech Grand Challenge',
          organizer: 'Unstop & Fortune 500 Partners',
          prizePool: '₹5,00,000 + Pre-Placement Interviews (PPI)',
          deadline: 'December 05, 2026',
          mode: 'Online / Final Round Bengaluru',
          tags: ['Direct PPI', 'Top Tech Brands', 'Flagship'],
          link: 'https://unstop.com/'
        }
      ],
      bootcamps: [
        {
          id: 'bootcamp-1',
          title: 'Scaler Academy: Advanced System Design & Scalability',
          mentor: 'Ex-Staff Engineer @ Google & Uber',
          duration: '3 Intensive Weekends',
          status: 'Direct Admission Open',
          focus: 'Distributed Caching, Sharding, Kafka Streaming',
          registerUrl: 'https://www.scaler.com/'
        },
        {
          id: 'bootcamp-2',
          title: 'Coursera: Generative AI & Full-Stack Cloud Specialization',
          mentor: 'DeepLearning.AI & AWS Instructors',
          duration: '4 Weeks Hands-on',
          status: 'Direct Admission Open',
          focus: 'Gemini API, RAG Pipelines, Tool Calling Agents',
          registerUrl: 'https://www.coursera.org/specializations/generative-ai-engineering'
        },
        {
          id: 'bootcamp-3',
          title: 'Unstop Technology Fellowship & Coding Bootcamp',
          mentor: 'Top Engineering Leads & Mentors',
          duration: '2 Weeks Masterclass',
          status: 'Direct Admission Open',
          focus: 'DSA Masterclass & Mock Technical Interviews',
          registerUrl: 'https://unstop.com/bootcamps'
        }
      ],
      summits: [
        {
          id: 'summit-1',
          title: 'AICTE National Industry-Academia Conclave 2026',
          organizer: 'AICTE & Ministry of Skill Development',
          date: 'Nov 18, 2026',
          mode: 'Bharat Mandapam, New Delhi & Live Stream',
          perk: 'Official Delegate Pass Unlocked'
        },
        {
          id: 'summit-2',
          title: 'AWS Community Day India 2026',
          organizer: 'AWS User Group India',
          date: 'Dec 02, 2026',
          mode: 'Hybrid (Bengaluru / Virtual)',
          perk: 'Direct Networking with Hiring Managers'
        }
      ]
    },
    internships: [
      {
        id: 'int-01',
        company: 'Razorpay Technologies',
        logoInitials: 'RZP',
        role: 'Full Stack Software Engineer Intern',
        stipend: '₹45,000 / month',
        location: 'Bengaluru (Hybrid)',
        duration: '6 Months',
        requiredSkills: ['Node.js', 'TypeScript', 'React.js', 'PostgreSQL', 'Docker'],
        matchScore: 98,
        openings: 4,
        deadline: 'Closing in 5 days',
        description: 'Work alongside payment gateway infrastructure teams building fault-tolerant transactional microservices.'
      },
      {
        id: 'int-02',
        company: 'Zerodha Broking Ltd',
        logoInitials: 'ZRD',
        role: 'Backend & Systems Engineering Intern',
        stipend: '₹50,000 / month',
        location: 'Remote (India)',
        duration: '6 Months',
        requiredSkills: ['Node.js/Go', 'PostgreSQL', 'Redis', 'Clean Architecture'],
        matchScore: 95,
        openings: 2,
        deadline: 'Closing in 3 days',
        description: 'Build ultra low-latency order execution sub-systems and real-time streaming market data websockets.'
      },
      {
        id: 'int-03',
        company: 'Swiggy Tech',
        logoInitials: 'SWG',
        role: 'Frontend & Platform Intern',
        stipend: '₹40,000 / month',
        location: 'Remote / Bengaluru',
        duration: '4 Months',
        requiredSkills: ['React.js', 'Next.js', 'State Management', 'Tailwind CSS'],
        matchScore: 94,
        openings: 5,
        deadline: 'Closing in 6 days',
        description: 'Craft hyper-responsive mobile-first consumer interfaces with instant load times and optimistic UI updates.'
      },
      {
        id: 'int-04',
        company: 'Tata Digital (Tata Neu)',
        logoInitials: 'TAT',
        role: 'Cloud Engineering & DevOps Intern',
        stipend: '₹35,000 / month',
        location: 'Pune / Hybrid',
        duration: '6 Months',
        requiredSkills: ['Docker', 'CI/CD Pipelines', 'AWS', 'Linux Shell'],
        matchScore: 92,
        openings: 3,
        deadline: 'Closing in 8 days',
        description: 'Implement automated deployment pipelines, health check dashboards, and containerized microservices.'
      }
    ],
    linkedinChecklist: [
      { id: 1, task: 'Add target keyword headline tailored to your field: "Aspiring Software Engineer | React, Node.js, TypeScript | KaushalSetu Certified"', category: 'Headline', impact: '+45% Recruiter Search Clicks' },
      { id: 2, task: 'Feature your Capstone GitHub project with live demo link and visual architecture diagram in the Featured section', category: 'Featured Section', impact: 'Direct Proof of Work' },
      { id: 3, task: 'Structure About section highlighting SIH roadmap completion, problem-solving stats (LeetCode), and technical stack', category: 'Summary', impact: 'High ATS Match' },
      { id: 4, task: 'Request skill endorsements for top 5 gap-bridged skills from project peers or mentors', category: 'Skill Endorsements', impact: 'Social Proof' },
      { id: 5, task: 'Craft personalized connection requests to recruiters with concise 3-line pitch on your production projects', category: 'Outreach', impact: '3x Response Rate' }
    ],
    careerTips: [
      'Pin your 2 best full-stack GitHub repositories with clear READMEs, architecture diagrams, and 1-click live demo links.',
      'Quantify your project achievements on your resume (e.g., "Reduced response latency by 40% with Redis cache").',
      'Demonstrate consistency by showcasing your LeetCode problem solving streak and GitHub commit heatmaps.'
    ]
  };
}

function getFallbackLiveJobs({ targetField }) {
  return [
    {
      id: 'job-01',
      company: 'Google India',
      logoInitials: 'GOOG',
      role: 'Associate Cloud Software Engineer',
      package: '₹28 - ₹34 LPA',
      location: 'Bengaluru / Hyderabad (Hybrid)',
      experience: '0 - 1 Years / 2025-2026 Batch',
      type: 'Full-Time',
      skills: ['Python / Go', 'Cloud Architecture', 'Distributed Systems', 'Docker', 'DSA'],
      matchScore: 97,
      openings: 6,
      deadline: 'Apply within 7 days',
      description: 'Design and deploy reliable cloud services, telemetry pipelines, and scalable APIs for Google Cloud enterprise customers.'
    },
    {
      id: 'job-02',
      company: 'Razorpay',
      logoInitials: 'RZP',
      role: 'Software Development Engineer - 1 (SDE-1)',
      package: '₹18 - ₹24 LPA',
      location: 'Bengaluru (In-Office)',
      experience: 'Fresher / 0 - 2 Years',
      type: 'Full-Time',
      skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Microservices'],
      matchScore: 96,
      openings: 4,
      deadline: 'Apply within 5 days',
      description: 'Scale financial checkout rails, optimize SQL and Redis caching layers, and engineer zero-fault payment webhook dispatchers.'
    },
    {
      id: 'job-03',
      company: 'Swiggy',
      logoInitials: 'SWG',
      role: 'Backend Platform Engineer',
      package: '₹16 - ₹22 LPA',
      location: 'Remote / Bengaluru',
      experience: 'Fresher / 0 - 1 Years',
      type: 'Full-Time',
      skills: ['Go / Java / Node.js', 'Kafka', 'PostgreSQL', 'System Design'],
      matchScore: 94,
      openings: 5,
      deadline: 'Apply within 10 days',
      description: 'Architect hyper-scalable food delivery routing engines handling 100k+ concurrent requests during peak dinner slots.'
    },
    {
      id: 'job-04',
      company: 'Zomato & Blinkit',
      logoInitials: 'ZOM',
      role: 'Full Stack Software Engineer',
      package: '₹15 - ₹20 LPA',
      location: 'Gurugram, Haryana',
      experience: '0 - 2 Years',
      type: 'Full-Time',
      skills: ['React.js', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
      matchScore: 93,
      openings: 3,
      deadline: 'Apply within 4 days',
      description: 'Build lightning-fast 10-minute grocery delivery rider dispatch consoles and consumer responsive web storefronts.'
    },
    {
      id: 'job-05',
      company: 'Microsoft',
      logoInitials: 'MSFT',
      role: 'Software Engineer - Developer Platform',
      package: '₹24 - ₹30 LPA',
      location: 'Hyderabad / Noida',
      experience: '0 - 1 Years',
      type: 'Full-Time',
      skills: ['C# / TypeScript', 'Azure Cloud', 'React.js', 'CI/CD Pipelines'],
      matchScore: 95,
      openings: 8,
      deadline: 'Apply within 12 days',
      description: 'Develop next-generation AI developer toolings, GitHub extensions, and cloud-native enterprise SDK integrations.'
    },
    {
      id: 'job-06',
      company: 'TCS Digital',
      logoInitials: 'TCS',
      role: 'Digital Software Engineer (Innovator Cadre)',
      package: '₹9 - ₹12 LPA',
      location: 'Pan-India (Multiple Locations)',
      experience: 'Fresher / Final Year Graduate',
      type: 'Full-Time',
      skills: ['Java / Python', 'Full Stack Development', 'Cloud Fundamentals', 'SQL'],
      matchScore: 91,
      openings: 50,
      deadline: 'National Drive Active',
      description: 'Join the premier R&D and Digital Innovation unit delivering AI, cloud modernization, and fintech transformation.'
    }
  ];
}

function getFallbackResume({ candidateName, email, phone, city, state, github, linkedin, college, branch, targetField, education }) {
  const name = candidateName || 'Candidate';
  const candidateEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@kaushalsetu.gov.in`;
  const candidatePhone = phone || '+91 98765 43210';
  const candidateLocation = (city && state) ? `${city}, ${state}` : (city || state || 'India');
  const candidateGithub = github || `github.com/${name.toLowerCase().replace(/\s+/g, '')}`;
  const candidateLinkedin = linkedin || `linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}`;
  const degreeStr = branch ? `Bachelor of Technology (B.Tech) in ${branch}` : (education || 'Bachelor of Technology in Computer Science & Engineering');
  const institutionStr = college || 'AICTE Approved National Engineering Institution';

  return {
    fullName: name,
    headline: `${targetField || 'Full Stack Software Engineer'} | KaushalSetu Certified`,
    contact: {
      email: candidateEmail,
      phone: candidatePhone,
      location: candidateLocation,
      github: candidateGithub,
      linkedin: candidateLinkedin
    },
    atsScore: 97,
    professionalSummary: `Motivated and industry-aligned ${targetField || 'Software Engineer'} certified via KaushalSetu (Smart India Hackathon Initiative). Proven expertise in architecting scalable backends, responsive modern frontends, and containerized microservices. Demonstrated ability to build production-grade applications with sub-second response times and robust database architectures.`,
    skillsCategorized: {
      'Programming & Core': ['TypeScript', 'JavaScript (ES6+)', 'Python', 'C++', 'Data Structures & Algorithms', 'Object-Oriented Design'],
      'Frontend Development': ['React.js', 'Next.js 15 (App Router)', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'HTML5 / CSS3'],
      'Backend & Databases': ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis In-Memory Cache', 'RESTful APIs'],
      'Cloud & DevOps': ['Docker Containerization', 'GitHub Actions CI/CD', 'AWS (EC2, S3)', 'Nginx', 'Git & Linux Shell']
    },
    projects: [
      {
        title: 'Enterprise Scalable API Gateway & Auth Service',
        techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis'],
        liveUrl: 'https://github.com/kaushalsetu-demo/api-gateway',
        bullets: [
          'Architected an enterprise-grade authentication gateway handling JWT tokens, refresh rotation, and rate-limiting using Redis.',
          'Modeled relational PostgreSQL schemas with Prisma ORM, reducing database query overhead by 32% via indexing.',
          'Configured automated CI/CD pipeline using GitHub Actions and multi-stage Docker builds for zero-downtime deployment.'
        ]
      },
      {
        title: 'Real-Time Collaborative Workspace & Kanban',
        techStack: ['React.js', 'Next.js', 'Socket.io', 'Tailwind CSS', 'Zustand'],
        liveUrl: 'https://github.com/kaushalsetu-demo/collab-hub',
        bullets: [
          'Engineered a real-time collaborative whiteboard enabling concurrent multi-user editing with sub-50ms sync latency via WebSockets.',
          'Implemented client-side optimistic UI state management with Zustand, decreasing perceived latency by 45%.',
          'Designed fully responsive mobile-first UI compliant with modern WCAG 2.1 accessibility standards.'
        ]
      },
      {
        title: 'High-Throughput E-Commerce Flash-Sale Concurrency Engine',
        techStack: ['Node.js', 'Redis Redlock', 'PostgreSQL', 'Docker'],
        liveUrl: 'https://github.com/kaushalsetu-demo/flash-sale-engine',
        bullets: [
          'Developed distributed lock mechanism using Redis Redlock to eradicate race conditions during concurrent high-volume transactions.',
          'Benchmarked throughput with Artillery.io, sustaining 2,500 requests per second with 99.9% consistency.',
          'Structured modular microservice components inside Docker containers connected through isolated bridge networks.'
        ]
      }
    ],
    education: {
      degree: degreeStr,
      institution: institutionStr,
      year: '2022 - 2026',
      cgpa: '8.8 / 10.0'
    },
    certifications: [
      'KaushalSetu Industry Skill Alignment Credential (SIH Flagship)',
      'Meta Certified Front-End Developer Specialization',
      'AWS Certified Cloud Practitioner (Foundational)'
    ]
  };
}

module.exports = {
  getFallbackGapAnalysis,
  getFallbackRoadmap,
  getFallbackPostCompletionData,
  getFallbackLiveJobs,
  getFallbackResume
};
