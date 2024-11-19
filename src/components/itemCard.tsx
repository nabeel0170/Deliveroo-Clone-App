import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {MenuItemProps} from '../types/types';
import IconButton from './iconButton';
import {Colors} from '../constants/colors';

const MenuItemCard: React.FC<MenuItemProps> = ({
  title,
  description,
  price,
  calories,
  imageUrl,
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const renderImage = () => (
    <Image
      source={imageUrl}
      style={[styles.image, imageLoading && {display: 'none'}]}
      onLoadStart={() => setImageLoading(true)}
      onLoadEnd={() => setImageLoading(false)}
      resizeMode="cover"
    />
  );
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.infoText}>{calories} kcal</Text>
        <Text style={styles.infoText}>£.{price}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.imageContainer}>
          {imageLoading ? (
            <ActivityIndicator size="small" color={Colors.Primary} />
          ) : (
            renderImage()
          )}
        </View>
        <IconButton style={styles.addButton} icon="add-outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    maxHeight: 140,
    marginBottom: 3,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  descriptionText: {
    color: Colors.Secondary,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Regular',
  },
  infoText: {
    color: Colors.Secondary,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'IBMPlexSans-Regular',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  addButton: {
    height: 100,
    width: 40,
    borderWidth: 1,
    borderColor: '#DADCE0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  addButtonText: {
    color: '#04b8a9',
    fontSize: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
});

export default MenuItemCard;
