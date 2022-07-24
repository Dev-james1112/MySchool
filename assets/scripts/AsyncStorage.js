import AsyncStorage from '@react-native-async-storage/async-storage';


async function saveSchool(KEY, toSave) {

    AsyncStorage.setItem(KEY , JSON.stringify(toSave))
}

async function loadSchool(KEY) {
    const s = await AsyncStorage.getItem(KEY)
    if (s  == null) {
        return "false";
    } else {
        return s.replace(/\"/g, "");
    }

}

export {saveSchool, loadSchool}