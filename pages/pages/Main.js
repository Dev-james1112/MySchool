import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import {Ttext, Stext} from '../../assets/components/Text';
import Tbutton from '../../assets/components/Button';
import plate from '../../assets/images/plate.png';

function Main({navigation}) {
  return (
    <View style={styles.main}>
        <View>
            <Ttext text='안녕하세요!'/>
            <Ttext text='오늘 급식에 오신것을 환영해요'/>
            <Stext start="true" text='오늘의 학교 급식을 한눈에 볼 수 있어요.'/>
            <Image source={plate} style={styles.plate}/>
        </View>
        <View style={styles.footer}>
            <Tbutton footer='지금 바로 시작해볼까요?' call={()=>navigation.navigate("Set")}>
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
        paddingHorizontal: 25,
        paddingTop: 60,
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 20
    },
    plate: {
        width: '70%',
        marginTop: -70,
        marginRight: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
        justifyContent: 'center',
    }
});

export default Main;