import logo from './logo.svg';
import './App.css';

import RegisterForm from './components/SignupForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginForm from './components/login/Login';
import Home from './home/Home';
import AdminTable from './table/Admintable'; 
import UserTable from './table/Usertable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admintable" element={<AdminTable />} />
          <Route path="/admintable" element={<UserTable />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
