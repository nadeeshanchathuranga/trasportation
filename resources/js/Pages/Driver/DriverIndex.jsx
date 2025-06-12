import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function DriverRegisterForm({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: '',
    address: user?.address || '',
    license_number: '',
    nic: null,
    license: null,
    police_clearance: null,
    certifications: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    router.post('/driver/driver-store', form, {
      forceFormData: true,
      onSuccess: () => {
        alert('✅ Driver registered successfully!');
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          dob: '',
          address: user?.address || '',
          license_number: '',
          nic: null,
          license: null,
          police_clearance: null,
          certifications: null,
        });
        document.querySelectorAll('input[type="file"]').forEach((input) => (input.value = ''));
      },
      onError: () => {
        alert('❌ Failed to register. Please check your inputs.');
      },
    });
  };

  return (
    <AuthenticatedLayout>



<div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">🚗 Driver Registration</h2>

  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 md:grid-cols-2 gap-8"
    encType="multipart/form-data"
  >
    {/* Left Column: Personal Information */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">👤 Personal Information</h3>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          required
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          required
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          required
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
        <input
          id="dob"
          type="date"
          name="dob"
          value={formData.dob}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="license_number" className="block text-sm font-medium text-gray-600 mb-1">License Number</label>
        <input
          id="license_number"
          type="text"
          name="license_number"
          placeholder="License Number"
          value={formData.license_number}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Right Column: File Uploads */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">📎 Upload Documents</h3>

      <div>
        <label htmlFor="nic" className="block text-sm font-medium text-gray-600 mb-1">NIC (PDF or Image)</label>
        <input
          id="nic"
          type="file"
          name="nic"
          accept="image/*,application/pdf"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="license" className="block text-sm font-medium text-gray-600 mb-1">Driver's License</label>
        <input
          id="license"
          type="file"
          name="license"
          accept="image/*,application/pdf"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="police_clearance" className="block text-sm font-medium text-gray-600 mb-1">Police Clearance</label>
        <input
          id="police_clearance"
          type="file"
          name="police_clearance"
          accept="image/*,application/pdf"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="certifications" className="block text-sm font-medium text-gray-600 mb-1">Certifications</label>
        <input
          id="certifications"
          type="file"
          name="certifications"
          accept="image/*,application/pdf"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring focus:ring-blue-200"
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="md:col-span-2 text-right mt-8">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300"
      >
        ✅ Register Driver
      </button>
    </div>
  </form>
</div>












    </AuthenticatedLayout>
  );
}
