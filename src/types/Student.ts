export interface Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  enrollmentDate: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
}

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  address: {
    city: string;
    state: string;
    country: string;
  };
}