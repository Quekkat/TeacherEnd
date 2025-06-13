import { useState, useEffect } from 'react';
import { useStore } from "../globalVariables.js";

import './InventoryWidget.css';
import InventoryWidgetCard from './InventoryWidgetCard.jsx';


const InventoryWidget = () => {
  const { inventoryList, getItemList } = useStore();

  useEffect(() => {
    getItemList();
  }, []);

  const [search, setSearch] = useState("");

  

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
        />
        <button className="inventory-search-btn">Search</button>
      </div>

      {/* actual data section */}
      <h2 className="inventory-title">Actual list of inventory</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {inventoryList.map((item) => {
            return (
              <InventoryWidgetCard key={item._id} item={item}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InventoryWidget;
