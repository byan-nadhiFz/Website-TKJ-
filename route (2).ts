import { NextResponse } from 'next/server';

// Data Asli 32 Siswa XI TKJ 3
const studentsData = [
  { id: 1, name: 'Aang Burhanudin Badsah', skill: 'Network Engineer' },
  { id: 2, name: 'Adinda Ramadhani', skill: 'Cyber Security Specialist' },
  { id: 3, name: 'Anantadewa Wiwasata Putra Maharani', skill: 'System Administrator' },
  { id: 4, name: 'Annisa Ramadhani Putri Adiwanto', skill: 'Cloud Engineer' },
  { id: 5, name: 'Ariel Ardanta Nurrohman Reyhandy', skill: 'DevOps Engineer' },
  { id: 6, name: 'Bima Gusto Mahatsafa', skill: 'Network Administrator' },
  { id: 7, name: 'Byantara Al Hakim Nadhif', skill: 'Penetration Tester' },
  { id: 8, name: 'Cleosya Kapita Bilqist', skill: 'Frontend Developer' },
  { id: 9, name: 'Devina Aurelia Hapsari', skill: 'Database Administrator' },
  { id: 10, name: 'Ezar Brilliant Sugiono', skill: 'SOC Analyst' },
  { id: 11, name: 'Farhan Auliya Abrar', skill: 'Hardware Specialist' },
  { id: 12, name: 'Flavia Annisa Kurniawan', skill: 'Linux Sysadmin' },
  { id: 13, name: 'Gusti Putra Khakim Khaqiqi', skill: 'Web Developer' },
  { id: 14, name: 'Hatta Muhlasin Luhtari', skill: 'Security Analyst' },
  { id: 15, name: 'Intan Alshani Raffisya', skill: 'Network Architect' },
  { id: 16, name: 'Iqbal Ilmi', skill: 'Ethical Hacker' },
  { id: 17, name: 'Ivander Ardell Alvaro', skill: 'System Engineer' },
  { id: 18, name: 'Kenza Almira Yasmin', skill: 'Mikrotik Specialist' },
  { id: 19, name: 'M. Rafa Rizky Effendi', skill: 'Cisco Certified Network' },
  { id: 20, name: 'Mochammad Davin Al Fida', skill: 'Cyber Defense' },
  { id: 21, name: 'Muhammad Faris Anshori', skill: 'Wireless Engineer' },
  { id: 22, name: 'Muhammad Hamizan Zuhri', skill: 'IT Infrastructure Specialist' },
  { id: 23, name: 'Muhammad Kemal Faza', skill: 'System Analyst' },
  { id: 24, name: 'Muhammad Rifqi Nasywan Athallah', skill: 'Network Security' },
  { id: 25, name: 'Nazriel Abiy Putra Veangga', skill: 'Python Developer' },
  { id: 26, name: 'Nizar Zulmi Firmansyah', skill: 'Server Administrator' },
  { id: 27, name: 'Radine Dygtastya Rahmadhani', skill: 'IT Support Engineer' },
  { id: 28, name: 'Rahel Maryam', skill: 'Cloud Architect' },
  { id: 29, name: 'Satria Banyu Seki', skill: 'Security Auditor' },
  { id: 30, name: 'Valvizzy Piscesio Lois', skill: 'VoIP Engineer' },
  { id: 31, name: 'Yohan Alim Wijaya', skill: 'Fiber Optic Technician' },
  { id: 32, name: 'Ziyadatul Ilman Nafiah', skill: 'System Integrator' },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('name') || '';
    const cleanQuery = query.trim();

    // 1. SIMULASI LAB SQL INJECTION (Jika input mengandung payload SQLi)
    const sqliPattern = /('|--|OR\s+1=1|OR\s+'1'='1|UNION|SELECT)/i;
    if (sqliPattern.test(cleanQuery)) {
      // Mengembalikan SELURUH 32 data siswa (Bypass SQLi Success)
      return NextResponse.json(studentsData);
    }

    // 2. JIKA PARAMETER NAME KOSONG (Saat pertama kali load website)
    if (!cleanQuery) {
      // Mengembalikan seluruh data (Frontend akan otomatis mengambil 5 siswa pertama)
      return NextResponse.json(studentsData);
    }

    // 3. PENCARIAN NORMAL (Case-insensitive & Partial match)
    // Sekarang mengetik "rafa" akan cocok dengan "M. Rafa Rizky Effendi"
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