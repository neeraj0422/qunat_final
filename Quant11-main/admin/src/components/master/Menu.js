import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE, USER_TYPE } from "../../constants/constants";
import { AuthService } from "../../services/auth/auth.service";

const MENU_CONFIG = [
  {
    path: ROUTE.DASHBOARD,
    icon: "fa fa-tachometer-alt",
    text: "Dashboard",
    meta: { allowedUserTypes: Object.values(USER_TYPE) },
    childRoutes: [],
  },
  {
    path: ROUTE.MARKET,
    icon: "fa fa-th-list",
    text: "Markets",
    meta: { allowedUserTypes: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN] },
    childRoutes: [],
  },
  {
    path: ROUTE.ASSETS,
    icon: "fa fa-file-invoice-dollar",
    text: "Assets",
    meta: { allowedUserTypes: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN] },
    childRoutes: [],
  },
  {
    path: ROUTE.STRATEGY,
    icon: "fa fa-microchip",
    text: "Strategy",
    meta: { allowedUserTypes: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN] },
    childRoutes: [],
  },
  {
    path: ROUTE.USERS,
    icon: "fa fa-user",
    text: "Users",
    meta: { allowedUserTypes: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN] },
    childRoutes: [],
  },
];

export const Menu = () => {
  const [user, setUser] = useState(() => AuthService.getUserDetails());
  const [userType, setUserType] = useState(() => AuthService.getUserType());
  const [menuDetails, setMenuDetails] = useState([]);

  useEffect(() => {
    if (user.userType) setMenuDetails(filterParentMenuByUserType());
  }, [userType, user.userType]);

  const filterParentMenuByUserType = () => {
    if (!userType) return;
    const filteredMenu = MENU_CONFIG.filter((menuDetails) =>
      menuDetails.meta.allowedUserTypes.includes(userType?.name)
    );
    return filteredMenu;
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href={ROUTE.DASHBOARD} className="brand-link">
        <img
          src="dist/img/Logo.png"
          alt="Logo"
          className="brand-image img-circle"
        />
        <span className="brand-text font-weight-light">Quant11</span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.png"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link to="" className="d-block">
              {user.displayName}
            </Link>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {menuDetails?.length &&
              menuDetails.map((menu, idx) => {
                if (menu?.childRoutes?.length > 0) {
                  return (
                    <li key={idx} className="nav-item has-treeview parent">
                      <a className="nav-link">
                        <i className={`nav-icon ${menu?.icon}`} />
                        <p>
                          {menu.text}
                          <i className="fas fa-angle-left right" />
                          {/* <span className="badge badge-info right">1</span> */}
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {menu?.childRoutes.map((child, cIdx) => {
                          if (
                            child?.meta?.allowedUserTypes.includes(
                              userType.name
                            )
                          )
                            return (
                              <li
                                key={`child-${idx}-${cIdx}`}
                                className="nav-item child"
                              >
                                <Link to={child.path} className="nav-link">
                                  <i className={` nav-icon ${child?.icon}`} />
                                  {child?.text}
                                </Link>
                              </li>
                            );
                        })}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="nav-item single">
                    <Link to={menu.path} className="nav-link">
                      <i className={`nav-icon ${menu?.icon}`} />
                      <p>{menu?.text}</p>
                    </Link>
                  </li>
                );
              })}

            <li className="nav-item has-treeview">
              <a
                style={{ cursor: "pointer" }}
                className="nav-link"
                onClick={AuthService.logout}
              >
                <i className="nav-icon fa fa-sign-out" />
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
