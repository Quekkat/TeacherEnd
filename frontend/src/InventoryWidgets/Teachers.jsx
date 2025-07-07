import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
import TeachersCard from "./TeachersCard";
const Teacher = ()=>{
    const { signUp, teachersList, deleteTeacher, getTeachersList, selectedDeletedTeacher} = useStore();
    const [deleteAdmin, setDeleteAdmin] = useState(false);
    const [formData, setFormData] = useState({
        GMAIL: "",
        PASSWORD: "",
    });
      useEffect(() => {
    const loadData = async () => {
      await getTeachersList();
    };

    loadData(); // call async function
  }, [getTeachersList]); // include as dependency

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData));
        await signUp(formData);
        await getTeachersList();
    };
    const handleDeleteSelected = async()=>{
        console.log(selectedDeletedTeacher);
        await deleteTeacher(selectedDeletedTeacher);
        await getTeachersList();
    }
    return(
        <div className="teachers-base-div">
        <div className="teachers-flexbox-div">
            <div className="teachers-left-div">
            <form onSubmit={handleSubmit} className="bg-black bg-opacity-70 p-5 rounded-xl shadow-lg shadow-white w-full max-w-md">
            <h1 className="text-4xl text-center text-white">New admin: </h1>
            <div className="relative w-full h-12 my-7">
            <input
            type="email"
            placeholder="Email"
            value={formData.GMAIL}
            onChange={(e) => setFormData({ ...formData, GMAIL: e.target.value })}
            required
            className="w-full h-full bg-transparent border-2 border-white border-opacity-20 rounded-full text-base text-white p-5 pr-11"
            />
            <i className='bx bxs-envelope absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white'></i>
            </div>

            <div className="relative w-full h-12 my-7">
            <input
            type="password"
            placeholder="Password"
            value={formData.PASSWORD}
            onChange={(e) => setFormData({ ...formData, PASSWORD: e.target.value })}
            required
            className="w-full h-full bg-transparent border-2 border-white border-opacity-20 rounded-full text-base text-white p-5 pr-11"
            />
            <i className='bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white'></i>
            </div>

            <button type="submit" className="w-full h-11 border-none outline-none rounded-full bg-white text-black font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-300 shadow-md">Create admin</button>
            <div className="text-sm text-center mt-5">
            
            </div>
            </form>
            </div>
            <div className="teachers-right-div">
                <p> Admin List: </p>
                {teachersList?.length>0 && 
                teachersList.map((teacher)=>(
                    <TeachersCard key={teacher._id} TEACHER={teacher} TOGGLEDELETE={()=>setDeleteAdmin(true)} />
                ))}
            </div>
        </div>
        {deleteAdmin && (
            <div className="delete-admin-popup-base">
            <div className="delete-admin-popup-content-base">
                <p>Do you want to delete this admin?</p>
                <button onClick={handleDeleteSelected}>Yes</button>
                <button onClick={()=>setDeleteAdmin(false)}>No</button>
            </div>
            </div>
        )}
        </div>
    );
}
export default Teacher;