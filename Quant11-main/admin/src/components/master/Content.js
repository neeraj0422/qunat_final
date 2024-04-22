import React, { useState } from "react";
import { Loader } from "../loader/Loader";

//export function Content() {
export const Content = () => {
  const [isLoader, setLoader] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);

  return (
    <>
      {isLoader ? <Loader /> : null}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        {/*<div className="content">*/}
        {/*  <div className="container-fluid">*/}
        {/*    <div className="row">*/}
        {/*      /!* <div className="col-md-3 col-sm-6 col-12">*/}
        {/*        <div className="info-box">*/}
        {/*          <span className="info-box-icon bg-info">*/}
        {/*            <i className="fas fa-users"></i>*/}
        {/*          </span>*/}

        {/*          <div className="info-box-content">*/}
        {/*            <span className="info-box-text">Users</span>*/}
        {/*            <span className="info-box-number">1</span>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="col-md-3 col-sm-6 col-12">*/}
        {/*        <div className="info-box">*/}
        {/*          <span className="info-box-icon bg-success">*/}
        {/*            <i className="fas fa-book-open"></i>*/}
        {/*          </span>*/}
        {/*          <div className="info-box-content">*/}
        {/*            <span className="info-box-text">Organisation</span>*/}
        {/*            <span className="info-box-number">2</span>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div> *!/*/}
        {/*      <div className="col-lg-3 col-6">*/}
        {/*        <div className="small-box bg-info">*/}
        {/*          <div className="inner">*/}
        {/*            <h3>{dashboardData?.userCount || 0}</h3>*/}
        {/*            <p>Users</p>*/}
        {/*          </div>*/}
        {/*          <div className="icon">*/}
        {/*            <i className="fas fa-users"></i>*/}
        {/*          </div>*/}
        {/*          <a href={ROUTE.USER} className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="col-lg-3 col-6">*/}
        {/*        <div className="small-box bg-success">*/}
        {/*          <div className="inner">*/}
        {/*            <h3>{dashboardData?.orgCount || 0}</h3>*/}
        {/*            <p>Organisations</p>*/}
        {/*          </div>*/}
        {/*          <div className="icon">*/}
        {/*            <i className="fas fa-users"></i>*/}
        {/*          </div>*/}
        {/*          <a href={ROUTE.ORGANISATION} className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="col-lg-3 col-6">*/}
        {/*        <div className="small-box bg-warning">*/}
        {/*          <div className="inner">*/}
        {/*            <h3>{dashboardData?.universalTempCount || 0}</h3>*/}
        {/*            <p>Universal Template Access User</p>*/}
        {/*          </div>*/}
        {/*          <div className="icon">*/}
        {/*            <i className="fa fa-eye"></i>*/}
        {/*          </div>*/}
        {/*          <a href={ROUTE.UNIVERSAL_TEMPLATE_ACCESS} className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="col-lg-3 col-6">*/}
        {/*        <div className="small-box bg-danger">*/}
        {/*          <div className="inner">*/}
        {/*            <h3>200</h3>*/}
        {/*            <p>Sample Data</p>*/}
        {/*          </div>*/}
        {/*          <div className="icon">*/}
        {/*            <i className="fas fa-address-book"></i>*/}
        {/*          </div>*/}
        {/*          <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>*/}
        {/*        </div>*/}
        {/*      </div>*/}


        {/*      /!* <div className="col-md-3 col-sm-6 col-12">*/}
        {/*        <div className="info-box">*/}
        {/*          <span className="info-box-icon bg-success">*/}
        {/*            <i className="fas fa-book-open"></i>*/}
        {/*          </span>*/}
        {/*          <div className="info-box-content">*/}
        {/*            <span className="info-box-text">Packages</span>*/}
        {/*            <span className="info-box-number">2</span>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div> *!/*/}

        {/*      /!* <div className="col-md-3 col-sm-6 col-12">*/}
        {/*        <div className="info-box">*/}
        {/*          <span className="info-box-icon bg-danger">*/}
        {/*            <i className="far fa-heart"></i>*/}
        {/*          </span>*/}

        {/*          <div className="info-box-content">*/}
        {/*            <span className="info-box-text">Features</span>*/}
        {/*            <span className="info-box-number">0</span>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div> *!/*/}
        {/*    </div>*/}
        {/*    /!* /.row *!/*/}
        {/*  </div>*/}
        {/*  /!* /.container-fluid *!/*/}
        {/*</div>*/}
        {/* /.content */}
      </div>
    </>
  );
}
