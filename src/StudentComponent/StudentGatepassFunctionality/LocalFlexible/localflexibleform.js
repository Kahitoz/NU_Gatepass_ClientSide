import { useEffect, useState } from "react";
import {
  Get_Date,
  GetLowerBoundTime,
  GetWardenDetails,
  GetCurrentTime,
  CheckGatepassStatus,
} from "./localflexiblecheck";
import { finalCheck } from "./localflexiblelogic";
import CustomClockPicker from "./localFlexibleClock";
import Cookies from "js-cookie";

const LocalFlexibleForm = () => {
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("17:00:00");
  const [arrivalTime, setArrivalTime] = useState("5:00:00");
  const [reason, setReason] = useState("");
  const [warden, setWarden] = useState("");
  const [uid, setUid] = useState("");

  const accessToken = Cookies.get("ACCESS_TOKEN");

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  useEffect(() => {
    const get_Date = async (accessToken) => {
      await CheckGatepassStatus(accessToken);
      const date = await Get_Date(accessToken);
      const cDate = date.date;
      setDate(cDate);
    };

    const get_lbValue = async (accessToken) => {
      const get_values = await GetLowerBoundTime(accessToken);
      const end_time = get_values.two;
      setArrivalTime(end_time);
    };

    const get_warden_details = async (accessToken) => {
      const data = await GetWardenDetails(accessToken);
      const name = data.two;
      const uid = data.one;
      setUid(uid);
      setWarden(name);
    };

    const get_current_time = async(accessToken) =>{
      const time = await GetCurrentTime(accessToken);
      setDepartureTime(time);
    }
    get_Date(accessToken);
    get_lbValue(accessToken);
    get_current_time(accessToken);
    get_warden_details(accessToken);
  }, []);

  const timeValue = (selectedTime) => {
    const fHr = String(selectedTime.hours);
    const fMm = selectedTime.minutes;
    const fSs = "00";

    const dTime = fHr + ":" + fMm + ":" + fSs;
    setDepartureTime(dTime);
  };

  const handle_apply_gatepass = async (
    access_token,
    departureTime,
    wardenUID,
    departureDate,
    arrivalDate,
    arrivalTime,
    purpose
  ) => {
    if (reason.length === 0) {
      alert("You need to give reason");
    }
    await finalCheck(
      access_token,
      departureTime,
      wardenUID,
      departureDate,
      arrivalDate,
      arrivalTime,
      purpose
    );
  };

  return (
    <div className="shadow-xl rounded-xl p-2 m-2 bg-red-100">
      <div>
        <p className="font-bold p-2">Departure and Arrival Date</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{date}</p>
      </div>
      <div>
        <p className="font-bold p-2">Departure Time</p>
        <div className="bg-gray-200 rounded-xl p-2">
          <CustomClockPicker onTimeChange={timeValue} />
        </div>
        <div>
          <p>
            This is selected departureTime - {departureTime}
          </p>
        </div>
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
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{warden}</p>
      </div>

      <div>
        <button
          className="bg-text-2 p-3 rounded-lg mt-5 text-white"
          onClick={() =>
            handle_apply_gatepass(
              accessToken,
              departureTime,
              uid,
              date,
              date,
              arrivalTime,
              reason
            )
          }
        >
          Apply Gatepass
        </button>
      </div>
    </div>
  );
};
export default LocalFlexibleForm;
