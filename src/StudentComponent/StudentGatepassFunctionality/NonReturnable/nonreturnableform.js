import { useState } from "react";
const NonReturnAbleForm = () => {
  const [departureDate, setDepartureDate] = useState("13/11/2023");
  const [departureTime, setDepartureTime] = useState("12:00:00");
  const [destination, setDestination] = useState("Set Destination Address");
  const [contact, setContact] = useState();
  const [warden, setWarden] = useState("Shail Dean");

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
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
        <p className="font-bold p-2">Warden</p>
        <p className="bg-gray-200 text-gray-700 p-2 rounded-xl ">{warden}</p>
      </div>

      <div>
        <button className="bg-text-2 p-3 rounded-lg mt-5 text-white">
          Apply Gatepass
        </button>
        <p className="text-red-500 font-bold">
          *Please be sure to pay all the dues before saying us farewell
        </p>
      </div>
    </div>
  );
};
export default NonReturnAbleForm;
