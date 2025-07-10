import { useState } from "react";
import { useStore } from "../globalVariables";

const ClaimOrder = ({item}) => {
    const {claimOrder} = useStore();
    const [small, setSmall] = useState(0);
    const [medium, setMedium] = useState(0);
    const [large, setLarge] = useState(0);
    const [xl, setxl] = useState(0);
    const [xxl, setxxl] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleButton = async () => {
        setIsLoading(true);
        try {
            const data = {
                id: item._id,
                SMALL: small,
                MEDIUM: medium,
                LARGE: large,
                XL: xl,
                XXL: xxl,
            }
            console.log(data);
            await claimOrder(data);
            
            // Reset all values after successful claim
            setSmall(0);
            setMedium(0);
            setLarge(0);
            setxl(0);
            setxxl(0);
            
            // Show success message
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error claiming order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const NumberInput = ({ value, onChange, label, icon, claimed, color = "purple" }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${color}-100 dark:bg-${color}-900 rounded-lg`}>
                    <span className={`material-symbols-rounded text-${color}-600 dark:text-${color}-400 text-lg`}>
                        {icon}
                    </span>
                </div>
                <div>
                    <span className="font-medium text-gray-900 dark:text-white">{label}:</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pending: {claimed} orders</div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => onChange(Math.max(0, value - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded-lg text-red-600 dark:text-red-400 font-semibold transition-colors"
                >
                    -
                </button>
                <input 
                    type="number" 
                    value={value} 
                    onChange={(e) => onChange(Math.max(0, Math.min(claimed, Number(e.target.value))))}
                    className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent font-semibold"
                    min="0"
                    max={claimed}
                />
                <button 
                    onClick={() => onChange(Math.min(claimed, value + 1))}
                    className="w-8 h-8 flex items-center justify-center bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg text-green-600 dark:text-green-400 font-semibold transition-colors"
                    disabled={value >= claimed}
                >
                    +
                </button>
            </div>
        </div>
    );

    const totalItems = small + medium + large + xl + xxl;
    
    // Get claimed orders for each size - ensure no negative values
    const claimedOrders = {
        small: Math.max(0, item.SC || 0),
        medium: Math.max(0, item.MC || 0),
        large: Math.max(0, item.LC || 0),
        xl: Math.max(0, item.XLC || 0),
        xxl: Math.max(0, item.XXLC || 0)
    };

    const totalPendingOrders = Object.values(claimedOrders).reduce((sum, val) => sum + val, 0);

    // Check for data inconsistencies
    const hasDataIssues = (item.SC && item.SC < 0) || (item.MC && item.MC < 0) || 
                         (item.LC && item.LC < 0) || (item.XLC && item.XLC < 0) || 
                         (item.XXLC && item.XXLC < 0);

    const rawData = {
        SC: item.SC || 0,
        MC: item.MC || 0,
        LC: item.LC || 0,
        XLC: item.XLC || 0,
        XXLC: item.XXLC || 0
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                    <span className="material-symbols-rounded text-purple-600 dark:text-purple-400 text-2xl">assignment_turned_in</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Claim Orders</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Process pending orders for {item.ItemName}</p>
                </div>
            </div>

            {/* Data Inconsistency Warning */}
            {hasDataIssues && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg flex-shrink-0">
                            <span className="material-symbols-rounded text-red-600 dark:text-red-400">error</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                                Data Inconsistency Detected
                            </h4>
                            <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                                This item has negative claimed orders or other data issues. The system has automatically corrected negative values to zero for processing.
                            </p>
                            <div className="bg-red-100 dark:bg-red-800/50 rounded-lg p-3">
                                <p className="text-xs font-mono text-red-800 dark:text-red-200">
                                    Raw data: SC={rawData.SC}, MC={rawData.MC}, LC={rawData.LC}, XLC={rawData.XLC}, XXLC={rawData.XXLC}
                                </p>
                                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                    Corrected values are being used below for safe processing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pending Orders Info */}
            {totalPendingOrders > 0 ? (
                <>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="material-symbols-rounded text-yellow-600 dark:text-yellow-400">pending_actions</span>
                            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                {totalPendingOrders} pending orders waiting to be claimed
                            </span>
                        </div>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">
                            Select the quantity of orders to mark as claimed below.
                        </p>
                    </div>

                    {/* Size Inputs */}
                    <div className="space-y-3 mb-6">
                        <NumberInput 
                            value={small} 
                            onChange={setSmall} 
                            label="Small" 
                            icon="crop_free"
                            claimed={claimedOrders.small}
                            color="purple"
                        />
                        <NumberInput 
                            value={medium} 
                            onChange={setMedium} 
                            label="Medium" 
                            icon="crop_3_2"
                            claimed={claimedOrders.medium}
                            color="indigo"
                        />
                        <NumberInput 
                            value={large} 
                            onChange={setLarge} 
                            label="Large" 
                            icon="crop_5_4"
                            claimed={claimedOrders.large}
                            color="blue"
                        />
                        <NumberInput 
                            value={xl} 
                            onChange={setxl} 
                            label="X-Large" 
                            icon="crop_16_9"
                            claimed={claimedOrders.xl}
                            color="violet"
                        />
                        <NumberInput 
                            value={xxl} 
                            onChange={setxxl} 
                            label="XX-Large" 
                            icon="fullscreen"
                            claimed={claimedOrders.xxl}
                            color="pink"
                        />
                    </div>

                    {/* Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-rounded text-gray-600 dark:text-gray-400">done_all</span>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders to Claim:</span>
                            </div>
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalItems}</span>
                        </div>
                        {totalItems > 0 && (
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <div>Total value: ₱{((item.Price || 0) * totalItems).toLocaleString()}</div>
                                <div>Remaining: {totalPendingOrders - totalItems} orders</div>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={handleButton}
                        disabled={totalItems === 0 || isLoading}
                        className={`w-full py-3 px-4 ${
                            showSuccess 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                                : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700'
                        } disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2`}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Processing...</span>
                            </>
                        ) : showSuccess ? (
                            <>
                                <span className="material-symbols-rounded">check_circle</span>
                                <span>Orders Claimed Successfully!</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-rounded">check_circle</span>
                                <span>Claim {totalItems} Orders</span>
                            </>
                        )}
                    </button>
                </>
            ) : (
                <>
                    {/* Data Inconsistency Warning for No Orders case */}
                    {hasDataIssues && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg flex-shrink-0">
                                    <span className="material-symbols-rounded text-red-600 dark:text-red-400">error</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                                        Data Inconsistency Detected
                                    </h4>
                                    <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                                        This item has negative claimed orders or other data issues. Please contact your administrator to fix the data.
                                    </p>
                                    <div className="bg-red-100 dark:bg-red-800/50 rounded-lg p-3">
                                        <p className="text-xs font-mono text-red-800 dark:text-red-200">
                                            Raw data: SC={rawData.SC}, MC={rawData.MC}, LC={rawData.LC}, XLC={rawData.XLC}, XXLC={rawData.XXLC}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="text-center py-8">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <span className="material-symbols-rounded text-4xl text-gray-400">task_alt</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Pending Orders</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    All orders for this item have been claimed or no orders have been placed yet.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ClaimOrder;