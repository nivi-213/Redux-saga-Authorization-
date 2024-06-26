import React, { useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

const navigate =useNavigate()
  const handleRegisterClick = (e) => {
    e.preventDefault();
      setIsModalOpen(true);
      navigate("/signup")
  };




  return (
    <div>
      <div className="overlay" style={{ display: isModalOpen ? 'block' : 'none' }}></div>
      <p className="logo  mt-5">Herbal Tone</p>
      <div className="right-container">
        <h2>Herbology </h2>
        <p>Register today to receive save the Product.</p>
        <button className="modal-button" onClick={handleRegisterClick}>REGISTER</button>
      </div>
     
    </div>
  );
};

export default Home;
