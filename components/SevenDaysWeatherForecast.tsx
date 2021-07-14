import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Select} from "./Select";
import React, {useState} from "react";
import {months} from "../constants/months";

const cloud = require('../assets/images/Academy-Weather-bg160.png');

export const SevenDaysWeatherForecast = () => {

    const [isContent, setIsContent] = useState(false);
    const [sevenDaysWeatherForecast, setSevenDaysWeatherForecast] = useState([[]]);

    const Cards = () => {
        const cards: any = [];
        [0, 1, 2, 3, 4, 5, 6].forEach((i) => {
                if (sevenDaysWeatherForecast[i] !== undefined) {
                    cards.push(
                        <View style={styles.card}>
                            <Text style={styles.date}>{sevenDaysWeatherForecast[i][0]}</Text>
                            <Image style={styles.weatherIcon} source={{uri: sevenDaysWeatherForecast[i][1]}}/>
                            <Text style={styles.temp}>{sevenDaysWeatherForecast[i][2]}</Text>
                        </View>
                    )
                }
            }
        );

        return (
            <ScrollView horizontal style={styles.cardsLayout}>
                {cards}
            </ScrollView>
        )
    }

    const Content = () => {
        if (!isContent) {
            return (
                <View style={styles.emptyCardLayout}>
                    <Image style={styles.cloudImg} source={cloud}/>
                    <Text style={styles.emptyText}>Fill in all the fields and the weather will be displayed</Text>
                </View>
            )
        } else return (
            <Cards/>
        )
    }

    const getSevenDaysWeatherForecast = (latitude: number, longitude: number) => {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=ac075ea5cfa4018b69bccf57516490d5', {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let dataArray: any = [];
                [1, 2, 3, 4, 5, 6, 7].forEach((i) => {
                        const date = new Date(data.daily[i].dt * 1000);
                        dataArray.push([
                            date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear(),
                            "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png",
                            (Math.round(data.daily[i].temp.day - 273.15) > 0 ? '+' + Math.round(data.daily[i].temp.day - 273.15) + '°' : '-' + Math.round(data.daily[i].temp.day - 273.15) + '°')])
                    }
                );
                setSevenDaysWeatherForecast(dataArray);
                setIsContent(true);
            });
    }

    return (
        <View style={styles.mainCard}>
            <Text style={styles.title}>7 Days Forecast</Text>
            <Select placeholder='Select city' action={getSevenDaysWeatherForecast}/>
            <Content/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor: '#FFFFFF',
        shadowOffset: {width: 4, height: 4,},
        shadowColor: 'rgba(4, 5, 73, 0.25)',
        shadowOpacity: 1.0,
        borderRadius: 8,
        width: 300,
        height: 464,
        marginTop: 25
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 32,
        color: '#2C2D76',
        marginTop: 34,
        marginLeft: 24,
        marginRight: 24,
    },
    emptyCardLayout: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 24,
        marginRight: 24,
    },
    emptyText: {
        marginTop: 25,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        color: '#8083A4',
    },
    cloudImg: {
        width: 160,
        height: 160,

    },
    cardsLayout: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 24,
    },
    card: {
        backgroundColor: '#373AF5',
        borderColor: '#373AF5',
        borderRadius: 8,
        borderWidth: 2,
        shadowOffset: {width: 4, height: 4,},
        shadowColor: 'rgba(4, 5, 73, 0.25)',
        shadowOpacity: 1.0,
        width: 174,
        height: 238,
        marginRight: 24,
        marginLeft: 24,
    },
    date: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF',
        marginTop: 20,
        marginLeft: 20,
    },
    weatherIcon: {
        width: 120,
        height: 120,
        marginTop: 15,
        marginLeft: 27,
    },
    temp: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 32,
        color: '#FFFFFF',
        marginTop: 7,
        marginLeft: 87,
    },
});