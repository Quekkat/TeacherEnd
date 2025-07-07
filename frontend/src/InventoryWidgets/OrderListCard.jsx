import { useStore } from "../globalVariables";

const OrderListCard = ({ORDER, TOGGLEPOPUP})=>{
    const {setSelectedOrder} = useStore();
    
    const handleClick = () => {
        setSelectedOrder(ORDER);
        TOGGLEPOPUP();
    }

    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="mb-3">
                <p className="text-gray-800 dark:text-gray-200"><span className="font-bold">Name:</span> {ORDER.studentName}</p>
                <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Item ordered:</span> {ORDER.itemName}</p>
            </div>
            <button 
                onClick={handleClick}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-opacity-75"
            >
                Print
            </button>
        </div>
    )
}

export default OrderListCard;