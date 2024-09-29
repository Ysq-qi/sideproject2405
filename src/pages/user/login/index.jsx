import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setEmail, 
  setPassword, 
  setEmailValid, 
  setPasswordValid, 
  setEmailError, 
  setPasswordError, 
  setError, 
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

  // 組件卸載時重置表單
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  // 驗證信箱格式
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = re.test(email);
    if (isValidFormat) {
      dispatch(setEmailValid(true));
      dispatch(setEmailError(''));
    } else {
      dispatch(setEmailValid(false));
      dispatch(setEmailError('信箱格式錯誤'));
    }
  };

  // 驗證密碼格式
  const validatePassword = (password) => {
    let errorMessage = '';
    const re = /^[A-Z].{7,}$/; // 要求第一個字母必須是大寫且總長度至少8個字符
    const hasUpperCaseFirst = /^[A-Z]/.test(password); // 檢查第一個字母是否是大寫
    const isValidLength = password.length >= 8;

    if (!hasUpperCaseFirst) {
      errorMessage = '首位必須大寫';
    } else if (!isValidLength) {
      errorMessage = '需至少8個字符';
    }

    const isValid = re.test(password);
    dispatch(setPasswordValid(isValid));
    dispatch(setPasswordError(isValid ? '' : errorMessage));
  };

  // 提交登入
  const handleLogin = async (e) => {
    e.preventDefault(); // 阻止默認提交

    // 初步檢查信箱和密碼的格式並設置相應的錯誤消息
    if (!email) {
      dispatch(setError('請輸入信箱'));
    } else if (!password) {
      dispatch(setError('請輸入密碼'));
    } else if (!emailValid && !passwordValid) {
      dispatch(setError('登入失敗，請稍後再試'));
    } else if (!emailValid) {
      dispatch(setError('信箱格式錯誤'));
    } else if (!passwordValid) {
      dispatch(setError('密碼格式錯誤'));
    } else {
      // 使用 Redux Thunk 調用登入邏輯
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(resetForm());
          navigate(from); // 導航到原本的目標頁面
        })
        .catch((errorMessage) => {
          console.error('登入過程出錯: ', errorMessage);
          dispatch(setError(errorMessage));
          // 如果發生錯誤，3秒後重置錯誤信息
          setTimeout(() => {
            dispatch(setError(''));
            dispatch(resetForm());
          }, 3000);
        });
    }
  };

  // 監聽登入成功狀態，並導航到主頁（已在 handleLogin 中處理）
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

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
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
              validateEmail(e.target.value);
            }} 
            required 
          />
          {email && (emailValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {emailError}</ErrorText>)}
          <Label>會員密碼:</Label>
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
              validatePassword(e.target.value);
            }} 
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