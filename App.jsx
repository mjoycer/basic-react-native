import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './src/components/Tabs';
import ProductItem from './src/components/ProductItem';
import ItemScreen from './src/screens/ItemScreen';
import CartLogo from './src/components/CartLogo';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import CartScreen from './src/screens/CartScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Products">
            <Stack.Screen
              options={{headerShown: false}}
              name="HomeTab"
              component={Tabs}
            />
            <Stack.Screen
              options={{
                headerTitle: '',
                headerRight: () => (
                  <CartLogo
                    size={25}
                    containerStyle={{paddingHorizontal: 10}}
                  />
                ),
              }}
              name="Product Details"
              component={ItemScreen}
            />
            <Stack.Screen name='Cart' component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
