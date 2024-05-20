import {
  View,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NumericInput from 'react-native-numeric-input';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {ADD_TO_TOTAL, EDIT_CART_ITEM, REMOVE_FROM_TOTAL} from '../redux/cartSlice';

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
    //   handleItemTotal({quantity: editedQuantity, price, isChecked: true});
    handleItemTotal({id, isChecked: value})

    if(value){
        dispatch(ADD_TO_TOTAL(id))
    } else {
        dispatch(REMOVE_FROM_TOTAL(id))
    }

  };

  const handleQuantity = value => {
    setEditedQuantity(value);
    // handleItemTotal({id, isChecked})
    dispatch(EDIT_CART_ITEM({id: id, quantity: value}));
  };

  return (
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
  );
};

export default CartItem;
