import pymysql

def data_base_connector():
    return pymysql.connect(  
        host='localhost',     
        port=3306,
        user='user', 
        password='user_password', 
        database='my_shop_db', 
        cursorclass=pymysql.cursors.DictCursor  
    )

#try:
#    connection = data_base_connector()
#    print("Подключение успешно установлено!")
#
#    with connection.cursor() as cursor:
#        cursor.execute("SELECT VERSION();")
#        version = cursor.fetchone()
#        print(f"Версия базы данных: {version['VERSION()']}")
#
#except Exception as e:
#    print(f"Ошибка при подключении: {e}")
#
#finally:
#    if 'connection' in locals() and connection.open:
#        connection.close()
#        print("Соединение закрыто.")
