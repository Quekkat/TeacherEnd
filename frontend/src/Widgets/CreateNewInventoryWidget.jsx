import React, { useState } from "react";
import { useStore } from "../globalVariables";
import "./CreateNewInventoryWidget.css";

const CreateNewInventory = () => {
    const { createInventoryItem } = useStore();
    
    const [formData, setFormData] = useState({
        ITEMNAME:"",
        GCASHQR:"",
        ITEMIMAGE:"",
        PRICE: "",
        INITIALAMMOUNT:"",
    });

    const handleItemImage = async (e) =>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData((prev) => ({
                ...prev,
                ITEMIMAGE: base64String,
                }));

            };
        reader.readAsDataURL(file); // convert file to base64
        }
    }

    const handleQRImage = async (e)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData((prev) => ({
                ...prev,
                GCASHQR: base64String,
                }));

            };
        reader.readAsDataURL(file); // convert file to base64
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        createInventoryItem(formData);
    };

    return (
        <div className="create-inventory-widget">
            <form onSubmit={handleSubmit}>
            <div className="image-section">
                <label className="image-upload-box">
                    {formData.ITEMIMAGE ? (
                        <img src={formData.ITEMIMAGE} alt="Product" className="preview-img" />
                    ) : (
                        <span className="upload-label">+ Add Product Image</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleItemImage} />
                </label>
                <label className="image-upload-box">
                    {formData.GCASHQR ? (
                        <img src={formData.GCASHQR} alt="QR Code" className="preview-img" />
                    ) : (
                        <span className="upload-label">+ Add GCash QR</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleQRImage} />
                </label>
            </div>
            <div className="form-section">
                <h2>Add New Product</h2>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" value={formData.ITEMNAME} onChange={(e) => setFormData({ ...formData, ITEMNAME: e.target.value })} placeholder="Enter product name" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" value={formData.PRICE} onChange={(e) => setFormData({ ...formData, PRICE: e.target.value })} placeholder="Enter price" />
                </div>
                <div className="form-group">
                    <label>Initial Amount</label>
                    <input type="number" value={formData.INITIALAMMOUNT} onChange={(e) => setFormData({ ...formData, INITIALAMMOUNT: e.target.value })} placeholder="Enter initial amount" />
                </div>
                <button type="submit" className="add-btn" title="Add New">
                    <span className="plus-icon">＋</span> Add New
                </button>
            </div>
            </form>
        </div>
    );
};

export default CreateNewInventory;