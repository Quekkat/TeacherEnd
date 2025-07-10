import { useStore } from "../globalVariables";

const InventoryDashboardCard = ({ LEVELDESTINATION, DISPLAYTEXT }) => {
  const { setWidgetTab, setSpecifiedLevel, getSpecifiedInventoryByYearLevel } = useStore();

  const handleClick = async () => {
    console.log(LEVELDESTINATION);
    setSpecifiedLevel(LEVELDESTINATION);
    await getSpecifiedInventoryByYearLevel();
    setWidgetTab("inventory-list");
  };

  return (
    <button
      onClick={handleClick}
      className="
        group relative w-full p-6 text-center transition-all duration-300 
        bg-gradient-to-br from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50
        dark:from-gray-800 dark:to-gray-900 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20
        rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 
        border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700
        focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800
        overflow-hidden
      "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-rounded text-indigo-600 dark:text-indigo-400 text-3xl">school</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {DISPLAYTEXT}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Manage inventory for this level
        </p>

        {/* Arrow Indicator */}
        <div className="flex justify-center">
          <span className="
            material-symbols-rounded text-xl text-gray-400 dark:text-gray-500 
            group-hover:text-indigo-500 group-hover:translate-x-1 
            transition-all duration-300
          ">
            arrow_forward
          </span>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-200 dark:group-hover:border-indigo-700 rounded-xl transition-colors duration-300"></div>
    </button>
  );
};

export default InventoryDashboardCard;