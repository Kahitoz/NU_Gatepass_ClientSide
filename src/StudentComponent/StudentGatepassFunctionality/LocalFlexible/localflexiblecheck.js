import Strings from "../../StudentsScreen/Strings.json";

const api_head = Strings.api;

export async function Get_Date(accessToken) {
  const route_1 = "/gatepass/v2/student/time";
  const combined_date_api = api_head.concat(route_1);
  const fetch_date_time = await fetch(combined_date_api, {
    headers: {
      Authorization: accessToken,
    },
  });

  const get_date_time = await fetch_date_time.json();
  const date = get_date_time.date;
  const time = get_date_time.time;
  return { date: date, time: time };
}

export async function GetLowerBoundTime(accessToken) {
  const route_1 = "/gatepass/v2/admin/parameter_config";
  const combined_get_value = api_head.concat(route_1);
  const fetch_allowed_time = await fetch(combined_get_value, {
    headers: {
      Authorization: accessToken,
    },
  });
  const fetch_atime = await fetch_allowed_time.json();

  const end_time = fetch_atime[2]["value"];
  const lb_time = fetch_atime[4]["value"];
  const ub_time = fetch_atime[3]["value"];
  const b_time = fetch_atime[8]["value"];
  return { one: lb_time, two: end_time, three: ub_time, four: b_time };
}

export async function GetWardenDetails(access_token) {
  const route_1 = "/gatepass/v2/student/get_warden_details";
  const combined_get_warden_details = api_head.concat(route_1);

  const get_warden_details = await fetch(combined_get_warden_details, {
    headers: {
      Authorization: access_token,
    },
  });
  const result = await get_warden_details.json();
  const name = result.warden_name;
  const uid = result.alloted_warden;

  return { one: uid, two: name };
}

export async function CheckBlackList(access_token) {
  const route = "/gatepass/v2/student/blacklisted/";
  const combined_api = api_head.concat(route);
  const response = await fetch(combined_api, {
    headers: {
      Authorization: access_token,
    },
  });
  const get_response = await response.json();
  const get_result = get_response.blacklisted;
  if (get_result == true) {
    alert("Your Gatepass is Blocked");
    return true;
  } else {
    return get_result;
  }
}

export async function CheckGatepassStatus(access_token) {
  const route = "/gatepass/v2/student/get_gatepass_status_for_localflexible";
  const combined_get_status = api_head.concat(route);
  const get_result = await fetch(combined_get_status, {
    headers: {
      Authorization: access_token,
    },
  });
  const check_result = await get_result.json();
  if (
    check_result.recordset[0] !== undefined &&
    check_result.recordset[0] !== null
  ) {
    if (
      check_result.recordset[0].status === "Approved" ||
      check_result.recordset[0].status === "CHECKEDOUT" ||
      check_result.recordset[0].status === "Pending"
    ) {
      alert("There is one running gatepass");
      return true;
    }
    return true;
  } else {
    return false;
  }
}

export async function CheckTimeLocalFlexible(access_token, currentTime) {
  const timeData = await GetLowerBoundTime(access_token);
  const start_time = timeData.one;
  const end_time = timeData.two;

  const getStartHr = start_time.slice(0, 3);
  const getEndHr = end_time.slice(0, 3);

  const getcurrentHr = currentTime.slice(0, 3);

  const intStartHr = parseInt(getStartHr, 10);
  const intEndHr = parseInt(getEndHr, 10);

  const intcurrentHr = parseInt(getcurrentHr, 10);

  if (intcurrentHr > intStartHr && intcurrentHr < intEndHr) {
    return false;
  } else {
    alert("Time selected is not valid");
    return true;
  }
}
