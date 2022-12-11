import React from "react";
import { Text, StyleSheet,  Modal, View, TouchableOpacity } from "react-native";
import { Tbutton, Sbutton } from "./Button";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';

const Cmodal = (props) => {
    const [loaded] = useFonts({
        NotoSansBlack: require("../../assets/fonts/NotoSansKRBlack.otf"),
        NotoSansBold: require("../../assets/fonts/NotoSansKRBold.otf"),
        NotoSansLight: require("../../assets/fonts/NotoSansKRLight.otf"),
        NotoSansMedium: require("../../assets/fonts/NotoSansKRMedium.otf"),
        NotoSansRegular: require("../../assets/fonts/NotoSansKRRegular.otf"),
        NotoSansThin: require("../../assets/fonts/NotoSansKRThin.otf"),
    });
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.close}
        >
            <TouchableOpacity activeOpacity={1} onPress={props.close} style={styles.modal_background}></TouchableOpacity>
            <View style={styles.modal_view}>
                <View style={styles.modal_con}>
                    <Text style={styles.modal_title}>{props.title}</Text>
                    <Text style={styles.modal_sub_title}>
                        {props.sub_title}
                    </Text>
                    <View style={styles.modal_school_con}>
                        {props.children}
                    </View>
                    <View style={styles.modal_btn_con}>
                        {props.cancel != false ? (<>
                            <View style={styles.modal_btn_cancel}>
                                <Sbutton call={props.close}>
                                    {props.close_text}
                                </Sbutton>
                            </View>
                            <View style={styles.modal_btn_ok}>
                                <Tbutton call={props.ok}>{props.ok_text}</Tbutton>
                            </View></>
                        ) : (<View style={styles.modal_btn}>
                            <Tbutton call={props.ok}>{props.ok_text}</Tbutton>
                        </View>)}

                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal_view: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modal_con: {
        padding: 30,
        paddingHorizontal: 25,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modal_title: {
        fontSize: 22,
        color: "#000",
        fontFamily: "NotoSansBold",
        lineHeight: 28,
    },
    modal_sub_title: {
        fontSize: 12,
        color: "#595959",
        marginTop: 4,
        fontFamily: "NotoSansMedium",
        lineHeight: 16,
    },
    modal_school_name: {
        fontSize: 22,
        color: "#000",
        fontFamily: "NotoSansBold",
        lineHeight: 28,
        marginTop: 2,
    },
    modal_school_con: {
        marginTop: 10,
    },
    modal_school_name_title: {
        fontSize: 16,
        fontFamily: "NotoSansMedium",
        lineHeight: 22,
        color: "#595959",
    },
    modal_btn_con: {
        marginTop: 30,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
    },
    modal_btn_cancel: {
        width: "47%",
        height: "100%",
        float: "left",
    },
    modal_btn_ok: {
        width: "47%",
        height: "100%",
        float: "right",
    },
    modal_btn: {
        height: "100%",
        width: "100%",
    },
    modal_background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
    }
});

export { Cmodal };
