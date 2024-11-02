'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

// custom imports 
import getProductDetails from '../../components/getProductDetails';
import addToCart from '../../components/addToCart';

interface updatePageProps {
  params: {
    customer_id: string,
    product_id: string
  }
}


interface Product {
  product_id: string,
  name: string,
  image_path: string,
  price: number,
  rating: number
}


export default function ProductPage({ params }: updatePageProps) {
  const { customer_id, product_id } = params;
  const [product, setProduct] = useState<Product | undefined>(undefined) 
  const router = useRouter()
  const access_token : string = Cookies.get('access_token') ?? ""



  const handleLogOutButtonClick = () => {
    router.push(`/`);
  };

  useEffect(() => {
    if (product === undefined) {
      const parsed_product_id = parseInt(product_id, 10);
      getProductDetails(access_token, parsed_product_id).then((data) => {
        if (data) {
          setProduct(data.product)
        } else {
          //router.push(`/`)
        }
      })
    }
  }, [product_id]) 

  
/*
  const demoProducts: Product[] = [
    {
        product_id: '1',
        name: 'Amazon Brand - Happy Belly Purified Water, Plastic Bottles, 16.91 fl oz (Pack of 24)',
        image_path: '/water_case.jpg',
        price: 12.99,
        rating: 3
      },
    {
        product_id: '2',
        name: 'JOLLY RANCHER Assorted Fruit Flavored Hard Candy Bulk Bag, 5 lb',
        image_path: '/candy.jpg',
        price: 9.99,
        rating: 5
    },
    {
        product_id: '3',
        name: 'Starbucks Ground Coffee, Dark Roast Coffee, Espresso Roast, 100% Arabica, 1 bag (28 oz)',
        image_path: '/coffee.jpg',
        price: 14.99,
        rating: 2
    },
    {
        product_id: '4',
        name: "MRS. MEYER'S CLEAN DAY Liquid Hand Soap Variety, 12.5 Ounce (Variety Pack 6 ct)",
        image_path: '/handsoap.jpg',
        price: 21.99,
        rating: 4
    },
    {
        product_id: '5',
        name: 'SHARPIE Permanent Markers, Quick Drying And Fade Resistant Fine Tip Marker Set For Wood, Plastic Paper, Metal, And More',
        image_path: '/sharpie.jpg',
        price: 15.99,
        rating: 3
    },
    {
        product_id: '6',
        name: 'Oral-B Pro Health CrossAction All in One Soft Toothbrushes, Deep Plaque Fighter',
        image_path: '/toothbrush.jpg',
        price: 16.99,
        rating: 5
    },
  ];
  */

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
                href={`/HomePage/${customer_id}`}>
                Home Page
            </a>
            <a className="flex bg-yellow-500 items-center border-2 border-gray-500 justify-center h-32 px-4 text-white hover:bg-yellow-700" 
                href={`/ShoppingCart/${customer_id}`}>
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