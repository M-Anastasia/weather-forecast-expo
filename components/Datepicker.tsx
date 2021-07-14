import {StyleSheet, Text, View} from "react-native";
import {DatePicker} from "react-native-woodpicker";
import React, {useState} from "react";

type TDatepicker = {
    placeholder: string,
    setDate: any,
    action: any,
}

export const Datepicker = (props: TDatepicker) => {

    const [pickedDate, setPickedDate] = useState(props.placeholder);
    const dateFormat = require('dateformat');

    return (
        <DatePicker style={styles.layout}
                    value={new Date()}
                    onDateChange={e => {
                        setPickedDate(dateFormat(e, "dd/mm/yyyy"));
                        props.setDate(e);
                        props.action();
                    }}
                    title={props.placeholder}
                    text={
                        <View style={{padding: 16}}>
                            <Text style={styles.text}>{pickedDate}</Text>
                        </View>
                    }
                    iosDisplay="inline"
                    minimumDate={new Date(Date.now() - 400000000)}
                    maximumDate={new Date(Date.now())}
        />
    );
};

const styles = StyleSheet.create({
        layout: {
            width: 252,
            height: 48,
            marginLeft: 24,
            marginTop: 24,
            backgroundColor: 'rgba(128, 131, 164, 0.06)',
            borderColor: 'rgba(128, 131, 164, 0.2)',
            borderRadius: 8,
            borderWidth: 1
        },
        text: {
            color: '#8083A4',
        },
    }
)