import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({
  type, disabled, className, onClick, children,
}) => {
  const clickHandler = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${classes.button} ${className}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: '',
  onClick: null,
  children: null,
};

export default Button;
