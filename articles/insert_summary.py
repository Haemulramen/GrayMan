import sqlite3
from utils import CreateNews


cn = CreateNews()
con = sqlite3.connect("db.sqlite3")
cur = con.cursor()
cur.execute("SELECT id, text from articles_article")
rows = cur.fetchall()
for row in rows:
    row_id = row[0]
    text = row[1]
    sum = cn.summarize(text)
    correction = cn.correction(text, sum)
    cur.execute("INSERT INTO articles_summary (text, correction, origin_id) VALUES (?, ?, ?)", (sum, correction, row_id))
    con.commit()
con.close()