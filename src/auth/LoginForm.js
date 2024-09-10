import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from './../components/iconify';
import AuthService from './../services/AuthService';

export default function LoginForm() {
  const [count, setCount] = useState(0);

  const defaultValues = {
    code: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
    setCount(count + 1);
    
    event.preventDefault();
    AuthService.login(formValues)
      .then((response) => {
       
       const test= response ? true: false;
       console.log("trst 2"+test)
       if(test){
        enqueueSnackbar("Login successful",{ variant: 'success' }) 
        navigate('/');
       }else{
        enqueueSnackbar("Login unsuccessful",{ variant: 'error' }) 
        navigate('/login');
       }
        
       
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
      <Stack spacing={3}>
      <TextField
          id="code"
          name="code"
          label="school code"
          autoComplete="code"
          required
          autoFocus
          value={formValues.code}
          onChange={handleInputChange}
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          required
          autoFocus
          value={formValues.email}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Log in
      </LoadingButton>
    </>
  );
}
