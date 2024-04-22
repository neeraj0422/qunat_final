import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Loader } from "../loader/Loader";
import { InputText } from "primereact/inputtext";
import { ROUTE } from "../../constants/constants";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { toasterService } from "../../services/common/utilityService";
import { APIService } from "../../services/api/api-service";
import { URLS } from "../../constants/urls";
import { Dropdown } from "primereact/dropdown";
import countryData from "../../Json/countryPhoneCodes.json";
// import moment from "moment";

export const Users = () => {
  const [isLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({});

  const [user, setUser] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState({});

  const toast = useRef(null);

  useEffect(() => {
    getUsersList();
  }, []);

  const handleValueChange = (event) => {
    const updatedValue = { ...formData };
    updatedValue[event?.target?.name] = event?.target?.value;
    setFormData(updatedValue);
  };

  const getUsersList = async () => {
    setLoader(true);
    try {
      try {
        const response = await APIService.Instance.get(`${URLS.USERS_LIST}`);
        if (response) {
          const { meta, data } = response.data;
          if (meta && meta.code === 1) {
            // Successful login

            setUser(data);
          } else {
            toasterService(toast, "error", "Error", meta.message, 3000); //alert("Invalid Admin Credentials..");
            return {};
          }
        } else {
          toasterService(toast, "error", "Error", "Something went wrong", 3000);
          return {};
        }
      } catch (e) {
        if (e.response && e.response.data && e.response.data.meta) {
          const { meta } = e.response.data;
          toasterService(toast, "error", "Error", meta.message, 3000);
        } else {
          toasterService(
            toast,
            "error",
            "Error",
            "An unexpected error occurred",
            3000
          );
        }
        throw e;
      }
    } finally {
      setLoader(false);
    }
  };

  const onUpdateUser = async () => {
    setLoader(true);

    // const riskAppetiteModifier = ["Low Risk", "Medium Risk", "High Risk"];
    // const tradeExperienceModifier = [
    //   "Less than 1 year",
    //   "1-3 year",
    //   "3-5 year",
    //   "5-10 year",
    //   "10-20 year",
    //   "More than 20 year",
    // ];

    try {
      const response = await APIService.Instance.post(URLS.USERS_CREATE, {
        id: formData._id,
        // first_name: formData.first_name,
        // last_name: formData.last_name,
        email: formData.email.toLowerCase(),
        // country: formData.country,
        // date_of_birth: moment(formData.date_of_birth, "YYYY/MM/DD").format(
        //   "DD/MM/YYYY"
        // ),
        country_code: formData.country_code,
        mobile_number: formData.mobile_number,
        is_sms_notification_allowed: formData.is_sms_notification_allowed,
        is_email_notification_allowed: formData.is_email_notification_allowed,
        // otp: formData.otp,
        // is_mobile_verified: formData.is_mobile_verified === "True" ? 1 : 0,
        // is_email_verified: formData.is_email_verified === "True" ? 1 : 0,
        // receive_newsletter: formData.receive_newsletter,
        // receive_call_notification: formData.receive_call_notification,
        // app_notification: formData.app_notification,
        // push_notification: formData.push_notification,
        // email_notification: formData.email_notification,
        // sms_notification: formData.sms_notification,
        // trade_experience: tradeExperienceModifier.indexOf(
        //   formData.trade_experience + 1
        // ),
        // risk_appetite: riskAppetiteModifier.indexOf(formData.risk_appetite) + 1,
        // is_social_login: formData.is_social_login,
      });
      setLoader(false);
      if (response) {
        const { meta, data } = response.data;
        if (meta && meta.code === 1) {
          setFormData({});
          setDisplayForm(false);
          setRowData({});
          setIsEdit(false);
          getUsersList();
          toasterService(toast, "success", "Success", meta?.message, 3000);
        } else {
          toasterService(toast, "error", "Error", meta.message, 3000); //alert("Invalid Admin Credentials..");
          return {};
        }
      } else {
        toasterService(toast, "error", "Error", "Something went wrong", 3000);
        //alert(response?.message);
      }
    } catch (e) {
      setLoader(false);
      if (e.response && e.response.data && e.response.data.meta) {
        const { meta } = e.response.data;
        toasterService(toast, "error", "Error", meta.message, 3000);
      } else {
        toasterService(
          toast,
          "error",
          "Error",
          "An unexpected error occurred",
          3000
        );
      }
      throw e;
    }
  };

  const onDeleteUser = async (rowData) => {
    setLoader(true);
    try {
      const response = await APIService.Instance.get(
        URLS.USERS_DELETE + rowData._id
      );
      if (response) {
        const { meta } = response.data;
        if (meta && meta.code === 1) {
          getUsersList();
          toasterService(toast, "success", "Success", meta?.message, 3000);
        } else {
          toasterService(toast, "error", "Error", meta.message, 3000); //alert("Invalid Admin Credentials..");
          return {};
        }
      } else {
        toasterService(toast, "error", "Error", "Something went wrong", 3000);
        //alert(response?.message);
      }
    } catch (e) {
      setLoader(false);
      if (e.response && e.response.data && e.response.data.meta) {
        const { meta } = e.response.data;
        toasterService(toast, "error", "Error", meta.message, 3000);
      } else {
        toasterService(
          toast,
          "error",
          "Error",
          "An unexpected error occurred",
          3000
        );
      }
      throw e;
    }
  };

  const onEditClickPopUp = (rowData) => {
    const obj = { ...rowData };

    // getUsersList();
    setRowData(obj);
    setIsEdit(true);
    setFormData(obj);
    setDisplayForm(true);
  };

  const confirmDeleteDialogBox = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => onDeleteUser(rowData),
      reject: () =>
        toasterService(
          toast,
          "warn",
          "Rejected",
          "You have rejected category delete.",
          3000
        ),
    });
  };

  //data to be displayed
  const tableData = {
    first_name: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.first_name || ""
        }`}</span>
      );
    },
    last_name: (rowData) => {
      return (
        <span className="text-capitalize">{`${rowData?.last_name || ""}`}</span>
      );
    },
    email: (rowData) => {
      return <span>{`${rowData?.email || "-"}`}</span>;
    },
    country: (rowData) => {
      return (
        <span className="text-capitalize">{`${rowData?.country || ""}`}</span>
      );
    },
    // date_of_birth: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${
    //       rowData?.date_of_birth || ""
    //     }`}</span>
    //   );
    // },
    // country_code: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${
    //       rowData?.country_code ? "+ " + rowData?.country_code : "-"
    //     }`}</span>
    //   );
    // },
    mobile_number: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData.mobile_number
            ? (rowData?.country_code ? "+" + rowData?.country_code : "") +
              rowData?.mobile_number
            : "-"
        }`}</span>
      );
    },
    is_sms_notification_allowed: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData.is_sms_notification_allowed || "-"
        }`}</span>
      );
    },
    is_email_notification_allowed: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData.is_sms_notification_allowed || "-"
        }`}</span>
      );
    },
    // otp: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.otp || "-"}`}</span>
    //   );
    // },
    // is_email_verified: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.is_email_verified}`}</span>
    //   );
    // },
    // is_mobile_verified: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.is_mobile_verified}`}</span>
    //   );
    // },

    // receive_newsletter: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.receive_newsletter}`}</span>
    //   );
    // },
    // receive_call_notification: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.receive_call_notification}`}</span>
    //   );
    // },
    // app_notification: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.app_notification}`}</span>
    //   );
    // },
    // push_notification: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.push_notification}`}</span>
    //   );
    // },
    // sms_notification: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.sms_notification}`}</span>
    //   );
    // },
    // email_notification: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.email_notification}`}</span>
    //   );
    // },
    // trade_experience: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.trade_experience}`}</span>
    //   );
    // },
    // risk_appetite: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.risk_appetite}`}</span>
    //   );
    // },
    // is_social_login: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${rowData?.is_social_login}`}</span>
    //   );
    // },
    // createdAt: (rowData) => {
    //   return (
    //     <span className="text-capitalize">{`${
    //       rowData?.createdAt || "-"
    //     }`}</span>
    //   );
    // },

    actions: (rowData) => {
      return (
        <>
          <i
            onClick={() => {
              onEditClickPopUp(rowData);
            }}
            className="fa fa-edit mr-2"
          />
          <i
            onClick={() => {
              confirmDeleteDialogBox(rowData);
            }}
            className="fa fa-trash mr-2"
          />
        </>
      );
    },
  };

  return (
    <>
      {isLoader ? <Loader /> : null}
      <Toast ref={toast} />
      <ConfirmDialog />
      <div
        className="content-wrapper"
        style={{ height: "90vh", overflow: "scroll" }}
      >
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Users List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href={ROUTE.DASHBOARD}>Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Users List</li>
                </ol>
              </div>
            </div>
          </div>
          {/* <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
              <div className="col-sm-6 mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDisplayForm(true)}
                  style={{ float: "right" }}
                >
                  Add Strategy
                </button>
              </div>
            </div>
          </div> */}
        </section>

        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card mx-0 mt-3">
                  <DataTable
                    value={user}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    stripedRows
                    responsiveLayout="scroll"
                    loading={isLoader}
                  >
                    <Column
                      header="SR. No"
                      body={(data, options) => options.rowIndex + 1}
                    ></Column>

                    <Column
                      field="first_name"
                      sortable
                      filter
                      body={tableData.first_name}
                      header="First Name"
                    ></Column>
                    <Column
                      field="last_name"
                      sortable
                      filter
                      body={tableData.last_name}
                      header="Last Name"
                    ></Column>
                    <Column
                      field="email"
                      sortable
                      filter
                      body={tableData.email}
                      header="Email"
                    ></Column>
                    <Column
                      field="country"
                      sortable
                      filter
                      body={tableData.country}
                      header="Country Name"
                    ></Column>
                    {/* <Column
                      field="date_of_birth"
                      sortable
                      filter
                      body={tableData.date_of_birth}
                      header="Date of birth"
                    ></Column> */}
                    {/* <Column
                      field="country_code"
                      sortable
                      filter
                      body={tableData.country_code}
                      header="Country code"
                    ></Column> */}
                    <Column
                      field="mobile_number"
                      filter
                      body={tableData.mobile_number}
                      header="Mobile Number"
                    ></Column>
                    {/* <Column
                      field="otp"
                      sortable
                      filter
                      body={tableData.otp}
                      header="OTP"
                    ></Column>
                    <Column
                      field="is_email_verified"
                      // sortable
                      filter
                      body={tableData.is_email_verified}
                      header="Email verified"
                    ></Column>
                    <Column
                      field="is_mobile_verified"
                      // sortable
                      filter
                      body={tableData.is_mobile_verified}
                      header="Mobile verified"
                    ></Column>
                    <Column
                      field="receive_newsletter"
                      // sortable
                      filter
                      body={tableData.receive_newsletter}
                      header="Receive newletter"
                    ></Column>
                    <Column
                      field="receive_call_notification"
                      // sortable
                      filter
                      body={tableData.receive_call_notification}
                      header="Receive call notification"
                    ></Column>
                    <Column
                      field="app_notification"
                      // sortable
                      filter
                      body={tableData.app_notification}
                      header="App notification"
                    ></Column>
                    <Column
                      field="push_notification"
                      // sortable
                      filter
                      body={tableData.push_notification}
                      header="Push notification"
                    ></Column>
                    <Column
                      field="sms_notification"
                      // sortable
                      filter
                      body={tableData.sms_notification}
                      header="SMS notification"
                    ></Column>
                    <Column
                      field="email_notification"
                      // sortable
                      filter
                      body={tableData.email_notification}
                      header="Email notification"
                    ></Column>
                    <Column
                      field="trade_experience"
                      sortable
                      filter
                      body={tableData.trade_experience}
                      header="Trade experience"
                    ></Column>
                    <Column
                      field="risk_appetite"
                      sortable
                      filter
                      body={tableData.risk_appetite}
                      header="Risk appetite"
                    ></Column>
                    <Column
                      field="is_social_login"
                      // sortable
                      filter
                      body={tableData.is_social_login}
                      header="Social login"
                    ></Column>
                    <Column
                      field="createdAt"
                      filter
                      header="Created At"
                      body={tableData.createdAt}
                      sortable
                    ></Column> */}
                    <Column
                      field=""
                      header="Actions"
                      body={tableData.actions}
                    ></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        header={isEdit ? "Edit User" : "Add User"}
        visible={displayForm}
        style={{ width: "55vw" }}
        onHide={() => {
          setDisplayForm(false);
          setRowData({});
          setIsEdit(false);
          setFormData({});
        }}
      >
        <div className="row m-0">
          <div className="col-12" style={{ padding: "5px 5px" }}>
            <div className="card mt-0 mb-3">
              <div className="card-body row m-0 p-2">
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="first_name"
                      name="first_name"
                      value={formData?.first_name || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="First Name"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="last_name"
                      name="last_name"
                      value={formData?.last_name || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Last Name"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="email"
                      name="email"
                      value={formData?.email || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Email"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                {/* <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="country"
                      className="p-inputtext-sm col-12"
                      placeholder="Select country"
                      value={formData?.country}
                      options={countryData.map((country) => {
                        return {
                          _id: country.iso,
                          name: country.country,
                          value: country.country,
                        };
                      })}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="name"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "country"
                        );
                      }}
                    />
                  </span>
                </div> */}
                {/* <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData?.date_of_birth || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Date of birth"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="is_email_verified"
                      className="p-inputtext-sm col-12"
                      placeholder="Email_verified"
                      value={formData?.is_email_verified}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="_id"
                      optionValue="name"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Email verified"
                        );
                      }}
                    />
                  </span>
                </div> */}
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="country_code"
                      className="p-inputtext-sm col-12"
                      placeholder="Select code"
                      value={formData?.country_code}
                      options={countryData.map((country) => {
                        return {
                          _id: country.code,
                          name: "+" + country.code,
                          value: country.code,
                        };
                      })}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="value"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Country code"
                        );
                      }}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="mobile_number"
                      type="number"
                      inputMode="numeric"
                      name="mobile_number"
                      value={formData?.mobile_number || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Mobile number"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="is_sms_notification_allowed"
                      className="p-inputtext-sm col-12"
                      placeholder="SMS notification"
                      value={formData?.is_sms_notification_allowed}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "SMS notification access"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="is_email_notification_allowed"
                      className="p-inputtext-sm col-12"
                      placeholder="Email notification"
                      value={formData?.is_email_notification_allowed}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Email notification access"
                        );
                      }}
                    />
                  </span>
                </div>

                {/* <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="otp"
                      name="otp"
                      value={formData?.otp || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="OTP"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="trade_experience"
                      className="p-inputtext-sm col-12"
                      placeholder="Trade experience"
                      value={formData?.trade_experience}
                      options={[
                        {
                          _id: 1,
                          name: "Less than 1 year",
                          value: 1,
                        },
                        {
                          _id: 2,
                          name: "1-3 year",
                          value: 2,
                        },
                        {
                          _id: 3,
                          name: "3-5 year",
                          value: 3,
                        },
                        {
                          _id: 4,
                          name: "5-10 year",
                          value: 4,
                        },
                        {
                          _id: 5,
                          name: "10-20 year",
                          value: 5,
                        },
                        {
                          _id: 6,
                          name: "More than 20 year",
                          value: 6,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="name"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Trade experience"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="risk_appetite"
                      className="p-inputtext-sm col-12"
                      placeholder="Risk appetite"
                      value={formData?.risk_appetite}
                      options={[
                        {
                          _id: 1,
                          name: "Low Risk",
                          value: 1,
                        },
                        {
                          _id: 2,
                          name: "Medium Risk",
                          value: 2,
                        },
                        {
                          _id: 3,
                          name: "High Risk",
                          value: 3,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="name"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Risk appetite"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="receive_newsletter"
                      className="p-inputtext-sm col-12"
                      placeholder="Receive newsletter"
                      value={formData?.receive_newsletter}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Receive newsletter"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="receive_call_notification"
                      className="p-inputtext-sm col-12"
                      placeholder="Receive call notification"
                      value={formData?.receive_call_notification}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Receive call notification"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="app_notification"
                      className="p-inputtext-sm col-12"
                      placeholder="App Notification"
                      value={formData?.app_notification}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "App Notification"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="push_notification"
                      className="p-inputtext-sm col-12"
                      placeholder="Push Notification"
                      value={formData?.push_notification}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Push Notification"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="sms_notification"
                      className="p-inputtext-sm col-12"
                      placeholder="SMS Notification"
                      value={formData?.sms_notification}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "SMS Notification"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="email_notification"
                      className="p-inputtext-sm col-12"
                      placeholder="Email Notification"
                      value={formData?.email_notification}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Email Notification"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="is_social_login"
                      className="p-inputtext-sm col-12"
                      placeholder="Social login"
                      value={formData?.is_social_login}
                      options={[
                        {
                          _id: true,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: false,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}
                          </div>
                        ) : (
                          "Social login"
                        );
                      }}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="is_mobile_verified"
                      className="p-inputtext-sm col-12"
                      placeholder="Mobile verified"
                      value={formData?.is_mobile_verified}
                      options={[
                        {
                          _id: 1,
                          name: "True",
                          value: 1,
                        },
                        {
                          _id: 0,
                          name: "False",
                          value: 0,
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="name"
                      optionValue="name"
                      filter
                      showClear
                      filterBy="name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.name || ""}{" "}
                          </div>
                        ) : (
                          "Mobile verified"
                        );
                      }}
                    />
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-12 mt-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setDisplayForm(false);
              setRowData({});
              setIsEdit(false);
              setFormData({});
            }}
            style={{ float: "right" }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mr-2"
            onClick={onUpdateUser}
            style={{ float: "right" }}
          >
            Submit
          </button>
        </div>
      </Dialog>
    </>
  );
};
