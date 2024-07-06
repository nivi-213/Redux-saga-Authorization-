import React, { useState } from "react";
import "./calender.css"
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function Calender() {
    const [slectedDate,setSelectedDate]=useState(new Date())
    return (
    <div className="calendarer">
      <div className="headerer">
        <button>
          <i class="fas fa-arrow-left"></i>
        </button>
        <select></select>
        <select></select>
        <button>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Calender;
