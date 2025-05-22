import {useStore} from "./globalVariables";

const DashboardTab= ()=>{
    const {setWidgetTab}= useStore();
    return(
        <div>
            <p>Dashboard tab</p>
            <button onClick={()=>setWidgetTab("inventory")}> Item List</button>
            <button onClick={()=>setWidgetTab("add-new")}> Add new</button>
            <button onClick={()=>setWidgetTab("verify-teachers")}> Verify Teachers</button>
            <button onClick={()=>setWidgetTab("verify-payment")}> Verify payment</button>
            <button onClick={()=>setWidgetTab("transaction-history")}> Transaction History</button>
            <button onClick={()=>setWidgetTab("verify-payment")}> Verify Student</button>
            


        </div>
    )
}

export default DashboardTab;