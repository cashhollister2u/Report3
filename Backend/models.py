from extensions import db

# sql tables (classes)
class CustomerAccount(db.Model):
    __tablename__ = 'customer_account'
    customer_id = db.Column(db.String(5), primary_key=True)
    email = db.Column(db.String(35), unique=True, nullable=False)
    name = db.Column(db.String(25), unique=False, nullable=False)
    passwd = db.Column(db.String(150), nullable=False)
    address = db.Column(db.String(30), unique=False, nullable=False)
    credit_card_num = db.Column(db.Numeric(16, 0), nullable=False)

    shopping_cart = db.relationship('ShoppingCart', back_populates = 'customer')
    
    def __repr__(self):
        return f"('{self.customer_id}'), Customer('{self.name}', '{self.email}')"
    
class SellerAccount(db.Model):
    __tablename__ = 'seller_account'
    seller_id = db.Column(db.String(5), primary_key=True)
    email = db.Column(db.String(35), unique=True, nullable=False)
    name = db.Column(db.String(25), unique=False, nullable=False)
    passwd = db.Column(db.String(150), nullable=False)
    address = db.Column(db.String(30), unique=False, nullable=False)
    account_number = db.Column(db.Numeric(12, 0), nullable=False)
    routing_number = db.Column(db.Numeric(9, 0), nullable=False)
    
    def __repr__(self):
        return f"('{self.seller_id}'), Seller('{self.name}', '{self.email}')"

class Product(db.Model):
    __tablename__ = 'product'
    product_id = db.Column(db.String(5), primary_key=True)
    name = db.Column(db.String(15), unique=False, nullable=False)
    seller_id = db.Column(db.String(5), db.ForeignKey('seller_account.seller_id'), nullable=False)
    price = db.Column(db.Numeric(8, 2), nullable=False)
    rating = db.Column(db.Numeric(1, 0), nullable=False)

    def __repr__(self):
        return f"('{self.product_id}'), Product('{self.name}')"
    
class ShoppingCart(db.Model):
    __tablename__ = 'shopping_cart'
    customer_id = db.Column(db.String(5), db.ForeignKey('customer_account.customer_id'), nullable=False)
    product_id = db.Column(db.String(5), db.ForeignKey('product.product_id'), nullable=False)
    num_of_prod_in_cart = db.Column(db.Numeric(1, 0), nullable=False)

    def __repr__(self):
        return f"('{self.customer_id}'), ShoppingCart('{self.num_of_prod_in_cart}')"