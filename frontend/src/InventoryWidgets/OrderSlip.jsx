import { useState, forwardRef } from "react";
import { useStore } from "../globalVariables";
    
const OrderSlip = forwardRef((props, ref) => {
    const { selectedOrder,selectedReceipt } = useStore();

    const getFormattedDate = () => {
        const date = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    const [currentDate] = useState(getFormattedDate());

    return (
        <div ref={ref} className="p-8 bg-white text-black font-sans w-full aspect-[2/1] max-w-none">
            <div className="border-2 border-black p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b-2 border-black">
                    <div className="text-left">
                        <h1 className="text-4xl font-extrabold tracking-wider">RECEIPT</h1>
                        <p className="text-sm">Vision Academy</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">Date: {currentDate}</p>
                        <p className="font-semibold">Receipt No: <span className="font-mono">{selectedOrder?._id.slice(-6).toUpperCase()}</span></p>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-grow mt-6">
                    <div className="grid grid-cols-3 gap-x-8">
                        <div className="col-span-2">
                            <p className="mb-2"><span className="font-bold text-gray-600">Received From:</span></p>
                            <p className="text-lg font-medium">{selectedOrder?.studentName}</p>
                        </div>
                        <div className="text-right">
                            <p className="mb-2"><span className="font-bold text-gray-600">Amount:</span></p>
                            <p className="text-2xl font-bold">₱{selectedReceipt?.Price?.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="mb-2"><span className="font-bold text-gray-600">For Payment Of:</span></p>
                        <p className="text-lg font-medium">{selectedReceipt?.ItemName}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t-2 border-black text-center">
                    <p className="font-semibold">Authorized Signature</p>
                    <div className="w-1/2 h-px bg-black mx-auto mt-10"></div>
                    <p className="text-sm text-gray-600 mt-2">Thank you for your payment!</p>
                </div>
            </div>
        </div>
    );
});

export default OrderSlip;