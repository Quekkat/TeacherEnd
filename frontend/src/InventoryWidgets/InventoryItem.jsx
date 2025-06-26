import { useState } from "react";
import { useStore } from "../globalVariables";
const InventoryItem =()=>{
    const {selectedInventoryItem, setWidgetTab} = useStore();
    const [restock, setRestock]= useState(0);
    const [confirmRestock, setConfirmRestock] = useState(false);
    const backEvent =()=>{
        setWidgetTab("inventory-list");
    }
    const handleRestockEvent =()=>{
        console.log("handle restock here");
    }
    return(
        <div className="inventory-item-main">
        <div className="inventory-item-main-flexbox-container">
            <div className="inventory-item-right-div">
                <button onClick={backEvent}> Back</button>
                <p>Displays specified item: </p>
                <p>Item name: {selectedInventoryItem.Name}</p>  
                <div className="inventory-item-image-container">
                    <img className="inventory-item-image" src="testImage.jpg" alt="item image here"/>
                </div>
            </div>
            <div className="inventory-item-left-div">
                <p>Ammount available: {selectedInventoryItem.totalAmount - selectedInventoryItem.amountSold}</p>
                <p>Total ammount: {selectedInventoryItem.totalAmount}</p>
                <p>Preorder:{selectedInventoryItem.preorder}</p>
                <p>Size: {selectedInventoryItem.Size}</p>
                <div className="restock-root-div">
                    <button onClick={() => setRestock(prev => prev + 1)}>+</button>
                    <input type="number" value={restock} onChange={e => setRestock(Number(e.target.value))}/>
                    <button onClick={() => setRestock(prev => prev - 1)}>-</button>
                    <button onClick={()=>setConfirmRestock(true)}>Restock</button>
                </div>

            </div>
        </div>
        {confirmRestock && 
            <div className="confirm-restock-popup-modal-base">
                <div className="confirm-restock-popup-modal-content">
                <p> confirm restock?</p>
                <div>
                    <button onClick={handleRestockEvent}>yes</button>
                    <button onClick={()=>setConfirmRestock(false)}>no</button>
                </div>
                </div>

            </div>}
        
        </div>
    )
}
export default InventoryItem;