'use server';
const BASE_URL = 'http://localhost:3001';

const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {

    return await res.json();
  } else {
    const text = await res.text();
    throw new Error(`Unexpected response: ${text}`);
  }
};

export const getCourses = async () => {
  return await fetchAPI('/courses', {
    method: 'GET',
  });
};

export const createCourse = async (courseData: {
  courseName: string;
  courseCode: string;
  credits: number;
  profName: string;
  description: string;
  imageURL?: string;
}) => {
    console.log(courseData);
  return await fetchAPI('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  });
};

export const updateCourse = async (id: number, courseData: {
  courseName: string;
  courseCode: string;
  credits: number;
  profName: string;
  description: string;
  imageURL?: string;
}) => {
  return await fetchAPI(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(courseData),
  });
};

export const deleteCourse = async (id: number) => {
  return await fetchAPI(`/courses/${id}`, {
    method: 'DELETE',
  });
};
