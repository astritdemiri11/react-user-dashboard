import PropTypes from 'prop-types';
import React, { useImperativeHandle, useRef } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef(({
  id, isValid, label, type, value, onBlur, onChange,
}, ref) => {
  const inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus,
  }));

  const blurHandler = (event) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  const changeHandler = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={`${classes.control} ${isValid === false ? classes.invalid : ''}`}>
      <label htmlFor={id}>
        {label}
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </label>

    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  isValid: null,
  onBlur: null,
  onChange: null,
};

export default Input;
