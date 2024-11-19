import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import InfoCard from './infoCard';
import DeliveryOptionsCard from './deliveryOptionsCard';

const RestaurantInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>Tossed - St Martin's Lane</Text>
      <Text style={styles.information}>
        Chicken {'\u2022'} Salads {'\u2022'} Healthy
      </Text>
      <Text style={styles.information2}>
        0.20 miles away {'\u2022'} Opens at 11.00 {'\u2022'} £7.00 {'\n'}
        minimum {'\u2022'} £0.49 delivery
      </Text>
      <InfoCard
        icon="information-circle-outline"
        iconColor={Colors.SecondaryIcon}
        text="Info"
        text2="Map, allergens and hygiene rating"
      />
      <InfoCard
        icon="star"
        iconColor={Colors.Green}
        text="4.7 Excellent"
        text2="See all 500 reviews"
        textStyle={{color: Colors.Green}}
      />
      <DeliveryOptionsCard />
    </View>
  );
};

export default RestaurantInfo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  restaurantName: {
    fontFamily: 'stratos-bold',
    fontSize: 28,
    color: Colors.Secondary,
  },
  information: {
    letterSpacing: 0.3,
    fontSize: 16,
    fontFamily: 'IBMPlexSans-Regular',
    color: Colors.Secondary,
  },
  information2: {
    letterSpacing: 0.3,
    fontSize: 16,
    paddingTop: 4,
    fontFamily: 'IBMPlexSans-Regular',
    color: Colors.Secondary,
  },
});
