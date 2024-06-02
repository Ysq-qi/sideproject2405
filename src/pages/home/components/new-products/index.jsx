import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeProductsSection from '../products-section';
import labelImage from '../../../../assets/images/home/new-products/new.png';

const NewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/home/newproduct')
      .then(response => {
        const productIds = response.data[0].productIds;
        axios.get(`http://localhost:3001/api/products?ids=${productIds.join(',')}`)
          .then(productResponse => {
            setProducts(productResponse.data);
          })
          .catch(error => {
            console.error('Error fetching product data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching new product data:', error);
      });
  }, []);

  return <HomeProductsSection labelImage={labelImage} products={products} />;
};

export default NewProduct;