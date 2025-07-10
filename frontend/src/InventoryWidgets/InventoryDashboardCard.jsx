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
        bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 
        dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20
        rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 
        border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
        overflow-hidden min-h-[160px] flex flex-col justify-center
      "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <span className="material-symbols-rounded text-white text-xl">school</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {DISPLAYTEXT}
        </h3>

        {/* Arrow Indicator */}
        <div className="flex justify-center">
          <span className="
            material-symbols-rounded text-lg text-gray-400 dark:text-gray-500 
            group-hover:text-blue-500 group-hover:translate-x-1 
            transition-all duration-300
          ">
            arrow_forward
          </span>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-700 rounded-2xl transition-colors duration-300"></div>
    </button>
  );
};

export default InventoryDashboardCard;