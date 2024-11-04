'use client';
import { ChangeEvent,useState } from "react";
import { useRouter } from "next/navigation";

// Custom imports
import changePrice from "./components/changePrice";
import getUniqueProducts from "./components/getUniqueProducts";
import getCustomerActiveCarts from "./components/getCustomerAcitveCart";

interface FormData {
    product_id: string
    new_price:string
    customer_id:string
    customer_id_cart_check:string
}

export default function Register() {
    const router = useRouter();
    const [priceMessage, setPriceMessage] = useState<string> ("")
    const [multipleItemsMsg, setMultipleItemsMsg] = useState<string> ("") 
    const [activeCartMsg, setActiveCartMsg] = useState<string> ("") 
    const [formData, setFormData] = useState<FormData> ({
        product_id: '',
        new_price: '',
        customer_id: '',
        customer_id_cart_check: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name] : value })
    }

    const handleLogOutButtonClick = () => {
        router.push(`/`);
      };
  

  return (
    <main className="flex min-h-screen bg-white items-center justify-center">
        <div className="flex border-2 border-black rounded min-h-screen m-4 items-center justify-center flex-col z-10 w-1/2 font-mono text-sm">
            <div className="absolute top-0 left-10">
                <img className="m-2 border-2 border-black rounded" src="amazon_logo.png" alt="Amazon Logo"/>
                <h1 className="text-black ml-16 font-bold text-2xl">Admin Page</h1>
            <div className="flex flex-row ml-16 w-1/2 space-x-4">
                <div>
                    <div className="flex flex-col w-full  mt-8 space-y-2 border border-black rounded p-6">
                        <h2 className="text-lg py-2 text-black font-bold">Get Customers w/ Active Shopping Car  </h2>
                        <input
                            type="text"
                            name="customer_id_cart_check"
                            value={formData.customer_id_cart_check}
                            onChange={handleChange}
                            className="text-black rounded border border-black"
                            required
                        />
                        <button 
                            className="bg-yellow-500 rounded px-4 mt-2 w-full p-1 text-white hover:bg-yellow-700" 
                            onClick={(e) => {
                                e.preventDefault;
                                getCustomerActiveCarts(e, formData.customer_id_cart_check,setActiveCartMsg)
                            }}
                            >
                            Get Customers 
                        </button>
                    </div>
                    <h3 className="font-bold text-lg mt-4 text-black">Customer Names:</h3>
                    <div className='flex flex-col p-2 rounded border-2 border-black mt-4 text-black space-y-2 z-50'>
                        <p className="text-red-500 font-bold">{activeCartMsg}</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col w-full  mt-8 space-y-2 border border-black rounded p-6">
                        <h2 className="text-lg py-2 text-black font-bold">Check if Customer Id has multiple products in shopping cart  </h2>
                        <input
                            type="text"
                            name="customer_id"
                            value={formData.customer_id}
                            onChange={handleChange}
                            className="text-black rounded border border-black"
                            required
                        />
                        <button 
                            className="bg-yellow-500 rounded px-4 mt-2 w-full p-1 text-white hover:bg-yellow-700" 
                            onClick={(e) => {
                                e.preventDefault;
                                getUniqueProducts(e, formData.customer_id, setMultipleItemsMsg)
                            }}
                            >
                            Get Customers 
                        </button>
                    </div>
                    <h3 className="font-bold text-lg mt-4 text-black">Customer Ids:</h3>
                    <div className='flex flex-col p-2 rounded border-2 border-black mt-4 text-black space-y-2 z-50'>
                        <p className="text-red-500 font-bold">{multipleItemsMsg}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="flex bg-white h-screen m-10 border-2 rounded border-black items-center justify-center flex-col z-10 w-1/2 font-mono text-sm">
            <button className="bg-yellow-500 absolute top-0 right-0 m-4 rounded border-2 border-gray-500 h-24 px-4 text-white hover:bg-yellow-700" 
                onClick={(e) => {
                    e.preventDefault(); 
                    handleLogOutButtonClick()}}
                    >Log Out
            </button>
            <form className="flex m-10 border border-black flex-col w-4/5 mt-8 space-y-2  rounded p-6" onSubmit={(e) => formData.new_price && changePrice(e, formData.product_id,formData.new_price, setPriceMessage)}>
                <h2 className="text-lg py-2 text-black font-bold">Change Product Price  </h2>
                <label className="text-black">Product ID </label>
                <input
                    type="text"
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    className="text-black rounded border border-black"
                    required
                />
                <label className="text-black">New Price </label>
                <input
                    type="text"
                    name="new_price"
                    value={formData.new_price}
                    onChange={handleChange}
                    className="text-black rounded border border-black"
                    required
                />
                <div className="flex flex-col items-center justify-center">
                <input className="bg-yellow-500 rounded px-4 mt-2 w-full p-1 text-white hover:bg-yellow-700" type="submit" value="Continue" />
                </div>
            </form>
            <p className="text-red-800 font-bold">{priceMessage}</p>
        </div>
    </main>
  );
}