import { useState } from "react";
import InventoryDashboardCard from "./InventoryDashboardCard";
const InventoryDashboard =()=>{
    return(
        <div className="inventory-dashboard-parent">
            <InventoryDashboardCard DISPLAYTEXT={"KINDERGARTEN"} LEVELDESTINATION={"kindergarten"}/>
            <InventoryDashboardCard DISPLAYTEXT={"ELEMENTARY"} LEVELDESTINATION={"elementary"}/>
            <InventoryDashboardCard DISPLAYTEXT={"HIGHSCHOOL"} LEVELDESTINATION={"highschool"}/>
            <InventoryDashboardCard DISPLAYTEXT={"COLLEGE"} LEVELDESTINATION={"college"}/>

        </div>
    )
}
export default InventoryDashboard;