import React, { useEffect, useState } from 'react';
import { getFlats, deleteFlat } from '../services/flats';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import ConfirmModal from '../components/ConfirmModal';

export default function FlatsList(){
  const [flats, setFlats] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const load = async ()=>{ setFlats(await getFlats()); };
  useEffect(()=>{ load(); },[]);

  const handleDelete = async ()=>{
    await deleteFlat(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        title="Flats"
        subtitle="Browse and manage apartments"
        action={<button onClick={()=>navigate('/flats/add')} className="btn-gradient px-4 py-2 rounded-xl">+ Add Flat</button>}
      />
      {flats.length===0 ? (
        <div className="bg-white rounded-2xl shadow-soft p-8 text-center text-gray-500">No flats found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flats.map(f => (
            <div key={f._id} className="rounded-2xl p-5 shadow-soft bg-white hover:shadow-2xl transition transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">Flat</div>
                  <div className="text-xl font-extrabold">#{f.number}</div>
                  <div className="text-gray-600 mt-1">Size: {f.size}</div>
                  <div className="text-gray-600">Floor: {f.floor}</div>
                </div>
                <span className={`badge ${f.occupied ? 'red' : 'green'}`}>{f.occupied ? 'Occupied' : 'Vacant'}</span>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={()=>navigate(`/flats/edit/${f._id}`)} className="px-3 py-1 rounded-lg bg-amber-500 text-white hover:opacity-90">Edit</button>
                <button onClick={()=>setDeleteId(f._id)} className="px-3 py-1 rounded-lg bg-rose-600 text-white hover:opacity-90">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal open={!!deleteId} title="Delete Flat" message="This action cannot be undone." onCancel={()=>setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  );
}
