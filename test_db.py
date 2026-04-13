import pymysql

# Connect to the database
try:
    connection = pymysql.connect(
        host='project-db-campus.smhrd.com',
        port=3309,
        user='project_lsh',
        password='project_lsh',
        database='project_db',
        charset='utf8mb4',
        connect_timeout=10
    )

    try:
        with connection.cursor() as cursor:
            print("--- curriculum ---")
            cursor.execute("SELECT * FROM curriculum LIMIT 10")
            for row in cursor.fetchall():
                print(row)
                
            print("--- class_ ---")
            cursor.execute("SELECT * FROM class_ ORDER BY class_start DESC LIMIT 10")
            for row in cursor.fetchall():
                print(row)
    finally:
        connection.close()

except pymysql.Error as e:
    print(f"Error connecting to MySQL Platform: {e}")
