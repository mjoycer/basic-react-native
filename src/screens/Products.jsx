import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import {useFetch} from '../helpers/api';
import {constants} from '../constants/url';

const Products = () => {
  const {data: products} = useFetch(constants.PRODUCTS_URL);

  const renderItem = ({item}) => {
    return (
      <ProductItem
        title={item.title}
        price={item.price}
        description={item.description}
        image={item.images[0]}
        id={item.id}
      />
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Products;
