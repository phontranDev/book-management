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
import {
  getAuth,
  hasError,
  registerSuccess,
  registerUser,
} from '@src/redux/slices/auth';
import axios from '@src/utils/axiosInstance';
import {showToastFail, showToastSuccess} from '../ToastComp';
const iconSize = 20;

const FormRegister = ({onChangeLoading, onShowToast}) => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [hidePassword, setHidePassword] = useState(true);

  const {status} = useSelector(state => state.auth);

  const initialFormValues = {
    email: '',
    username: '',
    password: '',
  };

  const UserRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email')
      .required('Email is required'),
    username: Yup.string().required('User name is required'),
    password: Yup.string().required('Password is required'),
  });

  const registerHandler = async body => {
    try {
      onChangeLoading(true);
      const response = await axios.post('/auth/signup', body);

      if (response && response.status === 201) {
        const timer = setTimeout(() => {
          onChangeLoading(false);
          showToastSuccess(response);
          navigation.navigate('Login');
          dispatch(registerSuccess(response.status));
        }, 2000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      if (error) {
        const timer = setTimeout(() => {
          onChangeLoading(false);
          showToastFail(error);
          dispatch(hasError(error));
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  };

  const handleReset = resetForm => {
    resetForm();
  };

  return (
    <>
      <View>
        <Formik
          innerRef={ref}
          initialValues={initialFormValues}
          validationSchema={UserRegisterSchema}
          onSubmit={values => registerHandler(values)}>
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
                <Text style={styles.text}>Email</Text>
                <View style={styles.groupInputIcon}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    style={[styles.input, {flex: 4.5}]}
                  />
                  {values.email ? (
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => setFieldValue('email', '')}>
                      <AntDesign name="close" size={iconSize} />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

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
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

export default FormRegister;

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
