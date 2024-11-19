import {Text, StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import {buttonProps} from '../types/types';
import {Colors} from './../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const Button: React.FC<buttonProps> = ({...props}) => {
  return (
    <View style={Styles.buttonContainer}>
      <Pressable
        onPress={props.disabled ? undefined : props.onPress}
        style={[Styles.button, props.style]}
        android_ripple={{
          color: Colors.ButtonRippleColor,
          borderless: false,
          radius: 200,
        }}
        disabled={props.disabled}>
        <Icon
          name={props.icon ? props.icon : ''}
          size={20}
          style={{
            marginRight: props.icon ? 15 : 0,
            color: props.iconColor ? props.iconColor : Colors.Primary,
          }}
        />
        <Text style={[Styles.buttonText, props.textStyle]}>
          {props.buttonText}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

const Styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
    minWidth: '90%',
  },
  button: {
    flexDirection: 'row',
    borderColor: Colors.Border,
    borderWidth: 1,
    borderRadius: 5,
    height: 48,
    maxHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'PlexSans-Regular',
    fontSize: 16,
  },
});
