import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { GetCurrentTime, GetLowerBoundTime } from "./outstationcheck";
const CustomClockPicker = ({ onTimeChange }) => {
  const accessToken=Cookies.get("ACCESS_TOKEN");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const[startH,setStartH]=useState(0);
  const[endH,setEndH]=useState(0);
  const[startM,setStartM]=useState(0);
  const[endm,setEndM]=useState(0);
  useEffect(()=>{
    async function setParameters (accessToken) {
      const params = await GetLowerBoundTime(accessToken);
      const lb_time=params.one
      const Ub_time=params.three;
      console.log(lb_time.slice(0,3))
      setStartH(parseInt(lb_time.slice(0,3),10));
      setEndH(parseInt(Ub_time.slice(0,3),10))
    }
     setParameters(accessToken);
  },[])

  const hrsOnChange = (e) => {
    const newHours = e.target.value;
    setHours((prevHours) => {
      onTimeChange({ hours: newHours, minutes });
      return newHours;
    });
  };

  const minOnChange = (e) => {
    const newMinutes = e.target.value;
    setMinutes((prevMinutes) => {
      onTimeChange({ hours, minutes: newMinutes });
      return newMinutes;
    });
  };
  const hourPicker = (start = 0, end = 23, step = 1) => {
    
    const hour = [];
    for (let i = start; i <= end; i = i + step) {
      const formattedValue = i.toString().padStart(2, "0");
      hour.push(formattedValue);
    }
    return hour;
  };

  const minutePicker = (start = 0, end = 59, step = 1) => {
    const minute = [];
    for (let i = start; i <= end; i = i + step) {
      const formattedValue = i.toString().padStart(2, "0");
      minute.push(formattedValue);
    }
    return minute;
  };

  return (
    <>
      <div>
        <label htmlFor="hours">Hours: </label>
        <select
          value={hours}
          onChange={hrsOnChange}
          className="rounded-xl p-1 ms-1"
        >
          {hourPicker(startH,endH).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <label className="ms-2">Minutes:</label>
        <select
          value={minutes}
          onChange={minOnChange}
          className="rounded-xl p-1 ms-1"
        >
          {minutePicker().map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CustomClockPicker;
