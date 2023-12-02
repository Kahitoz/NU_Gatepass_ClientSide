
import { CheckEmergency } from "./emergencycheck";

export async function finalCheck(
  access_token,
  departureTime,
  departureDate,
  arrivalDate,
  arrivalTime,
  reason,
  contact,
  destination,
  visit
) {
    const check_1 = await CheckEmergency(access_token);
    if (check_1 === true) {
        alert("There is one running emergency gatepass");
      }else{
        alert("Emergency applied successfully");
        await emergency_gatepass(
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
          console.log(departureTime, departureDate,arrivalTime, arrivalDate, reason, contact, destination, visit)

      }
}

async function emergency_gatepass(
    access_token,
    departureTime,
    departureDate,
    arrivalDate,
    arrivalTime,
    reason,
    contact,
    destination,
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
          gatepass_type: 6,
          from_date: departureDate,
          from_time: departureTime,
          to_date: arrivalDate,
          to_time: arrivalTime,
          purpose: reason,
          destination: destination,
          destination_contact: contact,
          visit_to: visit,
          approval_to: '7000',
        }),
      }
    )
      .then((Response) => Response.json())
      .then((response) => response)
      .catch((error) => console.log("error: " + error));
  
    return sending_data;
  }