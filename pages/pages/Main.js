import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";

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
        <Stext
          start="true"
          text="오늘의 학교 급식을 한눈에 볼 수 있어요."
        />
        <Image source={content} style={styles.plate} />
      </View>
      <View style={styles.footer}>
        <Cmodal
          visible={modal_open}
          title="아래 약관을 읽고 동의해주세요"
          sub_title="약관은 나중에 변경될 수 있어요."
          ok_text="확인했으며, 동의하기"
          cancel={false}
          ok={() => {
            navigation.navigate("Set");
            SetModal(false);
          }}
        >
          <>
            <View style={styles.link_box}>
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/Dev-james1112/MySchool/blob/master/privacy.md"
                  )
                }
              >
                개인정보처리방침
              </Text>
            </View>
            <View style={styles.link_box}>
            <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/Dev-james1112/MySchool/blob/master/personal_data.md"
                  )
                }
              >
                개인정보 제3자 제공 동의
              </Text>
              </View>
          </>
        </Cmodal>
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
  link_box: {
    backgroundColor: "#FCFCFC",
    borderRadius: 9,
    padding: 9,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  link: {
    backgroudColor: "#F2F2F2",
    color: "#595959",
    textDecorationLine: "underline",
  },
});

export default Main;
