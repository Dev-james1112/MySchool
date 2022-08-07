import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ttext, Stext} from '../../assets/components/Text';
import { loadSchool } from '../../assets/scripts/AsyncStorage';


function Meal({navigation}) {
    const [school_NM_data, setSchool_NM_data] = useState();
    const [school_ID_data, setSchool_ID_data] = useState();
    const [school_REGION_data, setSchool_REGION_data] = useState();
    const [meal_data, setMeal_data] = useState("");
    const today = new Date();   

    const year = today.getFullYear().toString(); // 년도
    const month = ('0' + (today.getMonth()+1).toString()).slice(-2)  // 월
    const date = ('0' + today.getDate().toString()).slice(-2);  // 날짜
    loadSchool("@NM").then(data => setSchool_NM_data(data))
    loadSchool("@ID").then(data => setSchool_ID_data(data))
    loadSchool("@REGION").then(data => setSchool_REGION_data(data))
    const YYYYMMDD = year + month    + date
    const key = '6c8bda44c1d949b88a48a7d0bb3a8205'
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=3&SD_SCHUL_CODE=${school_ID_data}&ATPT_OFCDC_SC_CODE=${school_REGION_data}&MLSV_FROM_YMD=${YYYYMMDD}&MLSV_TO_YMD=${YYYYMMDD}`
    fetch(url).then(res => res.json()).then( data => {
        if (data['mealServiceDietInfo'] != undefined) {
            setMeal_data(<Text style={styles.meal_text}>{JSON.stringify(data['mealServiceDietInfo'][1]['row'][0]['DDISH_NM']).replace(/["']/g, "").replace(/<br\/>/g, "\n")}</Text>);
        } else {
            setMeal_data(<Text style={styles.error}>어라? 등록된 급식 정보가 없네요.</Text>)
        }
    })

    return (
        <View style={styles.main}>
            <View style={styles.gnb}>
                <Ttext text='오늘 급식' style={styles.main_text}/>
                <TouchableOpacity onPress={() => navigation.navigate('Set')} style={styles.change_school}><Text style={styles.change_school_text}>학교 바꾸기</Text></TouchableOpacity>
            </View>
            <View style={styles.con_meal}>
                <View style={styles.meal_head}>
                    <Text style={styles.header_bar}><Text style={styles.header_school_text}>{school_NM_data}</Text><Text style={styles.header_text}>의 오늘 급식</Text></Text>
                    <TouchableOpacity style={styles.more} onPress={() => navigation.navigate("Meal_more")}><Text style={styles.more_text}>더보기</Text></TouchableOpacity>
                </View>
                {meal_data}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    main:  {
        backgroundColor: "#F4F4F4",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 24,
        paddingTop: 30,
        
    },
    con_meal: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 16, 
        paddingTop: 8,
        marginTop: 20,
        whiteSpace: "pre-wrap",
        shadowColor: "#7090B0",
        shadowOffset: {
            width: 0,
            height: 8,
        },  
        shadowOpacity: 0.15  ,
        shadowRadius: 24,

        elevation: 5,
    },
    header_text :{
        fontFamily: "Noto Sans KR",
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 30,
        color: "#737373",
    },
    header_school_text :{
        fontFamily: "Noto Sans KR",
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 30,
        color: "#2F3840",
        float: "left",
    },
    error: {
        marginTop: 6,
        fontSize: 16,
        fontFamily: "Noto Sans KR",
        fontWeight: "500",
        color: "#595959",
        lineHeight: 70,
        textAlign: "center",
    },
    change_school: { 
        flex: 1,
        alignItems: "flex-end",
        alignSelf: "center",
        paddingRight: 10,
    },
    change_school_text: {
        fontFamily: "Noto Sans KR",
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 20,
        color: "#808080",
    },
    gnb: {
        display: "flex",
        flexDirection: "row",
    },
    main_text: {
        flex: 1,
    },
    meal_head: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    more: {
        alignSelf: "center",
    },
    header_bar: {
        flex: 1
    },
    more_text: {
        color: "#F46413"
    },
    meal_text: {
        marginTop: 6,
        fontSize: 18,
    }
});

export default Meal;