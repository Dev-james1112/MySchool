import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Ttext, Stext} from '../../assets/components/Text';
import Tbutton from '../../assets/components/Button';

function SetCom({navigation}) {
    return (
        <View style={styles.main}>
            <Ttext text='학교 설정이 끝났어요!'/>
            <Stext start="true" text='모든 준비가 다 끝났어요!'/>
            <Stext text='아래 버튼을 눌러 오늘 급식을 시작해봐요!'/>
            <Image
                    source={{uri: 'https://cdn.dribbble.com/users/39201/screenshots/3694057/media/89ce11cab7aec13ba5c9a8e73534921d.gif'}}
                    style={styles.image}
                />
            <View style={styles.footer}>
                <Tbutton call= {()=>navigation.navigate("Meal")}>오늘의 급식 확인해보기</Tbutton>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    main:  {

        backgroundColor: "#f7f7f7",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 20,

    },
    image: {
        width: '100%',
        height:'50%',
        marginTop: 50,
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 20
    }
});

export default SetCom;