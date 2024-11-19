import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {footerItems} from '../../data/footerItems';
import {Colors} from '../../constants/colors';
import FooterSection from './footerSection';

const Footer: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.footerContainer}>
      <View>
        {footerItems.map(item => (
          <FooterSection
            key={item.id}
            title={item.title}
            listItem={item.items}
            image={item.images}
          />
        ))}
      </View>
      <View style={styles.footerRow}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/social-media-icons/facebook.png')}
            style={styles.icon}
          />
          <Image
            source={require('../../assets/social-media-icons/twitter.png')}
            style={styles.icon}
          />
          <Image
            source={require('../../assets/social-media-icons/instagram.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.footerBottomRowText}>© 2024 Deliveroo</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#2e3333',
    alignItems: 'center',
    paddingVertical: 18,
  },
  footerBottom: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    minWidth: 150,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 18,
    tintColor: 'white',
  },
  footerBottomRowText: {
    fontSize: 12,
    color: Colors.SecondaryText,
  },
});

export default Footer;
