import mysql.connector
from mysql.connector import pooling

# Replaced cnx w/ the Connection Pooling 
# Massive memory issues if not implimented like this
connection_pool = pooling.MySQLConnectionPool(
    pool_name="amazon_mkt_place",
    pool_size=5,  
    pool_reset_session=True,
    user='root',       # Replace with your MySQL username
    password='Msq070489',   # Replace with your MySQL password
    host='localhost',           # Replace with your MySQL server address
    database='amazon_marketplace'    # Replace with your database name
)
    
# funcition that allows working funcitons to connect to msql db
# optimizes memory and cleans up instances of cursor that 
# may have been left unchecked
def get_connection_from_pool():
    try:
        connection = connection_pool.get_connection()
        print("Connection acquired from pool.")
        return connection
    except pooling.PoolError as err:
        print(f"Error acquiring connection from pool: {err}")
        return None

# Query 1: Select customer information and their shopping cart details
def getShoppingCart(customer_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query1 = (
                "SELECT customer_id, product_id, num_of_prod_in_cart "
                "FROM customer_account NATURAL JOIN shopping_cart "
                "WHERE customer_id = %s"
            )
            cursor.execute(query1, (customer_id,))
            results = cursor.fetchall()
            print("Query 1 Results:")
            if not results:
                print(f"No data found for customer_id {customer_id}.")
            else:
                customer_cart = []
                for (customer_id, product_id, num_of_prod_in_cart) in results:
                    print(f"Customer ID: {customer_id}, Product ID: {product_id}, Number of Products: {num_of_prod_in_cart}")
                    cart_item = {
                        "customer_id":customer_id,
                        "product_id":product_id,
                        "num_of_prod_in_cart": num_of_prod_in_cart
                    }
                    customer_cart.append(cart_item)
                return customer_cart

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")

    
# Query 3: Calculate total cost for each customer based on their cart contents     
def getShoppingCartTotal(customer_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query3 = (
                "SELECT customer_id, SUM(price * num_of_prod_in_cart) AS total_cost "
                "FROM shopping_cart NATURAL JOIN product "
                "WHERE customer_id = %s "
                "GROUP BY customer_id "
            )
            cursor.execute(query3, (customer_id,))
            results = cursor.fetchall()
            if not results:
                print(f"No data found for customer_id {customer_id}.")
            else:
                print("\nQuery 3 Results:")
                for (customer_id, total_cost) in results:
                    print(f"Customer ID: {customer_id}, Total Cost: {total_cost}")
                    return total_cost

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")


# query 6 increments products in the cart that already exist in the cart 
def addExistingProductToCart(customer_id, product_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query6 = (
                "UPDATE shopping_cart "
                "SET num_of_prod_in_cart =  num_of_prod_in_cart + 1 "
                "WHERE customer_id = %s AND product_id = %s "
            )

            cursor.execute(query6, (customer_id,product_id))
            connection.commit()  # Commit changes for the update query
            print(f"Product ID: {product_id} Added to Customer ID: {customer_id}")

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")


# Query 7 add products to cart that don't currently exist in cart 
def addNewProductToCart(customer_id, product_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query7 = (
                "INSERT INTO shopping_cart VALUES(%s, %s, '1') "
            )
            cursor.execute(query7, (customer_id,product_id))
            connection.commit()  # Commit changes for the update query
            print(f"Product ID: {product_id} Added to Customer ID: {customer_id}")


    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")
    

# Query 8 remove products from cart
def removeProductFromCart(customer_id, product_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query7 = (
                "DELETE FROM shopping_cart "
                "WHERE customer_id = %s AND product_id = %s "
            )
            cursor.execute(query7, (customer_id,product_id))
            connection.commit()  # Commit changes for the update query
            print(f"Product ID: {product_id} Removed from Customer ID: {customer_id}")


    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")


# Query 9 deciment product count from cart
def decrimentProductCountFromCart(customer_id, product_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query6 = (
                "UPDATE shopping_cart "
                "SET num_of_prod_in_cart =  num_of_prod_in_cart - 1 "
                "WHERE customer_id = %s AND product_id = %s "
            )

            cursor.execute(query6, (customer_id,product_id))
            connection.commit()  # Commit changes for the update query
            print(f"Product ID: {product_id} Decrimented to Customer ID: {customer_id}")


    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")
    

def processCheckOut(customer_id):
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query7 = (
                    "DELETE FROM shopping_cart "
                    "WHERE customer_id = %s "
                )
            cursor.execute(query7, (customer_id,))
            connection.commit()  # Commit changes for the update query
            print(f"Customer Checked Out All Products Removed from Customer ID: {customer_id}")


    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")
    

# Query 10 get all products on the website
def getAllProducts():
    # Create a cursor object to interact with the database
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query8 = (
                "SELECT * "
                "FROM PRODUCT"
            )
            cursor.execute(query8)
            results = cursor.fetchall()
            products = []
            for (product_id, name, seller_id, price, rating) in results:
                product = {
                    "product_id": product_id,
                    "name": name,
                    "image_path": '',
                    "price": price,
                    "rating": rating
                }
                products.append(product)
                print(f"Product ID: {product_id}, Name: {name}, Seller ID: {seller_id}, Price: {price}, Rating:{rating}")
            return products

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")
    
# Query 11 get product details
def getProductDetails(product_id):
    connection = get_connection_from_pool()
    if connection is None:
        print("Failed to get a connection from the pool.")
        return None

    try:
        with connection.cursor(buffered=True) as cursor:
            query = (
                "SELECT * "
                "FROM product "
                "WHERE product_id = %s"
            )
            cursor.execute(query, (product_id,))
            result = cursor.fetchone()

            if result:
                product_id, name, seller_id, price, rating = result
                product = {
                    "product_id": product_id,
                    "name": name,
                    "image_path": '',
                    "price": price,
                    "rating": rating
                }
                print(f"Product details fetched: {product}")
                return product
            else:
                print("No product found.")
                return None

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        connection.close()  # Return the connection to the pool
        print("Connection returned to pool.")
    