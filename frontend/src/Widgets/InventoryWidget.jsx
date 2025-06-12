import React, { useState } from 'react';
import './InventoryWidget.css';
import uniformImg from './WAssets/uniform.png';
import qrCodeImg from './WAssets/qrcode.png';

const uniformData = [
  { name: "Small Kinder Uniform", size: "Small", available: 10, sold: 5, ordered: 2, total: 17 },
  { name: "Medium Kinder Uniform", size: "Medium", available: 12, sold: 4, ordered: 3, total: 19 },
  { name: "Large Kinder Uniform", size: "Large", available: 7, sold: 8, ordered: 1, total: 16 },
];

const peData = [
  { name: "Small Kinder PE Uniform", size: "Small", available: 8, sold: 6, ordered: 1, total: 15 },
  { name: "Medium Kinder PE Uniform", size: "Medium", available: 9, sold: 7, ordered: 2, total: 18 },
  { name: "Large Kinder PE Uniform", size: "Large", available: 6, sold: 9, ordered: 2, total: 17 },
];

// Elementary data (copy structure)
const elementaryUniformData = [
  { name: "Small Elementary Uniform", size: "Small", available: 15, sold: 7, ordered: 3, total: 25 },
  { name: "Medium Elementary Uniform", size: "Medium", available: 18, sold: 5, ordered: 4, total: 27 },
  { name: "Large Elementary Uniform", size: "Large", available: 10, sold: 10, ordered: 2, total: 22 },
];

const elementaryPeData = [
  { name: "Small Elementary PE Uniform", size: "Small", available: 12, sold: 8, ordered: 2, total: 22 },
  { name: "Medium Elementary PE Uniform", size: "Medium", available: 14, sold: 9, ordered: 3, total: 26 },
  { name: "Large Elementary PE Uniform", size: "Large", available: 11, sold: 12, ordered: 1, total: 24 },
];

// Senior High data
const seniorHighUniformData = [
  { name: "Small Senior High Uniform", size: "Small", available: 8, sold: 3, ordered: 2, total: 13 },
  { name: "Medium Senior High Uniform", size: "Medium", available: 10, sold: 5, ordered: 1, total: 16 },
  { name: "Large Senior High Uniform", size: "Large", available: 7, sold: 6, ordered: 2, total: 15 },
  { name: "XL Senior High Uniform", size: "XL", available: 5, sold: 4, ordered: 1, total: 10 },
  { name: "XXL Senior High Uniform", size: "XXL", available: 3, sold: 2, ordered: 0, total: 5 },
];

const seniorHighPeData = [
  { name: "Small Senior High PE Uniform", size: "Small", available: 7, sold: 2, ordered: 1, total: 10 },
  { name: "Medium Senior High PE Uniform", size: "Medium", available: 9, sold: 4, ordered: 2, total: 15 },
  { name: "Large Senior High PE Uniform", size: "Large", available: 6, sold: 5, ordered: 1, total: 12 },
  { name: "XL Senior High PE Uniform", size: "XL", available: 4, sold: 3, ordered: 1, total: 8 },
  { name: "XXL Senior High PE Uniform", size: "XXL", available: 2, sold: 1, ordered: 0, total: 3 },
];

// College data
const collegeUniformData = [
  { name: "Small College Uniform", size: "Small", available: 6, sold: 2, ordered: 1, total: 9 },
  { name: "Medium College Uniform", size: "Medium", available: 8, sold: 3, ordered: 2, total: 13 },
  { name: "Large College Uniform", size: "Large", available: 5, sold: 4, ordered: 1, total: 10 },
  { name: "XL College Uniform", size: "XL", available: 3, sold: 2, ordered: 1, total: 6 },
  { name: "XXL College Uniform", size: "XXL", available: 2, sold: 1, ordered: 0, total: 3 },
];

const collegePeData = [
  { name: "Small College PE Uniform", size: "Small", available: 5, sold: 1, ordered: 1, total: 7 },
  { name: "Medium College PE Uniform", size: "Medium", available: 7, sold: 2, ordered: 2, total: 11 },
  { name: "Large College PE Uniform", size: "Large", available: 4, sold: 3, ordered: 1, total: 8 },
  { name: "XL College PE Uniform", size: "XL", available: 2, sold: 2, ordered: 1, total: 5 },
  { name: "XXL College PE Uniform", size: "XXL", available: 1, sold: 1, ordered: 0, total: 2 },
];

// Event T-shirt data
const intramsShirtData = [
  { name: "Small Intrams T-shirt", size: "Small", available: 10, sold: 3, ordered: 2, total: 15 },
  { name: "Medium Intrams T-shirt", size: "Medium", available: 12, sold: 4, ordered: 3, total: 19 },
  { name: "Large Intrams T-shirt", size: "Large", available: 8, sold: 5, ordered: 2, total: 15 },
  { name: "XL Intrams T-shirt", size: "XL", available: 6, sold: 2, ordered: 1, total: 9 },
  { name: "XXL Intrams T-shirt", size: "XXL", available: 4, sold: 1, ordered: 0, total: 5 },
];

const christmasShirtData = [
  { name: "Small Christmas T-shirt", size: "Small", available: 9, sold: 2, ordered: 1, total: 12 },
  { name: "Medium Christmas T-shirt", size: "Medium", available: 11, sold: 3, ordered: 2, total: 16 },
  { name: "Large Christmas T-shirt", size: "Large", available: 7, sold: 4, ordered: 1, total: 12 },
  { name: "XL Christmas T-shirt", size: "XL", available: 5, sold: 2, ordered: 1, total: 8 },
  { name: "XXL Christmas T-shirt", size: "XXL", available: 3, sold: 1, ordered: 0, total: 4 },
];

const InventoryWidget = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="inventory-main">
      {/* Search Bar */}
      <div className="inventory-search-bar-row">
        <input
          type="text"
          placeholder="Search uniform or PE..."
          className="inventory-search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="inventory-search-btn">Search</button>
      </div>

      {/* Kinder Section */}
      <h2 className="inventory-title">Kinder School Uniform Inventory</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {uniformData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
        <div className="inventory-col">
          {peData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elementary Section */}
      <h2 className="inventory-title" style={{marginTop: "48px"}}>Elementary School Uniform Inventory</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {elementaryUniformData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
        <div className="inventory-col">
          {elementaryPeData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Senior High Section */}
      <h2 className="inventory-title" style={{marginTop: "48px"}}>Senior High School Uniform Inventory</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {seniorHighUniformData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
        <div className="inventory-col">
          {seniorHighPeData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Section */}
      <h2 className="inventory-title" style={{marginTop: "48px"}}>College School Uniform Inventory</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {collegeUniformData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
        <div className="inventory-col">
          {collegePeData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="Uniform" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event T-shirt Section */}
      <h2 className="inventory-title" style={{marginTop: "48px"}}>Event T-shirt</h2>
      <div className="inventory-2col">
        <div className="inventory-col">
          {intramsShirtData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="T-shirt" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
        <div className="inventory-col">
          {christmasShirtData.map((item, idx) => (
            <div className="inventory-card big-card" key={item.name}>
              <div className="inventory-images">
                <img src={uniformImg} alt="T-shirt" className="inventory-img" />
                <img src={qrCodeImg} alt="QR Code" className="inventory-qr" />
              </div>
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-fields">
                  <label>
                    Available
                    <input type="number" value={item.available} readOnly />
                  </label>
                  <label>
                    Sold
                    <input type="number" value={item.sold} readOnly />
                  </label>
                  <label>
                    Ordered
                    <input type="number" value={item.ordered} readOnly />
                  </label>
                  <label>
                    Total
                    <input type="number" value={item.total} readOnly />
                  </label>
                </div>
                <button className="inventory-btn">Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryWidget;
