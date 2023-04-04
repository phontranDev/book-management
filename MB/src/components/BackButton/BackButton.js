import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, SIZES} from '@src/constants';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({text}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding,
      }}>
      <TouchableOpacity onPress={goBack}>
        <Image
          source={icons.chevron_left}
          resizeMode="cover"
          style={{
            width: 18,
            height: 18,
            tintColor: COLORS.lightGray7,
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        {text && (
          <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
            {text}
          </Text>
        )}
      </View>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
