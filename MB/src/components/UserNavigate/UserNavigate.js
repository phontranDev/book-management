import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@src/constants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from '@src/redux/store';
import {logout} from '@src/redux/slices/auth';

const UserNavigate = ({
  iconName = '',
  page = '',
  navigate = '',
  children,
  isLogout = false,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onNavigate = () => {
    if (isLogout) {
      console.log('logout');
      dispatch(logout());
    }

    if (!navigate) {
      return;
    }
    navigation.navigate(navigate);
  };
  return (
    <TouchableOpacity onPress={onNavigate}>
      <View
        style={{
          paddingVertical: 18,
          paddingHorizontal: SIZES.padding,
          backgroundColor: '#F2F3F7',
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: SIZES.padding,
        }}>
        <View>
          {children ? (
            children
          ) : (
            <FontAwesome size={23} name={iconName} color="#DB9789" />
          )}
        </View>
        <View style={{flex: 1, paddingLeft: SIZES.padding}}>
          <Text style={FONTS.h3}>{page}</Text>
        </View>
        <View>
          <FontAwesome size={17} name="chevron-right" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserNavigate;

const styles = StyleSheet.create({});
