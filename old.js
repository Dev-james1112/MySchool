/*
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity  } from 'react-native';
import { TextInput } from 'react-native';

export default function App() {
  const [show, setShow] = useState(true);
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
          var arr = new Array(); // 배열 선언
          var count = -1;
          for (let i of data["schoolInfo"][1]["row"]) {
            count ++;
            //console.log(i["SCHUL_NM"], i["ORG_RDNDA"])
            arr[count] = {SD_SCHUL_CODE: i.SD_SCHUL_CODE, SCHUL_NM: i.SCHUL_NM, ORG_RDNMA: i.ORG_RDNMA}


          }
          setData(arr.map((i) => <TouchableOpacity  style={styles.school_box} onPress={() => {i.SD_SCHUL_CODE}} ><Text key={i.SD_SCHUL_CODE} style={styles.main_text}>{i.SCHUL_NM}</Text><Text key={i.ORG_RDNMA} style={styles.sub_text}>{i.ORG_RDNMA}</Text></TouchableOpacity >))
          //console.log(datas)

          list = data.schoolInfo.map(r => list.concat(r))
          list = list[1][0]['row']
          .map(r => { list.concat(r.row); console.log(r.row[0] ?? "")})
          school_list = list.map(school => <View style={styles.school_box}><Text key={school.SD_SCHUL_CODE} style={styles.main_text}>{school.SCHUL_NM}</Text><Text key={school.ORG_RDNMA}>{school.ORG_RDNMA}</Text></View>)
          console.log(school_list, list)
        } catch(err) {

          //console.log(err)
        }
      }
      }
})

  }





  const s = StyleSheet.create(
    {scsetting_cont: {
      justifyContent: 'flex-start',
      marginTop: 10,
      textAlignVertical: 'center',
      width: '90%',
      height: '100%',
      alignSelf: 'center',
    },}
  )
  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.header_text}>오늘 급식</Text>
      </View>
      <View style={styles.main}>
        {schoolID ?
          <View style={styles.main_cont}>
            <Text style={styles.main_text}>OK</Text>
          </View>:
          <View style={s.scsetting_cont}>
            { show && <Text style={styles.scsetting_text}>{`학교를 설정해주세요`}</Text>}
            { show && <TextInput onChangeText={ onChangeText } returnKeyType="send" style={styles.input} placeholder="학교 이름을 입력해주세요."/>}
            <ScrollView style={styles.school_content}>{ datas }</ScrollView>
          </View>
        }
      </View>
    </View>
  )
}
const schoolID = null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232628',
    paddingHorizontal: 10,

  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  header_text:{
    color: '#F2F2F2',
    fontSize: 30,
    fontWeight:"600",
  },
  main_text: {
    color: '#F2F2F2',
    fontSize: 24,
    padding: 0,
  },
  sub_text: {
    color: '#CACACA',
    fontSize: 14,
  },
  main_cont:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  scsetting_text: {
    color: '#F2F2F2',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 34,
    textAlignVertical: 'center',

  },
  input: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    fontSize: 15
  },
  school_box: {
    backgroundColor:'#2F3235',

    borderRadius: 10,
    marginBottom: 14,
    padding: 10,
    paddingTop: 5.5
  },
  school_content: {
    padding: 0,
    marginTop: 15,
    marginBottom: 93,
  }
});
*/