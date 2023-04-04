import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SIZES} from '@src/constants';
import * as Yup from 'yup';
import {Formik, useFormikContext} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, getAuthSuccess, hasError} from '@src/redux/slices/auth';

import axios from '@src/utils/axiosInstance';
import {showToastFail, showToastSuccess} from '../ToastComp';

const iconSize = 20;

const FormLogin = ({
  isFocus,

  onChangeLoading,
}) => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [hidePassword, setHidePassword] = useState(true);

  const initialFormValues = {
    username: '',
    password: '',
  };

  const UserLoginSchema = Yup.object().shape({
    username: Yup.string().required('User name is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    if (ref?.current) {
      ref.current.resetForm();
    }
  }, [isFocus]);

  const loginHandler = async body => {
    try {
      onChangeLoading(true);
      const response = await axios.post('/auth/signin', body);
      if (response && response.status === 200) {
        const timer = setTimeout(() => {
          onChangeLoading(false);
          showToastSuccess('Đăng nhập thành công');
          dispatch(getAuthSuccess(response.data));
        }, 2000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      if (error && error.status === 401) {
        const timer = setTimeout(() => {
          onChangeLoading(false);
          showToastFail(error, 'Tài khoản hoặc mật khẩu không đúng');
          dispatch(hasError(error));
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  };

  const navRegisterScreen = () => {
    navigation.navigate('Register');
  };
  return (
    <>
      <View>
        <Formik
          innerRef={ref}
          initialValues={initialFormValues}
          validationSchema={UserLoginSchema}
          onSubmit={values => loginHandler(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            resetForm,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>User name</Text>
                <View style={styles.groupInputIcon}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    style={[styles.input, {flex: 4.5}]}
                  />
                  {values.username ? (
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => setFieldValue('username', '')}>
                      <AntDesign name="close" size={iconSize} />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.text}>Password</Text>
                <View style={styles.groupInputIcon}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    secureTextEntry={hidePassword}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    style={[styles.input, {flex: 4.5}]}
                  />

                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setHidePassword(!hidePassword)}>
                    <FontAwesome5
                      name={hidePassword ? 'eye-slash' : 'eye'}
                      size={iconSize}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: SIZES.padding,
                }}>
                <TouchableOpacity onPress={handleSubmit} style={{width: '80%'}}>
                  <Text
                    style={[
                      styles.btn,
                      {backgroundColor: '#111', color: '#fff'},
                    ]}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>

      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#111', fontSize: 15, fontWeight: 'bold'}}>
          Không phải thành viên?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            backgroundColor: '#FECE2F',
            padding: SIZES.radius,
            borderRadius: SIZES.padding,
          }}>
          <TouchableOpacity onPress={navRegisterScreen}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  paddingRight: SIZES.base,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#111',
                }}>
                Đăng ký ngay
              </Text>
              <AntDesign name="arrowright" size={20} color="#111" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    marginBottom: SIZES.padding,
  },
  groupInputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray5,
    borderRadius: SIZES.padding,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: SIZES.base,
    fontWeight: 'bold',
  },
  input: {
    color: COLORS.black,
    fontSize: 16,
    padding: SIZES.radius,
    paddingLeft: SIZES.padding,
  },
  icon: {
    flex: 0.5,
    paddingRight: SIZES.base,
  },
  btn: {
    textAlign: 'center',
    backgroundColor: '#DFDFDF',
    borderRadius: SIZES.padding,
    padding: SIZES.radius,
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E44F57',
    marginTop: SIZES.base,
  },
});
