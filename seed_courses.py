import pymysql
import datetime

# curriculum: curri_code, curri_name
curriculums = [
    ("ALUMNI", "수료생"),
    ("LG_DX", "LG전자 DX School"),
    ("EST_BE", "(EST)AI백엔드과정"),
    ("EST_MODEL", "(EST)AI모델과정"),
    ("AI_HEALTH", "AI활용 헬스케어 서비스 개발자과정"),
    ("LANG_DEV", "언어지능기반 분석서비스 개발자과정"),
]

# class_: class_code, host_code, curri_code, curri_cnt, class_start, class_end
# We set host_code arbitrarily as 'K2026' for new ones.
start_date = datetime.date(2026, 4, 1)
end_date = datetime.date(2026, 10, 1)

classes = [
    # 수료생 공통 코드
    ("ALUM_01", "ALUMNI", "ALUMNI", 1, datetime.date(2000, 1, 1), datetime.date(2000, 1, 1)),
    
    # 신규 과정 라운드들
    ("LG_DX_10", "K2026", "LG_DX", 10, start_date, end_date),
    ("LG_DX_11", "K2026", "LG_DX", 11, start_date, end_date),
    
    ("EST_BE_1", "EST", "EST_BE", 1, start_date, end_date),
    ("EST_MODEL_1", "EST", "EST_MODEL", 1, start_date, end_date),
    
    ("AI_HEALTH_2", "K2026", "AI_HEALTH", 2, start_date, end_date),
    
    ("LANG_DEV_9", "K2026", "LANG_DEV", 9, start_date, end_date),
    ("LANG_DEV_11", "K2026", "LANG_DEV", 11, start_date, end_date),
    ("LANG_DEV_12", "K2026", "LANG_DEV", 12, start_date, end_date),
]

def seed_db():
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
            # 1. Insert Curriculum
            for curri_code, curri_name in curriculums:
                cursor.execute(
                    "INSERT IGNORE INTO curriculum (curri_code, curri_name) VALUES (%s, %s)",
                    (curri_code, curri_name)
                )
            
            # 2. Insert Classes
            for class_code, host_code, curri_code, curri_cnt, c_start, c_end in classes:
                cursor.execute(
                    "INSERT IGNORE INTO class_ (class_code, host_code, curri_code, curri_cnt, class_start, class_end) VALUES (%s, %s, %s, %s, %s, %s)",
                    (class_code, host_code, curri_code, curri_cnt, c_start, c_end)
                )
            
            connection.commit()
            print("Successfully inserted new courses and rounds!")

    except pymysql.Error as e:
        print(f"Error Seed: {e}")
    finally:
        if 'connection' in locals():
            connection.close()

if __name__ == '__main__':
    seed_db()
