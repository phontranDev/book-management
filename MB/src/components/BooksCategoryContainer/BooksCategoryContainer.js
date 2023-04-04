import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Book from '../Book/Book';

const renderItem = ({item, index}) => {
  return <Book item={item} />;
};

const BooksCategoryContainer = ({books}) => {
  return (
    <View>
      <FlatList
        numColumns={3}
        key={'_'}
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      />
    </View>
  );
};

export default BooksCategoryContainer;

const styles = StyleSheet.create({});
