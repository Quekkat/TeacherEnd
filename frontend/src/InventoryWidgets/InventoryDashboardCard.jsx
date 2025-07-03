import { useStore } from "../globalVariables";

const InventoryDashboardCard = ({ LEVELDESTINATION, DISPLAYTEXT }) => {
  const { setWidgetTab, setSpecifiedLevel, getSpecifiedInventoryByYearLevel } = useStore();

  const handleClick = async () => {
    setSpecifiedLevel(LEVELDESTINATION);
    await getSpecifiedInventoryByYearLevel();
    setWidgetTab("inventory-list");
  };

  return (
    <button
      onClick={handleClick}
      className="
        group w-full max-w-md p-6 text-left transition-all duration-300 
        bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 
        dark:bg-gray-800 dark:hover:bg-gray-700 
        focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Navigate To</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{DISPLAYTEXT}</h2>
        </div>
        <span className="
          material-symbols-rounded text-4xl text-gray-300 transition-transform duration-300 
          group-hover:text-indigo-500 group-hover:translate-x-1 
          dark:text-gray-600 dark:group-hover:text-indigo-400
        ">
          arrow_forward_ios
        </span>
      </div>
      <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
        Click to view and manage the inventory for this section.
      </p>
    </button>
  );
};

export default InventoryDashboardCard;