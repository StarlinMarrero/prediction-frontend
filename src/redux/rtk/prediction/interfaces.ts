export interface IPredictResponse {
    prompt: string;
    result: Array<IResultPredict>;
}

export interface IResultPredict {
    year: string;
    value: number;
}

export interface IPredictRequest {
    prompt: string;
}
