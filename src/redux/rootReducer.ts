import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user'],
};
const userConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['authenticationState', 'isLoading'],
};

const rootReducer = combineReducers({
  user: persistReducer(userConfig, userReducer),
  menu: menuReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
