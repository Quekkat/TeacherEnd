import { useStore } from "../globalVariables";
import AddNewCard from "./AddNewCard";
import { useState, useEffect, useRef } from "react";
import ItemTableCard from "../ItemTable/ItemTableCard";
import OrderListPopup from "./OrderListPopup";

const InventoryList = () => {
  const { specifiedLevel, inventoryList, showPopup, togglePopup, newlyCreatedItemYear, setNewlyCreatedItemYear } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All"); // New state for year filtering
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [inventoryByYear, setInventoryByYear] = useState({});
  const [availableCategories, setAvailableCategories] = useState([]);
  const [allAvailableYears, setAllAvailableYears] = useState([]); // All years from inventory
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const yearDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle navigation to newly created item's year
  useEffect(() => {
    if (newlyCreatedItemYear !== null) {
      // Navigate to the year of the newly created item
      setSelectedYear(newlyCreatedItemYear.toString());
      setSelectedCategory("All");
      // Clear the newly created item year after navigation
      setNewlyCreatedItemYear(null);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [newlyCreatedItemYear, setNewlyCreatedItemYear]);

  useEffect(() => {
    // Extract unique categories from inventory items
    const categories = ["All"];
    inventoryList?.forEach((item) => {
      if (item.Category && !categories.includes(item.Category)) {
        categories.push(item.Category);
      }
    });
    
    // Add common categories if they don't exist in data
    const commonCategories = ["Uniform", "T-Shirt", "Pants", "Polo", "Shoes", "Accessories", "Bags"];
    commonCategories.forEach(cat => {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    });
    
    // Add "Uncategorized" if there are items without categories
    const hasUncategorized = inventoryList?.some(item => !item.Category);
    if (hasUncategorized && !categories.includes("Uncategorized")) {
      categories.push("Uncategorized");
    }
    
    setAvailableCategories(categories);

    // Extract all available years
    const years = new Set();
    inventoryList?.forEach((item) => {
      const year = item.ItemYear || new Date().getFullYear();
      years.add(year.toString());
    });
    
    // Sort years in descending order (newest first)
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    setAllAvailableYears(sortedYears);
  }, [inventoryList]);

  useEffect(() => {
    const filtered = inventoryList?.filter((item) => {
      const matchesSearch = item.ItemName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || 
                            item.Category === selectedCategory ||
                            (selectedCategory !== "All" && !item.Category && selectedCategory === "Uncategorized");
      
      // Add year filtering
      const itemYear = item.ItemYear || new Date().getFullYear();
      const matchesYear = selectedYear === "All" || itemYear.toString() === selectedYear;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
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
  }, [searchQuery, selectedCategory, selectedYear, inventoryList]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const navigateToYear = (targetYear) => {
    // Set the selected year to filter the view
    setSelectedYear(targetYear);
    // Reset category filter when changing year
    setSelectedCategory("All");
    // Scroll to top of the content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };




  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="inventory-list-main-content">

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white capitalize">
              {specifiedLevel} Inventory Management
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Organized by school year • Search and manage all items
            </p>
          </div>
          
          {/* Add New Button */}
          <div className="flex justify-center sm:justify-end">
            <AddNewCard />
          </div>
        </div>
      </div>

      {/* Year Navigation */}
      {allAvailableYears.length > 1 && (
        <div className="mb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <span className="material-symbols-rounded text-gray-600 dark:text-gray-400 mr-2">event</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick Jump to Year:</span>
            </div>
            <div className="flex justify-center">
              <div ref={yearDropdownRef} className="relative">
                <button
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                >
                  <span>
                    {selectedYear === "All" 
                      ? "All School Years" 
                      : `${selectedYear}-${parseInt(selectedYear) + 1}`
                    }
                  </span>
                  <span className={`material-symbols-rounded text-sm transition-transform duration-200 ${showYearDropdown ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                {showYearDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-50 min-w-max">
                    {/* All Years Option */}
                    <button
                      onClick={() => {
                        setSelectedYear("All");
                        setSelectedCategory("All");
                        setShowYearDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-between border-b border-gray-100 dark:border-gray-700 ${
                        selectedYear === "All" ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : ''
                      }`}
                    >
                      <span className="text-sm font-medium">
                        All School Years
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {inventoryList?.length || 0} total items
                      </span>
                    </button>
                    
                    {/* Individual Years */}
                    {allAvailableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          navigateToYear(year);
                          setShowYearDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                          selectedYear === year ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : ''
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {year}-{parseInt(year) + 1}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {inventoryList?.filter(item => (item.ItemYear || new Date().getFullYear()).toString() === year).length || 0} item{(inventoryList?.filter(item => (item.ItemYear || new Date().getFullYear()).toString() === year).length || 0) !== 1 ? 's' : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-rounded text-gray-600 dark:text-gray-400">category</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filter by Category:</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-75">
                    ({inventoryList?.filter(item => {
                      const matchesCategory = category === "Uncategorized" ? !item.Category : item.Category === category;
                      const itemYear = item.ItemYear || new Date().getFullYear();
                      const matchesYear = selectedYear === "All" || itemYear.toString() === selectedYear;
                      return matchesCategory && matchesYear;
                    }).length || 0})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder={`Search items${selectedYear !== "All" ? ` in ${selectedYear}-${parseInt(selectedYear) + 1}` : ""}${selectedCategory !== "All" ? ` • ${selectedCategory}` : ""}...`}
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
            <div key={year} id={`year-section-${year}`} className="year-section scroll-mt-8">
              {/* Year Header */}
              <div className="mb-6">
                {/* School Year Text above the year badge */}
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-2">
                    Inventory for: {specifiedLevel}
                    {selectedYear !== "All" && (
                      <span className="ml-2 text-indigo-600 dark:text-indigo-400">
                        ({year}-{parseInt(year) + 1})
                      </span>
                    )}
                    {selectedCategory !== "All" && (
                      <span className="ml-3 text-lg text-indigo-600 dark:text-indigo-400">
                        • {selectedCategory}
                      </span>
                    )}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {selectedYear !== "All" 
                      ? `School Year ${year}-${parseInt(year) + 1} • Browse and manage items below`
                      : "All School Years • Browse and manage items below"
                    }
                    {selectedCategory !== "All" && (
                      <span className="block text-sm mt-1 text-indigo-600 dark:text-indigo-400">
                        Showing {selectedCategory} category only
                      </span>
                    )}
                  </p>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                  
                  {/* Display Mode - Just styled text, no editing */}
                  <div className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">
                        {year}-{parseInt(year) + 1}
                      </h3>
                    </div>
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
      </div>
    </div>
        {showPopup && <OrderListPopup/>}
    </div>
  );
};
export default InventoryList;