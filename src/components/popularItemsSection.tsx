import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PopularItemCard from './popularItemCard';
import {PopularItemsProps} from '../types/types';

const PopularItemsSection: React.FC<PopularItemsProps> = ({menuItems}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>Adults need around 2000 kcal a day</Text>
      <Text style={styles.messageText2}>Popular with other people</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.scrollContainer}>
        {menuItems.map(item => (
          <PopularItemCard
            key={item.name}
            name={item.name}
            imageURL={{uri: item.image}}
            price={item.price ?? 0}
            calories={item.calories ?? 0}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularItemsSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  scrollContainer: {
    height: 275,
  },
  messageText: {
    marginHorizontal: 5,
    paddingTop: 20,
    paddingBottom: 5,
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 14,
  },
  messageText2: {
    marginHorizontal: 5,
    paddingVertical: 15,
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: 18,
  },
});
