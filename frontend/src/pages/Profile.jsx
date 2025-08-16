import React from 'react';
import PageHeader from '../components/ui/PageHeader';

export default function Profile(){
  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader title="Profile" subtitle="Your AptEase account details" />
      <div className="bg-white rounded-2xl shadow-soft p-6 max-w-md mx-auto text-center">
        <img src="https://via.placeholder.com/100" alt="profile" className="mx-auto rounded-full mb-4" />
        <h2 className="text-xl font-bold mb-2">Alex Resident</h2>
        <p className="text-gray-500 mb-4">alex@example.com</p>
        <button className="px-4 py-2 rounded-lg btn-gradient shadow-soft">Edit Profile</button>
      </div>
    </div>
  );
}
