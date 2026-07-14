-- TOTONO データベース設計 schema.sql
-- SQLite用テーブル定義(第3正規形)

PRAGMA foreign_keys = ON;

-- ===================================
-- 睡眠
-- ===================================
CREATE TABLE sleep_records (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  date          TEXT NOT NULL UNIQUE,
  sleep_hours   REAL,
  sleep_quality INTEGER
);

-- ===================================
-- 疲労度・コンディション
-- ===================================
CREATE TABLE timing_types (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE condition_logs (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  date             TEXT NOT NULL,
  timing_type_id   INTEGER NOT NULL,
  recorded_at      TEXT,
  condition_score  INTEGER,
  fatigue_score    INTEGER,
  mood_score       INTEGER,
  memo             TEXT,
  FOREIGN KEY (timing_type_id) REFERENCES timing_types(id)
);

-- ===================================
-- 食事
-- ===================================
CREATE TABLE meal_types (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE foods (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT NOT NULL UNIQUE,
  calorie_per_100g  INTEGER,
  protein_per_100g  REAL,
  fat_per_100g      REAL,
  carbs_per_100g    REAL
);

CREATE TABLE meals (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  date          TEXT NOT NULL,
  meal_type_id  INTEGER NOT NULL,
  photo_path    TEXT,
  FOREIGN KEY (meal_type_id) REFERENCES meal_types(id)
);

CREATE TABLE meal_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  meal_id     INTEGER NOT NULL,
  food_id     INTEGER NOT NULL,
  quantity_g  REAL NOT NULL,
  FOREIGN KEY (meal_id) REFERENCES meals(id),
  FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- ===================================
-- トレーニング
-- ===================================
CREATE TABLE training_types (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE trainings (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  date              TEXT NOT NULL,
  training_type_id  INTEGER NOT NULL,
  intensity         INTEGER,
  duration_minutes  INTEGER,
  FOREIGN KEY (training_type_id) REFERENCES training_types(id)
);

-- ===================================
-- 検索性能向上のためのインデックス
-- ===================================
CREATE INDEX idx_condition_logs_date ON condition_logs(date);
CREATE INDEX idx_meals_date          ON meals(date);
CREATE INDEX idx_trainings_date      ON trainings(date);
CREATE INDEX idx_meal_items_meal_id  ON meal_items(meal_id);
CREATE INDEX idx_meal_items_food_id  ON meal_items(food_id);