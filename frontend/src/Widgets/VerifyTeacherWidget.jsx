import './VerifyTeachersWidget.css';
import { useStore } from '../globalVariables';
import { useState } from 'react';

const VerifyTeachers = () => {
    const [search, setSearch] = useState("");

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

            <div className="verify-teacher-cards-center">
                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">johnsmith@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>jsmith_123</span></div>
                        <div className="verify-teacher-label">First Name: <span>John</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Smith</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">emily.w@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>emily_wilson</span></div>
                        <div className="verify-teacher-label">First Name: <span>Emily</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Wilson</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">michael.d@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>mdavis_teacher</span></div>
                        <div className="verify-teacher-label">First Name: <span>Michael</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Davis</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">sarah.miller@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>smiller_456</span></div>
                        <div className="verify-teacher-label">First Name: <span>Sarah</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Miller</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">david.anderson@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>danderson_789</span></div>
                        <div className="verify-teacher-label">First Name: <span>David</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Anderson</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">jennifer.brown@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>jbrown_teacher</span></div>
                        <div className="verify-teacher-label">First Name: <span>Jennifer</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Brown</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">robert.taylor@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>rtaylor_321</span></div>
                        <div className="verify-teacher-label">First Name: <span>Robert</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Taylor</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">lisa.white@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>lwhite_654</span></div>
                        <div className="verify-teacher-label">First Name: <span>Lisa</span></div>
                        <div className="verify-teacher-label">Last Name: <span>White</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">james.martin@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>jmartin_987</span></div>
                        <div className="verify-teacher-label">First Name: <span>James</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Martin</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="verify-teacher-card">
                    <div className="verify-teacher-info">
                        <div className="verify-teacher-email">patricia.clark@school.edu</div>
                        <div className="verify-teacher-label">Username: <span>pclark_teacher</span></div>
                        <div className="verify-teacher-label">First Name: <span>Patricia</span></div>
                        <div className="verify-teacher-label">Last Name: <span>Clark</span></div>
                    </div>
                    <div className="verify-teacher-actions">
                        <button 
                            className="verify-btn" 
                            onClick={() => {
                                showAlert();
                                // handleVerify(); // your existing verify logic
                            }}
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyTeachers;