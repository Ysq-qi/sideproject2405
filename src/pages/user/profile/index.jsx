import React from 'react';
import {
  ProfileContainer,
  Button,
  ProfileSection,
  ProfileItem,
  Input,
  ChangeButton,
  PasswordSection,
  Line,
  FormButton
} from './style';

const Profile = () => {
  return (
    <ProfileContainer>
      <div>
        <Button>訂單查詢</Button>
        <Button>登出</Button>
      </div>
      <ProfileSection>
        <ProfileItem>
          <label>帳號:</label>
          <Input type="text" value="@yahoo.com.tw" disabled />
        </ProfileItem>
        <ProfileItem>
          <label>姓名:</label>
          <Input type="text" placeholder="請輸入姓名" />
        </ProfileItem>
        <ProfileItem>
          <label>生日:</label>
          <Input type="date" value="1997-09-05" />
        </ProfileItem>
        <ProfileItem>
          <label>手機:</label>
          <Input type="text" value="09*****546" />
          <ChangeButton>變更</ChangeButton>
        </ProfileItem>
        <ProfileItem>
          <label>信箱:</label>
          <Input type="email" placeholder="請輸入電子郵件" />
        </ProfileItem>
        <ProfileItem>
          <label>地址:</label>
          <select>
            <option>選擇縣市</option>
          </select>
          <select>
            <option>選擇區域</option>
          </select>
          <Input type="text" placeholder="請輸入地址" />
        </ProfileItem>
        <FormButton>確定修改</FormButton>
      </ProfileSection>
      <Line />
      <PasswordSection>
        <ProfileItem>
          <label>輸入原密碼:</label>
          <Input type="password" />
        </ProfileItem>
        <ProfileItem>
          <label>輸入新密碼:</label>
          <Input type="password" />
        </ProfileItem>
        <ProfileItem>
          <label>確認新密碼:</label>
          <Input type="password" />
        </ProfileItem>
        <FormButton>變更密碼</FormButton>
        <FormButton>取消</FormButton>
      </PasswordSection>
    </ProfileContainer>
  );
};

export default Profile;
