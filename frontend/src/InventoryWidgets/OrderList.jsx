import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
import OrderListPopup from "./OrderListPopup";
import OrderListCard from "./OrderListCard";
import { axiosInstance } from "../axios";
const OrderList = ()=>{
    const [showPrint, setShowPrint] = useState(false);
    const {orderList, setOrderList} = useStore();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axiosInstance.post("/auth/getorderitem");
                console.log(res.data);
                setOrderList(res.data);
            }catch(error){
                console.log(error.response.data.message);
            }
        };

        fetchData(); // Call the async function
    }, []); // [] makes it run only once on mount



    return(
        <div className="order-list-base">
            <div className="order-list-content">
                <div className="order-list-vertical-box">
                    <div className="order-list-tab">
                        <p>display order list tab here: ex search bar</p>
                    </div>
                    <div className="order-list-container">
                        {orderList?.length > 0 && orderList.map(order=>(<OrderListCard key={order._id} ORDER={order} TOGGLEPOPUP={()=>setShowPrint(true)}/>))}
                    </div>
                </div>
            </div>
            {showPrint && <OrderListPopup HIDEPOPUP={()=>setShowPrint(false)}/>}
        </div>
    )
}
export default OrderList;