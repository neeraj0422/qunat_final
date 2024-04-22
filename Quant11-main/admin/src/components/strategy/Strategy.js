import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Loader } from "../loader/Loader";
import { InputText } from "primereact/inputtext";
import "./strategy.css";
import { ROUTE } from "../../constants/constants";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { toasterService } from "../../services/common/utilityService";
import { APIService } from "../../services/api/api-service";
import { URLS } from "../../constants/urls";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

export const Strategy = () => {
  const [isLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({});

  const [strategy, setStrategy] = useState([]);
  const [assets, setAssets] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState({});

  const toast = useRef(null);

  useEffect(() => {
    getList();
    getMarketList();
  }, []);

  const handleValueChange = (event) => {
    const updatedValue = { ...formData };
    updatedValue[event?.target?.name] = event?.target?.value;
    if (event?.target?.name === "market_id") {
      if (event?.target?.value) {
        getAssetList(event?.target?.value);
      } else {
        setAssets([]);
      }
      setFormData({
        ...updatedValue,
        asset_id: null,
      });
    }
    setFormData(updatedValue);
  };

  const handleFileUpload = (event) => {
    const file = event.files[0];
    setFormData({
      ...formData,
      trade_data_file: file,
    });
  };

  const getMarketList = async () => {
    setLoader(true);
    try {
      try {
        const response = await APIService.Instance.get(`${URLS.MARKET_LIST}`);
        if (response) {
          const { meta, data } = response.data;
          if (meta && meta.code === 1) {
            // Successful login
            setMarkets(data);
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

  const getAssetList = async (id) => {
    setLoader(true);
    try {
      try {
        const response = await APIService.Instance.get(URLS.MARKET_ASSETS + id);
        if (response) {
          const { meta, data } = response.data;
          if (meta && meta.code === 1) {
            // Successful login
            setAssets(data);
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

  const getList = async () => {
    setLoader(true);
    try {
      try {
        const response = await APIService.Instance.get(`${URLS.STRATEGY_LIST}`);
        if (response) {
          const { meta, data } = response.data;
          if (meta && meta.code === 1) {
            // Successful login
            setStrategy(data);
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

  const regenerateID = async (id) => {
    setLoader(true);
    try {
      try {
        const response = await APIService.Instance.get(
          `${URLS.STRATEGY_ID_REGENERATE + id}`
        );
        if (response) {
          const { meta, data } = response.data;
          if (meta && meta.code === 1) {
            await getList();
            setDisplayForm(false);
            setRowData({});
            setIsEdit(false);
            setFormData({});
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
  const onAddAssetClick = async () => {
    setLoader(true);
    try {
      const data = new FormData();
      data.append("asset_id", formData.asset_id);
      data.append("market_id", formData.market_id);
      data.append("strategy_name", formData.strategy_name);
      data.append("currency", formData.currency);
      data.append("initial_balance", formData.initial_balance);
      data.append("timeframe", formData.timeframe);
      data.append("profit_factor", formData.profit_factor);
      data.append("drawdown", formData.drawdown);
      data.append("profit_percentage", formData.profit_percentage);
      data.append("inverse", formData.inverse);
      data.append("pyramiding", formData.pyramiding);
      data.append("pyramiding_stack", formData.pyramiding_stack);
      data.append("stop_loss", formData.stop_loss);
      data.append("trade_data_file", formData.trade_data_file);

      const response = await APIService.Instance.post(
        URLS.STRATEGY_CREATE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const response = await APIService.Instance.post(URLS.STRATEGY_CREATE, {
      //   asset_id: formData.asset_id,
      //   market_id: formData.market_id,
      //   strategy_name: formData.strategy_name,
      //   currency: formData.currency,
      //   initial_balance: formData.initial_balance,
      //   timeframe: formData.timeframe,
      //   profit_factor: formData.profit_factor,
      //   drawdown: formData.drawdown,
      //   profit_percentage: formData.profit_percentage,
      //   inverse: formData.inverse,
      //   pyramiding: formData.pyramiding,
      //   pyramiding_stack: formData.pyramiding ? formData.pyramiding_stack : 0,
      //   stop_loss: formData.stop_loss,
      // });
      setLoader(false);
      if (response) {
        const { meta, data } = response.data;
        if (meta && meta.code === 1) {
          setFormData({});
          setDisplayForm(false);
          getList();
          toasterService(toast, "success", "Success", meta?.message, 3000);
        } else {
          toasterService(toast, "error", "Error", meta?.message, 3000);
        }
      } else {
        toasterService(toast, "error", "Error", "Something went wrong", 3000);
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

  const onUpdateAssetClick = async () => {
    setLoader(true);
    try {
      const data = new FormData();
      data.append("id", formData._id);
      data.append("asset_id", formData.asset_id);
      data.append("market_id", formData.market_id);
      data.append("strategy_name", formData.strategy_name);
      data.append("currency", formData.currency);
      data.append("initial_balance", formData.initial_balance);
      data.append("timeframe", formData.timeframe);
      data.append("profit_factor", formData.profit_factor);
      data.append("drawdown", formData.drawdown);
      data.append("profit_percentage", formData.profit_percentage);
      data.append("inverse", formData.inverse);
      data.append("pyramiding", formData.pyramiding);
      data.append(
        "pyramiding_stack",
        formData.pyramiding ? formData.pyramiding_stack : 0
      );
      data.append("stop_loss", formData.stop_loss);

      const response = await APIService.Instance.post(
        URLS.STRATEGY_CREATE,
        // {
        //   id: formData._id,
        //   asset_id: formData.asset_id,
        //   market_id: formData.market_id,
        //   strategy_name: formData.strategy_name,
        //   currency: formData.currency,
        //   initial_balance: Number(formData.initial_balance),
        //   timeframe: formData.timeframe,
        //   profit_factor: formData.profit_factor,
        //   drawdown: formData.drawdown,
        //   profit_percentage: formData.profit_percentage,
        //   inverse: formData.inverse,
        //   pyramiding: formData.pyramiding,
        //   pyramiding_stack: formData.pyramiding ? formData.pyramiding_stack : 0,
        //   stop_loss: formData.stop_loss,
        // }
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoader(false);
      if (response) {
        const { meta, data } = response.data;
        if (meta && meta.code === 1) {
          setFormData({});
          setDisplayForm(false);
          setRowData({});
          setIsEdit(false);
          getList();
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

  const onDeleteAssetClick = async (rowData) => {
    setLoader(true);
    try {
      const response = await APIService.Instance.get(
        URLS.STRATEGY_DELETE + rowData._id
      );
      if (response) {
        const { meta } = response.data;
        if (meta && meta.code === 1) {
          getList();
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
    getAssetList(obj.market_id);
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
      accept: () => onDeleteAssetClick(rowData),
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

  const tableData = {
    market_name: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.market_name || "-"
        }`}</span>
      );
    },
    asset_name: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.asset_name || "-"
        }`}</span>
      );
    },
    strategy_name: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.strategy_name || "-"
        }`}</span>
      );
    },
    strategy_id: (rowData) => {
      return <span>{`${rowData?.strategy_id || "-"}`}</span>;
    },
    secret_key: (rowData) => {
      return <span>{`${rowData?.secret_key || "-"}`}</span>;
    },
    stop_loss: (rowData) => {
      return (
        <span>{` ${rowData?.stop_loss ? rowData?.stop_loss + "%" : "-"}`}</span>
      );
    },
    actions: (rowData) => {
      return (
        <>
          <i
            onClick={() => {
              onEditClickPopUp(rowData);
            }}
            className="fa fa-edit mr-2"
          />
          {/* <i onClick={() => { onDeleteCategoryClick(rowData) }} className="fa fa-trash mr-2" /> */}
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
                <h1>Strategy List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href={ROUTE.DASHBOARD}>Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Strategy List</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="container-fluid">
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
          </div>
        </section>

        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card mx-0 mt-3">
                  <DataTable
                    value={strategy}
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
                      field="market_name"
                      sortable
                      filter
                      body={tableData.market_name}
                      header="Market Name"
                    ></Column>
                    <Column
                      field="asset_name"
                      sortable
                      filter
                      body={tableData.asset_name}
                      header="Asset Name"
                    ></Column>
                    <Column
                      field="strategy_name"
                      sortable
                      filter
                      body={tableData.strategy_name}
                      header="Strategy Name"
                    ></Column>
                    <Column
                      field="stop_loss"
                      sortable
                      filter
                      body={tableData.stop_loss}
                      header="Stop loss"
                    ></Column>
                    <Column
                      field="strategy_id"
                      sortable
                      filter
                      body={tableData.strategy_id}
                      header="Strategy ID"
                    ></Column>
                    <Column
                      field="secret_key"
                      sortable
                      filter
                      body={tableData.secret_key}
                      header="Secret Key"
                    ></Column>
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
        header={isEdit ? "Edit Strategy" : "Add Strategy"}
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
                    <Dropdown
                      name="market_id"
                      className="p-inputtext-sm col-12"
                      placeholder="Market"
                      value={formData?.market_id}
                      options={markets}
                      onChange={handleValueChange}
                      optionLabel="market_name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="market_name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.market_name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.market_name || ""}{" "}
                          </div>
                        ) : (
                          "Markets"
                        );
                      }}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="asset_id"
                      className="p-inputtext-sm col-12"
                      placeholder="Asset"
                      value={formData?.asset_id}
                      options={assets}
                      onChange={handleValueChange}
                      optionLabel="asset_name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="asset_name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.asset_name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.asset_name || ""}{" "}
                          </div>
                        ) : (
                          "Assets"
                        );
                      }}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="strategy_name"
                      name="strategy_name"
                      value={formData?.strategy_name || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Strategy Name"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="stop_loss"
                      name="stop_loss"
                      value={formData?.stop_loss || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Stop loss"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="currency"
                      className="p-inputtext-sm col-12"
                      placeholder="Currency"
                      value={formData?.currency}
                      options={[
                        {
                          _id: "usd",
                          currency_name: "USD",
                        },
                        {
                          _id: "franc",
                          currency_name: "Swiss Franc",
                        },
                        {
                          _id: "inr",
                          currency_name: "INR",
                        },
                        {
                          _id: "dirham",
                          currency_name: "Dirham",
                        },
                      ]}
                      onChange={handleValueChange}
                      optionLabel="currency_name"
                      optionValue="_id"
                      filter
                      showClear
                      filterBy="currency_name"
                      itemTemplate={(option) => (
                        <div className="text-capitalize itemTemplate">
                          {option?.currency_name || ""}
                        </div>
                      )}
                      valueTemplate={(option) => {
                        return option ? (
                          <div className="text-capitalize valueTemplate">
                            {option?.currency_name || ""}{" "}
                          </div>
                        ) : (
                          "Currency"
                        );
                      }}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="initial_balance"
                      name="initial_balance"
                      value={formData?.initial_balance || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Initial Balance"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="timeframe"
                      name="timeframe"
                      value={formData?.timeframe || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Timeframe"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="profit_factor"
                      name="profit_factor"
                      value={formData?.profit_factor || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Profit Factor"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="drawdown"
                      name="drawdown"
                      value={formData?.drawdown || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Drawdown"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>

                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="profit_percentage"
                      name="profit_percentage"
                      value={formData?.profit_percentage || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Profit Percentage(%)"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="inverse"
                      className="p-inputtext-sm col-12"
                      placeholder="Inverse"
                      value={formData?.inverse}
                      options={[
                        {
                          _id: true,
                          name: "TRUE",
                        },
                        {
                          _id: false,
                          name: "FALSE",
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
                          "Inverse"
                        );
                      }}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <Dropdown
                      name="pyramiding"
                      className="p-inputtext-sm col-12"
                      placeholder="Pyramiding"
                      value={formData?.pyramiding}
                      options={[
                        {
                          _id: true,
                          name: "TRUE",
                        },
                        {
                          _id: false,
                          name: "FALSE",
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
                          "Pyramiding"
                        );
                      }}
                    />
                  </span>
                </div>
                {isEdit ? (
                  ""
                ) : (
                  <div className="col-12 col-md-6 my-2">
                    <span className="field">
                      <FileUpload
                        className="primary"
                        name="trade_data_file"
                        mode="basic"
                        // accept=""
                        customUpload
                        maxFileSize={1000000}
                        chooseLabel="Import Trades CSV File"
                        // uploadHandler={handleImageUpload}
                        onSelect={(e) => handleFileUpload(e)}
                      />
                    </span>
                  </div>
                )}

                {formData.pyramiding && (
                  <div className="col-12 col-md-6 my-2">
                    <span className="field">
                      <InputText
                        id="pyramiding_stack"
                        name="pyramiding_stack"
                        value={formData?.pyramiding_stack || ""}
                        className="p-inputtext-sm col-12"
                        placeholder="Pyramiding Max Stack(%)"
                        onChange={handleValueChange}
                      />
                    </span>
                  </div>
                )}
                {/* {!formData.pyramiding && (
                  <div className="col-12 col-md-6 my-2"></div>
                )} */}
                {/* <div> */}
                {formData?.strategy_id && (
                  <div className="col-12 col-md-5 my-2">
                    <span className="field font-weight-bold">StrategyID</span>
                    <br />
                    <span className="field font-size-12">
                      {formData?.strategy_id}
                    </span>
                  </div>
                )}
                {/* </div> */}
                {/* <div> */}
                {formData?.secret_key && (
                  <div className="col-12 col-md-5 my-2">
                    <span className="field font-weight-bold">SecretKey</span>
                    <br />
                    <span className="field font-size-12">
                      {formData?.secret_key}
                    </span>
                  </div>
                )}
                {/* </div> */}
                {formData?.secret_key && (
                  <div className="col-12 col-md-2 my-2">
                    <button
                      className="font-size-12 btn btn-secondary"
                      onClick={() => regenerateID(formData._id)}
                      style={{ float: "right" }}
                    >
                      Re-generate
                    </button>
                  </div>
                )}
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
            onClick={isEdit ? onUpdateAssetClick : onAddAssetClick}
            style={{ float: "right" }}
          >
            Submit
          </button>
        </div>
      </Dialog>
    </>
  );
};
