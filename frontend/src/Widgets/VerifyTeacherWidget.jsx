import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
import './VerifyTeachersWidget.css';
import VerifyTeachersCard from "./VerifyTeacherCard";

const VerifyTeachers = () => {
    const { unverifiedTeachersList, getUnverifiedTeacherslist, verifySelectedTeacher } = useStore();
    const [search, setSearch] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

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

    const handleSearch = () => {
        if (search.trim() === "") {
            setFilteredTeachers([]);
            setIsSearchActive(false);
            return;
        }

        const filtered = unverifiedTeachersList.filter(teacher => {
            return (
                teacher.email.toLowerCase().includes(search.toLowerCase()) ||
                teacher.username.toLowerCase().includes(search.toLowerCase()) ||
                teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
                teacher.lastName.toLowerCase().includes(search.toLowerCase())
            );
        });

        setFilteredTeachers(filtered);
        setIsSearchActive(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        getUnverifiedTeacherslist();
    }, [getUnverifiedTeacherslist]);

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

            <div className="verify-teacher-cards-center">
                {(isSearchActive ? filteredTeachers : unverifiedTeachersList).map((teacher, index) => (
                    <VerifyTeachersCard 
                        key={index}
                        teacher={teacher}
                        onVerify={() => {
                            showAlert();
                            // handleVerify(); // your existing verify logic
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default VerifyTeachers;