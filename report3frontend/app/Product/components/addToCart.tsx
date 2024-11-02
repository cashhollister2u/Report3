import { FormEvent } from "react";

// Custom imports
import { ADD_TO_CART } from '@/flaskEndpoints';
  

const addToCart = async (e: FormEvent, customer_id:string, product_id:string, access_token:string) => {
  e.preventDefault()
    try {
      const response = await fetch(ADD_TO_CART, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${access_token}`
        },
        body : JSON.stringify({"customer_id":customer_id, "product_id":product_id})
      })
      if (response.ok) {
        // add data type
        const data = await response.json()
        //console.log(data.message)
        window.location.reload()
      } else {
        console.log('failed to add product to cart: ', response.status)
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  };
  
  export default addToCart;