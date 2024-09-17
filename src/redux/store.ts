import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import storeMiddleware from "./store-middleware";
import { predictionRTKProvider } from "./rtk/prediction";

export const store = configureStore({
    reducer: {
        [predictionRTKProvider.reducerPath]: predictionRTKProvider.reducer,
    },
    middleware: (gDM) => {
        return gDM().concat(storeMiddleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
