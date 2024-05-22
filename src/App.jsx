//處理組件的畫面呈現與佈局
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutContainer, Content } from './styles/layoutstyle';
import { GlobalStyles } from './styles/style'
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/user/login'
import Register from './pages/user/register'
import Profile from './pages/user/profile'
import Cart from './pages/shop/cart'
import ProductDetail from './pages/product/product-detail'


const App = () => {
    return (
      <Router>
        <LayoutContainer>
          <GlobalStyles />
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/productdetail" element={<ProductDetail />} />
            </Routes>
          </Content>
          <Footer />
        </LayoutContainer>
      </Router>
    );
  };

  export default App;