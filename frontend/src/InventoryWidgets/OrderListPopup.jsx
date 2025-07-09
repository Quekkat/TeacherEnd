import { useRef } from "react";
import html2Canvas from 'html2canvas';
import OrderSlip from "./OrderSlip";
import { useStore } from "../globalVariables";

const OrderListPopup = () => {
    const {togglePopup, selectedReceipt} = useStore();
    const childref = useRef(null);
    const close = ()=>{
        console.log("closing");
        togglePopup();
    }
    const handleDownload = async () => {
        if (!childref.current) return;
        // Temporarily change background for canvas capture
        const originalBg = childref.current.style.backgroundColor;
        childref.current.style.backgroundColor = 'white';

        const canvas = await html2Canvas(childref.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        // Restore original background
        childref.current.style.backgroundColor = originalBg;

        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'receipt.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={close}>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-4xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                {/* Receipt Component */}
                <div className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg">
                    <OrderSlip ref={childref} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                    >
                        Download Receipt
                    </button>
                    <button
                        onClick={close}
                        className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderListPopup;