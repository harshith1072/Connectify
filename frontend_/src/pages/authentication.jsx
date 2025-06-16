// Import React and necessary Material UI components
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel'; // Not used here
import Checkbox from '@mui/material/Checkbox'; // Not used here
import Link from '@mui/material/Link'; // Not used here
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography'; // Not used here
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext'; // Import Auth context for login/register functions
import { Snackbar } from '@mui/material';

// Create a default Material UI theme
const defaultTheme = createTheme();

export default function Authentication() {

    // State variables for form fields and UI control
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState(); // Used only in Sign Up
    const [error, setError] = React.useState(); // For displaying error message
    const [message, setMessage] = React.useState(); // For Snackbar success message
    const [formState, setFormState] = React.useState(0); // 0 = Sign In, 1 = Sign Up
    const [open, setOpen] = React.useState(false); // Controls Snackbar visibility

    // Access login/register functions from AuthContext
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    // Function to handle authentication logic
    let handleAuth = async () => {
        try {
            if (formState === 0) {
                // Login case
                let result = await handleLogin(username, password);
            }
            if (formState === 1) {
                // Register case
                let result = await handleRegister(name, username, password);
                console.log(result);
                // Reset form and show success message
                setUsername("");
                setPassword("");
                setName("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0); // Switch back to login after registration
            }
        } catch (err) {
            // Show error message if login/register fails
            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }

    // Render the UI
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline /> {/* Normalize styles across browsers */}
                
                {/* Left side with background image */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                 sx={{
  backgroundImage: 'url("/bg4.png")', // ✅ Correct usage
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}


                />

                {/* Right side with form */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Lock icon avatar */}
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        {/* Toggle between Sign In and Sign Up */}
                        <div>
                            <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
                                Sign Up
                            </Button>
                        </div>

                        {/* Form fields */}
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {/* Only show Full Name field during Sign Up */}
                            {formState === 1 ? (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Full Name"
                                    name="username"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            ) : null}

                            {/* Username field */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            {/* Password field */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                            />

                            {/* Display error message */}
                            <p style={{ color: "red" }}>{error}</p>

                            {/* Submit button */}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Snackbar for success message */}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </ThemeProvider>
    );
}
