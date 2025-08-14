import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, UserPlus, Home, Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StudentsList } from './components/StudentsList';
import { AddStudent } from './components/AddStudent';
import { Student } from './types/Student';
import { fetchStudents } from './services/studentService';

type ActiveTab = 'dashboard' | 'students' | 'add-student';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const fetchedStudents = await fetchStudents();
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const studentWithId: Student = {
      ...newStudent,
      id: Date.now(), // Simple ID generation for demo
    };
    setStudents(prev => [...prev, studentWithId]);
    setActiveTab('students');
  };

  const navigationItems = [
    { id: 'dashboard' as ActiveTab, name: 'Dashboard', icon: Home },
    { id: 'students' as ActiveTab, name: 'Students', icon: Users },
    { id: 'add-student' as ActiveTab, name: 'Add Student', icon: UserPlus },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading students data...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard students={students} />;
      case 'students':
        return <StudentsList students={students} />;
      case 'add-student':
        return <AddStudent onAddStudent={handleAddStudent} />;
      default:
        return <Dashboard students={students} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">EduManage</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;