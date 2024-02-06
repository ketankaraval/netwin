import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FlexBox from '../components/FlexBox';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // Call your API here
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <FlexBox
        px={2}
        minHeight="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={values.username}
            onChange={handleChange('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </FlexBox>
    </Container>
  );
};

export default Login;
