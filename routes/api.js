const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

// Unified in-memory store for candidate applications (with realistic seed data across branches)
const candidateApplications = [
  {
    applicationId: 'KS-APP-810921',
    jobId: 'int-rob-01',
    company: 'KUKA Robotics India',
    role: 'Robotics & Industrial Automation Intern',
    type: 'Verified Internship',
    candidateName: 'Raj Gohel',
    email: 'raj.gohel@gmail.com',
    phone: '+91 98765 43210',
    city: 'Ahmedabad',
    state: 'Gujarat',
    branch: 'Mechanical & Mechatronics',
    college: 'Gujarat Technological University',
    targetField: 'Robotics & Mechatronics',
    experienceLevel: 'Fresher / Final Year',
    matchScore: 98,
    atsScore: 98,
    verifiedSkills: ['ROS 2', 'C++', 'Kinematics', 'SLAM', 'Gazebo Fortress', 'Python'],
    roadmapCompleted: true,
    github: 'https://github.com/GohelRaj7946',
    linkedin: 'https://linkedin.com/in/rajgohel',
    resumeLink: 'https://github.com/GohelRaj7946',
    status: 'Shortlisted',
    appliedAt: '16 Sep 2026, 10:30 AM',
    recruiterNotes: 'Exceptional competency in ROS 2 Nav2 navigation stack and inverse kinematics. Shortlisted for technical round.',
    interviewDetails: null,
    offerDetails: null
  },
  {
    applicationId: 'KS-JOB-541203',
    jobId: 'job-vlsi-01',
    company: 'Qualcomm India',
    role: 'RTL Design & SystemVerilog Engineer',
    type: 'Full-Time Job',
    candidateName: 'Priya Sharma',
    email: 'priya.sharma@nitk.edu.in',
    phone: '+91 98123 45678',
    city: 'Bengaluru',
    state: 'Karnataka',
    branch: 'Electronics & Communication Engineering',
    college: 'NIT Karnataka, Surathkal',
    targetField: 'VLSI & Hardware Architecture',
    experienceLevel: 'Fresher',
    matchScore: 97,
    atsScore: 96,
    verifiedSkills: ['SystemVerilog', 'UVM Methodology', 'RTL Synthesis', 'Verilog', 'DRC/LVS'],
    roadmapCompleted: true,
    github: 'https://github.com/priyasharma-vlsi',
    linkedin: 'https://linkedin.com/in/priyasharma-vlsi',
    resumeLink: 'https://github.com/priyasharma-vlsi',
    status: 'Interview Scheduled',
    appliedAt: '15 Sep 2026, 04:15 PM',
    recruiterNotes: 'Top 3% score in UVM testbench design. Technical evaluation round scheduled with Senior Hardware Director.',
    interviewDetails: {
      date: '2026-09-22',
      time: '11:00 AM IST',
      interviewer: 'Dr. S. K. Nair (Director of Silicon Design)',
      meetingLink: 'https://meet.google.com/qcm-vlsi-interview'
    },
    offerDetails: null
  },
  {
    applicationId: 'KS-JOB-923841',
    jobId: 'job-ev-01',
    company: 'Ather Energy',
    role: 'Battery Management System (BMS) Firmware Engineer',
    type: 'Full-Time Job',
    candidateName: 'Aditya Varma',
    email: 'aditya.varma@iitb.ac.in',
    phone: '+91 97654 32109',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Electrical & Electronics Engineering',
    college: 'IIT Bombay',
    targetField: 'Electric Vehicle (EV) Powertrains',
    experienceLevel: 'Fresher',
    matchScore: 96,
    atsScore: 95,
    verifiedSkills: ['BMS Architecture', 'CAN Bus Communication', 'MATLAB/Simulink', 'FOC Motor Control', 'Embedded C'],
    roadmapCompleted: true,
    github: 'https://github.com/aditya-ev-powertrain',
    linkedin: 'https://linkedin.com/in/adityavarma-ev',
    resumeLink: 'https://github.com/aditya-ev-powertrain',
    status: 'Selected (Offer Extended)',
    appliedAt: '14 Sep 2026, 02:40 PM',
    recruiterNotes: 'Outstanding Coulomb counting SOC estimation accuracy and ISO 26262 functional safety awareness.',
    interviewDetails: null,
    offerDetails: {
      designation: 'Associate BMS Firmware Engineer',
      ctcOrStipend: '₹16,50,000 / annum (₹16.5 LPA)',
      joiningDate: '2026-11-01',
      location: 'Bengaluru R&D HQ',
      offerRef: 'ATH-OFFER-2026-0914'
    }
  },
  {
    applicationId: 'KS-JOB-774102',
    jobId: 'job-genai-01',
    company: 'Microsoft Research India',
    role: 'Generative AI & LLM Systems Engineer',
    type: 'Full-Time Job',
    candidateName: 'Ananya Patel',
    email: 'ananya.patel@iiit.ac.in',
    phone: '+91 99887 76655',
    city: 'Hyderabad',
    state: 'Telangana',
    branch: 'Artificial Intelligence & Data Science',
    college: 'IIIT Hyderabad',
    targetField: 'Generative AI & LLM Systems',
    experienceLevel: 'Fresher / Masters',
    matchScore: 99,
    atsScore: 98,
    verifiedSkills: ['LangChain', 'RAG Architecture', 'Vector Databases', 'PyTorch', 'LoRA / QLoRA', 'FastAPI'],
    roadmapCompleted: true,
    github: 'https://github.com/ananya-genai',
    linkedin: 'https://linkedin.com/in/ananya-genai',
    resumeLink: 'https://github.com/ananya-genai',
    status: 'Selected (Offer Extended)',
    appliedAt: '16 Sep 2026, 09:10 AM',
    recruiterNotes: 'Engineered sub-100ms multi-agent retrieval system with zero hallucination rate on enterprise benchmarks.',
    interviewDetails: null,
    offerDetails: {
      designation: 'Applied AI Research Engineer',
      ctcOrStipend: '₹28,00,000 / annum (₹28.0 LPA)',
      joiningDate: '2026-10-15',
      location: 'Bengaluru Research Campus',
      offerRef: 'MSR-OFFER-2026-0812'
    }
  },
  {
    applicationId: 'KS-APP-339812',
    jobId: 'int-bim-01',
    company: 'Larsen & Toubro Construction (L&T)',
    role: 'BIM Modeling & 4D Scheduling Intern',
    type: 'Verified Internship',
    candidateName: 'Rohan Deshmukh',
    email: 'rohan.d@coep.ac.in',
    phone: '+91 91234 56780',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'Civil / Other Engineering',
    college: 'COEP Technological University',
    targetField: 'Construction Tech & BIM Modeling',
    experienceLevel: 'Final Year',
    matchScore: 95,
    atsScore: 94,
    verifiedSkills: ['Autodesk Revit', 'Navisworks Manage', 'Clash Detection', 'AutoCAD', '4D BIM Scheduling'],
    roadmapCompleted: true,
    github: 'https://github.com/rohan-bim',
    linkedin: 'https://linkedin.com/in/rohandeshmukh',
    resumeLink: 'https://github.com/rohan-bim',
    status: 'Under Review',
    appliedAt: '15 Sep 2026, 11:25 AM',
    recruiterNotes: 'Solid portfolio in multidisciplinary Revit coordination with zero hard clashes on elevated viaduct structures.',
    interviewDetails: null,
    offerDetails: null
  },
  {
    applicationId: 'KS-JOB-110294',
    jobId: 'job-02',
    company: 'Razorpay Technologies',
    role: 'Software Development Engineer - 1 (SDE-1)',
    type: 'Full-Time Job',
    candidateName: 'Siddharth Mehta',
    email: 'siddharth.m@bmsce.ac.in',
    phone: '+91 93456 78901',
    city: 'Bengaluru',
    state: 'Karnataka',
    branch: 'Computer Science & Engineering',
    college: 'B.M.S. College of Engineering',
    targetField: 'Full Stack Web Development',
    experienceLevel: 'Fresher',
    matchScore: 98,
    atsScore: 97,
    verifiedSkills: ['Node.js', 'TypeScript', 'React.js', 'PostgreSQL', 'Redis', 'Docker', 'Clean Architecture'],
    roadmapCompleted: true,
    github: 'https://github.com/sidmehta-dev',
    linkedin: 'https://linkedin.com/in/sidmehta-dev',
    resumeLink: 'https://github.com/sidmehta-dev',
    status: 'Shortlisted',
    appliedAt: '16 Sep 2026, 06:50 PM',
    recruiterNotes: 'High-throughput flash sale order engine with distributed locking via Redis. Highly recommended by screening AI.',
    interviewDetails: null,
    offerDetails: null
  }
];

// Legacy arrays kept for backward-compatibility
const appliedApplications = [];
const appliedJobs = [];

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'KaushalSetu (Smart India Hackathon)',
    model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
    timestamp: new Date().toISOString()
  });
});

// 1. Skill Gap Analysis & Heatmap
router.post('/analyze-gap', async (req, res) => {
  try {
    const { name, branch, college, targetField, currentSkills, experienceLevel } = req.body;
    
    if (!targetField) {
      return res.status(400).json({ error: 'targetField is required' });
    }

    const analysis = await geminiService.analyzeSkillGap({
      name,
      branch,
      college,
      targetField,
      currentSkills,
      experienceLevel
    });

    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Error in /api/analyze-gap:', error);
    res.status(500).json({ error: 'Failed to analyze skill gap', details: error.message });
  }
});

// 2. Interactive Learning Roadmap Generation
router.post('/generate-roadmap', async (req, res) => {
  try {
    const { targetField, criticalGaps, currentSkills, experienceLevel } = req.body;

    if (!targetField) {
      return res.status(400).json({ error: 'targetField is required' });
    }

    const roadmap = await geminiService.generateRoadmap({
      targetField,
      criticalGaps,
      currentSkills,
      experienceLevel
    });

    res.json({ success: true, data: roadmap });
  } catch (error) {
    console.error('Error in /api/generate-roadmap:', error);
    res.status(500).json({ error: 'Failed to generate roadmap', details: error.message });
  }
});

// 3. Post Completion Data (Hackathons, Bootcamps, Summits, Internships, LinkedIn Checklist)
router.get('/post-completion-data', async (req, res) => {
  try {
    const { targetField = 'Full Stack Web Development', candidateName = 'Candidate' } = req.query;

    const postData = await geminiService.getPostCompletionData({
      targetField,
      candidateName
    });

    res.json({ success: true, data: postData });
  } catch (error) {
    console.error('Error in /api/post-completion-data:', error);
    res.status(500).json({ error: 'Failed to retrieve post-completion data', details: error.message });
  }
});

// 4. Live Full-Time Job Openings (Phase 4)
router.get('/live-jobs', async (req, res) => {
  try {
    const { targetField = 'Full Stack Web Development' } = req.query;
    const jobs = await geminiService.getLiveJobs({ targetField });
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error in /api/live-jobs:', error);
    res.status(500).json({ error: 'Failed to fetch live jobs', details: error.message });
  }
});

// 5. In-App Job Application (Phase 4) - Direct Transmission to Employer Pool
router.post('/apply-job', (req, res) => {
  try {
    const {
      jobId,
      company,
      role,
      candidateName,
      email,
      phone,
      city,
      state: candidateState,
      branch,
      college,
      targetField,
      resumeLink,
      experienceLevel,
      matchScore,
      atsScore,
      verifiedSkills,
      github,
      linkedin,
      resumeData
    } = req.body;

    if (!candidateName || !email) {
      return res.status(400).json({ error: 'Name and Email are required' });
    }

    const applicationRecord = {
      applicationId: 'KS-JOB-' + Math.floor(100000 + Math.random() * 900000),
      jobId,
      company: company || 'Tech Employer',
      role: role || 'Software Engineer',
      type: 'Full-Time Job',
      candidateName,
      email,
      phone: phone || '+91 98765 43210',
      city: city || 'Ahmedabad',
      state: candidateState || 'Gujarat',
      branch: branch || 'Computer Science & Engineering',
      college: college || 'AICTE Approved Engineering College',
      targetField: targetField || 'Software Engineering',
      resumeLink: resumeLink || github || 'https://github.com/kaushalsetu-portfolio',
      experienceLevel: experienceLevel || 'Fresher / Final Year',
      matchScore: matchScore || 96,
      atsScore: atsScore || 97,
      verifiedSkills: Array.isArray(verifiedSkills) && verifiedSkills.length > 0 ? verifiedSkills : ['Foundations', 'Core Domain Skills', 'System Design'],
      roadmapCompleted: true,
      github: github || '',
      linkedin: linkedin || '',
      resumeData: resumeData || null,
      status: 'New',
      appliedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      recruiterNotes: 'Application transmitted directly from KaushalSetu SIH AI Platform.',
      interviewDetails: null,
      offerDetails: null
    };

    candidateApplications.unshift(applicationRecord);
    appliedJobs.unshift(applicationRecord);

    res.json({
      success: true,
      message: `Successfully transmitted profile directly to ${company} for ${role}!`,
      application: applicationRecord
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit job application', details: error.message });
  }
});

// 6. Automated AI Resume Builder (Strictly personalized with candidate details)
router.post('/generate-resume', async (req, res) => {
  try {
    const {
      candidateName,
      email,
      phone,
      city,
      state: candidateState,
      github,
      linkedin,
      targetField,
      education,
      branch,
      currentSkills,
      experienceLevel
    } = req.body;

    const resume = await geminiService.generateResume({
      candidateName,
      email,
      phone,
      city,
      state: candidateState,
      github,
      linkedin,
      targetField,
      education,
      branch,
      currentSkills,
      experienceLevel
    });

    res.json({ success: true, data: resume });
  } catch (error) {
    console.error('Error in /api/generate-resume:', error);
    res.status(500).json({ error: 'Failed to generate resume', details: error.message });
  }
});

// 7. 1-Click Internship Apply Simulation (Phase 3) - Direct Transmission to Employer Pool
router.post('/apply-internship', (req, res) => {
  try {
    const {
      internshipId,
      company,
      role,
      candidateName,
      email,
      phone,
      city,
      state: candidateState,
      branch,
      college,
      targetField,
      matchScore,
      atsScore,
      verifiedSkills,
      github,
      linkedin,
      resumeLink,
      resumeData
    } = req.body;

    const applicationRecord = {
      applicationId: 'KS-APP-' + Math.floor(100000 + Math.random() * 900000),
      internshipId,
      company: company || 'Partner Organization',
      role: role || 'Engineering Intern',
      type: 'Verified Internship',
      candidateName: candidateName || 'Candidate',
      email: email || 'candidate@kaushalsetu.gov.in',
      phone: phone || '+91 98765 43210',
      city: city || 'Ahmedabad',
      state: candidateState || 'Gujarat',
      branch: branch || 'Engineering Discipline',
      college: college || 'AICTE Approved Engineering College',
      targetField: targetField || 'Engineering Domain',
      resumeLink: resumeLink || github || '',
      matchScore: matchScore || 96,
      atsScore: atsScore || 95,
      verifiedSkills: Array.isArray(verifiedSkills) && verifiedSkills.length > 0 ? verifiedSkills : ['Roadmap Core Competencies'],
      roadmapCompleted: true,
      github: github || '',
      linkedin: linkedin || '',
      resumeData: resumeData || null,
      status: 'New',
      appliedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      recruiterNotes: 'Verified 100% roadmap completion candidate. Fast-tracked for screening.',
      interviewDetails: null,
      offerDetails: null
    };

    candidateApplications.unshift(applicationRecord);
    appliedApplications.unshift(applicationRecord);

    res.json({
      success: true,
      message: `Successfully transmitted profile directly to ${company} for ${role}!`,
      application: applicationRecord
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application', details: error.message });
  }
});

// =========================================================================
// 8. EMPLOYER CONNECT PORTAL API ENDPOINTS (Recruiter Console & Candidate Selection)
// =========================================================================

// Retrieve all candidate applications with optional filters
router.get('/employer/applications', (req, res) => {
  try {
    const { company, status, branch, role, search } = req.query;

    let filtered = [...candidateApplications];

    if (company && company !== 'all') {
      filtered = filtered.filter(a => a.company.toLowerCase().includes(company.toLowerCase()));
    }

    if (status && status !== 'all') {
      filtered = filtered.filter(a => a.status.toLowerCase() === status.toLowerCase());
    }

    if (branch && branch !== 'all') {
      filtered = filtered.filter(a => a.branch.toLowerCase().includes(branch.toLowerCase()));
    }

    if (role && role !== 'all') {
      filtered = filtered.filter(a => a.role.toLowerCase().includes(role.toLowerCase()));
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(a =>
        a.candidateName.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.branch.toLowerCase().includes(q) ||
        a.college.toLowerCase().includes(q) ||
        (a.verifiedSkills || []).some(s => s.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
      metrics: {
        total: candidateApplications.length,
        shortlisted: candidateApplications.filter(a => a.status === 'Shortlisted').length,
        inInterview: candidateApplications.filter(a => a.status === 'Interview Scheduled').length,
        selected: candidateApplications.filter(a => a.status.includes('Selected')).length
      }
    });
  } catch (error) {
    console.error('Error fetching employer applications:', error);
    res.status(500).json({ error: 'Failed to fetch employer applications', details: error.message });
  }
});

// Update candidate application status (Shortlist, Schedule Interview, Reject)
router.post('/employer/update-status', (req, res) => {
  try {
    const { applicationId, status, recruiterNotes, notes, interviewDetails, interviewSchedule, offerDetails } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({ error: 'applicationId and status are required' });
    }

    const application = candidateApplications.find(a => a.applicationId === applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    const noteContent = notes || recruiterNotes;
    if (noteContent) {
      application.recruiterNotes = noteContent;
      application.statusNotes = noteContent;
    }
    const scheduleContent = interviewSchedule || interviewDetails;
    if (scheduleContent) {
      application.interviewDetails = scheduleContent;
      application.interviewSchedule = scheduleContent;
    }
    if (offerDetails) application.offerDetails = offerDetails;

    res.json({
      success: true,
      message: `Candidate ${application.candidateName}'s status updated to "${status}"!`,
      application
    });
  } catch (error) {
    console.error('Error updating candidate status:', error);
    res.status(500).json({ error: 'Failed to update candidate status', details: error.message });
  }
});

// Directly Select & Extend Official Offer Letter to Candidate
router.post('/employer/extend-offer', (req, res) => {
  try {
    const { applicationId, designation, role, ctcOrStipend, compensation, joiningDate, location, notes } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: 'applicationId is required' });
    }

    const application = candidateApplications.find(a => a.applicationId === applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const offerRef = `KS-OFFER-${application.company.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const offerPayload = {
      offerRef,
      referenceNumber: offerRef,
      candidateName: application.candidateName,
      company: application.company,
      designation: designation || role || application.role,
      ctcOrStipend: ctcOrStipend || compensation || (application.type && application.type.includes('Internship') ? '₹45,000 / month' : '₹18,00,000 / annum (₹18 LPA)'),
      joiningDate: joiningDate || 'Immediate / 2026 Batch',
      location: location || (application.city ? application.city + ' / Hybrid' : 'Bangalore / Hybrid'),
      notes: notes || 'Official selection confirmed through KaushalSetu SIH AI Verified Pathway.',
      issuedDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      verificationHash: 'KS-VERIFIED-' + Buffer.from(application.applicationId + offerRef).toString('hex').slice(0, 16).toUpperCase()
    };

    application.status = 'Selected (Offer Extended)';
    application.offerDetails = offerPayload;
    if (notes) {
      application.recruiterNotes = notes;
      application.statusNotes = notes;
    }

    res.json({
      success: true,
      message: `Direct offer extended to ${application.candidateName}!`,
      offerLetter: offerPayload,
      application
    });
  } catch (error) {
    console.error('Error extending offer:', error);
    res.status(500).json({ error: 'Failed to extend offer', details: error.message });
  }
});

module.exports = router;
