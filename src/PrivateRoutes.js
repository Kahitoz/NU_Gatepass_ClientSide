import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import FailedToFetchScreen from "./InfoComponent/I1_FailedToFetchScreen";

export const PrivateRoute = ({ role, ...rest }) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const decoded = jwt_decode(accessToken);
  const user_role = decoded.data.role_id;
  console.log("This is the role - ", user_role);
  console.log("The user role is - ", role)
  if (user_role == role) {
    if (user_role == 4) {
        console.log("true")
    }else{
        console.log("false")
    }
      return <Outlet />;
  } else {
    return (
      <>
        <FailedToFetchScreen Error={"Not Authorized"} />
      </>
    );
  }
};
