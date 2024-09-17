"use client";
import { usePredictMutation } from "@/redux/rtk/prediction";
import Image from "next/image";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from "chart.js";

export default function Home() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale);

    const [predict, { isLoading, data }] = usePredictMutation();

    const [prompt, setPrompt] = useState("");

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPrompt(value);
    };

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await predict({ prompt }).unwrap();
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <form onSubmit={handlerSubmit}>
                <div className="flex gap-5">
                    <input type="text" placeholder="Prompt" onChange={handlerOnChange} value={prompt} className="input input-bordered w-full max-w-xs" />
                    <button className="btn btn-success">See the future</button>
                </div>
            </form>
            <div>
                {isLoading ? (
                    <span className="loading loading-ring loading-lg"></span>
                ) : data ? (
                    <>
                        <div className="text-center mb-3">{data.prediction_text}</div>
                        <Bar
                          style={{ width: "100%", height: "100%" }}
                            data={{
                                labels: data?.result.map((x) => x.year),
                                datasets: [
                                    {
                                        label: "Year",
                                        data: data?.result.map((x) => x.value) || [],
                                        backgroundColor: ["#00a96e"],
                                        borderColor: ["#075439"],
                                        borderWidth: 3,
                                    },
                                ],
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        
                                    },
                                    x: {
                                        beginAtZero: true,
                                    }
                                },
                            }}
                        />
                    </>
                ) : (
                    <div>No data</div>
                )}
            </div>
        </div>
    );
}
