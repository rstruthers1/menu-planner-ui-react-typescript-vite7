import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupState {
    currentGroupId: number | undefined;
    groupName: string | null;
}

const initialState: GroupState = {
    currentGroupId: undefined,
    groupName: null,
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<{ groupId: number, groupName: string }>) => {
            state.currentGroupId = action.payload.groupId;
            state.groupName = action.payload.groupName;
        },
        clearGroup: (state) => {
            state.currentGroupId = undefined
            state.groupName = null;
        },
    },
});

export const { setGroup, clearGroup } = groupSlice.actions;

export default groupSlice.reducer;
