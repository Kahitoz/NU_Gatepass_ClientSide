import Strings from '../../StudentsScreen/Strings.json';

const api_head = Strings.api;

export async function Get_time(access_token){
    const route = "/gatepass/v2/student/time";
    const combined_time_api = api_head.concat(route);
    const fetch_time = await fetch(combined_time_api, {
      headers: {
        Authorization: access_token,
      },
    });
    const get_time = await fetch_time.json();
    const current_time = get_time.time;
    const currnet_date = get_time.date;
    return {current_time:current_time, current_date:currnet_date};
}

export async function CheckEmergency(access_token) {
    const route = "/gatepass/v2/student/get_gatepass_status_for_emergency";
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
        
        return true;
      }
      return true;
    } else {
      return false;
    }
  }