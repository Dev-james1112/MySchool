import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Ttext, Stext} from '../../assets/components/Text';
import { loadSchool } from '../../assets/scripts/AsyncStorage';



function Meal_more({navigation}) {
    const [school_NM_data, setSchool_NM_data] = useState();
    const [school_ID_data, setSchool_ID_data] = useState();
    const [school_REGION_data, setSchool_REGION_data] = useState();
    const [meal_data, setMeal_data] = useState("");
    const today = new Date();   

    const year = today.getFullYear().toString(); // 년도
    const month = ('0' + (today.getMonth()+1).toString()).slice(-2)  // 월
    const date = ('0' + today.getDate().toString()).slice(-2);  // 날짜

    const YYYYMMDD = year + month + date
    useEffect (() => {
        loadSchool("@NM").then(data => setSchool_NM_data(data))
        loadSchool("@ID").then(data => setSchool_ID_data(data))
        loadSchool("@REGION").then(data => setSchool_REGION_data(data))
    }, []);
    const key = '6c8bda44c1d949b88a48a7d0bb3a8205'
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=30&SD_SCHUL_CODE=${school_ID_data}&ATPT_OFCDC_SC_CODE=${school_REGION_data}&MLSV_FROM_YMD=${YYYYMMDD}`
    fetch(url).then(res => res.json()).then( data => {
        if (data['mealServiceDietInfo'] != undefined) {
            setMeal_data(data['mealServiceDietInfo'][1]['row'].map(i => <View style={styles.meal_box} key={i['MLSV_TO_YMD']}><Text style={styles.date} key={i['MLSV_FROM_YMD']}>{i.MLSV_FROM_YMD.slice(0,4)}년 {i.MLSV_FROM_YMD.slice(4,6)}월 {i.MLSV_FROM_YMD.slice(6)}일</Text><Text style={styles.meal} key={i['DDISH_NM']['MLSV_YMD']}>{i.DDISH_NM.replace(/["']/g, "").replace(/<br\/>/g, "\n")}</Text></View>))
        } else {
            setMeal_data(<Text style={styles.error}>어라? 등록된 급식 정보가 없네요.</Text>)
        }
    })
    return (
        <View style={styles.main}>
            <ScrollView   showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>{meal_data}</ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FBFBFB", 
        width: "100%",
        height: "100%",
        paddingHorizontal: 18
    },
    date: {
        fontSize: 20,
        fontWeight: "700",
        fontFamily: "Noto Sans KR",
        lineHeight: 30,
        marginBottom: 6,
        color: "#000",

    },
    meal: {
        fontSize: 16,
        fontFamily: "Noto Sans KR",
        lineHeight: 20,
        paddingBottom: 10,
        color: "#2D3033",
    },
    meal_box: {
        backgroundColor: "#FFFFFF",
        margin: 6,
        borderRadius: 20,
        padding: 12,
        shadowColor: "#7090B0",
        shadowOffset: {
            width: 0,
            height: 8,
        },  
        shadowOpacity: 0.15  ,
        shadowRadius: 24,

        elevation: 5,
    }
});

export default Meal_more;