import React from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";

const Tinput = (props) => {
  return (
    <View style={s.main}>
      <Text style={props.error==true ? s.error_text : s.text}>{props.text}</Text>
      <TextInput
        style={props.error==true ? s.error_input : s.input}
        onChangeText={props.call}
        selectionColor={props.error==true ? "#FF0000" : "#35B992"}
        keyboardType={props.type ? props.type : "default"}
        value={props.value ? props.value : null}
        maxLength={props.maxLength ? props.maxLength : null}
      />
      {props.error==true ? <Text style={s.error_undertext}>빈 칸을 입력해주세요.</Text> : <></>}
    </View>
  );
};

const s = StyleSheet.create({
  input: {
    borderBottomColor: "#35B992",
    borderBottomWidth: 2,
    height: 50,
    fontSize: 25,
    color: "#111111",
    
  },

  text: {
    color: "#35B992",
    fontSize: 15,
    paddingTop: 10
  },
  error_text: {
    color: "#FF0000",
    fontSize: 15,
    paddingTop: 10
  },
  error_input: {
    borderBottomColor: "#FF0000",
    borderBottomWidth: 2,
    height: 50,
    fontSize: 25,
    color: "#111111",
  },
  error_undertext: {
    color: "#FF0000",
    fontSize: 12,
    paddingTop: 5
  },

});
export default Tinput;
