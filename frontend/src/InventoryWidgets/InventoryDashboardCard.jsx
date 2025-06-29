import { useState } from "react";
import { useStore } from "../globalVariables";

const InventoryDashboardCard =({LEVELDESTINATION, DISPLAYTEXT})=>{
    const {setWidgetTab, setSpecifiedLevel, getSpecifiedInventoryByYearLevel} = useStore();
    const handleClick = async()=>{
        console.log(LEVELDESTINATION);
        setSpecifiedLevel(LEVELDESTINATION);
        await getSpecifiedInventoryByYearLevel();
        setWidgetTab("inventory-list");
    }
    return(
        <div className="inventory-dashboar-card">
            <button onClick={handleClick}>
            <p>Clickable inventory card for: </p>    
            <p>{DISPLAYTEXT}</p>
            </button>
        </div>
    )
}
export default InventoryDashboardCard;