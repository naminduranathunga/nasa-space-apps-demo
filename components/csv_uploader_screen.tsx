import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useCallback, useState } from 'react';
import { FiUpload } from "react-icons/fi";
import MultiStepProgressBar from './multiple_progress_bar';

function StateIdle({handleFileChange}:{handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void}){
    return (
        <>
            <h2 className="text-black text-lg font-semibold mb-4 text-center">Download sample csv file and add the input data according to the format.</h2>
            <div className="csv-uploader p-4 w-full flex flex-col items-center relative min-h-48 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <FiUpload className="text-blue-400 text-6xl mb-4" />
                {/*<DotLottieReact src="/anims/Rocket Loader.lottie" loop autoplay className="w-24 h-24 mb-4" /> */}
                <input type="file" accept=".csv" className="file-input absolute inset-0 opacity-0" onChange={handleFileChange} />
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Upload CSV File</h1>
                <p className="text-center text-gray-600">Please upload a CSV file to proceed with the prediction.</p>
            </div>
        </>
    )
}

function StateFileSelected({fileInfo, onClickProceed}:{fileInfo:{name:string; size:number}, onClickProceed: ()=>void}){
    return (
        <>
            <h1 className="text-black text-xl font-semibold mb-4">File Selected</h1>
            <div className="file-info p-4 w-full flex flex-col items-center relative min-h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">File: {fileInfo.name}</h1>
                <p className="text-center text-gray-600">Size: {(fileInfo.size / 1024).toFixed(2)} KB</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={onClickProceed}
                    >Process File</button>
            </div>
        </>
    )
}

function StateFileUploading() {
    return (
        <>
            <h1 className="text-black text-xl font-semibold mb-4">Uploading & Processing</h1>
            <div className="file-info p-4 w-full flex flex-col items-center relative min-h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
                <DotLottieReact src="/anims/Rocket Loader.lottie" loop autoplay className="w-24 h-24 mb-4" /> 
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Processing</h1>
            </div>
        </>
    )
}


interface ModelResult {
    keid: string;
    kepler_name: string;
    result: string;
}

function StateCompleted({results}:{results: ModelResult[]}) {
    return (
        <table className="min-w-full border-separate border-spacing-0 overflow-hidden ">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Kepler ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Kepler Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Prediction Result</th>
                </tr>
            </thead>
            <tbody>
                {results.map((res, index) => (
                <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/50"
                >
                    <td className="px-6 py-3 text-sm text-gray-700 border-b">{res.keid}</td>
                    <td className="px-6 py-3 text-sm text-gray-700 border-b">{res.kepler_name}</td>
                    <td
                    className={`px-6 py-3 text-sm font-medium border-b ${
                        res.result === "Positive"
                        ? "text-emerald-600"
                        : res.result === "Negative"
                        ? "text-rose-600"
                        : "text-gray-700"
                    }`}
                    >
                    {res.result}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

    );
}

const sampleModelResults: ModelResult[] = [
    { keid: "123456", kepler_name: "Kepler-22b", result: "Habitable" },
    { keid: "789012", kepler_name: "Kepler-69c", result: "Non-Habitable" },
    { keid: "345678", kepler_name: "Kepler-62f", result: "Habitable" }
];


export default function CSVFileUploader() {
    const [uploaderState, setUploaderState] = useState<'idle' | 'file-selected' | 'processing' | 'completed'>('idle');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileInfo, setSelectedFileInfo] = useState<{ name: string; size: number } | null>(null);
    const [modelResults, setModelResults] = useState<ModelResult[] | null>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            const fileInfo = { name: file.name, size: file.size };
            setSelectedFileInfo(fileInfo);
            setUploaderState('file-selected');
        }
    }, []);

    const handleFileUploadAndProcessBtnClick = useCallback(()=>{
        if (!selectedFile) return;

        setUploaderState("processing");

        setTimeout(() => {
            setModelResults(sampleModelResults);
            setUploaderState("completed");
        }, 3000); // Simulate a 3-second processing time

    }, [selectedFile]);

    return (
        <div className="flex flex-col items-center w-full p-4">
            <MultiStepProgressBar page={1} />
            {uploaderState === 'idle' && <StateIdle handleFileChange={handleFileChange} />}
            {uploaderState === 'file-selected' && selectedFileInfo && <StateFileSelected fileInfo={selectedFileInfo} onClickProceed={handleFileUploadAndProcessBtnClick} />}
            {uploaderState === 'processing' && <StateFileUploading /> }
            {uploaderState === 'completed' && <StateCompleted results={sampleModelResults} />}
        </div>
    );
}