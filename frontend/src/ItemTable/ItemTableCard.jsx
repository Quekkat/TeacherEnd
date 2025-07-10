import { useStore } from "../globalVariables";
import { useState, useEffect } from "react";
import CreateOrderSideWidget from "./CreateOrderSideWidget";
import RestockSideWidget from "./RestockSideWidget";
import ClaimOrder from "./ClaimOrder";

const ItemTableCard = ({item}) => {
    const {selectedReceipt, setSelectedReceipt, togglePopup} = useStore();
    const [restock, toggleRestock] = useState(false);
    const [createOrder, toggleCreateOrder] = useState(false);
    const [claimOrder, toggleClaimOrder] = useState(false);

    const handleReceipt = () => {
        setSelectedReceipt(item);
        console.log(selectedReceipt);
        togglePopup();
    }

    // Calculate totals
    const totalQuantity = (item.SQ || 0) + (item.MQ || 0) + (item.LQ || 0) + (item.XLQ || 0) + (item.XXLQ || 0);
    const totalClaimed = (item.SC || 0) + (item.MC || 0) + (item.LC || 0) + (item.XLC || 0) + (item.XXLC || 0);
    const totalOverall = (item.ST || 0) + (item.MT || 0) + (item.LT || 0) + (item.XLT || 0) + (item.XXLT || 0);

    // Size data for easier mapping with data validation
    const sizeData = [
        { size: 'Small', quantity: Math.max(0, item.SQ || 0), claimed: Math.max(0, item.SC || 0), total: Math.max(0, item.ST || 0) },
        { size: 'Medium', quantity: Math.max(0, item.MQ || 0), claimed: Math.max(0, item.MC || 0), total: Math.max(0, item.MT || 0) },
        { size: 'Large', quantity: Math.max(0, item.LQ || 0), claimed: Math.max(0, item.LC || 0), total: Math.max(0, item.LT || 0) },
        { size: 'X-Large', quantity: Math.max(0, item.XLQ || 0), claimed: Math.max(0, item.XLC || 0), total: Math.max(0, item.XLT || 0) },
        { size: 'XX-Large', quantity: Math.max(0, item.XXLQ || 0), claimed: Math.max(0, item.XXLC || 0), total: Math.max(0, item.XXLT || 0) }
    ];

    // Check for data inconsistencies
    const hasDataIssues = sizeData.some(row => 
        (item.SC && item.SC < 0) || (item.MC && item.MC < 0) || (item.LC && item.LC < 0) || 
        (item.XLC && item.XLC < 0) || (item.XXLC && item.XXLC < 0) ||
        row.claimed > row.total
    );

    return (
        <div className="w-full max-w-6xl mx-auto mb-8">
            {/* Item Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <span className="material-symbols-rounded text-2xl">inventory_2</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{item.ItemName}</h2>
                                <p className="text-indigo-100">School Year: {item.ItemYear} - {item.ItemYear + 1}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-indigo-100">Price per item</p>
                            <p className="text-2xl font-bold">₱{item.Price || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Main Table Section */}
                <div className="p-6">
                    {/* Data Inconsistency Warning */}
                    {hasDataIssues && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="material-symbols-rounded text-red-600 dark:text-red-400">error</span>
                                <span className="text-sm font-medium text-red-800 dark:text-red-200">
                                    Data Inconsistency Detected
                                </span>
                            </div>
                            <p className="text-xs text-red-700 dark:text-red-300">
                                This item has negative claimed orders or claimed orders exceeding total stock. Please contact your administrator to fix the data.
                            </p>
                            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                                Raw data: SC={item.SC}, MC={item.MC}, LC={item.LC}, XLC={item.XLC}, XXLC={item.XXLC}
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                                        Size
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                                        Quantity in Stock
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                                        Claimed Orders
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                                        Total Available
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {sizeData.map((row, index) => {
                                    const available = Math.max(0, row.total - row.claimed);
                                    const stockPercentage = row.total > 0 ? (available / row.total) * 100 : 0;
                                    
                                    // Check for issues with this specific size
                                    const hasRowIssue = row.claimed > row.total || 
                                        (index === 0 && item.SC && item.SC < 0) ||
                                        (index === 1 && item.MC && item.MC < 0) ||
                                        (index === 2 && item.LC && item.LC < 0) ||
                                        (index === 3 && item.XLC && item.XLC < 0) ||
                                        (index === 4 && item.XXLC && item.XXLC < 0);
                                    
                                    return (
                                        <tr key={row.size} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${hasRowIssue ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                <div className="flex items-center">
                                                    {hasRowIssue && (
                                                        <span className="material-symbols-rounded text-red-500 mr-2 text-sm">warning</span>
                                                    )}
                                                    <span className="material-symbols-rounded text-gray-400 mr-2">
                                                        {row.size === 'Small' ? 'crop_free' : 
                                                         row.size === 'Medium' ? 'crop_3_2' : 
                                                         row.size === 'Large' ? 'crop_5_4' : 
                                                         row.size === 'X-Large' ? 'crop_16_9' : 'fullscreen'}
                                                    </span>
                                                    {row.size}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    {row.quantity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-lg font-semibold ${hasRowIssue ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                                    {row.claimed}
                                                    {hasRowIssue && (
                                                        <span className="block text-xs text-red-500">Invalid</span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {row.total}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center space-y-1">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        stockPercentage > 50 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : stockPercentage > 20
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                        {available} left
                                                    </span>
                                                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                                stockPercentage > 50 ? 'bg-green-500' : 
                                                                stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${Math.max(5, stockPercentage)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {/* Total Row */}
                                <tr className="bg-gray-100 dark:bg-gray-600 font-semibold">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                                        <div className="flex items-center">
                                            <span className="material-symbols-rounded text-gray-600 dark:text-gray-300 mr-2">calculate</span>
                                            TOTAL
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {totalQuantity}
                                    </td>
                                    <td className="px-6 py-4 text-center text-lg font-bold text-orange-600 dark:text-orange-400">
                                        {totalClaimed}
                                    </td>
                                    <td className="px-6 py-4 text-center text-lg font-bold text-gray-900 dark:text-white">
                                        {totalOverall}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center space-y-1">
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Total Value: ₱{((item.Price || 0) * totalOverall).toLocaleString()}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Buttons Section */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <button 
                            onClick={() => toggleRestock(prev => !prev)}
                            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                restock 
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
                            }`}
                        >
                            <span className="material-symbols-rounded text-sm mr-2">
                                {restock ? 'close' : 'add_box'}
                            </span>
                            {restock ? 'Close Restock' : 'Restock'}
                        </button>

                        <button 
                            onClick={() => toggleCreateOrder(prev => !prev)}
                            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                createOrder 
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                            }`}
                        >
                            <span className="material-symbols-rounded text-sm mr-2">
                                {createOrder ? 'close' : 'shopping_cart_checkout'}
                            </span>
                            {createOrder ? 'Close Create Order' : 'Create Order'}
                        </button>

                        <button 
                            onClick={() => toggleClaimOrder(prev => !prev)}
                            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                claimOrder 
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800'
                            }`}
                        >
                            <span className="material-symbols-rounded text-sm mr-2">
                                {claimOrder ? 'close' : 'assignment_turned_in'}
                            </span>
                            {claimOrder ? 'Close Claim Order' : 'Claim Order'}
                        </button>

                        <button 
                            onClick={handleReceipt}
                            className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800 rounded-lg font-medium transition-all duration-200"
                        >
                            <span className="material-symbols-rounded text-sm mr-2">receipt_long</span>
                            See Receipt
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Widgets */}
            <div className="mt-4 space-y-4">
                {restock && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                        <RestockSideWidget item={item}/>
                    </div>
                )}
                {createOrder && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                        <CreateOrderSideWidget item={item}/>
                    </div>
                )}
                {claimOrder && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                        <ClaimOrder item={item}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemTableCard;