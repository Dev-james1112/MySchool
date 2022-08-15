import React from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";

const Tinput = (props) => {
  return (
    <View style={s.main}>
      <Text style={s.text}>{props.text}</Text>
      <TextInput
        style={s.input}
        onChangeText={props.call}
        selectionColor="#35B992"
      />
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
  
});
export default Tinput;
