import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  setEmail,
  setPassword,
  setConfirmPassword,
  setEmailValid,
  setPasswordValid,
  setConfirmPasswordValid,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError,
  setError,
  setSuccess,
  resetForm
} from './registerSlice';
import {
  RegisterContainer,
  RegisterTitle,
  RegisterBox,
  Label,
  Input,
  Button,
  HelperText,
  Link,
  SuccessText,
  ErrorText
} from './style.js';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    email,
    password,
    confirmPassword,
    emailValid,
    passwordValid,
    confirmPasswordValid,
    emailError,
    passwordError,
    confirmPasswordError,
    error,
    success
  } = useSelector((state) => state.register);

  // 驗證信箱格式
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = re.test(email);
    dispatch(setEmailValid(isValidFormat));
    dispatch(setEmailError(isValidFormat ? '' : '信箱格式錯誤'));
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

  // 驗證確認密碼
  const validateConfirmPassword = (password, confirmPassword, passwordValid) => {
    const isValid = confirmPassword === password && passwordValid;
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(isValid ? '' : '密碼不匹配'));
  };

  // 提交註冊
  const handleRegister = async (e) => {
    e.preventDefault(); // 阻止默認提交
  
    // 驗證輸入格式是否有效
    if (!emailValid) {
      dispatch(setError('信箱格式錯誤'));
    } else if (!passwordValid) {
      dispatch(setError('密碼格式錯誤'));
    } else if (!confirmPasswordValid) {
      dispatch(setError('確認密碼格式錯誤'));
    } else {
      // 使用 Redux Thunk 調用註冊邏輯
      dispatch(register({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(setSuccess('註冊成功'));
          // 註冊成功後導航到主頁面
          setTimeout(() => {
            navigate('/'); // 先進行導航
            dispatch(setSuccess(''));
            dispatch(resetForm());
          }, 500); // 添加適當延遲
        })
        .catch((error) => {
          console.error('註冊過程出錯: ', error);
          dispatch(setError('註冊失敗，請稍後再試'));
          // 如果發生錯誤，3秒後重置錯誤信息
          setTimeout(() => {
            dispatch(setError(''));
            dispatch(resetForm());
          }, 3000);
        });
    }
  };

  // 組件卸載時重置表單
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  return (
    <RegisterContainer>
      <RegisterTitle>會員註冊</RegisterTitle>
      <RegisterBox>
        <form onSubmit={handleRegister} noValidate>
          <Label>會員信箱:</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
              validateEmail(e.target.value);
            }}
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
          />
          {password && (passwordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {passwordError}</ErrorText>)}
          <Label>確認密碼:</Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              dispatch(setConfirmPassword(e.target.value));
              validateConfirmPassword(password, e.target.value, passwordValid);
            }}
          />
          {confirmPassword && (confirmPasswordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {confirmPasswordError}</ErrorText>)}
          <Button type="submit">註冊</Button>
          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}
          <HelperText>
            <Link onClick={() => navigate('/Login')}>已經有帳號？登入</Link>
          </HelperText>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;