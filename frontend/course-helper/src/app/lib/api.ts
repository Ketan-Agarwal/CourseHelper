'use server';
const BASE_URL = 'https://course-helper-back.vercel.app';
const fetchAPI = async (endpoint: string, jwtToken: string, options: RequestInit = {}) => {
  // Retrieve JWT token from localStorage
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  }
  return res; // Return response if not JSON
};

export const getCourses = async () => {
  return await fetchAPI('/courses', "", {
    method: 'GET',
  });
};

export const createCourse = async (token: string, courseData: {
  courseName: string;
  courseCode: string;
  credits: number;
  profName: string;
  description: string;
  imageURL?: string;
}) => {
  return await fetchAPI('/courses', token, {
    method: 'POST',
    body: JSON.stringify(courseData),
  });
};

export const updateCourse = async (id: number, token: string, courseData: {
  courseName: string;
  courseCode: string;
  credits: number;
  profName: string;
  description: string;
  imageURL?: string;
}) => {
  return await fetchAPI(`/courses/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(courseData),
  });
};

export const deleteCourse = async (id: number, token: string) => {
  return await fetchAPI(`/courses/${id}`, token, {
    method: 'DELETE',
  });
};
