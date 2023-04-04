import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookContainerScreen} from '@src/screens/Book';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator defaultScreenOptions={'Home'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={BookContainerScreen}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
