import { useStore } from "../globalVariables";
import { useState, useEffect } from "react";
import CreateOrderSideWidget from "./CreateOrderSideWidget";
import RestockSideWidget from "./RestockSideWidget";
import ClaimOrder from "./ClaimOrder";

const ItemTableCard = ({item})=>{
    const {selectedReceipt, setSelectedReceipt,togglePopup} = useStore();
    const [restock, toggleRestock]=useState(false);
    const [createOrder, toggleCreateOrder] = useState(false);
    const [claimOrder, toggleClaimOrder] = useState(false);

    const handleReceipt =()=>{

        setSelectedReceipt(item);
        console.log(selectedReceipt);
        togglePopup();
    }
    
    return(
        <div className="item-table-card-base">
        <div className="item-table-head-content">
            <p> Item: {item.ItemName}</p>
            <p> Schoolyear: {item.ItemYear} - {item.ItemYear -1}</p>
        </div>
        <div className="item-table-flexbox">

        <div className="item-table-container">
        <table>
        <tbody>
            <tr>
                <td>Size:</td>
                <td>Quantity:</td>
                <td>Claimed:</td>
                <td>Total:</td>
            </tr>
            <tr>
                <td> Small</td>
                <td> {item.SQ}</td>
                <td> {item.SC}</td>
                <td> {item.ST}</td>
            </tr>
            <tr>
                <td> Medium</td>
                <td> {item.MQ}</td>
                <td> {item.MC}</td>
                <td> {item.MT}</td>
            </tr>
            <tr>
                <td> Large</td>
                <td> {item.LQ}</td>
                <td> {item.LC}</td>
                <td> {item.LT}</td>
            </tr>
            <tr>
                <td> X-Large</td>
                <td> {item.XLQ}</td>
                <td> {item.XLC}</td>
                <td> {item.XLT}</td>
            </tr>
            <tr>
                <td> XX-Large</td>
                <td> {item.XXLQ}</td>
                <td> {item.XXLC}</td>
                <td> {item.XXLT}</td>
            </tr>
            <tr>
                <td> Total</td>
                <td> Quantity: {item.SQ + item.MQ + item.LQ + item.XLQ + item.XXLQ}</td>
                <td> Claimed order: {item.SC+ item.LC + item.MC + item.XLC +item.XXLC}</td>
                <td> Total: {item.OverallTotal}</td>
            </tr>
            
        </tbody>
        </table>
        <div className="item-table-bottom-elements">
            <button onClick={()=>toggleRestock(prev=>!prev)}> {restock ? 'Close Restock' : 'Restock'}</button>
            <button onClick={()=>toggleCreateOrder(prev=>!prev)}> {createOrder? 'Close Create Order' : 'Create Order'}</button>
            <button onClick={()=>toggleClaimOrder(prev=>!prev)}> {claimOrder? 'Close Claim Order' : 'Claim Order'}</button>

            <button onClick={handleReceipt}> See receipt</button>
        </div>
        </div>

        {restock && <RestockSideWidget item={item}/>}
        {createOrder && <CreateOrderSideWidget item={item}/>}
        {claimOrder && <ClaimOrder item={item}/>}
        </div>
        </div>
    )
}
export default ItemTableCard;