import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CartLogo from './CartLogo';
import Products from '../screens/Products';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        options={{
          headerTitle: 'Products',
          headerRight: () => (
            <CartLogo size={25} containerStyle={{paddingHorizontal: 10}} />
          ),
        }}
        name="Shop"
        component={Products}
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
