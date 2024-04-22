import { SettingsNotification } from '../../Styles/Pages/Settings';

const NotificationSettings = ({ setSettingData, settingData, notificationData }) => {
  const handleCheckboxChange = (checkboxName) => {
    setSettingData((prevStates) => ({
      ...prevStates,
      [checkboxName]: !prevStates[checkboxName]
    }));
  };

  return (
    <>
      <SettingsNotification>
        <div className="notification-name">App notification</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={settingData.app_notification}
            onChange={() => handleCheckboxChange('app_notification')}
          />
          <span className="slider round"></span>
        </label>
      </SettingsNotification>
      <SettingsNotification>
        <div className="notification-name">Push notification</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={settingData.push_notification}
            onChange={() => handleCheckboxChange('push_notification')}
          />
          <span className="slider round"></span>
        </label>
      </SettingsNotification>
      <SettingsNotification>
        <div className="notification-name">SMS notification</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={settingData.sms_notification}
            onChange={() => handleCheckboxChange('sms_notification')}
            disabled={notificationData.is_sms_notification_allowed === false}
          />
          <span className="slider round"></span>
        </label>
      </SettingsNotification>
      <SettingsNotification>
        <div className="notification-name">Email notification</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={settingData.email_notification}
            onChange={() => handleCheckboxChange('email_notification')}
            disabled={notificationData.is_email_notification_allowed === false}
          />
          <span className="slider round"></span>
        </label>
      </SettingsNotification>
    </>
  );
};

export default NotificationSettings;
