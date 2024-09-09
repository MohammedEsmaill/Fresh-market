import { useQuery } from '@tanstack/react-query'

export default function useQueryCart(key,fn) {
  
    return useQuery({queryKey:[key],queryFn:fn,select:(data)=>data?.data})
    
}

export function useQueryCategoryProducts(key,fn) {
  
    return useQuery({queryKey:[key],queryFn:fn})
    
}
