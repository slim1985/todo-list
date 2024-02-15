import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

export const createTaskSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});
