import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAccount } from './deleteAccountSlice';
import {
  DeleteAccountContainer,
  DeleteAccountTitle,
  DeleteAccountBox,
  Label,
  Input,
  Button,
  ErrorText
} from './style';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.deleteAccount);

  // 執行帳號刪除功能
  const handleAccountDelete = (e) => {
    e.preventDefault();

    // 檢查確認文字是否正確
    if (confirmationText !== '刪除帳號') {
      return dispatch({ type: 'deleteUser/setError', payload: '請正確輸入 "刪除帳號" 來確認刪除' });
    }

    // 調用刪除帳號的 Redux Action
    dispatch(deleteUserAccount({ password, confirmationText }))
      .then(() => {
        window.alert('帳號已成功刪除');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error while deleting account:', err);
        window.alert('刪除帳號失敗');
      });
  };

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
            onChange={(e) => setConfirmationText(e.target.value)}
            required
          />

          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={password === '' || confirmationText !== '刪除帳號'}>
            刪除帳號
          </Button>
        </form>
      </DeleteAccountBox>
    </DeleteAccountContainer>
  );
};

export default DeleteAccount;