import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserAccount } from './deleteAccountSlice';
import {
  DeleteAccountContainer,
  DeleteAccountTitle,
  DeleteAccountBox,
  Label,
  Input,
  Button,
} from './style';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 執行帳號刪除功能
  const handleAccountDelete = (e) => {
    e.preventDefault();

    // 檢查確認文字是否正確
    if (confirmationText !== '刪除帳號') {
      dispatch({ type: 'deleteUser/setError', payload: '請正確輸入 "刪除帳號" 來確認刪除' });
      return;
    }

    // 調用刪除帳號的異步操作函式
    dispatch(deleteUserAccount({ password, confirmationText }))
      .then((result) => {
        if (result.meta && result.meta.requestStatus === 'fulfilled') {
          window.alert('帳號已成功刪除');
          navigate('/');
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.status === 403 
          ? err.response.data.error 
          : '刪除帳號失敗';
        window.alert(errorMessage);
      })
      .finally(() => {
          setPassword('');
          setConfirmationText('');
          dispatch({ type: 'deleteUser/clearError' }); 
        }, 3000);
  };

  // 當組件卸載時，清空所有輸入欄位和錯誤訊息
  useEffect(() => {
    return () => {
      setPassword('');
      setConfirmationText('');
      dispatch({ type: 'deleteUser/clearError' });
    };
  }, [dispatch]);

  return (
    <DeleteAccountContainer>
      <DeleteAccountTitle>刪除帳號</DeleteAccountTitle>
      <DeleteAccountBox>
        <form onSubmit={handleAccountDelete}>
          <Label htmlFor="password">請輸入您的密碼確認刪除</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <Label htmlFor="confirmationText">請輸入 "刪除帳號" 來確認</Label>
          <Input
            id="confirmationText"
            type="text"
            placeholder="刪除帳號"
            value={confirmationText}
            maxLength={20}
            onChange={(e) => setConfirmationText(e.target.value)}
            required
          />
          <Button type="submit" disabled={password === '' || confirmationText !== '刪除帳號'}>
            刪除帳號
          </Button>
        </form>
      </DeleteAccountBox>
    </DeleteAccountContainer>
  );
};

export default DeleteAccount;