import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS, SIZES} from '@src/constants';

const HeaderText = ({text}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[FONTS.h2, {textAlign: 'center', textTransform: 'capitalize'}]}>
        {text}
      </Text>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.radius,
  },
});
