import { useEffect } from "react";

const today = new Date();
const year = today.getFullYear().toString(); // 년도
const month = ("0" + (today.getMonth() + 1).toString()).slice(-2); // 월
const date = ("0" + today.getDate().toString()).slice(-2); // 날짜

function getTime(){

    const YYYYMMDD =   year + month + date

    return YYYYMMDD
}
function getThisMonday(){
    let day = today.getDay();
    let calcDate = today.getDate() - day + ((day == 0 ? 1 : 8) + 0)-7; 
    let monday = new Date(today.setDate(calcDate));
    return monday.getFullYear().toString() + ("0" + (monday.getMonth() + 1).toString()).slice(-2) + ("0" + monday.getDate().toString()).slice(-2);
}
export {  getTime, getThisMonday };