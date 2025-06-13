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
      [id]: Math.max(0, value)
    }));
  };

  const handleIncrement = (id) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1
    }));
  };

  const handleDecrement = (id) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) - 1)
    }));
  };

  const handleRestock = (id) => {
    const amount = restockAmounts[id] ?? 0;
    if (amount === 0) {
      alert("Please enter amount number");
      return;
    }
    alert(`Restock ${amount} for item ${id}`);
  };

  const handleRemove = (id) => {
    setRestockAmounts(prev => ({
      ...prev,
      [id]: 0
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
                        min={0}
                        value={restockAmounts[id] ?? 0}
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
