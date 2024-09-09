import { getProducts } from "../API's/getProducts";
import Item from "./Item";
import Loading from "./Loading";
import useQueryCart from "../Hooks/useQueryCart";

export default function FeaturedProducts({arr}) {
  let {isLoading,isError,error,data} = useQueryCart('getProducts',getProducts)
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    <h2 className="text-red-700 my-3 font-bold">{error}</h2>;
  }
  return <div className="row container">
    {arr?.length? arr?.map(proud=><Item key={proud?._id} ele={proud}></Item>):data?.map(proud=><Item key={proud?._id} ele={proud}></Item>)}
  </div>;
}
