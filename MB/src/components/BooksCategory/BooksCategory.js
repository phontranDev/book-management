import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, icons, SIZES} from '@src/constants';
import Book from '../Book/Book';

const renderItem = ({item, index}) => {
  return <Book item={item} />;
};

const BooksCategory = ({title, categoryId, books}) => {
  const navigation = useNavigation();

  const goListBookCategory = id => {
    navigation.navigate('Books Category', {id});
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[FONTS.h2, {marginBottom: SIZES.base}]}>{title}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => goListBookCategory(categoryId)}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '500',
                color: COLORS.lightGray7,
              }}>
              See more
            </Text>
          </TouchableOpacity>

          <Image
            source={icons.chevron_right}
            resizeMode="cover"
            style={{
              width: 10,
              height: 10,
              marginTop: 2,
              tintColor: COLORS.lightGray7,
            }}
          />
        </View>
      </View>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      />
    </>
  );
};

export default BooksCategory;

const styles = StyleSheet.create({});
