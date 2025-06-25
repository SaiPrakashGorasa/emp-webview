//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Colors } from '../../colors/Colors';
import { useNavigation } from '@react-navigation/native';

// create a component
const HomeScreen = () => {
    const navigation=useNavigation()
    const naviagtionWeather = () => {
        navigation.navigate('WeatherScreen', {
                itemData: {
                    "coord": {
                        "lat": 17.4907,
                        "lon": 78.4146
                    },
                    "country": "IN",
                    "id": 1265767,
                    "name": "Kūkatpalli",
                    "population": 341709,
                    "timezone": 19800,
                    "todaysForecast": [
                        {
                            "date": "21-Jun-2025",
                            "humidity": 51,
                            "icon": "04d",
                            "max_temp": 32.49,
                            "min_temp": 23.97,
                            "rain": 0,
                            "speed": 8.61,
                            "weather_description": "overcast clouds"
                        }
                    ],
                    "weeklyForecast": [
                        {
                            "date": "21-Jun-2025 12:00:00",
                            "day": "Today",
                            "humidity": 51,
                            "icon": "04d",
                            "max_temp": 32.49,
                            "min_temp": 23.97,
                            "rain": 0,
                            "weather_description": "overcast clouds"
                        },
                        {
                            "date": "22-Jun-2025 12:00:00",
                            "day": "Tomorrow",
                            "humidity": 41,
                            "icon": "04d",
                            "max_temp": 33.63,
                            "min_temp": 23.96,
                            "rain": 0,
                            "weather_description": "broken clouds"
                        },
                        {
                            "date": "23-Jun-2025 12:00:00",
                            "day": "Monday",
                            "humidity": 46,
                            "icon": "04d",
                            "max_temp": 32.71,
                            "min_temp": 24.2,
                            "rain": 0,
                            "weather_description": "overcast clouds"
                        },
                        {
                            "date": "24-Jun-2025 12:00:00",
                            "day": "Tuesday",
                            "humidity": 44,
                            "icon": "04d",
                            "max_temp": 31.87,
                            "min_temp": 23.44,
                            "rain": 0,
                            "weather_description": "overcast clouds"
                        },
                        {
                            "date": "25-Jun-2025 12:00:00",
                            "day": "Wednesday",
                            "humidity": 52,
                            "icon": "04d",
                            "max_temp": 30.25,
                            "min_temp": 24.23,
                            "rain": 0,
                            "weather_description": "overcast clouds"
                        }
                    ]
                }, latitude: 17.490521666666666, longitude: 78.41452666666667
            })
    } 
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.halfCircle}>
                    <Image
                        source={require('../../assets/Images/ic_logo_beej.png')} // your logo
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.profileContainer}>
                    <View style={[styles.flexDirection_row, { width: "60%", alignSelf: 'center' }]}>
                        <View style={styles.circleBackground}>
                            <Image
                                style={styles.profileImage}
                                source={require('../../assets/Images/ic_logo_beej.png')}
                                resizeMode='contain' />
                        </View>

                        <View style={{paddingLeft : 10}}>
                            <View style={{flexDirection:'row', alignSelf:'center'}}>
                                <Text style={[styles.greetingstText]}>{"Good Morning"}</Text>
                                <Image source={require('../../assets/Images/smileIconImg.png')} style={[styles.smileIcon]} />
                            </View>
                            <Text style={[styles.userNameText]}>{"Kiran Kumar"}</Text>
                        </View>

                    </View>
                    <View style={{ width: "40%", backgroundColor: 'grey' }}>

                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("CropDiagonstic")} style={{borderWidth:1,height:50}}>
                <Text>Crop_Diagnostic</Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={naviagtionWeather} style={{borderWidth:1,height:50}}>
                <Text>weather</Text>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default HomeScreen;
