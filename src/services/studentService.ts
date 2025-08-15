import { Student, ApiUser } from '../types/Student';

const STORAGE_KEY = 'student_management_data';

const courses = [
  'Computer Science', 'Business Administration', 'Psychology', 'Engineering',
  'Mathematics', 'English Literature', 'Biology', 'Chemistry', 'Physics',
  'Art & Design', 'History', 'Economics', 'Political Science', 'Sociology'
];

const statuses: ('Active' | 'Inactive' | 'Graduated')[] = ['Active', 'Active', 'Active', 'Inactive', 'Graduated'];

function getRandomCourse(): string {
  return courses[Math.floor(Math.random() * courses.length)];
}

function getRandomStatus(): 'Active' | 'Inactive' | 'Graduated' {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomDate(): string {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function transformUserToStudent(user: ApiUser): Student {
  return {
    id: user.id,
    studentId: `STU${user.id.toString().padStart(4, '0')}`,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.age,
    course: getRandomCourse(),
    status: getRandomStatus(),
    enrollmentDate: getRandomDate(),
    address: user.address,
  };
}

export function saveStudentsToStorage(students: Student[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students to localStorage:', error);
  }
}

export function loadStudentsFromStorage(): Student[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading students from localStorage:', error);
    return null;
  }
}

export async function fetchStudents(): Promise<Student[]> {
  // First, try to load from localStorage
  const storedStudents = loadStudentsFromStorage();
  if (storedStudents && storedStudents.length > 0) {
    return storedStudents;
  }

  // If no stored data, fetch from API
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    const students = data.users.map(transformUserToStudent);
    
    // Save to localStorage for future use
    saveStudentsToStorage(students);
    
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}