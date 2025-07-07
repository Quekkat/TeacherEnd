import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
import OrderListPopup from "./OrderListPopup";
import OrderListCard from "./OrderListCard";
import { axiosInstance } from "../axios";
const OrderList = ()=>{
    const [showPrint, setShowPrint] = useState(false);
    const {orderList, setOrderList} = useStore();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axiosInstance.post("/auth/getorderitem");
                setOrderList(res.data);
            }catch(error){
                console.log(error.response?.data?.message || "An error occurred");
            }
        };

        fetchData();
    }, [setOrderList]);

    const filteredOrders = orderList?.filter(order =>
        order.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <div className="p-4 w-full">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <input 
                        type="text"
                        placeholder="Search by student name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 dark:text-white"
                    />
                </div>
                <div className="space-y-4">
                    {filteredOrders?.length > 0 ? (
                        filteredOrders.map(order => (
                            <OrderListCard 
                                key={order._id} 
                                ORDER={order} 
                                TOGGLEPOPUP={() => setShowPrint(true)}
                            />
                        ))
                    ) : (
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
                        </div>
                    )}
                </div>
            </div>
            {showPrint && <OrderListPopup HIDEPOPUP={()=>setShowPrint(false)}/>}
        </div>
    )
}
export default OrderList;