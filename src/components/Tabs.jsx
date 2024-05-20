import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartLogo from './CartLogo';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        options={{
          headerTitle: 'Products',
          headerRight: () => (
            <CartLogo size={25} containerStyle={{paddingHorizontal: 10}} />
          ),
        }}
        name="Shop"
        component={ProductsScreen}
      />
      {/* <Tab.Screen
        options={{tabBarIcon: () => <CartLogo size={18} />}}
        name="Cart"
        component={CartScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
