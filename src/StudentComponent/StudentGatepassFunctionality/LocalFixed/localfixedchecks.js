import Strings from "../../StudentsScreen/Strings.json";
const api = Strings.api;
export async function Display_date_time(accessToken) {
  const route_2 = "/gatepass/v2/student/time";
  const route_3 = "/gatepass/v2/admin/parameter_config";
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

  console.log(get_date);

  return { get_date, startTime, endTime };
}

export async function blacklist_check(accessToken) {
  const route = "/gatepass/v2/student/blacklisted/";
  const combined_api = api.concat(route);
  const response = await fetch(combined_api, {
    headers: {
      Authorization: accessToken,
    },
  });
  const get_response = await response.json();
  const get_result = get_response.blacklisted;
  return get_result;
}

//Method to check if the time selected is valid or not
export async function checkTime(accessToken) {
  const route_1 = "/gatepass/v2/student/time";
  const route_2 = "/gatepass/v2/admin/parameter_config";
  const combined_api_current_time = api.concat(route_1);
  const combined_api_allowed_time = api.concat(route_2);
  const fetch_current_time = await fetch(combined_api_current_time, {
    headers: {
      Authorization: accessToken,
    },
  });
  const fetch_ctime = await fetch_current_time.json();

  const fetch_allowed_time = await fetch(combined_api_allowed_time, {
    headers: {
      Authorization: accessToken,
    },
  });
  const fetch_atime = await fetch_allowed_time.json();

  const startTime = fetch_atime[1]["value"];
  const endTime = fetch_atime[2]["value"];
  const current_time = fetch_ctime.time;
  
  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return new Date(0, 0, 0, hours, minutes, seconds);
  };

  const startDateTime = parseTime(startTime);
  const endDateTime = parseTime(endTime);
  const currentTime = parseTime(current_time);

  console.log(startDateTime, endDateTime, currentTime)

  if (currentTime >= startDateTime && currentTime < endDateTime) {
    return true;
  } else {
    return false;
  }
}

//Method to get the total used local fixed gatepass in this week
export async function remaining_local_fixed(accessToken) {
  const route_1 = "/gatepass/v2/student/get_dates";
  const combined_api_get_data = api.concat(route_1);

  const route_2 = "/gatepass/v2/student/get_number_of_local_fixed_student/";
  const combined_api_get_number = api.concat(route_2);

  const fetch_data = await fetch(combined_api_get_data, {
    headers: {
      Authorization: accessToken,
    },
  });
  const get_data = await fetch_data.json();

  const lastMonday = get_data.lastMonday;
  const nextMonday = get_data.nextMonday;
  const fetch_number = await fetch(
    combined_api_get_number + `${lastMonday}/` + `${nextMonday}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

  const get_number = await fetch_number.text();
  return get_number;
}

// Method to return weather the gatepass is allowed or not
export async function available_gatepass(accessToken) {
  const route_1 = "/gatepass/v2/admin/parameter_config";
  const combined_api_get_total_lf = api.concat(route_1);
  const fetch_number = await fetch(combined_api_get_total_lf, {
    headers: {
      Authorization: accessToken,
    },
  });
  const get_number = await fetch_number.json();
  const get_weak = get_number[0]["value"];
  const remainingLocalFixedResult = await remaining_local_fixed(accessToken);
  const total_remaining = get_weak - remainingLocalFixedResult;
  if (total_remaining > 0) {
    return true;
  } else {
    return false;
  }
}

// Method to check the status of already applied gatepass
export async function checkApprovedOrCheckedout(accessToken) {
  const route_1 =
    "/gatepass/v2/student/get_bool_student_checkedout_autoapproved/";
  const combined_api_get_status = api.concat(route_1);
  const response = await fetch(combined_api_get_status, {
    headers: {
      Authorization: accessToken,
    },
  });
  const jsonResponse = await response.json();
  const get_number = jsonResponse.row_affected;
  if (get_number > 0) {
    return true;
  } else {
    return false;
  }
}

// Method to check if the sudent has already applied for a gatepass today
export async function todaysGatepassCheck(accessToken){
    const route_1 = "/gatepass/v2/student/todaysGatepass"
    const combined_get_todays_gatepass = api.concat(route_1);
    const response = await fetch(combined_get_todays_gatepass,{
        headers:{
            Authorization:accessToken,
        },
    });
    const jsonResponse = await response.json();
    const get_number = jsonResponse.row_affected;
    if(get_number>0){
        return true;
    }else{
        return false;
    }
}