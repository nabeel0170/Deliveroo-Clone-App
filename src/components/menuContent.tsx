import {Text, StyleSheet, SectionList, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FoodItem, ItemSectionProps} from '../types/types';
import MenuItemCard from './itemCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectMenuItems} from '../redux/slices/menuSlice';
import Footer from './footer/footer';
import RestaurantInfoSection from './restaurantInfoSection/restaurantInfoSection';
import CategoriesNav from './categoriesNav';
import PopularItemsSection from './popularItemsSection';
import {AppDispatch} from '../redux/store';
import {fetchMenuItems} from '../redux/thunks/fetchMenuItemsThunk';
import {fetchCategories} from '../redux/thunks/fetchCategoriesThunk';
import {Colors} from '../constants/colors';

const MenuContent: React.FC<ItemSectionProps> = ({categories}) => {
  const menuItems = useSelector(selectMenuItems);
  const dispatch = useDispatch<AppDispatch>();
  const sectionRef = useRef<SectionList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [restaurantInfoHeight, setRestaurantInfoHeight] = useState(0);

  useEffect(() => {
    if (menuItems.length === 0) {
      dispatch(fetchMenuItems());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, menuItems.length, categories.length]);

  const renderItem = ({item}: {item: FoodItem}) => (
    <MenuItemCard
      key={item.name}
      title={item.name}
      description={item.description}
      imageUrl={{uri: item.image}}
      price={item.price ?? 0}
      calories={item.calories ?? 0}
    />
  );

  const renderHeaderComponents = () => (
    <View style={{backgroundColor: 'white'}}>
      <View
        onLayout={({nativeEvent}) => {
          setRestaurantInfoHeight(nativeEvent.layout.height);
        }}>
        <RestaurantInfoSection />
      </View>
      <CategoriesNav categories={categories} sectionRefs={sectionRef} />
      <PopularItemsSection menuItems={menuItems} />
    </View>
  );

  const translateY = scrollY.interpolate({
    inputRange: [0, restaurantInfoHeight, restaurantInfoHeight],
    outputRange: [-restaurantInfoHeight, -restaurantInfoHeight, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.Container}>
      <Animated.View
        style={[
          styles.stickyHeaderContainer,
          {
            transform: [{translateY}],
          },
        ]}>
        <CategoriesNav categories={categories} sectionRefs={sectionRef} />
      </Animated.View>
      <Animated.SectionList
        style={styles.sectionListContainer}
        ref={sectionRef}
        scrollEnabled={true}
        sections={categories.map(category => ({
          title: category.name,
          data: menuItems,
        }))}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListFooterComponent={<Footer />}
        ListHeaderComponent={renderHeaderComponents}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default MenuContent;
const styles = StyleSheet.create({
  header: {
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  Container: {
    paddingBottom: 100,
  },
  sectionListContainer: {
    backgroundColor: Colors.ItemsBackground,
  },
  stickyHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
});
