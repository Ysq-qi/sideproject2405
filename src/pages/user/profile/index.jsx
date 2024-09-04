import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux'; 
import {
  getProfile,
  setPasswordValid,
  setPasswordError,
  setConfirmPasswordValid,
  setConfirmPasswordError
} from './profileSlice'; 
import { auth } from '../../../config/firebaseConfig'; 
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
  HelperText
} from './style';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, error, passwordValid, confirmPasswordValid, passwordError, confirmPasswordError } = useSelector((state) => state.profile);
  const { isAuthenticated, loading } = useSelector((state) => state.login);


  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    phone: '',
    email: '',
    address: '',
    oldPassword: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // 等待 loading 完成後再檢查 isAuthenticated 狀態
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        dispatch(getProfile());  // 恢復這行，確保在登錄後獲取用戶資料
      }
    }
  }, [loading, isAuthenticated, dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        birthday: profile.birthday || '',
        phone: profile.phone || '',
        email: profile.email || '',
        address: profile.address || '',
      });
    }
  }, [profile]);

  // 保存個人資料
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        console.log('Token:', token); // 檢查 token
        console.log('FormData:', formData); // 檢查表單數據
  
        await axios.put(
          'http://localhost:5001/sideproject2405-b8a66/us-central1/api/users/profile',
          {
            name: formData.name,
            birthday: formData.birthday,
            phone: formData.phone,
            address: formData.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.alert('資料已更新');
      }
    } catch (error) {
      console.error('更新失敗:', error); // 更詳細的錯誤信息
      window.alert('資料更新失敗');
    }
  };
  
  // 重新認證用戶，只需要輸入原密碼
  const verifyOldPassword = async (oldPassword) => {
    const user = auth.currentUser;
    
    // 使用已登入用戶的 email 和輸入的原密碼來創建憑證
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      // 執行重新認證
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      console.error("驗證原密碼失敗:", error);
      return false;
    }
  };

  // 針對 輸入新密碼 進行驗證
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

  // 針對 確認新密碼 進行驗證
  const validateConfirmPassword = (password, confirmPassword) => {
    const isValid = confirmPassword === password && passwordValid;
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(isValid ? '' : '密碼不匹配'));
  };

  // 更新密碼的主函式
  const handlePasswordChange = async () => {
    const { oldPassword, password } = formData;

    try {
      // 先驗證原密碼
      const isOldPasswordValid = await verifyOldPassword(oldPassword);

      if (!isOldPasswordValid) {
        window.alert('原密碼不正確');
        return;
      }

      // 原密碼正確，更新新密碼
      const user = auth.currentUser;
      await updatePassword(user, password);
      
      window.alert('密碼已成功更新');
    } catch (error) {
      console.error("更新密碼失敗:", error);
      window.alert('密碼更新失敗');
    }
  };

  return (
    <ProfileContainer>
      <div>
        <Button onClick={() => navigate('/orders')}>訂單查詢</Button>
        <Button onClick={() => {auth.signOut(); navigate('/');}}>登出</Button>
        <Button onClick={() => navigate('/delete-account')}>刪除帳號</Button>
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
          {formData.password && (passwordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {passwordError}</ErrorText>)}
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
          {formData.confirmPassword && (confirmPasswordValid ? <SuccessText>○</SuccessText> : <ErrorText>✗ {confirmPasswordError}</ErrorText>)}
        </ProfileItem>
        <FormButton onClick={handlePasswordChange}>變更密碼</FormButton>
        <FormButton onClick={() => navigate('/')}>取消</FormButton>
      </PasswordSection>
      {error && <div>錯誤: {error}</div>}
    </ProfileContainer>
  );
};

export default Profile;