import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  validateEmail,
  validatePassword
} from '../../../utils/validation';
import { 
  setEmail, 
  setPassword, 
  setEmailValid, 
  setPasswordValid, 
  setEmailError, 
  setPasswordError, 
  setLoginError, 
  resetForm, 
  login
} from './loginSlice';
import { 
  LoginContainer,
  LoginTitle,
  LoginBox,
  Label,
  Input,
  Button,
  HelperText,
  Link,
  SuccessText,
  ErrorText
} from './style.js';

const Login = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const {
    email,
    password,
    emailValid,
    passwordValid,
    emailError,
    passwordError,
    error,
    success,
    loading,
    isAuthenticated
  } = useSelector((state) => state.login);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailValid || !passwordValid) {
      dispatch(setLoginError('請檢查所有欄位是否正確'));
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      dispatch(resetForm());
      navigate(from);
    } catch (errorMessage) {
      dispatch(setLoginError('登入失敗，請稍後再試'));
      setTimeout(() => {
        dispatch(setLoginError(''));
        dispatch(resetForm());
      }, 3000);
    }
  };

  // 監聽登入成功狀態，並導航到主頁（已在 handleLogin 中處理）
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

    // 組件卸載時重置表單
    useEffect(() => {
      return () => {
        dispatch(resetForm());
      };
    }, [dispatch]);

  return (
    <LoginContainer>
      <LoginTitle>會員登入</LoginTitle> 
      <LoginBox>
        <form onSubmit={handleLogin} noValidate>
          <Label>會員信箱:</Label>
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            maxLength={50}
            onChange={handleEmailChange} 
            required 
          />
          {email && (emailValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {emailError}</ErrorText>)}
          <Label>會員密碼:</Label>
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            maxLength={20}
            onChange={handlePasswordChange} 
            required 
          />
          {password && (passwordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {passwordError}</ErrorText>)}
          <Button type="submit" disabled={loading}>登入</Button>
          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}
          <HelperText>
            <Link onClick={() => navigate('/forgotpassword/email')}>忘記密碼?</Link> / <Link onClick={() => navigate('/Register')}>註冊會員</Link>
          </HelperText>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;