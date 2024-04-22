import { useState } from 'react';
import styled from 'styled-components';
import Search from '../../../Assets/Search.png';

const StyledSearchBar = styled.input`
  color: #adadad;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.12) 0%, rgba(199, 215, 248, 0.12) 100%),
    #121212;
  display: flex;
  padding: 6px 35px;
  align-items: center;
  outline: none;
  width: 500px;
`;

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="d-none d-lg-block position-relative">
      <StyledSearchBar
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
        autoComplete="new-password"
      />
      <div className="position-absolute" style={{ top: '5px', left: '10px' }}>
        <img src={Search} alt="Search" />
      </div>
    </div>
  );
};

export default SearchBar;
