import { Card, Container, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import AddUser from './AddUser';
import UserList from './UserList';
//import WalletToWallet from './WalletToWallet';
//import WithdrawFunds from './WithdrawFunds';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> Users | e-user </title>
      </Helmet>
      <Container sx={{ minWidth: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>
        <Card>
          <Box sx={{ width: '100%', padding: 0, pt: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Users" {...a11yProps(0)} />
                <Tab label="Add Users" {...a11yProps(1)} />
                
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <UserList/>
            </TabPanel>
  
            <TabPanel value={value} index={1}>
              <AddUser/>
            </TabPanel>
          
            
          </Box>
        </Card>
      </Container>
    </>
  );
}
