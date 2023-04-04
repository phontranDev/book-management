import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@src/constants';

const categories = [
  {
    id: 0,
    name: 'Top Rating',
  },
  {
    id: 1,
    name: 'Popular',
  },
  {
    id: 2,
    name: 'Graphic Design',
  },
  {
    id: 3,
    name: 'UX/UI',
  },
  {
    id: 4,
    name: 'Top Rating',
  },
];

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSelectedCategory = id => {
    setSelectedCategory(id);
  };

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSelectedCategory(item.id)}
              style={{marginRight: SIZES.padding}}>
              <Text
                style={[
                  FONTS.h3,
                  {
                    color:
                      selectedCategory === item.id
                        ? COLORS.black
                        : COLORS.lightGray4,
                  },
                ]}>
                {item.name}
              </Text>
              {selectedCategory === item.id && (
                <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#111',
                    width: '50%',
                    borderRadius: SIZES.radius,
                    height: 5,
                    marginTop: 10,
                  }}></View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategorySelection;

const styles = StyleSheet.create({
  categoriesContainer: {
    width: '100%',
  },
});
