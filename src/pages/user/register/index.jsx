import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../../utils/validation';
import {
  register,
  setEmail,
  setPassword,
  setConfirmPassword,
  setEmailValid,
  setPasswordValid,
  setConfirmPasswordValid,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError,
  setRegisterError,
  setRegisterSuccess,
  resetForm
} from './registerSlice';
import {
  RegisterContainer,
  RegisterTitle,
  RegisterBox,
  Label,
  Input,
  Button,
  HelperText,
  Link,
  SuccessText,
  ErrorText
} from './style.js';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    email,
    password,
    confirmPassword,
    emailValid,
    passwordValid,
    confirmPasswordValid,
    emailError,
    passwordError,
    confirmPasswordError,
    registerError,
    registerSuccess
  } = useSelector((state) => state.register);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    dispatch(setEmail(inputEmail));
    const isValid = validateEmail(inputEmail);
    dispatch(setEmailValid(isValid));
    dispatch(setEmailError(isValid ? '' : '信箱格式錯誤'));
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    dispatch(setPassword(inputPassword));
    const isValid = validatePassword(inputPassword);
    dispatch(setPasswordValid(isValid));
    dispatch(setPasswordError(isValid ? '' : '密碼格式錯誤'));
  };

  const handleConfirmPasswordChange = (e) => {
    const inputConfirmPassword = e.target.value;
    dispatch(setConfirmPassword(inputConfirmPassword));
    const isValid = validateConfirmPassword(password, inputConfirmPassword);
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(isValid ? '' : '密碼不匹配'));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!emailValid || !passwordValid || !confirmPasswordValid) {
      dispatch(setRegisterError('請檢查所有欄位是否正確'));
      return;
    }

    try {
      await dispatch(register({ email, password })).unwrap();
      dispatch(setRegisterSuccess('註冊成功'));
      setTimeout(() => {
        navigate('/');
        dispatch(resetForm());
      }, 500);
    } catch (error) {
      dispatch(setRegisterError('註冊失敗，請稍後再試'));
      setTimeout(() => dispatch(setRegisterError('')), 3000);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  return (
    <RegisterContainer>
      <RegisterTitle>會員註冊</RegisterTitle>
      <RegisterBox>
        <form onSubmit={handleRegister} noValidate>
          <Label>會員信箱:</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            maxLength={50}
            onChange={handleEmailChange}
          />
          {email && (emailValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {emailError}</ErrorText>)}

          <Label>會員密碼:</Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            maxLength={20}
            onChange={handlePasswordChange}
          />
          {password && (passwordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {passwordError}</ErrorText>)}

          <Label>確認密碼:</Label>
          <Input
            type="password"
            placeholder="Password"
            value={confirmPassword}
            maxLength={20}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPassword && (confirmPasswordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {confirmPasswordError}</ErrorText>)}

          <Button type="submit">註冊</Button>
          {registerError && <ErrorText>{registerError}</ErrorText>}
          {registerSuccess && <SuccessText>{registerSuccess}</SuccessText>}

          <HelperText>
            <Link onClick={() => navigate('/Login')}>已經有帳號？登入</Link>
          </HelperText>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;