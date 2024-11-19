import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DeliveryOptionsCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="bicycle" style={styles.icon} />
      <Text style={styles.text}>Deliver from 11:15 - 11:45</Text>
      <Text style={styles.text2}>Change</Text>
    </TouchableOpacity>
  );
};

export default DeliveryOptionsCard;
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
    color: Colors.Primary,
    marginLeft: 'auto',
  },
  icon: {
    fontSize: 28,
    padding: 5,
    paddingRight: 10,
  },
});
