import './VerifyTeachersWidget.css';
import { useStore } from '../globalVariables';
import { useState, useEffect } from 'react';

import VerifyTeachersCard from './VerifyTeacherCard';

const VerifyTeachers = () => {
    const {unverifiedTeachersList, getUnverifiedTeacherslist} = useStore();
    useEffect(() => {
        getUnverifiedTeacherslist();
      }, []);
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
                {unverifiedTeachersList.map((teachers) => (
                    <VerifyTeachersCard key={teachers._id} teacher={teachers}/>
                ))}
            </div>
        </div>
    );
};

export default VerifyTeachers;