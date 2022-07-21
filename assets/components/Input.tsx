import React from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";

const s = StyleSheet.create({
    main: {
        paddingTop: 20
    },
    input: {
        borderBottomColor: '#F46413',
        borderBottomWidth: 2 ,
        height: 50,
        fontSize: 25,
        color: '#111',
    },

    text: {
        fontFamily: "Noto Sans KR",
        fontWeight: "400",
        lineHeight: 14,
        color: "#F46413",
        fontSize: 12
    },
    footer: {
        paddingTop: 8,
        textAlign: "center",
        fontSize: 12,
        color: "#737373",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 14,
    }
})
const Tinput = (props :any) => {
    return (
        <View style={s.main}>
            <Text style={s.text}>{props.text}</Text>
            <TextInput style={s.input} onChangeText={props.call} selectionColor="#F46413" />

        </View>
    );
};

export default Tinput;