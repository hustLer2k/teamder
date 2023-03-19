import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Root {
    token: string | null;
    userId: string | null;
}

const initialRootState: Root = {
    token: null,
    userId: null,
};

const rootSlice = createSlice({
    name: "root",
    initialState: initialRootState,
    reducers: {
        update: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setId: (state, action: PayloadAction<string | null>) => {
            state.userId = action.payload;
        },
    },
});

type ApplicationsState = { projectId: number; role: string }[];

const applicationsSlice = createSlice({
    name: "applications",
    initialState: [] as ApplicationsState,
    reducers: {
        add: (
            state,
            action: PayloadAction<{ projectId: number; role: string }>
        ) => {
            state.push(action.payload);
        },
        remove: (state, action: PayloadAction<number>) => {
            state.filter((app) => app.projectId !== action.payload);
        },
    },
});

export const store = configureStore({
    reducer: {
        root: rootSlice.reducer,
        applications: applicationsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const { update, setId } = rootSlice.actions;
export const { add, remove } = applicationsSlice.actions;
