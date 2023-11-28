import { useEffect, useState } from "react";
import Localfixedlogic from "./localfixedlogic";
import { Display_date_time } from "./localfixedchecks";
import Cookies from "js-cookie";
import { return_true, Get_dates } from "../GatepassDropDownHandler";

const LocalFixedForm = () => {
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const accessToken = Cookies.get("ACCESS_TOKEN");

  useEffect(() => {
    const displaydata = async () => {
      try {
        const data = await Display_date_time(accessToken);
        const data_1 = await return_true(accessToken);
        const data_2 = await Get_dates(accessToken);

        const start_time = data_2.start_time.concat(':00');
        const end_time = data_2.end_time.concat(':00');

        if (data_1 === true) {
          setDepartureTime(start_time);
          setArrivalTime(end_time);
        } else {
          setDepartureTime(data.startTime);
          setArrivalTime(data.endTime);
        }
        setDate(data.get_date);
      } catch (error) {
        console.log(error);
      }
    };

    displaydata();
  }, []);

  const handle_apply_gatepass = () => {
    Localfixedlogic();
  };

  return (
    <div className="shadow-xl rounded-xl p-2 m-2 bg-red-100">
      <div>
        <p className="font-bold p-2">Departure and Arrival Date</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{date}</p>
      </div>
      <div>
        <p className="font-bold p-2">Departure Time</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
          {departureTime}
        </p>
      </div>
      <div>
        <p className="font-bold p-2">Arrival Time</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
          {arrivalTime}
        </p>
      </div>
      <div>
        <button
          className="bg-text-2 p-3 rounded-lg mt-5 text-white"
          onClick={handle_apply_gatepass}
        >
          Apply Gatepass
        </button>
      </div>
    </div>
  );
};
export default LocalFixedForm;
