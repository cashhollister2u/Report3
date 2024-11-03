import { FormEvent } from "react";

// Custom imports
import { ACTIVE_CARTS }from '@/utilites/flaskEndpoints';
  

const getCustomerActiveCarts = async (e: FormEvent, setCustomerNames: (customer_names: string[]) => void) => {
  e.preventDefault()
    try {
      const response = await fetch(ACTIVE_CARTS, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        }
      })
      if (response.ok) {
        // add data type
        const data = await response.json()
        console.log(data)
        setCustomerNames(data)
      } else {
        console.log('failed to get customers w/ active carts: ', response.status)
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  };
  
  export default getCustomerActiveCarts;