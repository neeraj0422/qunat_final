import { confirmDialog } from 'primereact/confirmdialog';

import jwtDecode from "jwt-decode";

export const getJWTExpiryTime = (token) => {
  const decodedToken = jwtDecode(token);
  const expTime = decodedToken?.exp;
  return expTime;
}

export const toasterService = (toast,severity,summary,detail,life)=>{
  toast.current.show({ severity:severity, summary: summary, detail:detail, life:life || 3000 });
  return true;
}

export const confirmBox = (accept,reject) => {
  confirmDialog({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClassName: 'p-button-danger',
    accept,
    reject
  });
};
