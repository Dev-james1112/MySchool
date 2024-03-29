import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Vibration
} from "react-native";
import { Ttext, Stext } from "../../assets/components/Text";
import Tinput from "../../assets/components/Input";
import { saveSchool, loadSchool } from "../../assets/scripts/AsyncStorage";
import { Tmodal } from "../../assets/components/Modal";
import { useFonts } from "expo-font";

function Setsc({ navigation }) {
    // Get school list
    const [modal_open, setModal] = useState(false);
    const [datas, setData] = useState("");
    const [school_name, setSchool_data] = useState("");
    const setSchoolId = (schoolId, schoolName, regionCode, regionName, schoolKnd) => {
        saveSchool("@ID", schoolId);
        saveSchool("@NM", schoolName);
        saveSchool("@REGION", regionCode);
        saveSchool("@REGION_NM", regionName);
        saveSchool("@KND", schoolKnd)
        navigation.navigate("SetClass");
    };
    const delSchoolId = (schoolId, schoolName, regionCode, regionName,schoolKnd) => {
        saveSchool("@ID", schoolId);
        saveSchool("@NM", schoolName);
        saveSchool("@REGION", regionCode);
        saveSchool("@REGION_NM", regionName);
        saveSchool("@KND", schoolKnd)
    };
    loadSchool("@NM").then((data) => setSchool_data(data));
    var header =
        datas == "" || datas == null ? (
            <>
                <Ttext text="사용자님이 다니는" />
                <Ttext text="학교를 알려주세요" />
                <Stext text="학교를 검색하신후" start={true} />
                <Stext text="아래에서 선택해주세요" />
                <Text> </Text>
            </>
        ) : (
            <></>
        );
    useEffect(() => {
        header =
            datas == "" || datas == null ? (
                <>
                    <Ttext text="사용자님이 다니는" />
                    <Ttext text="학교를 알려주세요" />
                    <Stext text="학교를 검색하신후" start={true} />
                    <Stext text="아래에서 선택해주세요" />
                    <Text> </Text>
                </>
            ) : (
                <></>
            );
    }, []);

    const setSchool = (text) => {
        const key = "6c8bda44c1d949b88a48a7d0bb3a8205";
        const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=10&SCHUL_NM=${text}`;
        if (text == "Delete") {
            delSchoolId("값없음", "값없음", "값없음", "값없음", "값없음");
            navigation.navigate("Home");
        }
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.schoolInfo != undefined && text != "") {
                    var arr = new Array();
                    var count = -1;
                    for (let i of data["schoolInfo"][1]["row"]) {
                        count++;
                        arr[count] = {
                            SD_SCHUL_CODE: i.SD_SCHUL_CODE,
                            SCHUL_NM: i.SCHUL_NM,
                            ORG_RDNMA: i.ORG_RDNMA,
                            COUNT: count,
                            ATPT_OFCDC_SC_CODE: i.ATPT_OFCDC_SC_CODE,
                            SCHUL_KND_SC_NM: i.SCHUL_KND_SC_NM,
                        };
                    }
                    setData(
                        arr.map((i) => (
                            <TouchableOpacity
                                style={styles.school_box}
                                onPress={() => {
                                    Vibration.vibrate([0, 5]);
                                    setSchoolId(
                                        i.SD_SCHUL_CODE,
                                        i.SCHUL_NM,
                                        i.ATPT_OFCDC_SC_CODE,
                                        i.ORG_RDNMA,
                                        i.SCHUL_KND_SC_NM
                                    );
                                    
                                }}
                                key={i.COUNT + 1}
                            >
                                <Text key={i} style={styles.school_main_text}>
                                    {i.SCHUL_NM}
                                </Text>
                                <Text
                                    key={i.COUNT}
                                    style={styles.school_sub_text}
                                >
                                    {i.ORG_RDNMA}
                                </Text>
                            </TouchableOpacity>
                        ))
                    );
                } else {
                    try {
                        if (
                            data.RESULT.MESSAGE == "해당하는 데이터가 없습니다."
                        ) {
                            setData(
                                <Text style={styles.header_text}>
                                    조회된 학교가 없어요
                                </Text>
                            );
                        } else {
                            setData("");
                        }
                    } catch (err) {
                        setData("");
                    }
                }
            });
    };
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
        <View style={styles.main}>
            {header}

            <Tinput text="학교 이름" call={setSchool} placeholder="학교 이름"></Tinput>
            <ScrollView style={styles.con}>{datas}</ScrollView>
            <StatusBar
                animated={false}
                barStyle={modal_open ? "light-content" : "dark-content"}
                backgroundColor={modal_open ? "#7f7f7f" : "#fff"}
            />
            <Tmodal
                title="입력하신 정보가 맞나요?"
                sub_title="학교는 나중에 변경하실수 있어요."
                data_title="학교 이름"
                data={school_name}
                close={() => setModal(false)}
                close_text="아니요"
                ok={() => {
                    navigation.navigate("SetComplete");
                    setModal(false);
                }}
                ok_text="네"
                visible={modal_open}
            ></Tmodal>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FFF",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    school_box: {
        padding: 10,
        paddingHorizontal: 5,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: "#FFF",
    },
    school_main_text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
        lineHeight: 20,
        fontFamily: "NotoSansMedium",
    },
    school_sub_text: {
        fontSize: 11,
        fontWeight: "400",
        color: "#595959",
        lineHeight: 16,
        fontFamily: "NotoSansRegular",
    },
    header_text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#595959",
        lineHeight: 150,
        textAlign: "center",
        justifyContent: "center",
    },
    con: {
        paddingTop: 10,
    },
});

export default Setsc;
