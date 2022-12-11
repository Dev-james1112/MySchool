import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { loadSchool } from "../../assets/scripts/AsyncStorage";
import more_icon from "../../assets/images/more_ico.png";
import { getTime } from "../../assets/scripts/today";
import { getMidSchoolTimeTable, getElsSchoolTimeTable, getHidSchoolTimeTable } from "../../assets/scripts/timetable";
import { useFonts } from 'expo-font';

function Home({ navigation }) {

    const [school_NM_data, setSchool_NM_data] = useState();
    const [school_ID_data, setSchool_ID_data] = useState();
    const [school_REGION_data, setSchool_REGION_data] = useState();
    const [school_REGION_NM_data, setSchool_REGION_NM_data] = useState();
    const [school_KND_data, setSchool_KND_data] = useState();
    const [meal_data, setMeal_data] = useState("등록된 정보가 없어요.");
    const [error, setError] = useState(true);
    let keyCount = 0;
    useEffect(() => {
        console.log("asdf")
        loadSchool("@NM").then((data) => setSchool_NM_data(data));
        loadSchool("@ID").then((data) => setSchool_ID_data(data));
        loadSchool("@REGION").then((data) => setSchool_REGION_data(data));
        loadSchool("@REGION_NM").then((data) => setSchool_REGION_NM_data(data));
        loadSchool("@KND").then((data) => setSchool_KND_data(data));
    }, [school_REGION_NM_data]);
    const [timeTableData, setTimeTableData] = useState(
        [],
        [],
        [],
        [],
        [],
        [],
        []
    );
    let timeTableComponent = [[], [], [], [], []];

    const key = "6c8bda44c1d949b88a48a7d0bb3a8205";
    const url1 = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=1&SD_SCHUL_CODE=${school_ID_data}&ATPT_OFCDC_SC_CODE=${school_REGION_data}&MLSV_FROM_YMD=${getTime()}&MLSV_TO_YMD=${getTime()}`;

    useEffect(() => {
        async function getTimeTable() {
            if (school_KND_data == "초등학교") {
                await getElsSchoolTimeTable(
                    school_REGION_data,
                    school_ID_data
                ).then((d) => {
                    setTimeTableData(d);
                });
            } else if (school_KND_data == "중학교") {
                console.log("asdfasdfasd")
                await getMidSchoolTimeTable(
                    school_REGION_data,
                    school_ID_data
                ).then((d) => {
                    setTimeTableData(d);
                    
                });
            } else if (school_KND_data == "고등학교") {
                await getHidSchoolTimeTable(
                    school_REGION_data,
                    school_ID_data
                ).then((d) => {
                    setTimeTableData(d);
                });
            }
            
        }
        

        fetch(url1)
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
            getTimeTable();
    }, [school_REGION_data, school_ID_data, school_KND_data]);
    timeTableData.map((d) => {
        d.map((a) => {
            try {
                timeTableComponent[timeTableData.indexOf(d)].push(
                    <View
                        key={keyCount + 1000}
                        style={styles.TimeTableTextView}
                    >
                        <View key={keyCount} style={styles.TimeTableTextBox}>
                            <Text numberOfLines={2} style={styles.TimeTableText}>{a}</Text>
                        </View>
                    </View>
                );

                keyCount += 1;
            } catch {
                console.log(" ");
            }
        });
    });

    const [loaded] = useFonts({
        NotoSansBlack: require('../../assets/fonts/NotoSansKRBlack.otf'),
        NotoSansBold: require('../../assets/fonts/NotoSansKRBold.otf'),
        NotoSansLight: require('../../assets/fonts/NotoSansKRLight.otf'),
        NotoSansMedium: require('../../assets/fonts/NotoSansKRMedium.otf'),
        NotoSansRegular: require('../../assets/fonts/NotoSansKRRegular.otf'),
        NotoSansThin: require('../../assets/fonts/NotoSansKRThin.otf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.main}>
                <View style={styles.gnb}>
                    <Text style={styles.title}>홈</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Set")}
                        style={styles.change_school}
                    >
                        <Text style={styles.change_school_text}>
                            학교 바꾸기
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.school_con}>
                    <View style={styles.head}>
                        <Text style={styles.header_school_text}>
                            {school_NM_data}
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
                                    오늘의 급식
                                </Text>
                                <Image
                                    source={more_icon}
                                    style={styles.more_icon}
                                />
                            </View>
                            <Text style={styles.con_text}>{meal_data}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.con}>
                    <View style={styles.con_head}>
                        <View
                            onPress={() => navigation.navigate("Meal_more")}
                            style={styles.MainContent}
                        >
                            <View style={styles.con_more}>
                                <Text style={styles.con_header_text}>
                                    시간표
                                </Text>
                            </View>
                            <View
                                style={
                                    error ? styles.error_text : styles.con_text
                                }
                            >
                                <View style={styles.TimeTableDayBox}>
                                    <Text style={styles.TimeTableDay}>월</Text>
                                    <Text style={styles.TimeTableDay}>화</Text>
                                    <Text style={styles.TimeTableDay}>수</Text>
                                    <Text style={styles.TimeTableDay}>목</Text>
                                    <Text style={styles.TimeTableDay}>금</Text>
                                </View>
                                <View style={styles.TimeTableBox}>
                                    <Text style={styles.TimeTableData}>
                                        {timeTableComponent[0]}
                                    </Text>
                                    <Text style={styles.TimeTableData}>
                                        {timeTableComponent[1]}
                                    </Text>
                                    <Text style={styles.TimeTableData}>
                                        {timeTableComponent[2]}
                                    </Text>
                                    <Text style={styles.TimeTableData}>
                                        {timeTableComponent[3]}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.TimeTableData,
                                            styles.TimeTableDataLast,
                                        ]}
                                    >
                                        {timeTableComponent[4]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.ScreenBlank}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FFF",
        wight: "100%",
        paddingHorizontal: 24,
        paddingBottom: 50,
    },
    header_sub_text: {
        fontSize: 12,
        color: "#F2F2F2",
        fontFamily: "NotoSansRegular",
        lineHeight: 18,
    },
    header_school_text: {
        fontSize: 22,
        color: "#F2F2F2",
        fontFamily: "NotoSansBold",
        lineHeight: 30,
    },
    ScreenBlank: {
        height: 100,
    },
    error_text: {
        fontSize: 20,
        fontFamily: "NotoSansRegular",
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
        fontSize: 17,
        color: "#808080",
        fontFamily: "NotoSansBold",
    },
    gnb: {
        paddingTop: 55,
        display: "flex",
        flexDirection: "row",
    },
    school_con: {
        backgroundColor: "#35B992",
        borderRadius: 15,
        padding: 24,
        paddingTop: 22,
        marginTop: 20,
    },
    title: {
        fontSize: 31,
        fontFamily: "NotoSansBold",
        lineHeight: 44,
    },

    con: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 24,
        marginTop: 20,
        width: "100%",
        borderColor: "#f2f2f2",
        borderWidth: 1,
    },
    con_header_text: {
        fontSize: 18,
        fontFamily: "NotoSansBold",
        color: "#000",
        alignSelf: "center",
        flex: 1,
        lineHeight: 25,
    },
    con_head: {
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
    },
    con_more: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    more_icon: {
        height: 25,
        width: 25,
        color: "#FFF",
    },
    con_text: {
        marginTop: 20,
        fontSize: 15,
        color: "#515151",
        lineHeight: 20,
        width: "100%",
        fontFamily: "NotoSansRegular",
    },
    TimeTableDayBox: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignSelf: "center",
        paddingBottom: 2,
    },
    TimeTableBox: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignSelf: "center",
        paddingBottom: 10,
    },
    TimeTableDay: {
        width: "20%",
        fontSize: 11,
        fontFamily: "NotoSansRegular",
        lineHeight: 15,
        color: "#515151",
        justifyContent: "space-between",
        textAlign: "center",
    },
    TimeTableData: {
        width: "20%",
        color: "#515151",
        justifyContent: "space-between",
        textAlign: "center",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
        borderTopColor: "#D9D9D9",
        borderTopWidth: 1,
        borderLeftColor: "#D9D9D9",
        borderLeftWidth: 1,
    },
    MainContent: {
        width: "100%",
    },
    TimeTableTextBox: {
        width: "10%",
        height: 70,
        alignItems: "center",
        flex: 1,
        borderRadius: 6,
        overflow: "hidden",
        display: "flex",
        paddingTop: 25,
    },
    TimeTableText: {
        flexWrap: "wrap",
        flex: 1,
        width: 60,
        textAlign: "center",
        fontSize: 10,
        fontFamily: "NotoSansRegular",
        lineHeight: 15,
        height: 20,
    },

    TimeTableTextView: {
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
    },
    TimeTableDataLast: {
        borderRightWidth: 1,
        borderRightColor: "#D9D9D9",
    },
    TimeTableTextViewNoBorder: {},
});

export default Home;
