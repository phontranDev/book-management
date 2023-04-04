import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  UserInfoScreen,
  UserProfileScreen,
} from '@src/screens/User';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();

function MyStack() {
  const {userInfor} = useSelector(state => state.auth.userLogin);

  return (
    <Stack.Navigator>
      {userInfor && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="User Profile"
          component={UserProfileScreen}
        />
      )}

      {userInfor && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="User Info"
          component={UserInfoScreen}
        />
      )}

      {!userInfor && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      )}

      {!userInfor && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
      )}
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
