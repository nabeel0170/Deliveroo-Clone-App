import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {Colors} from '../constants/colors';
import {PopularFoodCardProps} from '../types/types';
import IconButton from './iconButton';

const PopularItemCard: React.FC<PopularFoodCardProps> = ({
  imageURL,
  name,
  calories,
  price,
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const renderImage = () => (
    <Image
      source={imageURL}
      style={[styles.image, imageLoading && {display: 'none'}]}
      onLoadStart={() => setImageLoading(true)}
      onLoadEnd={() => setImageLoading(false)}
      resizeMode="cover"
    />
  );
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {imageLoading ? (
          <ActivityIndicator size="small" color={Colors.Primary} />
        ) : (
          renderImage()
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.infoTextAndPrice}>{calories} kcal</Text>
        <Text style={styles.infoTextAndPrice}>£{price}</Text>
      </View>
      <View style={styles.addButtonContainer}>
        <IconButton icon="add-outline" style={styles.addButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 123,
    height: 266,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between',
    marginHorizontal: 8,
    elevation: 2,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  infoTextAndPrice: {
    fontSize: 13,
    color: Colors.Secondary,
    textAlign: 'center',
    paddingVertical: 3,
  },
  addButtonContainer: {
    alignItems: 'center',
    paddingBottom: 6,
    paddingHorizontal: 2,
  },
  addButton: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 4,
  },
});

export default PopularItemCard;
