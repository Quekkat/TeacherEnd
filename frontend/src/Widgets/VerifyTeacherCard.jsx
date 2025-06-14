import './VerifyTeachersWidget.css';
import { useStore } from '../globalVariables';
import { useState, useEffect } from 'react';

const VerifyTeachersCard = ({teacher})=>{
    const {verifySelectedTeacher} = useStore();
    const handleVerify = async()=>{
        console.log(teacher._id);
        const data = {
            ID: teacher._id,
        }
        verifySelectedTeacher(data);
    }

    return(
        <div className="verify-teacher-card">
            <div className="verify-teacher-info">
                <div className="verify-teacher-email">{teacher.gmail}</div>
                <div className="verify-teacher-label">Username: <span>{teacher.username}</span></div>
                <div className="verify-teacher-label">First Name: <span>{teacher.fName}</span></div>
                <div className="verify-teacher-label">Last Name: <span>{teacher.lName}</span></div>
            </div>
            <div className="verify-teacher-actions">
                <button type="button" onClick={handleVerify} className="verify-btn">Verify</button>
            </div>
        </div>
    )
}
export default VerifyTeachersCard;