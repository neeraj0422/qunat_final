import Logo from '../../Logo/Logo';
import hamBurger from '../../../Assets/hamburger.png';
import { StyledHeader } from '../../../Styles/Components/Header';
// import SearchBar from '../SearchBar/SearchBar';
// import JD from '../../../Assets/JD.png';
// import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  return (
    <>
      <StyledHeader>
        <div className="d-block d-lg-none" onClick={toggleSidebar}>
          <img src={hamBurger} alt="hb" />
        </div>
        <Logo />
        {/* <SearchBar /> */}
        {/*<Link to="/profile">*/}
        {/*  <div>*/}
        {/*    <img src={JD} alt="jd" />*/}
        {/*  </div>*/}
        {/*</Link>*/}
      </StyledHeader>
    </>
  );
};

export default Header;
