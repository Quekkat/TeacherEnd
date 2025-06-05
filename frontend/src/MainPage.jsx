import {useStore} from "./globalVariables";
import InventoryWidget from "./Widgets/InventoryWidget";
import CreateNewInventory from"./Widgets/CreateNewInventoryWidget";
import VerifyTeachers from "./Widgets/VerifyTeacherWidget";
import DashboardTab from "./DashboardTab";
import Transaction from "./Widgets/TransactionWidget";
import AddNewPayment from "./Widgets/AddNewPaymentWidget";
import VerifyStudent from "./Widgets/VerifyStudentWidget";
import VerifyStudentPayment from "./Widgets/VerifyStudentPaymentWidget";


const MainPage = ()=>{
    const{widgetTab} = useStore();
    return(
        <div>
            <div>
                <p>left tab container</p>
                <DashboardTab/>
            </div>
            <div>
                <p> container</p>
                {widgetTab ==="inventory" && <InventoryWidget/>}
                {widgetTab ==="add-new" && <CreateNewInventory/>}
                {widgetTab === "verify-teachers" && <VerifyTeachers/>}
                {widgetTab ==="verify-payment" && <VerifyStudentPayment/>}
                {widgetTab ==="transaction-history" && <Transaction/>}
                {widgetTab ==="verify-student" && <VerifyStudent/>}
                {widgetTab ==="add-new-payment" && <AddNewPayment/>}
            </div>
        </div>
    );
}
export default MainPage;