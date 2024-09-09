import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartApi } from "../API's/cartAPI's";

export default function useMutationCart(fn) {
    const queryClient = useQueryClient()
    return useMutation({mutationFn:fn,onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['getCart']})
        if(fn==clearCartApi)
            queryClient.setQueriesData('getCart',null)
    }
    })
}
