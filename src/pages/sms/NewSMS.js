import { LoadingButton } from '@mui/lab';
import { Button, Card, Container, Grid, Stack, TextField, Typography,MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import HttpService from '../../services/HttpService';



export default function NewSMS() {
  const generateRandomString = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 37; // same size as example string
    let result = "1"; // start with 1
    while (result.length < length) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const subStr = result.substring(0, 33); // Returns "Hello"
    return subStr;
  }

  const {coin,setCoin}=useState("BTC");
  
  const defaultValues = {
    name: '',
    balance: '',
    iban: generateRandomString(),
    email: '',
    userId: AuthService.getCurrentUser()?.id,
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState(defaultValues);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    console.log(formValues);
    event.preventDefault();
    HttpService.postWithAuth('/wallets', formValues)
      .then((response) => {
        console.log(response);
        enqueueSnackbar('Wallet created successfully', { variant: 'success' });
        navigate('/wallets');
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          error.response?.data?.errors.map((e) => enqueueSnackbar(e.message, { variant: 'error' }));
        } else if (error.response?.data?.message) {
          enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
        } else {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title> New Wallet | e-Wallet </title>
      </Helmet>
      <Container sx={{ minWidth: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            New Wallet
          </Typography>
        </Stack>
        <Card>
          <Grid container alignItems="left" justify="center" direction="column" sx={{ width: 400, padding: 5 }}>
            <Stack spacing={3}>
            <Select
                labelId="crypto-label"
                id="crypto-select"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
      >
        <MenuItem value="BTC">BTC</MenuItem>
        <MenuItem value="ETH">ETH</MenuItem>
        <MenuItem value="LTC">LTC</MenuItem>
      </Select>
              <TextField
                id="iban"
                name="iban"
                label="WALLET ADRESS"
                autoComplete="iban"
                required
                value={formValues.iban}
            
              />
              <TextField
                id="balance"
                name="balance"
                label="Balance"
                autoComplete="balance"
                required
                value={formValues.balance}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="right" justifyContent="end" sx={{ mt: 4 }}>
              <Button sx={{ width: 120 }} variant="outlined" onClick={() => navigate('/wallets')}>
                Cancel
              </Button>
              <LoadingButton sx={{ width: 120 }} size="large" type="submit" variant="contained" onClick={handleSubmit}>
                Save
              </LoadingButton>
            </Stack>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
