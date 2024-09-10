import { Card, Container, Stack, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Marks from "./Marks";

import DataCombo from "./Combo";

import AuthService from "../../services/AuthService";

import axios from "../../services/axios";
import { useEffect } from "react";
import MarkEntry from './MarkEntry';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MarkTabs() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  

  const handleSelectedExam = (value) => {
    setSelectedExam(value);
    //console.log(value); // log the selected value to the console
  };
  const handleSelectedSubject = (value) => {
    setSelectedSubject(value);
    //console.log(value); // log the selected value to the console
  };
  const handleSelectedYear = (value) => {
    setSelectedYear(value);
    //console.log(value); // log the selected value to the console
  };
  const handleSelectedTerm = (value) => {
    setSelectedTerm(value);
    ///console.log(value); // log the selected value to the console
  };
  const handleSelectedClass = (value) => {
    setSelectedClass(value);
    //console.log(value); // log the selected value to the console
  };
  //const code = AuthService.getCurrentUser()?.code;
  const school=JSON.parse(localStorage.getItem("school"));
  const code = Number(school?.schoolCode);
  useEffect(() => {
   
    
   
    axios
      .get(`/synch/combo/data?schoolCode=${code}`)
      .then((response) => setData(response.data))
      .catch((error) => {});
  }, []);
  //console.log("examId="+selectedExam?.examId)
const selections={classId:selectedClass?.classId,termId:selectedTerm?.termId,year:selectedYear?.year,subjectCode:selectedSubject?.subjectCode,examId:selectedExam?.examId}
  return (
    <>
      <Helmet>
        <title> Marks | e-marks </title>
      </Helmet>
      <Container sx={{ minWidth: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h4" gutterBottom>
            Marks
          </Typography>
        </Stack>
        <Box sx={{ width: "100%", padding: 0, pt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <DataCombo
                  onSelectedValue={handleSelectedSubject}
                  dt={data["subjects"]}
                  
                  type="subjects"
                  title="Select Subject"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <DataCombo
                  onSelectedValue={handleSelectedExam}
                  dt={data["exams"]}
                  type="exams"
                  title="Select Exam"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <DataCombo
                  onSelectedValue={handleSelectedClass}
                  dt={data["classes"]}
                  type="classes"
                  title="Select Class"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <DataCombo
                  onSelectedValue={handleSelectedTerm}
                  dt={data["terms"]}
                  type="terms"
                  title="Select Term"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <DataCombo
                  onSelectedValue={handleSelectedYear}
                  dt={data["years"]}
                  type="years"
                  title="Select Year"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Card>
          <Box sx={{ width: "100%", padding: 0, pt: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Marks" {...a11yProps(0)} />
                <Tab label="MarkList" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <MarkEntry dat={selections} code={Number(code)} />
        
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Marks dat={selections} />
            </TabPanel>
          </Box>
        </Card>
      </Container>
    </>
  );
}
