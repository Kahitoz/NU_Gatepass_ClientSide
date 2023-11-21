import { useState } from "react"

const CustomClockPicker = () =>{
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const hrsOnChange = (e) =>{
        setHours(e.target.value);
    }
    const minOnChange = (e) =>{
        setMinutes(e.target.value);
    }

    const secOnChange = (e) =>{
        setSeconds(e.target.value);
    }

    const hourPicker = (start, end , step) =>{
        const hour = []
        for (let i = start; i<=end; i=i+step){
            option.push(i);
        }
        return hour;
    }

    return(
        <>
        <div>
            <label htmlFor="hours">Hours: </label>
            <select value={hours}>
                {hourPicker(0, 23 ,1).map((hour)=>(
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))}
            </select>
        </div>
        </>
    );
}
export default CustomClockPicker;