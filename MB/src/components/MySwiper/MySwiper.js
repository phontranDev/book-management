import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@src/constants';

const images = [
  'https://libribook.com/Images/react-native-cookbook-2nd-edition-pdf.jpg',
  'https://libribook.com/Images/decision-intelligence-dummies-pdf.jpg',
];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const MySwiper = ({books}) => {
  const [imgActive, setImgActive] = useState(0);

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images.map((image, _) => (
            <Image
              key={_}
              resizeMode="contain"
              style={styles.wrap}
              source={{uri: image}}
            />
          ))}
        </ScrollView>

        {/* Dot */}
        <View style={styles.wrapDot}>
          {images.map((image, index) => (
            <Text
              key={index}
              style={imgActive == index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MySwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: 300,
  },
  wrapDot: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    flexDirection: 'row',
  },
  dotActive: {
    margin: 3,
    color: COLORS.black,
  },
  dot: {
    margin: 3,
    color: COLORS.white,
  },
});
