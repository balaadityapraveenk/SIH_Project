import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MOCK_JOBS, 
  ALL_AVAILABLE_SKILLS, 
  STANDARD_ROLES,
  addStudentSkill, 
  removeStudentSkill,
  calculateJobMatchScore,
  performSkillGapAnalysis,
  applyForJob
} from '../services/mockData';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { 
  Award, 
  Layers, 
  Briefcase, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Search, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function StudentDashboard({ currentTab }) {
  const { user, refreshUserData } = useAuth();
  
  // States for Skill Mapping
  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState('');
  const [skillLevelToAdd, setSkillLevelToAdd] = useState(70);
  const [skillCategoryToAdd, setSkillCategoryToAdd] = useState('Frontend');
  const [skillMessage, setSkillMessage] = useState(null);

  // States for Skill Gap Analysis
  const [targetRole, setTargetRole] = useState('fullstack');
  const [gapAnalysisResult, setGapAnalysisResult] = useState(null);

  // States for Jobs Tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [appliedMessage, setAppliedMessage] = useState(null);

  // Load gap analysis on target role change
  useEffect(() => {
    if (user && user.skills) {
      const result = performSkillGapAnalysis(user.skills, targetRole);
      setGapAnalysisResult(result);
    }
  }, [user, targetRole]);

  if (!user) return <div className="p-8">Loading student session...</div>;

  // Prepare radar chart data by aggregating skills into categories
  const getRadarData = () => {
    const categories = ['Frontend', 'Backend', 'Database', 'Cloud/DevOps', 'Languages', 'Tools', 'Academic', 'Soft Skills'];
    return categories.map(cat => {
      const skillsInCat = user.skills.filter(s => s.category === cat);
      const avgLevel = skillsInCat.length > 0 
        ? Math.round(skillsInCat.reduce((acc, curr) => acc + curr.level, 0) / skillsInCat.length)
        : 0;
      return {
        subject: cat,
        A: avgLevel,
        fullMark: 100,
      };
    });
  };

  const radarData = getRadarData();

  // Handlers for Skill Mapping
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!selectedSkillToAdd) return;
    
    // Find skill category from ALL_AVAILABLE_SKILLS
    const matched = ALL_AVAILABLE_SKILLS.find(s => s.name === selectedSkillToAdd);
    const category = matched ? matched.category : skillCategoryToAdd;

    const success = addStudentSkill(user.id, {
      name: selectedSkillToAdd,
      level: Number(skillLevelToAdd),
      category
    });

    if (success) {
      refreshUserData();
      setSkillMessage({ type: 'success', text: `Skill "${selectedSkillToAdd}" mapped successfully!` });
      setSelectedSkillToAdd('');
      setTimeout(() => setSkillMessage(null), 3000);
    }
  };

  const handleRemoveSkill = (skillName) => {
    const success = removeStudentSkill(user.id, skillName);
    if (success) {
      refreshUserData();
      setSkillMessage({ type: 'info', text: `Removed "${skillName}" from your skill profile.` });
      setTimeout(() => setSkillMessage(null), 3000);
    }
  };

  // Handlers for Job Apply
  const handleApply = (jobId) => {
    const success = applyForJob(user.id, jobId);
    if (success) {
      refreshUserData();
      setAppliedMessage({ jobId, text: 'Applied Successfully!' });
      setTimeout(() => setAppliedMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold">Welcome Back, {user.name}!</h2>
        <p className="text-sky-100 text-sm mt-1">{user.degree} • {user.college}</p>
        <div className="mt-4 flex gap-4 text-xs font-semibold">
          <div className="bg-white/20 px-3 py-1.5 rounded-lg">CGPA: {user.cgpa}</div>
          <div className="bg-white/20 px-3 py-1.5 rounded-lg">Graduation: {user.graduationYear}</div>
          <div className="bg-white/20 px-3 py-1.5 rounded-lg">Mapped Skills: {user.skills?.length}</div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      
      {/* 1. OVERVIEW TAB */}
      {currentTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications list */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-600" />
              Your Internship Applications
            </h3>
            {user.applications?.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">No applications submitted yet. Browse jobs to apply.</p>
            ) : (
              <div className="space-y-3">
                {user.applications.map((app) => {
                  const job = MOCK_JOBS.find(j => j.id === app.jobId);
                  if (!job) return null;
                  
                  // Status Colors
                  const statusColors = {
                    'Applied': 'bg-blue-50 text-blue-700 border-blue-200',
                    'Shortlisted': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'Interviewing': 'bg-amber-50 text-amber-700 border-amber-200',
                    'Rejected': 'bg-red-50 text-red-700 border-red-200'
                  };

                  return (
                    <div key={app.jobId} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{job.title}</h4>
                        <p className="text-xs text-slate-500">{job.companyName} • {job.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-400">Applied on {app.appliedDate}</span>
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusColors[app.status] || 'bg-slate-50 text-slate-700'}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Stats sidebar */}
          <div className="space-y-6">
            {/* Quick Skill Radar Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Skills Distribution</h3>
              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar name="My Skills" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Certifications and Projects summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Academic Projects ({user.projects?.length})</h3>
              <div className="space-y-2">
                {user.projects?.slice(0, 2).map((proj) => (
                  <div key={proj.id} className="p-3 bg-slate-50 rounded-lg text-xs">
                    <h4 className="font-semibold text-slate-800">{proj.title}</h4>
                    <p className="text-slate-500 mt-1 line-clamp-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SKILL MAPPING TAB */}
      {currentTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill List & Editor */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Map Your Skills</h3>
              <p className="text-xs text-slate-500">Add languages, frameworks, databases, and tools to update your industrial matching coefficient.</p>
            </div>

            {skillMessage && (
              <div className={`p-3 rounded-lg text-xs font-semibold ${
                skillMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-sky-50 text-sky-800 border border-sky-100'
              }`}>
                {skillMessage.text}
              </div>
            )}

            {/* Form to add skill */}
            <form onSubmit={handleAddSkill} className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Add or Update Skill</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Select Skill</label>
                  <select
                    value={selectedSkillToAdd}
                    onChange={(e) => {
                      setSelectedSkillToAdd(e.target.value);
                      const match = ALL_AVAILABLE_SKILLS.find(s => s.name === e.target.value);
                      if (match) setSkillCategoryToAdd(match.category);
                    }}
                    className="w-full text-sm border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">-- Choose Skill --</option>
                    {ALL_AVAILABLE_SKILLS.map((skill) => {
                      const exists = user.skills.some(s => s.name === skill.name);
                      return (
                        <option key={skill.name} value={skill.name}>
                          {skill.name} {exists ? '(Update)' : `(${skill.category})`}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Category (Auto)</label>
                  <input
                    type="text"
                    value={skillCategoryToAdd}
                    disabled
                    className="w-full text-sm bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Proficiency Level</span>
                  <span>{skillLevelToAdd}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={skillLevelToAdd}
                  onChange={(e) => setSkillLevelToAdd(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Beginner (20%)</span>
                  <span>Intermediate (60%)</span>
                  <span>Expert (100%)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedSkillToAdd}
                className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Map Skill to Profile
              </button>
            </form>

            {/* List of Mapped Skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Active Skills ({user.skills?.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                {user.skills.map((skill) => (
                  <div key={skill.name} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-slate-800 truncate">{skill.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">{skill.category}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visualization Charts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Skill Visualization</h3>
              <p className="text-xs text-slate-500">Radar maps aggregate your capabilities per category relative to standard full stack competency.</p>
            </div>

            {/* Radar Chart */}
            <div className="flex-1 h-[320px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#cbd5e1' }} />
                  <Radar name="My Skills" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-sky-50 rounded-xl text-xs text-sky-800 leading-relaxed border border-sky-100">
              💡 <strong>Tip:</strong> An ideal candidate matches balanced coverage in both core technology (Frontend, Backend, Databases) and peripheral categories (Tools, Soft Skills, Academic Fundamentals). Try adding skills to round out your chart.
            </div>
          </div>
        </div>
      )}

      {/* 3. SKILL GAP ANALYSIS TAB */}
      {currentTab === 'gap' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Career Skill Gap Diagnostic</h3>
              <p className="text-xs text-slate-500">Select a career profile below. The engine will evaluate your profile and calculate skill deficiencies against industry requirements.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Role:</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="text-sm border-slate-300 rounded-lg p-2 bg-slate-50 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {STANDARD_ROLES.map(role => (
                  <option key={role.id} value={role.id}>{role.title}</option>
                ))}
              </select>
            </div>
          </div>

          {gapAnalysisResult && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Match Score Gauge */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Role Match Score</h4>
                
                {/* Score Circle */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-36 h-36">
                    <circle className="text-slate-100" strokeWidth="12" stroke="currentColor" fill="transparent" r="58" cx="72" cy="72" />
                    <circle 
                      className={`${gapAnalysisResult.matchPercentage >= 75 ? 'text-emerald-500' : gapAnalysisResult.matchPercentage >= 50 ? 'text-amber-500' : 'text-red-500'}`} 
                      strokeWidth="12" 
                      strokeDasharray={2 * Math.PI * 58}
                      strokeDashoffset={2 * Math.PI * 58 * (1 - gapAnalysisResult.matchPercentage / 100)}
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="58" 
                      cx="72" 
                      cy="72"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }} 
                    />
                  </svg>
                  <span className="absolute text-3xl font-extrabold text-slate-800">{gapAnalysisResult.matchPercentage}%</span>
                </div>

                <div>
                  <h5 className="font-bold text-slate-700">{gapAnalysisResult.roleTitle}</h5>
                  <p className="text-xs text-slate-400 mt-1">based on {user.skills?.length} mapped profile skills</p>
                </div>
              </div>

              {/* Skill Gaps Breakdown Table */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-800">Deficiency Diagnostic and Learning Path</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                        <th className="py-2.5">Skill Name</th>
                        <th className="py-2.5">Required Level</th>
                        <th className="py-2.5">Your Current Level</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {/* Matching Skills */}
                      {gapAnalysisResult.matchingSkills.map((skill) => (
                        <tr key={skill.name} className="hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{skill.name}</td>
                          <td className="py-3 text-slate-500">{skill.requiredLevel}%</td>
                          <td className="py-3 text-slate-500">{skill.currentLevel}%</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              Match
                            </span>
                          </td>
                        </tr>
                      ))}

                      {/* Gap Skills */}
                      {gapAnalysisResult.gapSkills.map((skill) => (
                        <tr key={skill.name} className="hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{skill.name}</td>
                          <td className="py-3 text-slate-500">{skill.requiredLevel}%</td>
                          <td className="py-3 text-slate-500">
                            {skill.currentLevel === 0 ? '-' : `${skill.currentLevel}%`}
                          </td>
                          <td className="py-3">
                            {skill.currentLevel === 0 ? (
                              <span className="inline-flex items-center gap-1 text-red-700 font-bold">
                                <XCircle className="w-4 h-4 text-red-500" />
                                Missing
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                Level Gap
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actionable Learning Suggestions */}
              <div className="lg:col-span-3 bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-md border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-400" />
                  Your Personalized Upskilling Plan
                </h4>
                {gapAnalysisResult.gapSkills.length === 0 ? (
                  <p className="text-sm text-slate-300">Congratulations! You fully meet all requirements for a standard {gapAnalysisResult.roleTitle} role. Keep it up!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gapAnalysisResult.gapSkills.map((gap, idx) => (
                      <div key={idx} className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex gap-3">
                        <div className="bg-sky-500/10 p-2.5 rounded-lg text-sky-400 h-fit self-start">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-white">{gap.name}</h5>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{gap.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. JOBS BOARD TAB */}
      {currentTab === 'jobs' && (
        <div className="space-y-6">
          {/* Job Filter Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search openings, companies, or key skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedJobType('all')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${selectedJobType === 'all' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                All Opportunities
              </button>
              <button
                onClick={() => setSelectedJobType('Internship')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${selectedJobType === 'Internship' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                Internships
              </button>
              <button
                onClick={() => setSelectedJobType('Full-Time')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${selectedJobType === 'Full-Time' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                Full-Time Placements
              </button>
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_JOBS.filter(job => {
              const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.skillsRequired.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
              const matchesType = selectedJobType === 'all' || job.type === selectedJobType;
              return matchesSearch && matchesType;
            }).map((job) => {
              const matchScore = calculateJobMatchScore(user.skills, job.skillsRequired);
              const alreadyApplied = user.applications.some(app => app.jobId === job.id);
              const isEligible = user.cgpa >= job.cgpaRequired;

              // Color indicators for match scores
              const matchBg = matchScore >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : matchScore >= 60 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200';

              return (
                <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-semibold">{job.type}</span>
                        <h4 className="font-bold text-slate-800 text-base mt-2">{job.title}</h4>
                        <p className="text-xs text-slate-500">{job.companyName} • {job.location}</p>
                      </div>

                      {/* Match Score Badge */}
                      <div className={`px-2 py-1.5 rounded-lg border text-center flex flex-col items-center ${matchBg}`}>
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">Match</span>
                        <span className="text-sm font-extrabold">{matchScore}%</span>
                      </div>
                    </div>

                    {/* Job Details */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{job.description}</p>

                    {/* Required Skills */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skillsRequired.map(skill => {
                          const studentHasSkill = user.skills.some(s => s.name.toLowerCase() === skill.name.toLowerCase());
                          return (
                            <span 
                              key={skill.name} 
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                                studentHasSkill ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-slate-50 text-slate-400 border-slate-100'
                              }`}
                            >
                              {skill.name} ({skill.level}%)
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Eligibility details */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Stipend / LPA</span>
                        <span className="font-semibold text-slate-700">{job.stipend}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Min CGPA</span>
                        <span className={`font-semibold ${isEligible ? 'text-slate-700' : 'text-red-600'}`}>{job.cgpaRequired}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Actions */}
                  <div className="mt-6">
                    {alreadyApplied ? (
                      <button 
                        disabled
                        className="w-full bg-slate-100 text-slate-400 border border-slate-200 font-semibold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4 text-slate-400" />
                        Application Submitted
                      </button>
                    ) : !isEligible ? (
                      <button 
                        disabled
                        className="w-full bg-red-50 text-red-400 border border-red-100 font-semibold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
                        title="Your CGPA is lower than the job requirement"
                      >
                        <XCircle className="w-4 h-4 text-red-400" />
                        Ineligible (CGPA Gap)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {appliedMessage?.jobId === job.id && (
                      <p className="text-[10px] text-center text-emerald-600 font-semibold mt-1">{appliedMessage.text}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
