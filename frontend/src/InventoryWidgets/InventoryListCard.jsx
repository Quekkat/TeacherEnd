import { useState } from "react";
import { useStore } from "../globalVariables";
const InventoryListCard =({INVENTORY})=>{
    const {setSelectedInventoryItem, setWidgetTab} = useStore();
    const openInventory =()=>{
        console.log(INVENTORY._id);
        setSelectedInventoryItem(INVENTORY);
        setWidgetTab("inventory-item");
    }
    return(
            <button className="inventory-list-card-base" onClick={openInventory}>
                <div className="inventory-list-card-img-container">
                    <img className="inventory-item-image" src={INVENTORY.imageUrl} alt="emptyImagetemplate.jpg"/>
                </div>
                <p>Displays list of inventories </p>
                <p>Item name: {INVENTORY.name}</p>
                <p>Year level: {INVENTORY.year}</p>  
                <p>Size: {INVENTORY.size}</p>
            </button>
    )
}
export default InventoryListCard;