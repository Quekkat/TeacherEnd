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
            <button onClick={openInventory}>
                <p>Displays list of inventories </p>
                <p>Item name: {INVENTORY.Name}</p>
                <p>Year level: {INVENTORY.YearLevel}</p>  
                <p>Size: {INVENTORY.Size}</p>
            </button>
    )
}
export default InventoryListCard;