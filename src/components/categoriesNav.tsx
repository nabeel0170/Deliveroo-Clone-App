import React, {useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import {CategoriesNavProps} from '../types/types';
import {Colors} from '../constants/colors';

const CategoriesNav: React.FC<CategoriesNavProps> = ({
  categories,
  sectionRefs,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePress = (
    categoryId: number,
    categoryName: string,
    index: number,
  ) => {
    setSelectedId(categoryId);
    scrollToSection(categoryName);
    if (scrollViewRef.current && itemWidths.length > 0) {
      const totalWidthBeforeSelectedItem = itemWidths
        .slice(0, index)
        .reduce((acc, width) => acc + width, 0);
      const buttonPadding = 14;
      const scrollToXPosition = totalWidthBeforeSelectedItem + buttonPadding;
      scrollViewRef.current.scrollTo({
        x: scrollToXPosition,
        animated: true,
      });
    }
  };

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    const width = event.nativeEvent.layout.width;
    setItemWidths(prevWidths => {
      const updatedWidths = [...prevWidths];
      updatedWidths[index] = width;
      return updatedWidths;
    });
  };

  const scrollToSection = (categoryName: string) => {
    const sectionIndex = categories.findIndex(
      category => category.name === categoryName,
    );

    if (sectionIndex !== -1 && sectionRefs.current) {
      sectionRefs.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        style={styles.scrollView}>
        {categories.map((category, index) => (
          <View
            style={styles.categoryButtonContainer}
            key={category.id}
            onLayout={event => handleLayout(event, index)}>
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedId === category.id ? Colors.Primary : 'white',
                },
              ]}
              onPress={() => handlePress(category.id, category.name, index)}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedId === category.id ? 'white' : Colors.Primary,
                  },
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 73,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.Border,
    elevation: 3,
    paddingHorizontal: 12,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  categoryButtonContainer: {
    paddingRight: 18,
    justifyContent: 'center',
    height: 73,
    paddingHorizontal: 3,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 16,
    color: '#00CCBC',
  },
});

export default CategoriesNav;
