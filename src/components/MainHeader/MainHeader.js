import PropTypes from 'prop-types';

import classes from './MainHeader.module.css';
import Navigation from './Navigation';

const MainHeader = ({ isAuthenticated, onLogout }) => {
  const logoutHandler = (event) => {
    if (onLogout) {
      onLogout(event);
    }
  };

  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={isAuthenticated} onLogout={logoutHandler} />
    </header>
  );
};

MainHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func,
};

MainHeader.defaultProps = {
  onLogout: null,
};

export default MainHeader;
