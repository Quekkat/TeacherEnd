import { useStore } from "../globalVariables";
import { useState, useEffect, useRef} from "react";

const AddNewInventory =()=>{
    const {setWidgetTab, setSpecifiedLevel, specifiedLevel} =useStore();
    var previousLevel;
    const [selectedSize, setSelectedSize] = useState("any");
    const [initialStockAmmount, setInitialStockAmmount]= useState(0);
    const [section, setSection] = useState("all");
    const [selectedYear, setSelectedYear] = useState("kindergarten");
    const [itemName, setItemName] = useState("");


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

    const handleCreateInventory =()=>{
        const data = {
            ITEMNAME:itemName,
            SIZE: selectedSize,
            SECTION: section,
            YEARLEVEL: selectedYear,
            AMMOUNT: initialStockAmmount,
            IMGFILE: imageFile,
        }
    }


    return(
        <div className="add-new-inventory-item-base">
        <div className="add-new-inventory-item-vertical-box">
        <div className="add-new-inventory-item-horizontal-box">

        </div>
        </div>
            <div className="add-new-inventory-left-div">
                <button onClick={handleBackButton}>back</button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{display: "none"}} onChange={handleImageChange}/>
                <div onClick={handleClick} style={{ width: "200px", height: "200px", border: "2px dashed gray", borderRadius: "10px", cursor: "pointer", overflow: "hidden", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${imagePreview || "/testImage.jpg"})`}} />
                <button onClick={handleCreateInventory}>Add new item to inventory</button>
            </div>
            <div className="add-new-inventory-right-div">
                <p> Item name:</p>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                <p> Item size:</p>
                <select value={selectedSize} onChange={handleSizeChange}>
                    <option value="any"> Any</option>
                    <option value="small"> Small</option>
                    <option value="medium"> Medium</option>
                    <option value="large"> Large</option>
                    <option value="extra-large"> Extra Lage</option>

                </select>
                <p>Section:</p>
                <select value={section} onChange={handleSectionChange}>
                    <option value="all"> All</option>
                    <option value="A"> A</option>
                    <option value="B"> B</option>
                    <option value="C"> C</option>
                </select>
                <p>Year or level: </p>
                <select value={selectedYear} onChange={handleYearChange}>
                    <option value="all"> All levels</option>
                    <option value="kindergarten"> Kindergarten</option>
                    <option value="elementary"> Elementary</option>
                    <option value="highschool"> Highschool</option>
                    <option value="college"> College</option>
                </select>
                <p>Initial stock ammount:</p>
                <div className="ammount-selector-div">
                    <button onClick={() => setInitialStockAmmount(prev => prev + 1)}>+</button>
                    <input type="number" value={initialStockAmmount} onChange={e => setInitialStockAmmount(Number(e.target.value))}/>
                    <button onClick={() => setInitialStockAmmount(prev => prev - 1)}>-</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewInventory;