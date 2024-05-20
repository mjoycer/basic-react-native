import {View, Text, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const Products = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
      axios
        .get('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
        .then(res => {
          setProducts(res.data);
        });
  }, [])

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({item}) => (
          <ProductItem
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.images[0]}
            id={item.id}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Products;
