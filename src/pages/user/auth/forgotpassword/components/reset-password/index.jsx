import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, setPasswordValid, setPasswordError, setConfirmPasswordValid, setConfirmPasswordError } from '../../forgotPasswordSlice';
import {
  validatePassword,
  validateConfirmPassword
} from '../../../../../../utils/validation';
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
  ForgotPasswordBox,
  Label,
  Input,
  Button,
  ErrorText,
  SuccessText,
  HelperText
} from '../../style';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { passwordValid, confirmPasswordValid, passwordError, confirmPasswordError, loading } = useSelector((state) => state.forgotPassword);

  // 本地狀態
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // 組件掛載時 判斷是否有oobCode 或 apiKey
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const oobCode = hashParams.get('oobCode');
    const apiKey = hashParams.get('apiKey');

    // 如果 oobCode 或 apiKey 缺失，重定向到首頁
    if (!oobCode || !apiKey) {
      navigate('/');
    }
  }, [navigate]);

  // 處理輸入變化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 驗證新密碼格式
  const handlePasswordValidation = (password) => {
    const errorMessage = validatePassword(password);
    const isValid = errorMessage === "";
    
    dispatch(setPasswordValid(isValid));
    dispatch(setPasswordError(errorMessage));
  };
  
  // 驗證確認密碼
  const handleConfirmPasswordValidation = (e) => {
    const confirmPassword = e.target.value;
    const errorMessage = validateConfirmPassword(formData.password, confirmPassword);
    const isValid = errorMessage === "";
    
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(errorMessage));
  };

  // 處理變更密碼
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { password } = formData;

    // 驗證新密碼格式
    if (!passwordValid) {
      window.alert('新密碼格式不正確');
      return;
    }

    // 驗證確認密碼是否一致
    if (!confirmPasswordValid) {
      window.alert('確認密碼與新密碼不一致');
      return;
    }

    // 從 URL 中的 hash 部分提取 oobCode
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const oobCode = hashParams.get('oobCode');

    try {
      await dispatch(resetPassword({ oobCode, password })).unwrap();
      window.alert('密碼已重設，請重新登入');
      navigate('/login');
    } catch (err) {
      console.error('重設密碼失敗:', err);
      setError(err.message || '重設密碼失敗');
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordTitle>重設密碼</ForgotPasswordTitle>
      <ForgotPasswordBox>
        <form onSubmit={handlePasswordChange}>
          <Label>輸入新密碼:</Label>
          <Input
            type="password" 
            name="password"
            placeholder="輸入新密碼" 
            maxLength={20}
            value={formData.password} 
            onChange={(e) => {
              handleChange(e);
              handlePasswordValidation(e.target.value);
            }}
            required 
          />
          {formData.password &&
            (passwordValid ? (
              <SuccessText>○</SuccessText>
            ) : (
              <ErrorText>✗ {passwordError}</ErrorText>
            ))}
          <HelperText>密碼必須以大寫字母開頭，且至少有8個字符</HelperText>
          <Label>確認新密碼:</Label>
          <Input 
            type="password" 
            name="confirmPassword"
            placeholder="確認新密碼"
            maxLength={20} 
            value={formData.confirmPassword} 
            onChange={(e) => {
              handleChange(e);
              handleConfirmPasswordValidation(formData.password, e.target.value);
            }}
            required 
          />
          {formData.confirmPassword &&
            (confirmPasswordValid ? (
              <SuccessText>○</SuccessText>
            ) : (
              <ErrorText>✗ {confirmPasswordError}</ErrorText>
            ))}
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={loading}>重設密碼</Button>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
};

export default ResetPassword;