'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import styles from './cards.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCourse } from '../lib/api';
import DialogContentText from '@mui/material/DialogContentText';
import { Alert, Snackbar } from '@mui/material';
import { updateCourse } from '../lib/api';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
type Course = {
    id: number;
    imageURL: string;
    courseName: string;
    courseCode: string;
    credits: number;
    profName: string;
    description: string;
  };
  
export default function MultiActionAreaCard(props: { id: number; imageURL: string; courseName: string; courseCode: string; credits:number; profName: string; description: string; onDeleteCourse: (id: number,courseCode: string) => void; onCourseUpdate: (updatedCourse: Course) => void;}) {
const [open, setOpen] = React.useState(false);
// const jwtToken = typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;
const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
      const token = localStorage.getItem('jwtToken') || '';
      setJwtToken(token);
    
  }, []);
const [openAlert, setOpenAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');

const [openUpdate, setOpenUpdate] = React.useState(false);
const [formData, setFormData] = React.useState({
    courseName: props.courseName,
    courseCode: props.courseCode,
    credits: props.credits,
    profName: props.profName,
    description: props.description,
    imageURL: props.imageURL
  });
  const [openDelete, setDeleteOpen] = React.useState(false);

  const handleClickDeleteOpen = () => {
    if (!jwtToken){
      setAlertMessage("Please login to delete a course.");
      setOpenAlert(true);
      return;
    }
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    try {
        deleteCourse(props.id, jwtToken);
        props.onDeleteCourse(props.id, props.courseCode);
        setDeleteOpen(false);
    } catch (error) {
      setDeleteOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleClickOpenUpdate = () => {
    
    if (!jwtToken){
      setAlertMessage("Please login to update a course.");
      setOpenAlert(true);
      return;
    }
    setFormData({
        courseName: props.courseName,
        courseCode: props.courseCode,
        credits: props.credits,
        profName: props.profName,
        description: props.description,
        imageURL: props.imageURL
      });
      setErrors({});
setOpenUpdate(false);
    setOpenUpdate(true);
  };
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.courseName.trim()) newErrors.courseName = 'Course Name is required';
    if (!formData.courseCode.trim()) newErrors.courseCode = 'Course Code is required';
    if (!formData.profName.trim()) newErrors.profName = 'Professor Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.credits || isNaN(Number(formData.credits)) || Number(formData.credits) <= 0) {
      newErrors.credits = 'Credits must be a positive integer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleClose = () => {
    setOpen(false);
  };
    const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async() => {
      if (!validateForm()) {
          return;
        }
  try {
    const newCourse = await updateCourse(props.id, jwtToken, {
      courseName: formData.courseName,
      courseCode: formData.courseCode,
      credits: Number(formData.credits),
      profName: formData.profName,
      description: formData.description,
      imageURL: formData.imageURL
    });
    props.onCourseUpdate(newCourse);
    setFormData({
        courseName: newCourse.courseName,
        courseCode: newCourse.courseCode,
        credits: newCourse.credits,
        profName: newCourse.profName,
        description: newCourse.description,
        imageURL: newCourse.imageURL
      });
      setErrors({});
    handleCloseUpdate();
} catch (error) {
}
};
  
  
  return (
    <Card sx={{ maxWidth: 435 }} className={styles.card}>
      <CardActionArea onClick={handleClickOpen}>
        <CardMedia
          component="img"
          height="140"
          alt={props.courseName}
          image={props.imageURL} sx={{
            objectFit: 'cover',
            display: 'flex',
            height: '140px',
            justifyContent: 'center',            
            alignItems: 'center',
            width: '100%',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <div>{props.courseName ? props.courseName : "CourseNameHere"}</div>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
          <strong>Course Code:</strong> {props.courseCode ? props.courseCode : "CourseCodeHere"}<br/>
          <strong>Credits:</strong> {props.credits ? props.credits : "CreditsHere"}<br/>
          <strong>Prof. Name:</strong> {props.profName ? props.profName : "ProfNameHere"}<br/>
          <strong>Description:</strong> {props.description ? props.description : "DescriptionHere"}<br/>

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {jwtToken ? <><Button size="small" color="primary" variant='contained' onClick={handleClickOpenUpdate}>
          Update
        </Button>
        <Button size="small" color="warning" variant='contained'onClick={handleClickDeleteOpen} startIcon={<DeleteIcon />}>
          Delete
        </Button></> : ''}
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.courseName}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Course Code:</strong> {formData.courseCode}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Credits:</strong> {formData.credits}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Professor Name:</strong> {formData.profName}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {formData.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Course Information</DialogTitle><br/>
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
          name="imageURL"
          value={formData.imageURL}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary"variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={()=>setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Delete this course? ({props.courseCode})
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>setDeleteOpen(false)}>No</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity='error' variant="filled">
                {alertMessage}
              </Alert>
            </Snackbar>
    </Card>
  );
}