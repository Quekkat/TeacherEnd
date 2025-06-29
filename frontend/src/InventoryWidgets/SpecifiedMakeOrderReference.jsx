import { useState } from "react";
const SpecifiedMakeOrderReference =()=>{
    const [userData, setUserData] = useState({
        hobbies: [''] // initial one input
    });

    // Add a new empty input field
    const addHobby = () => {
    setUserData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, '']
        }));
    };

  // Remove last input
    const removeHobby = () => {
        setUserData(prev => ({
        ...prev,
        hobbies: prev.hobbies.slice(0, -1)
    }));
  };

  // Handle typing in any input
    const handleHobbyChange = (index, value) => {
        const updatedHobbies = [...userData.hobbies];
        updatedHobbies[index] = value;

        setUserData(prev => ({
            ...prev,
            hobbies: updatedHobbies
        }));
    };

  return (
    <div>
      <h3>Enter Hobbies:</h3>
      {userData.hobbies.map((hobby, index) => (
        <input
          key={index}
          value={hobby}
          onChange={(e) => handleHobbyChange(index, e.target.value)}
          placeholder={`Hobby ${index + 1}`}
          style={{ display: 'block', marginBottom: '8px' }}
        />
      ))}

      <button onClick={addHobby}>Add Hobby</button>
      <button onClick={removeHobby} disabled={userData.hobbies.length <= 1}>Remove Hobby</button>

      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );

}
export default SpecifiedMakeOrderReference;