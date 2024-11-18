import React from 'react';
import {
  Container,
  Title,
  SectionTitle,
  BoldText,
  Text
} from './style';

const ProjectIntroduction = () => {
  return (
    <Container>
      <Title>SideProject2405</Title>

      <SectionTitle>專案簡介</SectionTitle>
      <Text>
        SideProject2405 是一個以 React.js 為前端、Firebase 為後端的全端電子商務網站專案。
        用戶可以瀏覽商品、加入購物車、下訂單以及管理個人資料等功能。
        本專案包含了前端與後端的開發，並且包含 Firestore 資料庫的同步，實現了完整的購物流程。
      </Text>

      <SectionTitle>功能特色</SectionTitle>
      <Text>用戶管理：註冊、登入、修改個人資料、更改密碼、刪除帳號。</Text>
      <Text>商品展示：商品列表、商品詳情、關鍵字搜尋。</Text>
      <Text>購物車：添加商品、更新數量、刪除商品、同步購物車至 Firestore。</Text>
      <Text>訂單系統：提交訂單、查看歷史訂單，訂單資料儲存在 Firestore。</Text>
      <Text>首頁展示：橫幅、特色商品、新商品、注目商品。</Text>

      <SectionTitle>技術架構</SectionTitle>
      <BoldText><strong>前端</strong></BoldText>
      <Text>React.js</Text>
      <Text>Redux(Redux Toolkit)</Text>
      <Text>React Router</Text>
      <Text>Styled Components</Text>
      <Text>Firebase Authentication</Text>
      
      <BoldText><strong>後端</strong></BoldText>
      <Text>Node.js(Express.js)</Text>
      <Text>Firebase Functions</Text>
      <Text>Firestore (NoSQL 資料庫)</Text>
      <Text>Firebase Storage</Text>

      <Text><strong>其他</strong></Text>
      <Text>Git, Github</Text>
      <Text>GitHub Actions（自動化部署）</Text>

      <SectionTitle>測試</SectionTitle>
      <Text>為了讓您方便測試網站功能，我們提供了一個測試帳號，您可以使用以下帳號登入並體驗所有功能：</Text>
      <Text>帳號 (Email): chaochi905@gmail.com</Text>
      <Text>密碼 (Password): ABCD1234</Text>
      <Text>請注意：此帳號並不會觸發信箱密碼重製與帳號刪除功能。</Text>

      <SectionTitle>實際運作</SectionTitle>
      <Text>
        用戶也能夠自行於該網站上進行註冊的功能，執行該網站的功能，並且提供帳號刪除功能，
        確保用戶於資料庫當中的資料能夠確實清除，不留下任何資料。
      </Text>

      <SectionTitle>聯絡方式</SectionTitle>
      <Text>如有任何疑問或建議，請透過 jacky55321261@gmail.com 與我聯繫。</Text>
    </Container>
  );
};

export default ProjectIntroduction;