import { useState } from "react";
import { useStore } from "../globalVariables";
const SpecifiedMakeOrder =()=>{
  const {selectedInventoryItem, setWidgetTab, orderItem, getOrderList} = useStore();
  const [popupWindow, setPopupWindow] = useState(false);
  const [userData, setUserData] = useState({
    itemID: selectedInventoryItem._id,
    Studentname: [''] // initial one input
  });

  // Add a new empty input field
  const addStudents = () => {
  setUserData(prev => ({
      ...prev,
      Studentname: [...prev.Studentname, '']
      }));
  };

// Remove last input
  const removeStudents = () => {
      setUserData(prev => ({
      ...prev,
      Studentname: prev.Studentname.slice(0, -1)
  }));
  };

  // Handle typing in any input
    const handleStudentChange = (index, value) => {
        const updatedStudents = [...userData.Studentname];
        updatedStudents[index] = value;

        setUserData(prev => ({
            ...prev,
            Studentname: updatedStudents
        }));
    };
  const handleBack =()=>{
  setWidgetTab("inventory-list");

  }
  const handleOrderItem = async()=>{
    await orderItem(userData);
    await getOrderList();
    setWidgetTab("inventory-list");

  }


  return (
    <div className="specified-make-order-base">
    <div className="specified-make-order-vertical-box">
    <button onClick={handleBack}> Back</button>

    <div className="specified-make-order-flexbox">
      <div className="specified-make-order-left-div">
        <div className="inventory-item-image-container">
            <img className="inventory-item-image" src={selectedInventoryItem.imageUrl} alt="emptyImagetemplate.jpg"/>
        </div>
        <p>Order for item: {selectedInventoryItem.name}</p>

      </div>
      <div className="specified-make-order-right-div">
      {userData.Studentname.map((name, index) => (
        <input
          key={index}
          value={name}
          onChange={(e) => handleStudentChange(index, e.target.value)}
          placeholder={`Student ${index + 1}`}
          style={{ display: 'block', marginBottom: '8px' }}
        />
      ))}

      <button onClick={addStudents}>Add student</button>
      <button onClick={removeStudents} disabled={userData.Studentname.length <= 1}>Remove student</button>
      </div>

    </div>
    <button onClick={()=>setPopupWindow(true)}> Confirm order</button>

    </div>
      <h3>Enter Student order:</h3>

      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {popupWindow && 
      <div className="confirm-restock-popup-modal-base">
      <div className="confirm-restock-popup-modal-content">
      <p> confirm order?</p>
        <div>
            <button onClick={handleOrderItem}>yes</button>
            <button onClick={()=>setPopupWindow(false)}>no</button>
        </div>
      </div>
      </div>
      
      }
    </div>
  );

}
export default SpecifiedMakeOrder;