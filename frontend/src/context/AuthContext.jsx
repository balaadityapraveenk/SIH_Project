import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_STUDENTS, MOCK_COMPANIES } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto login as a student on initial load for easier debugging
  useEffect(() => {
    loginAs('student', 'stud_1');
    setLoading(false);
  }, []);

  const loginAs = (selectedRole, id) => {
    setLoading(true);
    setRole(selectedRole);
    
    if (selectedRole === 'student') {
      const student = MOCK_STUDENTS.find(s => s.id === id) || MOCK_STUDENTS[0];
      setUser({
        id: student.id,
        name: student.name,
        email: student.email,
        college: student.college,
        degree: student.degree,
        cgpa: student.cgpa,
        graduationYear: student.graduationYear,
        skills: [...student.skills],
        certifications: [...student.certifications],
        projects: [...student.projects],
        applications: [...student.applications]
      });
    } else if (selectedRole === 'industry') {
      const company = MOCK_COMPANIES.find(c => c.id === id) || MOCK_COMPANIES[0];
      setUser({
        id: company.id,
        name: company.name,
        industry: company.industry,
        email: company.email,
        logo: company.logo
      });
    } else if (selectedRole === 'academia') {
      setUser({
        id: 'acad_1',
        name: 'Prof. Ram Prasad (Placement Head)',
        email: 'placement@nit.edu',
        college: 'National Institute of Technology',
        department: 'Computer Science & Placement Cell'
      });
    } else {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const refreshUserData = () => {
    if (role === 'student' && user) {
      const latestStudent = MOCK_STUDENTS.find(s => s.id === user.id);
      if (latestStudent) {
        setUser({ ...latestStudent });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout, refreshUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
