import { useState, useEffect  } from 'react';
import {useStore} from "../globalVariables.js";

import './InventoryWidget.css';
import uniformImg from './WAssets/uniform.png';
import qrCodeImg from './WAssets/qrcode.png';



const InventoryWidget = () => {
  const{inventoryList, getItemList} = useStore();

    useEffect(() => {
    console.log('Component mounted (page loaded)');
    getItemList();
    
    // Place any startup logic here (e.g., fetch data, set up listeners)
  }, []); // <- empty dependency array ensures it runs only once

  


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
            const handleClick = ()=>{
              console.log(item._id);
            }
            
            return(
            <div className="inventory-card big-card" key={item._id}>
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
                <button onClick={handleClick} className="inventory-btn">Restock</button>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default InventoryWidget;
