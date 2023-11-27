import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CustomClockPicker from "./outstationclock";
import { GetWarden } from "./outstationcheck";
import Cookies from "js-cookie";

const OutStationForm = () => {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("Set Destination Address");
  const [contact, setContact] = useState();
  const [warden, setWarden] = useState("Shail Dean");

  const access_token = Cookies.get('ACCESS_TOKEN')
  useEffect(()=>{
    const getFields = async(access_token) =>{
      const get_warden_details = await GetWarden(access_token);
      const warden_name = get_warden_details.two;
      setWarden(warden_name);
    }

    getFields(access_token);
},[])

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return formattedDate;
  };

  const departureTimeHandler = (selectedTime) => {
    const fHr = String(selectedTime.hours);
    const fMm = selectedTime.minutes;
    const fSs = "00";

    const dTime = fHr + ":" + fMm + ":" + fSs;
    setDepartureTime(dTime);
  };

  const arrivalTimeHandler = (selectedTime) => {
    const fHr = String(selectedTime.hours);
    const fMm = selectedTime.minutes;
    const fSs = "00";

    const dTime = fHr + ":" + fMm + ":" + fSs;
    setArrivalTime(dTime);
  };
  console.log(departureTime,arrivalTime)
  return (
    <div className="shadow-xl rounded-xl p-2 m-2 bg-red-100">
      <div>
        <p className="font-bold p-2">Departure Date</p>
        <div className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
          <p>{departureDate}</p>
          <DatePicker
            onChange={(date) => setDepartureDate(handleDateChange(date))}
            dateFormat={`yyyy-MM-dd`}
          />
        </div>
      </div>
      <div>
        <p className="font-bold p-2">Departure Time</p>
        <div>
          <CustomClockPicker onTimeChange={departureTimeHandler} />
        </div>
        <p>Selected time by default is - {departureTime}</p>
      </div>
      <div>
        <p className="font-bold p-2">Arrival Date</p>
        <div className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
          <p>{arrivalDate}</p>
          <DatePicker
            onChange={(date) => setArrivalDate(handleDateChange(date))}
            dateFormat={`yyyy-MM-dd`}
          />
        </div>
      </div>
      <div>
        <p className="font-bold p-2">Arrival Time</p>
        <div>
          <CustomClockPicker onTimeChange={arrivalTimeHandler}/>
        </div>
        <p>Selected time by default is - {arrivalTime}</p>
      </div>
      <div>
        <p className="font-bold p-2">Destination</p>
        <input
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          className="w-auto p-2 border rounded-lg shadow-md"
        ></input>
      </div>
      <div>
        <p className="font-bold p-2">Destination Contact</p>
        <input
          type="number"
          value={contact}
          onChange={handleContactChange}
          className="w-auto p-2 border rounded-lg shadow-md"
        ></input>
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
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{warden}</p>
      </div>

      <div>
        <button className="bg-text-2 p-3 rounded-lg mt-5 text-white">
          Apply Gatepass
        </button>
      </div>
    </div>
  );
};
export default OutStationForm;