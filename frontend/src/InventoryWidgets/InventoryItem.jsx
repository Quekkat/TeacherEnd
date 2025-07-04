import { useState } from "react";
import { useStore } from "../globalVariables";

const InventoryItem = () => {
    const { selectedInventoryItem, setWidgetTab, restockItem, getSpecifiedInventoryByYearLevel } = useStore();
    const [restock, setRestock] = useState(0);
    const [confirmRestock, setConfirmRestock] = useState(false);

    const backEvent = () => {
        setWidgetTab("inventory-list");
    };

    const handleRestockEvent = async () => {
        if (restock <= 0) return;
        await restockItem(selectedInventoryItem._id, restock);
        await getSpecifiedInventoryByYearLevel();
        backEvent();
    };

    const handleMakeOrder = () => {
        setWidgetTab("specified-make-order");
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
            <div className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
                <button 
                    onClick={backEvent} 
                    className="absolute top-6 left-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
                    aria-label="Go back"
                >
                    <span className="material-symbols-rounded text-4xl">arrow_back_ios_new</span>
                </button>

                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img 
                            className="w-full h-full object-cover min-h-[300px]"
                            src={selectedInventoryItem.imageUrl} 
                            alt={selectedInventoryItem.name}
                        />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 capitalize">{selectedInventoryItem.name}</h1>
                            <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                                <p><span className="font-semibold">Amount Available:</span> {selectedInventoryItem.ammount - selectedInventoryItem.ordered}</p>
                                <p><span className="font-semibold">Total Amount:</span> {selectedInventoryItem.ammount}</p>
                                <p><span className="font-semibold">Pre-ordered:</span> {selectedInventoryItem.preorder}</p>
                                <p><span className="font-semibold">Size:</span> {selectedInventoryItem.size}</p>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <button 
                                onClick={handleMakeOrder} 
                                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                            >
                                Order Now
                            </button>
                            <div className="mt-6 text-center">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Restock Item</label>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <button onClick={() => setRestock(prev => Math.max(0, prev - 1))} className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full font-bold text-xl">-</button>
                                    <input 
                                        type="number" 
                                        value={restock}
                                        onChange={e => setRestock(Number(e.target.value) < 0 ? 0 : Number(e.target.value))}
                                        className="w-20 text-center bg-transparent dark:text-white text-xl font-semibold"
                                    />
                                    <button onClick={() => setRestock(prev => prev + 1)} className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full font-bold text-xl">+</button>
                                    <button onClick={() => setConfirmRestock(true)} className="ml-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-sm transition-all">Restock</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {confirmRestock && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm Restock</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to add {restock} unit(s) to the inventory?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setConfirmRestock(false)} className="py-2 px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors">No, Cancel</button>
                            <button onClick={handleRestockEvent} className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">Yes, Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryItem;