import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Get_time } from "./emergencycheck";
import { finalCheck } from "./emergencylogic";
import moment from "moment";
import CustomClockPicker from "./emergencyclock";

const EmergencyForm = () => {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("Set Destination Address");
  const [contact, setContact] = useState(0);
  const [visit, setVisit] = useState("");

  const handleVisitChange = (e) => {
    setVisit(e.target.value);
  };

  const access_token = Cookies.get("ACCESS_TOKEN");

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return formattedDate;
  };

  const arrivalTimeHandler = (selectedTime) => {
    const fHr = String(selectedTime.hours);
    const fMm = selectedTime.minutes;
    const fSs = "00";

    const dTime = fHr + ":" + fMm + ":" + fSs;
    setArrivalTime(dTime);
  };

  useEffect(() => {
    const get_values = async (access_token) => {
      const get_pTime = await Get_time(access_token);
      const time = get_pTime.current_time;
      const date = get_pTime.current_date;
      const arrival_date = add_one_day(date);
      setArrivalDate(arrival_date);
      setArrivalTime(time);
      setDepartureTime(time);
      setDepartureDate(date);
    };
    get_values(access_token);
  });

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleApplyButton = async (access_token, departureTime) => {
    if (reason.length === 0) {
      alert("You need to give reason");
    } else if (destination.length === 0) {
      alert("Enter your destination");
    } else if (visit.length === 0) {
      alert("Where are you visiting");
    } else {
      await finalCheck(
        access_token,
        departureTime,
        departureDate,
        arrivalDate,
        arrivalTime,
        reason,
        contact,
        destination,
        visit
      );
    }
  };

  return (
    <div className="shadow-xl rounded-xl p-2 m-2 bg-red-100">
      <div>
        <p className="font-bold p-2">Departure Date</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
          {departureDate}
        </p>
      </div>
      <div>
        <p className="font-bold p-2">Departure Time</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">
          {departureTime}
        </p>
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
          <CustomClockPicker
            onTimeChange={arrivalTimeHandler}
            date={arrivalDate}
          />
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
        <p className="font-bold p-2">Visit to</p>
        <input
          type="text"
          value={visit}
          onChange={handleVisitChange}
          className="w-auto p-2 border rounded-lg shadow-md"
        ></input>
      </div>

      <div>
        <button
          className="bg-text-2 p-3 rounded-lg mt-5 text-white"
          onClick={() =>
            handleApplyButton(
              access_token,
              departureTime,
              departureDate,
              arrivalDate,
              arrivalTime,
              reason,
              contact,
              destination,
              visit
            )
          }
        >
          Broadcast Emergency
        </button>
        <p className="text-red-500 font-bold">
          *Press the button only in case of emergency all the wardens (including
          Admins) will recieve mail to prioritize your request
        </p>
      </div>
    </div>
  );
};
export default EmergencyForm;

function add_one_day(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    console.error("Invalid date format. Please use 'yyyy-mm-dd'.");
    return null;
  }
  const nextDay = new Date(inputDate);
  nextDay.setDate(inputDate.getDate() + 1);
  const nextDayString = nextDay.toISOString().split("T")[0];

  return nextDayString;
}
