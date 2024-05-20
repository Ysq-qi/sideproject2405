//處理組件的畫面呈現與佈局
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutContainer, Content } from './styles/layoutstyle';
import { GlobalStyles } from './styles/style'
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Type1 from './pages/categories/type1';

const App = () => {
    return (
      <Router>
        <LayoutContainer>
          <GlobalStyles />
          <Header />
          <Content>
            <Routes>
              <Route path="/type1" element={<Home />} />
              <Route path="/" element={<Type1 />} />
            </Routes>
          </Content>
          <Footer />
        </LayoutContainer>
      </Router>
    );
  };

  export default App;