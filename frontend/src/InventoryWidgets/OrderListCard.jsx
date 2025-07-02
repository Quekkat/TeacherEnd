import { useState } from "react";
import { useStore } from "../globalVariables";
const OrderListCard = ({ORDER, TOGGLEPOPUP})=>{
    const {setSelectedOrder} = useStore();
    const handleClick =()=>{
        setSelectedOrder(ORDER);
        console.log("print button clicked");
        TOGGLEPOPUP();
    }
    return(
        <div className="order-list-card-base">
            <div className="content-div">
                <p>Name: {ORDER.studentName}</p>
                <p>Item ordered: {ORDER.itemName}</p>
            </div>
            <button onClick={handleClick}> Print</button>
        </div>
    )
}
export default OrderListCard;