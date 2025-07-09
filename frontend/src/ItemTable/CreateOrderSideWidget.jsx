import { useState, useEffect } from "react";
import { useStore } from "../globalVariables";
const CreateOrderSideWidget=({item})=>{
    const {orderItem} = useStore();
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
            XLARGE: xl,
            XXLarge: xxl,
        }
        console.log(data);
        await orderItem(data);
    };
    return(
        <div>
            <p>Create Order:</p>
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
            <button onClick={hadleCreateOrder}> Confirm create order</button>
        </div>
    )
}
export default CreateOrderSideWidget;