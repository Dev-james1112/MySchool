import { getTime, getThisMonday } from "./today";
var key = "6c8bda44c1d949b88a48a7d0bb3a8205";

/**
 *
 * @param {regionCode} regionCode
 * @param {schoolId} schoolId
 */
async function getMidSchoolTimeTable(regionCode, schoolId) {
    var list = [[], [], [], [], []];
    var lastPeriod = 0;
    var url = `https://open.neis.go.kr/hub/misTimetable?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolId}&TI_FROM_YMD=${getThisMonday()}&CLASS_NM=6&GRADE=1&KEY=${key}`;
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            try {
                data?.misTimetable[1]?.row.map((i) => {
                    if (lastPeriod != i["PERIO"].replace("-", "")) {
                        list[i["ALL_TI_YMD"] - getThisMonday()].push(
                            i["ITRT_CNTNT"].replace("-", "")
                        );
                        lastPeriod = i["PERIO"].replace("-", "");
                    }
                });
            } catch (e) {
                console.log(e,1);
            }
        });

    return list;
}

/**
 *
 * @param {regionCode} regionCode
 * @param {schoolId} schoolId
 */
 async function getElsSchoolTimeTable(regionCode, schoolId) {
    var list = [[], [], [], [], []];
    var lastPeriod = 0;
    var url = `https://open.neis.go.kr/hub/elsTimetable?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolId}&TI_FROM_YMD=${getThisMonday()}&CLASS_NM=6&GRADE=1&KEY=${key}`;
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            try {
                data?.elsTimetable[1]?.row.map((i) => {
                    if (lastPeriod != i["PERIO"].replace("-", "")) {
                        list[i["ALL_TI_YMD"] - getThisMonday()].push(
                            i["ITRT_CNTNT"].replace("-", "")
                        );
                        lastPeriod = i["PERIO"].replace("-", "");
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });

    return list;
}

/**
 *
 * @param {regionCode} regionCode
 * @param {schoolId} schoolId
 */
 async function getHidSchoolTimeTable(regionCode, schoolId) {
    var list = [[], [], [], [], []];
    var lastPeriod = 0;
    var url = `https://open.neis.go.kr/hub/hidTimetable?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolId}&TI_FROM_YMD=${getThisMonday()}&CLASS_NM=6&GRADE=1&KEY=${key}`;
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            try {
                data?.elsTimetable[1]?.row.map((i) => {
                    if (lastPeriod != i["PERIO"].replace("-", "")) {
                        list[i["ALL_TI_YMD"] - getThisMonday()].push(
                            i["ITRT_CNTNT"].replace("-", "")
                        );
                        lastPeriod = i["PERIO"].replace("-", "");
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });

    return list;
}

export { getMidSchoolTimeTable, getElsSchoolTimeTable, getHidSchoolTimeTable };
