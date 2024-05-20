import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({title, price, description, image, id}) => {
  const styles = StyleSheet.create({
    productContainer: {
      width: '45%',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
    },
    image: {
      width: '100%',
      height: 160,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      flex: 1,
      flexWrap: 'wrap',
    },
  });

  const navigation = useNavigation();

  const handleProductPress = (e) => {
    navigation.navigate('Product Details', {
        id: id
    })
  }
  return (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={handleProductPress}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={{padding: 10, flexDirection: 'row'}}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 10,
          }}>
          <Text
            style={{
              bottom: 0,
              fontWeight: 'bold',
              color: 'black',
              fontSize: 15,
            }}>
            ${price}.00
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;
