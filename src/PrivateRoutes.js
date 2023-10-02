import React from "react";
import {Outlet}  from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import FailedToFetchScreen from "./InfoComponent/I1_FailedToFetchScreen";

export const PrivateRoute = ({ role, ...rest }) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const decoded = jwt_decode(accessToken);
  const user_role = decoded.data.role_id;
  if (user_role == role) {
      return <Outlet />;
  } else {
    return (
      <>
        <FailedToFetchScreen Error={"Not Authorized"} />
      </>
    );
  }
};
