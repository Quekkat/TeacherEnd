import { useState, useEffect } from 'react';
import './VerifyStudentPaymentWidget.css';
import { useStore } from '../globalVariables';
import VerifyPaymentCard from './VerifyPaymentCard';

const VerifyStudentPaymentWidget = () => {
    const {unverifiedPayments,getUnverifiedPayment} = useStore();
    useEffect(() => {
    getUnverifiedPayment();
    console.log(unverifiedPayments);
    console.log("unverified payment list")
    }, []);
    const [search, setSearch] = useState("");

    const handleSearch = () => {

    };


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

                {unverifiedPayments.length>0? (
                        <div className="verify-student-payment-cards-center">
                        {unverifiedPayments.map((payment) => (
                            <VerifyPaymentCard key={payment._id} payment={payment}/>
                        ))}
            </div>
                    ):(
                        <p> No payments to verify</p>
                    )
                }
        </div>
    );
};

export default VerifyStudentPaymentWidget;