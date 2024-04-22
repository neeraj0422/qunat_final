import React, { useEffect, useState } from 'react';
import { MainContainer } from '../../Styles/Components/GlobalDashboard';
import {
  Email,
  InfoBox,
  Name,
  TabBox,
  TabContainer,
  TabName,
  UserName,
  UserProfile,
  UsernameContainer,
  Container,
  ContentContainer
} from '../../Styles/Pages/Profile';
import ProfileDetails from '../../Components/Profile/ProfileDetails';
import EditProfile from '../../Components/Profile/EditProfile';
import ProfilePassword from '../../Components/Profile/ProfilePassword';
import apiRequest from '../../api/api';
import { toast } from 'react-toastify';
import countriesData from '../../Json/countryPhoneCodes.json';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: null,
    date_of_birth: '',
    country: '',
    country_code: null,
    receive_newsletter: true,
    receive_call_notification: true
  });

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  //fetch user data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { response, responseData, error } = await apiRequest(`api/v1/user-details`, 'GET');

    if (!error) {
      if (!response.ok) {
        toast.error(
          `Unable to fetch user details: ${responseData?.meta?.message || 'Unknown error'}`
        );
      }
    } else {
      toast.error('An error occurred while fetching user data', error);
    }
    const {
      first_name,
      last_name,
      email,
      receive_newsletter,
      receive_call_notification,
      full_name,
      mobile_number,
      country,
      country_code,
      date_of_birth
    } = responseData.data;

    setUserData({
      first_name,
      last_name,
      email,
      receive_newsletter,
      receive_call_notification,
      full_name,
      mobile_number,
      country,
      country_code,
      date_of_birth
    });
  };

  return (
    <MainContainer>
      <Container>
        <UsernameContainer>
          <UserProfile>
            <UserName>
              <img
                src={`https://ui-avatars.com/api/?name=${userData?.first_name}+${userData?.last_name}&background=CEB1FA&rounded=true`}
                alt="avatar"
              />
            </UserName>
          </UserProfile>
          <InfoBox>
            <Name>
              {userData?.first_name} {userData?.last_name}
            </Name>
            <Email>{userData.email}</Email>
          </InfoBox>
        </UsernameContainer>

        <TabContainer>
          <TabBox onClick={() => handleTabClick(1)} active={activeTab === 1}>
            <TabName>Profile Detail</TabName>
          </TabBox>
          <TabBox onClick={() => handleTabClick(2)} active={activeTab === 2}>
            <TabName>Edit Profile</TabName>
          </TabBox>
          <TabBox onClick={() => handleTabClick(3)} active={activeTab === 3}>
            <TabName>Password</TabName>
          </TabBox>
        </TabContainer>

        <ContentContainer>
          {activeTab === 1 ? (
            <ProfileDetails userData={userData} />
          ) : activeTab === 2 ? (
            <EditProfile
              countriesData={countriesData}
              userData={userData}
              setUserData={setUserData}
            />
          ) : (
            <ProfilePassword />
          )}
        </ContentContainer>
      </Container>
    </MainContainer>
  );
};

export default Settings;
