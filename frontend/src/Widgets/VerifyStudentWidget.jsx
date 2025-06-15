import { useState, useEffect } from "react";
import './VerifyStudentWidget.css';
import { useStore } from '../globalVariables';
import VerifyStudentCard from "./VerifyStudentsCard";
const VerifyStudent = () => {
    const {unverifiedStudentList, getUnverifiedStudent} = useStore();
    useEffect(() => {
        getUnverifiedStudent();
    }, [])
    
    return (
        <div className="verify-student-main">
            <h1 className="verify-student-title">Verify Student</h1>
            
            <div className="verify-student-cards-center">
                {unverifiedStudentList.map((students)=>(
                    <VerifyStudentCard key={students._id} student={students}/>
                ))}
            </div>
        </div>
    );
};

export default VerifyStudent;