import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CartLogo = ({size, containerStyle}) => {
    const navigation = useNavigation();
    const cartQuantity = useSelector(state => state.cart.cartItemQuantity);

    const handleCartPress = () => {
        navigation.navigate('Cart')
    }
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={handleCartPress}>
        <FontAwesomeIcon size={size} icon={faCartShopping} />
      </TouchableOpacity>
    </View>
  );
};

export default CartLogo;
