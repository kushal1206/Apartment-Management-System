import React, { useEffect, useState } from 'react';
import { getFlats } from '../services/flats';
import { getRequests } from '../services/maintenance';
import StatCard from '../components/ui/StatCard';
import PageHeader from '../components/ui/PageHeader';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [stats, setStats] = useState({ total: 0, occupied: 0, vacant: 0, pending: 0 });
  useEffect(()=>{
    async function load(){
      try{
        const flats = await getFlats();
        const total = flats.length;
        const occupied = flats.filter(f=>f.occupied).length;
        const vacant = total - occupied;
        const pendingReqs = (await getRequests('Pending')).length;
        setStats({ total, occupied, vacant, pending: pendingReqs });
      }catch(e){ console.error(e); }
    } load();
  },[]);
  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        title="Welcome to AptEase"
        subtitle="Manage flats, tenants, and maintenance with ease."
        action={<Link to="/flats" className="btn-gradient px-4 py-2 rounded-xl shadow-soft">Manage Flats</Link>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Flats" value={stats.total} icon="🏢" accent="from-sky-500 to-cyan-500" />
        <StatCard label="Occupied" value={stats.occupied} icon="👥" accent="from-fuchsia-500 to-pink-500" />
        <StatCard label="Vacant" value={stats.vacant} icon="🟩" accent="from-emerald-500 to-teal-500" />
        <StatCard label="Pending Requests" value={stats.pending} icon="🛠️" accent="from-amber-500 to-orange-500" />
      </div>
    </div>
  );
}
