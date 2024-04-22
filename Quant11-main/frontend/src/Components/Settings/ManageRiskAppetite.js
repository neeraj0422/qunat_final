// import { useEffect } from 'react';
import { SettingsManageRiskAppetite } from '../../Styles/Pages/Settings';
import DiscreteSlider from './DiscreteSlider/DiscreteSlider';

const ManageRiskAppetite = ({ settingData, setSettingData }) => {
  const handleSliderChange = (newValue) => {
    const riskAppetite = newValue === 0 ? 1 : newValue === 50 ? 2 : 3;
    setSettingData((prev) => ({ ...prev, risk_appetite: riskAppetite }));
  };

  let newRiskAppetiteData =
    Number(settingData.risk_appetite) === 1
      ? 0
      : Number(settingData.risk_appetite) === 2
        ? 50
        : 100;

  return (
    <>
      <SettingsManageRiskAppetite>
        <div className="title">Select your Risk Appetite</div>
        <div className="tag-line">
          Understand your risk tolerance and investment preference to tailor your trading
          experience.
        </div>
        <div className="mt-4 mt-md-5">
          <DiscreteSlider
            min={0}
            max={100}
            step={null}
            value={newRiskAppetiteData}
            onChange={handleSliderChange}
            defaultValue={newRiskAppetiteData}
          />
        </div>
      </SettingsManageRiskAppetite>
    </>
  );
};

export default ManageRiskAppetite;
