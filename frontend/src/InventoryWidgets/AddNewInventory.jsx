import { useStore } from "../globalVariables";
import { useState, useEffect, useRef} from "react";
import { axiosInstance } from "../axios";
import './input-number.css';

const AddNewInventory = () => {
    const {createItem, setWidgetTab} = useStore();
    const [itemName, setItemName] = useState("");
    const [schoolyear, setSchoolYear] = useState("2012");
    const [level, setLevel] = useState("all");
    const [small, setSmall] = useState("0");
    const [medium, setMedium] = useState("0");
    const [large, setLarge] = useState("0");
    const [xlarge, setxlarge] = useState("0");
    const [xxlarge, setxxlarge] = useState("0");
    const [price, setPrice] = useState("100");

    const handleCreateItem = async () => {
        const data = {
            Year: Number(schoolyear) || 0,
            Name: itemName,
            Level: level,
            Small: Number(small) || 0,
            Medium: Number(medium) || 0,
            Large: Number(large) || 0,
            XLarge: Number(xlarge) || 0,
            XXLarge: Number(xxlarge) || 0,
            Price: Number(price) || 0,
        };
        console.log(data);
        await createItem(data);
        setWidgetTab("inventory-list");
    }

    const NumberInput = ({ value, onChange, label, min = 0 }) => {
        const inputRef = useRef(null);
        
        const handleInputChange = (e) => {
            const val = e.target.value;
            // Allow empty string or only digits (changed from /^\d+$/ to /^\d*$/)
            if (val === '' || /^\d*$/.test(val)) {
                onChange(val);
            }
        };

        const handleKeyDown = (e) => {
            // Allow backspace, delete, arrow keys, tab, etc.
            const allowedKeys = [
                'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
                'Tab', 'Home', 'End', 'Enter'
            ];
            
            if (allowedKeys.includes(e.key)) {
                return; // Allow these keys
            }
            
            // Only allow digits
            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        };

        const handleDecrement = () => {
            const currentVal = value === '' ? min : Number(value);
            const newVal = Math.max(min, currentVal - 1);
            onChange(newVal === 0 ? '' : newVal.toString());
        };

        const handleIncrement = () => {
            const currentVal = value === '' ? min : Number(value);
            const newVal = currentVal + 1;
            onChange(newVal.toString());
        };

        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}:</label>
                <div className="flex items-center space-x-2">
                    <button 
                        type="button"
                        onClick={handleDecrement}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                    >
                        -
                    </button>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={value}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        inputMode="numeric"
                        className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button 
                        type="button"
                        onClick={handleIncrement}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Inventory Item</h1>
                    <p className="text-gray-600 dark:text-gray-300">Fill in the details to add a new item to the inventory</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                    <form className="space-y-8">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name:</label>
                                <input 
                                    type="text" 
                                    value={itemName} 
                                    onChange={(e) => setItemName(e.target.value)} 
                                    placeholder="Enter item name..."
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">School Level:</label>
                                <select 
                                    value={level} 
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                >
                                    <option value="all">All levels</option>
                                    <option value="kindergarten">Kindergarten</option>
                                    <option value="elementary">Elementary</option>
                                    <option value="JHS">Junior Highschool</option>
                                    <option value="SHS">Senior Highschool</option>
                                    <option value="college">College</option>
                                </select>
                            </div>
                        </div>

                        {/* School Year and Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <NumberInput 
                                value={schoolyear} 
                                onChange={setSchoolYear} 
                                label="Starting School Year"
                                min={2000}
                            />
                            <NumberInput 
                                value={price} 
                                onChange={setPrice} 
                                label="Price (₱)"
                                min={1}
                            />
                        </div>

                        {/* Stock Sizes */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="material-symbols-rounded text-indigo-500 mr-2">inventory</span>
                                Initial Stock Quantities
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                <NumberInput value={small} onChange={setSmall} label="Small" />
                                <NumberInput value={medium} onChange={setMedium} label="Medium" />
                                <NumberInput value={large} onChange={setLarge} label="Large" />
                                <NumberInput value={xlarge} onChange={setxlarge} label="X-Large" />
                                <NumberInput value={xxlarge} onChange={setxxlarge} label="XX-Large" />
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Total Stock:</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{(Number(small)||0)+(Number(medium)||0)+(Number(large)||0)+(Number(xlarge)||0)+(Number(xxlarge)||0)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Price:</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">₱{price}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Level:</p>
                                    <p className="font-semibold text-gray-900 dark:text-white capitalize">{level}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">Year:</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{schoolyear}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="button"
                                onClick={() => setWidgetTab("inventory-list")}
                                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateItem}
                                disabled={!itemName.trim()}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Create New Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNewInventory;