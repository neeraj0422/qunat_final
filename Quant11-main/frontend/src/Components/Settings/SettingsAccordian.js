import React, { useState } from 'react';
import {
  SettingsAccordionArrow,
  SettingsAccordionContent,
  SettingsAccordionHeader,
  SettingsAccordionTitle,
  SettingsAccordionWrapper
} from '../../Styles/Pages/Settings';
import DownArrow from '../../Assets/Settings/DownArrow.png';
import UpArrow from '../../Assets/Settings/UpArrow.png';

const SettingsAccordian = ({ accordionTitleIcon, accordionTitle, accordionContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SettingsAccordionWrapper>
        <SettingsAccordionHeader onClick={toggleAccordion}>
          <SettingsAccordionTitle>
            <div className="round">
              <div>
                <img src={accordionTitleIcon} alt="icon" />
              </div>
            </div>
            {accordionTitle}
          </SettingsAccordionTitle>
          <SettingsAccordionArrow>
            <img src={isOpen ? UpArrow : DownArrow} alt={isOpen ? 'downArrow' : 'upArrow'} />
          </SettingsAccordionArrow>
        </SettingsAccordionHeader>

        {isOpen && <SettingsAccordionContent>{accordionContent}</SettingsAccordionContent>}
      </SettingsAccordionWrapper>
    </>
  );
};

export default SettingsAccordian;
