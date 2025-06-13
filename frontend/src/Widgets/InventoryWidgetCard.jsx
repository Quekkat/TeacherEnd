import './InventoryWidget.css';
import { useState, useEffect } from 'react';
import { useStore } from "../globalVariables.js";
const InventoryWidgetCard = ({item})=>{
    const [restockAmmount, setRestockAmount] = useState(0);
    const {restockInventoryItem, removeInventoryItem} = useStore();
    const incrementRestock = ()=>{
        setRestockAmount(prevCount=> prevCount +1);
    };
    const decrementRestock = ()=>{
        if(restockAmmount>0){
            setRestockAmount(prevCount=> prevCount -1);
        }

    };
    const handleRestock = async()=>{
      const restockData= {
        ITEMID: item._id,
        AMMOUNT:restockAmmount, 
      };
      console.log("restocking item with id: "+ restockData.ITEMID + " with ammount of: " + restockData.AMMOUNT);
      setRestockAmount(0);
      await restockInventoryItem(restockData);
    }

    const handleRemove = async ()=>{
        console.log(item._id);
        const data = {
          ITEMID: item._id,
        }
        await removeInventoryItem(data);

    }


    return(
              <div className="inventory-card big-card">
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
                        onClick={decrementRestock}
                        type="button"
                      >-</button>
                      <input
                        className="restock-qty-input"
                        type="number"
                        value={restockAmmount}
                        onChange={(e) => setRestockAmount(e.target.value)}
                      />
                      <button
                        className="restock-qty-btn"
                        onClick={incrementRestock}
                        type="button"
                      >+</button>
                    </div>
                    <button
                      className="restock-btn"
                      onClick={() => handleRestock()}
                      type="button"
                    >Restock</button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove()}
                      type="button"
                    >Remove</button>
                  </div>
                </div>
              </div>
    )
}
export default InventoryWidgetCard;