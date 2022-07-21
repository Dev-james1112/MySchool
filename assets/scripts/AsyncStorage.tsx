import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "@ID"

async function saveSchool(toSave :number) {
    AsyncStorage.clear()
    AsyncStorage.setItem(KEY , JSON.stringify(toSave))
}
async function loadSchool() {
    const s = await AsyncStorage.getItem(KEY)
    if (s  == null) {
        return "false";

    } else {
        console.log(s)
        return "false";
    }

}

export {saveSchool, loadSchool}