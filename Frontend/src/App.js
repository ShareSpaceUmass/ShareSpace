import {
  BrowserRouter,
  Routes,
  Route,
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
import { RequireAuth } from 'react-auth-kit'
import { AuthProvider } from 'react-auth-kit'



function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/quiz" element={<RequireAuth loginPath={'/login'}>
              <QuizPage />
            </RequireAuth>} />
            <Route path="/preferences" element={<RequireAuth loginPath={'/login'}>
              <PreferencePage />
            </RequireAuth>} />
            <Route path="/profile" element={<RequireAuth loginPath={'/login'}>
              <ProfilePage />
            </RequireAuth>} />
            <Route path="/matches" element={<RequireAuth loginPath={'/login'}>
              <MatchPage />
            </RequireAuth>} />
            <Route path="/chat" element={<RequireAuth loginPath={'/login'}>
              <ChatPage />
            </RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}



export default App;