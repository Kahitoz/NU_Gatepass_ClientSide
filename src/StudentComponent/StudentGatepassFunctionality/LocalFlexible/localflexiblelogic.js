import Strings from "../../StudentsScreen/Strings.json";
import { CheckBlackList, CheckGatepassStatus } from "./localflexiblecheck";

const head_api = Strings.api;

export async function finalCheck(
  access_token,
  departureTime,
  wardenUID,
  departureDate,
  arrivalDate,
  arrivalTime,
  purpose
) {
  const result_1 = await CheckBlackList(access_token);
  const result_2 = await CheckGatepassStatus(access_token);

  if (result_1 === false && result_2 === false) {
    alert("Gatepass Requested Successfully");
    apply_local_flexible_gatepass( access_token,
        departureTime,
        wardenUID,
        departureDate,
        arrivalDate,
        arrivalTime,
        purpose)
  } else {
    return false;
  }
}
async function apply_local_flexible_gatepass(
  access_token,
  departureTime,
  wardenUID,
  departureDate,
  arrivalDate,
  arrivalTime,
  purpose
) {
  const route = "/gatepass/v2/student/apply_local_flexible";
  const combined_local_flex = head_api.concat(route);
  const apply = await fetch(combined_local_flex, {
    method: "POST",
    headers: {
      Authorization: access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gatepass_type: 2,
      from_date: departureDate,
      from_time: departureTime,
      to_date: arrivalDate,
      to_time: arrivalTime,
      purpose: purpose,
      destination: "Neemrana",
      approval_to: wardenUID,
    }),
  })
    .then((Response) => console.log(Response.json()))
    .then((response) => console.log(response))
    .then((error) => console.log(error));

  return apply;
}
