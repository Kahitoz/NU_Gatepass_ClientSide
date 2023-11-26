import Strings from "../../StudentsScreen/Strings.json";

const api_head = Strings.api;

export async function GetWarden(access_token) {
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

export async function GetCurrentTime(access_token) {
    const route = "/gatepass/v2/student/time";
    const combined_time_api = api_head.concat(route);
    const fetch_time = await fetch(combined_time_api, {
      headers: {
        Authorization: access_token,
      },
    })
    const get_time = await fetch_time.json();
    const result = get_time.time;
    const hr = result.slice(0, 3);
    const min = result.slice(3, 5);
    return({"Hr":hr,"Min":min})
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