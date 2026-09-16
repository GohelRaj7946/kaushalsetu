const { callGemini } = require('./geminiClient');
const {
  getFallbackGapAnalysis,
  getFallbackRoadmap,
  getFallbackPostCompletionData,
  getFallbackLiveJobs,
  getFallbackResume
} = require('./mockData');

async function analyzeSkillGap({ name, branch, college, targetField, currentSkills, experienceLevel }) {
  const prompt = `You are KaushalSetu AI, an expert National Industry-Academia Skill Alignment Engine for the Smart India Hackathon.
Evaluate the candidate against 2025-2026 industry demand for their target field.

Candidate Details:
- Name: ${name || 'Candidate'}
- Engineering Branch: ${branch || 'Computer Engineering'}
- Target Field: ${targetField}
- Current Skills: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills}
- Experience Level: ${experienceLevel || 'Beginner'}

INSTRUCTIONS:
1. Conduct an accurate Skill Gap Analysis comparing current skills against top tier industry job requirements for ${targetField}.
2. CRITICAL CONSISTENCY REQUIREMENT:
   - For every skill listed in Current Stated Skills (${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills || 'None'}), mark it as status: "Mastered", userProficiencyPercentage: 85-95, heatLevel: "high".
   - For essential industry skills required for ${targetField} that the candidate did NOT state, mark them as status: "Critical Gap" (userProficiencyPercentage: 15-35, heatLevel: "critical-gap") or "Needs Practice" (userProficiencyPercentage: 50-65, heatLevel: "medium").
   - All evaluated skills in the heatmap must strictly belong to ${targetField} domain.
3. Determine an Overall Skill Match Percentage (0-100) reflecting the ratio of Mastered skills:
   - If match score >= 70%, set branchingTrigger to "high_skill_match" and readinessStatus to "High Skill Match (Placement Ready)".
   - Otherwise, set branchingTrigger to "low_skill_gap" and readinessStatus to "Skill Gap Identified".
4. Generate a comprehensive "Real-time Skill Heatmap" with 4-5 categories directly relevant to ${targetField}.
5. Each skill inside categories must have:
   - name: string
   - demandPercentage: number (75 to 98 representing industry market demand)
   - userProficiencyPercentage: number (85-95 if in Current Stated Skills, 15-35 if gap)
   - status: "Mastered" | "Needs Practice" | "Critical Gap"
   - marketTrend: "Surging" | "High Demand" | "Stable"
   - heatLevel: "high" | "medium" | "critical-gap"

Return ONLY a valid JSON object matching this schema:
{
  "candidateName": "${name || 'Candidate'}",
  "targetField": "${targetField}",
  "overallMatchScore": 44,
  "industryDemandLevel": "Surging (94% Hiring Surge)",
  "readinessStatus": "Skill Gap Identified",
  "branchingTrigger": "low_skill_gap",
  "summary": "Strategic gap analysis overview",
  "strengths": ["string", "string"],
  "criticalGaps": ["string", "string", "string"],
  "heatmap": [
    {
      "categoryName": "Core Technologies",
      "skills": [
        {
          "name": "string",
          "demandPercentage": 95,
          "userProficiencyPercentage": 40,
          "status": "Critical Gap",
          "marketTrend": "Surging",
          "heatLevel": "critical-gap"
        }
      ]
    }
  ]
}`;

  try {
    const result = await callGemini(prompt);
    if (result && result.heatmap && result.overallMatchScore !== undefined) {
      console.log('Gemini API successfully analyzed skill gap in real-time.');
      return result;
    }
    throw new Error('Invalid structure received from Gemini');
  } catch (err) {
    console.warn('Gemini API call failed or rate limited. Falling back to high-fidelity fail-safe generator. Error:', err.message);
    return getFallbackGapAnalysis({ name, targetField, currentSkills, experienceLevel });
  }
}

async function generateRoadmap({ targetField, criticalGaps, currentSkills, experienceLevel }) {
  const prompt = `You are KaushalSetu AI. Create a personalized, interactive industry-aligned Learning Roadmap to bridge the skill gaps for:
Target Field: ${targetField}
Critical Gaps to bridge: ${Array.isArray(criticalGaps) ? criticalGaps.join(', ') : criticalGaps || 'Key industry frameworks'}
Current Foundation: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills || 'Fundamentals'}

REQUIREMENTS:
1. Provide 4 progressive modules from foundational gap-closing to advanced industry deployment.
2. For each module, include:
   - moduleId: number (1 to 4)
   - title: string
   - description: string
   - durationWeeks: string (e.g., "2 Weeks")
   - difficulty: "Beginner" | "Intermediate" | "Advanced"
   - coreTopics: array of 3-4 strings
   - youtubeCourses: 2 high-quality YouTube tutorial recommendations. All ratings must be between 4.0 and 4.5 out of 5, with recognized domain instructors/channels (NPTEL, freeCodeCamp, MIT OpenCourseWare, Edureka, RealPars, FastBit, etc.), duration, and url pointing to a guaranteed YouTube search query tailored specifically to ${targetField} (e.g., https://www.youtube.com/results?search_query=${encodeURIComponent(targetField)}+course+playlist). Never output fake 'playlist?list=' IDs.
   - githubProjects: 1 practical production-ready project blueprint with title, description, keyFeatures array, techStack array, and repoIdea.
   - leetCodePractice: { topic: string, targetCount: number, difficulty: string, problems: [{ title: string, url: string, difficulty: string }] } with 4-5 real clickable LeetCode problem links!
   - totalLecturesTarget: number
   - totalQuestionsTarget: number

Return ONLY valid JSON matching this schema:
{
  "domain": "${targetField}",
  "estimatedWeeks": 8,
  "recommendedDailyHours": 3,
  "modules": [
    {
      "moduleId": 1,
      "title": "string",
      "description": "string",
      "durationWeeks": "2 Weeks",
      "difficulty": "Intermediate",
      "coreTopics": ["string", "string"],
      "youtubeCourses": [
        {
          "title": "string",
          "channel": "string",
          "rating": 4.4,
          "duration": "4h 20m",
          "totalLectures": 16,
          "url": "https://www.youtube.com/results?search_query=${encodeURIComponent(targetField)}+full+course+playlist",
          "thumbnailTopic": "string"
        }
      ],
      "githubProjects": [
        {
          "title": "string",
          "description": "string",
          "keyFeatures": ["string", "string"],
          "techStack": ["string", "string"],
          "repoIdea": "string"
        }
      ],
      "leetCodePractice": {
        "topic": "string",
        "targetCount": 10,
        "difficulty": "Medium",
        "problems": [
          { "title": "Two Sum", "url": "https://leetcode.com/problems/two-sum/", "difficulty": "Easy" }
        ]
      },
      "totalLecturesTarget": 20,
      "totalQuestionsTarget": 10
    }
  ]
}`;

  try {
    const result = await callGemini(prompt);
    if (result && result.modules && result.modules.length > 0) {
      // Sanitize youtubeCourses URLs to guarantee 100% working links
      result.modules.forEach(mod => {
        if (Array.isArray(mod.youtubeCourses)) {
          mod.youtubeCourses = mod.youtubeCourses.map(course => {
            let url = (course.url || '').trim();
            if (!url || url.includes('playlist?list=') || url.includes('...')) {
              const query = `${course.channel || ''} ${course.title || ''} playlist`.trim();
              url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            }
            return { ...course, url };
          });
        }
      });
      console.log('Gemini API successfully generated personalized roadmap.');
      return result;
    }
    throw new Error('Invalid roadmap structure');
  } catch (err) {
    console.warn('Gemini API call failed for roadmap. Falling back to high-fidelity generator. Error:', err.message);
    return getFallbackRoadmap({ targetField });
  }
}

async function getPostCompletionData({ targetField, candidateName }) {
  const prompt = `You are KaushalSetu AI. Return post-completion industry opportunities for a candidate who has achieved 100% completion in their ${targetField} roadmap.

Return strictly valid JSON:
{
  "hackathonsAndSummits": {
    "hackathons": [
      {
        "id": "h1",
        "title": "Smart India Hackathon (SIH 2025/2026)",
        "organizer": "Ministry of Education & AICTE",
        "prizePool": "₹1,00,000 / Problem Statement",
        "deadline": "October 30, 2026",
        "mode": "Nationwide Hybrid",
        "tags": ["Govt of India", "Industry Problems", "National Stage"],
        "link": "https://www.sih.gov.in/"
      }
    ],
    "bootcamps": [
      { "id": "b1", "title": "string", "mentor": "string", "duration": "string", "status": "string", "focus": "string", "registerUrl": "https://www.scaler.com/" }
    ],
    "summits": [
      { "id": "s1", "title": "string", "organizer": "string", "date": "string", "mode": "string", "perk": "string" }
    ]
  },
  "internships": [
    {
      "id": "int-1",
      "company": "string",
      "logoInitials": "string",
      "role": "string",
      "stipend": "₹45,000 / month",
      "location": "Remote / Bengaluru",
      "duration": "6 Months",
      "requiredSkills": ["string", "string"],
      "matchScore": 96,
      "openings": 3,
      "deadline": "Closing soon",
      "description": "string"
    }
  ],
  "linkedinChecklist": [
    { "id": 1, "task": "string", "category": "string", "impact": "string" }
  ],
  "careerTips": ["string", "string"]
}`;

  try {
    const result = await callGemini(prompt);
    if (result && result.internships && result.hackathonsAndSummits) {
      console.log('Gemini API successfully fetched post-completion data.');
      return result;
    }
    throw new Error('Invalid post-completion structure');
  } catch (err) {
    console.warn('Gemini API call failed for post completion. Falling back to high-fidelity generator. Error:', err.message);
    return getFallbackPostCompletionData({ targetField });
  }
}

async function getLiveJobs({ targetField }) {
  const prompt = `You are KaushalSetu AI. Provide 6 live, verified full-time tech job openings in India for 2026 matching: ${targetField || 'Full Stack Web Development'}.

Return ONLY valid JSON array:
[
  {
    "id": "job-1",
    "company": "Google India",
    "logoInitials": "GOOG",
    "role": "Associate Software Engineer",
    "package": "₹28 - ₹34 LPA",
    "location": "Bengaluru (Hybrid)",
    "experience": "0 - 1 Years / Fresher",
    "type": "Full-Time",
    "skills": ["TypeScript", "Distributed Systems", "Cloud", "DSA"],
    "matchScore": 97,
    "openings": 4,
    "deadline": "Apply in 5 days",
    "description": "Architect and deploy mission-critical distributed services and scalable consumer web applications."
  }
]`;

  try {
    const result = await callGemini(prompt);
    if (result && Array.isArray(result) && result.length > 0) {
      console.log('Gemini API successfully fetched live job openings.');
      return result;
    }
    throw new Error('Invalid live jobs structure');
  } catch (err) {
    console.warn('Gemini API call failed for live jobs. Falling back to high-fidelity generator. Error:', err.message);
    return getFallbackLiveJobs({ targetField });
  }
}

async function generateResume({ candidateName, email, phone, city, state, github, linkedin, targetField, education, branch, currentSkills }) {
  const name = candidateName || 'Candidate';
  const locationStr = (city && state) ? `${city}, ${state}` : (city || state || 'India');
  const degreeStr = branch ? `Bachelor of Technology in ${branch}` : (education || 'Bachelor of Technology');

  const prompt = `You are KaushalSetu AI Resume Architect.
Generate an ATS-friendly, high-impact resume tailored for ${targetField} for:
Candidate Name: ${name}
Email: ${email || name.toLowerCase().replace(/\s+/g, '.') + '@kaushalsetu.gov.in'}
Phone: ${phone || '+91 98765 43210'}
Location: ${locationStr}
GitHub: ${github || 'github.com/' + name.toLowerCase().replace(/\s+/g, '')}
LinkedIn: ${linkedin || 'linkedin.com/in/' + name.toLowerCase().replace(/\s+/g, '')}
Education: ${degreeStr}
Skills: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills}

Return ONLY valid JSON:
{
  "fullName": "${name}",
  "headline": "${targetField} Engineer | KaushalSetu SIH Certified",
  "contact": {
    "email": "${email || name.toLowerCase().replace(/\s+/g, '.') + '@kaushalsetu.gov.in'}",
    "phone": "${phone || '+91 98765 43210'}",
    "location": "${locationStr}",
    "github": "${github || 'github.com/' + name.toLowerCase().replace(/\s+/g, '')}",
    "linkedin": "${linkedin || 'linkedin.com/in/' + name.toLowerCase().replace(/\s+/g, '')}"
  },
  "atsScore": 97,
  "professionalSummary": "3-4 concise impact-driven sentences",
  "skillsCategorized": {
    "Programming & Core": ["string"],
    "Frameworks & Web": ["string"],
    "Databases & Cloud": ["string"],
    "Tools & Practices": ["string"]
  },
  "projects": [
    {
      "title": "string",
      "techStack": ["string", "string"],
      "liveUrl": "string",
      "bullets": [
        "Architected and deployed...",
        "Optimized latency by 35%...",
        "Implemented secure JWT authentication..."
      ]
    }
  ],
  "education": {
    "degree": "${degreeStr}",
    "institution": "AICTE Approved Engineering Institution",
    "year": "2022 - 2026",
    "cgpa": "8.8 / 10.0"
  },
  "certifications": [
    "KaushalSetu Industry Skill Alignment Credential (Verified by SIH)",
    "Full-Stack Cloud & Architecture Professional"
  ]
}`;

  try {
    const result = await callGemini(prompt);
    if (result && result.professionalSummary && result.projects) {
      // Overwrite name and contact to guarantee candidate's actual registered details
      result.fullName = name;
      result.contact = result.contact || {};
      if (email) result.contact.email = email;
      if (phone) result.contact.phone = phone;
      if (locationStr) result.contact.location = locationStr;
      if (github) result.contact.github = github;
      if (linkedin) result.contact.linkedin = linkedin;
      if (degreeStr && result.education) result.education.degree = degreeStr;

      console.log('Gemini API successfully generated professional resume for:', name);
      return result;
    }
    throw new Error('Invalid resume structure');
  } catch (err) {
    console.warn('Gemini API call failed for resume. Falling back to high-fidelity generator. Error:', err.message);
    return getFallbackResume({ candidateName: name, email, phone, city, state, github, linkedin, college: education, branch, targetField });
  }
}

module.exports = {
  analyzeSkillGap,
  generateRoadmap,
  getPostCompletionData,
  getLiveJobs,
  generateResume
};
