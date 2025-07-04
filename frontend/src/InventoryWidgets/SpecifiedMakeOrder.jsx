import { useState } from "react";
import { useStore } from "../globalVariables";

const SpecifiedMakeOrder = () => {
    const { selectedInventoryItem, setWidgetTab, orderItem, getOrderList } = useStore();
    const [popupWindow, setPopupWindow] = useState(false);
    const [userData, setUserData] = useState({
        itemID: selectedInventoryItem._id,
        Studentname: [''], // initial one input
    });
         // Add a new empty input field
    const addStudents = () => {
        setUserData(prev => ({ ...prev, Studentname: [...prev.Studentname, ''] }));
    };
    // Remove last input
    const removeStudents = (index) => {
        if (userData.Studentname.length <= 1) return; // Prevent removing the last input
        const updatedStudents = [...userData.Studentname];
        updatedStudents.splice(index, 1);
        setUserData(prev => ({ ...prev, Studentname: updatedStudents }));
    };

    // Handle typing in any input
    const handleStudentChange = (index, value) => {
        const updatedStudents = [...userData.Studentname];
        updatedStudents[index] = value;

        setUserData(prev => ({ ...prev, Studentname: updatedStudents }));
    };

    const handleBack = () => {
        setWidgetTab("inventory-list");
    };

    const handleOrderItem = async () => {
        await orderItem(userData);
        await getOrderList();
        setWidgetTab("inventory-list");
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
            <div className="flex items-start gap-x-8">
                <button 
                    onClick={handleBack} 
                    className="mt-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Go back"
                >
                    <span className="material-symbols-rounded text-4xl">arrow_back</span>
                </button>

                <div className="flex-grow bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img 
                                className="w-full h-full object-cover min-h-[300px]"
                                src={selectedInventoryItem.imageUrl} 
                                alt={selectedInventoryItem.name}
                            />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order For:</h1>
                            <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 capitalize">{selectedInventoryItem.name}</p>
                            
                            <div className="flex-grow space-y-4 overflow-y-auto max-h-64 pr-2">
                                {userData.Studentname.map((name, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => handleStudentChange(index, e.target.value)}
                                            placeholder={`Student ${index + 1} Name`}
                                            className="flex-grow w-full px-4 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button 
                                            onClick={() => removeStudents(index)} 
                                            disabled={userData.Studentname.length <= 1}
                                            className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="material-symbols-rounded">remove_circle_outline</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button onClick={addStudents} className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                + Add Another Student
                            </button>

                            <div className="mt-auto pt-6">
                                <button 
                                    onClick={() => setPopupWindow(true)} 
                                    className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {popupWindow && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm Your Order</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to place this order for {userData.Studentname.filter(n => n.trim()).length} student(s)?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setPopupWindow(false)} className="py-2 px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors">No, Cancel</button>
                            <button onClick={handleOrderItem} className="py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors">Yes, Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecifiedMakeOrder;