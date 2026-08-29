import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MOCK_JOBS, 
  MOCK_STUDENTS,
  ALL_AVAILABLE_SKILLS,
  addJobPosting,
  calculateJobMatchScore,
  updateApplicationStatus
} from '../services/mockData';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  User, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Users, 
  UserPlus, 
  BookOpen, 
  Eye, 
  ChevronRight,
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

export default function IndustryDashboard({ currentTab, setCurrentTab }) {
  const { user } = useAuth();
  
  // States for Posting Job
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Internship');
  const [jobLocation, setJobLocation] = useState('Remote');
  const [jobDescription, setJobDescription] = useState('');
  const [minCgpa, setMinCgpa] = useState(7.0);
  const [stipend, setStipend] = useState('');
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [skillSliderName, setSkillSliderName] = useState('');
  const [skillSliderLevel, setSkillSliderLevel] = useState(70);
  const [postMessage, setPostMessage] = useState(null);

  // States for Matcher & Applicants
  const [matcherJobId, setMatcherJobId] = useState('');
  const [matcherSearch, setMatcherSearch] = useState('');
  const [applicantSearch, setApplicantSearch] = useState('');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);

  // Initialize selected job for matching
  useEffect(() => {
    if (user && MOCK_JOBS.length > 0) {
      const companyJobs = MOCK_JOBS.filter(j => j.companyId === user.id);
      if (companyJobs.length > 0) {
        setMatcherJobId(companyJobs[0].id);
      }
    }
  }, [user]);

  if (!user) return <div className="p-8">Loading company session...</div>;

  // Filter listings owned by this company
  const myJobs = MOCK_JOBS.filter(job => job.companyId === user.id);

  // Handler for adding skill tag to new job
  const handleAddSkillTag = () => {
    if (!skillSliderName) return;
    const exists = skillsSelected.some(s => s.name === skillSliderName);
    if (!exists) {
      setSkillsSelected([...skillsSelected, { name: skillSliderName, level: Number(skillSliderLevel) }]);
      setSkillSliderName('');
    }
  };

  const handleRemoveSkillTag = (name) => {
    setSkillsSelected(skillsSelected.filter(s => s.name !== name));
  };

  // Handler for posting job
  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    if (skillsSelected.length === 0) {
      alert("Please add at least one required skill tag.");
      return;
    }

    const jobData = {
      title: jobTitle,
      type: jobType,
      location: jobLocation,
      description: jobDescription,
      cgpaRequired: Number(minCgpa),
      stipend: stipend || (jobType === 'Internship' ? '₹15,000 / month' : '₹6,000,000 / annum'),
      skillsRequired: [...skillsSelected]
    };

    const newJob = addJobPosting(user.id, jobData);
    if (newJob) {
      setPostMessage("Opening posted successfully!");
      // Reset form
      setJobTitle('');
      setJobDescription('');
      setMinCgpa(7.0);
      setStipend('');
      setSkillsSelected([]);
      
      setTimeout(() => {
        setPostMessage(null);
        setCurrentTab('jobs'); // Switch back to jobs dashboard
      }, 2000);
    }
  };

  // Status Change for Candidates
  const handleStatusChange = (studentId, jobId, newStatus) => {
    const success = updateApplicationStatus(studentId, jobId, newStatus);
    if (success && selectedStudentDetail && selectedStudentDetail.id === studentId) {
      setSelectedStudentDetail(prev => ({
        ...prev,
        applications: prev.applications.map(a => a.jobId === jobId ? { ...a, status: newStatus } : a)
      }));
    }
  };

  // Prepare radar chart data for student inspection popup
  const getStudentRadarData = (student) => {
    if (!student || !student.skills) return [];
    const categories = ['Frontend', 'Backend', 'Database', 'Cloud/DevOps', 'Languages', 'Tools', 'Academic', 'Soft Skills'];
    return categories.map(cat => {
      const skillsInCat = student.skills.filter(s => s.category === cat);
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">{user.logo || '🏢'}</span>
            {user.name} Hiring Dashboard
          </h2>
          <p className="text-slate-400 text-xs mt-1">{user.industry} Partner Portal</p>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-right">
          <div className="bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700/50">
            <span className="block text-slate-400 text-[10px] uppercase font-bold">Active Openings</span>
            <span className="text-base font-extrabold text-sky-400">{myJobs.length}</span>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* 1. MANAGE JOB POSTINGS TAB */}
      {currentTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Your Posted Openings</h3>
            <button
              onClick={() => setCurrentTab('post-job')}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Post New Opening
            </button>
          </div>

          {myJobs.length === 0 ? (
            <div className="bg-white text-center py-12 rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">You haven't posted any jobs yet. Create a posting to start matching students.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myJobs.map((job) => {
                // Calculate applicant count
                const applicantsCount = MOCK_STUDENTS.filter(s => 
                  s.applications?.some(app => app.jobId === job.id)
                ).length;

                return (
                  <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-sm">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">{job.type}</span>
                          <h4 className="font-bold text-slate-800 text-base mt-2">{job.title}</h4>
                          <span className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                        </div>
                        <div className="bg-sky-50 text-sky-800 px-3 py-1.5 rounded-xl border border-sky-100 text-center">
                          <span className="block text-[9px] uppercase font-bold opacity-80">Applicants</span>
                          <span className="text-sm font-extrabold">{applicantsCount}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{job.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {job.skillsRequired.map(skill => (
                          <span key={skill.name} className="text-[10px] bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                            {skill.name} ({skill.level}%)
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-slate-100 pt-3 flex justify-between text-xs text-slate-500 font-medium">
                        <span>Comp: <strong className="text-slate-700">{job.stipend}</strong></span>
                        <span>CGPA Requirement: <strong className="text-slate-700">{job.cgpaRequired}+</strong></span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                      <button 
                        onClick={() => {
                          setMatcherJobId(job.id);
                          setCurrentTab('matcher');
                        }}
                        className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        Match Talent
                      </button>
                      <button 
                        onClick={() => {
                          setApplicantSearch(job.title);
                          setCurrentTab('applicants');
                        }}
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View Applications
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. POST NEW OPENING TAB */}
      {currentTab === 'post-job' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Post a Job / Internship</h3>
            <p className="text-xs text-slate-500">Provide details and tag target skills with desired capability percentages. The scoring engine uses this profile for automated candidate sorting.</p>
          </div>

          {postMessage && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-100">
              {postMessage}
            </div>
          )}

          <form onSubmit={handlePostJobSubmit} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Associate Backend Dev"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Remote or Mumbai, India"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-full border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Contract Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full-Time">Full-Time Placement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Compensation (Stipend/LPA)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹25,000 / month"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  className="w-full border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Minimum Eligible CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  min="5.0"
                  max="10.0"
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(e.target.value)}
                  className="w-full border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Job Description</label>
              <textarea
                rows="4"
                placeholder="Detail core responsibilities, team dynamics, and expectations..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Config Required Skills tags */}
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Required Skill Profiles</h4>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <select
                    value={skillSliderName}
                    onChange={(e) => setSkillSliderName(e.target.value)}
                    className="w-full text-xs border-slate-200 rounded-lg p-2 bg-white focus:outline-none"
                  >
                    <option value="">-- Choose Target Skill --</option>
                    {ALL_AVAILABLE_SKILLS.map(s => (
                      <option key={s.name} value={s.name}>{s.name} ({s.category})</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 min-w-[50px]">{skillSliderLevel}%</span>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={skillSliderLevel}
                    onChange={(e) => setSkillSliderLevel(e.target.value)}
                    className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkillTag}
                    className="bg-slate-800 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-slate-700"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Tag Tray */}
              <div className="flex flex-wrap gap-2 pt-2">
                {skillsSelected.map((tag) => (
                  <span key={tag.name} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 text-xs font-semibold rounded-full text-slate-700">
                    {tag.name} ({tag.level}%)
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkillTag(tag.name)} 
                      className="text-red-500 hover:text-red-700 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {skillsSelected.length === 0 && (
                  <span className="text-xs text-slate-400 italic">No skills tagged yet. You need at least one to save.</span>
                )}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Publish Posting
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('jobs')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-6 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. STUDENT MATCHER / TALENT FINDER */}
      {currentTab === 'matcher' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Dynamic Student Matcher</h3>
              <p className="text-xs text-slate-500">Pick one of your job openings. The platform evaluates all student profiles in the directory against it, sorting them by matching coefficient.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Job:</label>
              {myJobs.length === 0 ? (
                <span className="text-xs text-red-500 font-bold">Post a job first</span>
              ) : (
                <select
                  value={matcherJobId}
                  onChange={(e) => setMatcherJobId(e.target.value)}
                  className="text-sm border-slate-200 rounded-lg p-2.5 bg-slate-50 font-bold text-slate-700 focus:outline-none"
                >
                  {myJobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Matches Output List */}
          {matcherJobId && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Matching Candidates</h4>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search candidate name or skill..."
                    value={matcherSearch}
                    onChange={(e) => setMatcherSearch(e.target.value)}
                    className="text-xs pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none w-48 sm:w-64"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {(() => {
                  const targetJob = MOCK_JOBS.find(j => j.id === matcherJobId);
                  if (!targetJob) return null;

                  const matchedStudents = MOCK_STUDENTS.map(student => {
                    const score = calculateJobMatchScore(student.skills, targetJob.skillsRequired);
                    const meetsCgpa = student.cgpa >= targetJob.cgpaRequired;
                    return { ...student, matchScore: score, meetsCgpa };
                  })
                  .filter(s => {
                    const query = matcherSearch.toLowerCase();
                    return s.name.toLowerCase().includes(query) || 
                      s.skills.some(skill => skill.name.toLowerCase().includes(query));
                  })
                  .sort((a, b) => b.matchScore - a.matchScore);

                  if (matchedStudents.length === 0) {
                    return <div className="p-8 text-center text-slate-400 text-sm">No students match your query filters.</div>;
                  }

                  return matchedStudents.map((stud) => (
                    <div key={stud.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div className="flex gap-4">
                        <div className="bg-sky-100 text-sky-800 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm">
                          {stud.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                            {stud.name}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${stud.meetsCgpa ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                              CGPA: {stud.cgpa} {stud.meetsCgpa ? '(Eligible)' : '(Below Threshold)'}
                            </span>
                          </h5>
                          <p className="text-xs text-slate-500 mt-0.5">{stud.degree} • {stud.college}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {stud.skills.slice(0, 4).map(s => (
                              <span key={s.name} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                                {s.name}
                              </span>
                            ))}
                            {stud.skills.length > 4 && (
                              <span className="text-[9px] text-slate-400 font-bold self-center">+{stud.skills.length - 4} more</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Matching Rate Gauge */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Matching Coefficient</span>
                          <span className={`text-base font-extrabold ${stud.matchScore >= 80 ? 'text-emerald-600' : stud.matchScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                            {stud.matchScore}% Compatibility
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedStudentDetail(stud)}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1 transition-colors"
                        >
                          Inspect Profile
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. APPLICATIONS TRACKER TAB */}
      {currentTab === 'applicants' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Application Pipeline</h3>
              <p className="text-xs text-slate-500">Track and advance candidates through recruiting stages. Click "Inspect" to view full portfolio diagnostics.</p>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by job title or student..."
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
                className="text-xs pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 w-56 sm:w-64"
              />
            </div>
          </div>

          {/* Applicants Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Applied Position</th>
                  <th className="p-4">Match Coefficient</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4">Status Stage</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(() => {
                  let list = [];
                  MOCK_STUDENTS.forEach(student => {
                    student.applications.forEach(app => {
                      const job = MOCK_JOBS.find(j => j.id === app.jobId);
                      if (job && job.companyId === user.id) {
                        list.push({ student, app, job });
                      }
                    });
                  });

                  // Filter search
                  const filtered = list.filter(item => {
                    const query = applicantSearch.toLowerCase();
                    return item.student.name.toLowerCase().includes(query) || 
                      item.job.title.toLowerCase().includes(query);
                  });

                  if (filtered.length === 0) {
                    return (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-400 font-medium">No candidates in your recruitment pipeline match.</td>
                      </tr>
                    );
                  }

                  return filtered.map(({ student, app, job }) => {
                    const matchScore = calculateJobMatchScore(student.skills, job.skillsRequired);

                    return (
                      <tr key={`${student.id}-${job.id}`} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-800">{student.name}</h5>
                              <p className="text-[10px] text-slate-400 mt-0.5">{student.degree}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-700">{job.title}</td>
                        <td className="p-4 font-extrabold text-sky-600">{matchScore}%</td>
                        <td className="p-4 text-slate-400">{app.appliedDate}</td>
                        <td className="p-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(student.id, job.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-semibold text-xs text-slate-700 focus:outline-none"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedStudentDetail(student)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STUDENT PORTFOLIO INSPECT POPUP DIALOG */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col p-6 space-y-6 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedStudentDetail.name}</h3>
                <p className="text-xs text-slate-500">{selectedStudentDetail.degree} • CGPA: {selectedStudentDetail.cgpa}</p>
                <p className="text-xs text-slate-400">{selectedStudentDetail.college} (Graduation: {selectedStudentDetail.graduationYear})</p>
              </div>
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="text-slate-400 hover:text-slate-700 font-extrabold text-lg bg-slate-50 hover:bg-slate-100 px-3 py-1 rounded-lg"
              >
                ×
              </button>
            </div>

            {/* Diagnostic Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Profile skill radar */}
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 flex flex-col items-center">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider self-start mb-2">Category Skill Breakdown</h4>
                <div className="w-full h-56 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={getStudentRadarData(selectedStudentDetail)}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 500 }} />
                      <Radar name="Student Level" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Skills detail list */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Mapping Detail</h4>
                <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {selectedStudentDetail.skills.map((skill) => (
                    <div key={skill.name} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100/50">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span className="truncate">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1">
                        <div className="bg-sky-500 h-1 rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects & Certifications */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Academic Projects */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    Academic Projects ({selectedStudentDetail.projects?.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedStudentDetail.projects.map((proj) => (
                      <div key={proj.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <h5 className="font-bold text-xs text-slate-800">{proj.title}</h5>
                        <p className="text-[10px] text-slate-500 mt-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {proj.skills.map(s => (
                            <span key={s} className="text-[8px] bg-sky-50 text-sky-700 border border-sky-100 px-1.5 py-0.5 rounded font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-slate-500" />
                    Certifications ({selectedStudentDetail.certifications?.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedStudentDetail.certifications.map((cert, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                        <div className="text-amber-500 bg-amber-50 p-2 rounded-lg border border-amber-100">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-800">{cert.name}</h5>
                          <p className="text-[10px] text-slate-400 mt-0.5">{cert.provider} • {cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end pt-4 border-t border-slate-100 gap-2">
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-6 rounded-xl transition-all"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
