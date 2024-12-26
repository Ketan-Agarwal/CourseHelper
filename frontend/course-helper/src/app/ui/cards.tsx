'use client';
import styles from './cards.module.css';
import Card from './card';
import AddButton from '@/app/ui/addCourse';
import { getCourses } from '../lib/api';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
export default function Cards(){
    const [courses, setCourses] = useState<any[]>([]);
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
      }
      
      if (loading) {
        return <p>Loading courses...</p>;
      }
        return (<div>
            <AddButton onCourseAdded={handleCourseAdded}/>
            <div className={styles.cards}>
            {courses.map((course) => (
        <Card id={course.id} courseName={course.courseName} imageURL={course.imageURL} courseCode={course.courseCode} profName={course.profName} credits={course.credits} description={course.description} onDeleteCourse={handleCourseDeleted} onCourseUpdate={handleCourseUpdate}/>
              
            ))}
        </div><Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertMessage.includes('Failed') ? 'error' : 'success'} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar></div>
        )
    }