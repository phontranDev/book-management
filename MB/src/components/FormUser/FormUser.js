import React, {useEffect} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {BackButton, CustomButton, InputComp} from '@src/components';
import {COLORS, FONTS, images, SIZES} from '@src/constants';
import {Formik} from 'formik';

const FormUser = ({userInfo, handleSubmit}) => {
  const {id, firstname, lastname, username, email, imageUrl, roles, published} =
    userInfo;
  const initialFormValues = {
    email: email || '',
    username: username || '',
    firstname: firstname || '',
    lastname: lastname || '',
    published: published || false,
    imageUrl: imageUrl || '',
    strRoles: roles || [],
  };

  const UserInfoSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email')
      .required('Email is required'),
  });

  const submitForm = values => {
    console.log(values);
  };

  return (
    <View style={styles.mainProfile}>
      <Image
        source={images.userProfile}
        style={styles.photo}
        resizeMode="cover"
      />

      <Formik
        initialValues={initialFormValues}
        validationSchema={UserInfoSchema}
        onSubmit={values => handleSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <ScrollView>
            <View style={styles.formContainer}>
              <Text style={[FONTS.h2, {color: '#7278D9'}]}>
                User Information
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: SIZES.padding2}}>
              <InputComp
                field="firstname"
                onBlur={handleBlur('firstname')}
                onChangeText={handleChange('firstname')}
                setFieldValue={setFieldValue}
                value={values.firstname}
                inputName="First Name"
                pdRight={SIZES.padding}
              />
              <InputComp
                field="lastname"
                onBlur={handleBlur('lastname')}
                onChangeText={handleChange('lastname')}
                setFieldValue={setFieldValue}
                value={values.lastname}
                pdRight={SIZES.padding}
                inputName="Last Name"
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: SIZES.padding2}}>
              <View style={{flex: 1}}>
                <InputComp
                  field="email"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  setFieldValue={setFieldValue}
                  value={values.email}
                  pdRight={SIZES.padding}
                  inputName="Email"
                />
                {errors.email && touched.email && (
                  <Text style={{color: '#E44F57', marginTop: SIZES.base}}>
                    {errors.email}
                  </Text>
                )}
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: SIZES.padding2}}>
              <InputComp
                field="address"
                onBlur={handleBlur('address')}
                onChangeText={handleChange('address')}
                setFieldValue={setFieldValue}
                value={values.address}
                pdRight={SIZES.padding}
                inputName="Address"
              />
            </View>

            <View style={{marginTop: 40}}>
              <CustomButton onSubmit={handleSubmit} />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default FormUser;

const styles = StyleSheet.create({
  mainProfile: {
    flex: 1,
    marginTop: SIZES.padding,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    alignSelf: 'center',
    marginBottom: SIZES.padding,
  },
  formContainer: {},
});
