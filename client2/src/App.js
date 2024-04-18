import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import HomeLayout from "./components/Layout/homeLayout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="hi" element={<h1>asdasd</h1>} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<h1>not found</h1>} />
        </Routes>
    );
}

export default App;
