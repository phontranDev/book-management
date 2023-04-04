import {StyleSheet, View} from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={{width: 200, height: 200}}
        source={require('../../assets/animations/loading.json')}
        loop={true}
        autoPlay={true}
      />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
});
