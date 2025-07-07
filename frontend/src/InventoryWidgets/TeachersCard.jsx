import { useStore } from "../globalVariables";

const TeachersCard = ({ TEACHER, ON_DELETE }) => {

    const handleDelete = () => {
        // This function now calls the passed ON_DELETE prop,
        // which will handle setting the specific teacher to be deleted.
        ON_DELETE();
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:scale-102">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                    <span className="material-symbols-rounded text-blue-600 dark:text-blue-400">person</span>
                </div>
                <div>
                    <p className="font-bold text-gray-800 dark:text-white">{TEACHER.gmail}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
            </div>
            <button 
                onClick={handleDelete} 
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                <span className="material-symbols-rounded">delete</span>
            </button>
        </div>
    )
}

export default TeachersCard;