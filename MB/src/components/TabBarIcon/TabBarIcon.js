import {icons} from '@src/constants';
import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const TabBarIcon = ({focused, iconName}) => {
  const name = focused ? `${iconName}_active` : iconName;
  return (
    <Image
      source={icons[name]}
      style={{
        width: 35,
        height: 30,
        resizeMode: 'contain',
      }}
    />
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({});
