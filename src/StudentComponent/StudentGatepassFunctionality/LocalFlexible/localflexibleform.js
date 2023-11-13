import { useState } from "react";
const LocalFlexibleForm = () =>{
    const [date, setDate] = useState("13/11/2023");
    const [departureTime, setDepartureTime] = useState("12:00:00");
    const [arrivalTime, setArrivalTime] = useState("5:00:00");
    const [reason, setReason] = useState("")
    const [warden, setWarden] = useState("Shail Dean")

    const handleReasonChange = (e) =>{
        setReason(e.target.value)
    }

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
          <p className="font-bold p-2">Reason</p>
          <input 
          type="text"
          value={reason}
          onChange={handleReasonChange}
          className="w-auto p-2 border rounded-lg shadow-md"
          ></input>
        </div>

        <div>
          <p className="font-bold p-2">Warden</p>
          <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
            {warden}
          </p>
        </div>
        
        <div>
          <button className="bg-text-2 p-3 rounded-lg mt-5 text-white">
            Apply Gatepass
          </button>
        </div>
      </div>
    );
}
export default LocalFlexibleForm;