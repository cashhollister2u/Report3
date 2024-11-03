export interface CartItem{
  customer_id: string,
  product_id: string,
  num_of_prod_in_cart: number,
  price: number,
  image_path: string,
  name: string
}

export interface Cart {
  shopping_cart: CartItem[];
  total: number;
}

export interface Product {
  product_id: string,
  name: string,
  image_path: string,
  price: number,
  rating:number
}