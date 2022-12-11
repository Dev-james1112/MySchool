import React from "react";
import { Text, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { useFonts } from "expo-font";

const Tbutton = (props) => {
    const [loaded] = useFonts({
        NotoSansBlack: require("../../assets/fonts/NotoSansKRBlack.otf"),
        NotoSansBold: require("../../assets/fonts/NotoSansKRBold.otf"),
        NotoSansLight: require("../../assets/fonts/NotoSansKRLight.otf"),
        NotoSansMedium: require("../../assets/fonts/NotoSansKRMedium.otf"),
        NotoSansRegular: require("../../assets/fonts/NotoSansKRRegular.otf"),
        NotoSansThin: require("../../assets/fonts/NotoSansKRThin.otf"),
    });
    if (!loaded) {
        return null;
    }
    return (
        <>
            <TouchableOpacity onPress={props.call} style={s.main}>
                <Text style={s.text}> {props.children}</Text>
            </TouchableOpacity>
            {props.footer ? (
                <Text style={s.footer}>{props.footer}</Text>
            ) : (
                <></>
            )}
        </>
    );
};

const Sbutton = (props) => {
    const [loaded] = useFonts({
        NotoSansBlack: require("../../assets/fonts/NotoSansKRBlack.otf"),
        NotoSansBold: require("../../assets/fonts/NotoSansKRBold.otf"),
        NotoSansLight: require("../../assets/fonts/NotoSansKRLight.otf"),
        NotoSansMedium: require("../../assets/fonts/NotoSansKRMedium.otf"),
        NotoSansRegular: require("../../assets/fonts/NotoSansKRRegular.otf"),
        NotoSansThin: require("../../assets/fonts/NotoSansKRThin.otf"),
    });
    if (!loaded) {
        return null;
    }
    return (
        <>
            <TouchableOpacity onPress={props.call} style={s.s_main}>
                <Text style={s.s_text}> {props.children}</Text>
            </TouchableOpacity>
            {props.footer ? (
                <Text style={s.s_footer}>{props.footer}</Text>
            ) : (
                <></>
            )}
        </>
    );
};

const s = StyleSheet.create({
    main: {
        backgroundColor: "#35B992",
        padding: 18,
        borderRadius: 14,
    },
    text: {
        textAlign: "center",
        fontFamily: "NotoSansBold",
        lineHeight: 20,
        color: "#fff",
        fontSize: 16,
    },
    footer: {
        paddingTop: 8,
        textAlign: "center",
        fontSize: 10,
        color: "#737373",
        fontFamily: "NotoSansMedium",
        fontWeight: "500",
        lineHeight: 14,
    },
    s_main: {
        backgroundColor: "#D1EFDB",
        padding: 18,
        borderRadius: 14,
    },
    s_text: {
        textAlign: "center",
        fontFamily: "NotoSansBold",
        lineHeight: 20,
        color: "#35B992",
        fontSize: 16,

    },
    s_footer: {
        paddingTop: 8,
        textAlign: "center",
        fontSize: 10,
        color: "#737373",
        fontFamily: "NotoSansMedium",
        fontWeight: "500",
        lineHeight: 14,
    },
});

export { Tbutton, Sbutton };
