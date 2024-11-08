import styled from 'styled-components';

export const ProfileContainer = styled.div`
  padding: 30px;
  width: 600px;
  margin: 40px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  background-color: #007BFF;
  color: #fff;
  padding: 12px 24px;
  margin: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProfileSection = styled.div`
  background-color: #fff;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const PasswordSection = styled.div`
  background-color: #fff;
  padding: 25px;
  color: #333;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
`;


export const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  label {
    width: 120px;
    font-weight: bold;
    color: #333;
  }
`;

export const AddressRow = styled.div`
  width: 250px; 
  align-items: center;
  justify-content: center;

    select {
    width: 90px;
    padding: 9px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const AddressInput = styled.input`
  width: 70px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Input = styled.input`
  width: 230px; 
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const FormButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
`;

export const Line = styled.div`
  border-bottom: 2px solid #eaeaea;
  margin: 30px 0;
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 10px;
  text-align: center;
  height: 30px;
`;

export const ErrorText = styled.span`
  color: red;
  margin-left: 10px;
  white-space: nowrap;
`;

export const SuccessText = styled.span`
  color: green;
  margin-left: 10px;
  white-space: nowrap;
`;