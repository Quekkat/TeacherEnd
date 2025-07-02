import { useState, useRef } from "react";
import { useStore } from "../globalVariables";
import html2Canvas from 'html2canvas';
import OrderSlip from "./OrderSlip";
const OrderListPopup = ({HIDEPOPUP})=>{
    const childref= useRef(null);
    const handleDownload = async ()=>{
        if(!childref.current) return;
        const canvas = await html2Canvas(childref.current);
        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'receipt-image.png';
        link.click();
    }
    return(
        <div>
            <OrderSlip ref={childref}/>
            <p>see order list print popup here</p>
            <button onClick={handleDownload}> Print</button>
            <button onClick={HIDEPOPUP}> Close</button>
        </div>
    )
}
export default OrderListPopup;