import { useState } from "react";
import { useStore } from "../globalVariables";
const InventoryItem =()=>{
    const {selectedInventoryItem, setWidgetTab, restockItem, getSpecifiedInventoryByYearLevel} = useStore();
    const [restock, setRestock]= useState(0);
    const [confirmRestock, setConfirmRestock] = useState(false);

    const backEvent =()=>{
        setWidgetTab("inventory-list");
    }

    const handleRestockEvent =async()=>{
        console.log("handle restock here");
        console.log(restock);
        await restockItem(selectedInventoryItem._id, restock);
        await getSpecifiedInventoryByYearLevel();

        backEvent();
    }
    const handleMakeOrder =()=>{
        setWidgetTab("specified-make-order");
    }

    return(
        <div className="inventory-item-main">
        <div className="inventory-item-vertical-box">
            <button onClick={backEvent}> Back</button>
            <div className="inventory-item-main-flexbox-container">
                <div className="inventory-item-left-div">
                    <div className="inventory-item-image-container">
                        <img className="inventory-item-image" src={selectedInventoryItem.imageUrl} alt="emptyImagetemplate.jpg"/>
                    </div>
                </div>
                <div className="inventory-item-right-div">
                    <p>Item name: {selectedInventoryItem.name}</p>  
                    <p>Ammount available: {selectedInventoryItem.ammount - selectedInventoryItem.ordered}</p>
                    <p>Total ammount: {selectedInventoryItem.ammount}</p>
                    <p>Preorder:{selectedInventoryItem.preorder}</p>
                    <p>Size: {selectedInventoryItem.size}</p>
                    <button onClick={handleMakeOrder}> Order</button>
                    <div className="restock-root-div">
                        <button onClick={() => setRestock(prev => prev + 1)}>+</button>
                        <input type="number" value={restock} onChange={e => setRestock(Number(e.target.value))}/>
                        <button onClick={() => setRestock(prev => prev - 1)}>-</button>
                        <button onClick={()=>setConfirmRestock(true)}>Restock</button>
                    </div>
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