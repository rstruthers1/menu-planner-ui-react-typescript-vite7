import {getDate, getMonth, getYear, parse, subDays} from "date-fns";

export const getWeekStart = (date: Date): Date => {
    const dayOfWeek = date.getDay();
    let sundayDateToUse;
    if (dayOfWeek !== 0) {
        sundayDateToUse = subDays(date, dayOfWeek);
    } else {
        sundayDateToUse = date;
    }
    // format to yyyy-mm-dd
    const weekStartString =  getYear(sundayDateToUse) + '-' + (getMonth(sundayDateToUse) + 1) + '-' + getDate(sundayDateToUse);
    console.log(`weekStartString: ${weekStartString}`)
    return parse(weekStartString, 'yyyy-MM-dd', new Date());
}