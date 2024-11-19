import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/colors';
import {useForm} from 'react-hook-form';
import {FormProps, TextInputFieldProps} from '../types/types';
import * as Yup from 'yup';
import Button from './button';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks/hooks';
import {setLogin, setSignUp} from '../redux/slices/userSlice';
import {yupResolver} from '@hookform/resolvers/yup';

const screenHeight = Dimensions.get('window').height - 54;

const Form = <T extends Yup.AnyObject>({
  validationSchema,
  submitHandler,
  children,
  formErrors = {},
}: FormProps<T>) => {
  const [buttonText, setButtonText] = useState<string>('Continue with email');
  const [formKey, setFormKey] = useState(0);
  const [
    title,
    // setTitle
  ] = useState<string>('Sign up or log in');

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm<T>({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    mode: 'onChange',
  });
  const userState = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleFormReset = () => {
    // Reset all form values to empty
    const emptyValues = {} as T;
    reset(emptyValues);

    // Force form fields to remount
    setFormKey(prev => prev + 1);
  };

  useEffect(() => {
    handleFormReset();
    switch (userState.authenticationState) {
      case '': {
        setButtonText('Continue with email');
        break;
      }
      case 'login': {
        setButtonText('Login');
        break;
      }
      case 'signup': {
        setButtonText('Sign Up');
        break;
      }
      case 'email': {
        setButtonText('Continue');
        break;
      }
    }
    reset();
  }, [userState.authenticationState]);

  return (
    <View style={styles.formContainer}>
      <Text
        style={[
          styles.title,
          {
            alignSelf:
              userState.authenticationState === '' ? 'center' : 'flex-start',
          },
        ]}>
        {title}
      </Text>
      {React.Children.map(children, child => {
        if (React.isValidElement<TextInputFieldProps>(child)) {
          const fieldName = child.props.name;
          return React.cloneElement(child, {
            control,
            error: errors[fieldName]?.message || formErrors[fieldName],
            key: `${fieldName}-${userState.authenticationState}-${formKey}`,
            defaultValue: '',
          });
        }
        return child;
      })}
      <Button
        buttonText={buttonText}
        onPress={handleSubmit(submitHandler)}
        disabled={!isValid}
        style={{
          backgroundColor:
            (userState.authenticationState === 'signup' && isValid) ||
            (userState.authenticationState === 'login' && isValid)
              ? Colors.Primary
              : userState.authenticationState === ''
              ? Colors.Primary
              : !isValid
              ? Colors.DisabledButton
              : Colors.Primary,
        }}
        textStyle={{
          fontWeight:
            userState.authenticationState === 'email' ||
            userState.authenticationState === 'login' ||
            userState.authenticationState === 'signup'
              ? 'bold'
              : 'normal',
          color:
            userState.authenticationState === '' && isValid
              ? 'white'
              : !isValid &&
                (userState.authenticationState === 'email' ||
                  userState.authenticationState === 'login' ||
                  userState.authenticationState === 'signup')
              ? Colors.DisabledText
              : 'white',
        }}
        icon={userState.authenticationState === '' ? 'mail-outline' : undefined}
        iconColor={'white'}
      />
      {userState.authenticationState === 'login' && (
        <Button
          buttonText="Sign Up"
          onPress={() => userState.authenticationState && dispatch(setSignUp())}
          textStyle={{color: Colors.Primary}}
        />
      )}
      {userState.authenticationState === 'signup' && (
        <Button
          buttonText="Login"
          onPress={() => userState.authenticationState && dispatch(setLogin())}
          textStyle={{color: Colors.Primary}}
        />
      )}
      {(userState.authenticationState === 'email' ||
        userState.authenticationState === 'login') && (
        <Button
          buttonText="Forgot Password ?"
          onPress={handleSubmit(submitHandler)}
          textStyle={{color: Colors.Primary}}
        />
      )}
    </View>
  );
};
export default Form;

const styles = StyleSheet.create({
  title: {
    margin: 5,
    fontSize: 24,
    fontFamily: 'PlexSans-Bold',
  },
  formContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    maxHeight: screenHeight,
    minHeight: screenHeight,
    height: '100%',
  },
});
