import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FONTS, SIZES} from '@src/constants';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
const InputComp = ({
  field,
  value,
  setFieldValue,
  onChangeText,
  inputName = ' ',
  pdRight = 0,
}) => {
  const clear = () => {
    setFieldValue(field, '');
  };

  return (
    <>
      <View style={{flex: 1, paddingRight: pdRight || 0}}>
        <Text style={[FONTS.h3]}>{inputName}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#F6F6F6',
            borderBottomWidth: 2,
          }}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            style={{
              flex: 1,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: SIZES.radius,
              fontWeight: 'bold',
              color: '#111',
              fontSize: 18,
            }}
          />

          <TouchableOpacity onPress={clear}>
            {value ? <AntDesignIcons name="closecircleo" size={20} /> : null}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default InputComp;

const styles = StyleSheet.create({});
