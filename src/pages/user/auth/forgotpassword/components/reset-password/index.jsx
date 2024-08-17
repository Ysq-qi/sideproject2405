import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../../../config/firebaseConfig.js';
import { confirmPasswordReset } from 'firebase/auth';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('密碼不一致');
      return;
    }
    try {
      const oobCode = "YOUR_OOB_CODE"; // 這個應該從電子郵件中獲取
      await confirmPasswordReset(auth, oobCode, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
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
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Label>請確認您的新密碼</Label>
          <Input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">重設密碼</Button>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
};

export default ResetPassword;