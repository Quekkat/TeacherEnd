import './VerifyTeachersWidget.css';

const teachers = [
    {
        email: "teacher1@gmail.com",
        username: "teacheruser1",
        firstName: "Juan",
        lastName: "Dela Cruz"
    },
    {
        email: "teacher2@gmail.com",
        username: "teacheruser2",
        firstName: "Maria",
        lastName: "Santos"
    },
    {
        email: "teacher3@gmail.com",
        username: "teacheruser3",
        firstName: "Jose",
        lastName: "Reyes"
    },
    {
        email: "teacher4@gmail.com",
        username: "teacheruser4",
        firstName: "Ana",
        lastName: "Lopez"
    },
    {
        email: "teacher5@gmail.com",
        username: "teacheruser5",
        firstName: "Pedro",
        lastName: "Garcia"
    },
    {
        email: "teacher6@gmail.com",
        username: "teacheruser6",
        firstName: "Luisa",
        lastName: "Torres"
    }
];

const VerifyTeachers = () => {
    return (
        <div className="verify-teachers-container">
            <div className="verify-search-bar-row">
                <input
                    type="text"
                    placeholder="Search teacher by email or username..."
                    className="verify-search-input"
                />
                <button className="verify-search-btn">Search</button>
            </div>
            <div className="verify-teacher-cards-center">
                {teachers.map((teacher, idx) => (
                    <div className="verify-teacher-card" key={idx}>
                        <div className="verify-teacher-info">
                            <div className="verify-teacher-email">{teacher.email}</div>
                            <div className="verify-teacher-label">Username: <span>{teacher.username}</span></div>
                            <div className="verify-teacher-label">First Name: <span>{teacher.firstName}</span></div>
                            <div className="verify-teacher-label">Last Name: <span>{teacher.lastName}</span></div>
                        </div>
                        <div className="verify-teacher-actions">
                            <button className="verify-btn">Verify</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerifyTeachers;