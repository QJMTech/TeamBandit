import { React, useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import TeamBanditLogo from "../../Images/logo.png";

const theme = createTheme();

const SubmissionPage = () => {
    const windowValue = window.location.hash.replace("#/submission/", "");
    const regExp = /%20/g;
    const windowString = windowValue.replace(regExp, " ");
    const submissionCourse = windowString.split("-");

    const [submissionInfo, setSubmissionInfo] = useState([]);

    const getSubmission = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/submission/${submissionCourse[1]}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setSubmissionInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getSubmission();
    }, []);

    if (submissionInfo !== null) {
        return(
            <div style={{ width: "100%" }}>
                <object
                    data={`${process.env.PUBLIC_URL}/uploads/documents/studentAssignments/${submissionInfo.submission}`}
                    type="application/pdf"
                    style={{ minHeight: "100vh", width: "100%" }}
                >
                    You are unable to view this document
                </object>
            </div>
        );
    }
    else 
    {
        return (<div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    style={{ backgroundColor: `#002454` }}
                    position="relative"
                >
                    <Toolbar style={{ backgroundColor: `#002454` }}>
                        <Typography variant="h6" color="inherit" noWrap>
                            TeamBandit
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Typography
                variant="h1"
                style={{
                    color: "#002454",
                    textShadow: "1px 1px 2px black",
                }}
            >
                {" "}
                404{" "}
            </Typography>
            <Typography
                variant="h4"
                style={{
                    color: "#FAC01A",
                    textShadow: "1px 1px 2px black",
                }}
            >
                {" "}
                This Submission Does Not Exist{" "}
            </Typography>
            
                <img
                    src={TeamBanditLogo}
                    alt="Logo"
                    width="250px"
                    height="250px"
                />
            <Link to="/"><Button variant="contained" style={{backgroundColor:"#002454"}}> GO BACK TO HOME PAGE </Button></Link>
        </div>
    );
    }
};

export default SubmissionPage;