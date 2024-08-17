import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../../../../config/firebaseConfig.js';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
  ForgotPasswordBox,
  Label,
  Input,
  Button,
  ErrorText
} from '../../style';
import { 
  setEmail, 
  setEmailValid, 
  setEmailError, 
  setError, 
  resetForm 
} from '../../forgotPasswordSlice';

const EmailInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, emailValid, emailError, error } = useSelector((state) => state.forgotPassword);

  const validateEmail = async (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = re.test(email);
    if (isValidFormat) {
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          dispatch(setEmailValid(true));
          dispatch(setEmailError(''));
        } else {
          dispatch(setEmailValid(false));
          dispatch(setEmailError('該信箱未註冊'));
        }
      } catch (error) {
        dispatch(setEmailError('檢查信箱時出錯'));
        dispatch(setEmailValid(false));
      }
    } else {
      dispatch(setEmailValid(false));
      dispatch(setEmailError('信箱格式錯誤'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValid) {
      try {
        await sendPasswordResetEmail(auth, email);
        navigate('/forgotpassword/verification');
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(resetForm()); // 重置表單
      }
    } else {
      dispatch(setError('請檢查您的輸入'));
      dispatch(resetForm()); // 重置表單
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordTitle>忘記密碼</ForgotPasswordTitle>
      <ForgotPasswordBox>
        <form onSubmit={handleSubmit}>
          <Label>請輸入您的電子郵件</Label>
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
              validateEmail(e.target.value);
            }} 
            required 
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">送出</Button>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
};

export default EmailInput;