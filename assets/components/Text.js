import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Ttext = (props) => {
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
    return <Text style={s.main}>{props.text}</Text>;
};

const Stext = (props) => {
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
    if (props.start) {
        return <Text style={s.s_sub}>{props.text}</Text>;
    } else {
        return <Text style={s.sub}>{props.text}</Text>;
    }
};

const s = StyleSheet.create({
    main: {
        fontSize: 25,
        color: "#0D0D0D",
        fontFamily: "NotoSansBold",
        lineHeight: 30,
    },
    sub: {
        fontSize: 15,
        color: "#808080",
        fontFamily: "NotoSansMedium",
        lineHeight: 18,
    },
    s_sub: {
        fontSize: 15,
        color: "#808080",
        fontFamily: "NotoSansMedium",
        paddingTop: 16,
        lineHeight: 18,
    },
});
export { Ttext, Stext };
