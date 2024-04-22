import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Loader } from "../loader/Loader";
import { InputText } from "primereact/inputtext";
import "./asset.css";
import { ROUTE } from "../../constants/constants";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { toasterService } from "../../services/common/utilityService";
import { APIService } from "../../services/api/api-service";
import { URLS } from "../../constants/urls";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

export const Asset = () => {
  const [isLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({});

  const [assets, setAssets] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    getList();
    getMarketList();
  }, []);

  const handleValueChange = (event) => {
    const updatedValue = { ...formData };
    updatedValue[event?.target?.name] = event?.target?.value;
    setFormData(updatedValue);
  };

  const handleImageUpload = (event) => {
    const file = event.files[0];
    setImagePreview(file.objectURL);
    setIsImageUploaded(true);
    setFormData({
      ...formData,
      asset_image: file,
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

  const getList = async () => {
    setLoader(true);
    try {
      try {
        const response = await APIService.Instance.get(`${URLS.ASSET_LIST}`);
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

  const onAddAssetClick = async () => {
    setLoader(true);
    try {
      const data = new FormData();
      data.append("asset_name", formData.asset_name);
      data.append("asset_image", formData.asset_image);
      data.append("market_id", formData.market_id);
      data.append("ticker_symbol", formData.ticker_symbol);
      const response = await APIService.Instance.post(URLS.ASSET_CREATE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoader(false);
      if (response) {
        const { meta, data } = response.data;
        if (meta && meta.code === 1) {
          setFormData({});
          setIsImageUploaded(false);
          setImagePreview("");
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
      data.append("asset_name", formData.asset_name);
      data.append("ticker_symbol", formData.ticker_symbol);
      if (formData.asset_image && isImageUploaded) {
        data.append("asset_image", formData.asset_image);
      }
      data.append("market_id", formData.market_id);
      const response = await APIService.Instance.post(URLS.ASSET_CREATE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoader(false);
      if (response) {
        const { meta, data } = response.data;
        if (meta && meta.code === 1) {
          setFormData({});
          setIsImageUploaded(false);
          setImagePreview("");
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
        URLS.ASSET_DELETE + rowData._id
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
    setImagePreview(obj.asset_image_url);
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
    asset_image_url: (rowData) => {
      return (
        <img
          width="40"
          src={rowData?.asset_image_url || ""}
          alt="asset_image"
        />
      );
    },
    market_name: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.market_name || ""
        }`}</span>
      );
    },
    name: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.asset_name || ""
        }`}</span>
      );
    },
    ticker_symbol: (rowData) => {
      return (
        <span className="text-capitalize">{`${
          rowData?.ticker_symbol || "-"
        }`}</span>
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
                <h1>Asset List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href={ROUTE.DASHBOARD}>Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Asset List</li>
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
                  Add Asset
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
                    value={assets}
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
                      field="asset_image_url"
                      body={tableData.asset_image_url}
                      header="Image"
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
                      body={tableData.name}
                      header="Asset Name"
                    ></Column>
                    <Column
                      field="ticker_symbol"
                      sortable
                      filter
                      body={tableData.ticker_symbol}
                      header="Ticker Symbol"
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

      {/* Add Edit CATEGORY */}
      <Dialog
        header={isEdit ? "Edit Asset" : "Add Asset"}
        visible={displayForm}
        style={{ width: "55vw" }}
        onHide={() => {
          setDisplayForm(false);
          setRowData({});
          setIsEdit(false);
          setFormData({});
          setImagePreview("");
          setIsImageUploaded(false);
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
                    <InputText
                      id="asset_name"
                      name="asset_name"
                      value={formData?.asset_name || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Name"
                      onChange={handleValueChange}
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                      id="ticker_symbol"
                      name="ticker_symbol"
                      value={formData?.ticker_symbol || ""}
                      className="p-inputtext-sm col-12"
                      placeholder="Ticker Symbol"
                      onChange={handleValueChange}
                      required
                    />
                  </span>
                </div>
                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <FileUpload
                      className="primary"
                      name="asset_image"
                      mode="basic"
                      accept="image/*"
                      customUpload
                      maxFileSize={1000000}
                      chooseLabel="Upload Asset Image"
                      // uploadHandler={handleImageUpload}
                      onSelect={(e) => handleImageUpload(e)}
                    />
                  </span>
                </div>
                {imagePreview && (
                  <div className="col-12 col-md-6 my-2">
                    <span className="image-preview">
                      <img src={imagePreview} />
                    </span>
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
              setImagePreview("");
              setIsImageUploaded(false);
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
