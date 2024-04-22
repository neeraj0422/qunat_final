/*
 *   Copyright (c) 2021
 *   All rights reserved.
 */
import React, { useEffect, useRef } from "react";
import { Redirect, Route } from "react-router-dom";
import { TOKEN, ROUTE } from "../../constants/constants";
import { APIService } from "../../services/api/api-service";
import { getJWTExpiryTime } from "../../services/common/utilityService";

// type Props = { component: React.FC } & RouteComponentProps;


export const AuthGuardedRoute = ({ children, ...rest }) => {
  const autoLogoutRef = useRef();
  const isLoggedIn = APIService.Instance.getToken() !== null;

  useEffect(() => {
    const token = localStorage.getItem(TOKEN) || "";
    if (token) {
      const tokenExpiryDate = getJWTExpiryTime(token);
      const expiryDate =
        tokenExpiryDate && tokenExpiryDate
          ? new Date(tokenExpiryDate * 1000)
          : new Date();
      const currentDate = new Date();
      const logoutTimeInMs = +expiryDate - +currentDate;
      autoLogoutRef.current = setTimeout(() => {
        localStorage.removeItem(TOKEN);
        window.location.reload();
      }, logoutTimeInMs);
    }

    return () => {
      if (autoLogoutRef.current) {
        clearTimeout(autoLogoutRef.current);
      }
    };
  }, []);

  return (
    <Route
      exact={true}
      {...rest}
      render={({ location }) => {
        return isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: ROUTE.LOGIN, state: { from: location } }} />
        );
      }}
    />
  );
};
