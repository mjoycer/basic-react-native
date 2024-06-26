import {View, Text, Image, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import NumericInput from 'react-native-numeric-input';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {
  ADD_TO_TOTAL,
  DELETE_CART_ITEM,
  EDIT_CART_ITEM,
  REMOVE_FROM_TOTAL,
} from '../redux/cartSlice';
import {Swipeable} from 'react-native-gesture-handler';

const CartItem = ({
  id,
  image,
  title,
  price,
  quantity,
  isAllChecked,
  handleItemTotal,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAllChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isAllChecked]);

  const handleCheck = value => {
    setIsChecked(value);
    handleItemTotal({id, isChecked: value});
  };

  const handleQuantity = value => {
    setEditedQuantity(value);
    dispatch(EDIT_CART_ITEM({id: id, quantity: value}));
    handleItemTotal({id, isChecked: isChecked});
  };

  const renderRightActions = (progress, dragAnimatedValue) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const handleRemoveItem = () => {
        dispatch(DELETE_CART_ITEM(id))
    }
    return (
      <View style={styles.deleteButtonContainer}>
        <Animated.View style={[styles.deleteButton, {opacity}]}>
          <TouchableOpacity onPress={() => handleRemoveItem()}>
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    deleteButtonContainer: {
        backgroundColor: 'red',
        height: '95%',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        fontSize: 16
    },
    deleteButtonText: {
        color: 'white'
    }
  })

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 20,
          marginVertical: 5,
          borderBottomWidth: 1,
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <View style={{justifyContent: 'center', paddingLeft: 5}}>
          <CheckBox
            onValueChange={newValue => handleCheck(newValue)}
            value={isChecked}
          />
        </View>
        <View>
          <Image
            style={{height: 100, width: 80}}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text>${price}.00</Text>
            <NumericInput
              type="plus-minus"
              minValue={1}
              value={editedQuantity}
              rounded
              totalHeight={30}
              totalWidth={70}
              onChange={newValue => handleQuantity(newValue)}
            />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItem;
