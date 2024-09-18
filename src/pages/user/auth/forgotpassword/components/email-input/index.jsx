import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail, setEmail, setEmailValid, setEmailError, setError, resetForm } from '../../forgotPasswordSlice';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../../../../../config/firebaseConfig';
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
  ForgotPasswordBox,
  Label,
  Input,
  Button,
  ErrorText
} from '../../style';

const EmailInput = () => {
  const dispatch = useDispatch();
  const { email, emailError, error, loading } = useSelector((state) => state.forgotPassword); // 不再需要 emailValid

  // 檢查信箱是否已註冊
  const checkEmailRegistered = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email); // 調用 Firebase 方法來檢查信箱
      if (signInMethods.length > 0) {
        dispatch(setEmailValid(true));
        dispatch(setEmailError(''));
        return true;
      } else {
        dispatch(setEmailValid(false));
        dispatch(setEmailError('輸入信箱錯誤'));
        return false;
      }
    } catch (error) {
      dispatch(setEmailError('檢查信箱時出錯'));
      dispatch(setEmailValid(false));
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 檢查信箱是否已註冊
      const isEmailRegistered = await checkEmailRegistered(email);
  
      if (isEmailRegistered) {
        // 發送重置密碼郵件
        await dispatch(sendResetEmail(email)).unwrap();
        window.alert('認證信已寄出，請檢查您的信箱');
      } else {
        // 信箱未註冊時的處理
        window.alert('輸入的信箱未註冊，請檢查信箱地址');
        dispatch(resetForm());
      }
    } catch (err) {
      // 錯誤信息
      console.error('發生錯誤:', err);
      window.alert('發生錯誤，請稍後再試: ' + (err.message || err));
      dispatch(setError(err.message || '發送郵件失敗'));
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
            onChange={(e) => dispatch(setEmail(e.target.value))} 
            required 
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={loading}>寄送認證信</Button>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
};

export default EmailInput;