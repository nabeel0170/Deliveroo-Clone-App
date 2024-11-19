import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants/colors';
import IconButton from './iconButton';
import {headerProps} from '../types/types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {setLoggedOut} from '../redux/slices/userSlice';

const Header: React.FC<headerProps> = ({...props}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(setLoggedOut());
  };

  return (
    <View style={Styles.Container}>
      <Image
        source={require('../assets/deliveroo-logo.png')}
        style={Styles.Logo}
      />

      <View style={Styles.IconButtonsContainer}>
        {props.screen !== 'login' && (
          <IconButton
            icon="search-outline"
            style={{marginRight: 10}}
            onPress={() => props.setModalVisible && props.setModalVisible(true)}
          />
        )}

        {/* <IconButton icon="home-outline" style={{ marginRight: 10 }} /> */}
        {isLoggedIn ? (
          <IconButton icon="log-out-outline" onPress={handleLogout} />
        ) : (
          <IconButton icon="person-outline" />
        )}
      </View>
    </View>
  );
};

export default Header;

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    height: 54,
    borderBottomColor: Colors.Border,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  Logo: {
    height: 30,
    width: 118,
  },
  IconButtonsContainer: {
    flexDirection: 'row',
  },
});
