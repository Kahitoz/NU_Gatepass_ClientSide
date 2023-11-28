import Strings from "../../StudentsScreen/Strings.json";

import {
  check_selected_time,
  check_departure_date,
  checkDates,
  CheckBlackList,
  CheckOutstation,
} from "./outstationcheck";

const api_head = Strings.api;

export async function finalCheck(
  access_token,
  departureTime,
  departureDate,
  arrivalDate,
  arrivalTime,
  reason,
  contact,
  destination,
  warden_uid,
  visit
) {
  const check_1 = await check_selected_time(access_token, departureTime);
  const check_2 = await check_departure_date(access_token, departureDate);
  const check_3 = checkDates(departureDate, arrivalDate);
  const check_4 = await CheckBlackList(access_token);
  const check_5 = await CheckOutstation(access_token);

  if (check_1 === true) {
    alert("Gatepass Applied Time is not Vaild");
  } else if (check_2 === false) {
    alert("Departure Date is not valid");
  } else if (check_3 === -1 || check_3 === 0) {
    alert("Arrival date is not valid ");
  } else if (check_5 === true) {
    alert("There is one running outstation gatepass");
  } else if (check_4 === true) {
    alert("Your Gatepass is blocked");
  } else {
    alert("Gatepass applied successfully")
    await outstation_gatepass(
      access_token,
      departureTime,
      departureDate,
      arrivalDate,
      arrivalTime,
      reason,
      contact,
      destination,
      warden_uid,
      visit
    );
  }
}

async function outstation_gatepass(
  access_token,
  departureTime,
  departureDate,
  arrivalDate,
  arrivalTime,
  reason,
  contact,
  destination,
  warden_uid,
  visit
) {
  let sending_data = fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/apply_outstation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },

      body: JSON.stringify({
        gatepass_type: 3,
        from_date: departureDate,
        from_time: departureTime,
        to_date: arrivalDate,
        to_time: arrivalTime,
        purpose: reason,
        destination: destination,
        destination_contact: contact,
        visit_to: visit,
        approval_to: warden_uid,
      }),
    }
  )
    .then((Response) => Response.json())
    .then((response) => response)
    .catch((error) => console.log("error: " + error));

  return sending_data;
}
