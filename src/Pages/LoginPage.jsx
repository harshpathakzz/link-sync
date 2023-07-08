import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  handleGoogleLogin,
  handleLogin,
  handleGuestLogin,
} from "../functions/authFunctions";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  IconButton,
  Paper,
} from "@mui/material";
import { Google } from "@mui/icons-material";

const LoginPage = () => {
  const { isLoggedIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(email, password);
      navigate("/admin");
    } catch (error) {
      let errorMessage = "";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect credentials";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/timeout":
          errorMessage = "Timeout occurred";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error";
          break;
        default:
          errorMessage = error.message;
          break;
      }

      setError(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      await handleGuestLogin();
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ padding: 2 }}>
        <Grid container justifyContent="center" spacing={2} direction="column">
          <Grid item>
            <Typography variant="h4" align="center">
              Login
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" fullWidth>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleGoogleSignIn}
              startIcon={<Google />}
              fullWidth
            >
              Sign in with Google
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleGuestSignIn} fullWidth>
              Guest Login
            </Button>
          </Grid>
          <Grid item>
            <Typography align="center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginPage;
