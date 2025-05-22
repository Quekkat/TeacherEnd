import {useStore} from "./globalVariables";
import InventoryWidget from "./InventoryWidget";
import CreateNewInventory from"./CreateNewInventoryWidget";
import VerifyTeachers from "./VerifyTeacherWidget";
import DashboardTab from "./DashboardTab";
import Transaction from "./TransactionWidget";
import AddNewPayment from "./AddNewPaymentWidget";
import VerifyStudent from "./VerifyStudentWidget";
import VerifyStudentPayment from "./VerifyStudentPaymentWidget";


const MainPage = ()=>{
    const{widgetTab} = useStore();
    return(
        <div>
            <div>
                <p>left tab container</p>
            </div>
            <div>
                <p> container</p>
                {widgetTab ==="inventory" && <InventoryWidget/>}
                {widgetTab ==="add-new" && <CreateNewInventory/>}
                {widgetTab === "verify-teachers" && <VerifyTeachers/>}
                {widgetTab ==="verify-payment" && <VerifyStudentPayment/>}
                {widgetTab ==="transaction-history" && <Transaction/>}
                {widgetTab ==="verify-student" && <VerifyStudentPayment/>}
            </div>
        </div>
    );
}
export default MainPage;