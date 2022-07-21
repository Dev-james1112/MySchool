import React from "react";
import { Text, StyleSheet } from "react-native";

const Ttext = (props) => {
    return (
        <Text style={s.main}>{props.text}</Text>
    );
};

const Stext = (props) => {
    if(props.start) {
        return(<Text style={s.s_sub}>{props.text}</Text>)
    } else {
        return(<Text style={s.sub}>{props.text}</Text>)
    }
};

const s = StyleSheet.create({
    main: {
        fontSize: 22,
        color: "#0D0D0D",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 30,

    },
    sub: {
        fontSize: 16,
        color: "#737373",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20,

        },
    s_sub: {
        fontSize: 16,
        color: "#737373",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20,
        paddingTop: 20


    }

})
export {Ttext, Stext};