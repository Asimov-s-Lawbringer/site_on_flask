from flask import Flask, jsonify, request
from flask_cors import CORS

from db import data_base_connector

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) 

def fetch_all_products():
    connection = data_base_connector()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Product")
            return cursor.fetchall()
    finally:
        connection.close()

#def fetch_products_info():
#    connection = data_base_connector()
#    try:
#        with connection.cursor() as cursor:
#            cursor.execute("SELECT title,price,quantity FROM products p join Warehouse w ON p.id =w.product_id")
#            return cursor.fetchall()    
#    finally:
#        connection.close()


def create_user(connection,name,lastname,middlename,phone_number,location):
    #try:
    with connection.cursor() as cursor:
        sql = """INSERT INTO Users (name, lastname, middlename, phone_number, location) 
            VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(sql, (name, lastname, middlename, phone_number, location))
        
        #connection.commit()
        return cursor.lastrowid 
    #finally:
        #connection.close()

def create_order(connection,user_id):
    #connection = data_base_connector()
    #try:
    with connection.cursor() as cursor:
        sql = """INSERT INTO Orders (user_id,status) 
            VALUES (%s, %s)"""
        cursor.execute(sql, (user_id,'pending'))
        
        #connection.commit()
    return cursor.lastrowid 
    #finally:
        #connection.close()

def create_order_items(connection,order_id,items):
    #connection = data_base_connector()
    #try:
    with connection.cursor() as cursor:
        for item in items: #c 57 по 64 считаем цену безопасно из Product,юзеру не верим.
            cursor.execute(
                "SELECT price FROM Product WHERE id=%s",
                (item["product_id"],)
            )
            if product:
                product = cursor.fetchone()
                price = product["price"]
                                    #тут ещё можно по идее join сделать для красоты...
                sql = """INSERT INTO Order_Items (order_id,product_id,quantity,price) 
                VALUES (%s, %s,%s, %s)"""
                cursor.execute(sql,(order_id,item["product_id"],item["quantity"],price))
        #connection.commit()
    #finally:
        #connection.close()

def create_whole_transaction(data):
    connection = data_base_connector()

    try:
        user = data["user"] #объект юзера
        items = data["items"] #объект всего купленного из корзины
        #получаю здесь айдишку конкретного заказчика
        user_id = create_user(
            connection,
            user["name"],
            user["lastname"],
            user.get("middlename"),#отчество есть не у всех так что спрошу мягко..
            user["phone_number"],
            user["location"]
            )
    
        order_id = create_order(connection,user_id) #теперь здесь получаем конкретный заказ
        create_order_items(connection,order_id,items) #берем все заказанные вещи и создаем чек

        connection.commit()

        return {
            "order_id": order_id,
            "status": 'pending'
        } #чтобы сделать на фронте "заказ №43 в обработке"
    finally:
        connection.close()

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
    
@app.route("/api/orders", methods=["POST"])
def create_order_route():
    data = request.json
    
    result = create_whole_transaction(data)
    
    return jsonify(result), 201


#@app.route('/api/products_info',methods=['GET'])
#def get_products_info():
    #try:
        #products_info
        #return jsonify(products), 200
    #except Exception as error:
        #return jsonify({"error": str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5000)
