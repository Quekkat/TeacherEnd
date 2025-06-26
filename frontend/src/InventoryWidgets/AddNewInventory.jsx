import { useStore } from "../globalVariables";
import { useState, useEffect, useRef} from "react";

const AddNewInventory =()=>{
    const {setWidgetTab, setSpecifiedLevel, specifiedLevel} =useStore();
    var previousLevel;
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


    return(
        <div className="add-new-inventory-item-base">
            <div className="add-new-inventory-left-div">
                <button onClick={handleBackButton}>back</button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{display: "none"}} onChange={handleImageChange}/>
                <div onClick={handleClick} style={{ width: "200px", height: "200px", border: "2px dashed gray", borderRadius: "10px", cursor: "pointer", overflow: "hidden", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${imagePreview || "/testImage.jpg"})`}} />
                <button>Add new item to inventory</button>
            </div>
            <div className="add-new-inventory-right-div">
                <p> Item name: text field here</p>
                <p> Item size: selection here</p>
                <p>Initial stock ammount: selection here</p>
                <p>Section: selection here</p>
                <p>Year or level: selection here</p>
            </div>
        </div>
    )
}

export default AddNewInventory;