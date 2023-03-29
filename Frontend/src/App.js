import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import LandingPage from './pages/Landing';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material"
import theme from './lib/theme.js'
import PreferencePage from "./pages/Preferences";





function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/preferences" element={<PreferencePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;