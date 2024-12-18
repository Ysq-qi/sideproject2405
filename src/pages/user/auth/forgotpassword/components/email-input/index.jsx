import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail, setEmail, setEmailValid, setEmailError, setError, resetForm } from '../../forgotPasswordSlice';
import {
  validateEmail
} from '../../../../../../utils/validation';
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
  const { email, emailError, emailValid, error, loading } = useSelector((state) => state.forgotPassword);

  // 處理文字輸入時的狀態變化
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    dispatch(setEmail(inputEmail));
  
    // 驗證信箱格式
    const isValid = validateEmail(inputEmail);
    dispatch(setEmailValid(isValid));
  
    // 如果信箱格式正確或輸入框被清空，則清除錯誤訊息
    if (isValid || inputEmail === '') {
      dispatch(setEmailError(''));
      dispatch(setError(''));
    } else {
      dispatch(setEmailError('信箱格式不正確'));
    }
  };  

  // 重設密碼的信箱提交確認
  const handleSendResetEmail = async (e) => {
    e.preventDefault();

    // 驗證信箱格式
    if (!emailValid) {
      window.alert('請輸入有效的電子郵件地址');
      return;
    }

    try {
      // 發送重置密碼郵件
      await dispatch(sendResetEmail(email)).unwrap();
      window.alert('密碼重置認證信已發送');
    } catch (err) {
      window.alert('發生錯誤，請稍後再試');
      dispatch(setError(err.message || '發送郵件失敗'));
    } finally {
      // 無論成功或失敗後清除輸入框
      dispatch(resetForm());
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordTitle>忘記密碼</ForgotPasswordTitle>
      <ForgotPasswordBox>
        <form onSubmit={handleSendResetEmail}>
          <Label>請輸入您的電子郵件</Label>
          <Input 
            type="email" 
            placeholder="Email" 
            value={email}
            maxLength={50}
            onChange={handleEmailChange} 
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