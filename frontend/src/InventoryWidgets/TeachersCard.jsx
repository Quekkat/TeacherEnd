import { useStore } from "../globalVariables";
const TeachersCard = ({TOGGLEDELETE, TEACHER})=>{
    const {setSelectedDeletedTeacher} = useStore();
    const handleDelete =()=>{

        setSelectedDeletedTeacher(TEACHER._id);
        TOGGLEDELETE();
        
    }
    return(
        <div className="teachers-card-base">
            <div className="teachers-card-content">
                <p> GMAIL: {TEACHER.gmail}</p>
            </div>
            <button onClick={handleDelete}> Delete</button>
        </div>
    )
}
export default TeachersCard;