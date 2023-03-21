import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ApplicationType } from "../components/Application";

interface Root {
    token: string | null;
    userId: number | null;
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
        setId: (state, action: PayloadAction<number | null>) => {
            state.userId = action.payload;
        },
    },
});

type ApplicationsState = ApplicationType[];

const applicationsSlice = createSlice({
    name: "applications",
    initialState: [] as ApplicationsState,
    reducers: {
        add: (state, action: PayloadAction<ApplicationType>) => {
            state.push(action.payload);
        },
        remove: (state, action: PayloadAction<number>) => {
            state = state.filter((app) => app.id !== action.payload);
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
