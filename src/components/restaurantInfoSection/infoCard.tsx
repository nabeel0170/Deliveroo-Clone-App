import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InfoCardProps} from '../../types/types';
import {Colors} from '../../constants/colors';

const InfoCard: React.FC<InfoCardProps> = ({...props}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons
        name={props.icon ? props.icon : ''}
        style={styles.iconStyle}
        color={props.iconColor}
      />
      <View>
        <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
        <Text style={[styles.text2, props.text2Style]}>{props.text2}</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        style={styles.icon2Style}
        color={Colors.Primary}
      />
    </TouchableOpacity>
  );
};

export default InfoCard;
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 24,
    padding: 5,
    paddingRight: 10,
  },
  icon2Style: {
    fontSize: 24,
    marginLeft: 'auto',
  },
  text: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
  },
  text2: {
    color: Colors.SecondaryText,
    fontSize: 14,
  },
});
