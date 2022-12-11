import React, { useState } from "react";
import { View, Text, StyleSheet,Vibration, StatusBar } from "react-native";
import Tinput from "../../assets/components/Input";
import {
    saveSchool,
    loadSchool,
    removeSchool,
} from "../../assets/scripts/AsyncStorage";
import { Cmodal } from "../../assets/components/Custom_modal";
import { Tbutton } from "../../assets/components/Button";


function Setclass({ navigation }) {
    // Get school list
    const [error_c, setError_c] = useState(false);
    const [error_g, setError_g] = useState(false);
    const [maxgrade, setMaxgrade] = useState(0);
    const [gradeNM, setGradeNM] = useState("");
    const [classNM, setClassNM] = useState("");
    const [modal_open, setModal] = useState(false);
    const [datas, setData] = useState("");
    const [school_name, setSchool_data] = useState("");
    const setAll = () => {
        saveSchool("@GRADE", gradeNM);
        saveSchool("@CLASS", classNM);
    };
    loadSchool("@NM").then((data) => setSchool_data(data));
    const setClass = (text) => {
        console.log(text.replace(/[^0-9]/g, ""))
            if (text.replace(/[^0-9]/g, "")!= "") {

                setClassNM(text.replace(/[^0-9]/g, ""));
                setError_c(false);
            } else {
                
                setClassNM(" ");
            }

    };
    const setGrade = (text) => {
            if (text.replace(/[^0-9]/g, "")!= "") {


                setGradeNM(text.replace(/[^0-9]/g, ""));
                
                setError_g(false);
            }
            else{
                setGradeNM(" ");
            }

    };
    return (
        <View style={styles.main}>
            <View style={styles.input}>
                <View style={styles.input1}>
                    <Tinput
                        text="학년"
                        call={setGrade}
                        type="numeric"
                        value={gradeNM}
                        error={error_g}
                        maxLength={2}
                        placeholder="학년"
                    ></Tinput>
                </View>
                <View style={styles.input2}>
                    <Tinput
                        text="반"
                        placeholder="반"
                        call={setClass}
                        type="number-pad"
                        value={classNM}
                        error={error_c}
                        maxLength={2}
                    ></Tinput>
                </View>
            </View>
            <StatusBar
                animated={false}
                barStyle={modal_open ? "light-content" : "dark-content"}
                backgroundColor={modal_open ? "#7f7f7f" : "#fff"}
            />
            <Cmodal
                title="입력하신 정보가 맞나요?"
                sub_title="학교는 나중에 변경하실수 있어요."
                close={() => {
                    removeSchool("@ID");
                    removeSchool("@NM");
                    removeSchool("@REGION");
                    removeSchool("@REGION_NM");
                    setModal(false);
                }}
                close_text="아니요"
                ok={() => {
                    setAll();
                    navigation.navigate("SetComplete");
                    setModal(false);
                    Vibration.vibrate([0, 5, 5, 5]);
                }}
                ok_text="네"
                visible={modal_open}
                
            >
                <View>
                    <Text style={styles.modal_con_title}>학교 이름</Text>
                    <Text style={styles.modal_con_text}>{school_name}</Text>
                </View>
                <View>
                    <Text style={styles.modal_con_title}>학년</Text>
                    <Text style={styles.modal_con_text}>{gradeNM}학년</Text>
                </View>
                <View>
                    <Text style={styles.modal_con_title}>반</Text>
                    <Text style={styles.modal_con_text}>{classNM}반</Text>
                </View>
            </Cmodal>
            <View style={styles.footer}>
                <Tbutton
                    call={() => {
                        if (gradeNM == "" || gradeNM == " ") {
                            setError_g(true);
                            Vibration.vibrate([0, 50, 20, 50]);
                        } else if (classNM == "" || classNM == " ") {   
                            setError_c(true);
                            Vibration.vibrate([0, 50, 20, 50]);
                        } else {
                            setModal(true);
                        }
                        if (classNM == "") {
                            setError_c(true);
                            Vibration.vibrate([0, 50, 20, 50]);
                        } else if (gradeNM == "") {
                            setError_g(true);
                            Vibration.vibrate([0, 50, 20, 50]);
                        } else {
                            setModal(true);
                            Vibration.vibrate([0,5]);
                        }
                    }}
                >
                    확인
                </Tbutton>
            </View>
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

    footer: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 20,
    },
    modal_con_text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    modal_con_title: {
        fontSize: 13,
        color: "#444",
        marginTop: 10,
    },
    input1: {
        width: "48%",
        float: "left",
    },
    input2: {
        width: "48%",
        float: "right",
    },
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Setclass;
