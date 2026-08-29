import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import IndustryDashboard from './pages/IndustryDashboard';
import AcademiaDashboard from './pages/AcademiaDashboard';
import { GraduationCap, Briefcase, Award, ArrowRight } from 'lucide-react';

export default function App() {
  const { user, role, loginAs, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState('overview');

  // Sync default tabs when role changes
  useEffect(() => {
    if (role === 'student' || role === 'academia') {
      setCurrentTab('overview');
    } else if (role === 'industry') {
      setCurrentTab('jobs');
    }
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-600">Loading Portal...</p>
        </div>
      </div>
    );
  }

  // Render Login page if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex bg-sky-500 text-white p-3 rounded-2xl shadow-md font-black text-xl mb-4">
            SIH
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academia-Industry Collaboration
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
            Centralized portal mapping student skills, identifying curriculum gaps, and facilitating internships & placements.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200/50 space-y-8">
            {/* Explanatory cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-sky-50/50 border border-sky-100 rounded-xl space-y-2">
                <div className="text-sky-600 bg-sky-100 p-2 rounded-lg w-fit">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">Students</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Map academic, certification, and project skills. Diagnose career gaps against target roles and search jobs.
                </p>
              </div>

              <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                <div className="text-emerald-600 bg-emerald-100 p-2 rounded-lg w-fit">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">Industry Partners</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Publish openings with specific skill tags. Score and match candidates dynamically. Track applicant pipelines.
                </p>
              </div>

              <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2">
                <div className="text-purple-600 bg-purple-100 p-2 rounded-lg w-fit">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">Academia</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Evaluate college-wide skill matrices. Identify syllabus gaps based on recruiter demand. Manage student directories.
                </p>
              </div>
            </div>

            {/* Quick login simulations */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                Quick Simulation Login
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => loginAs('student', 'stud_1')}
                  className="p-4 border border-slate-200 hover:border-sky-500 rounded-xl flex items-center justify-between group transition-all text-left bg-slate-50 hover:bg-sky-50/20"
                >
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Login as Student</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Aarav Sharma (B.Tech CSE)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => loginAs('industry', 'comp_1')}
                  className="p-4 border border-slate-200 hover:border-emerald-500 rounded-xl flex items-center justify-between group transition-all text-left bg-slate-50 hover:bg-emerald-50/20"
                >
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Login as Recruiter</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">TechCorp Solutions HR</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => loginAs('academia', 'acad_1')}
                  className="p-4 border border-slate-200 hover:border-purple-500 rounded-xl flex items-center justify-between group transition-all text-left bg-slate-50 hover:bg-purple-50/20"
                >
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Login as College Head</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Placement Head (NIT)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Dashboard based on active role
  const renderDashboard = () => {
    switch (role) {
      case 'student':
        return <StudentDashboard currentTab={currentTab} />;
      case 'industry':
        return <IndustryDashboard currentTab={currentTab} setCurrentTab={setCurrentTab} />;
      case 'academia':
        return <AcademiaDashboard currentTab={currentTab} />;
      default:
        return <div className="p-8">Invalid Role</div>;
    }
  };

  return (
    <DashboardLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderDashboard()}
    </DashboardLayout>
  );
}
