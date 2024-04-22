import { StyledSidebarMenu } from '../../Styles/Components/Sidebar';
import Dashboard from '../../Assets/sidebar/Dashboard.png';
import Notification from '../../Assets/sidebar/Notofication.png';
import Billing from '../../Assets/sidebar/Billing.png';
import Settings from '../../Assets/sidebar/Settings.png';
import Support from '../../Assets/sidebar/Support.png';
import { Link } from 'react-router-dom';

const MenuItems = ({ toggleSidebar }) => {
  return (
    <>
      <Link to="/" onClick={toggleSidebar}>
        <StyledSidebarMenu>
          <span>
            <img src={Dashboard} alt="icon" />
          </span>
          Dashboard
        </StyledSidebarMenu>
      </Link>
      <Link to="/notification" onClick={toggleSidebar}>
        <StyledSidebarMenu>
          <span>
            <img src={Notification} alt="icon" />
          </span>
          Notifications
        </StyledSidebarMenu>
      </Link>
      <Link to="/billing" onClick={toggleSidebar}>
        <StyledSidebarMenu>
          <span>
            <img src={Billing} alt="icon" />
          </span>
          Billing
        </StyledSidebarMenu>
      </Link>
      <Link to="/settings" onClick={toggleSidebar}>
        <StyledSidebarMenu>
          <span>
            <img src={Settings} alt="icon" />
          </span>
          Settings
        </StyledSidebarMenu>
      </Link>
      <Link to="/support" onClick={toggleSidebar}>
        <StyledSidebarMenu>
          <span>
            <img src={Support} alt="icon" />
          </span>
          Support
        </StyledSidebarMenu>
      </Link>
    </>
  );
};

export default MenuItems;
