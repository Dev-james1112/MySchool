import { getTime, getThisMonday } from "./today";
var key = '6c8bda44c1d949b88a48a7d0bb3a8205';

/**
 * 
 * @param {regionCode} regionCode 
 * @param {schoolId} schoolId
 */
function getMidSchoolTimeTable(regionCode, schoolId) {
    fetch(`https://open.neis.go.kr/hub/misTimetable?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolId}&TI_FROM_YMD=${getThisMonday()}&TI_TO_YMD=${parseInt(getThisMonday())+4}&CLASS_NM=6&GRADE=1&KEY=${key}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data["misTimetable"][1]["row"][0]["ITRT_CNTNT"]);
            data["misTimetable"][1]["row"].map(i => console.log(i["ITRT_CNTNT"].replace("-", ""),i['ALL_TI_YMD']));
        }
        )
}



export { getMidSchoolTimeTable };