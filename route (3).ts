import { NextResponse } from 'next/server';

// Data Asli 32 Siswa XI TKJ 3
const studentsData = [
  { id: 1, name: 'Aang Burhanudin Badsah', class: 'XI TKJ 3', comment: 'Siswa aktif di lab jaringan', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aang' },
  { id: 2, name: 'Adinda Ramadhani', class: 'XI TKJ 3', comment: 'Anggota tim Cyber Security', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Adinda' },
  { id: 3, name: 'Anantadewa Wiwasata Putra Maharani', class: 'XI TKJ 3', comment: 'Ketua kelompok project AI', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Anantadewa' },
  { id: 4, name: 'Annisa Ramadhani Putri Adiwanto', class: 'XI TKJ 3', comment: 'Spesialis Cloud Computing', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Annisa' },
  { id: 5, name: 'Ariel Ardanta Nurrohman Reyhandy', class: 'XI TKJ 3', comment: 'DevOps Engineer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ariel' },
  { id: 6, name: 'Bima Gusto Mahatsafa', class: 'XI TKJ 3', comment: 'Administrator server lokal', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bima' },
  { id: 7, name: 'Byantara Al Hakim Nadhif', class: 'XI TKJ 3', comment: 'Hobi ngoding frontend', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Byantara' },
  { id: 8, name: 'Cleosya Kapita Bilqist', class: 'XI TKJ 3', comment: 'Siswa berprestasi', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cleosya' },
  { id: 9, name: 'Devina Aurelia Hapsari', class: 'XI TKJ 3', comment: 'Database Administrator', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Devina' },
  { id: 10, name: 'Ezar Brilliant Sugiono', class: 'XI TKJ 3', comment: 'SOC Analyst Lab', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ezar' },
  { id: 11, name: 'Farhan Auliya Abrar', class: 'XI TKJ 3', comment: 'Teknisi Hardware', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Farhan' },
  { id: 12, name: 'Flavia Annisa Kurniawan', class: 'XI TKJ 3', comment: 'Linux Sysadmin', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Flavia' },
  { id: 13, name: 'Gusti Putra Khakim Khaqiqi', class: 'XI TKJ 3', comment: 'Web Developer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gusti' },
  { id: 14, name: 'Hatta Muhlasin Luhtari', class: 'XI TKJ 3', comment: 'Security Analyst', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Hatta' },
  { id: 15, name: 'Intan Alshani Raffisya', class: 'XI TKJ 3', comment: 'Network Architect', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Intan' },
  { id: 16, name: 'Iqbal Ilmi', class: 'XI TKJ 3', comment: 'Ethical Hacker', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Iqbal' },
  { id: 17, name: 'Ivander Ardell Alvaro', class: 'XI TKJ 3', comment: 'System Engineer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ivander' },
  { id: 18, name: 'Kenza Almira Yasmin', class: 'XI TKJ 3', comment: 'Spesialis Mikrotik', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kenza' },
  { id: 19, name: 'M. Rafa Rizky Effendi', class: 'XI TKJ 3', comment: 'Siswa aktif di lab jaringan', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rafa' },
  { id: 20, name: 'Mochammad Davin Al Fida', class: 'XI TKJ 3', comment: 'Cyber Defense Analyst', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Davin' },
  { id: 21, name: 'Muhammad Faris Anshori', class: 'XI TKJ 3', comment: 'Wireless Engineer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Faris' },
  { id: 22, name: 'Muhammad Hamizan Zuhri', class: 'XI TKJ 3', comment: 'Infrastructure Specialist', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Hamizan' },
  { id: 23, name: 'Muhammad Kemal Faza', class: 'XI TKJ 3', comment: 'System Analyst', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kemal' },
  { id: 24, name: 'Muhammad Rifqi Nasywan Athallah', class: 'XI TKJ 3', comment: 'Network Security', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rifqi' },
  { id: 25, name: 'Nazriel Abiy Putra Veangga', class: 'XI TKJ 3', comment: 'Python Developer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Nazriel' },
  { id: 26, name: 'Nizar Zulmi Firmansyah', class: 'XI TKJ 3', comment: 'Server Administrator', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Nizar' },
  { id: 27, name: 'Radine Dygtastya Rahmadhani', class: 'XI TKJ 3', comment: 'IT Support Engineer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Radine' },
  { id: 28, name: 'Rahel Maryam', class: 'XI TKJ 3', comment: 'Cloud Architect', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rahel' },
  { id: 29, name: 'Satria Banyu Seki', class: 'XI TKJ 3', comment: 'Security Auditor', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Satria' },
  { id: 30, name: 'Valvizzy Piscesio Lois', class: 'XI TKJ 3', comment: 'VoIP Engineer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Valvizzy' },
  { id: 31, name: 'Yohan Alim Wijaya', class: 'XI TKJ 3', comment: 'Teknisi Fiber Optic', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Yohan' },
  { id: 32, name: 'Ziyadatul Ilman Nafiah', class: 'XI TKJ 3', comment: 'System Integrator', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ziyadatul' },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const cleanQuery = query.trim();

    // 1. LAB SQL INJECTION: Jika mengandung payload SQLi, kembalikan SELURUH 32 data
    const sqliPattern = /('|--|OR\s+1=1|OR\s+'1'='1|UNION|SELECT)/i;
    if (sqliPattern.test(cleanQuery)) {
      return NextResponse.json(studentsData);
    }

    // 2. JIKA PARAMETER KOSONG: Batasi default tampilan ke 10 siswa pertama
    if (!cleanQuery) {
      return NextResponse.json(studentsData.slice(0, 10));
    }

    // 3. PENCARIAN NORMAL: Case-insensitive & Partial match
    const filtered = studentsData.filter((student) =>
      student.name.toLowerCase().includes(cleanQuery.toLowerCase())
    );

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}