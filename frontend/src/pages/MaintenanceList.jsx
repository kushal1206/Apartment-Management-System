import React, { useEffect, useState, useCallback } from 'react';
import { getRequests, deleteRequest } from '../services/maintenance';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import ConfirmModal from '../components/ConfirmModal';

export default function MaintenanceList() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const data = await getRequests(filter || undefined);
    setRequests(Array.isArray(data) ? data : []);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteRequest(deleteId);
    setDeleteId(null);
    load();
  };

  const statusClass = (s) =>
    s === 'Pending' ? 'amber' : s === 'In Progress' ? 'blue' : 'green';

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        title="Maintenance"
        subtitle="Track and resolve maintenance issues"
        action={
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <button
              onClick={() => navigate('/maintenance/add')}
              className="btn-gradient px-4 py-2 rounded-xl"
            >
              + Add Request
            </button>
          </div>
        }
      />
      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft p-8 text-center text-gray-500">
          No requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="rounded-2xl p-5 shadow-soft bg-white hover:shadow-2xl transition transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="text-xl font-extrabold">{r.title}</div>
                <span
                  className={`badge ${
                    r.priority === 'High'
                      ? 'red'
                      : r.priority === 'Medium'
                      ? 'amber'
                      : 'green'
                  }`}
                >
                  {r.priority}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{r.description || '—'}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">
                  Flat: {r.flat?.number || '-'}
                </div>
                <span className={`badge ${statusClass(r.status)}`}>
                  {r.status}
                </span>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/maintenance/edit/${r._id}`)}
                  className="px-3 py-1 rounded-lg bg-amber-500 text-white hover:opacity-90"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(r._id)}
                  className="px-3 py-1 rounded-lg bg-rose-600 text-white hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        open={!!deleteId}
        title="Delete Maintenance Request"
        message="This will permanently remove the request."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
