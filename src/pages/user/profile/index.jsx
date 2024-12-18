import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import {
  validatePassword,
  validateConfirmPassword
} from '../../../utils/validation';
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
} from './style';
import AddressSelector from './components/AddressSelector';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    profile,
    passwordValid,
    confirmPasswordValid,
    passwordError,
    confirmPasswordError,
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

  // 處理輸入變化
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

  // 驗證原密碼(放在組件內部 涉及firebase auth)
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

  // 處理輸入信密碼驗證 (輸入新密碼)
  const handlePasswordValidation = (e) => {
    const password = e.target.value;
    const errorMessage = validatePassword(password);
    const isValid = errorMessage === "";

    dispatch(setPasswordValid(isValid));
    dispatch(setPasswordError(errorMessage));
    handleChange(e);
  };

  // 處理確認新密碼驗證 (確認新密碼)
  const handleConfirmPasswordValidation = (e) => {
    const confirmPassword = e.target.value;
    const errorMessage = validateConfirmPassword(formData.password, confirmPassword);
    const isValid = errorMessage === "";
    
    dispatch(setConfirmPasswordValid(isValid));
    dispatch(setConfirmPasswordError(errorMessage));
    handleChange(e);
  };

  // 處理變更密碼
  const handlePasswordChange = async () => {
    const { oldPassword, password } = formData;
    let shouldProceed = true;
    let errorMessages = [];
  
    try {
      // 驗證原密碼
      const isOldPasswordValid = await verifyOldPassword(oldPassword);
      if (!isOldPasswordValid) {
        errorMessages.push('原密碼不正確');
        shouldProceed = false;
      }
  
      // 驗證新密碼格式
      if (!passwordValid) {
        errorMessages.push('新密碼格式不正確');
        shouldProceed = false;
      }
  
      // 驗證確認密碼是否一致
      if (!confirmPasswordValid) {
        errorMessages.push('確認密碼與新密碼不一致');
        shouldProceed = false;
      }
  
      // 如果有錯誤訊息，顯示並清除表單欄位
      if (errorMessages.length > 0) {
        window.alert(errorMessages.join('\n'));
        setFormData({ oldPassword: '', password: '', confirmPassword: '' });
        return;
      }
  
      // 如果所有驗證都通過，進行密碼變更
      if (shouldProceed) {
        await dispatch(changePassword(password)).unwrap();
        window.alert('密碼已成功更新，您將被登出並返回首頁');
  
        // 登出用戶並重定向到首頁
        await auth.signOut();
        navigate('/');
      }
    } catch (error) {
      // 檢查是否為 403 錯誤
      if (error.response?.status === 403) {
        window.alert(error.response.data.error || '此帳號無法變更密碼');
      } else {
        window.alert('密碼更新失敗');
      }
    } finally {
    // 如果發生異常（但不包括驗證失敗），這裡仍會清除表單
      setFormData({ oldPassword: '', password: '', confirmPassword: '' });
    }
  };  

  return (
    <ProfileContainer>
      <div>
        <Button onClick={() => navigate('/order')}>訂單查詢</Button>
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
            maxLength={50}
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
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
          />
        </ProfileItem>
        <AddressSelector formData={formData} setFormData={setFormData} />
        <FormButton onClick={handleSave}>確定修改</FormButton>
      </ProfileSection>
      <Line />
      <PasswordSection>
        <ProfileItem>
          <label>輸入原密碼:</label>
          <Input
            type="password"
            name="oldPassword"
            maxLength={20}
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </ProfileItem>
        <ProfileItem>
          <label>輸入新密碼:</label>
          <Input
            type="password"
            name="password"
            maxLength={20}
            value={formData.password}
            onChange={handlePasswordValidation}
          />
          {formData.password &&
            (passwordValid ? (
              <SuccessText>○</SuccessText>
            ) : (
              <ErrorText>✗ {passwordError}</ErrorText>
            ))}
        </ProfileItem>
        <ProfileItem>
          <label>確認新密碼:</label>
          <Input
            type="password"
            name="confirmPassword"
            maxLength={20}
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordValidation}
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
    </ProfileContainer>
  );
};

export default Profile;