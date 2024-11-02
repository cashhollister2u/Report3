//Custom Imports
import { SHOPPING_CART } from '@/flaskEndpoints';

interface CartItem{
    customer_id: string,
    product_id: string,
    num_of_prod_in_cart: number,
    price: number,
    image_path: string,
    name: string
  }
  
  interface Cart {
    shopping_cart: CartItem[];
    total: number;
  }

const getShoppingCart = async (access_token:string, customer_id: string, product_id: number): Promise<Cart> => {
    const nullCartItem: CartItem[] = 
        [
            {
                customer_id: '0',
                product_id: '0',
                num_of_prod_in_cart: 0,
                price: 0,
                image_path: "",
                name: "null"
            },
        ];
    const nullCart:Cart = {shopping_cart:nullCartItem, total:0}

    try {
      const response = await fetch(SHOPPING_CART, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${access_token}`
        },
        body: JSON.stringify({ "product_id": product_id, "customer_id":customer_id })
      })
      if (response.ok) {
        const data = await response.json()
        
        return data as Cart;
        
      } else {
        console.log('failed to retreive products data: ', response.status)
        return nullCart
    }
    } catch (error) {
      console.log('Error: ', error)
      return nullCart
    }
  }

  export default getShoppingCart;