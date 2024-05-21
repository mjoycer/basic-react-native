import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './src/components/Tabs';
import CartLogo from './src/components/CartLogo';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import CartScreen from './src/screens/Cart';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Item from './src/screens/Item';

const App = () => {
  const Stack = createNativeStackNavigator();
  const cartLogo = () => {
    return <CartLogo
    size={25}
    containerStyle={{paddingHorizontal: 10}}
  />
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <GestureHandlerRootView style={{flex: 1}}>
            <Stack.Navigator initialRouteName="Products">
              <Stack.Screen
                options={{headerShown: false}}
                name="HomeTab"
                component={Tabs}
              />
              <Stack.Screen
                options={{
                  headerTitle: '',
                  headerRight: cartLogo
                }}
                name="Product Details"
                component={Item}
              />
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
