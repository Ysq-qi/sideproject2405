import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import {
  getProfile,
  updateProfile,
  changePassword,
  setPasswordValid,
  setPasswordError,
  setConfirmPasswordValid,
  setConfirmPasswordError,
} from './profileSlice';
import { useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  Button,
  ProfileSection,
  ProfileItem,
  Input,
  PasswordSection,
  Line,
  FormButton,
  ErrorText,
  SuccessText,
  HelperText,
} from './style';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    profile,
    passwordValid,
    confirmPasswordValid,
    passwordError,
    confirmPasswordError,
    error,
  } = useSelector((state) => state.profile);
  const { isAuthenticated, loading } = useSelector((state) => state.login);

  // 表單資料的本地狀態
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    phone: '',
    email: '',
    address: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  // 掛載時取得用戶資料
  useEffect(() => {
    if (!loading && isAuthenticated) {
      dispatch(getProfile());
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, dispatch, navigate]);

  // 當 profile 更新時，將資料填充到 formData 中
  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({ ...prev, ...profile }));
    }
  }, [profile]);

  // 處理輸入變化
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 保存用戶資料
  const handleSave = async () => {
    try {
      await dispatch(
        updateProfile({
          name: formData.name,
          birthday: formData.birthday,
          phone: formData.phone,
          address: formData.address,
        })
      ).unwrap();
      window.alert('資料已更新');
    } catch (error) {
      console.error('資料更新失敗:', error);
      window.alert('資料更新失敗');
    }
  };

  // 驗證原密碼
  const verifyOldPassword = async (oldPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      console.error('驗證原密碼失敗:', error);
      return false;
    }
  };

  // 驗證新密碼格式
  const validatePassword = (password) => {
    let errorMessage = '';
    const re = /^[A-Z].{7,}$/; // 要求第一個字母必須是大寫且總長度至少8個字符
    const hasUpperCaseFirst = /^[A-Z]/.test(password);
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

  // 驗證確認密碼
  const validateConfirmPassword = (password, confirmPassword) => {
    const isValid = confirmPassword === password && passwordValid;
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(isValid ? '' : '密碼不匹配'));
  };

  // 變更密碼
  const handlePasswordChange = async () => {
    const { oldPassword, password } = formData;

    try {
      // 先驗證原密碼
      const isOldPasswordValid = await verifyOldPassword(oldPassword);
      if (!isOldPasswordValid) {
        window.alert('原密碼不正確');
        return;
      }

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

      // 執行密碼變更操作
      await dispatch(changePassword(password)).unwrap();

      // 密碼變更成功後提示並登出
      window.alert('密碼已成功更新，您將被登出並返回首頁');

      // 登出用戶並重定向到首頁
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('更新密碼失敗:', error);
      window.alert('密碼更新失敗');
    }
  };

  return (
    <ProfileContainer>
      <div>
        <Button onClick={() => navigate('/orders')}>訂單查詢</Button>
        <Button
          onClick={() => {
            auth.signOut();
            navigate('/');
          }}
        >
          登出
        </Button>
        <Button onClick={() => navigate('/deleteaccount')}>刪除帳號</Button>
      </div>
      <ProfileSection>
        <ProfileItem>
          <label>帳號:</label>
          <Input type="text" value={formData.email} disabled />
        </ProfileItem>
        <ProfileItem>
          <label>姓名:</label>
          <Input
            type="text"
            name="name"
            placeholder="請輸入姓名"
            value={formData.name}
            onChange={handleChange}
          />
        </ProfileItem>
        <ProfileItem>
          <label>生日:</label>
          <Input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </ProfileItem>
        <ProfileItem>
          <label>手機:</label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </ProfileItem>
        <ProfileItem>
          <label>地址:</label>
          <Input
            type="text"
            name="address"
            placeholder="請輸入地址"
            value={formData.address}
            onChange={handleChange}
          />
        </ProfileItem>
        <FormButton onClick={handleSave}>確定修改</FormButton>
      </ProfileSection>
      <Line />
      <PasswordSection>
        <ProfileItem>
          <label>輸入原密碼:</label>
          <Input
            type="password"
            name="oldPassword"
            onChange={handleChange}
          />
        </ProfileItem>
        <ProfileItem>
          <label>輸入新密碼:</label>
          <Input
            type="password"
            name="password"
            onChange={(e) => {
              handleChange(e);
              validatePassword(e.target.value);
            }}
          />
          {formData.password &&
            (passwordValid ? (
              <SuccessText>○</SuccessText>
            ) : (
              <ErrorText>✗ {passwordError}</ErrorText>
            ))}
        </ProfileItem>
        <HelperText>密碼必須以大寫字母開頭，且至少有8個字符</HelperText>
        <ProfileItem>
          <label>確認新密碼:</label>
          <Input
            type="password"
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e);
              validateConfirmPassword(formData.password, e.target.value);
            }}
          />
          {formData.confirmPassword &&
            (confirmPasswordValid ? (
              <SuccessText>○</SuccessText>
            ) : (
              <ErrorText>✗ {confirmPasswordError}</ErrorText>
            ))}
        </ProfileItem>
        <FormButton onClick={handlePasswordChange}>變更密碼</FormButton>
        <FormButton onClick={() => navigate('/')}>取消</FormButton>
      </PasswordSection>
      {error && <div>錯誤: {error}</div>}
    </ProfileContainer>
  );
};

export default Profile;