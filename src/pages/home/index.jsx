import React from 'react';
import { HomeContainer } from './style';
import Banner from './components/banner';
import Featured from './components/featured';
import NewProduct from './components/new-products';
import FocusProduct from './components/focus-products';
import useHome from './hooks/usehome';

const Home = () => {
  const {
    banners,
    featured,
    newProductDetails,
    focusProductDetails,
    isLoading,
    error,
  } = useHome();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>加載數據時出錯：{error}</div>;

  return (
    <HomeContainer>
      <Banner banners={banners} />
      <Featured featured={featured} />
      <NewProduct products={newProductDetails} />
      <FocusProduct products={focusProductDetails} />
    </HomeContainer>
  );
};

export default Home;