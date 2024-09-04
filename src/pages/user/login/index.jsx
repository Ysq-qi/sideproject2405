import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig.js';
import { 
  setEmail, 
  setPassword, 
  setEmailValid, 
  setPasswordValid, 
  setEmailError, 
  setPasswordError, 
  setError, 
  resetForm, 
  loginSuccess,
  loginFailure
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
    dispatch(setPasswordError(errorMessage));
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
      try {
        // 當信箱和密碼格式正確時，嘗試登入
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch(loginSuccess({ uid: userCredential.user.uid, email: userCredential.user.email }));
        dispatch(resetForm());
        navigate('/');
        navigate(from); // 這行來導航到原本的目標頁面
        return; // 成功登入時結束函數執行
      } catch (err) {
        // 根據錯誤代碼設置錯誤消息
        if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found') {
          dispatch(loginFailure('信箱錯誤'));
        } else if (err.code === 'auth/wrong-password') {
          dispatch(loginFailure('密碼輸入錯誤'));
        } else {
          dispatch(loginFailure('登入失敗，請稍後再試'));
        }
      }
    }
  
    // 無論哪種錯誤，3秒後表單重置
    setTimeout(() => {
      dispatch(setError(''));
      dispatch(resetForm());
    }, 3000);
  };

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
          <Button type="submit">登入</Button>
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