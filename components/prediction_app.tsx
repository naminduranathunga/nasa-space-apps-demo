"use client";
import BackgroundAnimation from "./background_animation";
import CSVFileUploader from "./csv_uploader_screen";


export default function PredictionApp() {


    return (
        <div className="wrapper w-full h-screen flex items-center justify-center bg-black p-4 relative" id="app">
            <BackgroundAnimation />

            <div className="app-container w-full max-w-[550px] p-0 border border-gray-300 rounded-lg shadow-lg bg-white z-20">
                <header className="w-full flex items-center justify-center">
                    <div className="logo w-[100px] h-[100px] relative bg-amber-200 rounded-full mt-[-50px]">
                        <img src={"/images/45983020634522.jpeg"} alt="Logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                </header>
                <div className="content p-4">
                    <CSVFileUploader />
                </div>
            </div>

            
        </div>
    );
}
