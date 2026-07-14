const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'totono.db');
const schemaPath = path.join(__dirname, 'schema.sql');

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('既存の totono.db を削除しました');
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
    return;
  }
  console.log('totono.db を作成しました');
});

const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error('schema.sql の実行エラー:', err.message);
  } else {
    console.log('9つのテーブルとインデックスを作成しました');
  }

  db.all(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
    (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('作成されたテーブル:');
        rows.forEach((row) => console.log(' -', row.name));
      }
      db.close();
    }
  );
});