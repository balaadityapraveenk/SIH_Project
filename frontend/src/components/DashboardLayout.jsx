import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  PlusCircle, 
  LogOut, 
  Layers, 
  Users, 
  Settings,
  ChevronDown,
  Award,
  Search,
  UserCheck
} from 'lucide-react';

export default function DashboardLayout({ children, currentTab, setCurrentTab }) {
  const { user, role, loginAs, logout } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const handleRoleSwitch = (newRole) => {
    if (newRole === 'student') {
      loginAs('student', 'stud_1');
      setCurrentTab('overview');
    } else if (newRole === 'industry') {
      loginAs('industry', 'comp_1');
      setCurrentTab('jobs');
    } else if (newRole === 'academia') {
      loginAs('academia', 'acad_1');
      setCurrentTab('overview');
    }
    setShowRoleDropdown(false);
  };

  const getSidebarMenu = () => {
    switch (role) {
      case 'student':
        return [
          { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
          { id: 'skills', name: 'Skill Mapping', icon: Award },
          { id: 'gap', name: 'Skill Gap Analysis', icon: Layers },
          { id: 'jobs', name: 'Find Internships', icon: Briefcase }
        ];
      case 'industry':
        return [
          { id: 'jobs', name: 'Manage Postings', icon: Briefcase },
          { id: 'post-job', name: 'Post New Opening', icon: PlusCircle },
          { id: 'matcher', name: 'Student Matcher', icon: UserCheck },
          { id: 'applicants', name: 'Applications', icon: Users }
        ];
      case 'academia':
        return [
          { id: 'overview', name: 'College Overview', icon: GraduationCap },
          { id: 'curriculum-gap', name: 'Curriculum Gaps', icon: Layers },
          { id: 'students-list', name: 'Student Directory', icon: Users }
        ];
      default:
        return [];
    }
  };

  const menuItems = getSidebarMenu();

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shadow-xl">
        <div>
          {/* Logo / Header */}
          <div className="p-6 bg-slate-950 flex items-center gap-3">
            <div className="bg-sky-500 p-2 rounded-lg text-white font-bold text-lg">
              SIH
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wider uppercase text-white">
                Academia-Industry
              </h1>
              <p className="text-xs text-slate-400">Collaboration Portal</p>
            </div>
          </div>

          {/* User Info Card */}
          <div className="p-4 mx-4 my-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Role: <span className="text-sky-400">{role?.toUpperCase()}</span>
            </span>
            <span className="text-sm font-semibold truncate text-slate-100">{user?.name}</span>
            <span className="text-xs text-slate-400 truncate">{user?.email || user?.industry}</span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header / Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          {/* Quick Simulation Banner */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              Demo Environment
            </span>
            <span className="text-sm text-slate-500 hidden md:inline">
              Feel free to switch roles to inspect other interfaces.
            </span>
          </div>

          {/* Interactive Role Switcher in Header */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <span>View Portal As: <strong className="text-sky-600 capitalize">{role}</strong></span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Select Dashboard</p>
                </div>
                <button
                  onClick={() => handleRoleSwitch('student')}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-sky-50 flex items-center justify-between ${role === 'student' ? 'bg-sky-50/50 font-semibold text-sky-700' : 'text-slate-700'}`}
                >
                  Student Dashboard
                  {role === 'student' && <span className="text-xs text-sky-600 font-bold">Active</span>}
                </button>
                <button
                  onClick={() => handleRoleSwitch('industry')}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-sky-50 flex items-center justify-between ${role === 'industry' ? 'bg-sky-50/50 font-semibold text-sky-700' : 'text-slate-700'}`}
                >
                  Industry Dashboard
                  {role === 'industry' && <span className="text-xs text-sky-600 font-bold">Active</span>}
                </button>
                <button
                  onClick={() => handleRoleSwitch('academia')}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-sky-50 flex items-center justify-between ${role === 'academia' ? 'bg-sky-50/50 font-semibold text-sky-700' : 'text-slate-700'}`}
                >
                  Academia Dashboard
                  {role === 'academia' && <span className="text-xs text-sky-600 font-bold">Active</span>}
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Viewport */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
