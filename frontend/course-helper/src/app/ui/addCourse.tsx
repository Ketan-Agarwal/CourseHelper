'use client';
import {useState} from 'react';
import Button from '@mui/material/Button';
import styles from '@/app/ui/cards.module.css';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions,  } from '@mui/material';
import { createCourse } from '../lib/api';

export default function AddCourse({ onCourseAdded }: {onCourseAdded: (newCourse: any) => void}) {
    const [openAdd, setOpenAdd] = useState(false); // State to control dialog open/close
    const [formData, setFormData] = useState({
      courseName: '',
      courseCode: '',
      credits: '',
      profName: '',
      description: '',
      image: ''
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleSubmitAdd = async() => {
        if (!validateForm()) {
            return;
          }
      try {
        const newCourse = await createCourse({
          courseName: formData.courseName,
          courseCode: formData.courseCode,
          credits: Number(formData.credits),
          profName: formData.profName,
          description: formData.description,
          imageURL: formData.image
        });
        onCourseAdded(newCourse);
        handleCloseAdd();
      } catch (error) {
        console.error('Error adding course:', error);
      }
  
    
      handleCloseAdd(); // Close the dialog after submit
    };

        

    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State to store form validation errors
   const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.courseName.trim()) newErrors.courseName = 'Course Name is required';
    if (!formData.courseCode.trim()) newErrors.courseCode = 'Course Code is required';
    if (!formData.profName.trim()) newErrors.profName = 'Professor Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.credits.trim() || isNaN(Number(formData.credits)) || Number(formData.credits) <= 0) {
      newErrors.credits = 'Credits must be a positive integer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    // Function to handle dialog close
    const handleCloseAdd = () => {
      setOpenAdd(false);
      setFormData({
        courseName: '',
        courseCode: '',
        credits: '',
        profName: '',
        description: '',
        image: ''
      });
      setErrors({});
    };
  
    // Function to handle dialog open
    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  return (<>
      <div className={styles.addButton}>
      <Button variant="contained" onClick={handleOpenAdd}>Add Course</Button>
      </div>
<Dialog open={openAdd} onClose={handleCloseAdd}>
  <DialogTitle>Add New Course</DialogTitle><br/>
  <DialogContent>
  <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            error={!!errors.courseName}
            helperText={errors.courseName}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Course Code"
            variant="outlined"
            fullWidth
            name="courseCode"
            value={formData.courseCode}
            onChange={handleInputChange}
            error={!!errors.courseCode}
            helperText={errors.courseCode}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Credits"
            variant="outlined"
            fullWidth
            name="credits"
            value={formData.credits}
            onChange={handleInputChange}
            error={!!errors.credits}
            helperText={errors.credits}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Professor Name"
            variant="outlined"
            fullWidth
            name="profName"
            value={formData.profName}
            onChange={handleInputChange}
            error={!!errors.profName}
            helperText={errors.profName}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            error={!!errors.image}
            helperText={errors.image}
            sx={{ marginBottom: 2 }}
          />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAdd} variant="outlined" color="primary">
      Cancel
    </Button>
    <Button onClick={handleSubmitAdd} variant="contained" color="primary">
      Add Course
    </Button>
  </DialogActions>
</Dialog>

      </>
  );
}
