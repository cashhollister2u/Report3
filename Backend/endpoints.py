from Auth import creds
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Custom imports
from extensions import bcrypt
from sql_commands import processCheckOut, decrimentProductCountFromCart, removeProductFromCart, getProductDetails, getAllProducts, getShoppingCart, getShoppingCartTotal, addExistingProductToCart, addNewProductToCart

user_bp = Blueprint('user', __name__)


# handle user registration
@user_bp.route('/register', methods=['POST'])
def register():
    global demo_users #REPLACE

    data = request.get_json()
    # get the data passed 
    email = data['email']
    passwd = data['passwd']
    name = data['name']
    address = data['name']
    credit_card_num = data['credit_card_num']

    # check if Customer Account exists in db already
    #
    #
    ################################################

    # REPLACE w/ above SQL query ########################
    newUser = True # no Customer Account until proven false
    for user in demo_users:
        if user['email'] == email:
            newUser = False
    ######################################################

    # return 400 if account exists 
    if not newUser:
        response = {
            'message': 'Email already registered.',
        }
        return response, 400
    else:
        # Hash passwd
        password = passwd
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # add Customer Account to db########
        #
        #
        ####################################

        # REPLACE w/ above SQL query ########################
        new_customer_accoount = {
            "customer_id" : len(demo_users),
            "email" : email,
            "name" : name,
            "passwd" : hashed_password,
            "address" : address,
            "credit_card_num" : credit_card_num
        }
        demo_users.append(new_customer_accoount) # sim add to db
        print("new user" , demo_users)
        ######################################################

        # send confirmation message back to user 
        response = {
            'message': 'Customer Account Created',
        }
        return jsonify(response), 201
    
    
# handle user login
@user_bp.route('/login', methods=['POST'])
def login():
    global demo_users #REPLACE

    data = request.get_json()
    # get the data passed 
    email = data['email']
    passwd = data['passwd']

    # Try to retrieve customer account from db ####
    #
    #
    ################################################

    # REPLACE w/ above SQL query ########################
    print(demo_users)
    for user in demo_users:
        if user['email'] == email:
            if user and bcrypt.check_password_hash(user['passwd'], passwd):
                return jsonify(access_token="dummy token", customer_id=user['customer_id']), 200
    
    return jsonify({"message":"Invalid credentials"}), 401
    ######################################################

# handle retrieving Home Page products
@user_bp.route('/products', methods=['POST'])
def products():
    # sql query to retrieve all products on website 
    products = getAllProducts()
    print(products)
    return jsonify({"products":products}), 201

# handle retrieving product info
@user_bp.route('/product_info', methods=['POST'])
def productInfo():
    data = request.get_json()
    product_id = data['product_id']
    # Retrieve demo product info from db ####
    product_details = getProductDetails(product_id=product_id)

    # REPLACE w/ actual product details 
    return jsonify({"product":product_details}), 201

# handle retrieving Customer Account Shopping Cart
@user_bp.route('/cart', methods=['POST'])
def cart():
    data = request.get_json()
    # call sql database for user shopping cart
    account_specific_shopping_cart = getShoppingCart(customer_id=data['customer_id'])

    # Calculate Shopping Cart Total ####
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

    #check if product in cart
    product_in_cart = False
    for curr_product in account_specific_shopping_cart:
        if curr_product['product_id'] == product_id:
            product_in_cart = True
            #Update the sql db for incremented product in cart
            addExistingProductToCart(customer_id=customer_id, product_id=product_id)
            break
    
    if not product_in_cart:
        addNewProductToCart(customer_id=customer_id,product_id=product_id)

    return jsonify({"message":"Product Added"}), 200

# remove item from Shopping Cart
@user_bp.route('/remove_from_cart', methods=['POST'])
def removeFromCart():
    data = request.get_json()
    customer_id = data['customer_id']
    product_id = data['product_id']
    account_specific_shopping_cart = getShoppingCart(customer_id=data['customer_id'])

    # sql query to remove individual items from cart
    for product in account_specific_shopping_cart:
        print('1')
        if int(product['product_id']) == product_id:
            print('2')
            if product['num_of_prod_in_cart'] > 1:
                print('3')
                decrimentProductCountFromCart(customer_id=customer_id,product_id=product_id)
            else:
                print('4')
                removeProductFromCart(customer_id=customer_id,product_id=product_id)
                break


    return jsonify({"message":"Product Removed"}), 200

# handle Customer Account Shopping Cart check out
@user_bp.route('/check_out', methods=['POST'])
def checkOut():
    data = request.get_json()
    customer_id = data['customer_id']
    account_specific_shopping_cart = getShoppingCart(customer_id=customer_id)
    
    #sql query to simulate customer check out
    processCheckOut(customer_id=customer_id)

    if not account_specific_shopping_cart:
        return jsonify({"message": "Cart is already empty or undefined"}), 400
    
    return jsonify({"message":"Customer Checked Out"}), 200