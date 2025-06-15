import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
import './VerifyTeachersWidget.css';
import VerifyTeachersCard from "./VerifyTeacherCard";

const VerifyTeachers = () => {
    const { unverifiedTeachersList, getUnverifiedTeacherslist, verifySelectedTeacher } = useStore();
    const [search, setSearch] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

    useEffect(() => {
        getUnverifiedTeacherslist();
    }, []);

    useEffect(() => {
        // Reset filtered teachers when the original list changes
        setFilteredTeachers(unverifiedTeachersList);
        setIsSearchActive(false);
    }, [unverifiedTeachersList]);

    const handleSearch = () => {
        if (!search.trim()) {
            // If search is empty, show all teachers
            setFilteredTeachers(unverifiedTeachersList);
            setIsSearchActive(false);
            return;
        }

        // Filter teachers by email, username, first name, or last name
        const searchLower = search.toLowerCase();
        const filtered = unverifiedTeachersList.filter(
            teacher => 
                teacher.gmail?.toLowerCase().includes(searchLower) || 
                teacher.username?.toLowerCase().includes(searchLower) ||
                teacher.fName?.toLowerCase().includes(searchLower) ||
                teacher.lName?.toLowerCase().includes(searchLower)
        );
        
        setFilteredTeachers(filtered);
        setIsSearchActive(true);
    };

    // Also search when pressing Enter in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const showAlert = () => {
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.innerHTML = `
            <span class="check-icon">✓</span>
            <span class="alert-message">Teacher Verified</span>
        `;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    };

    return (
        <div className="verify-teachers-container">
            <div className="verify-search-bar-row">
                <input
                    type="text"
                    placeholder="Search teacher by name, email or username..."
                    className="verify-search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="verify-search-btn" onClick={handleSearch}>Search</button>
            </div>

            <h1 className="verify-teachers-title">Verify Teachers</h1>

            {isSearchActive && filteredTeachers.length === 0 && (
                <div className="no-results">No teachers found matching "{search}"</div>
            )}

            <div className="verify-teacher-cards-center">
                {(filteredTeachers.length > 0 || isSearchActive ? filteredTeachers : unverifiedTeachersList).map((teacher, index) => (
                    <div className="verify-teacher-card" key={teacher._id || index}>
                        <div className="verify-teacher-info">
                            <div className="verify-teacher-email">{teacher.gmail}</div>
                            <div className="verify-teacher-label">Username: <span>{teacher.username}</span></div>
                            <div className="verify-teacher-label">First Name: <span>{teacher.fName}</span></div>
                            <div className="verify-teacher-label">Last Name: <span>{teacher.lName}</span></div>
                        </div>
                        <div className="verify-teacher-actions">
                            <button 
                                className="verify-btn" 
                                onClick={() => {
                                    showAlert();
                                    const data = { ID: teacher._id };
                                    // Uncomment this to actually verify the teacher:
                                    verifySelectedTeacher(data);
                                }}
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerifyTeachers;