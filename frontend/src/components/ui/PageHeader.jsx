import React from 'react';
export default function PageHeader({ title, subtitle, action }){
  return (
    <div className="rounded-2xl p-8 gradient-brand text-white shadow-soft flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
        {subtitle && <p className="text-white/90 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="mt-4 md:mt-0">{action}</div>}
    </div>
  );
}