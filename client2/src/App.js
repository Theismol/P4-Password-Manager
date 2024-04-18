import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import HomeLayout from './components/Layout/homeLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hi" element={<h1>asdasd</h1>} />
        </Route>
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
