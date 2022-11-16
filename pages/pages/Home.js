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
import { getMidSchoolTimeTable } from "../../assets/scripts/timetable";
import { set } from "react-native-reanimated";

function Home({ navigation }) {
    const [school_NM_data, setSchool_NM_data] = useState();
    const [school_ID_data, setSchool_ID_data] = useState();
    const [school_REGION_data, setSchool_REGION_data] = useState();
    const [school_REGION_NM_data, setSchool_REGION_NM_data] = useState();
    const [meal_data, setMeal_data] = useState("등록된 정보가 없어요.");
    const [error, setError] = useState(true);
    let timeTableDataTmp =[ [""],[""],[""],[""],[""]];
    const [timeTableDayData, setTimeTableDayData] = useState([[""],[""],[""],[""],[""]]);
    loadSchool("@NM").then((data) => setSchool_NM_data(data));
    loadSchool("@ID").then((data) => setSchool_ID_data(data));
    loadSchool("@REGION").then((data) => setSchool_REGION_data(data));  
    loadSchool("@REGION_NM").then((data) => setSchool_REGION_NM_data(data));
    const [timeTableData, setTimeTableData] = useState(
        [],
        [],
        [],
        [],
        [],
        [],
        []
    );
    const key = "6c8bda44c1d949b88a48a7d0bb3a8205";

    const url1 = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=1&SD_SCHUL_CODE=${school_ID_data}&ATPT_OFCDC_SC_CODE=${school_REGION_data}&MLSV_FROM_YMD=${getTime()}&MLSV_TO_YMD=${getTime()}`;

    useEffect(() => {
        getMidSchoolTimeTable(school_REGION_data, school_ID_data).then((d) =>{
            setTimeTableData(d)
            timeTableDataTmp = [ [""],[""],[""],[""],[""]];}

        );
        
        //console.log(timeTableData);
        timeTableDataTmp =[ [""],[""],[""],[""],[""]];
        setTimeTableDayData(timeTableDataTmp);
        timeTableData.map((d) => {
            //console.log(d);
            timeTableDataTmp[timeTableData.indexOf(d)] = ""
            d.map((a) => {
                if(a != undefined){
               console.log(a, timeTableData.indexOf(d));

                timeTableDataTmp[timeTableData.indexOf(d)].push(<View key={timeTableData.indexOf(d)} style={styles.TimeTableTextBox}><Text>{a + " "}</Text></View>);
                setTimeTableDayData(timeTableDataTmp);
                  
                }
                
            });
            timeTableDataTmp[timeTableData.indexOf(d)] = ""
        });
        
  
        timeTableDataTmp = [ [""],[""],[""],[""],[""]];
        console.log(timeTableDayData);

        //console.log( timeTableDayData);
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
    }, [school_REGION_data]);

    return (
        <ScrollView style={styles.main}>
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
                                오늘의 급식
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
            <View style={styles.con}>
                <View style={styles.con_head}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Meal_more")}
                        style={styles.MainContent}
                    >
                        <View style={styles.con_more}>
                            <Text style={styles.con_header_text}>시간표</Text>
                            <Image
                                source={more_icon}
                                style={styles.more_icon}
                            />
                        </View>
                        <View
                            style={error ? styles.error_text : styles.con_text}
                        >
                            <View style={styles.TimeTableDayBox}>
                                <Text style={styles.TimeTableDay}>월</Text>
                                <Text style={styles.TimeTableDay}>화</Text>
                                <Text style={styles.TimeTableDay}>수</Text>
                                <Text style={styles.TimeTableDay}>목</Text>
                                <Text style={styles.TimeTableDay}>금</Text>
                            </View>
                            <View style={styles.TimeTableBox}>
                            <Text style={styles.TimeTableData}>{timeTableDayData[0]}</Text>
                                <Text style={styles.TimeTableData}>{timeTableDayData[1]}</Text>
                                <Text style={styles.TimeTableData}>{timeTableDayData[2]}</Text>
                                <Text style={styles.TimeTableData}>{timeTableDayData[3]}</Text>
                                <Text style={styles.TimeTableData}>{timeTableDayData[4]}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        width: "100%",

    },
    con_header_text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        alignSelf: "center",
        flex:1
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
        color: "#FFF    ",
    },
    con_text: {
        marginTop: 20,
        fontSize: 16,
        color: "#515151",
        lineHeight: 20,
        width: "100%",
    },
    TimeTableDayBox: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignSelf: "center",
        paddingBottom: 10,
        borderBottomColor: "#515151",
        borderBottomWidth: 1,
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
        fontSize: 16,
        color: "#515151",
        justifyContent: "space-between",
        textAlign: "center",
    },
    TimeTableData: {
        width: "20%",
        fontSize: 16,
        color: "#515151",
        justifyContent: "space-between",
        textAlign: "center",
        flexDirection: "row-reverse",
    },
    MainContent: {
        width: "100%",
        height: "100%",
    },
    TimeTableTextBox: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 50,
    },
});

export default Home;
