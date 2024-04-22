import React, {useEffect, useState, useRef} from "react";
import {AuthService} from "../../services/auth/auth.service";
import {ROUTE, TOKEN, USER_DETAILS} from "../../constants/constants";
import {APIService} from "../../services/api/api-service";
import {Redirect} from "react-router-dom";
import {toasterService} from "../../services/common/utilityService";
import {Toast} from 'primereact/toast';
import {URLS} from "../../constants/urls";
import {getLoginModel} from "../../services/auth/auth.model";

export const Login = () => {
    const [formData, setFormData] = useState({});
    const [redirect, setRedirect] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        if (localStorage.getItem(TOKEN) !== null) {
            setRedirect(true);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            login()
        }
    }

    const login = async () => {
        // const response = await AuthService.login(formData);
        try {
            const response = await APIService.Instance.post(
                URLS.LOGIN,
                getLoginModel(formData)
            );
            if (response) {
                const {meta, data} = response.data;
                console.log(data);
                if (meta && meta.code === 1) {
                    const responseData = {
                        name: data.first_name+' '+ data.last_name || "Admin",
                        displayName: data.first_name+' '+ data.last_name || "Admin",
                        userType: {
                            name: data.user_type
                        }
                    }
                    // Successful login
                    localStorage.setItem(TOKEN, meta?.token);
                    localStorage.setItem(USER_DETAILS, JSON.stringify(responseData));
                    toasterService(toast, 'success', 'Success', meta.message, 3000);
                    setRedirect(true);
                    return responseData;
                } else {
                    // Handle API errors
                    toasterService(toast, 'error', 'Error', meta.message, 3000);   //alert("Invalid Admin Credentials..");
                    console.error("API error:", meta.message);
                    return {};
                }
            } else {
                toasterService(toast, 'error', 'Error', "Something went wrong", 3000);
                return {};
            }
        } catch (e) {
            // Handle other errors
            if (e.response && e.response.data && e.response.data.meta) {
                const {meta} = e.response.data;
                toasterService(toast, 'error', 'Error', meta.message, 3000);
                console.error("API error in catch block:", meta.message);
            } else {
                toasterService(toast, 'error', 'Error', "An unexpected error occurred", 3000);
                console.error("Unexpected error in catch block:", e);
            }

            // Handle other actions or re-throw the error if needed
            throw e;
        }
    };

    if (redirect === true) {
        // window.location.href = ROUTE.DASHBOARD; // Hotfix for first time reload
        // return;
        return <Redirect to={ROUTE.DASHBOARD} />;
    }

    return (
        <>
            <Toast ref={toast}/>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#">Quant11 Admin</a>
                    </div>

                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <div className="input-group mb-3">
                                <input
                                    name="email" //"email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })
                                    }}
                                />
                                {/* {errors.email && <span>This field is required</span>} */}
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"/>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    name="password"
                                    required
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value
                                        })
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <button onClick={login} className="btn btn-primary btn-block">
                                        Sign In
                                    </button>
                                </div>
                                <div className="col-4"></div>
                                {/* <div className="col-4">
                    <button type="button" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div> */}
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
