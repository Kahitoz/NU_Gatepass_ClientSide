  import { useEffect, useState } from "react";
  import Localfixedlogic from "./localfixedlogic";
  import { Display_date_time, call_window_Screen } from "./localfixedlogic";
  import G1_MessageModal from "../../../GlobalComponent/G1_MessageModal";
  import Cookies from "js-cookie";

  const LocalFixedForm = () => {
    const [date, setDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const accessToken = Cookies.get("ACCESS_TOKEN");

    useEffect(()=>{
      const displaydata = async ()=>{
        try{
          const data = await Display_date_time(accessToken);
          console.log("this is data", data)
          setDate(data.get_date);
          setDepartureTime(data.startTime);
          setArrivalTime(data.endTime);
        }catch(error){
          console.log(error);
        }
      };

      displaydata();
    },[])

    const handle_apply_gatepass = () =>{
      Localfixedlogic();
      
    }

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
          <button className="bg-text-2 p-3 rounded-lg mt-5 text-white" onClick={handle_apply_gatepass}>
            Apply Gatepass
          </button>
        </div>
      </div>
    );
  };
  export default LocalFixedForm;
