import React from "react";
import { View, Switch, StyleSheet, TouchableOpacity, Text } from "react-native";

const Ttoggle = (props) => {
    return (
        <View style={s.main}>
            <Text style={s.text}>매일 아침 알림 받기</Text>
            <Switch trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={'#f5dd4b' } style={s.toggle}></Switch>
        </View>
    );
};

const s = StyleSheet.create({
    toggle: {
        height: 20,
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: "#444",
    },
    main: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
});

export default Ttoggle;
