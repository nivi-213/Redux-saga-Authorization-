import logo from './logo.svg';
import './App.css';

import RegisterForm from './components/SignupForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path="/signup" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
          
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
