import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from './Loading'

export default function Brand() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {isLoading,isFetching,data,isError,error} = useQuery({queryKey:['getBrands'],queryFn:getBrands,refetchOnWindowFocus:false})
  if (isLoading) {
    return <Loading></Loading>
  }
  if (isError) {
    return <h2 className='text-red-700 text-center my-4 text-2xl'>{error.message}</h2>
  }
  return (
    <div className='row items-center justify-center gap-6'>
      {data?.data?.data.map(ele=><div key={ele?._id} className='md:w-1/5 cursor-pointer rounded-lg hover:shadow' >
        <div>
          <img src={ele?.image} alt='brand name' />
          <p className='text-center'>{ele?.name}</p>
        </div>
      </div>)}
    </div>
  )
}
