import { useState, useEffect } from 'react';
import { useStore } from "../globalVariables.js";

import './InventoryWidget.css';
import uniformImg from './WAssets/uniform.png';
import qrCodeImg from './WAssets/qrcode.png';



const InventoryWidget = () => {
  const { inventoryList, getItemList } = useStore();

  useEffect(() => {
    getItemList();
  }, []);

  const [search, setSearch] = useState("");
  const [restockAmounts, setRestockAmounts] = useState({});

  const handleAmountChange = (id, value) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: Math.max(1, value)
    }));
  };

  const handleIncrement = (id) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const handleDecrement = (id) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  const handleRestock = (id) => {
    alert(`Restock ${restockAmounts[id] || 1} for item ${id}`);
  };

  const handleRemove = (id) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: 1
    }));
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
        />
        <button className="inventory-search-btn">Search</button>
      </div>

      {/* actual data section */}
      <h2 className="inventory-title">Actual list of inventory</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {inventoryList.map((item) => {
            const id = item._id;
            return (
              <div className="inventory-card big-card" key={id}>
                <div className="inventory-images">
                  <img src={item.itemImgLink} alt="Uniform" className="inventory-img" />
                  <img src={item.gcashQrImageLink} alt="QR Code" className="inventory-qr" />
                </div>
                <div className="inventory-info">
                  <div className="inventory-name">{item.itemName}</div>
                  <div className="inventory-fields">
                    <label>
                      Available
                      <input type="number" value={item.forSaleAmmount} readOnly />
                    </label>
                    <label>
                      Sold
                      <input type="number" value={item.soldAmmount} readOnly />
                    </label>
                    <label>
                      Ordered
                      <input type="number" value={item.orderedAmmount} readOnly />
                    </label>
                    <label>
                      Total
                      <input type="number" value={item.totalAmmount} readOnly />
                    </label>
                  </div>
                  <div className="restock-row">
                    <div className="restock-qty-group">
                      <button
                        className="restock-qty-btn"
                        onClick={() => handleDecrement(id)}
                        type="button"
                      >-</button>
                      <input
                        className="restock-qty-input"
                        type="number"
                        min={1}
                        value={restockAmounts[id] || ""}
                        onChange={e => handleAmountChange(id, Number(e.target.value))}
                      />
                      <button
                        className="restock-qty-btn"
                        onClick={() => handleIncrement(id)}
                        type="button"
                      >+</button>
                    </div>
                    <button
                      className="restock-btn"
                      onClick={() => handleRestock(id)}
                      type="button"
                    >Restock</button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(id)}
                      type="button"
                    >Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InventoryWidget;
