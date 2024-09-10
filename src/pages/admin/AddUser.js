import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Card,Grid, Stack, IconButton, InputAdornment,TextField, } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import HttpService from '../../services/HttpService';
import AuthService from '../../services/AuthService';
import Iconify from './../../components/iconify';
import MyThemeProvider from '../../services/MyTheme';
import {useState } from "react";
export default function AddUser() {
  console.log("add user")
  const code = AuthService.getCurrentUser()?.code;
  const schoolCode = Number(code);
  console.log(code)
  const defaultValues = {

    username: '',
    password: '',
    phone: '',
    email: '',
    teacherId: 0,
    role:"user",
    schoolCode:schoolCode,
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRoleChange = (event,val) => {
    //setFromWalletIban(event.iban);
    const { name, value } = val;
    setFormValues({
      ...formValues,
      role: value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    HttpService.postWithoutAuth('/users/add', formValues)
      .then((response) => {
        enqueueSnackbar('User added successfully', { variant: 'success' });
        ////navigate('admin/users');
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
        <title> Add User | e-user </title>
      </Helmet>
      <MyThemeProvider>
      <Card>
        <Grid container alignItems="left" justify="left" direction="column" sx={{ width: 400, padding: 5 }}>
          <Stack spacing={3}>
             <TextField
              id="username"
              name="username"
              label="User Name"
              autoFocus
              required
              value={formValues.username}
              onChange={handleInputChange}
            />
            <TextField
          id="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          required
          value={formValues.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
             <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              
              required
              value={formValues.phone}
              onChange={handleInputChange}
            />
             <TextField
              id="email"
              name="email"
              label="Email"
              
              required
              value={formValues.email}
              onChange={handleInputChange}
            />
            <Autocomplete
              ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
              required
              disablePortal
              id="role"
              noOptionsText="no records"
              options={[{"name":"user","value":"user"},{"name":"admin","value":"admin"}]}
              getOptionLabel={(toWalletIban) => toWalletIban.name}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              onChange={(event, newValue) => {
                console.log(newValue)
                handleRoleChange(event,newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Role" />}
            />

          </Stack>
          <Stack spacing={2} direction="row" alignItems="right" justifyContent="end" sx={{ mt: 4 }}>
            <Button sx={{ width: 120 }} variant="outlined" onClick={() => navigate('/admin/users')}>
              Cancel
            </Button>
            <LoadingButton sx={{ width: 120 }} size="large" type="submit" variant="contained" onClick={handleSubmit}>
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Card>
      </MyThemeProvider>
    </>
  );
}
