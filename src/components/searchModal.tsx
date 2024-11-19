import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ModalComponent from './modal';
import {FoodItems, SearchModalProps} from '../types/types';
import SearchInput from './searchInput';
import MenuItemCard from './itemCard';
import {Colors} from '../constants/colors';

const SearchModal: React.FC<SearchModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [items, setItems] = useState<FoodItems>([]);
  return (
    <ModalComponent
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SearchInput setModalVisible={setModalVisible} setItems={setItems} />
          <FlatList
            data={items}
            keyExtractor={item => item.name}
            style={styles.itemsContainer}
            renderItem={items => (
              <MenuItemCard
                calories={items.item.calories ?? 0}
                description={items.item.description}
                imageUrl={{uri: items.item.image}}
                price={items.item.price ?? 0}
                title={items.item.name}
              />
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </ModalComponent>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ItemsBackground,
  },
  itemsContainer: {
    marginTop: 10,
  },
});
