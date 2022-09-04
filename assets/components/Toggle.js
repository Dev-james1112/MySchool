import React, { useEffect, useState } from "react";
import { View, Switch, StyleSheet, TouchableOpacity, Text } from "react-native";

/**
 * Custom Switch Component
 * @param {text} text
 * @param {isEnable} isEnable
 * @param {onPress} onPress
 */
const Ttoggle = (props) => {
    const[button_style,setButton_style] = useState(s.button_1)
    useEffect(() => {
        setButton_style(props.isEnable!=true ? s.button_1 : s.button_2);
    }, [props.isEnable,button_style]);
    return (
        <View style={s.main}>
            <Text style={s.text}>{props.text}</Text>
            <TouchableOpacity
                style={s.toggle}
                onPress={props.onPress}
                activeOpacity={1}

            >
                <View style={button_style}></View>
            </TouchableOpacity>
        </View>
    );
};

const s = StyleSheet.create({
    toggle: {
        height: 30,
        backgroundColor: "#f8f8f8",
        borderRadius: 25,
        marginHorizontal: 10,
        width: 50,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "#444",
    },
    main: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    button_1: {
        height: 21,
        width: 21,
        borderRadius: 50,
        backgroundColor: "#35B992",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 7,
    },
    button_2: {
        height: 21,
        width: 21,
        borderRadius: 50,
        backgroundColor: "#35B992",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateX: 23 }],
    },
});

export default Ttoggle;
