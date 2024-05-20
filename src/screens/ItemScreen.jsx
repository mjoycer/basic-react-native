import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ADD_TO_CART, CLEAR_CART } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ItemScreen = ({route}) => {
  const {id} = route.params;
  const [productDetails, setProductDetails] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`).then(res => {
      setProductDetails(res.data);
    });
  }, []);

  const styles = StyleSheet.create({
    image: {
      height: 300,
      width: '100%',
    },
    price: {
      fontSize: 25,
      color: 'teal',
      fontWeight: 'bold',
    },
    title: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        color: 'black',
        marginTop: 10
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 50,
    },
    button: {
      height: 50,
      width: '100%',
      backgroundColor: 'teal',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 17,
    },
    container: {
        padding: 10,
        justifyContent: 'space-between'
    }
  });

  const handleAddToCart = () => {
    dispatch(ADD_TO_CART({
        title: productDetails.title,
        price: productDetails.price,
        image: productDetails.images[0],
        id: productDetails.id
    }));
  }

  return (
    productDetails && (
      <View style={{height: '100%'}}>
        <View>
          <Image
            style={styles.image}
            source={{uri: productDetails.images[0]}}
          />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.price}>${productDetails.price}.00</Text>
          </View>
          <View>
            <Text style={styles.title}>{productDetails.title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{productDetails.description}</Text>
          </View>
        </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  );
};

export default ItemScreen;
