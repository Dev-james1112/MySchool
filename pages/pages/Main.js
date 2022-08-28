import React, {useState} from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { Ttext, Stext } from "../../assets/components/Text";
import { Tbutton } from "../../assets/components/Button";
import { Cmodal, Smodal } from "../../assets/components/Custom_modal";
import content from "../../assets/images/content.png";

function Main({ navigation }) {
  const [modal_open, SetModal] = useState(false);
  //() => navigation.navigate("Set")
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Ttext text="안녕하세요!" />
        <Ttext text="오늘 급식에 오신것을 환영해요" />
        <Stext start="true" text="오늘의 학교 급식을 한눈에 볼 수 있어요." />
        <Image source={content} style={styles.plate} />
      </View>
      <View style={styles.footer}>
        <Cmodal 
          visible={modal_open}
          title="아래 약관을 읽고 동의해주세요"
          sub_title="약관은 나중에 변경될 수 있어요."
          ok_text="확인했으며, 동의하기"
          cancel={false}
          ok={() => navigation.navigate("Set")}
        ><><View><Text>asdf</Text></View></></Cmodal>
        <Tbutton
          footer="지금 바로 시작해볼까요?"
          call={() => SetModal(true)}
        >
          시작하기
        </Tbutton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF",
    height: "100%",
    wight: "100%",
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: 20,
  },
  plate: {
    width: 350,
    height: "100%",
    bottom: "5%",
    resizeMode: "contain",
    alignSelf: "center",


  },
  content: {
    height: "70%",
    width: "100%",
  },
});

export default Main;
