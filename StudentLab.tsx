'use client';

import { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  class: string;
  comment: string;
  avatar: string;
}

export default function StudentLab() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async (searchQuery = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/students?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents(query);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Box Input SQLi */}
      <div className="lg:col-span-1 bg-slate-900/80 border border-purple-500/30 rounded-xl p-5 shadow-lg h-fit">
        <h3 className="text-xl font-bold text-purple-400 mb-2">⚡ Pencarian Siswa (SQLi Lab)</h3>
        <p className="text-xs text-slate-400 mb-4">
          Masukkan nama siswa atau uji vulnerability pakai payload SQLi.
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Coba: ' OR 1=1 --"
            className="w-full bg-slate-950 border border-purple-500/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm py-2 rounded-lg transition-all"
          >
            Cari Data
          </button>
        </form>
      </div>

      {/* Box List Data Anak */}
      <div className="lg:col-span-2 bg-slate-900/80 border border-emerald-500/30 rounded-xl p-5 shadow-lg">
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-xl font-bold text-emerald-400">Daftar Siswa (Preview)</h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
            Menampilkan: {students.length} / 32 Siswa
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 italic">Memuat data siswa...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center gap-3 hover:border-emerald-500/40 transition-all"
              >
                {/* Foto Anak */}
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover border border-emerald-400/30 flex-shrink-0 bg-slate-900"
                />
                {/* Detail Nama & Komentar Samping Foto */}
                <div className="overflow-hidden">
                  <h4 className="text-sm font-semibold text-slate-200 truncate">{student.name}</h4>
                  <p className="text-[11px] text-emerald-400 font-mono">{student.class}</p>
                  <p className="text-xs text-slate-400 mt-1 italic truncate">"{student.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}