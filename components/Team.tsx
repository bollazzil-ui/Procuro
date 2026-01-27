import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Team = () => {
  const members = [
    { name: "Claudio Di Lisa", role: "CEO" },
    { name: "Leonardo Bollazzi", role: "CTO" },
    { name: "Julia Schönthal", role: "CFO" },
    { name: "Laura Roggo", role: "Sales" },
    { name: "Saijai Thainoi", role: "Marketing" },
  ];

  return (
    <section className="py-20 px-4 bg-blue-950 text-white rounded-[3rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-6">Built with Trust at FHNW</h2>
            <p className="text-blue-200 text-lg leading-relaxed">
              Founded by a dedicated team from the University of Applied Sciences and Arts Northwestern Switzerland (FHNW), Procuro is dedicated to digitizing the Swiss SME ecosystem.
            </p>
          </div>
          <div className="flex items-center gap-4 text-blue-300">
            <ShieldCheck size={48} />
            <div className="text-left uppercase tracking-tighter">
              <p className="text-xs font-bold">University of Applied Sciences</p>
              <p className="text-sm font-black">FHNW</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
          {members.map((member) => (
            <div key={member.name} className="bg-blue-900/50 p-6 rounded-2xl border border-blue-800 hover:border-blue-600 transition-colors text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-full mb-4 flex items-center justify-center text-blue-400 font-bold text-xl border-2 border-blue-700 mx-auto">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="font-bold text-white mb-1">{member.name}</h4>
              <p className="text-blue-400 text-xs font-semibold uppercase">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;