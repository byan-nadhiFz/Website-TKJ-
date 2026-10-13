import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function openDb(): Promise<Database> {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      class TEXT DEFAULT 'XI TKJ 3',
      role TEXT DEFAULT 'Network & System Administration'
    );
  `);

  const count = await db.get('SELECT COUNT(*) as count FROM students');
  if (count.count === 0) {
    const students = [
      "Aang Burhanudin Badsah", "Adinda Ramadhani", "Anantadewa Wiwasata Putra Maharani",
      "Annisa Ramadhani Putri Adiwanto", "Ariel Ardanta Nurrohman Reyhandy", "Bima Gusto Mahatsafa",
      "Byantara Al Hakim Nadhif", "Cleosya Kapita Bilqist", "Devina Aurelia Hapsari",
      "Ezar Brilliant Sugiono", "Farhan Auliya Abrar", "Flavia Annisa Kurniawan",
      "Gusti Putra Khakim Khaqiqi", "Hatta Muhlasin Luhtari", "Intan Alshani Raffisya",
      "Iqbal Ilmi", "Ivander Ardell Alvaro", "Kenza Almira Yasmin",
      "M. Rafa Rizky Effendi", "Mochammad Davin Al Fida", "Muhammad Faris Anshori",
      "Muhammad Hamizan Zuhri", "Muhammad Kemal Faza", "Muhammad Rifqi Nasywan Athallah",
      "Nazriel Abiy Putra Veangga", "Nizar Zulmi Firmansyah", "Radine Dygtastya Rahmadhani",
      "Rahel Maryam", "Satria Banyu Seki", "Valvizzy Piscesio Lois",
      "Yohan Alim Wijaya", "Ziyadatul Ilman Nafiah"
    ];

    for (const name of students) {
      await db.run('INSERT INTO students (name) VALUES (?)', [name]);
    }
  }

  return db;
}