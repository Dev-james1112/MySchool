
import React, {Component, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Ttext, Stext} from '../../assets/components/Text';
import Tbutton from '../../assets/components/Button';
import Tinput from '../../assets/components/Input';

const key = '6c8bda44c1d949b88a48a7d0bb3a8205'
const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=100&SCHUL_NM=${payload}`

f



function Setsc({navigation}) {
        return (
            <View style={styles.main}>
                <Ttext text='사용자님이 다니는'/>
                <Ttext text='학교를 알려주세요'/>
                <Tinput text='학교 이름' call={onChangeText}></Tinput>
            </View>

        );

}
const onChangeText = (text) => {
    console.log(text)
}
const styles = StyleSheet.create({
    main:  {
        backgroundColor: "#FFF",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },

});

export default Setsc;