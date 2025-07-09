import { useState } from "react";
import { useStore } from "../globalVariables";

const RestockSideWidget=({item})=>{

    const {restockItem} = useStore();
    const [small, setSmall]= useState(0);
    const [medium, setMedium]=useState(0);
    const [large, setLarge]=useState(0);
    const [xl, setxl] = useState(0);
    const [xxl, setxxl]= useState(0);

    const hadleCreateOrder= async()=>{
        const data ={
            id: item._id,
            SMALL: small,
            MEDIUM: medium,
            LARGE: large,
            XL: xl,
            XXL: xxl,
        }
        console.log(data);
        await restockItem(data);
    };
    return(
        <div>
            <p>Restock Item:</p>
            <div className="number-input-div-container">
                <p>Small:</p>
                <button onClick={()=>setSmall(prev => prev +1)}>+</button>
                <input type="number" value={small} onChange={(e)=> setSmall(Number(e.target.value))}/>
                <button onClick={()=>setSmall(prev => prev-1)}>-</button>
            </div>
            <div className="number-input-div-container">
                <p>Medium:</p>
                <button onClick={()=>setMedium(prev => prev +1)}>+</button>
                <input type="number" value={medium} onChange={(e)=> setMedium(Number(e.target.value))}/>
                <button onClick={()=>setMedium(prev => prev-1)}>-</button>
            </div>
            <div className="number-input-div-container">
                <p>Large:</p>
                <button onClick={()=>setLarge(prev => prev +1)}>+</button>
                <input type="number" value={large} onChange={(e)=> setLarge(Number(e.target.value))}/>
                <button onClick={()=>setLarge(prev => prev-1)}>-</button>
            </div>
            <div className="number-input-div-container">
                <p>X-Large:</p>
                <button onClick={()=>setxl(prev => prev +1)}>+</button>
                <input type="number" value={xl} onChange={(e)=> setxl(Number(e.target.value))}/>
                <button onClick={()=>setxl(prev => prev-1)}>-</button>
            </div>
            <div className="number-input-div-container">
                <p>XX-Large:</p>
                <button onClick={()=>setxxl(prev => prev +1)}>+</button>
                <input type="number" value={xxl} onChange={(e)=> setxxl(Number(e.target.value))}/>
                <button onClick={()=>setxxl(prev => prev-1)}>-</button>
            </div>
            <button onClick={hadleCreateOrder}> Confirm restock</button>
        </div>
    )
}
export default RestockSideWidget;