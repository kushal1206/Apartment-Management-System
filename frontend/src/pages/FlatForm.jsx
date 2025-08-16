import React, { useEffect, useState } from 'react';
import { createFlat, getFlatById, updateFlat } from '../services/flats';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';

export default function FlatForm(){
  const [flat, setFlat] = useState({ number:'', size:'', floor:'', occupied:false });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if(id){ getFlatById(id).then(d => setFlat({ number:d.number||'', size:d.size||'', floor:d.floor||'', occupied:!!d.occupied }))}
  },[id]);

  const handleChange = (e)=>{
    const { name, value, type, checked } = e.target;
    setFlat(prev => ({ ...prev, [name]: type==='checkbox' ? checked : value }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(id){ await updateFlat(id, flat); } else { await createFlat(flat); }
    navigate('/flats');
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader title={id? 'Edit Flat' : 'Add Flat'} subtitle="Provide flat details below" />
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-soft p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Flat Number</label>
            <input name="number" value={flat.number} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Size</label>
              <input name="size" value={flat.size} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Floor</label>
              <input name="floor" value={flat.floor} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"/>
            </div>
          </div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="occupied" checked={flat.occupied} onChange={handleChange} />
            <span>Occupied</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={()=>navigate('/flats')} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg btn-gradient shadow-soft">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
