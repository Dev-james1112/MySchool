import AsyncStorage from '@react-native-async-storage/async-storage';


async function saveSchool(KEY, toSave) {

   await AsyncStorage.setItem(KEY , JSON.stringify(toSave))
}
async function removeSchool(KEY) {

    await AsyncStorage.removeItem(KEY)
 }
const loadSchool = async (KEY) => {
    const s = await AsyncStorage.getItem(KEY)

    if (s  == null || s == '""' || s == undefined) {
        return "값없음";
    } else {
        return s.replace(/\"/g, "");
    }

}


export {saveSchool, loadSchool, removeSchool}