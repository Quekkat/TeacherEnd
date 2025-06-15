import { useState } from 'react';
import './VerifyStudentPaymentWidget.css';

const VerifyStudentPayment = () => {
    const [search, setSearch] = useState("");

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
                    placeholder="Search student by email or username..."
                    className="verify-search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="verify-search-btn">Search</button>
            </div>

            <div className="verify-student-payment-cards-center">
                <div className="verify-student-card">
                    <div className="verify-student-info">
                        <div className="verify-student-email">student1@gmail.com</div>
                        <div className="verify-student-label"><span className="label-bold">Username:</span> studentuser1</div>
                        <div className="verify-student-label"><span className="label-bold">First Name:</span> Juan</div>
                        <div className="verify-student-label"><span className="label-bold">Last Name:</span> Dela Cruz</div>
                        <div className="verify-student-label"><span className="label-bold">Section:</span> A</div>
                        <div className="verify-student-label"><span className="label-bold">Year/Level:</span> Grade 1</div>
                    </div>
                    <div className="verify-student-actions">
                        <button className="verify-btn" onClick={showAlert}>Verify</button>
                    </div>
                </div>

                <div className="verify-student-card">
                    <div className="verify-student-info">
                        <div className="verify-student-email">student2@gmail.com</div>
                        <div className="verify-student-label"><span className="label-bold">Username:</span> studentuser2</div>
                        <div className="verify-student-label"><span className="label-bold">First Name:</span> Maria</div>
                        <div className="verify-student-label"><span className="label-bold">Last Name:</span> Santos</div>
                        <div className="verify-student-label"><span className="label-bold">Section:</span> B</div>
                        <div className="verify-student-label"><span className="label-bold">Year/Level:</span> Grade 2</div>
                    </div>
                    <div className="verify-student-actions">
                        <button className="verify-btn" onClick={showAlert}>Verify</button>
                    </div>
                </div>

                <div className="verify-student-card">
                    <div className="verify-student-info">
                        <div className="verify-student-email">student3@gmail.com</div>
                        <div className="verify-student-label"><span className="label-bold">Username:</span> studentuser3</div>
                        <div className="verify-student-label"><span className="label-bold">First Name:</span> Jose</div>
                        <div className="verify-student-label"><span className="label-bold">Last Name:</span> Reyes</div>
                        <div className="verify-student-label"><span className="label-bold">Section:</span> C</div>
                        <div className="verify-student-label"><span className="label-bold">Year/Level:</span> Grade 3</div>
                    </div>
                    <div className="verify-student-actions">
                        <button className="verify-btn" onClick={showAlert}>Verify</button>
                    </div>
                </div>

                <div className="verify-student-card">
                    <div className="verify-student-info">
                        <div className="verify-student-email">student4@gmail.com</div>
                        <div className="verify-student-label"><span className="label-bold">Username:</span> studentuser4</div>
                        <div className="verify-student-label"><span className="label-bold">First Name:</span> Ana</div>
                        <div className="verify-student-label"><span className="label-bold">Last Name:</span> Lopez</div>
                        <div className="verify-student-label"><span className="label-bold">Section:</span> D</div>
                        <div className="verify-student-label"><span className="label-bold">Year/Level:</span> Grade 4</div>
                    </div>
                    <div className="verify-student-actions">
                        <button className="verify-btn" onClick={showAlert}>Verify</button>
                    </div>
                </div>

                <div className="verify-student-card">
                    <div className="verify-student-info">
                        <div className="verify-student-email">student5@gmail.com</div>
                        <div className="verify-student-label"><span className="label-bold">Username:</span> studentuser5</div>
                        <div className="verify-student-label"><span className="label-bold">First Name:</span> Pedro</div>
                        <div className="verify-student-label"><span className="label-bold">Last Name:</span> Garcia</div>
                        <div className="verify-student-label"><span className="label-bold">Section:</span> E</div>
                        <div className="verify-student-label"><span className="label-bold">Year/Level:</span> Grade 5</div>
                    </div>
                    <div className="verify-student-actions">
                        <button className="verify-btn" onClick={showAlert}>Verify</button>
                    </div>
                </div>

                <div className="verify-student-card">
                    <div className="verify-student-info">
                        <div className="verify-student-email">student6@gmail.com</div>
                        <div className="verify-student-label"><span className="label-bold">Username:</span> studentuser6</div>
                        <div className="verify-student-label"><span className="label-bold">First Name:</span> Luisa</div>
                        <div className="verify-student-label"><span className="label-bold">Last Name:</span> Torres</div>
                        <div className="verify-student-label"><span className="label-bold">Section:</span> F</div>
                        <div className="verify-student-label"><span className="label-bold">Year/Level:</span> Grade 6</div>
                    </div>
                    <div className="verify-student-actions">
                        <button className="verify-btn" onClick={showAlert}>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyStudentPayment;