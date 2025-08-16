import React from 'react';
export default function StatCard({ label, value, accent='from-teal-500 to-purple-500', icon='🏢' }){
  return (
    <div className={`rounded-2xl p-1 shadow-soft bg-gradient-to-br ${accent} text-white`}>
      <div className="rounded-2xl p-5 bg-white text-gray-800 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
          <div className="text-3xl font-extrabold">{value}</div>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}