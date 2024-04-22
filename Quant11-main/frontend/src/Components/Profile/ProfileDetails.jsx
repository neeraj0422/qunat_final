import React from 'react';
import {
  ProfileBox,
  TableColumn1,
  TableColumn2,
  TableContainer,
  TableRow
} from '../../Styles/Components/ProfileDetailsStyle';

const ProfileDetails = ({ userData }) => {
  const { first_name, last_name, email, mobile_number, country, country_code } = userData;
  return (
    <ProfileBox>
      <TableContainer>
        <TableRow>
          <TableColumn1>Full Name</TableColumn1>
          <TableColumn2>{first_name + ' ' + last_name}</TableColumn2>
        </TableRow>
        <TableRow>
          <TableColumn1>Email</TableColumn1>
          <TableColumn2>{email}</TableColumn2>
        </TableRow>
        <TableRow>
          <TableColumn1>Phone Number</TableColumn1>
          <TableColumn2>
            {country_code && mobile_number
              ? '+' + country_code.toString() + mobile_number
              : 'Not provided'}
          </TableColumn2>
        </TableRow>
        <TableRow>
          <TableColumn1>Country</TableColumn1>
          <TableColumn2>{country}</TableColumn2>
        </TableRow>
      </TableContainer>
    </ProfileBox>
  );
};

export default ProfileDetails;
