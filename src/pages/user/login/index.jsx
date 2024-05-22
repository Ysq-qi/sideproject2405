import React from 'react';
import { 
  LoginContainer,
  LoginTitle,
  LoginBox,
  Label,
  Input, 
  Button,
  HelperText,
  Link
} from './style.js';


const Login = () => {
  return (
    <LoginContainer>
      <LoginTitle>會員登入</LoginTitle> 
      <LoginBox>
        <form>
          <Label>會員帳號:</Label>
          <Input type="text" placeholder="Username" required />
          <Label>會員密碼:</Label>
          <Input type="password" placeholder="Password" required />
          <Button type="submit">登入</Button>
          <HelperText>
            <Link href="#">忘記密碼?</Link> / <Link href="#">註冊會員</Link>
          </HelperText>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;