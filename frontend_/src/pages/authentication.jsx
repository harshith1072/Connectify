import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#411fed',
    },
    secondary: {
      main:'#411fed',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0: Sign In, 1: Sign Up
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100vh',
          background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            width: { xs: '90%', sm: '80%', md: '400px' },
            textAlign: 'center',
          }}
        >
          <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, gap: 2 }}>
            <Button
              variant={formState === 0 ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setFormState(0)}
              sx={{ borderRadius: 20, px: 4, textTransform: 'none' }}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setFormState(1)}
              sx={{ borderRadius: 20, px: 4, textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Box>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Box sx={{ color: 'error.main', mt: 1, mb: 1, fontSize: 14 }}>
                {error}
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.3,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: 'none',
              }}
              onClick={handleAuth}
            >
              {formState === 0 ? 'Login' : 'Register'}
            </Button>
          </Box>
        </Paper>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          message={message}
        />
      </Grid>
    </ThemeProvider>
  );
}
