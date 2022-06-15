import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';

export default function App() {
  const [school_text, set_stext] = useState("");
  const [show, setShow] = useState(true);
  const onChangeText = (payload) => {set_stext(payload);
    if (payload == "") {
      
      setShow(true);
      
    } else {
      setShow(false);
    }}
  const s = StyleSheet.create(
    {scsetting_cont: {
      justifyContent: `${ show ? 'center': 'flex-start'}`,
      marginTop: 30,
      textAlignVertical: 'center',
      width: '90%',
      height: '80%',
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
            <TextInput onChangeText={onChangeText} value={school_text} returnKeyType="send" style={styles.input} placeholder="학교 이름을 입력해주세요."/>
          </View>
        }
      </View>
    </View>
  );
}
const schoolID = null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  header_text:{
    color: '#fff',
    fontSize: 30,
    fontWeight:"600",
  },
  main_text: {
    color: '#fff',
    fontSize: 24,
  },
  main_cont:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  
  scsetting_text: {
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24,
    textAlignVertical: 'center',

  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    fontSize: 15  
  }
});
