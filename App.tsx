import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens from the screens directory
import Selection from './screens/selection';
import Calculator from './screens/calculator';
import Quotation from './screens/quotation';
import Confirmation from './screens/confirmation';
import Contact from './screens/contact';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer manages the routing tree and navigation state
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Selection"
        screenOptions={{
          // Set universal header styles to match the dark neon theme
          headerStyle: { backgroundColor: '#1e1e1e' },
          headerTintColor: '#00e5ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Selection" component={Selection} options={{ title: 'Packages' }} />
        <Stack.Screen name="Calculator" component={Calculator} options={{ title: 'Details' }} />
        <Stack.Screen name="Quotation" component={Quotation} options={{ title: 'Summary' }} />
        <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}