import { useState } from "react";
import "./AddNewPaymentWidget.css";

const orderItems = [
  "PE Uniform",
  "School Uniform",
  "Books",
  "ID Lace",
  "Foundation Day Shirt",
  "Graduation Fee"
];

const getRandomUSN = () => Math.floor(2025000 + Math.random() * 1000);

const AddNewPayment = () => {
  const [usn, setUsn] = useState(getRandomUSN());
  const [orderItem, setOrderItem] = useState(orderItems[0]);

  return (
    <div className="add-payment-main">
      <h1 className="add-payment-title">Add New Payment</h1>
      <form className="add-payment-form" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="usn">Student USN</label>
          <input
            id="usn"
            type="number"
            value={usn}
            onChange={e => setUsn(e.target.value)}
            className="add-payment-input"
            min="2025000"
            max="2030000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderItem">Order Item</label>
          <select
            id="orderItem"
            value={orderItem}
            onChange={e => setOrderItem(e.target.value)}
            className="add-payment-select"
          >
            {orderItems.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button className="add-payment-btn" type="submit">Payed</button>
      </form>
    </div>
  );
};

export default AddNewPayment;