import './VerifyStudentPaymentWidget.css';

const students = [
    {
        email: "student1@gmail.com",
        username: "studentuser1",
        firstName: "Juan",
        lastName: "Dela Cruz",
        section: "A",
        yearOrLevel: "Grade 1"
    },
    {
        email: "student2@gmail.com",
        username: "studentuser2",
        firstName: "Maria",
        lastName: "Santos",
        section: "B",
        yearOrLevel: "Grade 2"
    },
    {
        email: "student3@gmail.com",
        username: "studentuser3",
        firstName: "Jose",
        lastName: "Reyes",
        section: "C",
        yearOrLevel: "Grade 3"
    },
    {
        email: "student4@gmail.com",
        username: "studentuser4",
        firstName: "Ana",
        lastName: "Lopez",
        section: "D",
        yearOrLevel: "Grade 4"
    },
    {
        email: "student5@gmail.com",
        username: "studentuser5",
        firstName: "Pedro",
        lastName: "Garcia",
        section: "E",
        yearOrLevel: "Grade 5"
    },
    {
        email: "student6@gmail.com",
        username: "studentuser6",
        firstName: "Luisa",
        lastName: "Torres",
        section: "F",
        yearOrLevel: "Grade 6"
    }
];

const VerifyStudentPayment = () => {
    return (
        <div className="verify-student-payment-main">
            <div className="verify-student-payment-search-bar-row">
                <input
                    type="text"
                    placeholder="Search student by email or username..."
                    className="verify-search-input"
                />
                <button className="verify-search-btn">Search</button>
            </div>
            <div className="verify-student-payment-cards-center">
                {students.map((student, idx) => (
                    <div className="verify-student-card" key={idx}>
                        <div className="verify-student-info">
                            <div className="verify-student-email">{student.email}</div>
                            <div className="verify-student-label">Username: <span>{student.username}</span></div>
                            <div className="verify-student-label">First Name: <span>{student.firstName}</span></div>
                            <div className="verify-student-label">Last Name: <span>{student.lastName}</span></div>
                            <div className="verify-student-label">Section: <span>{student.section}</span></div>
                            <div className="verify-student-label">Year/Level: <span>{student.yearOrLevel}</span></div>
                        </div>
                        <div className="verify-student-actions">
                            <button className="verify-btn">Verify</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerifyStudentPayment;