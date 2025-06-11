import React, { useState } from "react";
import "./CreateNewInventoryWidget.css";

const CreateNewInventory = () => {
    const [productImage, setProductImage] = useState(null);
    const [qrImage, setQrImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");

    const handleImageChange = (e, setter) => {
        if (e.target.files && e.target.files[0]) {
            setter(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="create-inventory-widget">
            <div className="image-section">
                <label className="image-upload-box">
                    {productImage ? (
                        <img src={productImage} alt="Product" className="preview-img" />
                    ) : (
                        <span className="upload-label">+ Add Product Image</span>
                    )}
                    <input type="file" accept="image/*" onChange={e => handleImageChange(e, setProductImage)} />
                </label>
                <label className="image-upload-box">
                    {qrImage ? (
                        <img src={qrImage} alt="QR Code" className="preview-img" />
                    ) : (
                        <span className="upload-label">+ Add GCash QR</span>
                    )}
                    <input type="file" accept="image/*" onChange={e => handleImageChange(e, setQrImage)} />
                </label>
            </div>
            <div className="form-section">
                <h2>Add New Product</h2>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter product name" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" />
                </div>
                <div className="form-group">
                    <label>Initial Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter initial amount" />
                </div>
                <button className="add-btn" title="Add New">
                    <span className="plus-icon">＋</span> Add New
                </button>
            </div>
        </div>
    );
};

export default CreateNewInventory;