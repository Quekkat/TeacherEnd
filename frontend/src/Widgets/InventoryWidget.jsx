import { useState, useEffect } from 'react';
import { useStore } from "../globalVariables.js";

import './InventoryWidget.css';
import InventoryWidgetCard from './InventoryWidgetCard.jsx';

const InventoryWidget = () => {
  const { inventoryList, getItemList } = useStore();
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    getItemList();
  }, []);

  useEffect(() => {
    // Reset filtered items when the original list changes
    setFilteredItems(inventoryList);
    setIsSearchActive(false);
  }, [inventoryList]);

  const handleSearch = () => {
    if (!search.trim()) {
      // If search is empty, show all items
      setFilteredItems(inventoryList);
      setIsSearchActive(false);
      return;
    }

    // Filter items by name or any property you want to search
    const searchLower = search.toLowerCase();
    const filtered = inventoryList.filter(
      item => 
        item.itemName?.toLowerCase().includes(searchLower) || 
        String(item.totalAmmount).includes(searchLower) ||
        String(item.forSaleAmmount).includes(searchLower)
    );
    
    setFilteredItems(filtered);
    setIsSearchActive(true);
  };

  // Also search when pressing Enter in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="inventory-main">
      {/* Search Bar */}
      <div className="inventory-search-bar-row">
        <input
          type="text"
          placeholder="Search uniform or PE..."
          className="inventory-search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="inventory-search-btn" onClick={handleSearch}>Search</button>
      </div>

      {/* actual data section */}
      <h2 className="inventory-title">Actual list of inventory</h2>

      {/* No results message */}
      {isSearchActive && filteredItems.length === 0 && (
        <div className="no-results">No items found matching "{search}"</div>
      )}

      <div className="inventory-cards-container">
        {(isSearchActive ? filteredItems : inventoryList).map((item) => (
          <InventoryWidgetCard key={item._id} item={item}/>
        ))}
      </div>
    </div>
  );
};

export default InventoryWidget;
