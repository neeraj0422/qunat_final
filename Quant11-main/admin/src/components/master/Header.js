import React from "react";

export default function Header() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      {/* <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="control-sidebar"
            data-slide="true"
            href="javascript:void();"
            role="button"
          >
            <i className="fas fa-th-large" />
          </a>
        </li>
      </ul> */}
    </nav>
  );
}
