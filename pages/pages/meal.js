import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ttext } from "../../assets/components/Text";
import { loadSchool } from "../../assets/scripts/AsyncStorage";
import more_icon from "../../assets/images/more_ico.png";

function Meal({ navigation }) {
    const [school_NM_data, setSchool_NM_data] = useState();
    const [school_ID_data, setSchool_ID_data] = useState();
    const [school_REGION_data, setSchool_REGION_data] = useState();
    const [school_REGION_NM_data, setSchool_REGION_NM_data] = useState();
    const [meal_data, setMeal_data] = useState("정보를 찾을 수 없어요.");
    const [error, setError] = useState(true);
    const today = new Date();

    const year = today.getFullYear().toString(); // 년도
    const month = ("0" + (today.getMonth() + 1).toString()).slice(-2); // 월
    const date = ("0" + today.getDate().toString()).slice(-2); // 날짜
    loadSchool("@NM").then((data) => setSchool_NM_data(data));
    loadSchool("@ID").then((data) => setSchool_ID_data(data));
    loadSchool("@REGION").then((data) => setSchool_REGION_data(data));
    loadSchool("@REGION_NM").then((data) => setSchool_REGION_NM_data(data));
    const YYYYMMDD = year + month + date;
    const key = "6c8bda44c1d949b88a48a7d0bb3a8205";

    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=1&SD_SCHUL_CODE=${school_ID_data}&ATPT_OFCDC_SC_CODE=${school_REGION_data}&MLSV_FROM_YMD=${YYYYMMDD}&MLSV_TO_YMD=${YYYYMMDD}`;
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data["mealServiceDietInfo"] != undefined) {
                    setMeal_data(
                        <Text style={styles.meal_text}>
                            {JSON.stringify(
                                data["mealServiceDietInfo"][1]["row"][0][
                                    "DDISH_NM"
                                ]
                            )
                                .replace(/["']/g, "")
                                .replace(/<br\/>/g, "\n")
                                .replace(/([\d.$])/g, "")
                                .replace(/(\()\)/g, "")}
                        </Text>
                    );
                    setError(false);
                } else {
                    setError(true);
                }
            });
    }, [school_REGION_data]);

    return (
        <View style={styles.main}>
            <View style={styles.gnb}>
                <Text style={styles.title}>홈</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Set")}
                    style={styles.change_school}
                >
                    <Text style={styles.change_school_text}>학교 바꾸기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.school_con}>
                <View style={styles.head}>
                    <Text>
                        <Text style={styles.header_school_text}>
                            {school_NM_data}
                        </Text>
                    </Text>
                    <Text style={styles.header_sub_text}>
                        {school_REGION_NM_data}
                    </Text>
                </View>
            </View>
            <View style={styles.con}>
                <View style={styles.con_head}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Meal_more")}
                    >
                        <View style={styles.con_more}>
                            <Text style={styles.con_header_text}>
                                오늘 급식
                            </Text>
                            <Image
                                source={more_icon}
                                style={styles.more_icon}
                            />
                        </View>
                        <Text
                            style={error ? styles.error_text : styles.con_text}
                        >
                            {meal_data}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FFF",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 25,
        paddingTop: 55,
    },
    header_sub_text: {
        fontSize: 12,
        color: "#F2F2F2",
    },
    header_school_text: {
        fontWeight: "bold",
        fontSize: 22,
        lineHeight: 30,
        color: "#F2F2F2",
    },

    error_text: {
        fontSize: 18,
        color: "#515151",
        textAlign: "center",
        lineHeight: 50,
        paddingVertical: 20,
    },
    change_school: {
        flex: 1,
        alignItems: "flex-end",
        alignSelf: "center",
        paddingRight: 10,
    },
    change_school_text: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#808080",
    },
    gnb: {
        display: "flex",
        flexDirection: "row",
    },
    school_con: {
        backgroundColor: "#35B992",
        borderRadius: 20,
        padding: 24,
        paddingTop: 22,
        marginTop: 20,
    },
    title: {
        fontSize: 31,
        fontWeight: "bold",
    },

    con: {
        backgroundColor: "#f3f2f3",
        borderRadius: 20,
        padding: 24,
        marginTop: 20,
    },
    con_header_text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        alignSelf: "center",
    },
    con_head: {
        alignContent: "center",
        justifyContent: "center",
    },
    con_more: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    more_icon: {
        height: 25,
        width: 25,
        color: "#FFF    ",
    },
    con_text: {
        marginTop: 20,
        fontSize: 16,
        color: "#515151",
        lineHeight: 20,
    },
});

export default Meal;
