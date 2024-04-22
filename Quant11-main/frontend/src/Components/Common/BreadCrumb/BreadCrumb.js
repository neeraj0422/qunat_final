import { Link, useLocation } from 'react-router-dom';
import { StyledBreadCrumb } from '../../../Styles/Components/Common';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadCrumb>
      <Link to="/" className="breadcrumb-link">
        Home <span className="mx-2">/</span>
      </Link>
      {pathnames.map((name, index) => {
        // const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={index} className="breadcrumb-text">
            {/*<Link to={routeTo} className="breadcrumb-link">*/}
            {/*{capitalizeFirstLetter(name)}*/}
            {/*</Link>*/}
          </span>
        ) : (
          <span key={index}>
            {/*<Link to={routeTo} className="breadcrumb-link">*/}
            {convertToTitleCase(name)}
            {/*</Link>{' '}*/}
          </span>
        );
      })}
    </StyledBreadCrumb>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertToTitleCase = (inputString) => {
  let words = inputString.split('-');
  words = words.map(capitalizeFirstLetter);
  let resultString = words.join(' ');
  return resultString;
};

export default BreadCrumb;
