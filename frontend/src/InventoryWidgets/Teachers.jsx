import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
import TeachersCard from "./TeachersCard";

const Teacher = () => {
    const { signUp, teachersList, deleteTeacher, getTeachersList, selectedDeletedTeacher } = useStore();
    const [deleteAdmin, setDeleteAdmin] = useState(false);
    const [formData, setFormData] = useState({
        GMAIL: "",
        PASSWORD: "",
    });

    useEffect(() => {
        getTeachersList();
    }, [getTeachersList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(formData);
        await getTeachersList();
        setFormData({ GMAIL: "", PASSWORD: "" }); // Clear form
    };

    const handleDeleteConfirm = async () => {
        if (selectedDeletedTeacher) {
            await deleteTeacher(selectedDeletedTeacher);
            await getTeachersList(); // Re-fetch the list after deletion
            setDeleteAdmin(false);
        }
    };

    const openDeleteModal = (teacherId) => {
        const { setSelectedDeletedTeacher } = useStore.getState();
        setSelectedDeletedTeacher(teacherId);
        setDeleteAdmin(true);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full text-gray-800 dark:text-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Admin List Section (Left) */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold mb-6">Administrator Accounts</h1>
                    <div className="space-y-4">
                        {teachersList?.length > 0 ? (
                            teachersList.map((teacher) => (
                                <TeachersCard 
                                    key={teacher._id} 
                                    TEACHER={teacher} 
                                    ON_DELETE={() => openDeleteModal(teacher._id)} 
                                />
                            ))
                        ) : (
                            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <p className="text-gray-500 dark:text-gray-400">No admin accounts found.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* New Admin Form (Right) */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl sticky top-8">
                        <h2 className="text-2xl font-bold mb-6">Create New Admin</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={formData.GMAIL}
                                    onChange={(e) => setFormData({ ...formData, GMAIL: e.target.value })}
                                    required
                                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.PASSWORD}
                                    onChange={(e) => setFormData({ ...formData, PASSWORD: e.target.value })}
                                    required
                                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-8 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300">
                            Create Admin
                        </button>
                    </form>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteAdmin && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md mx-4">
                        <h3 className="text-2xl font-bold text-center mb-4">Confirm Deletion</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Are you sure you want to delete this admin account? This action cannot be undone.</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleDeleteConfirm} className="px-8 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
                                Yes, Delete
                            </button>
                            <button onClick={() => setDeleteAdmin(false)} className="px-8 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Teacher;