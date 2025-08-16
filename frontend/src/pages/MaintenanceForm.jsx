import React, { useEffect, useState } from 'react';
import { createRequest, getRequestById, updateRequest } from '../services/maintenance';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';

export default function MaintenanceForm(){
  const [form, setForm] = useState({ title:'', description:'', priority:'Low', status:'Pending', flat:'' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if(id){
      getRequestById(id).then(d => setForm({
        title: d.title||'', description: d.description||'',
        priority: d.priority||'Low', status: d.status||'Pending', flat: d.flat?._id||''
      }));
    }
  },[id]);

  const handleChange = (e)=> setForm(prev=>({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(id){ await updateRequest(id, form); } else { await createRequest(form); }
    navigate('/maintenance');
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader title={id? 'Edit Request' : 'Add Request'} subtitle="Describe the issue and its priority" />
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-soft p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-lg p-2 h-28 focus:outline-none focus:ring focus:ring-indigo-200"></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="w-full border rounded-lg p-2">
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg p-2">
                <option>Pending</option><option>In Progress</option><option>Resolved</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Flat ID (optional)</label>
            <input name="flat" value={form.flat} onChange={handleChange} className="w-full border rounded-lg p-2" placeholder="Paste a Flat _id or leave blank"/>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={()=>navigate('/maintenance')} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg btn-gradient shadow-soft">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
