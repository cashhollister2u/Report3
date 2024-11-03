
//Custom Imports
import { AMAZON_PRODUCTS } from '@/flaskEndpoints';

interface Product {
  product_id: string,
  name: string,
  image_path: string,
  price: number,
  rating: number
}


const getProducts = async (access_token:string): Promise<Product[]> => {

    try {
      console.log('ran')
      const response = await fetch(AMAZON_PRODUCTS, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${access_token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        
        return data.products as Product[];
        
      } else {
        console.log('failed to retreive products data: ', response.status)
        return []
    }
    } catch (error) {
      console.log('Error: ', error)
      return []
    }
  }

  export default getProducts;