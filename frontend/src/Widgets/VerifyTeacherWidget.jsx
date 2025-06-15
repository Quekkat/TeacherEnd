import './VerifyTeachersWidget.css';
import { useStore } from '../globalVariables';
import { useEffect, useState } from 'react';
import VerifyTeachersCard from './VerifyTeacherCard';
const VerifyTeachers = () => {
    const [search, setSearch] = useState("");
    const {unverifiedTeachersList, getUnverifiedTeacherslist} = useStore();
    //runs once page load
    useEffect(()=>{
        getUnverifiedTeacherslist();
    },[]);
    const showAlert = () => {
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.innerHTML = `
            <span class="check-icon">✓</span>
            <span class="alert-message">Verified</span>
        `;
        document.body.appendChild(alert);

        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.remove();
        }, 3000);
    };

    return (
        <div className="verify-teachers-container">
            <div className="verify-search-bar-row">
                <input
                    type="text"
                    placeholder="Search teacher by email or username..."
                    className="verify-search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="verify-search-btn">Search</button>
            </div>

            <h1 className="verify-teachers-title">Verify Teachers</h1>
            {
                Array.isArray(unverifiedTeachersList) && unverifiedTeachersList.length>0?(
                    unverifiedTeachersList.map((item)=>(
                        <VerifyTeachersCard key={item._id} teacher={item}/>
                    )
                )
            ):(
                <p>No teachers to verify</p>
            )}
        </div>
    );
};

export default VerifyTeachers;