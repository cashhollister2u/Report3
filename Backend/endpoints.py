from flask import Blueprint, jsonify, request

# Custom imports
from extensions import bcrypt
from sql_commands import getUsersWithUniqueProducts, updateProductPrice, createCustomerAccount, getCustomerBaseCount, getCustomerAccount, processCheckOut, decrimentProductCountFromCart, removeProductFromCart, getProductDetails, getAllProducts, getShoppingCart, getShoppingCartTotal, addExistingProductToCart, addNewProductToCart

user_bp = Blueprint('user', __name__)


# handle user registration
@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # get the data passed 
    email = data['email']
    passwd = data['passwd']
    name = data['name']
    address = "12345 road lane" # hard coded no address functionality
    credit_card_num = data['credit_card_num']

    #sql query to retrieve the customer account based on email input 
    customer_account = getCustomerAccount(email=email)
    #sql query to retrieve count of total customer_accounts
    customer_id = int(getCustomerBaseCount()) + 1
    # front fill with '0's to conform to predefined structure
    customer_id = str(customer_id).zfill(5)

    # return 400 if account exists 
    if customer_account:
        response = {
            'message': 'Email already registered.',
        }
        return response, 400
    else:
        # Hash passwd
        password = passwd
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        createCustomerAccount(customer_id=customer_id, email=email, name=name, passwd=hashed_password, address=address, credit_card_num=credit_card_num)
    
        response = {
            'message': 'Customer Account Created',
        }
        return jsonify(response), 201

    
    
# handle user login
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # get the data passed 
    email = data['email']
    passwd = data['passwd']

    #sql query to retrieve the customer account based on email input 
    customer_account = getCustomerAccount(email=email)

    try:
        # check provided email w/ the email in db
        if customer_account[1] == email:
            if bcrypt.check_password_hash(customer_account[3], passwd): #check the hased passwd with the one provided by the customer
                return jsonify(access_token="dummy token", customer_id=customer_account[0]), 200 # return customer_id and dummy token
    except:
        return jsonify({"message":"Invalid credentials"}), 401


# handle retrieving Home Page products
@user_bp.route('/products', methods=['POST'])
def products():
    # sql query to retrieve all products on website 
    products = getAllProducts()
    return jsonify({"products":products}), 201


# handle retrieving product info
@user_bp.route('/product_info', methods=['POST'])
def productInfo():
    data = request.get_json()
    product_id = data['product_id']
    # SQL query to retrieve demo product info from db ####
    product_details = getProductDetails(product_id=product_id)

    return jsonify({"product":product_details}), 201


# handle retrieving Customer Account Shopping Cart
@user_bp.route('/cart', methods=['POST'])
def cart():
    data = request.get_json()
    # call sql database for user shopping cart
    account_specific_shopping_cart = getShoppingCart(customer_id=data['customer_id'])

    # sql query to calculate Shopping Cart Total 
    total = getShoppingCartTotal(customer_id=data['customer_id'])
        
    return jsonify({"shopping_cart": account_specific_shopping_cart, "total": total}), 201


# add item to Shopping Cart
@user_bp.route('/add_to_cart', methods=['POST'])
def addTOCart():
    data = request.get_json()
    customer_id = data['customer_id']
    product_id = data['product_id']
    # call sql database for user shopping cart
    account_specific_shopping_cart = getShoppingCart(customer_id=customer_id)
    try:
        #check if product in cart
        product_in_cart = False
        for curr_product in account_specific_shopping_cart:
            if curr_product['product_id'] == product_id:
                product_in_cart = True
                #sql query to update the sql db for incremented product in cart
                addExistingProductToCart(customer_id=customer_id, product_id=product_id)
                break
        
        if not product_in_cart:
            # sql query for adding new prod to cart
            addNewProductToCart(customer_id=customer_id,product_id=product_id)

        return jsonify({"message":"Product Added"}), 200
    except:
        # handle none type for account_specific_shopping_cart if user has no cart
        addNewProductToCart(customer_id=customer_id,product_id=product_id) #sql query
        return jsonify({"message":"Product Added"}), 200
    

# remove item from Shopping Cart
@user_bp.route('/remove_from_cart', methods=['POST'])
def removeFromCart():
    data = request.get_json()
    customer_id = data['customer_id']
    product_id = data['product_id']
    account_specific_shopping_cart = getShoppingCart(customer_id=data['customer_id']) #sql query

    # sql query to remove individual items from cart
    for product in account_specific_shopping_cart:
        if int(product['product_id']) == product_id:
            if product['num_of_prod_in_cart'] > 1:
                decrimentProductCountFromCart(customer_id=customer_id,product_id=product_id) #sql query decriments count by 1
            else:
                removeProductFromCart(customer_id=customer_id,product_id=product_id) #sql query removes item entirely 
                break

    return jsonify({"message":"Product Removed"}), 200

# handle Customer Account Shopping Cart check out
@user_bp.route('/check_out', methods=['POST'])
def checkOut():
    data = request.get_json()
    customer_id = data['customer_id']
    account_specific_shopping_cart = getShoppingCart(customer_id=customer_id) # sql query for retrieving customer cart
    
    #sql query to simulate customer check out
    processCheckOut(customer_id=customer_id)

    if not account_specific_shopping_cart:
        return jsonify({"message": "Cart is already empty or undefined"}), 400
    
    return jsonify({"message":"Customer Checked Out"}), 200


#### admin endpoints

# handle change of product price
@user_bp.route('/change_price', methods=['POST'])
def change_product_price():
    data = request.get_json()
    product_id = data['product_id']
    new_price = data['new_price']

    updateProductPrice(product_id=product_id, new_price=new_price) #sql query to update the price of product
    
    return jsonify({"message":f"Product ID: {product_id} New Price: {new_price}"}), 200

# handle retrieving customer ids w/ different unique products in cart
@user_bp.route('/unique_prod_cart', methods=['POST'])
def unique_prod_in_cart():
    customer_names = getUsersWithUniqueProducts() # sql query for above note 
    
    return jsonify(customer_names), 200


