import './VerifyStudentWidget.css';

const students = [
    { usn: "2025001", firstName: "Juan", lastName: "Dela Cruz", year: "Grade 1", section: "A" },
    { usn: "2025002", firstName: "Maria", lastName: "Santos", year: "Grade 2", section: "B" },
    { usn: "2025003", firstName: "Jose", lastName: "Reyes", year: "Grade 3", section: "C" },
    { usn: "2025004", firstName: "Ana", lastName: "Lopez", year: "Grade 4", section: "D" },
    { usn: "2025005", firstName: "Pedro", lastName: "Garcia", year: "Grade 5", section: "E" },
    { usn: "2025006", firstName: "Luisa", lastName: "Torres", year: "Grade 6", section: "F" }
];

const VerifyStudent = () => {
    return (
        <div className="verify-student-cards-center">
            {students.map((student, idx) => (
                <div className="verify-student-card" key={idx}>
                    <div className="verify-student-title">Student Information</div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> {student.usn}</div>
                        <div><strong>First Name:</strong> {student.firstName}</div>
                        <div><strong>Last Name:</strong> {student.lastName}</div>
                        <div><strong>Year:</strong> {student.year}</div>
                        <div><strong>Section:</strong> {student.section}</div>
                    </div>
                    <button className="verify-btn">Verify</button>
                </div>
            ))}
        </div>
    );
};

export default VerifyStudent;