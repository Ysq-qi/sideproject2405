import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, setPasswordValid, setPasswordError, setConfirmPasswordValid, setConfirmPasswordError } from '../../forgotPasswordSlice';
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
  ForgotPasswordBox,
  Label,
  Input,
  Button,
  ErrorText
} from '../../style';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { passwordValid, confirmPasswordValid, passwordError, confirmPasswordError, loading } = useSelector((state) => state.forgotPassword);

  // 針對 "輸入新密碼" 進行格式驗證
  const validatePassword = (password) => {
    let errorMessage = '';
    const re = /^[A-Z].{7,}$/; // 要求第一個字母必須是大寫且總長度至少8個字符
    const hasUpperCaseFirst = /^[A-Z]/.test(password); // 檢查第一個字母是否是大寫
    const isValidLength = password.length >= 8;

    if (!hasUpperCaseFirst) {
      errorMessage = '首位必須大寫';
    } else if (!isValidLength) {
      errorMessage = '至少8個字符';
    }

    const isValid = re.test(password);
    dispatch(setPasswordValid(isValid));
    dispatch(setPasswordError(isValid ? '' : errorMessage));
  };

  // 針對 "確認新密碼" 進行格式驗證
  const validateConfirmPassword = (password, confirmPassword) => {
    const isValid = confirmPassword === password && passwordValid;
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(isValid ? '' : '密碼不匹配'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 驗證新密碼格式
    if (!passwordValid) {
      setError('新密碼格式不正確');
      return;
    }

    // 驗證確認密碼是否一致
    if (!confirmPasswordValid) {
      setError('確認密碼與新密碼不一致');
      return;
    }

    const oobCode = new URLSearchParams(window.location.search).get('oobCode'); // 從 URL 中獲取 OOB Code
    if (!oobCode) {
      setError('驗證碼無效');
      return;
    }

    // 調用重設密碼的異步操作
    dispatch(resetPassword({ oobCode, password }))
      .unwrap()
      .then(() => {
        window.alert('密碼已重設，請重新登入');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordTitle>重設密碼</ForgotPasswordTitle>
      <ForgotPasswordBox>
        <form onSubmit={handleSubmit}>
          <Label>請輸入您的新密碼</Label>
          <Input
            type="password" 
            placeholder="New Password" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required 
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
          <Label>請確認您的新密碼</Label>
          <Input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(password, e.target.value);
            }}
            required 
          />
          {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={loading}>重設密碼</Button>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
};

export default ResetPassword;