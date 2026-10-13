'use client';

import StudentLab from '@/components/StudentLab';
import { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  skill?: string;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [searched, setSearched] = useState(false);

  const [commentsMap, setCommentsMap] = useState<{ [key: number]: string[] }>({});
  const [inputMap, setInputMap] = useState<{ [key: number]: string }>({});

  // STATE FITUR AI ASSISTANT
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: 'Salam Praktikan! Saya CYBER-AI Assistant. Tanyakan apa saja seputar Cyber Security, Jaringan TKJ, atau topik umum lainnya di sini.',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    fetch('/api/search?name=')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data.slice(0, 5));
        }
      });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/search?name=${encodeURIComponent(search)}`);
    const data = await res.json();
    setStudents(Array.isArray(data) ? data : []);
    setSearched(true);
  };

  const handleAddComment = (studentId: number, e: React.FormEvent) => {
    e.preventDefault();
    const text = inputMap[studentId];
    if (!text) return;

    setCommentsMap((prev) => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), text],
    }));

    setInputMap((prev) => ({ ...prev, [studentId]: '' }));
  };

  // HANDLER CHAT AI ASSISTANT REAL-TIME
  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiThinking) return;

    const userMessage = aiInput;
    setAiChat((prev) => [...prev, { role: 'user', text: userMessage }]);
    setAiInput('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const aiResponse = data.reply || 'Tidak ada respon dari AI.';

      setAiChat((prev) => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (err) {
      setAiChat((prev) => [
        ...prev,
        { role: 'ai', text: 'Gagal terhubung ke AI. Coba lagi nanti.' },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 font-mono relative z-10">
      
      {/* HEADER DENGAN MASCOT HACKER 3D */}
      <header className="glass-card-3d p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            STATUS: ONLINE / DEV MODE 1.0
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
            LABSiber.tkj3
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-sans">
            Dashboard Eksperimen & Profil Angkatan XI TKJ 3. Selamat Datang, Praktikan!
          </p>
        </div>

        {/* MASCOT HACKER 3D */}
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative bg-slate-950 p-3 rounded-2xl border border-emerald-500/40 animate-hacker-float">
            <svg
              className="w-24 h-24 md:w-32 md:h-32 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10A10 10 0 0 0 12 2z" opacity="0.2" />
              <path d="M12 4a8 8 0 0 0-8 8c0 2.5 1.1 4.8 2.9 6.3L12 11l5.1 7.3c1.8-1.5 2.9-3.8 2.9-6.3a8 8 0 0 0-8-8z" fill="#0f172a" />
              <path d="M4.5 14.5C6 11 8.5 8 12 8s6 3 7.5 6.5" stroke="#10b981" strokeWidth="2" />
              <polygon points="8 12 10 13 8 14" fill="#38bdf8" />
              <polygon points="16 12 14 13 16 14" fill="#38bdf8" />
              <path d="M9 16c2 1.5 4 1.5 6 0" stroke="#38bdf8" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </header>

      {/* FOTO ANGKATAN & DAFTAR SISWA PREVIEW */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Frame Foto Angkatan */}
        <div className="md:col-span-7 glass-card-3d p-5 rounded-3xl flex flex-col justify-between">
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-700 relative shadow-2xl">
            <img
              src="/class.jpg"
              alt="Foto Angkatan XI TKJ 3"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="mt-4 flex items-center justify-between font-sans">
            <span className="text-xs font-mono bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full shadow-lg">
              FOTO ANGKATAN XI TKJ 3
            </span>
          </div>
        </div>

        {/* Daftar Siswa */}
        <div className="md:col-span-5 glass-card-3d p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="animate-ping w-2 h-2 rounded-full bg-emerald-400"></span>
              Daftar Siswa (Preview)
            </h2>
            <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {!searched && students.length > 0 ? (
                students.map((s, index) => (
                  <li
                    key={s.id}
                    className="p-3 bg-slate-900/80 rounded-xl flex items-center gap-3 border border-slate-800 hover:border-emerald-500/50 transition-all font-sans"
                  >
                    <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-100 text-sm">{s.name}</p>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">#00{s.id}</div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-center text-slate-400 italic py-10 font-sans">
                  {!searched
                    ? 'Memuat data siswa...'
                    : 'Gunakan pencarian di bawah untuk melihat detail seluruh angkatan.'}
                </p>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* MODUL LAB SQL INJECTION (STUDENT LAB COMPONENT) */}
      <section className="glass-card-3d p-6 rounded-3xl">
        <StudentLab />
      </section>

      {/* FITUR AI CYBER ASSISTANT */}
      <section className="glass-card-3d ai-card-glow p-6 md:p-8 rounded-3xl space-y-4 border-2 border-purple-500/40">
        <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
          <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
            <span className="text-2xl">🤖</span> CYBER-AI Assistant v1.0
          </h2>
          <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-700 px-3 py-1 rounded-full font-mono">
            NEURAL NETWORK ACTIVE
          </span>
        </div>

        {/* Box Obrolan AI */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 h-48 overflow-y-auto space-y-3 font-sans">
          {aiChat.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 text-xs md:text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-purple-500/30 text-purple-200 rounded-bl-none'
                }`}
              >
                <p className="font-bold text-[10px] opacity-70 mb-1 font-mono">
                  {msg.role === 'user' ? 'YOU' : 'CYBER-AI'}
                </p>
                {msg.text}
              </div>
            </div>
          ))}
          {isAiThinking && (
            <p className="text-xs text-purple-400 animate-pulse italic">
              CYBER-AI sedang menganalisis data...
            </p>
          )}
        </div>

        {/* Input Chat AI */}
        <form onSubmit={handleAiAsk} className="flex gap-2">
          <input
            type="text"
            className="bg-slate-950 border border-purple-900/60 p-3 rounded-xl flex-1 text-slate-100 text-xs md:text-sm focus:border-purple-500 outline-none font-sans"
            placeholder="Tanya AI apa saja..."
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition shadow-lg"
          >
            Tanya AI
          </button>
        </form>
      </section>

      {/* FORM PENCARIAN SISWA TERIKAT & KOMENTAR */}
      <section className="glass-card-3d p-8 rounded-3xl space-y-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <span className="text-emerald-400">⚡</span> Pencarian Siswa (API Search)
        </h2>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex-1 text-slate-100 text-sm placeholder-slate-500 focus:border-emerald-500 outline-none transition"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg"
          >
            Cari
          </button>
        </form>
      </section>

      {/* HASIL PENCARIAN & KOMENTAR */}
      {searched && (
        <section className="space-y-6">
          <div className="flex justify-between items-center glass-card-3d p-4 rounded-xl">
            <p className="text-base font-bold text-slate-200">
              Total Siswa Teridentifikasi: <span className="text-emerald-400">{students.length}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="glass-card-3d p-6 rounded-2xl space-y-4 font-sans flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-extrabold text-2xl text-slate-100 mb-1 font-mono">{student.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full inline-block">
                    {student.skill || 'Network & System Administration'}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-3 mt-4">
                  <p className="text-xs font-bold text-slate-300 font-mono">Komentar untuk {student.name}:</p>

                  <form onSubmit={(e) => handleAddComment(student.id, e)} className="flex gap-2">
                    <input
                      type="text"
                      className="bg-slate-950 border border-slate-800 p-2 text-xs rounded-lg flex-1 text-slate-100 focus:border-emerald-500 outline-none"
                      placeholder="Beri komentar..."
                      value={inputMap[student.id] || ''}
                      onChange={(e) =>
                        setInputMap({ ...inputMap, [student.id]: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition"
                    >
                      Kirim
                    </button>
                  </form>

                  <div className="space-y-2 mt-3 max-h-40 overflow-y-auto">
                    {(commentsMap[student.id] || []).map((comment, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-950 text-xs rounded-lg border border-slate-800 text-slate-200 flex gap-2 items-start"
                      >
                        <span className="text-emerald-400">•</span>
                        <div dangerouslySetInnerHTML={{ __html: comment }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}