'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

// custom imports 
import getProductDetails from './components/getProductDetails';
import addToCart from './components/addToCart';
import { Product } from '@/types';


export default function ProductPage()  {
  const [product, setProduct] = useState<Product | undefined>(undefined) 
  const router = useRouter()
  const searchParams = useSearchParams();
  const customer_id: string = searchParams.get("customer_id") || "";
  const product_id = searchParams.get("product_id") || "";
  const access_token : string = Cookies.get('access_token') ?? ""



  const handleLogOutButtonClick = () => {
    router.push(`/`);
  };

  useEffect(() => {
    if (product === undefined) {
      getProductDetails(access_token, product_id).then((data) => {
        if (data?.product) {
          setProduct(data.product)
        } else {
          console.log("Error: retrieving product details")
        }
      })
    }
  }, [product_id]) 


  return (
    <main className="flex min-h-screen bg-gray-500 items-center justify-center">
      <div className='flex self-start flex-col border border-black items-left justify-left flex-col z-10 w-40 bg-gray-500 font-mono text-sm'>
            <button className="bg-yellow-500 border-2 border-gray-500 h-32 px-4 text-white hover:bg-yellow-700" 
                onClick={(e) => {
                    e.preventDefault(); 
                    handleLogOutButtonClick()}}
                    >Log Out
            </button>
            <a className="flex bg-yellow-500 items-center border-2 border-gray-500 justify-center h-32 px-4 text-white hover:bg-yellow-700" 
                href={`/HomePage?customer_id=${customer_id}`}>
                Home Page
            </a>
            <a className="flex bg-yellow-500 items-center border-2 border-gray-500 justify-center h-32 px-4 text-white hover:bg-yellow-700" 
                href={`/ShoppingCart?customer_id=${customer_id}`}>
                Shopping Cart
            </a>
      </div>
      <div className="flex border border-black items-center bg-white justify-center w-full flex-col z-10 font-mono text-sm">
      <div className='flex h-screen'>
        <div className="flex items-center justify-center flex-col z-10 w-1/2 font-mono text-sm">
          <img src={product?.image_path}className="w-72 h-100" alt="product_img" />
        </div>
        <div className='flex items-left font-bold mt-56 h-fit flex-col  z-10 w-1/2 font-mono text-sm'>
          <div className="border border-black p-6 rounded">
            <h1 className='text-black'>Product ID: {product?.product_id}</h1>
            <h2 className='text-black mt-4'>{product?.name}</h2>
            <h3 className='mt-2 text-black'>Price: {product?.price} </h3>
            <div className="flex items-center justify-between">
              <h3 className="mt-2 text-black">Rating: {product?.rating} Stars</h3>
              <button 
                className="bg-yellow-500 rounded p-2 text-white hover:bg-yellow-700 border-2 border-yellow-600 shadow-lg"
                onClick={((e) => {
                  e.preventDefault();
                  addToCart(e, customer_id, product_id, access_token)
                })}
                >
                Add to cart
              </button>
            </div>
          </div>
        </div>
    </div>
    </div>
    </main>
  );
}