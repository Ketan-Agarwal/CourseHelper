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
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import {clsx} from 'clsx';
import DialogContentText from '@mui/material/DialogContentText';


export default function MultiActionAreaCard(props: { imageURL: string; courseName: string; courseCode: string; credits:number; profName: string; description: string; }) {
const [open, setOpen] = React.useState(false);
const [openUpdate, setOpenUpdate] = React.useState(false);
const [formData, setFormData] = React.useState({
    courseName: props.courseName,
    courseCode: props.courseCode,
    credits: props.credits,
    profName: props.profName,
    description: props.description
  });
  const [openDelete, setDeleteOpen] = React.useState(false);

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
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
  const handleSubmit = () => {
    console.log('Updated data:', formData);
    handleCloseUpdate();
  };
  return (
    <Card sx={{ maxWidth: 435 }} className={styles.card}>
      <CardActionArea onClick={handleClickOpen}>
        <CardMedia
          component="img"
          height="140"
          image={props.imageURL}
          alt="Course Image"  sx={{
            objectFit: 'cover',
            height: '140px',
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
      <Button size="small" color="primary" variant='contained' onClick={handleClickOpenUpdate}>
          Update
        </Button>
        <Button size="small" color="warning" variant='contained'onClick={handleClickDeleteOpen} startIcon={<DeleteIcon />}>
          Delete
        </Button>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Delete this course? ({props.courseCode})
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}