import React from "react";
import { ROUTE } from "../../constants/constants";

const d = new Date();
export default function Footer() {
  return (
    <footer className="main-footer fixed-bottom">
      <strong>
        Copyright © {d.getFullYear() -1}-{d.getFullYear()} <a href={ROUTE.DASHBOARD}>Quant11 Admin. </a>
      </strong>
         All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>
  );
}
