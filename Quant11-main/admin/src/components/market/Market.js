import React, {useRef} from "react";
import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Loader} from "../loader/Loader";
import {InputText} from "primereact/inputtext";
import "./market.css";
import { ROUTE } from "../../constants/constants";
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import {toasterService, confirmBox} from "../../services/common/utilityService";
import {APIService} from "../../services/api/api-service";
import {URLS} from "../../constants/urls";

export const Market = () => {
    const [isLoader, setLoader] = useState(false);
    const [formData, setFormData] = useState({});

    const [market, setMarket] = useState([]);
    const [displayForm, setDisplayForm] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowData, setRowData] = useState({})

    const toast = useRef(null);

    useEffect(() => {
        getMarketList();
    }, []);


    const handleValueChange = (event) => {
        const updatedValue = {...formData};
        updatedValue[event?.target?.name] = event?.target?.value;
        setFormData(updatedValue);
    };

    const getMarketList = async () => {
        setLoader(true);
        try {
            // const response = await marketService.getMarketList();
            try {
                const response = await APIService.Instance.get(`${URLS.MARKET_LIST}`);
                if (response) {
                    const {meta, data} = response.data;
                    if (meta && meta.code === 1) {
                        // Successful login
                        setMarket(data)
                    } else {
                        toasterService(toast, 'error', 'Error', meta.message, 3000);   //alert("Invalid Admin Credentials..");
                        return {};
                    }
                } else {
                    toasterService(toast, 'error', 'Error', "Something went wrong", 3000);
                    return {};
                }
            } catch (e) {
                if (e.response && e.response.data && e.response.data.meta) {
                    const {meta} = e.response.data;
                    toasterService(toast, 'error', 'Error', meta.message, 3000);
                } else {
                    toasterService(toast, 'error', 'Error', "An unexpected error occurred", 3000);
                }
                throw e;
            }
        } finally {
            setLoader(false);
        }
    };


    const onAddMarketClick = async () => {
        setLoader(true);
        try {
            const response = await APIService.Instance.post(URLS.MARKET_CREATE, formData);
            setLoader(false);
            if (response) {
                const {meta, data} = response.data;
                if (meta && meta.code === 1) {
                    setFormData({});
                    setDisplayForm(false)
                    getMarketList();
                    toasterService(toast, 'success', 'Success', meta?.message, 3000);
                } else {
                    toasterService(toast, 'error', 'Error', meta?.message, 3000);
                }
            } else {
                toasterService(toast, 'error', 'Error', "Something went wrong", 3000);
            }
        } catch (e) {
            setLoader(false);
            if (e.response && e.response.data && e.response.data.meta) {
                const {meta} = e.response.data;
                toasterService(toast, 'error', 'Error', meta.message, 3000);
            } else {
                toasterService(toast, 'error', 'Error', "An unexpected error occurred", 3000);
            }
            throw e;
        }
    };

    const onUpdateMarketClick = async () => {
        setLoader(true);
        try {
            const response = await APIService.Instance.post(
                URLS.MARKET_CREATE,
                {
                    id: formData._id, market_name: formData.market_name
                });
            setLoader(false);
            if (response) {
                const {meta, data} = response.data;
                if (meta && meta.code === 1) {
                    setFormData({});
                    setDisplayForm(false)
                    setRowData({})
                    setIsEdit(false)
                    getMarketList();
                    toasterService(toast, 'success', 'Success', meta?.message, 3000);
                } else {
                    toasterService(toast, 'error', 'Error', meta.message, 3000);   //alert("Invalid Admin Credentials..");
                    return {};
                }
            } else {
                toasterService(toast, 'error', 'Error', "Something went wrong", 3000);
                //alert(response?.message);
            }
        } catch (e) {
            setLoader(false);
            if (e.response && e.response.data && e.response.data.meta) {
                const {meta} = e.response.data;
                toasterService(toast, 'error', 'Error', meta.message, 3000);
            } else {
                toasterService(toast, 'error', 'Error', "An unexpected error occurred", 3000);
            }
            throw e;
        }
    };

    const onDeleteMarketClick = async (rowData) => {
        setLoader(true);
        try {
            const response = await APIService.Instance.get(URLS.MARKET_DELETE+rowData._id);
            if (response) {
                const {meta, data} = response.data;
                if (meta && meta.code === 1) {
                    getMarketList();
                    toasterService(toast, 'success', 'Success', meta?.message, 3000);
                } else {
                    toasterService(toast, 'error', 'Error', meta.message, 3000);   //alert("Invalid Admin Credentials..");
                    return {};
                }
            } else {
                toasterService(toast, 'error', 'Error', "Something went wrong", 3000);
                //alert(response?.message);
            }
        } catch (e) {
            setLoader(false);
            if (e.response && e.response.data && e.response.data.meta) {
                const {meta} = e.response.data;
                toasterService(toast, 'error', 'Error', meta.message, 3000);
            } else {
                toasterService(toast, 'error', 'Error', "An unexpected error occurred", 3000);
            }
            throw e;
        }
    };

    const onEditClickPopUp = (rowData) => {
        const obj = {...rowData}
        obj.isActive = obj.isActive ? 'Active' : 'InActive';

        setRowData(obj);
        setIsEdit(true)
        setFormData(obj);
        setDisplayForm(true)
    }


    const confirmDeleteDialogBox = (rowData) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => onDeleteMarketClick(rowData),
            reject: () => toasterService(toast, 'warn', 'Rejected', 'You have rejected category delete.', 3000)
        });
    };

    const tableData = {
        name: (rowData) => {
            return (
                <span className="text-capitalize">{`${rowData?.market_name || ""}`}</span>
            );
        },
        actions: (rowData) => {
            return (
                <>
                    <i onClick={() => {
                        onEditClickPopUp(rowData)
                    }} className="fa fa-edit mr-2"/>
                    {/* <i onClick={() => { onDeleteCategoryClick(rowData) }} className="fa fa-trash mr-2" /> */}
                    <i onClick={() => {
                        confirmDeleteDialogBox(rowData)
                    }} className="fa fa-trash mr-2"/>
                </>
            );
        },
    };

    return (
        <>
            {isLoader ? <Loader/> : null}
            <Toast ref={toast}/>
            <ConfirmDialog/>
            <div className="content-wrapper" style={{height: "90vh", overflow: "scroll"}}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Market List</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href={ROUTE.DASHBOARD}>Dashboard</a></li>
                                    <li className="breadcrumb-item active">Market List</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            </div>
                            <div className="col-sm-6 mt-2">
                                <button className="btn btn-primary" onClick={() => setDisplayForm(true)}
                                        style={{float: 'right'}}>
                                    Add Market
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
                                        value={market}
                                        paginator
                                        rows={10}
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                        stripedRows
                                        responsiveLayout="scroll"
                                        loading={isLoader}
                                    >
                                        <Column header="SR. No"
                                                body={(data, options) => options.rowIndex + 1}>
                                        </Column>
                                        <Column
                                            field="market_name"
                                            sortable
                                            filter
                                            body={tableData.name}
                                            header="Market Name"
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
            <Dialog header={isEdit ? 'Edit Market' : 'Add Market'}
                    visible={displayForm}
                    style={{width: '55vw'}}
                    onHide={() => {
                        setDisplayForm(false);
                        setRowData({});
                        setIsEdit(false);
                        setFormData({})
                    }}>
                <div className="row m-0">
                    <div className="col-12" style={{padding: '5px 5px'}}>
                        <div className="card mt-0 mb-3">
                            <div className="card-body row m-0 p-2">
                                <div className="col-12 col-md-6 my-2">
                  <span className="field">
                    <InputText
                        id="market_name"
                        name="market_name"
                        value={formData?.market_name || ""}
                        className="p-inputtext-sm col-12"
                        placeholder="Market Name"
                        onChange={handleValueChange}
                    />
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 mt-2">
                    <button className="btn btn-secondary"
                            onClick={() => {
                                setDisplayForm(false);
                                setRowData({});
                                setIsEdit(false);
                                setFormData({})
                            }}
                            style={{float: 'right'}}>Cancel
                    </button>
                    <button className="btn btn-primary mr-2" onClick={isEdit ? onUpdateMarketClick : onAddMarketClick}
                            style={{float: 'right'}}>Submit
                    </button>

                </div>
            </Dialog>
        </>
    );
};
