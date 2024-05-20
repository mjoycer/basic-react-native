import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../components/CartItem';
import CheckBox from '@react-native-community/checkbox';
import {ADD_ITEM_TO_TOTAL} from '../redux/cartSlice';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  const [productQuantity, setProductQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedCart, setCheckedCart] = useState([]);

  useEffect(() => {
    if (isAllChecked) {
      setCheckedCart(cart);
    } else {
      setCheckedCart([]);
    }
  }, [isAllChecked]);

  useEffect(() => {
    let total = 0;
    let quantity = 0;

    checkedCart.forEach(item => {
      let cartItem = cart.find(cartItem => cartItem.id === item.id);
      total += cartItem.price * cartItem.quantity;
      quantity += cartItem.quantity;
    });

    setTotalPrice(total);
    setProductQuantity(quantity);
  }, [checkedCart, cart]);

  const handleCheckedTotal = ({id, isChecked}) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    const itemDetails = cart[itemIndex];

    if (isChecked) {
      let itemChecked = checkedCart.find(item => item.id === id);
      !itemChecked && setCheckedCart([...checkedCart, {...itemDetails}]);
    } else {
      const removeItemFromCart = checkedCart.filter(item => item.id !== id);
      setCheckedCart(removeItemFromCart);
    }
  };

  const styles = StyleSheet.create({
    bottomText: {
      color: 'white',
      fontSize: 20,
    },
  });

  return (
    <View
      style={{
        height: '100%',
        paddingBottom: 97,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 5,
        }}>
        <CheckBox
          onValueChange={newValue => setIsAllChecked(newValue)}
          value={isAllChecked}
        />
        <Text style={{color: 'black', fontSize: 17}}>All</Text>
      </View>
      <View>
        <FlatList
          data={cart}
          renderItem={({item}) => (
            <CartItem
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              isAllChecked={isAllChecked}
              handleItemTotal={({id, isChecked}) =>
                handleCheckedTotal({id, isChecked})
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          position: 'absolute',
          bottom: 0,
          height: 60,
          alignItems: 'center',
          backgroundColor: 'teal',
        }}>
        <Text style={styles.bottomText}>Total:</Text>
        <Text style={styles.bottomText}>{productQuantity} items</Text>
        <Text style={styles.bottomText}>${totalPrice}.00</Text>
      </View>
    </View>
  );
};

export default CartScreen;
