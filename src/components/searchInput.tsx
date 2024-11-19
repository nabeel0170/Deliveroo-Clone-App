import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SearchInputProps} from '../types/types';
import {useAppSelector} from '../redux/hooks/hooks';
import {selectMenuItems} from '../redux/slices/menuSlice';

const SearchInput: React.FC<SearchInputProps> = ({
  setModalVisible,
  setItems,
}) => {
  const [search, setSearch] = useState<string>('');
  const menuItems = useAppSelector(selectMenuItems);

  const clearSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    const filteredItems = menuItems.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
    setItems(filteredItems);
  }, [search]);
  return (
    <View style={styles.searchContainer}>
      <Pressable
        onPress={() => setModalVisible(false)}
        style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.Primary} />
      </Pressable>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    height: 'auto',
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
    maxHeight: 45,
    minHeight: 45,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
  },
  clearButton: {
    padding: 10,
  },
});
