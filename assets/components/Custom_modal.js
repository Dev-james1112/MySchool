import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Modal, View } from "react-native";
import { Tbutton, Sbutton } from "./Button";


const Cmodal = (props) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.close}
        >
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
        backgroundColor: "rgba(0,0,0,0.5)",
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
        fontSize: 24,
        color: "#000",
        fontWeight: "bold",
    },
    modal_sub_title: {
        fontSize: 16,
        color: "#595959",
        marginTop: 4,
    },
    modal_school_name: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        marginTop: 2,
    },
    modal_school_con: {
        marginTop: 30,
    },
    modal_school_name_title: {
        fontSize: 16,
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
});

export { Cmodal };
