import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@src/constants';

const CustomButton = ({onSubmit}) => {
  return (
    <TouchableOpacity onPress={onSubmit}>
      <View
        style={{
          backgroundColor: '#5C62D6',
          borderWidth: 1,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,
        }}>
        <Text style={[FONTS.h2, {textAlign: 'center', color: COLORS.white}]}>
          Save
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
