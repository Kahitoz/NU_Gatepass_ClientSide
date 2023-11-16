import Strings from "../../StudentsScreen/Strings.json";
import Cookies from "js-cookie";
import {
  blacklist_check,
  available_gatepass,
  checkTime,
  checkApprovedOrCheckedout,
} from "./localfixedchecks";

const api = Strings.api;

const fetchDataList = async (accessToken) => {
  try {
    const result_1 = await blacklist_check(accessToken);
    const result_2 = await available_gatepass(accessToken);
    const result_3 = await checkTime(accessToken);
    const result_4 = await checkApprovedOrCheckedout(accessToken);

    console.log(result_1, result_2, result_3, result_4);

    if (result_1 === true) {
      alert("Gatepass Blocked");
    } else if (result_2 === false) {
      alert("Limit Exceeded");
    } else if (result_3 === true) {
      alert(
        "You cannot apply outside the time range and also 1 hr before the end time"
      );
    } else if (result_4 === true) {
      alert("There is one running gatepass");
    } else {
      alert("Success: Local Fixed Gatepass applied ");
      apply_local_fixed(accessToken);
    }
  } catch (error) {
    console.error(error);
  }
};

const Localfixedlogic = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  fetchDataList(accessToken);
  return null;
};

export default Localfixedlogic;

async function apply_local_fixed(accessToken) {
  const route_1 = "/gatepass/v2/student/apply_local_fixed";
  const route_2 = "/gatepass/v2/student/time";
  const route_3 = "/gatepass/v2/admin/parameter_config";
  const combined_local_fixed_api = api.concat(route_1);
  const combined_get_date = api.concat(route_2);
  const combined_api_allowed_time = api.concat(route_3);

  const fetch_allowed_time = await fetch(combined_api_allowed_time, {
    headers: {
      Authorization: accessToken,
    },
  });
  const fetch_atime = await fetch_allowed_time.json();

  const startTime = fetch_atime[1]["value"];
  const endTime = fetch_atime[2]["value"];

  const fetch_date_time = await fetch(combined_get_date, {
    headers: {
      Authorization: accessToken,
    },
  });

  const get_date_time = await fetch_date_time.json();
  const get_date = get_date_time.date;

  console.log(get_date, startTime, endTime);

  try {
    await fetch(combined_local_fixed_api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        punch_id: null,
        from_date: get_date,
        from_time: startTime,
        to_date: get_date,
        to_time: endTime,
      }),
    }).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
}

//Method to check if no more gatepass is applied today
