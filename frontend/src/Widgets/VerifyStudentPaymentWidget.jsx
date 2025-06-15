import { useState, useEffect } from 'react';
import './VerifyStudentPaymentWidget.css';

const VerifyStudentPayment = () => {
    // Mock data - in a real app this would come from an API
    const initialStudents = [
        {
            email: "student1@gmail.com",
            username: "studentuser1",
            firstName: "Juan",
            lastName: "Dela Cruz",
            yearLevel: "Grade 1"
        },
        {
            email: "student2@gmail.com",
            username: "studentuser2",
            firstName: "Maria",
            lastName: "Santos",
            yearLevel: "Grade 2"
        },
        {
            email: "student3@gmail.com",
            username: "studentuser3",
            firstName: "Jose",
            lastName: "Reyes",
            yearLevel: "Grade 3"
        },
        {
            email: "student4@gmail.com",
            username: "studentuser4",
            firstName: "Ana",
            lastName: "Lopez",
            yearLevel: "Grade 4"
        },
        {
            email: "student5@gmail.com",
            username: "studentuser5",
            firstName: "Pedro",
            lastName: "Garcia",
            yearLevel: "Grade 5"
        },
        {
            email: "student6@gmail.com",
            username: "studentuser6",
            firstName: "Luisa",
            lastName: "Torres",
            yearLevel: "Grade 6"
        }
    ];

    const [search, setSearch] = useState("");
    const [filteredStudents, setFilteredStudents] = useState(initialStudents);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearch = () => {
        if (!search.trim()) {
            // If search is empty, show all students
            setFilteredStudents(initialStudents);
            setIsSearchActive(false);
            return;
        }

        // Filter students by email, username, first name, last name or year level
        const searchLower = search.toLowerCase();
        const filtered = initialStudents.filter(
            student => 
                student.email.toLowerCase().includes(searchLower) || 
                student.username.toLowerCase().includes(searchLower) ||
                student.firstName.toLowerCase().includes(searchLower) ||
                student.lastName.toLowerCase().includes(searchLower) ||
                student.yearLevel.toLowerCase().includes(searchLower)
        );
        
        setFilteredStudents(filtered);
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
            <span class="alert-message">Verified</span>
        `;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    };

    return (
        <div className="verify-student-payment-main">
            <div className="verify-student-payment-search-bar-row">
                <input
                    type="text"
                    placeholder="Search student by name, email, username or grade..."
                    className="verify-search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="verify-search-btn" onClick={handleSearch}>Search</button>
            </div>

            {/* No results message */}
            {isSearchActive && filteredStudents.length === 0 && (
                <div className="no-results">No students found matching "{search}"</div>
            )}

            <div className="verify-student-payment-cards-center">
                {filteredStudents.map((student, index) => (
                    <div className="verify-student-card" key={index}>
                        <div className="verify-student-info">
                            <div className="verify-student-email">{student.email}</div>
                            <div className="verify-student-label"><span className="label-bold">Username:</span> {student.username}</div>
                            <div className="verify-student-label"><span className="label-bold">First Name:</span> {student.firstName}</div>
                            <div className="verify-student-label"><span className="label-bold">Last Name:</span> {student.lastName}</div>
                            <div className="verify-student-label"><span className="label-bold">Year/Level:</span> {student.yearLevel}</div>
                        </div>
                        <div className="verify-student-actions">
                            <button className="verify-btn" onClick={showAlert}>Verify</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerifyStudentPayment;