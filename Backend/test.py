import mysql.connector
# Establish the database connection
cnx = mysql.connector.connect(
    user='root',       # Replace with your MySQL username
    password='Msq070489',   # Replace with your MySQL password
    host='localhost',           # Replace with your MySQL server address
    database='amazon_marketplace'    # Replace with your database name
)
# Create a cursor object to interact with the database
cursor = cnx.cursor()
try:
    # Query 1: Select customer information and their shopping cart details
    query1 = (
        "SELECT customer_id, product_id, num_of_prod_in_cart "
        "FROM customer_account NATURAL JOIN shopping_cart "
        "WHERE customer_id = %s"
    )
    customer_id = '00001'
    cursor.execute(query1, (customer_id,))
    results = cursor.fetchall()
    print("Query 1 Results:")
    if not results:
        print("No data found for customer_id '00002'.")
    else:
        for (customer_id, product_id, num_of_prod_in_cart) in results:
            print(f"Customer ID: {customer_id}, Product ID: {product_id}, Number of Products: {num_of_prod_in_cart}")
    # Query 2: Update the price of a specific product
    query2 = ("UPDATE product SET price = %s WHERE product_id = %s")
    product_id = '00001'
    new_price = 10.99
    cursor.execute(query2, (new_price, product_id))
    cnx.commit()  # Commit changes for the update query
    print("\nQuery 2: Product price updated successfully.")
    # Query 3: Calculate total cost for each customer based on their cart contents
    query3 = (
        "SELECT customer_id, SUM(price * num_of_prod_in_cart) AS total_cost "
        "FROM shopping_cart NATURAL JOIN product "
        "GROUP BY customer_id"
    )
    cursor.execute(query3)
    print("\nQuery 3 Results:")
    for (customer_id, total_cost) in cursor:
        print(f"Customer ID: {customer_id}, Total Cost: {total_cost}")
    # Query 4: Select custommer names that already have products in their cart
    query4 = (
        "SELECT name "
        "FROM customer_account "
        "WHERE customer_id IN ( "
        "SELECT customer_id "
        "FROM shopping_cart); "
    )
    cursor.execute(query4)
    print("\nQuery 4 Results:")
    print("Customers with Items in their shopping cart")
    for (name,) in cursor:
        print(f"Customer Name: {name}")
    # Query 5: Find customer ids that have more than one different products in their shoppint cart 
    query5 = (
                "SELECT C.customer_id "
                "FROM customer_account AS C "
                "WHERE EXISTS( "
                "SELECT S.customer_id "
                "FROM shopping_cart AS S "
                "WHERE S.customer_id = C.customer_id "
                "GROUP BY S.customer_id "
                "HAVING COUNT(product_id) > 1) "
            )
    cursor.execute(query5)
    print("\nQuery 5 Results:")
    result = cursor.fetchall()
    print(f"Customer ids with more than one different products in their shoppint cart: ")
    print(result)
    
except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    # Closing the cursor and database connection
    cursor.close()
    cnx.close()
