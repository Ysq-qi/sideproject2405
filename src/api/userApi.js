import axiosInstance from './axiosInstance';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ERROR_MESSAGES } from '../config/constants';


// 註冊用戶並創建用戶文檔
export const registerUser = async (email, password) => {
  try {
    // 使用firebase auth 創建用戶
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 調用後端 API 創建用戶文檔
    const response = await axiosInstance.post('/users/createUser', {
      uid: user.uid,
      email: user.email,
    });

    return { user, details: response.data };
  } catch (error) {
    throw error;
  }
};

// 登入用戶
export const loginUser = async (email, password) => {
  try {
    // 使用模組化 API 進行登入
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return { uid: user.uid, email: user.email };
  } catch (error) {
    throw error;
  }
};

// 獲取用戶個人資料
export const getUserProfile = async (token) => {
  try {
    const response = await axiosInstance.get('/users/getProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.profile;
  } catch (error) {
    throw error;
  }
};

// 更新用戶個人資料
export const updateUserProfile = async (profileData, token) => {
  try {
    const response = await axiosInstance.put('/users/updateProfile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 變更用戶密碼
export const changeUserPassword = async (newPassword, token) => {
  try {
    const response = await axiosInstance.put('/users/changePassword', { newPassword }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 刪除用戶帳號
export const deleteUserAccountApi = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error(ERROR_MESSAGES.NOT_LOGGED_IN);

  try {
    const token = await user.getIdToken();
    const response = await axiosInstance.post('/users/deleteUserAccount', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 成功後登出
    await auth.signOut();
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || ERROR_MESSAGES.DELETE_ACCOUNT_ERROR);
  }
};