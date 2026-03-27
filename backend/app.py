from flask import Flask, jsonify, request
from flask_cors import CORS

from db import data_base_connector

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) 

def fetch_all_products():
    connection = data_base_connector()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM products")
            return cursor.fetchall()
    finally:
        connection.close()

def fetch_products_info():
    connection = data_base_connector()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT title,price,quantity FROM products p join Warehouse w ON p.id =w.product_id")
            return cursor.fetchall()    
    finally:
        connection.close()


def create_user(name,lastname,middlename,phone_number,location):
    connection = data_base_connector()
    try:
        with connection.cursor() as cursor:
            sql = """INSERT INTO Users (name, lastname, middlename, phone_number, location) 
                VALUES (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (name, lastname, middlename, phone_number, location))
        
        connection.commit()
        return True
    finally:
        connection.close()
#print(products)



@app.route('/')
def index():
    return "I`m ready to go!"

@app.route('/api/products',methods=['GET'])
def get_products():
    try:
        products = fetch_all_products()
        return jsonify(products), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500
    
#@app.route('/api/products_info',methods=['GET'])
#def get_products_info():
    #try:
        #products_info
        #return jsonify(products), 200
    #except Exception as error:
        #return jsonify({"error": str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5000)
