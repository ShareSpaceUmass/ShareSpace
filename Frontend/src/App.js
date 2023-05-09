import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import LandingPage from './pages/Landing';
import { ThemeProvider } from '@mui/material/styles';
import theme from './lib/theme.js'
import QuizPage from "./pages/Quiz"
import PreferencePage from "./pages/Preferences";
import ProfilePage from "./pages/Profile"
import MatchPage from "./pages/Matches"
import ChatPage from "./pages/Chat";
import { AuthProvider, useIsAuthenticated } from 'react-auth-kit'




function App() {
  //https://github.com/react-auth-kit/react-auth-kit/issues/1023
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <AuthProvider authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/quiz" element={<PrivateRoute Component={QuizPage} />} />
            <Route path="/preferences" element={<PrivateRoute Component={PreferencePage} />} />
            <Route path="/profile" element={<PrivateRoute Component={ProfilePage} />} />
            <Route path="/matches" element={<PrivateRoute Component={MatchPage} />} />
            <Route path="/chat" element={<PrivateRoute Component={ChatPage} />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  );
}



export default App;