import { SettingsManageTradeExperience } from '../../Styles/Pages/Settings';

const ManageTradeExperience = ({ settingData, setSettingData }) => {
  const handleTradeExperienceChange = (e) => {
    setSettingData((prev) => ({ ...prev, trade_experience: e.target.value }));
  };

  return (
    <>
      <SettingsManageTradeExperience>
        <div className="tag-line">How much experience do you have with investing?</div>
        <div className="d-flex flex-column gap-2">
          <div className="select-experience">
            <div className="button experience-box">
              <input
                type="radio"
                id="lessThanOne"
                name="select-experience"
                value={1}
                checked={Number(settingData.trade_experience) === 1}
                onChange={handleTradeExperienceChange}
              />
              <label className="btn btn-default risk-low" htmlFor="lessThanOne">
                Less than 1 year
              </label>
            </div>
            <div className="button experience-box">
              <input
                type="radio"
                id="oneToThree"
                name="select-experience"
                value={2}
                checked={Number(settingData.trade_experience) === 2}
                onChange={handleTradeExperienceChange}
              />
              <label className="btn btn-default risk-low" htmlFor="oneToThree">
                1-3 year
              </label>
            </div>
            <div className="button experience-box">
              <input
                type="radio"
                id="threeToFive"
                name="select-experience"
                value={3}
                checked={Number(settingData.trade_experience) === 3}
                onChange={handleTradeExperienceChange}
              />
              <label className="btn btn-default risk-low" htmlFor="threeToFive">
                3-5 year
              </label>
            </div>
          </div>
          <div className="select-experience">
            <div className="button experience-box">
              <input
                type="radio"
                id="fiveToTen"
                name="select-experience"
                value={4}
                checked={Number(settingData.trade_experience) === 4}
                onChange={handleTradeExperienceChange}
              />
              <label className="btn btn-default risk-low" htmlFor="fiveToTen">
                5-10 year
              </label>
            </div>
            <div className="button experience-box">
              <input
                type="radio"
                id="tenToTwenty"
                name="select-experience"
                value={5}
                checked={Number(settingData.trade_experience) === 5}
                onChange={handleTradeExperienceChange}
              />
              <label className="btn btn-default risk-low" htmlFor="tenToTwenty">
                10-20 year
              </label>
            </div>
            <div className="button experience-box">
              <input
                type="radio"
                id="moreThenTwenty"
                name="select-experience"
                value={6}
                checked={Number(settingData.trade_experience) === 6}
                onChange={handleTradeExperienceChange}
              />
              <label className="btn btn-default risk-low" htmlFor="moreThenTwenty">
                More than 20 year
              </label>
            </div>
          </div>
        </div>
      </SettingsManageTradeExperience>
    </>
  );
};

export default ManageTradeExperience;
