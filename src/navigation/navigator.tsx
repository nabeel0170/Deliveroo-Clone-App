import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import MenuScreen from '../screens/menuScreen';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {Colors} from '../constants/colors';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="small" color={Colors.Primary} />;
      </View>
    );
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: '#fff'},
          }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Menu" component={MenuScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
