import { useStore } from "../globalVariables";
import { useState, useEffect, useRef} from "react";
import { axiosInstance } from "../axios";
import './input-number.css';

const AddNewInventory =()=>{
    const {setWidgetTab, setSpecifiedLevel, specifiedLevel, getSpecifiedInventoryByYearLevel} =useStore();
    var previousLevel;
    const [selectedSize, setSelectedSize] = useState("any");
    const [initialStockAmmount, setInitialStockAmmount]= useState(0);
    const [section, setSection] = useState("all");
    const [selectedYear, setSelectedYear] = useState("kindergarten");
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(0);


    const handleSizeChange = (e)=>{
        setSelectedSize(e.target.value);
    }
    const handleSectionChange = (e)=>{
        setSection(e.target.value);
    }
    const handleYearChange = (e)=>{
        setSelectedYear(e.target.value);
    }

    useEffect(()=>{
        previousLevel = specifiedLevel;
    },[]);

    const handleBackButton =()=>{
        setSpecifiedLevel(previousLevel);
        setWidgetTab("inventory-list");
    }
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // actual image file
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // used for background preview
            setImageFile(file); // store file for uploading
        }
    };


    const handleClick = () => {
        fileInputRef.current.click(); // triggers hidden input
    };

    const handleCreateInventory = async()=>{
        try{
            const data = {
                ITEMNAME:itemName,
                SIZE: selectedSize,
                SECTION: section,
                YEARLEVEL: selectedYear,
                AMMOUNT: Number(initialStockAmmount) || 0,
                price: Number(price) || 0,
            }
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            formData.append("itemImage", imageFile);
            const res = await axiosInstance.post("/auth/createInventory", formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);

            await getSpecifiedInventoryByYearLevel();
            setWidgetTab("inventory-list");

        }catch(error){
            console.log(error.response.data.message);
        }
    }


    return(
        <div className="bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <button 
                onClick={handleBackButton} 
                className="mb-4 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full p-2 transition-colors duration-200"
            >
                <span className="material-symbols-rounded">arrow_back</span>
            </button>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Add New Inventory Item</h2>
            
            {/* Image Upload */}
            <div className="flex flex-col items-center mb-8">
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    style={{display: "none"}} 
                    onChange={handleImageChange} 
                    name="itemImage"
                />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Image</label>
                <div 
                    onClick={handleClick} 
                    className="w-full h-64 bg-gray-200 dark:bg-gray-800 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg cursor-pointer bg-contain bg-no-repeat bg-center flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-gray-500 dark:hover:border-gray-400 transition-colors duration-200"
                    style={{ backgroundImage: `url(${imagePreview || ""})`}}
                >
                    {!imagePreview && (
                        <div className="text-center">
                            <span className="material-symbols-rounded text-6xl">add_photo_alternate</span>
                            <p className="font-semibold text-gray-600 dark:text-gray-300 mt-2">Click to upload image</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Item Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name</label>
                    <input 
                        type="text" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                </div>

                {/* Item Size */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Size</label>
                    <select 
                        value={selectedSize} 
                        onChange={handleSizeChange}
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="any">Any</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="extra-large">Extra Large</option>
                    </select>
                </div>

                {/* Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section</label>
                    <select 
                        value={section} 
                        onChange={handleSectionChange}
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="all">All</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                {/* Year or Level */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year or Level</label>
                    <select 
                        value={selectedYear} 
                        onChange={handleYearChange}
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="all">All levels</option>
                        <option value="kindergarten">Kindergarten</option>
                        <option value="elementary">Elementary</option>
                        <option value="highschool">Highschool</option>
                        <option value="college">College</option>
                    </select>
                </div>

                {/* Initial Stock Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Stock</label>
                    <div className="flex items-center">
                        <button onClick={() => setInitialStockAmmount(prev => Math.max(0, Number(prev) - 1))} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-l-lg hover:bg-gray-400 dark:hover:bg-gray-500">-</button>
                        <input 
                            type="number" 
                            value={initialStockAmmount}
                            onFocus={() => initialStockAmmount === 0 && setInitialStockAmmount('')}
                            onBlur={() => initialStockAmmount === '' && setInitialStockAmmount(0)}
                            onChange={e => setInitialStockAmmount(e.target.value)}
                            className="w-full text-center p-2 bg-white dark:bg-gray-700 border-t border-b border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 no-spinner"
                        />
                        <button onClick={() => setInitialStockAmmount(prev => Number(prev) + 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-r-lg hover:bg-gray-400 dark:hover:bg-gray-500">+</button>
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₱)</label>
                    <div className="flex items-center">
                        <button onClick={() => setPrice(prev => Math.max(0, Number(prev) - 1))} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-l-lg hover:bg-gray-400 dark:hover:bg-gray-500">-</button>
                        <input 
                            type="number" 
                            value={price}
                            onFocus={() => price === 0 && setPrice('')}
                            onBlur={() => price === '' && setPrice(0)}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full text-center p-2 bg-white dark:bg-gray-700 border-t border-b border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 no-spinner"
                        />
                        <button onClick={() => setPrice(prev => Number(prev) + 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-r-lg hover:bg-gray-400 dark:hover:bg-gray-500">+</button>
                    </div>
                </div>
            </div>

            {/* Add Item Button */}
            <button 
                onClick={handleCreateInventory} 
                className="mt-8 w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800 transition-all duration-300 flex items-center justify-center"
            >
                <span className="material-symbols-rounded mr-2">add_circle</span>
                Add New Item
            </button>
        </div>
    )
}

export default AddNewInventory;