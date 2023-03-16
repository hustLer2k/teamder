import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
    token: string | null;
}

const initialState: State = {
    token: null,
};

const slice = createSlice({
    name: "root",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
    },
});

export const store = configureStore({
    reducer: slice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const { update } = slice.actions;
