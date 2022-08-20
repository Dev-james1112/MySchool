import React from "react";
import { Text, StyleSheet } from "react-native";


const Ttext = (props) => {
  return <Text style={s.main}>{props.text}</Text>;
};

const Stext = (props) => {
  if (props.start) {
    return <Text style={s.s_sub}>{props.text}</Text>;
  } else {
    return <Text style={s.sub}>{props.text}</Text>;
  }
};

const s = StyleSheet.create({
  main: {
    fontSize: 25,
    color: "#0D0D0D",
    fontWeight: "bold",
    lineHeight: 30,
  },
  sub: {
    fontSize: 16,
    color: "#808080",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
  },
  s_sub: {
    fontSize: 16,
    color: "#808080",
    fontStyle: "normal",
    fontWeight: "500",
    paddingTop: 16,
    lineHeight: 18,
  },
});
export { Ttext, Stext };
