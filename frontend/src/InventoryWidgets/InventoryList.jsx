import { useState } from "react";
import { useStore } from "../globalVariables";

const InventoryList =()=>{
    const {specifiedLevel} =useStore();
    return(
        <div>
            <p>Displays list of inventories </p>
            <p>The current selected year level is: {specifiedLevel}</p>
        </div>
    )
}
export default InventoryList;