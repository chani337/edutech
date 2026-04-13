import pymysql

try:
    connection = pymysql.connect(
        host='project-db-campus.smhrd.com',
        port=3309,
        user='project_lsh',
        password='project_lsh',
        database='project_db',
        charset='utf8mb4'
    )
    with connection.cursor() as cursor:
        try:
            cursor.execute("INSERT INTO member (mem_email, mem_name, mem_level, class_code) VALUES ('test_alumni@test.com', 'Test', '일반', 'ALUMNI')")
            connection.commit()
            print("Insertion successful! No strict FK constraint on class_code.")
            cursor.execute("DELETE FROM member WHERE mem_email = 'test_alumni@test.com'")
            connection.commit()
        except pymysql.Error as e:
            print("FK Error:", e)

except pymysql.Error as e:
    print(f"Error: {e}")
finally:
    if 'connection' in locals():
        connection.close()
