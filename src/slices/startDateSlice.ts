// store/startDateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getDate, getMonth, getYear} from "date-fns";
import {getWeekStart} from "../utils/date.utils.ts";


const getCurrentWeekStart = (): string => {
    const now = new Date();
    const weekStartDate = getWeekStart(now);
    // format to yyyy-mm-dd
    const currentWeekStart =  getYear(weekStartDate) + '-' + (getMonth(weekStartDate) + 1) + '-' + getDate(weekStartDate);
    return currentWeekStart;
};

interface StartDateState {
    startDate: string;
}

const initialState: StartDateState = {
    startDate: getCurrentWeekStart(),
};

const startDateSlice = createSlice({
    name: 'startDate',
    initialState,
    reducers: {
        setStartDate(state, action: PayloadAction<string>) {
            state.startDate = action.payload;
        },
    },
});

export const { setStartDate } = startDateSlice.actions;
export default startDateSlice.reducer;
