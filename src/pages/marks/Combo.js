import React, { useState, useEffect,useRef } from 'react';
import { capitalCase } from 'change-case';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import MyThemeProvider from '../../services/MyTheme';

function DataCombo({ title, type, dt, onSelectedValue }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const rerenderRef = useRef(0);

  useEffect(() => {
    if (dt?.length > 0) {
      if(selectedValue===null){
        setSelectedValue(dt[0]); // set the first item as the default selection
        onSelectedValue(dt[0]);
        console.log('input init value');
        console.log(selectedValue);
      }
       // pass the first item to the parent component
    }
  }, [dt, onSelectedValue]);

  const handleSelect = (event, value) => {
    
    setSelectedValue(value);
    onSelectedValue(value); // pass the selected value to the parent component
    rerenderRef.current += 1; // Trigger a re-render
    console.log('input select change value');
    console.log(value);
  };


  /*const handleInputChange = (event, value) => {
    setInputValue(value);
    console.log(value);
    console.log('input change value');
    console.log(value);
  };*/

  const handleInputChange = (event, value, reason) => {
    if (reason === 'selectOption') {
      // The user has selected an option from the dropdown
      setSelectedValue(value);
      onSelectedValue(value); // pass the selected value to the parent component
      console.log('input chnage 3');
      console.log(value);
    }
  };



 

  const getOptionSelected = (option, value) => {
    if (type === 'years') {
      return option.year === value.year;
    }
    if (type === 'terms') {
      return option.termID === value.termID;
    }
    if (type === 'classes') {
      return option.classID === value.classID;
    }
    if (type === 'subjects') {
      return option.subjectCode === value.subjectCode;
    }
    if (type === 'exams') {
      return option.examId === value.examId;
    }
  };

  return (
    <MyThemeProvider>
      <Autocomplete
        options={dt}
        value={selectedValue}
        onChange={handleSelect}
        mytitle={type}
        getOptionLabel={(d) => {
          if (type === 'years') {
            return capitalCase(d.year.toString());
          }
          if (type === 'terms') {
            return capitalCase(d.termName.toString());
          }
          if (type === 'classes') {
            return capitalCase(d.initials.toString());
          }
          if (type === 'subjects') {
            return capitalCase(d.subjectName.toString());
          }
          if (type === 'exams') {
            return capitalCase(d.examName.toString());
          }
        }}
        getOptionSelected={getOptionSelected}
        sx={{
          '& .MuiTypography-root': {
            fontFamily: 'Custom Font, sans-serif',
            fontSize: '8px', // adjust font size as needed
          },
        }}
        renderInput={(params) => <TextField {...params} label={title} />}
      />
    </MyThemeProvider>
  );
}

export default DataCombo;