import { useStore } from '../globalVariables';

const VerifyPaymentCard = ({payment})=>{
    
    const handleVerify =()=>{
        console.log("hello");
        console.log(payment._id);
        };
    return(
        <div className="verify-student-card" key={payment._id}>
            <div className="verify-student-info">
                <div className="verify-student-label"><span className="label-bold">Item ordered:</span> {payment.itemName}</div>
                <div className="verify-student-label"><span className="label-bold">Student Name:</span> {payment.studentName}</div>
                <div className="verify-student-label"><span className="label-bold">Student URN:</span> {payment.studentUID}</div>
            </div>
            <div className="verify-student-actions">
                <button className="verify-btn" onClick={handleVerify}>Verify</button>
            </div>
        </div>
    )
}

export default VerifyPaymentCard;