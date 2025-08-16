import React from 'react';
export default function EmptyState({ title='Nothing here yet', subtitle='Start by creating your first item.', cta }){
  return (
    <div className="bg-white rounded-2xl shadow-soft p-10 text-center">
      <div className="text-5xl mb-2">📭</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-500 mb-4">{subtitle}</p>
      {cta}
    </div>
  );
}