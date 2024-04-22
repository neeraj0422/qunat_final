import React, { useEffect, useState } from 'react';
import { StyledSettings } from '../../Styles/Pages/Settings';
import SettingsAccordian from '../../Components/Settings/SettingsAccordian';
import ManageRisk from '../../Assets/Settings/ManageRisk.png';
import ManageTrade from '../../Assets/Settings/ManageTrade.png';
import Notification from '../../Assets/sidebar/Notofication.png';
import ManageRiskAppetite from '../../Components/Settings/ManageRiskAppetite';
import ManageTradeExperience from '../../Components/Settings/ManageTradeExperience';
import NotificationSettings from '../../Components/Settings/NotificationSettings';
import apiRequest from '../../api/api';
import { toast } from 'react-toastify';

const Settings = () => {
  const [settingData, setSettingData] = useState({
    risk_appetite: 2,
    trade_experience: 3,
    app_notification: true,
    push_notification: true,
    sms_notification: true,
    email_notification: true
  });
  const [notificationData, setNotificationData] = useState({
    is_sms_notification_allowed: false,
    is_email_notification_allowed: false
  });

  //fetch settings data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { response, responseData, error } = await apiRequest(`api/v1/user-details`, 'GET');

    if (!error) {
      if (!response.ok) {
        toast.error(
          `Setting data fetching failed: ${responseData?.meta?.message || 'Unknown error'}`
        );
      }
    } else {
      toast.error('An error occurred while fetching settings', error);
    }

    setSettingData({
      risk_appetite: responseData.data.risk_appetite,
      trade_experience: responseData.data.trade_experience,
      app_notification: responseData.data.app_notification,
      push_notification: responseData.data.push_notification,
      sms_notification: responseData.data.sms_notification,
      email_notification: responseData.data.email_notification
    });
    setNotificationData({
      is_sms_notification_allowed: responseData.data.is_sms_notification_allowed,
      is_email_notification_allowed: responseData.data.is_email_notification_allowed
    });
  }

  const handleSubmit = async () => {
    const { response, responseData, error } = await apiRequest(
      `api/v1/settings`,
      'POST',
      settingData
    );

    if (!error) {
      if (response.ok) {
        toast.success(responseData.meta.message);
      } else {
        toast.error(`Setting update failed: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('An error occurred while updating settings', error);
    }
    setSettingData({
      risk_appetite: responseData.data.risk_appetite,
      trade_experience: responseData.data.trade_experience,
      app_notification: responseData.data.app_notification,
      push_notification: responseData.data.push_notification,
      sms_notification: responseData.data.sms_notification,
      email_notification: responseData.data.email_notification
    });
  };

  return (
    <>
      <StyledSettings>
        <div className="main-title">Settings</div>

        <div className="setting-accordion">
          <div className="setting-wrapper">
            <SettingsAccordian
              accordionTitleIcon={ManageRisk}
              accordionTitle="Manage Risk Appetite"
              accordionContent={
                <ManageRiskAppetite settingData={settingData} setSettingData={setSettingData} />
              }
            />
            <SettingsAccordian
              accordionTitleIcon={ManageTrade}
              accordionTitle="Manage Trading Experience"
              accordionContent={
                <ManageTradeExperience settingData={settingData} setSettingData={setSettingData} />
              }
            />
            <SettingsAccordian
              accordionTitleIcon={Notification}
              accordionTitle="Notification"
              accordionContent={
                <NotificationSettings
                  setSettingData={setSettingData}
                  settingData={settingData}
                  notificationData={notificationData}
                />
              }
            />
          </div>
          <div className="setting-button" onClick={handleSubmit}>
            Save Changes
          </div>
        </div>
      </StyledSettings>
    </>
  );
};

export default Settings;
