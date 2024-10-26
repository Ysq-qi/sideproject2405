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
import ProductDetail from './pages/product/product-detail';
import ProductDisplay from './pages/product/product-display';
import ProductSearch from './pages/product/product-search';
import Jackets from './pages/categories/jackets';
import Shirts from './pages/categories/shirts';
import Pants from './pages/categories/pants';
import Tops from './pages/categories/tops';
import Accessories from './pages/categories/accessories';
import CartDropdown from './pages/shop/cart-drop-down';
import Cart from './pages/shop/cart';
import Checkout from './pages/shop/checkout';
import OrderConfirmation from './pages/shop/order-confirmation';
import Order from './pages/shop/order';
import EmailInput from './pages/user/auth/forgotpassword/components/email-input'
import ResetPassword from './pages/user/auth/forgotpassword/components/reset-password'
import DeleteAccount from './pages/user/auth/deleteAccount'


const App = () => {
    return (
      <Router>
        <LayoutContainer>
          <GlobalStyles />
          <AuthListener />
          <Header />
          <Content>
            <Routes basename="/sideproject2405">
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/product/:productId" element={<ProductDetail />} />

              <Route path="/products/:id" element={<ProductDisplay />} />
              <Route path="/products/:id/page/:page" element={<ProductDisplay />} />

              <Route path="/search" element={<ProductSearch />} />

              <Route path="/jackets" element={<Jackets />} />
              <Route path="/jackets/page/:page" element={<Jackets />} />
              <Route path="/jackets/:subCategory" element={<Jackets />} />
              <Route path="/jackets/:subCategory/page/:page" element={<Jackets />} />

              <Route path="/shirts" element={<Shirts />} />
              <Route path="/shirts/page/:page" element={<Shirts />} />
              <Route path="/shirts/:subCategory" element={<Shirts />} />
              <Route path="/shirts/:subCategory/page/:page" element={<Shirts />} />

              <Route path="/pants" element={<Pants />} />
              <Route path="/pants/page/:page" element={<Pants />} />
              <Route path="/pants/:subCategory" element={<Pants />} />
              <Route path="/pants/:subCategory/page/:page" element={<Pants />} />

              <Route path="/tops" element={<Tops />} />
              <Route path="/tops/page/:page" element={<Tops />} />
              <Route path="/tops/:subCategory" element={<Tops />} />
              <Route path="/tops/:subCategory/page/:page" element={<Tops />} />

              <Route path="/accessories" element={<Accessories />} /> 
              <Route path="/accessories/page/:page" element={<Accessories />} />
              <Route path="/accessories/:subCategory" element={<Accessories />} />
              <Route path="/accessories/:subCategory/page/:page" element={<Accessories />} />
              
              <Route path="/cart-drop-down" element={<CartDropdown />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/order" element={<Order />} />
              <Route path="/forgotpassword/email" element={<EmailInput />} />
              <Route path="/forgotpassword/reset" element={<ResetPassword />} />
              <Route path="/deleteaccount" element={<DeleteAccount />} />
            </Routes>
          </Content>
          <Footer />
        </LayoutContainer>
      </Router>
    );
  };

  export default App;