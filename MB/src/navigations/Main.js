import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import {TabBarIcon} from '@src/components';
import {ExploreScreen} from '@src/screens/Explore';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} iconName="home" />
          ),
        }}
        name="Overview"
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} iconName="explore" />
          ),
        }}
        name="Explore"
        component={ExploreScreen}
      />

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return <TabBarIcon focused={focused} iconName="user" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
