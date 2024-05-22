import styled from 'styled-components';

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 600px;
  margin: 50px auto;
  background-color: #ccc;
`;

export const RegisterTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  border-radius: 8px;
`;

export const Label = styled.label`
  width: 80%;
  text-align: left;
  margin: 10px 0 5px;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  width: 80%;
  height: 40px;
  display: block;
  margin: 10px 0;
  padding: 0 10px;
  color: #777;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  margin: 20px 0 10px;
  background-color: #2894FF;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #0072E3;
  }
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 10px;
`;

export const Link = styled.a`
  color: #2894FF;
  cursor: pointer;
  margin: 0 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
