import { useStore } from "../globalVariables";
import { useState, useEffect, useRef} from "react";
import { axiosInstance } from "../axios";
import './input-number.css';

const AddNewInventory =()=>{
    const {createItem, setWidgetTab} = useStore();
    const [itemName, setItemName] = useState("");
    const [schoolyear, setSchoolYear] = useState(2012);
    const [level, setLevel] = useState("all");
    const [small, setSmall] = useState(0);
    const [medium, setMedium] = useState(0);
    const [large, setLarge] = useState(0);
    const [xlarge, setxlarge] = useState(0);
    const [xxlarge, setxxlarge] = useState(0);
    const [price, setPrice] = useState(100);

    const handleCreateItem = async ()=>{
        const data = {
            Year: schoolyear,
            Name: itemName,
            Level: level,
            Small: small,
            Medium: medium,
            Large: large,
            XLarge: xlarge,
            XXLarge: xxlarge,
            Price: price,
        };
        console.log(data);
        await createItem(data);
        setWidgetTab("inventory-list");

    }

    return(
        <div className="add-new-inventory-base">
            <p>Name:</p>
            <input type="text" value={itemName} onChange={(e)=>setItemName(e.target.value)} required/>
            <p>Starting Schoolyear: </p>
            <div className="number-input-div-container">
                <button onClick={()=>setSchoolYear(prev => prev +1)}>+</button>
                <input type="number" value={schoolyear} onChange={(e)=> setSchoolYear(Number(e.target.value))}/>
                <button onClick={()=>setSchoolYear(prev => prev-1)}>-</button>
            </div>
            <p>Item School Level:</p>
            <select value={level} onChange={(e)=>setLevel(e.target.value)}>
                <option value={"all"}>All levels</option>
                <option value={"kindergarten"}> Kindergarten</option>
                <option value={"elementary"}> Elementary</option>
                <option value={"JHS"}> Junior Highschool</option>
                <option value={"SHS"}> Senior Highschool</option>
                <option value={"college"}> College</option>
            </select>
            <p>Intial stocks: </p>
            <p>Small:</p>
            <div className="number-input-div-container">
                <button onClick={()=>setSmall(prev => prev +1)}>+</button>
                <input type="number" value={small} onChange={(e)=> setSmall(Number(e.target.value))}/>
                <button onClick={()=>setSmall(prev => prev-1)}>-</button>
            </div>
            <p>Medium:</p>
            <div className="number-input-div-container">
                <button onClick={()=>setMedium(prev => prev +1)}>+</button>
                <input type="number" value={medium} onChange={(e)=> setMedium(Number(e.target.value))}/>
                <button onClick={()=>setMedium(prev => prev-1)}>-</button>
            </div>
            <p>Large:</p>
            <div className="number-input-div-container">
                <button onClick={()=>setLarge(prev => prev +1)}>+</button>
                <input type="number" value={large} onChange={(e)=> setLarge(Number(e.target.value))}/>
                <button onClick={()=>setLarge(prev => prev-1)}>-</button>
            </div>
            <p>X Large:</p>
            <div className="number-input-div-container">
                <button onClick={()=>setxlarge(prev => prev +1)}>+</button>
                <input type="number" value={xlarge} onChange={(e)=> setxlarge(Number(e.target.value))}/>
                <button onClick={()=>setxlarge(prev => prev-1)}>-</button>
            </div>
            <p>XX Large:</p>
            <div className="number-input-div-container">
                <button onClick={()=>setxxlarge(prev => prev +1)}>+</button>
                <input type="number" value={xxlarge} onChange={(e)=> setxxlarge(Number(e.target.value))}/>
                <button onClick={()=>setxxlarge(prev => prev-1)}>-</button>
            </div>
            <p>Price: </p>
            <div className="number-input-div-container">
                <button onClick={()=>setPrice(prev => prev +1)}>+</button>
                <input type="number" value={price} onChange={(e)=> setPrice(Number(e.target.value))}/>
                <button onClick={()=>setPrice(prev => prev-1)}>-</button>
            </div>
            <button onClick={handleCreateItem}> create new item</button>

        </div>
    )
}

export default AddNewInventory;