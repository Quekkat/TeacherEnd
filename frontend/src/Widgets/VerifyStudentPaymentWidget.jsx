import { useState, useEffect } from 'react';
import './VerifyStudentPaymentWidget.css';
import { useStore } from '../globalVariables';

const VerifyStudentPayment = () => {
    const {unverifiedPayments,getUnverifiedPayment} = useStore();
    useEffect(() => {
    getUnverifiedPayment();
    console.log(unverifiedPayments);
    }, []);
    const [search, setSearch] = useState("");
    const handleSearch = () => {

    };
    const handleVerify =async(ID)=>{
        console.log(ID);
    }

    // Also search when pressing Enter in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
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

                {
                    unverifiedPayments.length>0? (
                        <div className="verify-student-payment-cards-center">
                        {unverifiedPayments.map((payment) => (
                            <div className="verify-student-card" key={payment._id}>
                                <div className="verify-student-info">
                                    <div className="verify-student-label"><span className="label-bold">Item ordered:</span> {payment.itemName}</div>
                                    <div className="verify-student-label"><span className="label-bold">Student Name:</span> {student.studentName}</div>
                                    <div className="verify-student-label"><span className="label-bold">Student URN:</span> {student.studentUID}</div>
                                </div>
                                <div className="verify-student-actions">
                                    <button className="verify-btn" onClick={handleVerify}>Verify</button>
                                </div>
                            </div>
                        ))}
            </div>
                    ):(
                        <p> No payments to verify</p>
                    )
                }
        </div>
    );
};

export default VerifyStudentPayment;