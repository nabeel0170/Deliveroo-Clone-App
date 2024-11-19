import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/header';
import {fetchMenuItems} from '../redux/thunks/fetchMenuItemsThunk';
import {fetchCategories} from '../redux/thunks/fetchCategoriesThunk';
import {AppDispatch} from '../redux/store';
import {selectMenuItems, selectCategories} from '../redux/slices/menuSlice';
import SearchModal from '../components/searchModal';
import MenuContent from '../components/menuContent';

const MenuScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector(selectMenuItems);
  const categories = useSelector(selectCategories);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (menuItems.length === 0) {
      dispatch(fetchMenuItems());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, menuItems.length, categories.length]);

  return (
    <View>
      {modalVisible ? (
        <>
          <SearchModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        </>
      ) : (
        <>
          <Header screen="Menu" setModalVisible={setModalVisible} />
          <MenuContent categories={categories} />
        </>
      )}
    </View>
  );
};

export default MenuScreen;
