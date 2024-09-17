import { apiConfig } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPredictRequest, IPredictResponse } from "./interfaces";


export const predictionRTKProvider = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiConfig.url}/predict`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        predict: builder.mutation<IPredictResponse, IPredictRequest>({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { usePredictMutation } = predictionRTKProvider;
