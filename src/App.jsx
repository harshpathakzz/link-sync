import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import UserPage from "./Pages/UserPage";
import { useUserAuth } from "./context/UserAuthContext";
import Protected from "./Components/Protected";
import RequestLoginPage from "./Pages/RequestLoginPage";

function App() {
  const { isLoggedIn } = useUserAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

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

        <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
      </Routes>
    </>
  );
}

export default App;
