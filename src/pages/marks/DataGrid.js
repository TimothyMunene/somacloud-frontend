import React from 'react';
import { Card, Box, Grid } from '@mui/material';
import DataCombo from './Combo';

function DataGrid() {
  return (
    
      <Box sx={{ width: '100%', padding: 0, pt: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <DataCombo type="subjects" title="Select Subject" />
            </Grid>
            <Grid item xs={12} md={2}>
              <DataCombo type="exams" title="Select Exam"/>
            </Grid>
            <Grid item xs={12} md={2}>
              <DataCombo type="classes" title="Select Class"/>
            </Grid>
            <Grid item xs={12} md={2}>
              <DataCombo type="terms" title="Select Term"/>
            </Grid>
            <Grid item xs={12} md={2}>
              <DataCombo type="years" title="Select Year"/>
            </Grid>
          </Grid>
        </Box>
      </Box>
   
  );
}
export default DataGrid