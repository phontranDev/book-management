import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import {COLORS, SIZES} from '@src/constants';

const InputSearch = ({onChange, term}) => {
  const handleTextInput = value => {
    onChange(value);
  };

  const deleteTerm = () => {
    onChange('');
  };

  return (
    <View style={styles.inputSearchContainer}>
      <AntDesignIcons name="search1" size={25} />
      <View style={{flex: 1}}>
        <TextInput
          value={term}
          onChangeText={handleTextInput}
          style={styles.textInput}
          placeholder="Search for books..."
        />
      </View>

      <TouchableOpacity onPress={deleteTerm}>
        {term ? <AntDesignIcons name="closecircleo" size={15} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  inputSearchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray5,
    borderRadius: SIZES.radius,
    paddingLeft: SIZES.radius,
    paddingRight: SIZES.radius,
    // paddingHorizontal: SIZES.padding,
  },

  textInput: {
    fontFamily: 'Roboto-Regular',
    paddingLeft: SIZES.base,
    color: COLORS.lightGray7,
  },
  clearIcon: {},
});
