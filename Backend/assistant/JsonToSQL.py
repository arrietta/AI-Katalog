import tkinter as tk
from tkinter import filedialog, messagebox
import sqlite3
import json
import os

# Функция для загрузки JSON и вставки данных в SQLite
def load_json_to_db(file_path):
    try:
        # Открываем JSON файл
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Название файла базы данных
        db_filename = 'products.db'

        # Проверяем, существует ли база данных, если нет, создаем ее
        if not os.path.exists(db_filename):
            conn = sqlite3.connect(db_filename)
            cursor = conn.cursor()

            # Создаем таблицы, если они не существуют
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS products (
                    product_id TEXT PRIMARY KEY,
                    title TEXT,
                    price INTEGER,
                    image_url TEXT,
                    description TEXT,
                    product_url TEXT
                )
            ''')

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS specifications (
                    product_id TEXT,
                    specification_name TEXT,
                    specification_value TEXT,
                    FOREIGN KEY (product_id) REFERENCES products(product_id)
                )
            ''')

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS reviews (
                    product_id TEXT,
                    username TEXT,
                    review_date TEXT,
                    review_text TEXT,
                    helpful_count INTEGER,
                    FOREIGN KEY (product_id) REFERENCES products(product_id)
                )
            ''')

            conn.commit()
            conn.close()

        # Подключаемся к базе данных (будет создана, если не существует)
        conn = sqlite3.connect(db_filename)
        cursor = conn.cursor()

        # Вставляем данные в таблицы
        for product in data:
            # Вставляем основной продукт
            cursor.execute('''
                INSERT OR REPLACE INTO products (product_id, title, price, image_url, description)
                VALUES (?, ?, ?, ?, ?)
            ''', (product['product_id'], product['title'], product['price'], product['image_url'], product['description']))

            # Вставляем спецификации
            for spec_name, spec_value in product['specifications'].items():
                cursor.execute('''
                    INSERT INTO specifications (product_id, specification_name, specification_value)
                    VALUES (?, ?, ?)
                ''', (product['product_id'], spec_name, spec_value))

            # Вставляем отзывы
            for review in product['reviews']:
                cursor.execute('''
                    INSERT INTO reviews (product_id, username, review_date, review_text, helpful_count)
                    VALUES (?, ?, ?, ?, ?)
                ''', (product['product_id'], review['username'], review['date'], review['text'], int(review['helpful_count'].split()[0])))

        # Сохраняем изменения и закрываем соединение
        conn.commit()
        conn.close()
        messagebox.showinfo("Success", "Данные успешно загружены в базу данных!")
    except Exception as e:
        messagebox.showerror("Error", f"Ошибка при загрузке данных: {e}")

# Функция для открытия диалога выбора файла
def open_file():
    file_path = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
    if file_path:
        load_json_to_db(file_path)

# Создание основного окна
root = tk.Tk()
root.title("Загрузчик данных в SQLite")

# Кнопка для выбора файла
btn_select_file = tk.Button(root, text="Выбрать JSON файл", command=open_file)
btn_select_file.pack(pady=20)

# Запуск интерфейса
root.mainloop()
