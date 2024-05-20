import React from 'react';
import { HomeContainer } from './style';
import Banner from './components/banner';
import Featured from './components/featured';
import NewProduct from './components/new-products';
import FocusProduct from './components/focus-products';

const Home = () => {
  return (
    <HomeContainer>
      <Banner />
      <Featured />
      <NewProduct />
      <FocusProduct />
    </HomeContainer>
  );
}

export default Home;
