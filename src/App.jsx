import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import LandingPage from "./Pages/LandingPage";
import AdminPage from "./Pages/AdminPage";
import UserPage from "./Pages/UserPage";
import { useUserAuth } from "./context/UserAuthContext";
import Protected from "./Components/Protected";
import RequestLoginPage from "./Pages/RequestLoginPage";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./Components/Footer";

function App() {
  const { isLoggedIn } = useUserAuth();

  const appContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainContentStyle = {
    flex: 1,
  };

  return (
    <div style={appContainerStyle}>
      <Analytics />
      <main style={mainContentStyle}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/admin"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <AdminPage />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/request-login" element={<RequestLoginPage />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
