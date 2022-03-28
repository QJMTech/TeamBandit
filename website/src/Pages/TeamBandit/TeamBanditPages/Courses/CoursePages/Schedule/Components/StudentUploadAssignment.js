import {React, useState, Fragment} from 'react'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const StudentUploadAssignment = ({setRowChange, assignment}) => {
    const [student_assignment_upload, setStudentAssignmentUpload] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setStudentAssignmentUpload(null);
    };

    const onFileChange = (e) => {
        setStudentAssignmentUpload(e.target.files[0]); 
    }

    const uploadStudentAssignment = async (event, assignment_id) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("student_assignment_upload", student_assignment_upload);
            formData.append("assignment_id", assignment_id);
        
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            await fetch(`${process.env.REACT_APP_BASEURL}/assignments/uploadStudentAssignment`, {
                method: "POST",
                headers: myHeaders,
                body: formData,
            });

            toast.success("Assignment was uploaded successfully!");
            setStudentAssignmentUpload(null);
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add assignment!");
        }
    };

    return (
        <Fragment>
            <Button
                sx={{ m: 1 }}
                variant="outlined"
                color="success"
                onClick={handleOpen}
            >
                {" "}
                Upload Assignment{" "}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Upload Your {assignment.assignment_name}
                        </Typography>
                    </Box>

                    <form encType="multipart/form-data">
                        <input type="file" accept="application/pdf" name="student_assignment_upload" onChange={onFileChange}/>
                    </form>

                    <Button
                        sx={{ m: 3 }}
                        variant="contained"
                        color="success"
                        onClick={(e) => (handleClose(), uploadStudentAssignment(e, assignment.assignment_id))}
                        startIcon={<AddIcon />}
                    >
                        {" "}
                        Upload{" "}
                    </Button>
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                    >
                        {" "}
                        Cancel{" "}
                    </Button>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default StudentUploadAssignment