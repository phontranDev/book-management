import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonItem from '../SkeletonItem/SkeletonItem';
import {SIZES} from '@src/constants';

const renderItem = ({item, index}) => {
  return <SkeletonItem />;
};
const ListSketonItem = () => {
  const skeletons = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  return (
    <View style={styles.container}>
      <FlatList
        data={skeletons}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      />
    </View>
  );
};

export default ListSketonItem;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.padding,
  },
});
