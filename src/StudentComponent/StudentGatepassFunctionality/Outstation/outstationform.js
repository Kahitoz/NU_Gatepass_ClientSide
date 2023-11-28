import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CustomClockPicker from "./outstationclock";
import {
  GetWarden,
  GetCurrentTime,
  Get_Date,
  GetLowerBoundTime,
} from "./outstationcheck";
import Cookies from "js-cookie";
import { finalCheck } from "./outstationlogic";

const OutStationForm = () => {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("08:00:00");
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [contact, setContact] = useState(0);
  const [warden, setWarden] = useState("");
  const [wuid, setWuid] = useState("");
  const [visit, setVisit] = useState("");

  const access_token = Cookies.get("ACCESS_TOKEN");
  useEffect(() => {
    const getFields = async (access_token) => {
      const get_warden_details = await GetWarden(access_token);
      const get_current_time = await GetCurrentTime(access_token);
      const get_todays_date = await Get_Date(access_token);
      const get_buffer_time = await GetLowerBoundTime(access_token);

      const b_time = parseInt(get_buffer_time.four, 10);

      const c_date = get_todays_date.date;
      const c_hr = get_current_time.Hr;
      const i_cr = parseInt(c_hr) + b_time;
      const s_cr = String(i_cr);
      const c_min = get_current_time.Min;
      const current_time = s_cr + ":" + c_min + ":" + "00";
      const warden_name = get_warden_details.two;
      const warden_uid = get_warden_details.one;
      setDepartureTime(current_time);
      setArrivalDate(add_one_day(c_date));
      setDepartureDate(c_date);
      setWarden(warden_name);
      setWuid(warden_uid);
    };

    getFields(access_token);
  }, [access_token]);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleVisitChange = (e) => {
    setVisit(e.target.value);
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

  const handleApplyButton = async (access_token, departureTime) => {
    if (reason.length === 0) {
      alert("You need to give reason");
    } else if (contact.length !== 10) {
      alert("Phone Number is not valid");
    } else if (destination.length === 0) {
      alert("Enter your destination");
    }else if(visit.length === 0){
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
        wuid,
        visit,
      );
    }
  };

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
          <CustomClockPicker
            onTimeChange={departureTimeHandler}
            date={departureDate}
          />
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
        <p className="font-bold p-2">Warden</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{warden}</p>
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
              wuid,
              visit,
            )
          }
        >
          Apply Gatepass
        </button>
      </div>
    </div>
  );
};
export default OutStationForm;

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
