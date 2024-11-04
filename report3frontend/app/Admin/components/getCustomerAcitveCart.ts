import { FormEvent } from "react";

// Custom imports
import { ACTIVE_CARTS }from '@/utilites/flaskEndpoints';
  

const getCustomerActiveCarts = async (e: FormEvent, customer_id:string,setActiveCartMsg: (message: string) => void) => {
  e.preventDefault()
    try {
      const response = await fetch(ACTIVE_CARTS, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({"customer_id":customer_id})
      })
      if (response.ok) {
        // add data type
        const data = await response.json()
        console.log(data)
        setActiveCartMsg(data)
      } else {
        console.log('failed to get customers w/ active carts: ', response.status)
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  };
  
  export default getCustomerActiveCarts;