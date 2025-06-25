//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import { Colors } from '../colors/Colors';

// create a component
const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            // navigation.navigate('LoginScreen');
            navigation.navigate('HomeScreen');
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer); // clean up
    }, []);

    return (
        <View style={styles.container}>
            {Platform.OS === 'android' && (<StatusBar backgroundColor={Colors.app_theme_color} />)}
            <Image
                style={{ width: "100%", height: '100%' }}
                resizeMode='cover'
                source={require('../assets/Images/splash_beej_ic.png')} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});

//make this component available to the app
export default SplashScreen;
