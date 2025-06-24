import {useStore} from "./globalVariables";
import DashboardTab from "./DashboardTab";

import InventoryDashboard from "./InventoryWidgets/InventoryDashboard";
import InventoryList from "./InventoryWidgets/InventoryList";
import AddNewInventory from "./InventoryWidgets/AddNewInventory";
import InventoryItem from "./InventoryWidgets/InventoryItem";

import "./MainPage.css";

const MainPage = () => {
    const {widgetTab} = useStore();
    return(
        <div className="main-page-container">
            <DashboardTab/>
            <div className="main-content">
                {widgetTab ==="inventory-dashboard" && <InventoryDashboard/>}
                {widgetTab ==="inventory-list"&& <InventoryList/>}
                {widgetTab === "add-new-inventory" && <AddNewInventory/>}
                {widgetTab === "inventory-item" && <InventoryItem/> }
            </div>
        </div>
    );
}

export default MainPage;