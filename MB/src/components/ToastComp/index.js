import React from 'react';
import Toast from 'react-native-toast-message';

export const showToastSuccess = (message = '') => {
  return Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
  });
};

export const showToastFail = (error, message) => {
  return Toast.show({
    type: 'error',
    text1: error.error,
    text2: message || error.message,
  });
};

export default {};
