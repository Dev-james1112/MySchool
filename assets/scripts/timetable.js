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

    await fetch(
        `https://open.neis.go.kr/hub/misTimetable?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolId}&TI_FROM_YMD=${getThisMonday()}&TI_TO_YMD=${
            parseInt(getThisMonday()) + 4
        }&CLASS_NM=6&GRADE=1&KEY=${key}`
    )
        .then((res) => res.json())
        .then((data) => {
            //console.log(data["misTimetable"][1]["row"][0]["ITRT_CNTNT"]);
            try {
                data?.misTimetable[1]?.row.map((i) => {
                    if (
                        lastPeriod !=
                        i["PERIO"].replace("-", "")
                    ) {
                        list[i["ALL_TI_YMD"] - getThisMonday()].push(
                            i["ITRT_CNTNT"].replace("-", "")
                        );
                        lastPeriod = i["PERIO"].replace("-", "");
                    }
                });
            } catch (e) {
                //console.log(e);
            }
        });

    return list;
}

export { getMidSchoolTimeTable };
