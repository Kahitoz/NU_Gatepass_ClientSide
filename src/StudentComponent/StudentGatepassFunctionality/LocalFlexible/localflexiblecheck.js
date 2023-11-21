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
  return date;
}

export async function GetLowerBoundTime(accessToken){
    const route_2 = "/gatepass/v2/admin/parameter_config"
    const combined_get_value = api_head.concat(route_2);
    const fetch_allowed_time = await fetch(combined_get_value, {
        headers: {
          Authorization: accessToken,
        },
      });
      const fetch_atime = await fetch_allowed_time.json();

      const end_time = fetch_atime[2]['value']
      const lb_time = fetch_atime[4]["value"];
      return {"one":lb_time, "two":end_time};
}
