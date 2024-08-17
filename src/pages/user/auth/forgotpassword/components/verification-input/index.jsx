import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ForgotPasswordContainer,
  ForgotPasswordTitle,
  ForgotPasswordBox,
  Label,
  Input,
  Button,
  ErrorText
} from '../../style';

const VerificationCodeInput = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在這裡檢查驗證碼是否正確
    if (code === '123456') { // 這是一個示例，實際應該從後端獲取和驗證
      navigate('/forgotpassword/reset');
    } else {
      setError('驗證碼錯誤');
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordTitle>驗證碼輸入</ForgotPasswordTitle>
      <ForgotPasswordBox>
        <form onSubmit={handleSubmit}>
          <Label>請輸入您收到的驗證碼</Label>
          <Input 
            type="text" 
            placeholder="Verification Code" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            required 
          />
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">驗證</Button>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
};

export default VerificationCodeInput;