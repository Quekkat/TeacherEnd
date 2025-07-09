import { useStore } from "../globalVariables";
import AddNewCard from "./AddNewCard";
import { useState, useEffect } from "react";
import ItemTableCard from "../ItemTable/ItemTableCard";
import OrderListPopup from "./OrderListPopup";

const InventoryList = () => {
  const { specifiedLevel, inventoryList,showPopup, togglePopup  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    const filtered = inventoryList?.filter((item) =>
      item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventoryList]);

  const handleSearch = (e) => {
    e.preventDefault();
  };




  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="inventory-list-main-content">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
          Inventory for: {specifiedLevel}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Browse and manage items below.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full px-4 py-3 pr-12 text-base 
              border border-gray-300 rounded-full 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-200 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
              transition-shadow duration-300 shadow-sm hover:shadow-md
            "
          />
          <button
            type="submit"
            className="
              absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full 
              text-gray-500 dark:text-gray-400 
              hover:text-indigo-600 dark:hover:text-indigo-300 
              transition-colors duration-300
            "
          >
            <span className="material-symbols-rounded">search</span>
          </button>
        </form>
      </div>

      {/* Inventory Cards Column */}
      <div className="flex flex-col items-center gap-6">
        {filteredInventory?.length > 0 ? (
          filteredInventory.map((inventory) => (
            <ItemTableCard key={inventory._id} item={inventory} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No items found matching your search.
          </p>
        )}
        <AddNewCard />
      </div>
    </div>
        {showPopup && <OrderListPopup/>}
    </div>
  );
};
export default InventoryList;