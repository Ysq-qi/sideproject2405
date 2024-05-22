import React from 'react';
import { 
  RegisterContainer,
  RegisterTitle,
  RegisterBox,
  Label,
  Input, 
  Button,
  HelperText,
  Link
} from './style.js';

const Register = () => {
  return (
    <RegisterContainer>
      <RegisterTitle>會員註冊</RegisterTitle> 
      <RegisterBox>
        <form>
          <Label>會員帳號:</Label>
          <Input type="text" placeholder="Username" required />
          <Label>會員密碼:</Label>
          <Input type="password" placeholder="Password" required />
          <Label>確認密碼:</Label>
          <Input type="password" placeholder="Confirm Password" required />
          <Label>電子郵件:</Label>
          <Input type="email" placeholder="Email" required />
          <Button type="submit">註冊</Button>
          <HelperText>
            <Link href="#">已經有帳號？登入</Link>
          </HelperText>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;
