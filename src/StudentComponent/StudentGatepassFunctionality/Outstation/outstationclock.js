import React, { useEffect, useState } from "react";
import { GetLowerBoundTime, Get_Date, checkDates } from "./outstationcheck";
import Cookies from "js-cookie";

export function timeAdder(one, two) {
  const sum = one + two;
  if (sum > 23) {
    return 24 - sum;
  } else {
    return sum;
  }
}

const CustomClockPicker = ({ onTimeChange, date }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [startH, setStartH] = useState(0);
  const [endH, setEndH] = useState(0);

  const access_token = Cookies.get("ACCESS_TOKEN");
  useEffect(() => {
    const real_time = async (access_token) => {
      const data = await Get_Date(access_token);
      const cData = await GetLowerBoundTime(access_token);
      const gDate = await Get_Date(access_token);
      const cDate = gDate.date;

      const val1 = checkDates(cDate, date);

      const ub_time = cData.three;
      const ub_hr = ub_time.slice(0, 3);
      const int_ub_hr = parseInt(ub_hr, 10) - 1;

      const bufferTime = cData.four;
      const intbufferTime = parseInt(bufferTime);

      const int_lb_hr = parseInt(cData.one.slice(0, 3), 10);

      setEndH(int_ub_hr);

      const time = data.time;

      const hr = time.slice(0, 3);
      const inthr = parseInt(hr, 10);

      const minute = time.slice(3, 6);
      const intmin = parseInt(minute, 10);

      const startTime = timeAdder(inthr, intbufferTime);

      if (val1 === 0) {
        setStartH(startTime);
      } else if (val1 === 1) {
        setStartH(int_lb_hr);
      } else if (val1 === -1) {
        alert("Invalid Date Selected");
      }
      setHours(startTime);
      setMinutes(intmin);
    };
    real_time(access_token);
  }, [date]);

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

  const hourPicker = (start = startH, end = endH, step = 1) => {
    const hour = [];
    // if(start>=end){
    //   setStop(true);
    // }
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
