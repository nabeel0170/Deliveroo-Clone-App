import React from 'react';
import {ScrollView, View} from 'react-native';
import Header from '../components/header';
import AuthForm from '../components/authForm';
import Footer from '../components/footer/footer';

const LoginScreen: React.FC = () => {
  return (
    <View>
      <Header screen="login" />
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <AuthForm />
        <Footer />
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
