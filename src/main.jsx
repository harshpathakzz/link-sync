import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
import { LinkProvider } from "./context/LinkContext.jsx";
import { TitleAndBioProvider } from "./context/TitleAndBioContext.jsx";
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserAuthProvider>
          <LinkProvider>
            <TitleAndBioProvider>
              <App />
              <Toaster richColors={true} theme="dark"/>
            </TitleAndBioProvider>
          </LinkProvider>
        </UserAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
