import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import HomeLayout from "./components/Layout/homeLayout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Test from "./pages/test/Test";
import Org from "./pages/org/Org";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MFAPage from "./pages/mfa/MFAPage";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1769aa', // Adjust as needed
            contrastText: '#fff', // Button text color
        },
        background: {
            default: '#08192c', // Default background color for dark mode
            paper: '#6166ed', // Paper background color
            input: '#fff', // Input background color
        },
    },
});


function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="hi" element={<h1>asdasd</h1>} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="mfa" element={<MFAPage/>} />
                <Route path="test" element={<Test />} />
                <Route path="org" element={<Org />} />
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
