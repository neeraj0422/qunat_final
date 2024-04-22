import { StyledSidebar } from '../../Styles/Components/Sidebar';
import MenuItems from './MenuItems';
import Logout from '../../Assets/sidebar/Logout.png';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../api/api';
import React, { useEffect, useState } from 'react';

const Sidebar = ({ toggleSidebar }) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await apiRequest('api/v1/logout', 'GET');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isVerified');
    navigate('/sign-in');
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { responseData, error } = await apiRequest('api/v1/user-details', 'GET');
        if (error) {
          console.error('Error fetching stock data:', error);
        } else {
          setUserData(responseData.data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div id="sideMenuBar">
      <StyledSidebar>
        <div className="sidebar-navigation">
          <div className="menu-tagLine">On this page</div>
          <div className="menu-items">
            <MenuItems toggleSidebar={toggleSidebar} />
          </div>
        </div>
        <div className="sidebar-userProfile">
          <Link to="/profile">
            <div className="user-detail">
              <div className="user-avatar">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData.first_name}+${userData.last_name}&background=CEB1FA&rounded=true&size=48`}
                  alt="avatar"
                />
              </div>
              <div className="user-desc">
                <div className="user-name">
                  {userData.first_name} {userData.last_name}
                </div>
                <div className="user-email">{userData.email}</div>
              </div>
            </div>
          </Link>
          <div className="user-logout" onClick={logoutUser}>
            <img src={Logout} alt="logout" />
          </div>
        </div>
      </StyledSidebar>
    </div>
  );
};

export default Sidebar;
