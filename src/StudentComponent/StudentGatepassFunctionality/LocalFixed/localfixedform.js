import { useState } from "react";

const LocalFixedForm = () => {
  const [date, setDate] = useState("13/11/2023");
  const [departureTime, setDepartureTime] = useState("12:00:00");
  const [arrivalTime, setArrivalTime] = useState("5:00:00");
  return (
    <div className="shadow-xl rounded-xl p-2 m-2 bg-red-100">
      <div>
        <p className="font-bold p-2">Departure and Arrival Date</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{date}</p>
      </div>
      <div>
        <p className="font-bold p-2">Departure Date</p>
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
        <button className="bg-text-2 p-3 rounded-lg mt-5 text-white">
          Apply Gatepass
        </button>
      </div>
    </div>
  );
};
export default LocalFixedForm;
