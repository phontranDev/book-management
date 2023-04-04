import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SIZES} from '@src/constants';
const SkeletonItem = () => {
  const speed = 1000;
  return (
    <SkeletonPlaceholder speed={speed}>
      <SkeletonPlaceholder.Item marginRight={SIZES.radius}>
        <SkeletonPlaceholder.Item
          width={113}
          height={160}
          borderRadius={SIZES.radius}
        />
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginTop={SIZES.base}
            width={113}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SkeletonItem;

const styles = StyleSheet.create({});
