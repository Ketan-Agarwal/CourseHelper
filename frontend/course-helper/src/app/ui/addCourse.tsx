'use client';
import {useState} from 'react';
import Button from '@mui/material/Button';
import styles from '@/app/ui/cards.module.css';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Input } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
export default function AddCourse() {
    const [openAdd, setOpenAdd] = useState(false); // State to control dialog open/close
    const [formData, setFormData] = useState({
      courseName: '',
      courseCode: '',
      credits: '',
      profName: '',
      description: '',
      image: null as File | null
    });
  
    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleSubmitAdd = () => {
      console.log('Adding Course:', formData);

      handleCloseAdd(); // Close the dialog after submit
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
        image: null
      });
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
      sx={{ marginBottom: 2 }}
    />
    <TextField
      label="Course Code"
      variant="outlined"
      fullWidth
      name="courseCode"
      value={formData.courseCode}
      onChange={handleInputChange}
      sx={{ marginBottom: 2 }}
    />
    <TextField
      label="Credits"
      variant="outlined"
      fullWidth
      name="credits"
      value={formData.credits}
      onChange={handleInputChange}
      sx={{ marginBottom: 2 }}
    />
    <TextField
      label="Professor Name"
      variant="outlined"
      fullWidth
      name="profName"
      value={formData.profName}
      onChange={handleInputChange}
      sx={{ marginBottom: 2 }}
    />
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      sx={{ marginBottom: 2 }}
    />
    <TextField
    label="ImageURL"
    variant="outlined"
    fullWidth
    name="description"
    value={formData.image}
    onChange={handleInputChange}
    sx={{ marginBottom: 2 }}
  />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAdd} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSubmitAdd} color="primary">
      Add Course
    </Button>
  </DialogActions>
</Dialog>

      </>
  );
}
