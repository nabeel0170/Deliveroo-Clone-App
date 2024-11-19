import TextInputField from './textInput';
import {
  emailValidationSchema,
  loginValidationSchema,
  signUpValidationSchema,
} from '../schemas/authSchemas';
import Form from './form';
import {AuthFormNavigationProp, FormData} from '../types/types';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ApiEndpoints} from '../constants/apiEndpoints';
import useAxios from '../hooks/useAxios';
import {
  LoginResponse,
  loginThunk,
  resetRequestError,
  setEmail,
  setLogin,
  verifyEmailThunk,
} from '../redux/slices/userSlice';
import {ENCRYPTION_KEY} from '@env';
import CryptoJS from 'react-native-crypto-js';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks/hooks';

const secretEncryptionKey = ENCRYPTION_KEY;
const screenHeight = Dimensions.get('window').height - 54;

const AuthForm: React.FC = () => {
  const navigation = useNavigation<AuthFormNavigationProp>();
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);
  const isLoading = userState.isLoading;
  const {fetchData} = useAxios();
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>();

  useEffect(() => {
    setFormErrors({});
  }, [userState.authenticationState]);

  const handleSubmit = (formData: FormData) => {
    switch (userState.authenticationState) {
      case '': {
        dispatch(setEmail());
        break;
      }
      case 'email': {
        verifyEmail(formData);
        break;
      }
      case 'login': {
        login(formData);
        break;
      }
      case 'signup': {
        signUp(formData);
        break;
      }
    }
  };

  const verifyEmail = async (formData: FormData) => {
    dispatch(verifyEmailThunk(formData));
    if (userState.requestError) {
      Alert.alert('Oops!', 'Something went wrong, please try again later', [
        {text: 'close', onPress: () => dispatch(resetRequestError())},
      ]);
    }
  };

  const login = async (formData: FormData) => {
    const {email, password} = formData;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretEncryptionKey,
    ).toString();
    const FormData = {email: email, encryptedPassword: encryptedPassword};
    const result = await dispatch(loginThunk(FormData));
    const payload = result.payload as LoginResponse;

    if (result.meta.requestStatus === 'fulfilled') {
      if (payload.success) {
        navigation.navigate('Menu');
        dispatch(resetRequestError());
      } else {
        setFormErrors({
          password: 'Invalid Credentials',
        });
      }
    } else {
      Alert.alert('Oops!', 'Something went wrong, please try again later', [
        {
          text: 'close',
          onPress: () => dispatch(resetRequestError()),
        },
      ]);
    }
  };

  const signUp = async (formData: FormData) => {
    const {fullName, password, contactNumber, email} = formData;
    const data = {
      password,
      name: fullName,
      contactNumber,
      email,
    };

    const result = await fetchData({
      url: `${ApiEndpoints.SIGNUP}`,
      method: 'POST',
      data: {data},
    });
    if (result) {
      const {success} = result;

      if (success) {
        dispatch(setLogin());
        Alert.alert(
          'Success',
          'Your account has been created. Please log in.',
          [{text: 'OK'}],
        );
      } else {
        setFormErrors({
          email: 'Email already taken please try again with a different email',
        });
      }
    }

    if (result.err) {
      Alert.alert('Oops!', 'Something went wrong, please try again later', [
        {text: 'close'},
      ]);
    }
  };

  const renderLoginForm = () => {
    return (
      <Form
        validationSchema={loginValidationSchema}
        submitHandler={handleSubmit}
        formErrors={formErrors}>
        <TextInputField
          placeholder="you@example.com"
          label="Email address"
          name="email"
          inputMode="email"
        />
        <TextInputField
          placeholder="Password"
          label="Password"
          isSensitive={true}
          name="password"
          onChange={() => {
            setFormErrors({password: ''});
          }}
        />
      </Form>
    );
  };

  const renderSignupForm = () => {
    return (
      <Form
        validationSchema={signUpValidationSchema}
        submitHandler={handleSubmit}
        formErrors={formErrors}>
        <TextInputField
          placeholder="Your Name Here"
          label="Name"
          name="fullName"
        />
        <TextInputField
          placeholder="you@example.com"
          label="Email address"
          name="email"
          inputMode="email"
          onChange={() => {
            setFormErrors({email: ''});
          }}
        />
        <TextInputField
          placeholder="Enter Your Phone Number"
          label="Contact Number"
          name="contactNumber"
          inputMode="tel"
        />
        <TextInputField
          placeholder="Create a Password"
          label="Password"
          isSensitive={true}
          name="password"
        />
        <TextInputField
          placeholder="Repeat your Password"
          label="Repeat Password"
          isSensitive={true}
          name="repeatedPassword"
        />
      </Form>
    );
  };

  const renderEmailForm = useCallback(() => {
    return (
      <Form
        validationSchema={emailValidationSchema}
        submitHandler={handleSubmit}>
        <TextInputField
          placeholder="you@example.com"
          label="Email address"
          name="email"
          inputMode="email"
        />
      </Form>
    );
  }, [userState.authenticationState === 'email']);

  const renderDefaultForm = useCallback(() => {
    return <Form submitHandler={handleSubmit} />;
  }, [userState.authenticationState === '']);

  const renderForms = () => {
    switch (userState.authenticationState) {
      case 'login':
        return renderLoginForm();

      case 'signup':
        return renderSignupForm();

      case 'email':
        return renderEmailForm();

      case '':
        return renderDefaultForm();
    }
  };

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  ) : (
    renderForms()
  );
};

export default AuthForm;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: screenHeight,
  },
});
