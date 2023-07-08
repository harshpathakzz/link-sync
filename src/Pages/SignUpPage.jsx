import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { handleSignup } from "../functions/authFunctions";
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";

const SignUpPage = () => {
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
      await handleSignup(email, password);
      navigate("/login");
    } catch (error) {
      let errorMessage = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
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
              Sign Up
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
                    autoComplete="false"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            <Typography align="center">
              Have an account? <Link to="/login">Log in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
