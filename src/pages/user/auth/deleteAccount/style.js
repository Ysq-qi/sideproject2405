import styled from 'styled-components';

export const DeleteAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 600px;
  margin: 50px auto;
  background-color: #ccc;
`;

export const DeleteAccountTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const DeleteAccountBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Label = styled.label`
  width: 340px;
  text-align: left;
  margin: 10px 0 5px;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  width: 250px;
  height: 40px;
  padding: 0 10px;
  color: #777;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 450px;
  height: 40px;
  margin: 20px 0 10px;
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #e53e3e;
  }
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