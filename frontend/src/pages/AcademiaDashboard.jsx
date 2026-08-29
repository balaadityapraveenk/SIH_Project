import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MOCK_STUDENTS,
  MOCK_JOBS,
  getAcademiaMetrics
} from '../services/mockData';
import { 
  GraduationCap, 
  Layers, 
  Users, 
  TrendingUp, 
  Search, 
  Eye, 
  BookOpen, 
  Award, 
  AlertTriangle,
  Briefcase,
  Lightbulb,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';

export default function AcademiaDashboard({ currentTab }) {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);

  useEffect(() => {
    if (user) {
      const data = getAcademiaMetrics(user.college);
      setMetrics(data);
    }
  }, [user]);

  if (!user) return <div className="p-8">Loading academia session...</div>;
  if (!metrics) return <div className="p-8">Loading diagnostics metrics...</div>;

  // Filter students database
  const filteredStudents = MOCK_STUDENTS.filter(s => {
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || 
      s.degree.toLowerCase().includes(q) ||
      s.skills.some(skill => skill.name.toLowerCase().includes(q));
  });

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
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-sky-400" />
          {user.college} Academia Console
        </h2>
        <p className="text-slate-400 text-xs mt-1">Institutional Administration & Curriculum Alignment Portal</p>
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* 1. OVERVIEW TAB */}
      {currentTab === 'overview' && (
        <div className="space-y-6">
          {/* Key metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Enrolled</span>
                <span className="text-2xl font-black text-slate-800 mt-1">{metrics.totalStudents}</span>
                <span className="block text-[10px] text-slate-500 mt-1">Across CSC / IT Departments</span>
              </div>
              <div className="bg-sky-50 text-sky-600 p-3 rounded-xl border border-sky-100">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Placement Rate</span>
                <span className="text-2xl font-black text-slate-800 mt-1">{metrics.placementRate}%</span>
                <span className="block text-[10px] text-emerald-600 mt-1 font-semibold">↑ 4% from last batch</span>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl border border-emerald-100">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Active Recruiters</span>
                <span className="text-2xl font-black text-slate-800 mt-1">{metrics.activeCollabCompanies}</span>
                <span className="block text-[10px] text-slate-500 mt-1">Partners with active MOUs</span>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-xl border border-purple-100">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Identified Gaps</span>
                <span className="text-2xl font-black text-slate-800 mt-1">
                  {metrics.curriculumGaps.filter(g => g.gapScore > 30).length}
                </span>
                <span className="block text-[10px] text-red-500 mt-1 font-semibold">Critical curriculum deficits</span>
              </div>
              <div className="bg-rose-50 text-rose-600 p-3 rounded-xl border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Student Skills Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Top Mapped Student Skills</h3>
                <p className="text-xs text-slate-400">Shows average student proficiency levels for the most frequently mapped skills.</p>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.skillAggregates.slice(0, 6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Bar dataKey="averageLevel" fill="#0ea5e9" name="Avg Level (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Placement highlights */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recruitment Statistics</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600">Avg Package (Full-Time)</span>
                    <span className="font-bold text-slate-800">₹8.5 LPA</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600">Highest Package</span>
                    <span className="font-bold text-emerald-600">₹10.5 LPA</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Internship Pipeline</h4>
                  {MOCK_JOBS.map(job => {
                    const studentCount = MOCK_STUDENTS.filter(s => 
                      s.applications.some(a => a.jobId === job.id)
                    ).length;

                    return (
                      <div key={job.id} className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                        <span className="font-medium text-slate-600 truncate max-w-[150px]">{job.title}</span>
                        <span className="text-[10px] text-slate-400">{job.companyName}</span>
                        <span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                          {studentCount} App{studentCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CURRICULUM GAP ANALYSIS TAB */}
      {currentTab === 'curriculum-gap' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-800">Curriculum Skill Gap Diagnostic</h3>
            <p className="text-xs text-slate-500 mt-1">This tool correlates aggregate required skills in posted job openings against active student skill profiles. High gap scores indicate a major market demand but low student proficiency, signifying a curriculum update requirement.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gap List */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Diagnostics Ledger</h4>
              </div>

              <div className="divide-y divide-slate-100">
                {metrics.curriculumGaps.map((gap) => (
                  <div key={gap.skillName} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1">
                      <h5 className="font-bold text-sm text-slate-800">{gap.skillName}</h5>
                      <div className="flex gap-4 text-[10px] text-slate-500">
                        <span>Industry Demand: <strong className="text-slate-700">{gap.industryDemandFreq}% of postings</strong></span>
                        <span>Student Adoption: <strong className="text-slate-700">{gap.studentReach}% of students</strong></span>
                        <span>Avg Student Level: <strong className="text-slate-700">{gap.averageCollegeLevel}%</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Gap Score</span>
                        <span className={`text-sm font-black ${gap.gapScore > 50 ? 'text-red-600' : gap.gapScore > 25 ? 'text-amber-500' : 'text-emerald-600'}`}>
                          {gap.gapScore} {gap.gapScore > 50 ? 'Critical' : gap.gapScore > 25 ? 'Moderate' : 'Low'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic recommendations */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-md">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-5 h-5 text-sky-400" />
                  Academic Recommendations
                </h4>

                <div className="space-y-4 text-xs leading-relaxed">
                  {metrics.curriculumGaps.filter(g => g.gapScore > 30).slice(0, 3).map((gap, idx) => (
                    <div key={idx} className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-white text-xs">{gap.skillName} Integration</strong>
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[8px] font-bold">Priority High</span>
                      </div>
                      <p className="text-slate-300">
                        Industry demand for <strong>{gap.skillName}</strong> is high ({gap.industryDemandFreq}%), but only {gap.studentReach}% of students have mapped it in their profile.
                      </p>
                      <div className="text-[10px] text-sky-300 font-semibold flex items-center gap-0.5">
                        Suggested Action: Host a boot-camp or add to course lab exercises.
                      </div>
                    </div>
                  ))}

                  {metrics.curriculumGaps.filter(g => g.gapScore > 30).length === 0 && (
                    <p className="text-slate-400">Excellent! The institutional skill profiles align completely with current placement requirements.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. STUDENT DIRECTORY TAB */}
      {currentTab === 'students-list' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Student Directory</h3>
              <p className="text-xs text-slate-500">Query and review profiles of all enrolled students. Click "Inspect" to view detailed capability radars and certifications.</p>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name, degree, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 w-56 sm:w-64"
              />
            </div>
          </div>

          {/* Directory Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="p-4">Student</th>
                  <th className="p-4">Course & Dept</th>
                  <th className="p-4">CGPA</th>
                  <th className="p-4">Graduation</th>
                  <th className="p-4">Top Skill Category</th>
                  <th className="p-4 text-right">Profile Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((stud) => {
                  // Determine top category based on highest count or average level
                  const catScore = {};
                  stud.skills.forEach(s => {
                    catScore[s.category] = (catScore[s.category] || 0) + s.level;
                  });
                  const topCategory = Object.keys(catScore).reduce((a, b) => 
                    catScore[a] > catScore[b] ? a : b, 
                    'General'
                  );

                  return (
                    <tr key={stud.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                            {stud.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-800">{stud.name}</h5>
                            <p className="text-[10px] text-slate-400">{stud.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">{stud.degree}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold bg-sky-50 text-sky-800 border border-sky-100">
                          {stud.cgpa}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{stud.graduationYear}</td>
                      <td className="p-4 font-semibold text-slate-500">{topCategory}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedStudentDetail(stud)}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400 font-medium">No student records found matching query filters.</td>
                  </tr>
                )}
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
