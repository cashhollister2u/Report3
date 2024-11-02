'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from 'next/link';
import Cookies from 'js-cookie';

//custom imports 
import { IMAGE_PATHS } from '@/imagePaths';
import getProducts from '../components/getProducts';


interface Product {
    product_id: string,
    name: string,
    image_path: string,
    price: number,
    rating:number
}

interface updatePageProps {
    params: {
      customer_id: string,
      product_id: string
    }
  }

export default function HomePage({ params }: updatePageProps) {
    const { customer_id, product_id } = params;
  const [products, setProducts] = useState<Product[] | undefined>([]) 
  const router = useRouter()
  const access_token : string = Cookies.get('access_token') ?? ""

  const handleLogOutButtonClick = () => {
    router.push(`/`);
  };

  useEffect(() => {
    if (products?.length === 0) {
        getProducts(access_token).then((data) => {
          console.log('Fetched data:', data); // Debugging step

          if (Array.isArray(data)) {
            data.forEach((product) => {
                const prod_id = parseInt(product.product_id, 10);
                product.image_path = IMAGE_PATHS[prod_id - 1];
            });
            setProducts(data);
          } else {
            console.error('Expected an array but received:', data);
            // Optionally handle non-array data or route user away
            // router.push(`/`);
          }
        }).catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, []) 

  // add on submit
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
    <main className="flex bg-white min-h-screen ">
        <div className='flex flex-col border border-black items-left justify-left flex-col z-10 w-40 bg-gray-600 font-mono text-sm'>
            <button className="bg-yellow-500 border-2 border-gray-500 h-32 px-4 text-white hover:bg-yellow-700" 
                onClick={(e) => {
                    e.preventDefault(); 
                    handleLogOutButtonClick()}}
                    >Log Out
            </button>
            <a className="flex bg-yellow-500 items-center border-2 border-gray-500 justify-center h-32 px-4 text-white hover:bg-yellow-700" 
                href={`/HomePage/`}>
                Home Page
            </a>
            <a className="flex bg-yellow-500 items-center border-2 border-gray-500 justify-center h-32 px-4 text-white hover:bg-yellow-700" 
                href={`/ShoppingCart/${customer_id}`}>
                Shopping Cart
            </a>
        </div>
        <div className="flex border border-black items-center justify-center w-full flex-col z-10 font-mono text-sm">
            <img src="/amazon_logo.png" alt="Amazon Logo"/>
            <h1 className='text-black font-bold text-2xl'>Home Page</h1>
            <div className='self-start mt-6 ml-40 text-black font-bold text-xl'>
                <h2 className='mt-2'>Top picks for you</h2>
            </div>
            <form className="mt-20 border-2 rounded items-center justify-center border-gray-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black w-2/3 mt-10 overflow-auto" >
                {products && products.map((product:Product, index:number) => (
                <div key={index} className='flex flex-col font-bold items-center justify-center w-full p-6 space-y-2 z-50'>
                    <Link href={`/Product/${customer_id}/${product.product_id}`} passHref>
                        <img src={product.image_path} alt="product_image" className="cursor-pointer w-72 h-72" />
                    </Link>
                    <label>{index + 1}. {product.name}</label>
                    <p>Price: {product.price}</p>
                </div>
                ))}
            </form>
            <div className='mt-24'>
                text
            </div>
        </div>
    </main>
  );
}