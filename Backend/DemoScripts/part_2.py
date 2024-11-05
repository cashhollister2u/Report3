import mysql.connector
# Establish the database connection
cnx = mysql.connector.connect(
    user='root',       # Replace with your MySQL username
    password='Msq070489',   # Replace with your MySQL password
    host='localhost',           # Replace with your MySQL server address
    database='amazon_marketplace'    # Replace with your database name
)
# Query 2: Calculate total shopping cart cost for each customer based on their cart contents     
def getShoppingCartTotal(customer_id):
    # Create a cursor object to interact with the database
    cursor = cnx.cursor()

    try:
        with cursor:
            # query to execute the procedure
            sub_query = (
                "CALL cart_total(%s, @c_total) "
            )
            cursor.execute(sub_query, (customer_id,))
            #query to select the returned value of the procedure
            query = (
                "SELECT @c_total "
            )
            cursor.execute(query)
            results = cursor.fetchall()
            print(results)
            if not results:
                print(f"No data found for customer_id {customer_id}.")
            else:
                print("\nQuery Results:")
                for (total_cost) in results:
                    print(f"Customer ID: {customer_id}, Total Cost: {total_cost}")
                    # rounded the value in the tuple and reassigned to new tuple => parent expects tuple object
                    rounded_total_cost = (round(total_cost[0], 2),)
                    return rounded_total_cost

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        cursor.close() # close connection
        print("Connection closed.")

# Query 11 get count of rows in customer_account table
# this is used to assign customer_id on registration
def getCustomerBaseCount():
    # Create a cursor object to interact with the database
    cursor = cnx.cursor()
    try:
        with cursor:
            query = (
                "select customer_count() "
            )
            cursor.execute(query)
            result = cursor.fetchone()

            # return count of rows or number of customer accounts
            return result[0]
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        cursor.close() # close connection
        print("Connection closed.")

customer_1 = '00001'
customer_1_cart_total =getShoppingCartTotal(customer_id=customer_1)
print(f"Customer Id: {customer_1}, Total Cost Of Cart: {customer_1_cart_total[0]} ")

new_customer_id = getCustomerBaseCount() + 1
print(f"New Customer ID: {new_customer_id}")

cnx.close() # close cnx