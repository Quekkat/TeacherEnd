import './VerifyStudentWidget.css';

const VerifyStudent = () => {
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
        <div className="verify-student-main">
            <h1 className="verify-student-title">Verify Student</h1>
            
            <div className="verify-student-cards-center">
                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025001</div>
                        <div><strong>First Name:</strong> Juan</div>
                        <div><strong>Last Name:</strong> Dela Cruz</div>
                        <div><strong>Year:</strong> Grade 1</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025002</div>
                        <div><strong>First Name:</strong> Maria</div>
                        <div><strong>Last Name:</strong> Santos</div>
                        <div><strong>Year:</strong> Grade 2</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025003</div>
                        <div><strong>First Name:</strong> Jose</div>
                        <div><strong>Last Name:</strong> Reyes</div>
                        <div><strong>Year:</strong> Grade 3</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025004</div>
                        <div><strong>First Name:</strong> Ana</div>
                        <div><strong>Last Name:</strong> Lopez</div>
                        <div><strong>Year:</strong> Grade 4</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025005</div>
                        <div><strong>First Name:</strong> Pedro</div>
                        <div><strong>Last Name:</strong> Garcia</div>
                        <div><strong>Year:</strong> Grade 5</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025006</div>
                        <div><strong>First Name:</strong> Luisa</div>
                        <div><strong>Last Name:</strong> Torres</div>
                        <div><strong>Year:</strong> Grade 6</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025007</div>
                        <div><strong>First Name:</strong> Carlos</div>
                        <div><strong>Last Name:</strong> Martinez</div>
                        <div><strong>Year:</strong> Grade 1</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025008</div>
                        <div><strong>First Name:</strong> Sofia</div>
                        <div><strong>Last Name:</strong> Gonzales</div>
                        <div><strong>Year:</strong> Grade 2</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025009</div>
                        <div><strong>First Name:</strong> Miguel</div>
                        <div><strong>Last Name:</strong> Hernandez</div>
                        <div><strong>Year:</strong> Grade 3</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>

                <div className="verify-student-card">
                    <div className="student-info-title">
                        <strong>Student Information</strong>
                    </div>
                    <div className="verify-student-info">
                        <div><strong>USN:</strong> 2025010</div>
                        <div><strong>First Name:</strong> Isabella</div>
                        <div><strong>Last Name:</strong> Ramirez</div>
                        <div><strong>Year:</strong> Grade 4</div>
                    </div>
                    <button className="verify-btn" onClick={showAlert}>Verify</button>
                </div>
            </div>
        </div>
    );
};

export default VerifyStudent;