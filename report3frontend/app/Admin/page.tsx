'use client';
import { ChangeEvent,useState } from "react";

// Custom imports
import changePrice from "./components/changePrice";
import getUniqueProducts from "./components/getUniqueProducts";

interface FormData {
    product_id: string
    new_price:number;
}

export default function Register() {
    const [priceMessage, setPriceMessage] = useState<string> ("")
    const [formData, setFormData] = useState<FormData> ({
        product_id: '',
        new_price:5.99,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name] : value })
    }

  

  return (
    <main className="flex min-h-screen bg-white items-center justify-center">
        <div className="flex border-2 border-black rounded h-screen m-4 items-center justify-center flex-col z-10 w-1/2 font-mono text-sm">
            <div className="absolute top-0 left-10">
                <img className="m-2 border-2 border-black rounded" src="amazon_logo.png" alt="Amazon Logo"/>
                <h1 className="text-black ml-16 font-bold text-2xl">Admin Page</h1>
            </div>
            <div className="flex flex-col w-4/5 mt-8 space-y-2 border border-black rounded p-6">
                <h2 className="text-lg py-2 text-black font-bold">Get Customers w/ Multiple Different Products In Shopping Car  </h2>
                <button 
                    className="bg-yellow-500 rounded px-4 mt-2 w-full p-1 text-white hover:bg-yellow-700" 
                    onClick={(e) => {
                        e.preventDefault;
                        getUniqueProducts(e)
                    }}
                    >
                    Get Customers 
                </button>
            </div>
        </div>
        <div className="flex bg-white h-screen m-10 border-2 rounded border-black items-center justify-center flex-col z-10 w-1/2 font-mono text-sm">
            <form className="flex m-10 border border-black flex-col w-4/5 mt-8 space-y-2  rounded p-6" onSubmit={(e) => changePrice(e, formData.product_id,formData.new_price, setPriceMessage)}>
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