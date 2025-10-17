import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'flowbite';
import 'flowbite-react';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
