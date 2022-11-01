import {
  useContext, useEffect, useReducer, useRef, useState,
} from 'react';

import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return { ...state, value: action.payload, isValid: action.payload.includes('@') };
    case 'INPUT_BLUR':
      return { ...state, isValid: state.value.includes('@') };
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return { ...state, value: action.payload, isValid: action.payload.trim().length > 6 };
    case 'INPUT_BLUR':
      return { ...state, isValid: state.value.trim().length > 6 };
    default:
      return state;
  }
};

const Login = () => {
  const authCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailRef.current.focus();
    } else if (!passwordIsValid) {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailRef} id="email" isValid={emailState.isValid} label="E-Mail" type="email" value={emailState.value} onBlur={validateEmailHandler} onChange={emailChangeHandler} />
        <Input ref={passwordRef} id="password" isValid={passwordState.isValid} label="Password" type="password" value={passwordState.value} onBlur={validatePasswordHandler} onChange={passwordChangeHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={false}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
