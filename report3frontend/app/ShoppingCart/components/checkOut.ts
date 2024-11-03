import { FormEvent } from "react";

// Custom imports
import { CHECK_OUT } from '@/utilites/flaskEndpoints';
  

const checkOut = async (e: FormEvent, customer_id:string, access_token:string) => {
  e.preventDefault()
    try {
      const response = await fetch(CHECK_OUT, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${access_token}`
        },
        body : JSON.stringify({"customer_id":customer_id})
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

  export default checkOut;