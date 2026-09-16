// Mock Data Generator for SIH Jury Fail-Safe Mode

const domainBenchmarks = {
  'Full Stack Web Development': [
    {
      categoryName: 'Core Languages & Foundations',
      skills: ['HTML5 & Semantic Web', 'CSS3 & Responsive Design', 'JavaScript (ES6+)', 'TypeScript', 'Data Structures & Algorithms']
    },
    {
      categoryName: 'Frontend Frameworks & UI',
      skills: ['React.js', 'Next.js (App Router)', 'Tailwind CSS']
    },
    {
      categoryName: 'Backend & API Engineering',
      skills: ['Node.js & Express', 'RESTful API Design', 'GraphQL']
    },
    {
      categoryName: 'Databases & Distributed Caching',
      skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis Caching']
    },
    {
      categoryName: 'Cloud, DevOps & System Design',
      skills: ['Docker Containerization', 'Git & GitHub', 'CI/CD (GitHub Actions)', 'AWS (EC2 / S3)', 'System Design & Scalability', 'Unit Testing (Jest)']
    }
  ],
  'AI & Machine Learning Engineering': [
    {
      categoryName: 'Foundations & Mathematical Core',
      skills: ['Python', 'Linear Algebra & Statistics', 'NumPy & Pandas', 'Data Structures & Algorithms']
    },
    {
      categoryName: 'Core Machine Learning & Deep Learning',
      skills: ['Scikit-Learn', 'PyTorch', 'TensorFlow', 'Feature Engineering']
    },
    {
      categoryName: 'Computer Vision & NLP',
      skills: ['Computer Vision (OpenCV)', 'Natural Language Processing (NLP)', 'LLMs & Prompt Engineering']
    },
    {
      categoryName: 'Modern GenAI & Vector Retrieval',
      skills: ['LangChain', 'Hugging Face Transformers', 'Vector Databases (Pinecone/Chroma)']
    },
    {
      categoryName: 'MLOps & Model Production',
      skills: ['MLOps & Model Tracking (MLflow)', 'FastAPI Model Serving', 'Docker Containerization', 'Git & GitHub']
    }
  ],
  'Generative AI & LLM Systems': [
    {
      categoryName: 'Core AI & API Foundations',
      skills: ['Python', 'OpenAI / Gemini APIs', 'Prompt Engineering']
    },
    {
      categoryName: 'Agentic Frameworks & Retrieval',
      skills: ['LangChain', 'LlamaIndex', 'RAG Architecture', 'Vector Databases (Chroma/Pinecone)']
    },
    {
      categoryName: 'Model Fine-Tuning & Open Weights',
      skills: ['Hugging Face Transformers', 'Fine-Tuning (LoRA / QLoRA)', 'Embeddings & Semantic Search']
    },
    {
      categoryName: 'Optimization & Serving',
      skills: ['FastAPI Backend', 'Model Quantization (GGUF/AWQ)', 'Agentic Workflows', 'Docker Containerization', 'Git & GitHub']
    }
  ],
  'Deep Learning & Computer Vision': [
    {
      categoryName: 'Core Frameworks & Tools',
      skills: ['Python', 'PyTorch', 'TensorFlow / Keras', 'OpenCV']
    },
    {
      categoryName: 'Vision Architectures',
      skills: ['Convolutional Neural Networks (CNNs)', 'YOLO Object Detection', 'Image Segmentation (U-Net)', 'Vision Transformers (ViT)']
    },
    {
      categoryName: 'Generative & Hardware Acceleration',
      skills: ['GANs & Diffusion Models', 'CUDA & GPU Acceleration', 'ONNX Model Optimization', 'Transfer Learning', 'Docker Containerization', 'Git & GitHub']
    }
  ],
  'MLOps & Model Deployment': [
    {
      categoryName: 'Core Programming & Infrastructure',
      skills: ['Python', 'Linux Administration', 'Git & GitHub']
    },
    {
      categoryName: 'Containerization & Orchestration',
      skills: ['Docker Containerization', 'Kubernetes (K8s)', 'FastAPI / BentoML']
    },
    {
      categoryName: 'Pipeline & Lifecycle Management',
      skills: ['MLflow', 'Kubeflow Pipelines', 'CI/CD for Machine Learning', 'DVC (Data Version Control)']
    },
    {
      categoryName: 'Cloud & Observability',
      skills: ['AWS SageMaker', 'Prometheus & Grafana', 'Model Monitoring & Drift Detection']
    }
  ],
  'Cloud Architecture & DevOps': [
    {
      categoryName: 'Linux & Networking Basics',
      skills: ['Linux Administration & Bash', 'Networking (TCP/IP, DNS, SSL/TLS)', 'Git & GitHub']
    },
    {
      categoryName: 'Containers & Microservices',
      skills: ['Docker Containerization', 'Kubernetes (K8s)', 'Microservices Architecture', 'Nginx & Reverse Proxies']
    },
    {
      categoryName: 'Infrastructure as Code & Cloud',
      skills: ['AWS Core (EC2, S3, VPC, RDS)', 'Terraform (IaC)', 'Ansible Configuration']
    },
    {
      categoryName: 'CI/CD & Observability',
      skills: ['GitHub Actions CI/CD', 'Jenkins Pipelines', 'Prometheus & Grafana Monitoring']
    }
  ],
  'Cyber Security & Ethical Hacking': [
    {
      categoryName: 'Networking & Systems Security',
      skills: ['Networking Protocols (TCP/IP, DNS)', 'Linux System Administration', 'Python & Bash Scripting']
    },
    {
      categoryName: 'Packet Analysis & Web Defense',
      skills: ['Wireshark & Packet Analysis', 'Burp Suite & Web App Security', 'OWASP Top 10 Vulnerabilities']
    },
    {
      categoryName: 'Offensive Security & Pen-testing',
      skills: ['Penetration Testing (Metasploit)', 'Cryptography & PKI', 'Vulnerability Assessment (Nessus)']
    },
    {
      categoryName: 'Enterprise Defense & Operations',
      skills: ['SIEM & SOC (Splunk / ELK)', 'Firewalls & IDS/IPS', 'Identity & Access Management (IAM)']
    }
  ],
  'Data Engineering & Analytics': [
    {
      categoryName: 'Relational & Analytical SQL',
      skills: ['SQL & Advanced Query Optimization', 'PostgreSQL', 'Pandas & Polars']
    },
    {
      categoryName: 'Big Data & Distributed Computing',
      skills: ['Apache Spark (PySpark)', 'Apache Kafka (Event Streaming)', 'Data Warehousing (Snowflake / BigQuery)']
    },
    {
      categoryName: 'Orchestration & Transformation',
      skills: ['Apache Airflow', 'ETL / ELT Pipeline Design', 'dbt (data build tool)', 'Data Modeling & Star Schema']
    },
    {
      categoryName: 'BI & Cloud Infrastructure',
      skills: ['Python', 'PowerBI / Tableau', 'Docker Containerization', 'AWS S3 & Redshift']
    }
  ],
  'Mobile App Development': [
    {
      categoryName: 'Cross-Platform Frameworks',
      skills: ['Dart & Flutter', 'React Native', 'JavaScript & TypeScript']
    },
    {
      categoryName: 'Native Platforms & UI/UX',
      skills: ['Kotlin (Android)', 'Swift (iOS)', 'Mobile UI/UX Design']
    },
    {
      categoryName: 'State & Backend Integration',
      skills: ['State Management (Riverpod / Redux)', 'Firebase (Auth, Firestore, FCM)', 'RESTful & GraphQL APIs', 'Local Storage (SQLite / Hive)']
    },
    {
      categoryName: 'Deployment & Mobile DevOps',
      skills: ['Push Notifications & Deep Linking', 'App Store & Play Store Deployment', 'Git & GitHub']
    }
  ],
  'Embedded Systems & IoT': [
    {
      categoryName: 'Core Hardware & Microcontrollers',
      skills: ['C / Embedded C', 'C++', 'ARM Cortex Microcontrollers', 'STM32 Ecosystem', 'ESP32 & Arduino']
    },
    {
      categoryName: 'Real-Time OS & Interfacing',
      skills: ['FreeRTOS / Real-Time OS', 'Communication Protocols (UART, SPI, I2C)', 'Circuit Prototyping & Schematics', 'Oscilloscope & Logic Analyzers']
    },
    {
      categoryName: 'Wireless & IoT Protocols',
      skills: ['Wireless Protocols (BLE, Wi-Fi, Zigbee)', 'MQTT & IoT Cloud Protocols', 'Linux Kernel & Device Drivers', 'Git & GitHub']
    }
  ],
  'VLSI & Hardware Architecture': [
    {
      categoryName: 'HDL & Digital Logic',
      skills: ['Verilog HDL', 'SystemVerilog', 'VHDL', 'Digital Electronics & Logic Design', 'CMOS Circuit Design']
    },
    {
      categoryName: 'Verification & Timing Analysis',
      skills: ['FPGA Prototyping (Xilinx Vivado)', 'Static Timing Analysis (STA)', 'RTL Verification & Testbenches']
    },
    {
      categoryName: 'EDA Tools & Architecture',
      skills: ['Cadence Virtuoso / EDA Tools', 'ASIC Design Flow', 'Computer Architecture (RISC-V)', 'Physical Design & Layout']
    }
  ],
  'Robotics & Automation': [
    {
      categoryName: 'Robotic Operating Systems & Control',
      skills: ['ROS / ROS 2 (Robot Operating System)', 'Python', 'C++', 'Control Systems (PID / MPC)']
    },
    {
      categoryName: 'Perception & Simulation',
      skills: ['Computer Vision (OpenCV)', 'Gazebo Simulation', 'Sensors Integration (LiDAR, IMU)']
    },
    {
      categoryName: 'Navigation & Actuation',
      skills: ['Robot Kinematics & Dynamics', 'Path Planning & Navigation (SLAM)', 'Microcontrollers (STM32 / Arduino)', 'Actuators & Motor Drivers', 'Git & GitHub']
    }
  ],
  'Firmware & Microcontroller Engineering': [
    {
      categoryName: 'Bare-Metal & Low-Level Code',
      skills: ['Embedded C', 'C++', 'Bare-Metal Programming', 'ARM Cortex Architecture']
    },
    {
      categoryName: 'RTOS & Peripherals',
      skills: ['FreeRTOS', 'Peripherals & Drivers (DMA, Timer, ADC)', 'I2C / SPI / UART / CAN']
    },
    {
      categoryName: 'Hardware Debugging & Memory',
      skills: ['Custom Bootloader Development', 'Hardware Debugging (JTAG / SWD)', 'Low-Power Firmware Design', 'Memory Management & Flash Programming', 'Git & GitHub']
    }
  ],
  '5G & Wireless Networks': [
    {
      categoryName: 'Wireless Physical & MAC Layer',
      skills: ['Wireless Communication Principles', 'OFDM & Massive MIMO', 'RF Engineering Fundamentals']
    },
    {
      categoryName: '5G Architecture & Core',
      skills: ['5G Core & RAN Architecture', 'Network Protocols (TCP/IP, SCTP)', 'Network Slicing & QoS']
    },
    {
      categoryName: 'Analysis & Software Radio',
      skills: ['Wireshark Protocol Analysis', 'Software Defined Radio (SDR)', 'Open5GS / OpenAirInterface', 'Linux Networking', 'Git & GitHub']
    }
  ],
  'Electric Vehicle (EV) Powertrains': [
    {
      categoryName: 'Powertrain & Motor Drives',
      skills: ['EV Powertrain Architecture', 'Motor Drives (BLDC & PMSM)', 'Power Electronics (Inverters / DC-DC)']
    },
    {
      categoryName: 'BMS & Cell Chemistry',
      skills: ['Battery Management Systems (BMS)', 'Lithium-ion Cell Chemistry & SOC/SOH', 'Thermal Management Systems']
    },
    {
      categoryName: 'Simulation & Safety',
      skills: ['MATLAB & Simulink Modeling', 'CAN Bus Automotive Communication', 'Regenerative Braking Systems', 'High Voltage Safety Standards']
    }
  ],
  'Power Systems & Smart Grids': [
    {
      categoryName: 'Power Analysis & Grid Architecture',
      skills: ['Power System Analysis & Load Flow', 'Smart Grid Architecture', 'Renewable Integration (Solar / Wind)']
    },
    {
      categoryName: 'Protection & Relay Coordination',
      skills: ['High Voltage Engineering', 'Power System Protection & Numerical Relays', 'Power Quality Analysis']
    },
    {
      categoryName: 'Automation & SCADA',
      skills: ['SCADA & Telemetry Systems', 'MATLAB / ETAP Simulation', 'Microgrids & Distributed Generation', 'Substation Automation']
    }
  ],
  'Industrial Automation & PLC': [
    {
      categoryName: 'PLC & HMI Programming',
      skills: ['PLC Programming (Ladder Logic, ST)', 'HMI Interface Design', 'SCADA Systems (Wonderware / WinCC)']
    },
    {
      categoryName: 'Industrial Protocols & Drives',
      skills: ['Industrial Protocols (Modbus, Profinet, EtherCAT)', 'Variable Frequency Drives (VFDs)', 'Industrial Sensors & Transmitters']
    },
    {
      categoryName: 'Safety & Hardware',
      skills: ['Pneumatics & Hydraulics', 'Safety Instrumented Systems (SIS)', 'Panel Wiring & Electrical Drawings', 'Mechatronics Integration']
    }
  ],
  'Robotics & Mechatronics': [
    {
      categoryName: 'Mechatronics & Control',
      skills: ['Mechatronics System Integration', 'Control Systems (PID / MPC)', 'MATLAB / Simulink Control Loops']
    },
    {
      categoryName: 'Embedded & Sensors',
      skills: ['ROS / ROS 2', 'Arduino & Raspberry Pi Embedded Systems', 'Sensor Fusion (IMU, Encoders, Ultrasonic)']
    },
    {
      categoryName: 'CAD & Actuation',
      skills: ['CAD Modeling (SolidWorks / Fusion 360)', 'Actuators & Servo Control', 'C++ & Python Programming', 'PID Speed / Position Tuning']
    }
  ],
  'Automotive Embedded Systems': [
    {
      categoryName: 'Automotive Software Architecture',
      skills: ['Embedded C / C++', 'AUTOSAR Architecture', 'CAN, LIN & FlexRay Protocols']
    },
    {
      categoryName: 'Functional Safety & Standards',
      skills: ['ISO 26262 (Functional Safety)', 'Automotive SPICE (ASPICE)', 'Automotive Cybersecurity']
    },
    {
      categoryName: 'HIL & Diagnostics',
      skills: ['Hardware-in-the-Loop (HIL) Testing', 'Vector CANoe / CANalyzer', 'Automotive Diagnostics (UDS / OBD-II)', 'Microcontrollers (Infineon AURIX / NXP)']
    }
  ],
  'CAD/CAM Digital Manufacturing': [
    {
      categoryName: '3D CAD & Tolerancing',
      skills: ['SolidWorks / CATIA 3D CAD Modeling', 'Geometric Dimensioning & Tolerancing (GD&T)', 'Design for Manufacturing & Assembly (DFM/DFA)']
    },
    {
      categoryName: 'CAM & CNC Machining',
      skills: ['CNC Programming & G-Code / M-Code', 'Mastercam / CAM Toolpath Generation', 'Metrology & CMM Inspection']
    },
    {
      categoryName: 'Advanced Manufacturing & Simulation',
      skills: ['Additive Manufacturing & 3D Printing', 'Finite Element Analysis (ANSYS / FEA)', 'Sheet Metal & Injection Molding Design']
    }
  ],
  'Computational Fluid Dynamics (CFD)': [
    {
      categoryName: 'Fluid Mechanics & Thermodynamics',
      skills: ['Fluid Dynamics & Thermodynamics', 'Heat Transfer Analysis', 'Aerodynamics & External Flow']
    },
    {
      categoryName: 'Solvers & Turbulence',
      skills: ['ANSYS Fluent / CFX', 'OpenFOAM Open-Source CFD', 'Turbulence Modeling (k-epsilon, k-omega)']
    },
    {
      categoryName: 'Meshing & Post-Processing',
      skills: ['Computational Meshing (ICEM / Fluent Meshing)', 'Post-Processing & Data Visualization', 'Multiphase Flow Simulation']
    }
  ],
  'Smart City GIS & Infrastructure': [
    {
      categoryName: 'GIS & Geoprocessing',
      skills: ['Geographic Information Systems (ArcGIS / QGIS)', 'Spatial Data Analysis & Geoprocessing', 'AutoCAD Map 3D']
    },
    {
      categoryName: 'Remote Sensing & Spatial Code',
      skills: ['Remote Sensing & Satellite Image Processing', 'Python for Geospatial (GeoPandas, Shapely)', 'Web GIS (Leaflet / Mapbox)']
    },
    {
      categoryName: 'City Telemetry & Urban Systems',
      skills: ['Urban Infrastructure Planning', 'IoT Smart Sensors & City Telemetry', 'Cartographic Design & Surveying']
    }
  ],
  'Construction Tech & BIM Modeling': [
    {
      categoryName: 'BIM Modeling & Coordination',
      skills: ['Autodesk Revit BIM Modeling', 'Navisworks Clash Detection & 4D Simulation', 'AutoCAD Civil 3D']
    },
    {
      categoryName: 'Project Management & Structures',
      skills: ['Construction Scheduling (Primavera P6)', 'Structural Analysis (STAAD.Pro / ETABS)', 'Quantity Takeoff & Cost Estimation']
    },
    {
      categoryName: 'Sustainable Construction & Surveying',
      skills: ['Green Building Certification (LEED / GRIHA)', 'Drone Surveying & Site Photogrammetry', 'Site Safety & Quality Control']
    }
  ],
  'Environmental Analytics & Monitoring': [
    {
      categoryName: 'Environmental Sensing & GIS',
      skills: ['Environmental Impact Assessment (EIA)', 'Air & Water Quality Sensor Monitoring', 'GIS Spatial Mapping for Environmental Data']
    },
    {
      categoryName: 'Dispersion & Data Analytics',
      skills: ['Environmental Data Science (Python / R)', 'Pollution Dispersion Modeling (AERMOD)', 'Carbon Footprint & Sustainability Metrics']
    },
    {
      categoryName: 'Waste & Treatment Engineering',
      skills: ['Solid & Hazardous Waste Management', 'Water & Wastewater Treatment Design', 'Environmental Regulations & Compliance']
    }
  ]
};

function getFallbackGapAnalysis({ name, targetField, currentSkills, experienceLevel }) {
  const domainKey = targetField || 'Full Stack Web Development';
  const categoriesTemplate = domainBenchmarks[domainKey] || domainBenchmarks['Full Stack Web Development'];

  const userSkills = (Array.isArray(currentSkills) ? currentSkills : (currentSkills ? currentSkills.split(',').map(s => s.trim()) : []))
    .map(s => s.toLowerCase().trim())
    .filter(Boolean);

  let totalSkills = 0;
  let masteredCount = 0;
  const strengths = [];
  const criticalGaps = [];

  const heatmap = categoriesTemplate.map(cat => {
    const skills = cat.skills.map(skillName => {
      totalSkills++;
      const normSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isSelected = userSkills.some(us => {
        const normUser = us.replace(/[^a-z0-9]/g, '');
        return normSkill.includes(normUser) || normUser.includes(normSkill);
      });

      if (isSelected) {
        masteredCount++;
        if (strengths.length < 6) strengths.push(skillName);
        return {
          name: skillName,
          demandPercentage: Math.floor(Math.random() * 8) + 91, // 91-98%
          userProficiencyPercentage: Math.floor(Math.random() * 11) + 85, // 85-95%
          status: 'Mastered',
          marketTrend: 'Surging',
          heatLevel: 'high'
        };
      } else {
        if (criticalGaps.length < 5) criticalGaps.push(skillName);
        return {
          name: skillName,
          demandPercentage: Math.floor(Math.random() * 12) + 85, // 85-96%
          userProficiencyPercentage: Math.floor(Math.random() * 21) + 15, // 15-35%
          status: 'Critical Gap',
          marketTrend: 'High Demand',
          heatLevel: 'critical-gap'
        };
      }
    });

    return {
      categoryName: cat.categoryName,
      skills
    };
  });

  const calculatedScore = totalSkills > 0 ? Math.round((masteredCount / totalSkills) * 100) : 40;
  const matchScore = Math.min(98, Math.max(18, calculatedScore));
  const isHighMatch = matchScore >= 70;

  return {
    candidateName: name || 'Candidate',
    targetField: domainKey,
    overallMatchScore: matchScore,
    industryDemandLevel: 'Surging (94% Hiring Surge in Q3 2026)',
    readinessStatus: isHighMatch ? 'High Skill Match (Placement Ready)' : 'Skill Gap Identified',
    branchingTrigger: isHighMatch ? 'high_skill_match' : 'low_skill_gap',
    summary: isHighMatch
      ? `Candidate demonstrates strong competencies across ${masteredCount} verified benchmark skills for ${domainKey}. Ready for placement interviews and fast-track capstones.`
      : `Candidate demonstrates baseline competence in ${masteredCount} skill(s), but critical gaps remain in ${criticalGaps.slice(0, 3).join(', ')} required by 2026 industry standards.`,
    strengths: strengths.length ? strengths : ['Foundational Problem Solving', 'Engineering Aptitude'],
    criticalGaps: criticalGaps.length ? criticalGaps : ['Production Architecture', 'Distributed Systems'],
    heatmap
  };
}

const { domainRoadmaps } = require('../public/js/domainRoadmaps');
const { getDomainPostCompletionData } = require('../public/js/domainInternships');

function getFallbackRoadmap({ targetField }) {
  const domainKey = targetField || 'Full Stack Web Development';
  const roadmap = domainRoadmaps[domainKey] || domainRoadmaps['Full Stack Web Development'];
  return JSON.parse(JSON.stringify(roadmap));
}

function getFallbackPostCompletionData({ targetField }) {
  const domainKey = targetField || 'Full Stack Web Development';
  const domainData = getDomainPostCompletionData(domainKey);

  return {
    hackathonsAndSummits: domainData.hackathonsAndSummits,
    internships: domainData.internships,
    linkedinChecklist: [
      { id: 1, task: `Add target keyword headline tailored to your field: "Aspiring ${domainKey} Specialist | KaushalSetu Certified"`, category: 'Headline', impact: '+45% Recruiter Search Clicks' },
      { id: 2, task: `Feature your ${domainKey} Capstone project with live demo link and engineering blueprint in the Featured section`, category: 'Featured Section', impact: 'Direct Proof of Work' },
      { id: 3, task: `Structure About section highlighting 100% roadmap completion in ${domainKey} and verified competencies`, category: 'Summary', impact: 'High ATS Match' },
      { id: 4, task: 'Request skill endorsements for top gap-bridged skills from project peers or mentors', category: 'Skill Endorsements', impact: 'Social Proof' },
      { id: 5, task: 'Craft personalized connection requests to recruiters with concise 3-line pitch on your verified production projects', category: 'Outreach', impact: '3x Response Rate' }
    ],
    careerTips: [
      `Pin your best verified ${domainKey} repositories with clear technical specifications and architecture blueprints.`,
      `Quantify domain outcomes on your resume (e.g., "Optimized throughput by 35% using industry standard methodologies").`,
      'Demonstrate technical consistency by showcasing your problem solving streak and design verifications.'
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
