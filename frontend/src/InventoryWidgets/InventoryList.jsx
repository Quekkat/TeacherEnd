import { useStore } from "../globalVariables";
import AddNewCard from "./AddNewCard";
import { useState, useEffect } from "react";
import ItemTableCard from "../ItemTable/ItemTableCard";
import OrderListPopup from "./OrderListPopup";

const InventoryList = () => {
  const { specifiedLevel, inventoryList,showPopup, togglePopup  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [inventoryByYear, setInventoryByYear] = useState({});

  useEffect(() => {
    const filtered = inventoryList?.filter((item) =>
      item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);

    // Group filtered inventory by year
    const groupedByYear = {};
    filtered?.forEach((item) => {
      // Use ItemYear field from the item, or default to current year if not available
      const year = item.ItemYear || new Date().getFullYear();
      
      if (!groupedByYear[year]) {
        groupedByYear[year] = [];
      }
      groupedByYear[year].push(item);
    });

    // Sort years in descending order (newest first)
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);
    const sortedGroupedByYear = {};
    sortedYears.forEach(year => {
      sortedGroupedByYear[year] = groupedByYear[year];
    });

    setInventoryByYear(sortedGroupedByYear);
  }, [searchQuery, inventoryList]);

  const handleSearch = (e) => {
    e.preventDefault();
  };




  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="inventory-list-main-content">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white capitalize">
          {specifiedLevel} Inventory Management
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Organized by school year • Search and manage all items
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

      {/* Inventory by Year */}
      <div className="space-y-12">
        {Object.keys(inventoryByYear).length > 0 ? (
          Object.entries(inventoryByYear).map(([year, yearItems]) => (
            <div key={year} className="year-section">
              {/* Year Header */}
              <div className="mb-6">
                {/* School Year Text above the year badge */}
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-2">
                    Inventory for: {specifiedLevel} ({year}-{parseInt(year) + 1})
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    School Year {year}-{parseInt(year) + 1} • Browse and manage items below
                  </p>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                  <div className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg">
                    <h3 className="text-xl font-bold text-white">
                      {year}-{parseInt(year) + 1}
                    </h3>
                  </div>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {yearItems.length} item{yearItems.length !== 1 ? 's' : ''} in this school year
                </p>
              </div>

              {/* Year Items */}
              <div className="flex flex-col items-center gap-6">
                {yearItems.map((inventory) => (
                  <ItemTableCard key={inventory._id} item={inventory} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="material-symbols-rounded text-4xl text-gray-400">inventory_2</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No items found matching your search.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Try adjusting your search terms or add new inventory items.
            </p>
          </div>
        )}
        
        {/* Add New Card - Always at the bottom */}
        <div className="flex justify-center mt-8">
          <AddNewCard />
        </div>
      </div>
    </div>
        {showPopup && <OrderListPopup/>}
    </div>
  );
};
export default InventoryList;