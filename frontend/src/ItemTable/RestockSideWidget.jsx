import { useState } from "react";
import { useStore } from "../globalVariables";

const RestockSideWidget = ({item}) => {
    const {restockItem} = useStore();
    const [small, setSmall] = useState(0);
    const [medium, setMedium] = useState(0);
    const [large, setLarge] = useState(0);
    const [xl, setxl] = useState(0);
    const [xxl, setxxl] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCreateOrder = async () => {
        setIsLoading(true);
        try {
            const data = {
                id: item._id,
                SMALL: small,
                MEDIUM: medium,
                LARGE: large,
                XL: xl,
                XXL: xxl,
            }
            console.log(data);
            await restockItem(data);
            
            // Reset all values after successful restock
            setSmall(0);
            setMedium(0);
            setLarge(0);
            setxl(0);
            setxxl(0);
            
            // Show success message
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error restocking item:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const NumberInput = ({ value, onChange, label, icon, color = "blue" }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${color}-100 dark:bg-${color}-900 rounded-lg`}>
                    <span className={`material-symbols-rounded text-${color}-600 dark:text-${color}-400 text-lg`}>
                        {icon}
                    </span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{label}:</span>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => onChange(Math.max(0, value - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded-lg text-red-600 dark:text-red-400 font-semibold transition-colors"
                >
                    -
                </button>
                <input 
                    type="number" 
                    value={value} 
                    onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
                    className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                    min="0"
                />
                <button 
                    onClick={() => onChange(value + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg text-green-600 dark:text-green-400 font-semibold transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    );

    const totalItems = small + medium + large + xl + xxl;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <span className="material-symbols-rounded text-blue-600 dark:text-blue-400 text-2xl">add_box</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Restock Item</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add new stock for {item.ItemName}</p>
                </div>
            </div>

            {/* Size Inputs */}
            <div className="space-y-3 mb-6">
                <NumberInput 
                    value={small} 
                    onChange={setSmall} 
                    label="Small" 
                    icon="crop_free"
                    color="blue"
                />
                <NumberInput 
                    value={medium} 
                    onChange={setMedium} 
                    label="Medium" 
                    icon="crop_3_2"
                    color="green"
                />
                <NumberInput 
                    value={large} 
                    onChange={setLarge} 
                    label="Large" 
                    icon="crop_5_4"
                    color="orange"
                />
                <NumberInput 
                    value={xl} 
                    onChange={setxl} 
                    label="X-Large" 
                    icon="crop_16_9"
                    color="purple"
                />
                <NumberInput 
                    value={xxl} 
                    onChange={setxxl} 
                    label="XX-Large" 
                    icon="fullscreen"
                    color="pink"
                />
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="material-symbols-rounded text-gray-600 dark:text-gray-400">calculate</span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items to Add:</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalItems}</span>
                </div>
                {totalItems > 0 && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Estimated value: ₱{((item.Price || 0) * totalItems).toLocaleString()}
                    </div>
                )}
            </div>

            {/* Action Button */}
            <button 
                onClick={handleCreateOrder}
                disabled={totalItems === 0 || isLoading}
                className={`w-full py-3 px-4 ${
                    showSuccess 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                } disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2`}
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                    </>
                ) : showSuccess ? (
                    <>
                        <span className="material-symbols-rounded">check_circle</span>
                        <span>Restock Successful!</span>
                    </>
                ) : (
                    <>
                        <span className="material-symbols-rounded">inventory</span>
                        <span>Confirm Restock ({totalItems} items)</span>
                    </>
                )}
            </button>
        </div>
    );
}

export default RestockSideWidget;