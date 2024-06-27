// import logo from './logo.svg';
// import './App.css';

// import RegisterForm from './components/SignupForm';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// import LoginForm from './components/login/Login';
// import Home from './home/Home';
// import AdminTable from './table/Admintable'; 
// import UserTable from './table/Usertable';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />

//           <Route path="/home" element={<Home />} />
//           <Route path="/signup" element={<RegisterForm />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/admintable" element={<AdminTable />} />
//           <Route path="/usertable" element={<UserTable />} />

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import RegisterForm from './components/SignupForm';
import LoginForm from './components/login/Login';
import Home from './home/Home';
import AdminTable from './table/Admintable';
import UserTable from './table/Usertable';
import Layout from './home/Layouts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admintable" element={<AdminTable />} />
          <Route path="/usertable" element={<UserTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
