import {StyleSheet, Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, {useState} from "react";
import {cities} from "../constants/cities";

type TSelect = {
    placeholder: string,
    action: any,
}

export const Select = (props: TSelect) => {

    const [selectValue, setSelectValue] = useState(props.placeholder);

    return (
        <RNPickerSelect
            onValueChange={(value, index) => {
                if (index !== 0) {
                    setSelectValue(cities[index - 1].label);
                    props.action(value.lat, value.lon);
                } else {
                    setSelectValue(props.placeholder);
                }
            }}
            items={cities}
        >
            <View style={styles.layout}>
                <Text style={styles.text}>{selectValue}</Text>
            </View>
        </RNPickerSelect>
    );
};

const styles = StyleSheet.create({
        layout: {
            width: 252,
            marginLeft: 24,
            marginTop: 32,
            borderColor: 'rgba(128, 131, 164, 0.2)',
            borderRadius: 8,
            borderWidth: 1,
        },
        text: {
            color: '#8083A4',
            backgroundColor: 'rgba(128, 131, 164, 0.06)',
            padding: 16,
        }
    }
);
