import { useState , useCallback } from "react";

const UseInput = (initForm) => {

    const [data , setdata] = useState([])
    const onChange = useCallback((e)=>{
        const {name,value} = e.target;
        setdata((data)=>({...data, [name] : value}))
      },[])

    const reset = useCallback(() => setdata(initForm),[initForm])    
    return [data , onChange , reset];
}
export default UseInput;