import { useStore } from "../globalVariables";

const AddNewCard = () => {
    const { setWidgetTab } = useStore();
    const handleClick = () => {
        console.log("Adding new item");
        setWidgetTab("add-new-inventory");
    };

    return (
        <button
            className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 dark:bg-blue-700 dark:hover:bg-blue-600"
            onClick={handleClick}
            aria-label="Add new item"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                />
            </svg>
        </button>
    );
};

export default AddNewCard;