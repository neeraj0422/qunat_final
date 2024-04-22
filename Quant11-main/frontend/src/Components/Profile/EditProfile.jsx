import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Desc,
  EditInfoContainer,
  EditProfileContainer,
  Field,
  FieldInput,
  FieldInputWrapper,
  FieldName,
  Heading,
  Notification,
  NotificationContainer,
  Option,
  Select,
  SelectContainer,
  Text,
  TextBox
} from '../../Styles/Components/EditProfileStyle';
import apiRequest from '../../api/api';
import { toast } from 'react-toastify';
import { ErrorText } from '../../Styles/Components/ProfilePassword.Style';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const EditProfile = ({ countriesData, userData, setUserData }) => {
  const [error, setErrors] = useState({
    first_name: '',
    last_name: '',
    country: ''
  });
  const [dateValue, setDateValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDateValue(moment(userData.date_of_birth, 'DD/MM/yyyy').toDate() || '');
    const country = userData.country;
    const newCountryData = countriesData.filter((data) => data.country === country)[0];
    setUserData((prevData) => ({
      ...prevData,
      country_code: newCountryData.code
    }));
  }, []);

  const { control } = useForm();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Reset error on input change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    const newCountryData = countriesData.filter((data) => data.country === value)[0];
    setUserData((prevData) => ({
      ...prevData,
      country: newCountryData.country,
      country_code: newCountryData.code
    }));
    // Reset error on input change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleDateChange = (e) => {
    setDateValue(e);
    // Reset error on input change
    setErrors((prevErrors) => ({
      ...prevErrors,
      date_of_birth: ''
    }));
  };

  const handleSubmit = async () => {
    // Validation checks
    const newErrors = {};
    if (!userData.first_name) {
      newErrors.first_name = 'Please enter your first name';
    }

    if (!userData.last_name) {
      newErrors.last_name = 'Please enter your last name';
    }
    if (!userData.country || userData.country === null) {
      newErrors.country = 'Please select country';
    }

    if (!dateValue || dateValue === 'null') {
      newErrors.date_of_birth = 'Date of Birth is required';
    }

    if (Object.keys(newErrors).length > 0) {
      // Display error and prevent API request
      setErrors(newErrors);
      return;
    }

    //code for sending data to api
    const updatedData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      country: userData.country,
      mobile_number: userData.mobile_number,
      country_code: userData.country_code === null ? 'none' : userData.country_code,
      date_of_birth: moment(dateValue).format('DD/MM/yyyy'),
      receive_newsletter: userData.receive_newsletter,
      receive_call_notification: userData.receive_call_notification
    };
    setLoading(true);
    const { response, responseData, error } = await apiRequest(
      `api/v1/edit-profile`,
      'POST',
      updatedData
    );
    if (!error) {
      if (response.ok) {
        toast.success(responseData.meta.message);
      } else {
        toast.error(`Profile update failed: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('An error occurred while updating profile', error);
    }
    setLoading(false);

    const {
      first_name,
      last_name,
      email,
      mobile_number,
      country,
      country_code,
      date_of_birth,
      receive_newsletter,
      receive_call_notification
    } = responseData.data;
    setUserData({
      first_name,
      last_name,
      email,
      mobile_number,
      country,
      country_code,
      date_of_birth: moment(date_of_birth, 'DD/MM/yyyy').toDate(),
      receive_newsletter,
      receive_call_notification
    });

    setDateValue(moment(date_of_birth, 'DD/MM/yyyy').toDate());
  };

  return (
    <EditProfileContainer>
      <EditInfoContainer>
        <Field>
          <FieldName>First name</FieldName>
          <FieldInputWrapper>
            <FieldInput
              type="text"
              name="first_name"
              placeholder="Your first name"
              value={userData.first_name}
              required
              onChange={handleInputChange}
            />
            {error.first_name && <ErrorText>{error.first_name}</ErrorText>}
          </FieldInputWrapper>
        </Field>
        <Field>
          <FieldName>Last name</FieldName>
          <FieldInputWrapper>
            <FieldInput
              type="text"
              name="last_name"
              placeholder="Your last name"
              value={userData.last_name}
              required
              onChange={handleInputChange}
            />
            {error.last_name && <ErrorText>{error.last_name}</ErrorText>}
          </FieldInputWrapper>
        </Field>
        <Field>
          <FieldName>Resident country</FieldName>
          <FieldInputWrapper>
            <SelectContainer>
              <Select
                name="country"
                value={userData.country || null}
                onChange={handleSelectChange}
                // defaultValue={userData.country || null}
                defaultValue={userData.country || null}>
                <Option value={userData.country !== null ? userData.country : null}>
                  {userData.country ? userData.country : 'Select country'}
                </Option>
                {countriesData.map((data, index) => (
                  <Option key={index} value={data.country}>
                    {data.country}
                  </Option>
                ))}
              </Select>
            </SelectContainer>
            {error.country && <div className="text-danger">{error.country}</div>}
          </FieldInputWrapper>
        </Field>

        <Field>
          <FieldName>Mobile Number</FieldName>
          <FieldInputWrapper className="text-danger">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <div style={{ width: '30% ' }}>
                <SelectContainer>
                  <Select
                    name="country_code"
                    value={userData.country_code || null}
                    onChange={handleSelectChange}
                    defaultValue={userData.country_code || null}
                    style={{ width: '30% ' }}>
                    <Option value={userData.country_code !== null ? userData.country_code : null}>
                      {userData.country_code ? '+ ' + userData.country_code : 'Select country code'}
                    </Option>
                    {countriesData.map((data, index) => (
                      <Option key={index} value={data.country}>
                        {'+ ' + data.code}
                      </Option>
                    ))}
                  </Select>
                </SelectContainer>
              </div>
              <div className="text-danger" style={{ position: 'relative', width: '65%' }}>
                <FieldInput
                  type="number"
                  name="mobile_number"
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                  value={userData.mobile_number || null}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {error.mobile_number && <ErrorText>{error.mobile_number}</ErrorText>}
          </FieldInputWrapper>
        </Field>

        <Field>
          <FieldName>Date of Birth</FieldName>
          <FieldInputWrapper>
            <div
              style={{
                display: 'flex',
                padding: '12px 16px',
                alignItems: 'center',
                gap: '8px',
                flex: '1 0 0',
                background:
                  'linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%), #121212',
                border: 'none',
                color: '#fff',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                width: '100%'
              }}>
              <Controller
                control={control}
                name="date_of_birth"
                style={{ width: '100%' }}
                render={({ field }) => (
                  <DatePicker
                    value={dateValue}
                    format="MM/dd/yyyy"
                    maxDate={new Date()}
                    onChange={(e) => {
                      handleDateChange(e);
                      field.onChange(e);
                    }}
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                  />
                )}
                rules={{
                  required: `Date of Birth field is required`
                }}
              />
            </div>
            {/* {error.date_of_birth && <div className="text-danger">{error.date_of_birth}</div>} */}
            {error.date_of_birth && (
              <ErrorText className="text-danger">{error.date_of_birth}</ErrorText>
            )}
          </FieldInputWrapper>
        </Field>
      </EditInfoContainer>
      <TextBox>
        <Heading>Receive Newsletters</Heading>
        <Desc>
          Allow Quant11 to send you newsletters and other notifications. Your email will not be used
          for any kind of third party advertisements.
        </Desc>
      </TextBox>

      <NotificationContainer>
        <Notification>
          <Checkbox
            type="checkbox"
            name="receive_newsletter"
            checked={userData.receive_newsletter}
            onChange={handleCheckboxChange}
          />
          <Text>Yes, I would like to receive newsletters.</Text>
        </Notification>
        <Notification>
          <Checkbox
            type="checkbox"
            name="receive_call_notification"
            checked={userData.receive_call_notification}
            onChange={handleCheckboxChange}
          />
          <Text>
            I wish to receive call notifications directly from Quant Trade regarding client account
            services, new product information and special offers as well as Newsletters and other
            notifications.
          </Text>
        </Notification>
      </NotificationContainer>
      {loading ? <Button>Save</Button> : <Button onClick={handleSubmit}>Save</Button>}
    </EditProfileContainer>
  );
};

export default EditProfile;
