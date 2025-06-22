import { useState } from "react";
const InventoryDashboardCard =({LEVELDESTINATION, DISPLAYTEXT})=>{
    return(
        <div>
            <p>Clickable inventory card for: </p>    
            <p>{DISPLAYTEXT}</p>
        </div>
    )
}
export default InventoryDashboardCard;