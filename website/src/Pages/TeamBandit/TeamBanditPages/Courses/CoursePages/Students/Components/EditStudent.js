import React, {useState} from "react";

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditStudent = ({courseInfo, student, setRowChange}) => {
    
    // Variables 
    const [student_fname, setFname] = useState(student.student_fname);
    const [student_lname, setLname] = useState(student.student_lname);
    const [student_emplid, setStudentID] = useState(student.student_emplid);
    const [student_email, setEmailAddress] = useState(student.student_email);
    const [student_gpa, setGPA] = useState(student.student_gpa);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFname(student.student_fname);
        setLname(student.student_lname);
        setStudentID(student.student_emplid);
        setEmailAddress(student.student_email);
        setGPA(student.student_gpa);
    };

    //edit description function
    const updateStudent = async e => {
        e.preventDefault();
        try {
            const body = {student_fname, student_lname, student_emplid, student_email, student_gpa};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/students/students/${student.student_id}`, {method: "PUT", headers: myHeaders, body: JSON.stringify(body)});

            toast.success("Student was successfully updated!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update student!");
        }
    };

    // Delete function
    const deleteStudent = async (id) => {
        try {
            const course_id = courseInfo.course_id;
            
            const PLEASE = {course_id};
            
            
            await fetch(`${process.env.REACT_APP_BASEURL}/students/students/${id}/${course_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token },
                body: JSON.stringify(PLEASE)
            });


            toast.success("Student was deleted!");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete student!");
        }
    }

    return (
        <div>
            <Button variant="outlined" color="warning" onClick={handleOpen} startIcon={<EditIcon />}>
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Student
                        </Typography>
                    </Box>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Fill out the forms you would like to change:
                </Typography>
                
                        
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="First Name" type = "text" value = {student_fname} onChange = {e => setFname(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Last Name" type = "text" value = {student_lname} onChange = {e => setLname(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Student ID" type = "text" value = {student_emplid} onChange = {e => setStudentID(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="Email Address" type = "text" value = {student_email} onChange = {e => setEmailAddress(e.target.value)}/>
                <TextField sx={{ m: 2 }} variant="filled" id ="filled-password-input" label="GPA" type = "text" value = {student_gpa} onChange = {e => setGPA(e.target.value)}/>        
                <Button sx={{ m: 2 }} variant="contained" color="warning" onClick = {(e) => (handleClose(), updateStudent(e))}> Update </Button>
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose}> Cancel </Button>
                <Button variant="outlined" color="error" onClick = {() => deleteStudent(student.student_id)} startIcon={<DeleteIcon />}> PERMANENTLY DELETE </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default EditStudent;
