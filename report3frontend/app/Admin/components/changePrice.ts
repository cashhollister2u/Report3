import { FormEvent } from "react";

// Custom imports
import { UPDATE_PRICE }from '@/flaskEndpoints';
  

const changePrice = async (e: FormEvent, product_id:string, new_price:string, setPriceMessage: (message: string) => void) => {
  e.preventDefault()
    try {
      const response = await fetch(UPDATE_PRICE, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({"product_id":product_id, "new_price":new_price})
      })
      if (response.ok) {
        // add data type
        const data = await response.json()
        setPriceMessage(data.message)
        console.log(data.message)
      } else {
        console.log('failed to change price: ', response.status)
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  };
  
  export default changePrice;