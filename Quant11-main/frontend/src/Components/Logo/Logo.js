import { Link } from 'react-router-dom';
// import logo from '../../Assets/Logo.png';
import logo from '../../Assets/logoQuant11.png';

const Logo = () => {
  return (
    <Link to="/" aria-label="home" style={{ height: '100%' }}>
      <img loading="lazy" src={logo} alt="Quant 11" style={{ height: '100%' }} />
    </Link>
  );
};

export default Logo;
