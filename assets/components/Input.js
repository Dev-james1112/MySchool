import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { useFonts } from "expo-font";

const Tinput = (props) => {
    const [placeholder, setPlaceholder] = useState(props.text);
    const [text, setText] = useState("");
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
        <View style={s.main}>
            <Text style={props.error == true ? s.error_text : s.text}>
                {text ? text : "  "}
            </Text>
            <TextInput
                style={props.error == true ? s.error_input : s.input}
                onChangeText={props.call}
                selectionColor={props.error == true ? "#FF0000" : "#909090"}
                keyboardType={props.type ? props.type : "default"}
                value={props.value ? props.value : null}
                maxLength={props.maxLength ? props.maxLength : null}
                placeholder={placeholder  ? placeholder : null}
                onFocus={() => {
                    setPlaceholder("");
                    setText(props.text);
                }
                }
            />
            {props.error == true ? (
                <Text style={s.error_undertext}>빈 칸을 입력해주세요.</Text>
            ) : (
                <></>
            )}
        </View>
    );
};

const s = StyleSheet.create({
    input: {
        borderBottomColor: "#35B992",
        borderBottomWidth: 3,
        height: 50,
        fontSize: 28,
        color: "#111111",
        padding: 0,
        margin: 0,
    },

    text: {
        color: "#35B992",
        fontSize: 13,
        paddingTop: 10,
        fontFamily: "NotoSansMedium",
        lineHeight: 15,
    },
    error_text: {
        color: "#FF0000",
        fontSize: 15,
        paddingTop: 10,
    },
    error_input: {
        borderBottomColor: "#FF0000",
        borderBottomWidth: 2,
        height: 50,
        fontSize: 25,
        color: "#111111",
    },
    error_undertext: {
        color: "#FF0000",
        fontSize: 12,
        paddingTop: 5,
    },
});
export default Tinput;
