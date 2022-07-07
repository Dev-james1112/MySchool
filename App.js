/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import type {Node} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ttext, Stext} from './assets/components/Text';
import Tbutton from './assets/components/Button'
const KEY = "@ID"

const App: () => Node = () => {
    const saveSchool = async(toSave) => {
        await AsyncStorage.clear()
        await AsyncStorage.setItem(KEY , JSON.stringify(toSave))
    }
    const loadSchool =  async() => {
        const s = await AsyncStorage.getItem(KEY)
        if (s  == null) {
            console.log(0)
        } else {
            console.log(1)
        }
    }
    useEffect(() => {
        console.log(loadSchool())
    })
    /*const [show, setShow] = useState(true);
    const [datas, setData] = useState(<View><Text style={styles.header_text}>로딩중</Text></View>);
    const onChangeText = (payload) => {

    const key = '6c8bda44c1d949b88a48a7d0bb3a8205'
    const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=100&SCHUL_NM=${payload}`
    fetch(url).then(res => res.json()).then( data => {
      if (data.schoolInfo == undefined ) {
      } else {
        if (payload != "" ){
        try{
          setData()
          var arr = new Array();
          var count = -1;
          for (let i of data["schoolInfo"][1]["row"]) {
            count ++;
            arr[count] = {SD_SCHUL_CODE: i.SD_SCHUL_CODE, SCHUL_NM: i.SCHUL_NM, ORG_RDNMA: i.ORG_RDNMA}
          }
          setData(arr.map((i) => <TouchableOpacity  style={styles.school_box} onPress={() => {i.SD_SCHUL_CODE}} ><Text key={i.SD_SCHUL_CODE} style={styles.main_text}>{i.SCHUL_NM}</Text><Text key={i.ORG_RDNMA} style={styles.sub_text}>{i.ORG_RDNMA}</Text></TouchableOpacity >))
          list = data.schoolInfo.map(r => list.concat(r))
          list = list[1][0]['row']
        } catch(err) {
          console.log(err)
        }
      }
     }
    })*/
  return (
    <View style={styles.main}>
        <View style={styles.head}>
            <Ttext text='안녕하세요!'/>
            <Ttext text='오늘 급식에 오신것을 환영해요.'/>
            <Stext start="true" text='오늘의 학교 급식을 한눈에 볼 수 있어요'/>

        </View>
        <View style={styles.footer}>
            <Tbutton footer='지금 바로 시작해볼까요?'>
                 시작하기
            </Tbutton>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    main:  {
        backgroundColor: "#FFF",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 20
    },
});

export default App;
