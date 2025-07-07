import {useStore} from "./globalVariables";
import DashboardTab from "./DashboardTab";

import InventoryDashboard from "./InventoryWidgets/InventoryDashboard";
import InventoryList from "./InventoryWidgets/InventoryList";
import AddNewInventory from "./InventoryWidgets/AddNewInventory";
import InventoryItem from "./InventoryWidgets/InventoryItem";
import SpecifiedMakeOrder from "./InventoryWidgets/SpecifiedMakeOrder";
import OrderList from "./InventoryWidgets/OrderList";
import Teacher from "./InventoryWidgets/Teachers";

const MainPage = () => {
    const {widgetTab} = useStore();
    return(
        <div className="relative flex w-full overflow-x-hidden">
            <DashboardTab/>
            <div className="flex-1 min-h-screen flex justify-center w-full lg:w-[calc(100%-280px)] ml-0 lg:ml-72 p-5 pt-16 lg:pt-5 transition-all duration-300 ease-in-out">
                {widgetTab ==="inventory-dashboard" && <InventoryDashboard/>}
                {widgetTab ==="inventory-list"&& <InventoryList/>}
                {widgetTab === "add-new-inventory" && <AddNewInventory/>}
                {widgetTab === "inventory-item" && <InventoryItem/> }
                {widgetTab === "specified-make-order" && <SpecifiedMakeOrder/>}
                {widgetTab === "order-list" && <OrderList/>}
                {widgetTab === "teachers" && <Teacher/>}
            </div>
        </div>
    );
}

export default MainPage;