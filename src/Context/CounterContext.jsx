import { createContext, useEffect, useState } from "react";
import useQueryCart from "../Hooks/useQueryCart";
import { getCartApi } from "../API's/cartAPI's";

export let counter = createContext(null)
export default function CounterContextProvider({children}) {
    let {data} = useQueryCart('getOwner',getCartApi)
    
    let [count,setCount] = useState(null)
    
    return <counter.Provider value={{data,count,setCount}}>{children}</counter.Provider>
}