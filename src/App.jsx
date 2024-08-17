//處理組件的畫面呈現與佈局
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutContainer, Content } from './styles/layoutstyle';
import { GlobalStyles } from './styles/style'
import AuthListener from './components/auth-listener';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/user/login';
import Register from './pages/user/register';
import Profile from './pages/user/profile';
import Cart from './pages/shop/cart';
import ProductDetail from './pages/product/product-detail';
import ProductDisplay from './pages/product/product-display';
import Type1 from './pages/categories/type1';
import Type2 from './pages/categories/type2';
import Type3 from './pages/categories/type3';
import Type4 from './pages/categories/type4';
import Type5 from './pages/categories/type5';
import Orders from './pages/shop/orders';
import CartDropdown from './pages/shop/cart-drop-down';
import EmailInput from './pages/user/auth/forgotpassword/components/email-input'
import VerificationCodeInput from './pages/user/auth/forgotpassword/components/verification-input'
import ResetPassword from './pages/user/auth/forgotpassword/components/reset-password'


const App = () => {
    return (
      <Router>
        <LayoutContainer>
          <GlobalStyles />
          <AuthListener />
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart-drop-down" element={<CartDropdown />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/products" element={<ProductDisplay />} />
              <Route path="/type1" element={<Type1 />} />
              <Route path="/type2" element={<Type2 />} />
              <Route path="/type3" element={<Type3 />} />
              <Route path="/type4" element={<Type4 />} />
              <Route path="/type5" element={<Type5 />} />
              <Route path="/forgotpassword/email" element={<EmailInput />} />
              <Route path="/forgotpassword/verification" element={<VerificationCodeInput />} />
              <Route path="/forgotpassword/reset" element={<ResetPassword />} />
            </Routes>
          </Content>
          <Footer />
        </LayoutContainer>
      </Router>
    );
  };

  export default App;