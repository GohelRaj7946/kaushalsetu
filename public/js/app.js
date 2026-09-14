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
  liveJobs: [],
  resumeData: null,
  activeHeatmapFilter: 'all',
  activeHeatmapCategory: 0,
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

// Domain-specific preset skills for chips
const domainSkillsMap = {
  'Full Stack Web Development': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git', 'REST APIs', 'Tailwind CSS'],
  'AI & Machine Learning Engineering': ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'PyTorch', 'TensorFlow', 'LLMs / Prompting', 'LangChain', 'Hugging Face', 'Vector DBs', 'MLOps', 'Docker', 'Git'],
  'Generative AI & LLM Systems': ['Python', 'LangChain', 'LlamaIndex', 'RAG Architecture', 'Vector Databases', 'Hugging Face', 'Fine-Tuning', 'FastAPI', 'Docker', 'Git'],
  'Cloud Architecture & DevOps': ['Linux Shell', 'Docker', 'Kubernetes', 'AWS (EC2/S3)', 'Terraform', 'CI/CD Actions', 'Nginx', 'Prometheus', 'Grafana', 'Git', 'Networking Basics'],
  'Cyber Security & Ethical Hacking': ['Networking (TCP/IP)', 'Linux Administration', 'Burp Suite', 'Wireshark', 'Python Scripting', 'OWASP Top 10', 'Penetration Testing', 'SIEM & SOC', 'Cryptography'],
  'Data Engineering & Analytics': ['SQL', 'Python', 'Apache Spark', 'Kafka', 'Airflow', 'Snowflake / BigQuery', 'dbt', 'PostgreSQL', 'Data Warehousing', 'PowerBI'],
  'Mobile App Development': ['Dart / Flutter', 'React Native', 'JavaScript', 'TypeScript', 'Mobile UI/UX', 'Firebase', 'REST APIs', 'State Management', 'App Store Deploy', 'Git'],
  'Embedded Systems & IoT': ['C / Embedded C', 'C++', 'RTOS', 'ESP32 / Arduino', 'ARM Cortex', 'UART / I2C / SPI', 'MQTT', 'Circuit Prototyping', 'Linux Kernel'],
  'VLSI & Hardware Architecture': ['Verilog / SystemVerilog', 'VHDL', 'Digital Electronics', 'FPGA Prototyping', 'Static Timing Analysis (STA)', 'Cadence Virtuoso', 'CMOS Design'],
  'Robotics & Automation': ['ROS / ROS2', 'Python', 'C++', 'Control Systems', 'Kinematics', 'Computer Vision (OpenCV)', 'Gazebo Simulation', 'Sensors & Actuators']
};

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
}

// Render Skill Chips (Start UNSELECTED by default)
function renderSuggestedChips() {
  const container = document.getElementById('skills-chip-container');
  if (!container) return;

  const targetField = state.candidate.targetField || 'Full Stack Web Development';
  const availableSkills = domainSkillsMap[targetField] || domainSkillsMap['Full Stack Web Development'];

  container.innerHTML = '';
  availableSkills.forEach(skill => {
    const isSelected = state.candidate.currentSkills.includes(skill);
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.onclick = () => toggleSkillChip(skill);
    chip.className = `px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
      isSelected
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
    }`;
    chip.innerHTML = `${skill} ${isSelected ? '<span class="text-emerald-400">✓</span>' : '+'}`;
    container.appendChild(chip);
  });
}

function toggleSkillChip(skill) {
  const idx = state.candidate.currentSkills.indexOf(skill);
  if (idx > -1) {
    state.candidate.currentSkills.splice(idx, 1);
  } else {
    state.candidate.currentSkills.push(skill);
  }
  renderSuggestedChips();
}

function addCustomSkill() {
  const input = document.getElementById('input-custom-skill');
  const val = input.value.trim();
  if (val && !state.candidate.currentSkills.includes(val)) {
    state.candidate.currentSkills.push(val);
    input.value = '';
    renderSuggestedChips();
    showToast(`Added "${val}" to your skills!`, 'success');
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
  const score = Math.round(data.overallMatchScore || 0);
  const scoreNumberEl = document.getElementById('score-number');
  const gaugeCircle = document.getElementById('gauge-circle');
  const matchStatusBadge = document.getElementById('match-status-badge');
  const demandLevelPill = document.getElementById('demand-level-pill');

  scoreNumberEl.innerText = `${score}%`;
  const offset = 264 - (264 * score) / 100;
  gaugeCircle.style.strokeDashoffset = offset;

  if (score >= 75) {
    gaugeCircle.className.baseVal = 'text-emerald-400 transition-all duration-1000';
    matchStatusBadge.className = 'mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    matchStatusBadge.innerText = 'High Skill Alignment (Placement Ready)';
  } else {
    gaugeCircle.className.baseVal = 'text-amber-400 transition-all duration-1000';
    matchStatusBadge.className = 'mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20';
    matchStatusBadge.innerText = 'Critical Skill Gap Identified';
  }

  document.getElementById('analysis-candidate-title').innerText = `${state.candidate.name || 'Candidate'}'s Alignment for ${data.targetField}`;
  document.getElementById('analysis-summary-text').innerText = data.summary || '';
  if (data.industryDemandLevel) {
    demandLevelPill.innerText = `${data.industryDemandLevel}`;
  }

  // Strengths
  const strengthsContainer = document.getElementById('strengths-tags');
  strengthsContainer.innerHTML = '';
  (data.strengths || []).forEach(str => {
    const span = document.createElement('span');
    span.className = 'px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold';
    span.innerText = str;
    strengthsContainer.appendChild(span);
  });

  // Critical Gaps
  const gapsContainer = document.getElementById('critical-gaps-tags');
  gapsContainer.innerHTML = '';
  (data.criticalGaps || []).forEach(gap => {
    const span = document.createElement('span');
    span.className = 'px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-semibold';
    span.innerText = gap;
    gapsContainer.appendChild(span);
  });

  renderBranchingBanner(data);
  renderHeatmapCategories(data.heatmap || []);
  renderHeatmapGrid();
}

function renderBranchingBanner(data) {
  const container = document.getElementById('branching-container');
  const isHighMatch = data.overallMatchScore >= 75 || data.branchingTrigger === 'high_skill_match';

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
              Gaps identified in production frameworks, cloud deployments, and system design. KaushalSetu has prepared your 4-stage modular curriculum.
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
  tabsContainer.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = `px-3.5 py-1.5 rounded-xl transition ${state.activeHeatmapCategory === -1 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`;
  allBtn.innerText = 'All Categories';
  allBtn.onclick = () => {
    state.activeHeatmapCategory = -1;
    renderHeatmapCategories(categories);
    renderHeatmapGrid();
  };
  tabsContainer.appendChild(allBtn);

  categories.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className = `px-3.5 py-1.5 rounded-xl transition ${state.activeHeatmapCategory === idx ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`;
    btn.innerText = cat.categoryName;
    btn.onclick = () => {
      state.activeHeatmapCategory = idx;
      renderHeatmapCategories(categories);
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

    card.className = `glass-card p-4 rounded-2xl border border-slate-700/80 ${borderClass} space-y-3`;
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div>
          <span class="text-[10px] uppercase font-semibold tracking-wider text-slate-500 block">${skill.category}</span>
          <h5 class="text-sm font-bold text-white">${skill.name}</h5>
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
  const loader = document.getElementById('roadmap-loader');
  if (loader) loader.classList.remove('hidden');

  try {
    const res = await fetch('/api/generate-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetField: state.candidate.targetField,
        criticalGaps: state.assessmentData?.criticalGaps || ['Frameworks', 'DevOps', 'Databases'],
        currentSkills: state.candidate.currentSkills,
        experienceLevel: state.candidate.experienceLevel
      })
    });

    const resJson = await res.json();
    if (!resJson.success || !resJson.data) {
      throw new Error(resJson.error || 'Failed to generate roadmap');
    }

    state.roadmapData = resJson.data;
    renderRoadmap(resJson.data);

  } catch (err) {
    console.error('Roadmap error:', err);
  } finally {
    if (loader) loader.classList.add('hidden');
    initIcons();
  }
}

function renderRoadmap(data) {
  const container = document.getElementById('roadmap-modules-container');
  if (!container) return;

  document.getElementById('roadmap-domain-title').innerText = `${data.domain} Alignment Roadmap`;
  if (data.estimatedWeeks) {
    document.getElementById('roadmap-estimated-weeks').innerText = `${data.estimatedWeeks} Weeks`;
  }
  if (data.recommendedDailyHours) {
    document.getElementById('roadmap-daily-hours').innerText = `${data.recommendedDailyHours} Hours / Day`;
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
async function fetchPostCompletionData() {
  try {
    const res = await fetch(`/api/post-completion-data?targetField=${encodeURIComponent(state.candidate.targetField)}&candidateName=${encodeURIComponent(state.candidate.name || 'Candidate')}`);
    const resJson = await res.json();
    if (resJson.success && resJson.data) {
      state.postCompletionData = resJson.data;
      renderPostCompletion(resJson.data);
    }
  } catch (err) {
    console.error('Failed to pre-fetch post-completion data:', err);
  }
}

function renderPostCompletion(data) {
  renderHackathonsAndSummits(data.hackathonsAndSummits);
  renderInternships(data.internships);
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
function renderInternships(internships) {
  const container = document.getElementById('internships-grid');
  if (!container || !internships) return;

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
