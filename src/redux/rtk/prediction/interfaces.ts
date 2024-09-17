export interface IPredictResponse {
    prompt: string;
    result: Array<IResultPredict>;
    prediction_text: string;
}

export interface IResultPredict {
    year: string;
    value: number;
}

export interface IPredictRequest {
    prompt: string;
}
