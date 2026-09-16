// KaushalSetu Client Application (Smart India Hackathon Prototype)

const state = {
  candidate: {
    name: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    github: '',
    linkedin: '',
    branch: 'Computer Science & Engineering',
    college: '',
    targetField: 'Full Stack Web Development',
    experienceLevel: 'Pre-Final / Final Year Student',
    currentSkills: []
  },
  assessmentData: null,
  roadmapData: null,
  postCompletionData: null,
  postCompletionDomain: null,
  liveJobs: [],
  resumeData: null,
  activeHeatmapFilter: 'all',
  activeHeatmapCategory: -1,
  lastRenderedDomain: null,
  userProgress: {
    targetLectures: 98,
    completedLectures: 0,
    targetQuestions: 36,
    solvedQuestions: 0,
    moduleProgress: {},
    overallPercentage: 0,
    isUnlocked: false
  },
  appliedJobs: [],
  appliedInternships: [],
  checkedLinkedInTasks: new Set()
};

// Branch to Target Industry Roles Mapping
const branchDomainMap = {
  'Computer Science & Engineering': [
    'Full Stack Web Development',
    'AI & Machine Learning Engineering',
    'Cloud Architecture & DevOps',
    'Cyber Security & Ethical Hacking',
    'Data Engineering & Analytics',
    'Mobile App Development'
  ],
  'Information Technology': [
    'Full Stack Web Development',
    'Cloud Architecture & DevOps',
    'Cyber Security & Ethical Hacking',
    'Data Engineering & Analytics',
    'Mobile App Development'
  ],
  'Artificial Intelligence & Data Science': [
    'AI & Machine Learning Engineering',
    'Generative AI & LLM Systems',
    'Data Engineering & Analytics',
    'Deep Learning & Computer Vision',
    'MLOps & Model Deployment'
  ],
  'Electronics & Communication Engineering': [
    'Embedded Systems & IoT',
    'VLSI & Hardware Architecture',
    'Robotics & Automation',
    'Firmware & Microcontroller Engineering',
    '5G & Wireless Networks'
  ],
  'Electrical & Electronics Engineering': [
    'Electric Vehicle (EV) Powertrains',
    'Power Systems & Smart Grids',
    'Industrial Automation & PLC',
    'Embedded Systems & IoT'
  ],
  'Mechanical & Mechatronics': [
    'Robotics & Mechatronics',
    'Automotive Embedded Systems',
    'CAD/CAM Digital Manufacturing',
    'Computational Fluid Dynamics (CFD)'
  ],
  'Civil / Other Engineering': [
    'Smart City GIS & Infrastructure',
    'Construction Tech & BIM Modeling',
    'Environmental Analytics & Monitoring'
  ]
};

// Comprehensive Domain-Specific Benchmark Topics & Skills for All 24 Industry Roles
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

// Derived flat skill arrays for chip tagging
const domainSkillsMap = {};
for (const domain in domainBenchmarks) {
  domainSkillsMap[domain] = domainBenchmarks[domain].flatMap(cat => cat.skills);
}


document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  handleBranchChange(); // Initialize cascading target domains
  loadSavedCandidate(); // Load from localStorage if available
  fetchPostCompletionData();
  fetchLiveJobs();
});

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Page Switcher between 5 Phases
function showPage(pageId) {
  const pages = ['page-onboarding', 'page-phase1', 'page-phase2', 'page-phase3', 'page-phase4'];
  pages.forEach(pid => {
    const el = document.getElementById(pid);
    if (el) {
      if (pid === pageId) {
        el.classList.add('active-page');
      } else {
        el.classList.remove('active-page');
      }
    }
  });

  state.currentPage = pageId;

  // When switching to Phase 2, ensure courses and roadmap strictly match current branch/targetField
  if (pageId === 'page-phase2') {
    const currentTarget = state.candidate.targetField || 'Full Stack Web Development';
    if (!state.roadmapData || state.roadmapData.domain !== currentTarget) {
      fetchRoadmapData();
    }
  }

  // When switching to Phase 3, ensure internships strictly match current branch/targetField
  if (pageId === 'page-phase3') {
    const currentTarget = state.candidate.targetField || 'Full Stack Web Development';
    if (!state.postCompletionData || state.postCompletionDomain !== currentTarget) {
      fetchPostCompletionData(currentTarget);
    }
  }

  // Update Header Nav Tab Buttons
  const navMap = {
    'page-onboarding': 'nav-btn-onboarding',
    'page-phase1': 'nav-btn-phase1',
    'page-phase2': 'nav-btn-phase2',
    'page-phase3': 'nav-btn-phase3',
    'page-phase4': 'nav-btn-phase4'
  };

  Object.values(navMap).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.className = 'px-3.5 py-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent flex items-center gap-2 transition whitespace-nowrap';
    }
  });

  const activeBtn = document.getElementById(navMap[pageId]);
  if (activeBtn) {
    activeBtn.className = 'px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-2 transition whitespace-nowrap';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  initIcons();
}

// Load saved candidate data if exists
function loadSavedCandidate() {
  const saved = localStorage.getItem('kaushalsetu_candidate');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.name) {
        state.candidate = { ...state.candidate, ...parsed };
        updateHeaderCandidateBadge(parsed.name);
      }
    } catch (e) {
      console.warn('Could not parse saved candidate data');
    }
  }
}

function updateHeaderCandidateBadge(name) {
  const badge = document.getElementById('header-candidate-badge');
  const nameEl = document.getElementById('header-candidate-name');
  if (badge && nameEl && name) {
    badge.classList.remove('hidden');
    nameEl.innerText = name;
  }
}

// Page 0: Handle Candidate Registration Intake
function handleOnboardingSubmit(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('reg-name').value.trim();
  const mobile = document.getElementById('reg-mobile').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const stateVal = document.getElementById('reg-state').value.trim();
  const cityVal = document.getElementById('reg-city').value.trim();
  const github = document.getElementById('reg-github').value.trim();
  const linkedin = document.getElementById('reg-linkedin').value.trim();

  if (!name || !mobile || !email || !stateVal || !cityVal || !github || !linkedin) {
    showToast('Please fill all candidate intake fields!', 'warning');
    return;
  }

  state.candidate = {
    ...state.candidate,
    name,
    mobile,
    email,
    state: stateVal,
    city: cityVal,
    github,
    linkedin
  };

  localStorage.setItem('kaushalsetu_candidate', JSON.stringify(state.candidate));
  updateHeaderCandidateBadge(name);

  // Pre-fill job application modal fields for convenience
  const jobName = document.getElementById('job-apply-name');
  const jobEmail = document.getElementById('job-apply-email');
  if (jobName) jobName.value = name;
  if (jobEmail) jobEmail.value = email;

  showToast(`Welcome, ${name}! Profile registered successfully.`, 'success');
  showPage('page-phase1');
}

// Branch Selection & Cascading Target Domains
function handleBranchChange() {
  const branchSelect = document.getElementById('input-branch');
  const targetSelect = document.getElementById('input-target-field');
  if (!branchSelect || !targetSelect) return;

  const branch = branchSelect.value;
  state.candidate.branch = branch;

  const roles = branchDomainMap[branch] || branchDomainMap['Computer Science & Engineering'];
  targetSelect.innerHTML = '';

  roles.forEach((role, idx) => {
    const opt = document.createElement('option');
    opt.value = role;
    opt.innerText = role;
    if (idx === 0) opt.selected = true;
    targetSelect.appendChild(opt);
  });

  handleTargetFieldChange();
}

function handleTargetFieldChange() {
  const targetSelect = document.getElementById('input-target-field');
  if (!targetSelect) return;

  const targetField = targetSelect.value;
  state.candidate.targetField = targetField;

  // Clear previous skills when target domain changes
  state.candidate.currentSkills = [];
  renderSuggestedChips();
  updateSkillsBadge();
  updateLiveHeatmap();
  fetchRoadmapData();
  fetchPostCompletionData(targetField);
}

function updateSkillsBadge() {
  const badge = document.getElementById('skills-count-badge');
  if (!badge) return;
  const count = (state.candidate.currentSkills || []).length;
  badge.innerText = `${count} selected`;
  if (count > 0) {
    badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
  } else {
    badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700';
  }
}

function selectAllSkills() {
  const targetField = state.candidate.targetField || 'Full Stack Web Development';
  const availableSkills = domainSkillsMap[targetField] || domainSkillsMap['Full Stack Web Development'] || [];
  state.candidate.currentSkills = [...new Set([...state.candidate.currentSkills, ...availableSkills])];
  renderSuggestedChips();
  updateSkillsBadge();
  updateLiveHeatmap();
  showToast(`Selected all ${availableSkills.length} benchmark skills for ${targetField}!`, 'info');
}

function clearAllSkills() {
  state.candidate.currentSkills = [];
  renderSuggestedChips();
  updateSkillsBadge();
  updateLiveHeatmap();
  showToast('Cleared all selected skills.', 'info');
}

// Render Skill Chips (Start UNSELECTED by default)
function renderSuggestedChips() {
  const container = document.getElementById('skills-chip-container');
  if (!container) return;

  const targetField = state.candidate.targetField || 'Full Stack Web Development';
  const availableSkills = domainSkillsMap[targetField] || domainSkillsMap['Full Stack Web Development'] || [];

  container.innerHTML = '';

  // Render all benchmark domain skills
  availableSkills.forEach(skill => {
    const isSelected = state.candidate.currentSkills.includes(skill);
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.onclick = () => toggleSkillChip(skill);
    chip.className = `px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
      isSelected
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10 scale-[1.02]'
        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
    }`;
    chip.innerHTML = `${skill} ${isSelected ? '<span class="text-emerald-400 font-bold">✓</span>' : '<span class="text-slate-500">+</span>'}`;
    container.appendChild(chip);
  });

  // Render any custom added skills that are not in the predefined map
  state.candidate.currentSkills.forEach(customSkill => {
    if (!availableSkills.includes(customSkill)) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.onclick = () => toggleSkillChip(customSkill);
      chip.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm shadow-teal-500/10';
      chip.innerHTML = `${customSkill} <span class="text-teal-400 font-bold">✓</span>`;
      container.appendChild(chip);
    }
  });

  updateSkillsBadge();
}

function toggleSkillChip(skill) {
  const idx = state.candidate.currentSkills.indexOf(skill);
  if (idx > -1) {
    state.candidate.currentSkills.splice(idx, 1);
  } else {
    state.candidate.currentSkills.push(skill);
  }
  renderSuggestedChips();
  updateLiveHeatmap();
}

function addCustomSkill() {
  const input = document.getElementById('input-custom-skill');
  if (!input) return;
  const val = input.value.trim();
  if (val && !state.candidate.currentSkills.includes(val)) {
    state.candidate.currentSkills.push(val);
    input.value = '';
    renderSuggestedChips();
    updateLiveHeatmap();
    showToast(`Added "${val}" to your current skills!`, 'success');
  }
}

// Live Real-Time Heatmap Generator (Evaluates active branch, target role, and candidate skills)
function generateLiveHeatmapData(targetField, branch, currentSkills = [], candidateName = '') {
  const domainKey = targetField || 'Full Stack Web Development';
  const categoriesTemplate = domainBenchmarks[domainKey] || domainBenchmarks['Full Stack Web Development'] || [];

  const userSkillsNorm = (currentSkills || [])
    .map(s => String(s).toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean);

  let totalSkills = 0;
  let masteredCount = 0;
  const strengths = [];
  const criticalGaps = [];

  const heatmap = categoriesTemplate.map(cat => {
    const skills = cat.skills.map((skillName, sIdx) => {
      totalSkills++;
      const normSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');

      // Check if user has selected or added this skill
      const isSelected = userSkillsNorm.some(us => normSkill.includes(us) || us.includes(normSkill));

      if (isSelected) {
        masteredCount++;
        if (strengths.length < 6) strengths.push(skillName);
        return {
          name: skillName,
          demandPercentage: 92 + (sIdx % 7),
          userProficiencyPercentage: 88 + (sIdx % 9),
          status: 'Mastered',
          marketTrend: 'Surging',
          heatLevel: 'high'
        };
      } else {
        if (criticalGaps.length < 6) criticalGaps.push(skillName);
        return {
          name: skillName,
          demandPercentage: 86 + (sIdx % 10),
          userProficiencyPercentage: 18 + ((sIdx * 3) % 15),
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

  // Check for custom skills not in benchmark
  const unmatchedCustomSkills = [];
  (currentSkills || []).forEach(customSkill => {
    const normUser = String(customSkill).toLowerCase().replace(/[^a-z0-9]/g, '');
    let matched = false;
    for (const cat of categoriesTemplate) {
      for (const bSkill of cat.skills) {
        const normBenchmark = bSkill.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normBenchmark.includes(normUser) || normUser.includes(normBenchmark)) {
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
    if (!matched) {
      unmatchedCustomSkills.push(customSkill);
    }
  });

  if (unmatchedCustomSkills.length > 0) {
    heatmap.push({
      categoryName: 'Custom & Candidate Endorsed Competencies',
      skills: unmatchedCustomSkills.map(cs => {
        masteredCount++;
        totalSkills++;
        if (strengths.length < 6) strengths.push(cs);
        return {
          name: cs,
          demandPercentage: 90,
          userProficiencyPercentage: 95,
          status: 'Mastered',
          marketTrend: 'Surging',
          heatLevel: 'high'
        };
      })
    });
  }

  const calculatedScore = totalSkills > 0 ? Math.round((masteredCount / totalSkills) * 100) : 0;
  const overallMatchScore = masteredCount === 0 ? 0 : Math.min(100, Math.max(10, calculatedScore));
  const isHighMatch = overallMatchScore >= 70;

  let summaryText = '';
  if (masteredCount === 0) {
    summaryText = `Select your known skills from the chips above or type custom competencies to benchmark your real-time proficiency against 2026 industry requirements for ${domainKey} (${branch}).`;
  } else if (isHighMatch) {
    summaryText = `Candidate demonstrates high industry alignment across ${masteredCount} verified benchmark skill(s) for ${domainKey} (${branch}). Qualified for direct placement pipeline and capstone unlocks.`;
  } else {
    summaryText = `Candidate demonstrates foundational capability in ${masteredCount} verified skill(s) for ${domainKey}. Critical industry gaps identified in ${criticalGaps.slice(0, 3).join(', ')}. Bridge curriculum recommended in Phase 2.`;
  }

  return {
    candidateName: candidateName || 'Candidate',
    branch: branch,
    targetField: domainKey,
    overallMatchScore: overallMatchScore,
    industryDemandLevel: 'Surging (94% Hiring Surge in Q3 2026)',
    readinessStatus: isHighMatch ? 'High Skill Alignment (Placement Ready)' : (masteredCount === 0 ? 'Skill Assessment In Progress' : 'Critical Skill Gap Identified'),
    branchingTrigger: isHighMatch ? 'high_skill_match' : 'low_skill_gap',
    summary: summaryText,
    strengths: strengths,
    criticalGaps: criticalGaps,
    heatmap: heatmap
  };
}

function updateLiveHeatmap() {
  const branchSelect = document.getElementById('input-branch');
  const targetSelect = document.getElementById('input-target-field');

  const branch = branchSelect ? branchSelect.value : (state.candidate.branch || 'Computer Science & Engineering');
  const targetField = targetSelect ? targetSelect.value : (state.candidate.targetField || 'Full Stack Web Development');

  // If domain changed, reset active category tab to All Categories (-1)
  if (state.lastRenderedDomain !== targetField) {
    state.activeHeatmapCategory = -1;
    state.lastRenderedDomain = targetField;
  }

  // Generate live gap analysis
  const liveData = generateLiveHeatmapData(
    targetField,
    branch,
    state.candidate.currentSkills,
    state.candidate.name
  );

  state.assessmentData = liveData;

  // Render heatmap dashboard
  renderHeatmapDashboard(liveData);

  // Ensure dashboard is visible
  const dashboard = document.getElementById('heatmap-dashboard');
  if (dashboard) {
    dashboard.classList.remove('hidden');
  }

  // Synchronize Phase 2 roadmap header title
  const roadmapTitle = document.getElementById('roadmap-domain-title');
  if (roadmapTitle) {
    roadmapTitle.innerText = `${targetField} Industry Alignment Roadmap`;
  }
}


// Phase 1: Handle Assessment Submit
async function handleAssessmentSubmit(e) {
  if (e) e.preventDefault();

  const branch = document.getElementById('input-branch').value;
  const targetField = document.getElementById('input-target-field').value;
  const college = document.getElementById('input-college').value.trim();
  const experienceLevel = document.getElementById('input-experience').value;
  const currentSkills = state.candidate.currentSkills;

  if (!college) {
    showToast('Please enter your College / University name!', 'warning');
    return;
  }

  if (!currentSkills || currentSkills.length === 0) {
    showToast('Please select or add at least 1 current skill!', 'warning');
    return;
  }

  state.candidate.branch = branch;
  state.candidate.targetField = targetField;
  state.candidate.college = college;
  state.candidate.experienceLevel = experienceLevel;

  const loader = document.getElementById('assessment-loader');
  const dashboard = document.getElementById('heatmap-dashboard');
  const submitBtn = document.getElementById('btn-submit-assessment');

  loader.classList.remove('hidden');
  dashboard.classList.add('hidden');
  submitBtn.disabled = true;

  try {
    const response = await fetch('/api/analyze-gap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: state.candidate.name || 'Candidate',
        branch,
        college,
        targetField,
        experienceLevel,
        currentSkills
      })
    });

    const resJson = await response.json();
    if (!resJson.success || !resJson.data) {
      throw new Error(resJson.error || 'Failed to analyze gap');
    }

    state.assessmentData = resJson.data;
    renderHeatmapDashboard(resJson.data);
    
    loader.classList.add('hidden');
    dashboard.classList.remove('hidden');
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    showToast('Real-time Skill Heatmap generated!', 'success');

    // Pre-fetch roadmap
    fetchRoadmapData();

  } catch (err) {
    console.error('Error in assessment:', err);
    loader.classList.add('hidden');
    showToast('Failed to analyze: ' + err.message, 'error');
  } finally {
    submitBtn.disabled = false;
    initIcons();
  }
}

// Render Heatmap Dashboard
function renderHeatmapDashboard(data) {
  if (!data) return;
  const score = Math.round(data.overallMatchScore || 0);
  const scoreNumberEl = document.getElementById('score-number');
  const gaugeCircle = document.getElementById('gauge-circle');
  const matchStatusBadge = document.getElementById('match-status-badge');
  const demandLevelPill = document.getElementById('demand-level-pill');

  if (scoreNumberEl) scoreNumberEl.innerText = `${score}%`;
  if (gaugeCircle) {
    const offset = 264 - (264 * score) / 100;
    gaugeCircle.style.strokeDashoffset = offset;

    if (score === 0) {
      gaugeCircle.className.baseVal = 'text-slate-700 transition-all duration-1000';
      if (matchStatusBadge) {
        matchStatusBadge.className = 'mt-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700';
        matchStatusBadge.innerText = 'Skill Assessment In Progress (Click Skills to Benchmark)';
      }
    } else if (score >= 70) {
      gaugeCircle.className.baseVal = 'text-emerald-400 transition-all duration-1000';
      if (matchStatusBadge) {
        matchStatusBadge.className = 'mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        matchStatusBadge.innerText = 'High Skill Alignment (Placement Ready)';
      }
    } else {
      gaugeCircle.className.baseVal = 'text-amber-400 transition-all duration-1000';
      if (matchStatusBadge) {
        matchStatusBadge.className = 'mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20';
        matchStatusBadge.innerText = 'Critical Skill Gap Identified';
      }
    }
  }

  const candidateName = state.candidate.name || 'Candidate';
  const branchName = data.branch || state.candidate.branch || '';
  const titleText = branchName 
    ? `${candidateName}'s Live Alignment for ${data.targetField} (${branchName})`
    : `${candidateName}'s Live Alignment for ${data.targetField}`;

  const titleEl = document.getElementById('analysis-candidate-title');
  if (titleEl) titleEl.innerText = titleText;

  const summaryEl = document.getElementById('analysis-summary-text');
  if (summaryEl) summaryEl.innerText = data.summary || '';

  if (demandLevelPill && data.industryDemandLevel) {
    demandLevelPill.innerText = `${data.industryDemandLevel}`;
  }

  // Strengths
  const strengthsContainer = document.getElementById('strengths-tags');
  if (strengthsContainer) {
    strengthsContainer.innerHTML = '';
    const strengthsList = (data.strengths || []).filter(Boolean);
    if (strengthsList.length === 0) {
      const span = document.createElement('span');
      span.className = 'px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-400 text-[11px] font-semibold';
      span.innerText = 'Select known skills above to populate strengths';
      strengthsContainer.appendChild(span);
    } else {
      strengthsList.forEach(str => {
        const span = document.createElement('span');
        span.className = 'px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold';
        span.innerText = str;
        strengthsContainer.appendChild(span);
      });
    }
  }

  // Critical Gaps
  const gapsContainer = document.getElementById('critical-gaps-tags');
  if (gapsContainer) {
    gapsContainer.innerHTML = '';
    const gapsList = (data.criticalGaps || []).filter(Boolean);
    if (gapsList.length === 0) {
      const span = document.createElement('span');
      span.className = 'px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold';
      span.innerText = 'All core benchmark skills mastered!';
      gapsContainer.appendChild(span);
    } else {
      gapsList.forEach(gap => {
        const span = document.createElement('span');
        span.className = 'px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-semibold';
        span.innerText = gap;
        gapsContainer.appendChild(span);
      });
    }
  }

  renderBranchingBanner(data);
  renderHeatmapCategories(data.heatmap || []);
  renderHeatmapGrid();
}

function renderBranchingBanner(data) {
  const container = document.getElementById('branching-container');
  if (!container) return;
  const isHighMatch = data.overallMatchScore >= 70 || data.branchingTrigger === 'high_skill_match';

  if (isHighMatch) {
    container.className = 'rounded-3xl p-6 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 shadow-2xl';
    container.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/30">
            <i data-lucide="award" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              High Skill Match Branch
            </div>
            <h4 class="text-xl font-black text-white">Direct Industry Placement Fast-Track</h4>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl">
              Your credentials show high alignment with current ${data.targetField} demands. You can jump directly to Phase 4 to explore live job openings and export your AI resume.
            </p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button onclick="showPage('page-phase4')" class="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition">
            <i data-lucide="sparkles" class="w-4 h-4"></i>
            <span>Unlock Live Openings & AI Resume</span>
          </button>
          <button onclick="showPage('page-phase2')" class="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold text-center transition">
            View Learning Roadmap
          </button>
        </div>
      </div>
    `;
  } else {
    container.className = 'rounded-3xl p-6 bg-gradient-to-r from-amber-950/70 via-slate-900 to-rose-950/70 border border-amber-500/40 shadow-2xl';
    container.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg shadow-amber-500/30">
            <i data-lucide="git-pull-request" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              Skill Gap Branch Triggered
            </div>
            <h4 class="text-xl font-black text-white">Interactive Bridge Roadmap Recommended</h4>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl">
              Target role: ${data.targetField}. KaushalSetu has prepared your 4-stage modular curriculum to bridge identified domain gaps.
            </p>
          </div>
        </div>

        <button onclick="showPage('page-phase2')" class="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition whitespace-nowrap self-start sm:self-auto">
          <span>Go to Phase 2: Learning Roadmap</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    `;
  }
}

// Category Tabs for Heatmap
function renderHeatmapCategories(categories) {
  const tabsContainer = document.getElementById('heatmap-category-tabs');
  if (!tabsContainer) return;
  tabsContainer.innerHTML = '';

  const catList = categories || [];
  if (state.activeHeatmapCategory >= catList.length) {
    state.activeHeatmapCategory = -1;
  }

  const allBtn = document.createElement('button');
  allBtn.className = `px-3.5 py-1.5 rounded-xl transition ${state.activeHeatmapCategory === -1 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`;
  allBtn.innerText = 'All Topics & Categories';
  allBtn.onclick = () => {
    state.activeHeatmapCategory = -1;
    renderHeatmapCategories(catList);
    renderHeatmapGrid();
  };
  tabsContainer.appendChild(allBtn);

  catList.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className = `px-3.5 py-1.5 rounded-xl transition ${state.activeHeatmapCategory === idx ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`;
    btn.innerText = cat.categoryName;
    btn.onclick = () => {
      state.activeHeatmapCategory = idx;
      renderHeatmapCategories(catList);
      renderHeatmapGrid();
    };
    tabsContainer.appendChild(btn);
  });
}

function filterHeatmap(filterType) {
  state.activeHeatmapFilter = filterType;
  ['all', 'gap', 'mastered'].forEach(type => {
    const btn = document.getElementById(`filter-${type}-btn`);
    if (btn) {
      if (type === filterType) {
        btn.className = 'heatmap-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-white border border-slate-600 shadow';
      } else {
        btn.className = 'heatmap-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-400 border border-slate-800';
      }
    }
  });
  renderHeatmapGrid();
}

function renderHeatmapGrid() {
  const container = document.getElementById('heatmap-grid');
  if (!container || !state.assessmentData || !state.assessmentData.heatmap) return;

  container.innerHTML = '';
  const categories = state.assessmentData.heatmap;
  let skillsToDisplay = [];

  categories.forEach((cat, idx) => {
    if (state.activeHeatmapCategory === -1 || state.activeHeatmapCategory === idx) {
      (cat.skills || []).forEach(skill => {
        skillsToDisplay.push({ ...skill, category: cat.categoryName });
      });
    }
  });

  if (state.activeHeatmapFilter === 'gap') {
    skillsToDisplay = skillsToDisplay.filter(s => s.status === 'Critical Gap' || s.heatLevel === 'critical-gap');
  } else if (state.activeHeatmapFilter === 'mastered') {
    skillsToDisplay = skillsToDisplay.filter(s => s.status === 'Mastered');
  }

  if (skillsToDisplay.length === 0) {
    container.innerHTML = `<div class="col-span-3 text-center py-10 text-slate-500 text-xs">No skills match the current filter.</div>`;
    return;
  }

  skillsToDisplay.forEach(skill => {
    const card = document.createElement('div');
    const isMastered = skill.status === 'Mastered';
    const isCritical = skill.status === 'Critical Gap';
    
    const borderClass = isMastered 
      ? 'heatmap-cell-mastered' 
      : (isCritical ? 'heatmap-cell-gap' : 'heatmap-cell-practice');

    const statusBadge = isMastered
      ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Mastered ✅</span>`
      : (isCritical 
          ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Critical Gap ❌</span>`
          : `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Needs Practice ⚠️</span>`);

    const trendBadge = `<span class="text-[10px] text-slate-400">${skill.marketTrend === 'Surging' ? '🔥 Surging' : (skill.marketTrend === 'High Demand' ? '📈 High Demand' : '⚖️ Stable')}</span>`;

    card.className = `glass-card p-4 rounded-2xl border border-slate-700/80 ${borderClass} space-y-3 cursor-pointer hover:border-slate-500 transition`;
    card.title = isMastered ? `Click to mark "${skill.name}" as unlearned` : `Click to mark "${skill.name}" as mastered`;
    card.onclick = () => toggleSkillChip(skill.name);

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div>
          <span class="text-[10px] uppercase font-semibold tracking-wider text-slate-500 block">${skill.category}</span>
          <h5 class="text-sm font-bold text-white flex items-center gap-1.5">
            ${skill.name}
            <span class="text-[10px] text-slate-500 font-normal hover:text-slate-300">(${isMastered ? 'click to remove' : 'click to add'})</span>
          </h5>
        </div>
        ${statusBadge}
      </div>

      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-[11px]">
          <span class="text-slate-400">Industry Market Demand:</span>
          <span class="font-bold text-slate-200">${skill.demandPercentage}% ${trendBadge}</span>
        </div>
        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-blue-500 rounded-full" style="width: ${skill.demandPercentage}%"></div>
        </div>

        <div class="flex justify-between text-[11px] pt-1">
          <span class="text-slate-400">Your Current Proficiency:</span>
          <span class="font-bold ${isMastered ? 'text-emerald-400' : (isCritical ? 'text-rose-400' : 'text-amber-400')}">${skill.userProficiencyPercentage}%</span>
        </div>
        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full ${isMastered ? 'bg-emerald-400' : (isCritical ? 'bg-rose-500' : 'bg-amber-400')} rounded-full" style="width: ${skill.userProficiencyPercentage}%"></div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  initIcons();
}


// Fetch and Render Roadmap (Phase 2)
async function fetchRoadmapData() {
  const currentTarget = state.candidate.targetField || 'Full Stack Web Development';

  // 1. Instant client-side render if domainRoadmaps is loaded
  if (typeof domainRoadmaps !== 'undefined' && domainRoadmaps[currentTarget]) {
    state.roadmapData = domainRoadmaps[currentTarget];
    renderRoadmap(domainRoadmaps[currentTarget]);
  }

  const loader = document.getElementById('roadmap-loader');
  const container = document.getElementById('roadmap-modules-container');
  if (loader && (!container || container.children.length === 0)) {
    loader.classList.remove('hidden');
  }

  try {
    const res = await fetch('/api/generate-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetField: currentTarget,
        criticalGaps: state.assessmentData?.criticalGaps || ['Foundational Architecture', 'Industry Standards'],
        currentSkills: state.candidate.currentSkills,
        experienceLevel: state.candidate.experienceLevel
      })
    });

    const resJson = await res.json();
    if (!resJson.success || !resJson.data) {
      throw new Error(resJson.error || 'Failed to generate roadmap');
    }

    if (state.candidate.targetField === currentTarget) {
      state.roadmapData = resJson.data;
      renderRoadmap(resJson.data);
    }

  } catch (err) {
    console.warn('Roadmap API call note (using domain roadmap):', err.message);
    if (!state.roadmapData && typeof domainRoadmaps !== 'undefined' && domainRoadmaps[currentTarget]) {
      state.roadmapData = domainRoadmaps[currentTarget];
      renderRoadmap(domainRoadmaps[currentTarget]);
    }
  } finally {
    if (loader) loader.classList.add('hidden');
    initIcons();
  }
}

function renderRoadmap(data) {
  const container = document.getElementById('roadmap-modules-container');
  if (!container || !data) return;

  const domainTitle = document.getElementById('roadmap-domain-title');
  if (domainTitle) domainTitle.innerText = `${data.domain} Alignment Roadmap`;

  const domainDesc = document.getElementById('roadmap-domain-desc');
  if (domainDesc) {
    domainDesc.innerText = `Curated modular curriculum for ${data.domain} bridging identified gaps with verified YouTube courses (rated 4.0-4.5/5), GitHub project blueprints, and direct practice problem links.`;
  }

  if (data.estimatedWeeks) {
    const weeksEl = document.getElementById('roadmap-estimated-weeks');
    if (weeksEl) weeksEl.innerText = `${data.estimatedWeeks} Weeks`;
  }
  if (data.recommendedDailyHours) {
    const hoursEl = document.getElementById('roadmap-daily-hours');
    if (hoursEl) hoursEl.innerText = `${data.recommendedDailyHours} Hours / Day`;
  }

  // Reset module progress tracking when domain changes
  if (state.lastRoadmapDomain !== data.domain) {
    state.lastRoadmapDomain = data.domain;
    state.userProgress.moduleProgress = {};
    state.userProgress.completedLectures = 0;
    state.userProgress.solvedQuestions = 0;
    state.userProgress.overallPercentage = 0;
    recalculateProgress();
  }

  container.innerHTML = '';
  let totalLectures = 0;
  let totalQuestions = 0;

  (data.modules || []).forEach((mod) => {
    state.userProgress.moduleProgress[mod.moduleId] = state.userProgress.moduleProgress[mod.moduleId] || {
      lecturesDone: 0,
      targetLectures: mod.totalLecturesTarget || 20,
      questionsDone: 0,
      targetQuestions: mod.totalQuestionsTarget || 8,
      isCompleted: false
    };

    totalLectures += (mod.totalLecturesTarget || 20);
    totalQuestions += (mod.totalQuestionsTarget || 8);

    const modCard = document.createElement('div');
    modCard.className = 'glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 space-y-6';
    modCard.id = `module-card-${mod.moduleId}`;

    // YouTube Courses HTML (Guaranteed-working course playlist links opening in new tab)
    let coursesHtml = '';
    (mod.youtubeCourses || []).forEach(course => {
      const rating = (course.rating && course.rating >= 4.0 && course.rating <= 4.5) ? course.rating : 4.4;
      let playlistUrl = (course.url || '').trim();
      // Guard against broken or hallucinated playlist IDs (which cause "The playlist does not exist")
      if (!playlistUrl || playlistUrl.includes('playlist?list=') || playlistUrl.includes('...')) {
        const cleanTitle = (course.title || '').replace(/playlist/gi, '').trim();
        const searchTerms = `${course.channel || ''} ${cleanTitle} playlist`.trim();
        playlistUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerms)}`;
      }
      coursesHtml += `
        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                <i data-lucide="youtube" class="w-3.5 h-3.5"></i>
                ${course.channel || 'YouTube Series'}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                ★ ${rating} / 5.0
              </span>
            </div>
            <h6 class="text-xs font-bold text-white line-clamp-2">${course.title}</h6>
            <div class="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
              <span>⏱ ${course.duration || '3h 30m'}</span>
              <span>•</span>
              <span>📚 ${course.totalLectures || 15} Lectures</span>
            </div>
          </div>
          <a href="${playlistUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 transition">
            <i data-lucide="play-circle" class="w-4 h-4"></i>
            <span>Open Course Playlist</span>
            <i data-lucide="external-link" class="w-3 h-3"></i>
          </a>
        </div>
      `;
    });

    // GitHub Blueprint HTML
    let gitHtml = '';
    (mod.githubProjects || []).forEach(p => {
      gitHtml += `
        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <i data-lucide="github" class="w-3.5 h-3.5 text-slate-200"></i>
              Production Blueprint
            </span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Capstone</span>
          </div>
          <h6 class="text-xs font-bold text-white">${p.title}</h6>
          <p class="text-[11px] text-slate-300">${p.description}</p>
          <div class="flex flex-wrap gap-1 pt-1">
            ${(p.techStack || []).map(t => `<span class="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 font-mono">${t}</span>`).join('')}
          </div>
        </div>
      `;
    });

    // LeetCode Practice HTML with DIRECT CLICKABLE LINKS
    let leetHtml = '';
    if (mod.leetCodePractice) {
      const lc = mod.leetCodePractice;
      const problemsList = lc.problems || [
        { title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' },
        { title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium' },
        { title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium' },
        { title: 'Valid Sudoku', url: 'https://leetcode.com/problems/valid-sudoku/', difficulty: 'Medium' },
        { title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' }
      ];

      leetHtml = `
        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
              LeetCode Direct Practice Hub
            </span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">${lc.difficulty || 'Medium'}</span>
          </div>
          <h6 class="text-xs font-bold text-white">${lc.topic} (${problemsList.length} Curated Questions)</h6>
          
          <div class="space-y-1.5 pt-1">
            ${problemsList.map(pr => {
              const diffColor = pr.difficulty === 'Easy' 
                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' 
                : (pr.difficulty === 'Hard' ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10');
              const url = pr.url || `https://leetcode.com/problemset/?search=${encodeURIComponent(pr.title)}`;
              return `
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition group">
                  <span class="text-xs font-semibold text-slate-200 group-hover:text-amber-300 flex items-center gap-1.5">
                    <i data-lucide="arrow-up-right" class="w-3 h-3 text-amber-400"></i>
                    ${pr.title}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${diffColor}">
                    ${pr.difficulty}
                  </span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    modCard.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Module ${mod.moduleId}
            </span>
            <span class="text-xs text-slate-400 font-medium">⏱ ${mod.durationWeeks || '2 Weeks'}</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-semibold text-emerald-400">${mod.difficulty || 'Intermediate'}</span>
          </div>
          <h4 class="text-lg font-black text-white">${mod.title}</h4>
          <p class="text-xs text-slate-400 mt-1">${mod.description}</p>
        </div>

        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
            <input type="checkbox" id="mod-complete-check-${mod.moduleId}" onchange="toggleModuleComplete(${mod.moduleId})" class="rounded text-emerald-500 focus:ring-0 w-4 h-4 bg-slate-950 border-slate-700">
            <span>Mark Complete</span>
          </label>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5 text-[11px]">
        <span class="text-slate-400 font-semibold mr-1">Target Concepts:</span>
        ${(mod.coreTopics || []).map(topic => `<span class="px-2.5 py-0.5 bg-slate-800/80 rounded-full text-slate-300 border border-slate-700/50">${topic}</span>`).join('')}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-3">
          <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <i data-lucide="video" class="w-3.5 h-3.5 text-rose-400"></i>
            YouTube Course Playlists (4.0 - 4.5/5)
          </h5>
          ${coursesHtml}
        </div>

        <div class="space-y-3">
          <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <i data-lucide="folder-git-2" class="w-3.5 h-3.5 text-slate-300"></i>
            GitHub Capstone Blueprints
          </h5>
          ${gitHtml}
        </div>

        <div class="space-y-3">
          <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <i data-lucide="terminal" class="w-3.5 h-3.5 text-amber-400"></i>
            LeetCode Clickable Problem Links
          </h5>
          ${leetHtml}
        </div>
      </div>

      <div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div class="flex items-center space-x-6">
          <div class="flex items-center gap-2">
            <span class="text-slate-400 font-medium">Lectures Logged:</span>
            <button onclick="logModuleLecture(${mod.moduleId}, -1)" class="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700">-</button>
            <span id="mod-lectures-val-${mod.moduleId}" class="font-bold text-white w-6 text-center">0</span>
            <span class="text-slate-500">/ ${mod.totalLecturesTarget || 20}</span>
            <button onclick="logModuleLecture(${mod.moduleId}, 1)" class="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700">+</button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-slate-400 font-medium">Questions Solved:</span>
            <button onclick="logModuleQuestion(${mod.moduleId}, -1)" class="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700">-</button>
            <span id="mod-questions-val-${mod.moduleId}" class="font-bold text-white w-6 text-center">0</span>
            <span class="text-slate-500">/ ${mod.totalQuestionsTarget || 8}</span>
            <button onclick="logModuleQuestion(${mod.moduleId}, 1)" class="w-6 h-6 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700">+</button>
          </div>
        </div>

        <div class="w-full sm:w-48">
          <div class="flex justify-between text-[11px] mb-1">
            <span class="text-slate-400">Module Completion</span>
            <span id="mod-progress-pct-${mod.moduleId}" class="font-bold text-emerald-400">0%</span>
          </div>
          <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div id="mod-progress-bar-${mod.moduleId}" class="h-full bg-emerald-400 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(modCard);
  });

  if (totalLectures > 0) {
    state.userProgress.targetLectures = totalLectures;
    const inp = document.getElementById('custom-target-lectures');
    if (inp) inp.value = totalLectures;
  }
  if (totalQuestions > 0) {
    state.userProgress.targetQuestions = totalQuestions;
    const inp = document.getElementById('custom-target-questions');
    if (inp) inp.value = totalQuestions;
  }

  recalculateProgress();
  initIcons();
}

function logModuleLecture(moduleId, delta) {
  const modProg = state.userProgress.moduleProgress[moduleId];
  if (!modProg) return;

  modProg.lecturesDone = Math.max(0, Math.min(modProg.targetLectures, modProg.lecturesDone + delta));
  const el = document.getElementById(`mod-lectures-val-${moduleId}`);
  if (el) el.innerText = modProg.lecturesDone;

  if (modProg.lecturesDone === modProg.targetLectures && modProg.questionsDone === modProg.targetQuestions) {
    modProg.isCompleted = true;
    const chk = document.getElementById(`mod-complete-check-${moduleId}`);
    if (chk) chk.checked = true;
  }

  updateModuleCardProgress(moduleId);
  recalculateProgress();
}

function logModuleQuestion(moduleId, delta) {
  const modProg = state.userProgress.moduleProgress[moduleId];
  if (!modProg) return;

  modProg.questionsDone = Math.max(0, Math.min(modProg.targetQuestions, modProg.questionsDone + delta));
  const el = document.getElementById(`mod-questions-val-${moduleId}`);
  if (el) el.innerText = modProg.questionsDone;

  if (modProg.lecturesDone === modProg.targetLectures && modProg.questionsDone === modProg.targetQuestions) {
    modProg.isCompleted = true;
    const chk = document.getElementById(`mod-complete-check-${moduleId}`);
    if (chk) chk.checked = true;
  }

  updateModuleCardProgress(moduleId);
  recalculateProgress();
}

function toggleModuleComplete(moduleId) {
  const chk = document.getElementById(`mod-complete-check-${moduleId}`);
  const modProg = state.userProgress.moduleProgress[moduleId];
  if (!modProg || !chk) return;

  if (chk.checked) {
    modProg.lecturesDone = modProg.targetLectures;
    modProg.questionsDone = modProg.targetQuestions;
    modProg.isCompleted = true;
  } else {
    modProg.lecturesDone = 0;
    modProg.questionsDone = 0;
    modProg.isCompleted = false;
  }

  const lEl = document.getElementById(`mod-lectures-val-${moduleId}`);
  const qEl = document.getElementById(`mod-questions-val-${moduleId}`);
  if (lEl) lEl.innerText = modProg.lecturesDone;
  if (qEl) qEl.innerText = modProg.questionsDone;

  updateModuleCardProgress(moduleId);
  recalculateProgress();
}

function updateModuleCardProgress(moduleId) {
  const modProg = state.userProgress.moduleProgress[moduleId];
  if (!modProg) return;

  const totalModTasks = modProg.targetLectures + modProg.targetQuestions;
  const doneModTasks = modProg.lecturesDone + modProg.questionsDone;
  const pct = totalModTasks > 0 ? Math.round((doneModTasks / totalModTasks) * 100) : 0;

  const pctEl = document.getElementById(`mod-progress-pct-${moduleId}`);
  const barEl = document.getElementById(`mod-progress-bar-${moduleId}`);
  if (pctEl) pctEl.innerText = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
}

function updateCustomTargets() {
  const lVal = parseInt(document.getElementById('custom-target-lectures').value, 10);
  const qVal = parseInt(document.getElementById('custom-target-questions').value, 10);

  if (!isNaN(lVal) && lVal > 0) state.userProgress.targetLectures = lVal;
  if (!isNaN(qVal) && qVal > 0) state.userProgress.targetQuestions = qVal;

  recalculateProgress();
  showToast('Updated global learning targets', 'info');
}

function recalculateProgress() {
  let totalDoneLectures = 0;
  let totalDoneQuestions = 0;

  Object.values(state.userProgress.moduleProgress).forEach(mod => {
    totalDoneLectures += (mod.lecturesDone || 0);
    totalDoneQuestions += (mod.questionsDone || 0);
  });

  state.userProgress.completedLectures = totalDoneLectures;
  state.userProgress.solvedQuestions = totalDoneQuestions;

  const lRatio = state.userProgress.targetLectures > 0 ? (totalDoneLectures / state.userProgress.targetLectures) : 0;
  const qRatio = state.userProgress.targetQuestions > 0 ? (totalDoneQuestions / state.userProgress.targetQuestions) : 0;
  const combinedPct = Math.min(100, Math.round(((lRatio + qRatio) / 2) * 100));

  state.userProgress.overallPercentage = combinedPct;

  const topBar = document.getElementById('top-progress-bar');
  const topText = document.getElementById('top-progress-text');
  const topLec = document.getElementById('top-lectures-stat');
  const topQues = document.getElementById('top-questions-stat');

  if (topBar) topBar.style.width = `${combinedPct}%`;
  if (topText) topText.innerText = `${combinedPct}%`;
  if (topLec) topLec.innerText = `${totalDoneLectures} / ${state.userProgress.targetLectures}`;
  if (topQues) topQues.innerText = `${totalDoneQuestions} / ${state.userProgress.targetQuestions}`;

  const baseScore = state.assessmentData?.overallMatchScore || 38;
  const liveReadiness = Math.min(100, Math.round(baseScore + ((100 - baseScore) * (combinedPct / 100))));
  const liveLabel = document.getElementById('readiness-live-label');
  if (liveLabel) {
    liveLabel.innerText = `Industry Readiness: ${liveReadiness}%`;
  }

  const lockedBar = document.getElementById('locked-progress-bar');
  const lockedText = document.getElementById('locked-current-progress-text');
  if (lockedBar) lockedBar.style.width = `${combinedPct}%`;
  if (lockedText) lockedText.innerText = `Current: ${combinedPct}%`;

  if (combinedPct >= 100 && !state.userProgress.isUnlocked) {
    triggerUnlockCelebration();
  }
}

function triggerUnlockCelebration() {
  state.userProgress.isUnlocked = true;

  const lockedCard = document.getElementById('phase3-locked-card');
  const unlockedCard = document.getElementById('phase3-unlocked-card');

  if (lockedCard) lockedCard.classList.add('hidden');
  if (unlockedCard) unlockedCard.classList.remove('hidden');

  if (window.confetti) {
    window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }

  showToast('🎉 Milestone Reached: 100% Industry Alignment Achieved!', 'success');
  initIcons();
}

function simulateHundredPercentCompletion() {
  if (!state.roadmapData) {
    state.roadmapData = {
      domain: state.candidate.targetField,
      modules: [
        { moduleId: 1, totalLecturesTarget: 26, totalQuestionsTarget: 10 },
        { moduleId: 2, totalLecturesTarget: 28, totalQuestionsTarget: 8 },
        { moduleId: 3, totalLecturesTarget: 20, totalQuestionsTarget: 8 },
        { moduleId: 4, totalLecturesTarget: 24, totalQuestionsTarget: 10 }
      ]
    };
    renderRoadmap(state.roadmapData);
  }

  Object.keys(state.userProgress.moduleProgress).forEach(modId => {
    const mod = state.userProgress.moduleProgress[modId];
    mod.lecturesDone = mod.targetLectures;
    mod.questionsDone = mod.targetQuestions;
    mod.isCompleted = true;

    const lVal = document.getElementById(`mod-lectures-val-${modId}`);
    const qVal = document.getElementById(`mod-questions-val-${modId}`);
    const chk = document.getElementById(`mod-complete-check-${modId}`);
    if (lVal) lVal.innerText = mod.targetLectures;
    if (qVal) qVal.innerText = mod.targetQuestions;
    if (chk) chk.checked = true;

    updateModuleCardProgress(modId);
  });

  recalculateProgress();
  triggerUnlockCelebration();

  setTimeout(() => {
    showPage('page-phase3');
  }, 400);

  showToast('⚡ SIH Jury Simulation: 100% Roadmap Completed & Gateways Unlocked', 'success');
}

// Fetch and Render Post-Completion Hub (Phase 3)
async function fetchPostCompletionData(targetDomain) {
  const currentTarget = targetDomain || state.candidate.targetField || 'Full Stack Web Development';

  // 1. Instant client-side render if domainInternshipsData is available
  if (typeof domainInternshipsData !== 'undefined' && domainInternshipsData[currentTarget]) {
    state.postCompletionDomain = currentTarget;
    state.postCompletionData = domainInternshipsData[currentTarget];
    renderPostCompletion(domainInternshipsData[currentTarget], currentTarget);
  }

  try {
    const res = await fetch(`/api/post-completion-data?targetField=${encodeURIComponent(currentTarget)}&candidateName=${encodeURIComponent(state.candidate.name || 'Candidate')}`);
    const resJson = await res.json();
    if (resJson.success && resJson.data) {
      if ((state.candidate.targetField || 'Full Stack Web Development') === currentTarget) {
        state.postCompletionDomain = currentTarget;
        state.postCompletionData = resJson.data;
        renderPostCompletion(resJson.data, currentTarget);
      }
    }
  } catch (err) {
    console.warn('Post-completion network note (using local verified domain internships):', err.message);
    if (!state.postCompletionData && typeof domainInternshipsData !== 'undefined' && domainInternshipsData[currentTarget]) {
      state.postCompletionDomain = currentTarget;
      state.postCompletionData = domainInternshipsData[currentTarget];
      renderPostCompletion(domainInternshipsData[currentTarget], currentTarget);
    }
  }
}

function renderPostCompletion(data, domain) {
  const currentTarget = domain || state.candidate.targetField || 'Full Stack Web Development';
  renderHackathonsAndSummits(data.hackathonsAndSummits);
  renderInternships(data.internships, currentTarget);
  renderLinkedInChecklist(data.linkedinChecklist);
  generateAiResume();
  initIcons();
}

function renderHackathonsAndSummits(data) {
  if (!data) return;

  const hackGrid = document.getElementById('hackathons-grid');
  if (hackGrid && data.hackathons) {
    hackGrid.innerHTML = '';
    data.hackathons.forEach(h => {
      const card = document.createElement('div');
      card.className = 'bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition';
      card.innerHTML = `
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              ${h.mode || 'National Hybrid'}
            </span>
            <span class="text-[11px] text-slate-400">Deadline: ${h.deadline || 'Closing Soon'}</span>
          </div>
          <h5 class="text-sm font-black text-white">${h.title}</h5>
          <p class="text-[11px] text-slate-400">${h.organizer}</p>
          <div class="text-xs font-bold text-emerald-400 pt-1">Prize: ${h.prizePool || '₹1,00,000'}</div>
          <div class="flex flex-wrap gap-1 pt-1">
            ${(h.tags || []).map(t => `<span class="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 font-medium">${t}</span>`).join('')}
          </div>
        </div>

        <a href="${h.link || 'https://www.sih.gov.in/'}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition">
          <span>Apply / Register on Official Portal</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      `;
      hackGrid.appendChild(card);
    });
  }

  // Elite Bootcamps (DIRECT EXTERNAL REGISTRATION REDIRECTS)
  const bootList = document.getElementById('bootcamps-list');
  if (bootList && data.bootcamps) {
    bootList.innerHTML = '';
    data.bootcamps.forEach(b => {
      const regUrl = b.registerUrl || 'https://www.scaler.com/';
      const card = document.createElement('div');
      card.className = 'bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4';
      card.innerHTML = `
        <div>
          <span class="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">${b.status || 'Admissions Open'}</span>
          <h6 class="text-xs font-bold text-white mt-1">${b.title}</h6>
          <p class="text-[11px] text-slate-400">Mentor: ${b.mentor} • ${b.duration}</p>
        </div>
        <a href="${regUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition">
          <span>Register Now</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      `;
      bootList.appendChild(card);
    });
  }

  // Summits List
  const summitList = document.getElementById('summits-list');
  if (summitList && data.summits) {
    summitList.innerHTML = '';
    data.summits.forEach(s => {
      const card = document.createElement('div');
      card.className = 'bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4';
      card.innerHTML = `
        <div>
          <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">${s.perk || 'VIP Access Pass'}</span>
          <h6 class="text-xs font-bold text-white mt-1">${s.title}</h6>
          <p class="text-[11px] text-slate-400">${s.organizer} • ${s.date}</p>
        </div>
        <a href="https://aicte-india.org/" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs whitespace-nowrap border border-slate-700 flex items-center gap-1 transition">
          <span>Get Pass</span>
          <i data-lucide="external-link" class="w-3 h-3"></i>
        </a>
      `;
      summitList.appendChild(card);
    });
  }
}

// Render Live Internships (Phase 3)
function renderInternships(internships, domain) {
  const currentDomain = domain || state.candidate.targetField || 'Full Stack Web Development';
  const container = document.getElementById('internships-grid');
  if (!container || !internships) return;

  const titleEl = document.getElementById('internships-section-title');
  if (titleEl) {
    titleEl.innerText = `Live Verified ${currentDomain} Internships`;
  }
  const descEl = document.getElementById('internships-section-desc');
  if (descEl) {
    descEl.innerText = `Direct hiring partner postings matching your 100% ${currentDomain} verified skillset.`;
  }

  container.innerHTML = '';
  internships.forEach(int => {
    const isApplied = state.appliedInternships.some(a => a.internshipId === int.id);
    const card = document.createElement('div');
    card.className = 'glass-card p-6 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4 relative overflow-hidden';
    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-lg">
              ${int.logoInitials || 'ORG'}
            </div>
            <div>
              <h5 class="text-base font-black text-white">${int.role}</h5>
              <p class="text-xs font-semibold text-slate-400">${int.company}</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
            ${int.matchScore || 96}% Match
          </span>
        </div>

        <p class="text-xs text-slate-300">${int.description}</p>

        <div class="grid grid-cols-2 gap-2 text-xs pt-1">
          <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 block">Stipend</span>
            <span class="font-bold text-emerald-400">${int.stipend}</span>
          </div>
          <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 block">Location</span>
            <span class="font-semibold text-slate-200">${int.location}</span>
          </div>
        </div>

        <div class="pt-1">
          <span class="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block mb-1.5">Required Skills (100% Roadmap Verified):</span>
          <div class="flex flex-wrap gap-1.5">
            ${(int.requiredSkills || []).map(sk => `<span class="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1"><span class="text-emerald-400">✓</span> ${sk}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
        <span class="text-[11px] text-slate-400">${int.deadline || 'Hiring Immediately'}</span>
        ${isApplied 
          ? `<span class="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">✓ Application Active</span>`
          : `<button onclick="openApplyModal('${int.id}', '${int.company}', '${int.role}', ${int.matchScore || 96})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              <span>1-Click Apply</span>
            </button>`
        }
      </div>
    `;
    container.appendChild(card);
  });
  initIcons();
}

// Phase 4: Fetch and Render Live Full-Time Jobs
async function fetchLiveJobs() {
  try {
    const res = await fetch(`/api/live-jobs?targetField=${encodeURIComponent(state.candidate.targetField || 'Full Stack Web Development')}`);
    const resJson = await res.json();
    if (resJson.success && Array.isArray(resJson.data)) {
      state.liveJobs = resJson.data;
      renderLiveJobs(resJson.data);
    }
  } catch (err) {
    console.error('Error fetching live jobs:', err);
  }
}

function renderLiveJobs(jobs) {
  const container = document.getElementById('live-jobs-grid');
  if (!container || !jobs) return;

  container.innerHTML = '';
  jobs.forEach(job => {
    const isApplied = state.appliedJobs.some(a => a.jobId === job.id);
    const card = document.createElement('div');
    card.className = 'glass-card p-6 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4 relative overflow-hidden';
    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-lg">
              ${job.logoInitials || 'EMP'}
            </div>
            <div>
              <h5 class="text-base font-black text-white">${job.role}</h5>
              <p class="text-xs font-semibold text-slate-400">${job.company}</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            ${job.type || 'Full-Time'}
          </span>
        </div>

        <p class="text-xs text-slate-300">${job.description || 'Full-time engineering role with end-to-end product architecture responsibility.'}</p>

        <div class="grid grid-cols-2 gap-2 text-xs pt-1">
          <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 block">Package (CTC)</span>
            <span class="font-bold text-emerald-400">${job.package}</span>
          </div>
          <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 block">Location</span>
            <span class="font-semibold text-slate-200">${job.location}</span>
          </div>
        </div>

        <div class="pt-1">
          <span class="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block mb-1.5">Required Skills:</span>
          <div class="flex flex-wrap gap-1.5">
            ${(job.skills || []).map(sk => `<span class="px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 text-[10px] font-medium">${sk}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
        <span class="text-[11px] text-slate-400">${job.deadline || 'Closing Soon'}</span>
        ${isApplied
          ? `<span class="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">✓ Application Sent</span>`
          : `<button onclick="openJobApplyModal('${job.id}', '${job.company.replace(/'/g, "\\'")}', '${job.role.replace(/'/g, "\\'")}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/20 transition">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              <span>Apply for Role</span>
            </button>`
        }
      </div>
    `;
    container.appendChild(card);
  });
  initIcons();
}

// In-App Job Application Modal (Phase 4)
let activeJobForApply = null;

function openJobApplyModal(jobId, company, role) {
  activeJobForApply = { jobId, company, role };

  document.getElementById('modal-job-company').innerText = company;
  document.getElementById('modal-job-role').innerText = role;

  const nameInput = document.getElementById('job-apply-name');
  const emailInput = document.getElementById('job-apply-email');
  if (nameInput) nameInput.value = state.candidate.name || '';
  if (emailInput) emailInput.value = state.candidate.email || '';

  const modal = document.getElementById('modal-job-apply');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

async function submitJobApplication(e) {
  if (e) e.preventDefault();
  if (!activeJobForApply) return;

  const candidateName = document.getElementById('job-apply-name').value.trim();
  const email = document.getElementById('job-apply-email').value.trim();
  const resumeLink = document.getElementById('job-apply-resume-link').value.trim();
  const experienceLevel = document.getElementById('job-apply-experience').value;

  try {
    const res = await fetch('/api/apply-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: activeJobForApply.jobId,
        company: activeJobForApply.company,
        role: activeJobForApply.role,
        candidateName,
        email,
        resumeLink,
        experienceLevel
      })
    });

    const resJson = await res.json();
    if (resJson.success) {
      state.appliedJobs.push({
        jobId: activeJobForApply.jobId,
        applicationId: resJson.application.applicationId
      });

      closeModal('modal-job-apply');

      document.getElementById('confirm-msg').innerText = `Your application to ${activeJobForApply.company} for ${activeJobForApply.role} was received!`;
      document.getElementById('confirm-app-id').innerText = resJson.application.applicationId;
      document.getElementById('confirm-time').innerText = resJson.application.appliedAt;

      const confModal = document.getElementById('modal-confirmation');
      confModal.classList.remove('hidden');
      confModal.classList.add('flex');

      renderLiveJobs(state.liveJobs);
      showToast(`Application transmitted to ${activeJobForApply.company}!`, 'success');
    }
  } catch (err) {
    showToast('Job application failed: ' + err.message, 'error');
  }
}

// 1-Click Internship Modal (Phase 3)
let activeInternshipForApply = null;

function openApplyModal(id, company, role, matchScore) {
  activeInternshipForApply = { id, company, role, matchScore };

  document.getElementById('modal-apply-company').innerText = company;
  document.getElementById('modal-apply-role').innerText = role;
  document.getElementById('modal-apply-name').innerText = state.candidate.name || 'Candidate';

  const emailInp = document.getElementById('modal-apply-email');
  const phoneInp = document.getElementById('modal-apply-phone');
  if (emailInp) emailInp.value = state.candidate.email || '';
  if (phoneInp) phoneInp.value = state.candidate.mobile || '';

  const modal = document.getElementById('modal-apply');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

async function submitInternshipApplication() {
  if (!activeInternshipForApply) return;

  const email = document.getElementById('modal-apply-email').value;
  const phone = document.getElementById('modal-apply-phone').value;

  try {
    const res = await fetch('/api/apply-internship', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        internshipId: activeInternshipForApply.id,
        company: activeInternshipForApply.company,
        role: activeInternshipForApply.role,
        candidateName: state.candidate.name || 'Candidate',
        email,
        phone,
        matchScore: activeInternshipForApply.matchScore
      })
    });

    const resJson = await res.json();
    if (resJson.success) {
      state.appliedInternships.push({
        internshipId: activeInternshipForApply.id,
        applicationId: resJson.application.applicationId
      });

      closeModal('modal-apply');

      document.getElementById('confirm-msg').innerText = `Application to ${activeInternshipForApply.company} successfully submitted!`;
      document.getElementById('confirm-app-id').innerText = resJson.application.applicationId;
      document.getElementById('confirm-time').innerText = resJson.application.appliedAt;

      const confModal = document.getElementById('modal-confirmation');
      confModal.classList.remove('hidden');
      confModal.classList.add('flex');

      if (state.postCompletionData) {
        renderInternships(state.postCompletionData.internships);
      }

      showToast(`Applied to ${activeInternshipForApply.company}!`, 'success');
    }
  } catch (err) {
    showToast('Application submission failed: ' + err.message, 'error');
  }
}

// LinkedIn Checklist
function renderLinkedInChecklist(checklist) {
  const container = document.getElementById('linkedin-checklist-container');
  if (!container || !checklist) return;

  container.innerHTML = '';
  checklist.forEach(item => {
    const isChecked = state.checkedLinkedInTasks.has(item.id);
    const row = document.createElement('div');
    row.className = `p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
      isChecked ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300' : 'bg-slate-950/60 border-slate-800 text-slate-200'
    }`;
    row.innerHTML = `
      <label class="flex items-center gap-3 cursor-pointer flex-grow">
        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleLinkedInTask(${item.id})" class="rounded text-blue-500 focus:ring-0 w-4 h-4 bg-slate-900 border-slate-700">
        <div>
          <span class="font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}">${item.task}</span>
          <span class="text-[10px] text-slate-400 block">${item.category || 'Profile Optimization'}</span>
        </div>
      </label>
      <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
        ${item.impact || 'High Impact'}
      </span>
    `;
    container.appendChild(row);
  });

  updateLinkedInProgress();
}

function toggleLinkedInTask(taskId) {
  if (state.checkedLinkedInTasks.has(taskId)) {
    state.checkedLinkedInTasks.delete(taskId);
  } else {
    state.checkedLinkedInTasks.add(taskId);
    showToast('LinkedIn profile task checked!', 'info');
  }
  updateLinkedInProgress();
}

function updateLinkedInProgress() {
  const badge = document.getElementById('linkedin-progress-badge');
  if (badge) {
    const total = state.postCompletionData?.linkedinChecklist?.length || 5;
    badge.innerText = `${state.checkedLinkedInTasks.size} of ${total} Completed`;
  }
}

// Automated AI Resume Builder (Strictly Uses Candidate Profile Intake Details)
async function generateAiResume() {
  const btn = document.getElementById('btn-regenerate-resume');
  if (btn) btn.disabled = true;

  try {
    const res = await fetch('/api/generate-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        candidateName: state.candidate.name || 'Candidate',
        email: state.candidate.email,
        phone: state.candidate.mobile,
        city: state.candidate.city,
        state: state.candidate.state,
        github: state.candidate.github,
        linkedin: state.candidate.linkedin,
        branch: state.candidate.branch,
        college: state.candidate.college,
        targetField: state.candidate.targetField,
        currentSkills: state.candidate.currentSkills,
        experienceLevel: state.candidate.experienceLevel
      })
    });

    const resJson = await res.json();
    if (resJson.success && resJson.data) {
      state.resumeData = resJson.data;
      renderResumePreview(resJson.data);
    }
  } catch (err) {
    console.error('Resume generation error:', err);
  } finally {
    if (btn) btn.disabled = false;
    initIcons();
  }
}

function renderResumePreview(resume) {
  const container = document.getElementById('resume-container');
  if (!container || !resume) return;

  const candidateName = state.candidate.name || resume.fullName || 'Candidate';
  const email = state.candidate.email || resume.contact?.email || '';
  const phone = state.candidate.mobile || resume.contact?.phone || '';
  const locationStr = (state.candidate.city && state.candidate.state)
    ? `${state.candidate.city}, ${state.candidate.state}`
    : (resume.contact?.location || 'India');
  const github = state.candidate.github || resume.contact?.github || '';
  const linkedin = state.candidate.linkedin || resume.contact?.linkedin || '';

  container.innerHTML = `
    <div class="space-y-6 text-slate-100">
      
      <!-- Resume Header -->
      <div class="border-b border-slate-800 pb-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-2xl font-black tracking-tight text-white">${candidateName}</h2>
            <p class="text-sm font-bold text-emerald-400 mt-0.5">${resume.headline || (state.candidate.targetField + ' Engineer | KaushalSetu Certified')}</p>
          </div>
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
              ATS Alignment Score: ${resume.atsScore || 97}/100
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 text-xs text-slate-400 mt-3">
          ${email ? `<span>📧 ${email}</span>` : ''}
          ${phone ? `<span>📞 ${phone}</span>` : ''}
          <span>📍 ${locationStr}</span>
          ${github ? `<span>🔗 ${github}</span>` : ''}
          ${linkedin ? `<span>💼 ${linkedin}</span>` : ''}
        </div>
      </div>

      <!-- Professional Summary -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">Professional Summary</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${resume.professionalSummary}</p>
      </div>

      <!-- Technical Skills Matrix -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Technical Skills & Competencies</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          ${Object.entries(resume.skillsCategorized || {}).map(([cat, skills]) => `
            <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span class="font-bold text-slate-200 block text-[11px] mb-1">${cat}:</span>
              <span class="text-slate-400 text-[11px]">${Array.isArray(skills) ? skills.join(', ') : skills}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Key Production Projects -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Key Production Projects</h4>
        <div class="space-y-3">
          ${(resume.projects || []).map(p => `
            <div class="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-white">${p.title}</span>
                <span class="text-[10px] text-slate-400 font-mono">${(p.techStack || []).join(' • ')}</span>
              </div>
              <ul class="list-disc list-inside space-y-1 text-xs text-slate-300">
                ${(p.bullets || []).map(b => `<li class="leading-snug">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Education & SIH Credentials -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
        <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <h5 class="font-bold text-slate-200 text-xs mb-1">Education</h5>
          <p class="font-semibold text-white">${resume.education?.degree || (state.candidate.branch ? 'B.Tech in ' + state.candidate.branch : 'B.Tech in Computer Science')}</p>
          <p class="text-slate-400 text-[11px]">${state.candidate.college || resume.education?.institution || 'AICTE Approved Engineering Institution'} (${resume.education?.year || '2022-2026'})</p>
          <p class="text-emerald-400 font-bold text-[11px] mt-0.5">CGPA: ${resume.education?.cgpa || '8.8 / 10.0'}</p>
        </div>

        <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <h5 class="font-bold text-slate-200 text-xs mb-1">National Credentials & Honors</h5>
          <ul class="space-y-1 text-[11px] text-slate-300">
            ${(resume.certifications || []).map(c => `<li>🎖 ${c}</li>`).join('')}
          </ul>
        </div>
      </div>

    </div>
  `;
  initIcons();
}

// BULLETPROOF PRINT / EXPORT PDF FUNCTION (Zero blank pages)
function printResume() {
  if (!state.resumeData) {
    showToast('Please generate the resume first!', 'warning');
    return;
  }

  const resume = state.resumeData;
  const candidateName = state.candidate.name || resume.fullName || 'Candidate';
  const email = state.candidate.email || resume.contact?.email || '';
  const phone = state.candidate.mobile || resume.contact?.phone || '';
  const locationStr = (state.candidate.city && state.candidate.state)
    ? `${state.candidate.city}, ${state.candidate.state}`
    : (resume.contact?.location || 'India');
  const github = state.candidate.github || resume.contact?.github || '';
  const linkedin = state.candidate.linkedin || resume.contact?.linkedin || '';

  const printTarget = document.getElementById('print-mount-point');
  if (!printTarget) return;

  // Build clean, professional ATS print markup
  printTarget.innerHTML = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.4; padding: 0; margin: 0;">
      
      <!-- Print Header -->
      <div class="print-border-b" style="border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 12px;">
        <h1 style="font-size: 22pt; font-weight: bold; margin: 0; text-transform: uppercase;">${candidateName}</h1>
        <p style="font-size: 11pt; font-weight: bold; color: #047857; margin: 2px 0 6px 0;">${resume.headline || (state.candidate.targetField + ' Engineer | KaushalSetu SIH Certified')}</p>
        <div style="font-size: 9.5pt; color: #444; display: flex; flex-wrap: wrap; gap: 14px;">
          ${email ? `<span>Email: ${email}</span>` : ''}
          ${phone ? `<span>Phone: ${phone}</span>` : ''}
          <span>Location: ${locationStr}</span>
          ${github ? `<span>GitHub: ${github}</span>` : ''}
          ${linkedin ? `<span>LinkedIn: ${linkedin}</span>` : ''}
        </div>
      </div>

      <!-- Professional Summary -->
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin: 0 0 6px 0; color: #047857;">Professional Summary</h3>
        <p style="font-size: 9.5pt; margin: 0; text-align: justify;">${resume.professionalSummary}</p>
      </div>

      <!-- Technical Skills Matrix -->
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin: 0 0 6px 0; color: #047857;">Technical Skills</h3>
        <div style="font-size: 9.5pt;">
          ${Object.entries(resume.skillsCategorized || {}).map(([cat, skills]) => `
            <div style="margin-bottom: 3px;">
              <strong>${cat}:</strong> ${Array.isArray(skills) ? skills.join(', ') : skills}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Key Projects -->
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin: 0 0 6px 0; color: #047857;">Key Production Projects</h3>
        ${(resume.projects || []).map(p => `
          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 10pt; font-weight: bold;">
              <span>${p.title}</span>
              <span style="font-size: 8.5pt; font-weight: normal; color: #555;">${(p.techStack || []).join(' • ')}</span>
            </div>
            <ul style="margin: 3px 0 0 16px; padding: 0; font-size: 9pt;">
              ${(p.bullets || []).map(b => `<li style="margin-bottom: 2px;">${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Education & Credentials -->
      <div style="display: flex; gap: 20px; font-size: 9.5pt; margin-top: 10px;">
        <div style="flex: 1;">
          <h3 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin: 0 0 6px 0; color: #047857;">Education</h3>
          <p style="font-weight: bold; margin: 0;">${resume.education?.degree || (state.candidate.branch ? 'B.Tech in ' + state.candidate.branch : 'B.Tech in Computer Science')}</p>
          <p style="margin: 2px 0 0 0; color: #444;">${state.candidate.college || resume.education?.institution || 'AICTE Approved Engineering Institution'}</p>
          <p style="margin: 2px 0 0 0; color: #047857; font-weight: bold;">CGPA: ${resume.education?.cgpa || '8.8 / 10.0'}</p>
        </div>
        <div style="flex: 1;">
          <h3 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin: 0 0 6px 0; color: #047857;">Credentials</h3>
          <ul style="margin: 0 0 0 16px; padding: 0; font-size: 9pt;">
            ${(resume.certifications || []).map(c => `<li style="margin-bottom: 2px;">${c}</li>`).join('')}
          </ul>
        </div>
      </div>

    </div>
  `;

  // Trigger print
  window.print();
}

// Modal Controllers
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('flex');
  }
}

// Toast Notifications System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeStyles = {
    success: 'bg-emerald-950 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950 border-rose-500/50 text-rose-200',
    warning: 'bg-amber-950 border-amber-500/50 text-amber-200',
    info: 'bg-slate-900 border-blue-500/50 text-blue-200'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.className = `px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-md transition transform translate-y-2 opacity-0 pointer-events-auto ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span> <span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
