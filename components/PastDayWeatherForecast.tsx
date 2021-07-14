import {Image, StyleSheet, Text, View} from "react-native";
import {Select} from "./Select";
import {Datepicker} from "./Datepicker";
import React, {useState} from "react";
import {months} from "../constants/months";

const cloud = require('../assets/images/Academy-Weather-bg160.png');

export const PastDayWeatherForecast = () => {

    const [coordinates, setCoordinates] = useState({
        lat: 0,
        lon: 0,
    });
    const [date, setDate] = useState<Date>();
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [isCityPicked, setIsCityPicked] = useState(false);
    const [isDatePicked, setIsDatePicked] = useState(false);
    const [pastDayWeatherForecast, setPastDayWeatherForecast] = useState(["", "", ""]);

    const handleFormChange = (latitude?: number, longitude?: number) => {
        if (latitude && longitude) {
            setCoordinates({
                lat: latitude,
                lon: longitude,
            });
            setIsRequestDone(false);
            setIsCityPicked(true);
        } else {
            setIsRequestDone(false);
            setIsDatePicked(true);
        }
    }

    const Card = () => {
        return (
            <View style={styles.cardsLayout}>
                <View style={styles.card}>
                    <Text style={styles.date}>{pastDayWeatherForecast[0][0]}</Text>
                    <Image style={styles.weatherIcon} source={{uri: pastDayWeatherForecast[0][1]}}/>
                    <Text style={styles.temp}>{pastDayWeatherForecast[0][2]}</Text>
                </View>
            </View>
        );
    }

    const Content = () => {
        if (!isCityPicked || !isDatePicked) {
            return (
                <View style={styles.emptyCardLayout}>
                    <Image style={styles.cloudImg} source={cloud}/>
                    <Text style={styles.emptyText}>Fill in all the fields and the weather will be displayed</Text>
                </View>
            )
        }
        if (!isRequestDone) {
            fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&dt=' + Math.round(date.getTime() / 1000) + '&appid=ac075ea5cfa4018b69bccf57516490d5', {
                method: 'GET',
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let dataArray: any = [];
                    const date = new Date(data.current.dt * 1000);
                    const weatherIcon = data.current.weather[0].icon.replace('n', 'd');
                    dataArray.push([
                        date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear(),
                        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png",
                        (Math.round(data.current.temp - 273.15) > 0 ? '+' + Math.round(data.current.temp - 273.15) + '°' : '-' + Math.round(data.current.temp - 273.15) + '°')]);
                    setPastDayWeatherForecast(dataArray);
                    setIsRequestDone(true);
                    setIsCityPicked(true);
                });
        }
        return (
            <Card/>
        )
    }

    return (
        <View style={styles.mainCard}>
            <Text style={styles.title}>Forecast for a Date in the Past</Text>
            <Select placeholder={'Select city'} action={handleFormChange}/>
            <Datepicker placeholder={'Select date'} setDate={setDate} action={handleFormChange}/>
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
            height: 576,
            marginTop: 25,
            marginBottom: 50,
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
            marginLeft: 24,
            marginTop: 24,
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
        card: {
            backgroundColor: '#373AF5',
            borderColor: '#373AF5',
            borderRadius: 8,
            borderWidth: 2,
            shadowOffset: {width: 4, height: 4,},
            shadowColor: 'rgba(4, 5, 73, 0.25)',
            shadowOpacity: 1.0,
            width: 252,
            height: 238,
            marginRight: 24,
        },
        weatherIcon: {
            width: 120,
            height: 120,
            marginTop: 15,
            alignSelf: "center"
        },
        temp: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 32,
            lineHeight: 32,
            color: '#FFFFFF',
            marginTop: 7,
            marginLeft: 165,
        }
    }
);
