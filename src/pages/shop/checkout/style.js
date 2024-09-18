import styled from 'styled-components';

/* 容器基本樣式 */
export const CheckoutContainer = styled.div`
  width: 1200px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Section = styled.section`
  background-color: #fff;
  color: #333;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

/* 標題與副標題 */
export const Title = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px;
  margin-bottom: 15px;
`;

/* 表格相關樣式 */
export const ProductTable = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  text-align: center;
`;

export const TableHeader = styled.th`
  background-color: #000;
  color: #fff;
  padding: 15px;
  text-align: center;
`;

export const TableCell = styled.td`
  padding: 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

/* 表單輸入與按鈕 */
export const FormField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 50px; 
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  white-space: nowrap;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 400px;
`;

export const ReadOnlyInput = styled(Input)`
  background-color: #f0f0f0;
  cursor: not-allowed;
`;

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #333;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

/* 選項容器 */
export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 50px; 
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  margin-right: 10px;
`;

/* 靜態信息 */
export const StaticInfo = styled.div`
  padding: 10px;
  border-radius: 4px;
`;