import {useStore} from "./globalVariables";
import DashboardTab from "./DashboardTab";

import InventoryDashboard from "./InventoryWidgets/InventoryDashboard";
import InventoryList from "./InventoryWidgets/InventoryList";
import AddNewInventory from "./InventoryWidgets/AddNewInventory";
import InventoryItem from "./InventoryWidgets/InventoryItem";
import SpecifiedMakeOrder from "./InventoryWidgets/SpecifiedMakeOrder";
import OrderList from "./InventoryWidgets/OrderList";
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
                {widgetTab === "specified-make-order" && <SpecifiedMakeOrder/>}
                {widgetTab === "order-list" && <OrderList/>}
                
            </div>
        </div>
    );
}

export default MainPage;