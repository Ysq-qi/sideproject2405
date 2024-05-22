import styled from 'styled-components';

export const ProfileContainer = styled.div`
  padding: 20px;
  width: 550px;
  overflow: auto;
  margin: 20px auto;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
`;

export const Button = styled.button`
  background-color: #3C3C3C;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
`;

export const ProfileSection = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
`;

export const PasswordSection = styled.div`
  background-color: #6C6C6C;
  padding: 20px;
  color: #fff;
  border: 1px solid #ccc;
`;

export const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  label {
    width: 100px;
  }
`;

export const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
  flex: 1;
`;

export const ChangeButton = styled.button`
  background-color: #3C3C3C;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

export const FormButton = styled.button`
  background-color: #3C3C3C;
  color: #fff;
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  cursor: pointer;
`;

export const Line = styled.div`
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
`;
