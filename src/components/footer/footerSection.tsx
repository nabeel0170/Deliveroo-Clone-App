import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {FooterSectionProps} from '../../types/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const FooterSection: React.FC<FooterSectionProps> = ({listItem, ...props}) => {
  // use useCallback
  const renderListItems = () => {
    return listItem?.map((item, index) => (
      <Pressable
        key={index}
        style={styles.listItem}
        android_ripple={{
          color: Colors.ButtonRippleColor,
          borderless: false,
          radius: 220,
        }}>
        <Text style={styles.listItemText}>{item}</Text>
      </Pressable>
    ));
  };

  const renderImages = () => {
    return props.image?.map((src, index) => (
      <Image key={index} source={src} style={styles.image} />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {listItem && listItem.length > 0 && <>{renderListItems()}</>}
      {props.image && props.image.length > 0 && <>{renderImages()}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404a4a',
    marginVertical: 10,
    padding: 24,
    minWidth: '90%',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PlexSans-Regular',
    fontWeight: 'bold',
    paddingBottom: 16,
    marginLeft: 5,
  },
  list: {
    padding: 0,
    margin: 0,
    alignSelf: 'flex-start',
  },
  listItem: {
    marginBottom: 11,
    alignSelf: 'flex-start',
    padding: 5,
  },
  listItemText: {
    color: 'white',
    textDecorationLine: 'none',
    fontSize: 14,
    fontFamily: 'PlexSans-Regular',
  },
  image: {
    width: 140,
    height: 40,
    marginBottom: 10,
    resizeMode: 'stretch',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default FooterSection;
