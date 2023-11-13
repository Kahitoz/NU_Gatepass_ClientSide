import { useEffect } from "react";
import Strings from "../../StudentsScreen/Strings.json";
import Cookies from "js-cookie";
import G1_MessageModal from "../../../GlobalComponent/G1_MessageModal";

const api = Strings.api;

const fetchDataList = async (accessToken) => {
  try {
    const result_1 = await blacklist_check(accessToken);
    const result_2 = await available_gatepass(accessToken);
    const result_3 = await checkTime(accessToken);
    const result_4 = await checkApprovedOrCheckedout(accessToken);

    console.log(result_1,result_2,result_3,result_4)

    if (result_1 === true) {
      displayMessage(
        "Local Fixed Restricted",
        "Your Gatepass is blocked please contact your warden"
      );
    } else if (result_2 === false) {
      displayMessage(
        "Local Fixed Limit Exceeded",
        "You have reached the weekly limit of the gatepass"
      );
    } else if (result_3 === false) {
      displayMessage(
        "Local Fixed Applied Time",
        "You cannot apply outside the time range and also 1 hr before the end time"
      );
      console.log("You cannot apply outside the time range and also 1 hr before the end time")
    } else if (result_4 === true) {
      displayMessage(
        "Local Fixed Already Applied",
        "There is one running local fixed gatepass"
      );
    } else {
      displayMessage(
        "Local Fixed Applied",
        "Local Fixed Gatepass Applied successfully"
      );
      apply_local_fixed(accessToken);
    }

  } catch (error) {
    console.error(error);
  }
};

const displayMessage = (title, message) => {
  <G1_MessageModal title={title} message={message} action={true} />;
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

async function blacklist_check(accessToken) {
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
async function checkTime(accessToken) {
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

  console.log(startTime, endTime, current_time);
  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return new Date(0, 0, 0, hours, minutes, seconds);
  };

  const startDateTime = parseTime(startTime);
  const endDateTime = parseTime(endTime);
  const currentTime = parseTime(current_time);

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

  console.log("this is last monday", lastMonday);

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
async function available_gatepass(accessToken) {
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

//Method to check the status of already applied gatepass
async function checkApprovedOrCheckedout(accessToken) {
  const route_1 =
    "/gatepass/v2/student/get_bool_student_checkedout_autoapproved/";
  const combined_api_get_status = api.concat(route_1);
  const response = await fetch(combined_api_get_status, {
    headers: {
      Authorization: accessToken,
    },
  });
  const jsonResponse = await response.json();

  if (jsonResponse > 0) {
    return true;
  } else {
    return false;
  }
}

//Method to check if no more gatepass is applied today
