import React, { useEffect, useState } from "react";
import { Get_Date } from "./localflexiblecheck";
import Cookies from "js-cookie";

const CustomClockPicker = ({ onTimeChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [startH, setStartH] = useState(0);

  const access_token = Cookies.get("ACCESS_TOKEN");
  useEffect(() => {
    const real_time = async (access_token) => {
      const data = await Get_Date(access_token);
      const time = data.time;

      const hr = time.slice(0, 3);
      const inthr = parseInt(hr, 10);

      const minute = time.slice(3, 6);
      const intmin = parseInt(minute, 10);

      setStartH(inthr);
      setMinutes(intmin);
    };
    real_time(access_token);
  }, []);

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

   const hourPicker = (start = startH, end = 23, step = 1) => {
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
          {hourPicker().map((hour) => (
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
