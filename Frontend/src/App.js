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
import PreferencePage from "./pages/Preferences";
import ProfilePage from "./pages/Profile"
import MatchPage from "./pages/Matches"
import ChatPage from "./pages/Chat";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/preferences" element={<PreferencePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/matches" element={<MatchPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;