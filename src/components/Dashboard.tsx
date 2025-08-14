import { Users, GraduationCap, BookOpen } from 'lucide-react';
import { Student } from '../types/Student';

interface DashboardProps {
  students: Student[];
}

export function Dashboard({ students }: DashboardProps) {
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const inactiveStudents = students.filter(s => s.status === 'Inactive').length;
  const graduatedStudents = students.filter(s => s.status === 'Graduated').length;

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: BookOpen,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Inactive Students',
      value: inactiveStudents,
      icon: BookOpen,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Graduated',
      value: graduatedStudents,
      icon: GraduationCap,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Student Management</h1>
            <p className="text-gray-600 mt-1">Manage and track student information efficiently</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-blue-50 p-4 rounded-lg">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Overview */}
      {/* <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{((activeStudents / students.length) * 100 || 0).toFixed(1)}%</div>
            <div className="text-sm text-gray-600 mt-1">Active Enrollment Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{inactiveStudents}</div>
            <div className="text-sm text-gray-600 mt-1">Inactive Students</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'Graduated').length}</div>
            <div className="text-sm text-gray-600 mt-1">Graduated Students</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{new Set(students.map(s => s.course)).size}</div>
            <div className="text-sm text-gray-600 mt-1">Total Courses</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}