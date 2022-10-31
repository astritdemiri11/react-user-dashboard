import PropTypes from 'prop-types';

import classes from './Navigation.module.css';

const Navigation = ({ isLoggedIn, onLogout }) => {
  const clickHandler = (event) => {
    if (onLogout) {
      onLogout(event);
    }
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <a href="/">Users</a>
            </li>
            <li>
              <a href="/">Admin</a>
            </li>
            <li>
              <button type="button" onClick={clickHandler}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func,
};

Navigation.defaultProps = {
  onLogout: null,
};

export default Navigation;
