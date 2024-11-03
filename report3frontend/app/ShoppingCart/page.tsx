'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Cookies from 'js-cookie';

//custom imports 
import { IMAGE_PATHS } from '@/imagePaths';
import getShoppingCart from './components/getShoppingCar';
import removeProduct from './components/removeProduct';
import checkOut from './components/checkOut';

import { CartItem, Cart } from '@/types';

export default function ShoppingCart() {
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id") || "";
  const [products, setProducts] = useState<CartItem[] | undefined>([]) 
  const [total, setTotal] = useState<number>(0) 
  const router = useRouter()
  const access_token : string = Cookies.get('access_token') ?? ""

  const handleLogOutButtonClick = () => {
    router.push(`/`);
  };

  useEffect(() => {
    if (products?.length === 0) {
      getShoppingCart(access_token, customer_id).then((data:Cart) => {
        console.log('Fetched data:', data); // Debugging step
        const cart_items:CartItem[] = data.shopping_cart
        cart_items?.forEach((product:CartItem) => {
            const prod_id = parseInt(product.product_id, 10);
            product.image_path = IMAGE_PATHS[prod_id - 1];
        });
        setProducts(data?.shopping_cart);
        setTotal(data.total)
        
      }).catch(error => {
        console.error('Error fetching products:', error);
      });
  }
  }, []) 

console.log(products)
  return (
    <main className="flex bg-white min-h-screen ">
        <div className='flex flex-col border border-black items-left justify-left flex-col z-10 w-40 bg-gray-600 font-mono text-sm'>
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
        <div className="flex border border-black items-center justify-center w-full flex-col z-10 font-mono text-sm">
            <img src="/amazon_logo.png" alt="Amazon Logo"/>
            <h1 className='text-black font-bold text-2xl'>Shopping Cart</h1>
            <div className='w-3/5 mt-6 text-black font-bold text-xl'>
                <h2 className='mt-2'>Products</h2>
            </div>
            <form className="mt-10 border-2 rounded items-center justify-center border-gray-500 text-black w-2/3 mt-10 overflow-auto" >
                {products && products.map((product, index) => (
                <div key={index} className='flex flex-row self-start border border-black w-full justify-between w-full p-6 space-y-2 z-50'>
                    <Link href={`/Product?customer_id=${customer_id}&product_id=${product.product_id}`} passHref>
                        <img src={product.image_path} alt="product_image" className="cursor-pointer w-36 h-36" />
                    </Link>
                    <div className='flex flex-col w-60'>
                        <label>{index + 1}. {product.name}</label>
                        <label>Price: {product.price}</label>
                        <label>Quantity: {product.num_of_prod_in_cart}</label>
                        <button 
                          className='bg-yellow-500 mt-10 rounded px-4 py-1 w-2/3 text-white hover:bg-yellow-700 font-bold text-lg border border-black'
                          onClick={(e) => {
                            e.preventDefault;
                            removeProduct(e, customer_id, parseInt(product.product_id, 10), access_token);
                          }}
                          >
                          Remove
                        </button>
                    </div>
                </div>
                ))}
            </form>
            <div className='flex flex-row items-center justify-center justify-between w-3/5 p-2 z-50'>
                <label className='text-black font-bold text-2xl border-2 border-black p-1'>Total: {total}</label>
                <button 
                  className='bg-yellow-500 rounded px-4 py-1 text-white hover:bg-yellow-700 font-bold text-2xl border border-black'
                  onClick={(e) => {
                    e.preventDefault;
                    checkOut(e, customer_id, access_token)
                  }}
                  >
                  Check Out
                </button>
            </div>
            <div className='mt-24'>
                text
            </div>
        </div>
    </main>
  );
}