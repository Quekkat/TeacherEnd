import React from 'react';
import './InventoryWidget.css'; // Import the CSS file
import uniformImg from './WAssets/uniform.png'; // Product image
import qrCodeImg from './WAssets/qrcode.png';   // QR Code image

const InventoryItem = ({ name, price, available, sold, ordered, total }) => {
    return (
        <div className="inventory-item-card">
            <div className="item-header">
                <img src={uniformImg} alt="Product" className="item-product-image" />
                <img src={qrCodeImg} alt="QR Code" className="item-qr-code" />
            </div>
            <div className="item-details">
                <p className="item-name">Name: {name}</p>
                <p>Available: {available}</p>
                <p>Sold: {sold}</p>
                <p>Ordered: {ordered}</p>
                <p>Total: {total}</p>
            </div>
            <div className="item-footer">
                <p className="item-price">₱ {price.toFixed(2)}</p>
                <button className="restock-button">Restock</button>
            </div>
        </div>
    );
};

const InventoryWidget = () => {
    return (
        <div className="inventory-main-content">
            <h1 className="inventory-title">Inventory</h1>
            <div className="inventory-grid">
                <InventoryItem name="PS Uniform" price={1000.00} available={150} sold={80} ordered={20} total={250} />
                <InventoryItem name="Kinder Uniform" price={1000.00} available={120} sold={70} ordered={15} total={205} />
                <InventoryItem name="Elementary/High School Uniform" price={1000.00} available={200} sold={100} ordered={30} total={330} />
                <InventoryItem name="Senior High Uniform" price={1000.00} available={180} sold={90} ordered={25} total={295} />
                <InventoryItem name="College Uniform" price={1000.00} available={100} sold={50} ordered={10} total={160} />
                <InventoryItem name="Foundation Day Shirt" price={1000.00} available={300} sold={150} ordered={50} total={500} />
            </div>
        </div>
    );
};

export default InventoryWidget;
