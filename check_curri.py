import pymysql

courses = [
    "생성형 AI융합서비스 개발자과정",
    "엣지 AI기반 헬스케어 서비스 개발자과정",
    "(EST)오르미 프론트엔드 개발과정",
    "(EST)AI기획과정 (온라인)",
    "(EST) AI휴먼과정",
    "언어지능기반 분석서비스 개발자과정",
    "데이터와 AI융합 미디어 혁신 과정빅데이터",
    "AI활용 헬스케어 서비스 개발자과정",
    "LG전자 DX School",
    "생성형 AI 융합서비스 개발자 양성과정",
    "(EST)AI백엔드과정",
    "(EST)AI모델과정"
]

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
        for c in courses:
            cursor.execute("SELECT * FROM curriculum WHERE curri_name LIKE %s", ('%' + c.strip()[:10] + '%',))
            rows = cursor.fetchall()
            print(f"Course: {c}")
            if rows:
                for r in rows:
                    print("  ->", r)
            else:
                print("  -> Not found")
except pymysql.Error as e:
    print(f"Error: {e}")
finally:
    if 'connection' in locals():
        connection.close()
