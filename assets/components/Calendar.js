import React, {useState} from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const [open, SetOpen] = useState(true);

const Tcalendar = (props) => {

    return (
        <>
            <TouchableOpacity onPress={()=>(SetOpen(true))}>
                <Image source={require('../../assets/images/calendar_ico.png')} style={s.cal}/>
            </TouchableOpacity>
            
        </>
    );
};

const TcalendarTop = (props) => {
    return (
        <>
            <View>
                {open ? ( <View style={{flex: 1, backgroundColor: "#111"}}>{props.children}</View>) : <View></View>}  
            </View>
            
        </>

    )
}




const s = StyleSheet.create({
    main: {
        backgroundColor: "#F46413",
        padding: 18,
        borderRadius: 14,
    },
    text: {
        textAlign: "center",
        fontFamily: "Noto Sans KR",
        fontWeight: "500",
        lineHeight: 20,
        color: "#fff",
        fontSize: 16
    },
    footer: {
        paddingTop: 8,
        textAlign: "center",
        fontSize: 12,
        color: "#737373",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 14,
    },
    cal: {
        marginTop: 10,
        width: 28,
        height: 28,
        position:"absolute"
    }
})

export {Tcalendar, TcalendarTop};