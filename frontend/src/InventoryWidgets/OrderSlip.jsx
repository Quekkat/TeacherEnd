import { useState, forwardRef } from "react";
import { useStore } from "../globalVariables";
const OrderSlip = ({props,ref})=>{
    const {selectedOrder} = useStore();
    //Returns current date:
    const getFormattedDate = () => {
        const date = new Date();
        const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

  const [currentDate, setCurrentDate] = useState(getFormattedDate());






    return(
        <div ref={ref} className="order-slip-base">
            <div className="order-slip-vertical-box">
                <p className="order-slip-title"> RECEIPT</p>
                <div className="order-slip-flex-box">
                    <div className="order-slip-left-div">
                        <p>No:___________</p>
                        <p>Received by: {selectedOrder.studentName} </p>
                        <p>Payment for: {selectedOrder.itemName}</p>
                        <p>Item price: {selectedOrder.itemPrice}</p>
                    </div>
                    <div className="order-slip-right-div">
                        <p>Date: {currentDate}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default OrderSlip;