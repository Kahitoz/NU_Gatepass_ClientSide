import Strings from "../StudentsScreen/Strings.json";

const api_head = Strings.api;

async function Get_Date(access_token) {
  const route = "/gatepass/v2/student/get_dates";
  const combined_route = api_head.concat(route);

  const result = await fetch(combined_route, {
    headers: {
      Authorization: access_token,
    },
  });
  const dates = await result.json();
  return dates.currentDate;
}

export async function Get_dates(access_token) {
  const route = "/gatepass/v2/admin/parameter_config";
  const combined_api = api_head.concat(route);

  const get_data = await fetch(combined_api, {
    method: "GET",
    headers: {
      Authorization: access_token,
    },
  });

  const fetch_data = await get_data.json();
  const start_time = fetch_data[9].value;
  const end_time = fetch_data[10].value;

  const start_day = fetch_data[6].value;
  const end_day = fetch_data[7].value;

  return {
    start_day: start_day,
    end_day: end_day,
    start_time: start_time,
    end_time: end_time,
  };
}

export async function return_true(access_token) {
  const todays_date = await Get_Date(access_token);
  const days_between = await Get_dates(access_token);
  const start_day = days_between.start_day;
  const end_day = days_between.end_day;

  const isBetween = checkIfDateIsBetween(todays_date, start_day, end_day);

  return isBetween;
}

function checkIfDateIsBetween(dateToCheck, startDay, endDay) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startIndex = daysOfWeek.indexOf(startDay);
  const endIndex = daysOfWeek.indexOf(endDay);
  const indexOfDateToCheck = new Date(dateToCheck).getDay();
  return startIndex <= indexOfDateToCheck && indexOfDateToCheck <= endIndex;
}
