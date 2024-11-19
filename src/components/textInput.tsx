import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {Colors} from './../constants/colors';
import {TextInputFieldProps} from '../types/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Controller} from 'react-hook-form';

const TextInputField: React.FC<TextInputFieldProps> = ({
  isSensitive,
  control,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textVisibility, setTextVisibility] = useState(false);

  return (
    <View style={styles.textInputContainer}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <Controller
        name={props.name}
        control={control}
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              {...props}
              style={[
                styles.textInput,
                isFocused && {borderColor: Colors.Primary},
              ]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isSensitive && !textVisibility}
            />
            {isSensitive && (
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setTextVisibility(!textVisibility)}>
                <Ionicons
                  name={textVisibility ? 'eye-off' : 'eye'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {error && (
        <Text style={styles.errorText}>
          {typeof error === 'string' ? error : error.message}
        </Text>
      )}
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  textInputContainer: {
    margin: 5,
  },
  textInput: {
    padding: 10,
    paddingRight: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Border,
    fontSize: 16,
    backgroundColor: '#fff',
    maxHeight: 48,
    height: 48,
  },
  label: {
    paddingBottom: 8,
    paddingRight: 5,
    fontSize: 16,
    fontFamily: 'PlexSans-Regular',
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  toggleText: {
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
