import datetime 
import mysql.connector 

# connect with your mysql database
# assume your database nname 'test'
cnx = mysql.connector.connect(host='localhost', user='root', password='******', database='test') 

# create cursor
cursor = cnx.cursor() 

'''
You can use your own SQL commands below
'''
query = ("SELECT * FROM cars") 

# run SQL command in mysql and
# cursor now points to the first record of results from SQL
cursor.execute(query) 

# fetch record one by one by using cursor
for data in cursor:
    print(data) 
    # print("{}, {} was hired on {:%d %b %Y}".format( last_name, first_name, hire_date))

'''
Another example
   
myresult = cursor.fetchall()
   
for x in myresult:
    print(x)
'''

# close the connection with mtsql
cursor.close()
cnx.close() 
