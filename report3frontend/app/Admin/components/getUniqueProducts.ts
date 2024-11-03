import { FormEvent } from "react";

// Custom imports
import { UNIQUE_CART_ITEMS }from '@/flaskEndpoints';
  

const getUniqueProducts = async (e: FormEvent) => {
  e.preventDefault()
    try {
      const response = await fetch(UNIQUE_CART_ITEMS, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        }
      })
      if (response.ok) {
        // add data type
        const data = await response.json()
        console.log(data)
      } else {
        console.log('failed to get customers w/ unique items in cart: ', response.status)
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  };
  
  export default getUniqueProducts;