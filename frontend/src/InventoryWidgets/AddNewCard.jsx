import { useStore } from "../globalVariables";
const AddNewCard =()=>{
    const{setWidgetTab}= useStore();
    const handleClick =()=>{
        console.log("Adding new item");
        setWidgetTab("add-new-inventory");
    }
    return(
        <button className="add-new-inventory-list-card-base" onClick={handleClick}>
            Add new card
        </button>
    )
}

export default AddNewCard;