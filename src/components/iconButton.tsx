import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {iconButtonProps} from '../types/types';
import {Colors} from './../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton: React.FC<iconButtonProps> = ({icon, onPress, style}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[Styles.button, style]}
      android_ripple={{
        color: Colors.ButtonRippleColor,
        borderless: false,
      }}>
      <Icon
        name={icon}
        size={16}
        color={Colors.Primary}
        style={{
          textShadowRadius: 1,
        }}
      />
    </Pressable>
  );
};

export default IconButton;

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.Border,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    height: 35,
    width: 45,
  },
});
