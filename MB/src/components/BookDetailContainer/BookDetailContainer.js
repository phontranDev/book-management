import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@src/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const BookDetailContainer = ({book}) => {
  const navigation = useNavigation();

  const opPress = () => {
    console.log('Lister or Read Book');
  };

  const onReadBook = () => {
    navigation.navigate('Book Reader', {
      pdf: book.softFileUrl,
    });
  };

  const handleBookAudio = () => {
    if (book.chapters.length > 0) {
      navigation.navigate('Book Audio', {
        book: book,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapInfo}>
        <View>
          <Image
            style={[styles.image, {backgroundColor: 'red'}]}
            source={{uri: book.imageUrl}}
            resizeMode="cover"
          />
        </View>

        <View style={{marginTop: SIZES.radius}}>
          <Text style={[FONTS.h2]}>{book.name}</Text>
        </View>

        <View>
          <Text>by {book.authorName}</Text>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: SIZES.padding,
            padding: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#F7F9FD',
            borderRadius: SIZES.radius,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                width: 2,
                height: '50%',
                backgroundColor: '#E1E6EF',
                top: '25%',
                right: 0,
              }}></View>
            <Text style={FONTS.h3}>Rating</Text>
            <View
              style={{
                marginTop: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="star" size={16} color={'#EAC967'} />
              <Text style={{marginLeft: 8}}>5</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 3,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[FONTS.h3]}>Pages</Text>
            <Text>{book.pageNumber}</Text>
          </View>
        </View>

        {/* BUTTONS */}

        <View style={[styles.btnWrap, {flexDirection: 'row'}]}>
          <TouchableOpacity
            disabled={book.softFileUrl ? false : true}
            onPress={onReadBook}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor: book.softFileUrl
                    ? COLORS.black
                    : COLORS.lightGray4,
                },
              ]}>
              <FontAwesome5 name="book-reader" size={20} color={COLORS.white} />
              <Text style={styles.btnText}>Read Book</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBookAudio}
            disabled={book.chapters.length <= 0}>
            <View
              style={[
                styles.btn,
                {
                  backgroundColor:
                    book.chapters.length > 0 ? COLORS.black : COLORS.lightGray4,
                },
              ]}>
              <FontAwesome5
                name="headphones-alt"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.btnText}>Play Book</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text style={[FONTS.h2]}>Description</Text>
        <ScrollView
          style={{marginTop: SIZES.radius}}
          showsVerticalScrollIndicator={false}>
          <Text style={{lineHeight: 20, letterSpacing: 0.5}}>
            To scaffold the project with the Nest CLI, run the following
            commands. This will create a new project directory, and populate the
            directory with the initial core Nest files and supporting modules,
            creating a conventional base structure for your project. Creating a
            new project with the To scaffold the project with the Nest CLI, run
            the following commands. This will create a new project directory,
            and populate the directory with the initial core Nest files and
            supporting modules, creating a conventional base structure for your
            project. Creating a new project with the
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookDetailContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapInfo: {
    flex: 4,
    alignItems: 'center',
  },
  imageBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: SIZES.radius,
    backgroundColor: 'red',
  },
  title: {
    color: COLORS.black,
  },
  btnWrap: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    padding: SIZES.radius,
    borderRadius: SIZES.padding,
  },
  disableTbn: {
    backgroundColor: COLORS.lightGray7,
  },
  btnText: {
    marginLeft: SIZES.radius,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
