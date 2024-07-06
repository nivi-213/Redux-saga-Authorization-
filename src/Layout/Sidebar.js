import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faTable, faChartPie, faCog, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <div>
      
      <div className={`navigation ${active ? 'active' : ''}`}>
        <div>
          <img className='logopng' src="logo-sm.png" alt=""  width="30px" height="30px" />
</div>
        <ul>
          <li>
            <a href="#">
              <span className="icon"><FontAwesomeIcon icon={faHome} /></span>
              <span className="title">DashBoard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"><FontAwesomeIcon icon={faUsers} /></span>
              <span className="title">User Table</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"><FontAwesomeIcon icon={faTable} /></span>
              <span className="title">Admin Table</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"><FontAwesomeIcon icon={faChartPie} /></span>
              <span className="title">Reports</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"><FontAwesomeIcon icon={faCog} /></span>
              <span className="title">Settings</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
              <span className="title">Calendar</span>
            </a>
          </li>
          <li>
            <a href="#" className=''>
              <span className="icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={`toggle mr-5 ${active ? 'active' : ''}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={active ? 'times' : 'bars'} />
      </div>
    </div>
  );
};

export default Sidebar;
