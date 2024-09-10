import React, { useState } from 'react';
import { Autocomplete, TextField, Card, Container, Stack, Grid, Box, Tab, Tabs, Typography } from '@mui/material';

const MyAutocomplete = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // Replace this with your actual autocomplete options
  const options = ['Option 1', 'Option 2', 'Option 3'];
  

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Box p={2}>
              <Autocomplete
                value={value}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Autocomplete" variant="outlined" />
                )}
              />
              <Typography variant="body1" gutterBottom>
                Currently selected value: {inputValue}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyAutocomplete;