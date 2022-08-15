import React from "react";
import { View, StatusBar, Image, StyleSheet } from "react-native";
import { Ttext, Stext } from "../../assets/components/Text";
import { Tbutton } from "../../assets/components/Button";

function SetCom({ navigation }) {
    return (
        <View style={styles.main}>
            <View style={styles.con}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <Ttext text="학교 설정이 끝났어요!" />
                <Stext start="true" text="모든 준비가 다 끝났어요!" />
                <Stext text="아래 버튼을 눌러 오늘 급식을 시작해봐요!" />
                <Image
                    source={require("../../assets/images/complete.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.footer}>
                <Tbutton call={() => navigation.navigate("Meal")}>
                    오늘의 급식 확인해보기
                </Tbutton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 70,
        backgroundColor: "#fff",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 25,
    },
    image: {
        height: "70%",
        width: "70%",
        marginTop: 50,
        alignSelf: "center",
        resizeMode: "contain",
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 20,
    },
    con: {
        height: "70%",
    }
});

export default SetCom;
