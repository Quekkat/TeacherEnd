import { useStore } from "../globalVariables";

const InventoryListCard = ({ INVENTORY }) => {
  const { setSelectedInventoryItem, setWidgetTab } = useStore();

  const openInventory = () => {
    setSelectedInventoryItem(INVENTORY);
    setWidgetTab("inventory-item");
  };

  return (
    <button
      onClick={openInventory}
      className="
        w-80 rounded-lg overflow-hidden shadow-lg 
        bg-blue-100 dark:bg-gray-700 
        text-center p-4 transition-transform duration-300 
        hover:scale-105 hover:shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
      "
    >
      <div className="w-full h-64 mb-4 overflow-hidden rounded-md">
        <img
          className="w-full h-full object-cover"
          src={INVENTORY.imageUrl}
          alt={INVENTORY.name}
        />
      </div>
      <div className="text-gray-800 dark:text-gray-200">
        <p className="font-bold text-xl mb-2">{INVENTORY.name}</p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Year:{" "}
          <span className="font-semibold">{INVENTORY.year}</span>
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Size:{" "}
          <span className="font-semibold">{INVENTORY.size}</span>
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Price:{" "}
          <span className="font-semibold">{INVENTORY.price}</span>
        </p>
        
      </div>
    </button>
  );
};

export default InventoryListCard;