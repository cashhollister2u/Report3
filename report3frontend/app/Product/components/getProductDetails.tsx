
//Custom Imports
import { PRODUCT_DETAILS } from '@/flaskEndpoints';

interface Product {
  product_id: string,
  name: string,
  image_path: string,
  price: number,
  rating: number
}

interface Response {
  product: Product
}


const getProductDetails = async (access_token:string, product_id: number) => {

    try {
      const response = await fetch(PRODUCT_DETAILS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ "product_id": product_id })
      });
      if (response.ok) {
        const data: Response = await response.json()
        console.log(data)
        return data;
        
      } else {
        console.log('failed to retreive product data: ', response.status)
        return undefined
    }
    } catch (error) {
      console.log('Error: ', error)
      return undefined
    }
  }

  export default getProductDetails;