import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SevenDaysWeatherForecast} from "./components/SevenDaysWeatherForecast";
import {PastDayWeatherForecast} from "./components/PastDayWeatherForecast";

const image = require('./assets/images/background.png');

export default function App() {
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={image}
                             style={styles.image}>
                <View style={styles.viewTitle}>
                    <Text style={styles.text1}>Weather</Text>
                    <Text style={styles.text2}>forecast</Text>
                    <SevenDaysWeatherForecast/>
                    <PastDayWeatherForecast/>
                    <Text style={styles.text3}>C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#373AF5',
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        viewTitle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 65,
        },
        text1: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 32,
            lineHeight: 32,
            color: '#FFFFFF',
            marginRight: 110,

        },
        text2: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 32,
            lineHeight: 32,
            color: '#FFFFFF',
            marginLeft: 110,
            marginTop: -8,
        },
        text3: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 18,
            color: '#FFFFFF',
            alignSelf: "center",
            opacity: 0.6,
            marginBottom: 10,
            // marginTop: -8,
        },
    }
);
