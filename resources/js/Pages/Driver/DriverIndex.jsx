import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function DriverRegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
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

    router.post('/driver-store', form, {
      forceFormData: true,
      onSuccess: () => {
        alert('✅ Driver registered successfully!');
        // Reset form state
        setFormData({
          name: '',
          email: '',
          phone: '',
          dob: '',
          address: '',
          nic: null,
          license: null,
          police_clearance: null,
          certifications: null,
        });

        // Clear file input fields manually
        document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
      },
      onError: () => {
        alert('❌ Failed to register. Please check your inputs.');
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Driver Registration</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
          {/* Left Column: Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              required
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              required
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              required
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />

            <input
              type="date"
              name="dob"
              value={formData.dob}
              required
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              required
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />
          </div>

          {/* Right Column: File Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Upload Documents</h3>

            <div>
              <label className="block font-medium mb-1">NIC (PDF or Image)</label>
              <input
                type="file"
                name="nic"
                accept="image/*,application/pdf"
                required
                className="w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Driver's License</label>
              <input
                type="file"
                name="license"
                accept="image/*,application/pdf"
                required
                className="w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Police Clearance</label>
              <input
                type="file"
                name="police_clearance"
                accept="image/*,application/pdf"
                required
                className="w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Certifications</label>
              <input
                type="file"
                name="certifications"
                accept="image/*,application/pdf"
                className="w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              ✅ Register Driver
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
