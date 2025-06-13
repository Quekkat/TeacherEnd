import {useStore} from "./globalVariables";
import InventoryWidget from "./Widgets/InventoryWidget";
import CreateNewInventory from"./Widgets/CreateNewInventoryWidget";
import VerifyTeachers from "./Widgets/VerifyTeacherWidget";
import DashboardTab from "./DashboardTab";
import Transaction from "./Widgets/TransactionWidget";
import AddNewPayment from "./Widgets/AddNewPaymentWidget";
import VerifyStudent from "./Widgets/VerifyStudentWidget";
import VerifyStudentPayment from "./Widgets/VerifyStudentPaymentWidget";
import StockList from "./Widgets/StockList";

    
const MainPage = ()=>{
    const{widgetTab} = useStore();
    return(
        <div>
            <div>
                
                <DashboardTab/>
            </div>
            <div>
                
                {widgetTab ==="inventory" && <InventoryWidget/>}
                {widgetTab ==="add-new" && <CreateNewInventory/>}
                {widgetTab === "verify-teachers" && <VerifyTeachers/>}
                {widgetTab ==="verify-payment" && <VerifyStudentPayment/>}
                {widgetTab ==="transaction-history" && <Transaction/>}
                {widgetTab ==="verify-student" && <VerifyStudent/>}
                {widgetTab ==="add-new-payment" && <AddNewPayment/>}
                {widgetTab ==="stock-list" && <StockList/>}
            </div>
        </div>
    );
}
export default MainPage;