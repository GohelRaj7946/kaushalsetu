const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

// In-memory store for simulated applications
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

// 5. In-App Job Application (Phase 4)
router.post('/apply-job', (req, res) => {
  try {
    const { jobId, company, role, candidateName, email, resumeLink, experienceLevel } = req.body;

    if (!candidateName || !email) {
      return res.status(400).json({ error: 'Name and Email are required' });
    }

    const applicationRecord = {
      applicationId: 'KS-JOB-' + Math.floor(100000 + Math.random() * 900000),
      jobId,
      company: company || 'Tech Employer',
      role: role || 'Software Engineer',
      candidateName,
      email,
      resumeLink: resumeLink || 'https://drive.google.com/view/kaushalsetu-resume',
      experienceLevel: experienceLevel || 'Fresher',
      status: 'Application Received & Fast-Tracked',
      appliedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    appliedJobs.unshift(applicationRecord);

    res.json({
      success: true,
      message: `Successfully applied to ${company} for ${role}!`,
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
      state,
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
      state,
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

// 7. 1-Click Internship Apply Simulation (Phase 3)
router.post('/apply-internship', (req, res) => {
  try {
    const { internshipId, company, role, candidateName, email, phone, matchScore } = req.body;

    const applicationRecord = {
      applicationId: 'KS-APP-' + Math.floor(100000 + Math.random() * 900000),
      internshipId,
      company,
      role,
      candidateName: candidateName || 'Candidate',
      email: email || 'candidate@kaushalsetu.gov.in',
      phone: phone || '+91 98765 43210',
      matchScore: matchScore || 96,
      status: 'Application Submitted & Verified',
      atsStatus: 'Pre-Screen Passed (Direct Fast-Track)',
      appliedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    appliedApplications.unshift(applicationRecord);

    res.json({
      success: true,
      message: `Successfully applied to ${company} for ${role}!`,
      application: applicationRecord
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application', details: error.message });
  }
});

module.exports = router;
