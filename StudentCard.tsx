import StudentCard from '@/components/StudentCard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 flex justify-center items-center">
      <StudentCard 
        studentName="M. Rafa Rizky Effendi" 
        skill="Cisco Certified Network" 
      />
    </main>
  );
}