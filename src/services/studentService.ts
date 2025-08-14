import { Student, ApiUser } from '../types/Student';

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

export async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users.map(transformUserToStudent);
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}