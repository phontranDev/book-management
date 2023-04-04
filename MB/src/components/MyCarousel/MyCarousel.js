import React, {useRef, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getBooksForSlider} from '@src/redux/slices/book';
import {useSelector, useDispatch} from '@src/redux/store';

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = ({books}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {booksSlider} = useSelector(state => state.book);

  useEffect(() => {
    dispatch(getBooksForSlider());
  }, []);

  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({item, index}, parallaxProps) => {
    const nativeScreen = () => {
      navigation.navigate('Book Detail', {
        id: item.id,
      });
    };

    return (
      <TouchableOpacity onPress={nativeScreen}>
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: item.imageUrl}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={400}
        itemWidth={300}
        data={booksSlider.length > 0 ? booksSlider : []}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 400,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
