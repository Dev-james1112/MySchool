import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { loadSchool } from "../../assets/scripts/AsyncStorage";
import {getTime } from "../../assets/scripts/today";

function Meal_more() {
    const [school_NM_data, setSchool_NM_data] = useState();
    const [school_ID_data, setSchool_ID_data] = useState();
    const [school_REGION_data, setSchool_REGION_data] = useState();
    const [meal_data, setMeal_data] = useState("");
    
    useEffect(() => {
        loadSchool("@NM").then((data) => setSchool_NM_data(data));
        loadSchool("@ID").then((data) => setSchool_ID_data(data));
        loadSchool("@REGION").then((data) => setSchool_REGION_data(data));
    }, []);
    const key = "6c8bda44c1d949b88a48a7d0bb3a8205";
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=30&SD_SCHUL_CODE=${school_ID_data}&ATPT_OFCDC_SC_CODE=${school_REGION_data}&MLSV_FROM_YMD=${getTime()}`;
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data["mealServiceDietInfo"] != undefined) {
                    setMeal_data(
                        data["mealServiceDietInfo"][1]["row"].map((i) => (
                            <View
                                style={styles.meal_box}
                                key={i["MLSV_TO_YMD"]}
                            >
                                <Text
                                    style={
                                        i["MLSV_YMD"] == getTime()
                                            ? styles.TodayDate
                                            : styles.date
                                    }
                                    key={i["MLSV_FROM_YMD"]}
                                >
                                    {i.MLSV_FROM_YMD.slice(4, 6).replace(0, "")}
                                    월 {i.MLSV_FROM_YMD.slice(6).replace(0, "")}
                                    일{" "}
                                    {
                                        week[
                                            new Date(
                                                i.MLSV_YMD.slice(0, 4) +
                                                    "-" +
                                                    i.MLSV_YMD.slice(4, 6) +
                                                    "-" +
                                                    i.MLSV_YMD.slice(6, 8)
                                            ).getDay()
                                        ]
                                    }
                                    요일
                                </Text>
                                <Text
                                    style={styles.meal}
                                    key={i["DDISH_NM"]["MLSV_YMD"]}
                                >
                                    {i.DDISH_NM.replace(/["']/g, "")
                                        .replace(/<br\/>/g, "\n")
                                        .replace(/([\d.$])/g, "")
                                        .replace(/(\()\)/g, "")}
                                </Text>
                            </View>
                        ))
                    );
                } else {
                    setMeal_data();
                }
            });
    }, [school_REGION_data]);

    /* Push Notification Disable */
    /*
                    <View style={styles.toggle_box}>
                    <Ttoggle
                        isEnable={isEnable}
                        onPress={() => {
                            setIsEnable(!isEnable);
                        }}
                        text="매일 아침 알림받기"
                    ></Ttoggle>
                    <Text style={styles.line}></Text>
                </View>
    */
    return (
        <View style={styles.main}>
            <Text style={styles.title}><Text style={styles.schoolNM_title}>{school_NM_data}</Text> 의 오늘 급식</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {meal_data}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        paddingHorizontal: 25,
    },
    date: {
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 8,
        color: "#000",
    },
    TodayDate: {
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 8,
        color: "#0455BF",
    },
    meal: {
        fontSize: 16,
        lineHeight: 21,
        paddingBottom: 10,
        color: "#666666",
    },
    meal_box: {
        marginVertical: 6,

        padding: 3,
    },
    header: {
        width: "100%",
        height: 50,
        marginHorizontal: 10,
    },
    content: {
        paddingTop: 30,
        paddingBottom: "20%",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        color: "#000",
        marginTop: 20,
    },
    schoolNM_title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        color: "#35B992",
        marginTop: 20,

    },
    alarm: {
        fontSize: 16,
        color: "#444",
        marginBottom: 20,
        paddingBottom: 20,
        float: "left",
    },
    toggle: {
        float: "right",
    },
    line: {
        borderBottomColor: "#ddd",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default Meal_more;
