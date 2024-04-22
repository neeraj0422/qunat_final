import React, { useState } from 'react';

const marks = [
  { value: 0, label: 'Low risk' },
  { value: 50, label: 'Medium risk' },
  { value: 100, label: 'High risk' }
];

const DiscreteSlider = ({ defaultValue, onChange }) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    const closestMark = marks.reduce((prev, curr) =>
      Math.abs(curr.value - newValue) < Math.abs(prev.value - newValue) ? curr : prev
    );

    setSliderValue(closestMark.value);
    onChange(closestMark.value);
  };

  return (
    <div className="risk-slider">
      <div
        className="d-flex align-items-center justify-content-between pb-4"
        style={{ fontFamily: 'PlusJakartaSansRegular' }}>
        <div>Low Risk</div>
        <div>Medium Risk</div>
        <div>High Risk</div>
      </div>
      {/*<span style={{ display: 'block', textAlign: 'center', margin: '10px 0' }}>*/}
      {/*  {valuetext(sliderValue)}*/}
      {/*</span>*/}
      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={marks[0].value}
          max={marks[marks.length - 1].value}
          step={1}
          value={sliderValue}
          onChange={handleSliderChange}
          style={{
            width: '100%',
            borderRadius: '100px',
            background:
              'linear-gradient(90deg, #1F87FE 12.68%, #43A047 34.23%, #FF7200 75.37%, #C21C1D 99.64%)',
            border: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default DiscreteSlider;
