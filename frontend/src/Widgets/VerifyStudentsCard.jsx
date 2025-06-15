import { useStore } from '../globalVariables';

const VerifyStudentCard =({student})=>{
    const{verifySelectedStudent} = useStore();
    const handleVerify=()=>{
        const data ={
            ID: student._id,
        }
        console.log(student._id);
        verifySelectedStudent(data);


        //alert blabla blublu
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
    }
    return(
        <div className="verify-student-card">
            <div className="student-info-title">
                <strong>Student Information</strong>
            </div>
            <div className="verify-student-info">
                <div><strong>USN:</strong> {student.lmsURN}</div>
                <div><strong>First Name:</strong> {student.firstName}</div>
                <div><strong>Last Name:</strong> {student.lastName}</div>
                <div><strong>Year:</strong> {student.yearOrLevel}</div>
                <div><strong>Section:</strong> {student.section}</div>
                <div><strong>Date created: </strong>{student.createdAt}</div>
            </div>
            <button className="verify-btn" onClick={handleVerify}>Verify</button>
        </div>
    )
}
export default VerifyStudentCard;