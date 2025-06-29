import { useState, useEffect} from "react";
import { useStore } from "../globalVariables";
import AddNewCard from "./AddNewCard";
import InventoryListCard from "./InventoryListCard";

const InventoryList =()=>{
    const {specifiedLevel, inventoryList} =useStore();
    const handleSearch =(e)=>{
        e.preventDefault();
        console.log("handle search inventory here");
    }
    return(
        <div>
            <div className="inventory-list-navigation-bar">
                <form onSubmit={handleSearch}>
                <p>List of inventory for: {specifiedLevel} </p>
                <p>Search: </p>
                <input type="text" placeholder="search..." className="searchbox-input"/>
                <button type="submit"> Search</button>
                </form>

            </div>
            <div className="inventory-list-card-container">
            {inventoryList.length > 0 && inventoryList.map(inventory =>(<InventoryListCard key={inventory._id} INVENTORY={inventory}/>))}
            <AddNewCard/>
            </div>
        </div>
    )
}
export default InventoryList;