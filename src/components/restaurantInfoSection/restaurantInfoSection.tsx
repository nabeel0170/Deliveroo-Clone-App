import {View, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import Button from '../button';
import RestaurantInfo from './restaurantInfo';

const RestaurantInfoSection = () => {
  const backgroundImage = require('../../assets/food-items/main-bg.webp');
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageContainer}
        source={backgroundImage}
        resizeMode="cover">
        <View style={styles.buttonContainer}>
          <Button
            buttonText="Start group order"
            icon="people-outline"
            style={{
              maxWidth: 200,
              maxHeight: 42,
              backgroundColor: 'white',
              paddingHorizontal: 10,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </ImageBackground>
      <RestaurantInfo />
    </View>
  );
};

export default RestaurantInfoSection;

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    height: 220,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: 'auto',
  },
});
