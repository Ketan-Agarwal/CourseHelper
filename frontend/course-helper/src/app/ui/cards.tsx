'use client';
import styles from './cards.module.css';
import Card from './card';
import AddButton from './addCourse';
import { getCourses } from '../lib/api';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Box } from '@mui/material';

interface Course {
  id: number;
  courseName: string;
  courseCode: string;
  credits: number;
  description: string;
  imageURL: string;
  profName: string;
}
export default function Cards({searchQuery}: {searchQuery: string}){
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
const [openAlert, setOpenAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const data = await getCourses();
            setCourses(data);
          } catch (error) {
            console.error('Failed to fetch courses:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCourses();
      }, []);
      const handleCourseAdded = (newCourse: any) => {
        setCourses(prevCourses => [...prevCourses, newCourse]);
      };
      const handleCourseDeleted = (deletedCourseId: number, courseCode: string) => {          
          setCourses(prevCourses => prevCourses.filter(course => course.id !== deletedCourseId));
          setAlertMessage(`Course (${courseCode}) deleted successfully!`);
          setOpenAlert(true);
      };const handleCloseAlert = () => {
        setOpenAlert(false);
      };
      const handleCourseUpdate = (newCourseData: { id: number; courseName: string; courseCode: string; credits: number; description: string; imageURL: string; profName: string }) => {
        setCourses(prevCourses => prevCourses.map((course) => course.id === newCourseData.id ? { ...course, ...newCourseData} : course))
        setAlertMessage(`Course (${newCourseData.courseCode}) updated successfully!`);
        setOpenAlert(true);
    };
      const filteredCourses = courses.filter(course =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.profName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (loading) {
        return <p className={styles.centerAlert}>Loading courses...</p>;
      }
      if(filteredCourses.length == 0){
        return(
            <>
            <p className={styles.centerAlert}>No courses</p>
            <AddButton onCourseAdded={handleCourseAdded}/>
            </>
        )
      }
        return (<div>
            <AddButton onCourseAdded={handleCourseAdded}/>
            <Box sx={{ paddingTop: { xs: '56px', sm: '71px' } }}>
            <div className={styles.cards}>
            {filteredCourses.map((course) => (
        <Card key={course.id} id={course.id} courseName={course.courseName} imageURL={course.imageURL} courseCode={course.courseCode} profName={course.profName} credits={course.credits} description={course.description} onDeleteCourse={handleCourseDeleted} onCourseUpdate={handleCourseUpdate}/>
              
            ))}
        </div>
        </Box><Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertMessage.includes('Failed') ? 'error' : 'success'} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar></div>
        )
    }