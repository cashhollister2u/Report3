from Auth import creds
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Custom imports
from extensions import db, bcrypt

user_bp = Blueprint('user', __name__)


demo_products = [
    {
        "product_id": '1',
        "name": 'Amazon Brand - Happy Belly Purified Water, Plastic Bottles, 16.91 fl oz (Pack of 24)',
        "image_path": '/water_case.jpg',
        "price": 12.99,
        "rating": 3
      },
    {
        "product_id": '2',
        "name": 'JOLLY RANCHER Assorted Fruit Flavored Hard Candy Bulk Bag, 5 lb',
        "image_path": '/candy.jpg',
        "price": 9.99,
        "rating": 5
    },
    {
        "product_id": '3',
        "name": 'Starbucks Ground Coffee, Dark Roast Coffee, Espresso Roast, 100% Arabica, 1 bag (28 oz)',
        "image_path": '/coffee.jpg',
        "price": 14.99,
        "rating": 2
    },
    {
        "product_id": '4',
        "name": "MRS. MEYER'S CLEAN DAY Liquid Hand Soap Variety, 12.5 Ounce (Variety Pack 6 ct)",
        "image_path": '/handsoap.jpg',
        "price": 21.99,
        "rating": 4
    },
    {
        "product_id": '5',
        "name": 'SHARPIE Permanent Markers, Quick Drying And Fade Resistant Fine Tip Marker Set For Wood, Plastic Paper, Metal, And More',
        "image_path": '/sharpie.jpg',
        "price": 15.99,
        "rating": 3
    },
    {
        "product_id": '6',
        "name": 'Oral-B Pro Health CrossAction All in One Soft Toothbrushes, Deep Plaque Fighter',
        "image_path": '/toothbrush.jpg',
        "price": 16.99,
        "rating": 5
    }
]

demo_users = [
 
]
'''
    {
        "customer_id" : "1",
        "email" : "user1@gmail.com",
        "name" : "user1",
        "passwd" : "test12345",
        "address" : "123 St lane",
        "credit_card_num" : 1234567890123456
    },
'''
demo_user1_cart = [
    {
        "customer_id" : "1",
        "product_id" : "4",
        "num_of_prod_in_cart" : 3
    },
    {
        "customer_id" : "1",
        "product_id" : "3",
        "num_of_prod_in_cart" : 3
    },
    {
        "customer_id" : "1",
        "product_id" : "2",
        "num_of_prod_in_cart" : 3
    },
]

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
    global demo_products #REPLACE

    # Retrieve demo products from db ####
    #
    # demo_products = 
    ################################################
    
    return jsonify({"products":demo_products}), 201

# handle retrieving product info
@user_bp.route('/product_info', methods=['POST'])
def productInfo():
    global demo_products #REPLACE
    
    data = request.get_json()
    product_id = data['product_id']
    # Retrieve demo product info from db ####
    #
    # demo_product = 
    ################################################

    # REPLACE w/ actual product details 
    return jsonify({"product":demo_products[product_id - 1]}), 201

# handle retrieving Customer Account Shopping Cart
@user_bp.route('/cart', methods=['POST'])
def cart():
    global demo_user1_cart # REPLACE
    account_specific_shopping_cart = demo_user1_cart # REPLACE

    # Retrieve Customer Account Shopping Cart ####
    #
    # demo_user1_cart = 
    ################################################

    # Calculate Shopping Cart Total ####
    #
    # demo_user1_cart = 
    ################################################

    # REPLACE w/ actual sql query above
    total = 0
    for product in account_specific_shopping_cart:
        tmp_product_id = int(product['product_id'])
        product_details = demo_products[tmp_product_id - 1]
        product['name'] = product_details['name']
        product['price'] = product_details['price']
        product['image_path'] = ""
        total += float(product_details['price']) * int(product['num_of_prod_in_cart'])
        
    return jsonify({"shopping_cart": account_specific_shopping_cart, "total": total}), 201

# add item to Shopping Cart
@user_bp.route('/add_to_cart', methods=['POST'])
def addTOCart():
    global demo_user1_cart # REPLACE
    account_specific_shopping_cart = demo_user1_cart # REPLACE

    data = request.get_json()
    customer_id = data['customer_id']
    product_id = data['product_id']

    added_product = {
            "customer_id" : customer_id,
            "product_id" : product_id,
            "num_of_prod_in_cart" : 1
    }

    # Add to Customer Account Shopping Cart ####
    #
    # demo_user1_cart = 
    ################################################

    # REPLACE w/ above SQL query ########################
    product_found = False
    account_specific_shopping_cart = demo_user1_cart
    for product in account_specific_shopping_cart:
        if product['product_id'] == product_id:
            product['num_of_prod_in_cart'] += 1
            product_found = True
            break

    if not product_found:
        account_specific_shopping_cart.append(added_product)


    return jsonify({"message":"Product Added"}), 200

# remove item from Shopping Cart
@user_bp.route('/remove_from_cart', methods=['POST'])
def removeFromCart():
    global demo_user1_cart # REPLACE
    account_specific_shopping_cart = demo_user1_cart # REPLACE

    data = request.get_json()
    customer_id = data['customer_id']
    product_id = data['product_id']


    # Add to Customer Account Shopping Cart ####
    #
    # account_specific_shopping_cart = 
    ################################################

    # REPLACE w/ above SQL query ########################
    for product in account_specific_shopping_cart:
        if int(product['product_id']) == product_id:
            product['num_of_prod_in_cart'] -= 1
            if product['num_of_prod_in_cart'] <= 0:
                account_specific_shopping_cart.remove(product)
                break


    return jsonify({"message":"Product Removed"}), 200

# handle Customer Account Shopping Cart check out
@user_bp.route('/check_out', methods=['POST'])
def checkOut():
    global demo_user1_cart # REPLACE
    account_specific_shopping_cart = demo_user1_cart # REPLACE
    
    # Clear Customer Account Shopping Cart ####
    #
    # account_specific_shopping_cart = 
    ################################################
    if not account_specific_shopping_cart:
        return jsonify({"message": "Cart is already empty or undefined"}), 400
    
    account_specific_shopping_cart.clear()

    return jsonify({"message":"Customer Checked Out"}), 200