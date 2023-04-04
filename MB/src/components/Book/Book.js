import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from '@src/constants';

const Book = ({item}) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('Book Detail', {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={{marginRight: SIZES.radius, width: 113}}>
        <Image
          style={{width: 113, height: 160, borderRadius: SIZES.radius}}
          source={{
            uri: item.imageUrl,
          }}
          resizeMode="cover"
        />
        <Text style={[FONTS.h4, {height: 50}]}>{item.name}</Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.lightGray7,
          }}>
          by {item.author.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Book;

const styles = StyleSheet.create({});
