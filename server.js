const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = path.join(__dirname, 'totono.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
  } else {
    console.log('totono.db に接続しました');
  }
});

// 睡眠データを保存する(すでに同じ日付があれば上書き)
app.post('/api/sleep', (req, res) => {
  const { date, sleep_hours, sleep_quality } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'date は必須です' });
  }

  const sql = `
    INSERT INTO sleep_records (date, sleep_hours, sleep_quality)
    VALUES (?, ?, ?)
    ON CONFLICT(date) DO UPDATE SET
      sleep_hours = excluded.sleep_hours,
      sleep_quality = excluded.sleep_quality
  `;

  db.run(sql, [date, sleep_hours, sleep_quality], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: '睡眠データを保存しました' });
  });
});

// 睡眠データを全件取得する
app.get('/api/sleep', (req, res) => {
  db.all('SELECT * FROM sleep_records ORDER BY date DESC', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});