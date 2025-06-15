import { useState } from "react";
import { useStore } from "../globalVariables";

import "./AddNewPaymentWidget.css";

const AddNewPayment = () => {
  const {inventoryList, addNewOrderItem} = useStore();

  const [usn, setUsn] = useState("");
  const [orderItem, setOrderItem] = useState(inventoryList[0]._id);

  const handleFormSubmit=(e)=>{
    e.preventDefault();
    console.log(orderItem);
    const data = {
      ITEMID: orderItem,
      STUDENTURN: usn,
    }

    addNewOrderItem(data);
  }

  return (
    <div className="add-payment-main">
      <h1 className="add-payment-title">Add New Payment</h1>
      <form className="add-payment-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="usn">Student USN</label>
          <input
            id="usn"
            type="number"
            value={usn}
            onChange={e => setUsn(e.target.value)}
            className="add-payment-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderItem">Order Item</label>
          <select
            id="orderItem"
            value={inventoryList._id}
            onChange={e => setOrderItem(e.target.value)}
            className="add-payment-select"
          >
            {inventoryList.map(item => (
              <option key={item._id} value={item._id}>{item.itemName}</option>
            ))}
          </select>
        </div>
        <button className="add-payment-btn" type="submit">Payed</button>
      </form>
    </div>
  );
};

export default AddNewPayment;