import React, { useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function VehicleCreate({ brands = [], bodyTypes = [] }) {
  const [formData, setFormData] = useState({
    model: '',
    vehicle_brand_id: '',
    manufracture: '',
    manufracture_year: '',
    register_year: '',
    vehicle_no: '',
    category: '',
    color: '',
    condition: '',
    ownership_type: '',
    passenger_capacity: '',
    currect_milage: '',
    description: '',
    insuarance_provider_name: '',
    insuarance_document: null,
    images: [],
    body_type: '',
    fuel_type: '',
    transmission_type: '',
    pickup_location: '',
    drop_off_policy: '',
    flight_fly_range_km: '',
    airport_name: '',
    port_of_operation: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'images') {
        const selectedImages = Array.from(files);
        setFormData({ ...formData, images: selectedImages });
        setImagePreviews(selectedImages.map(file => URL.createObjectURL(file)));
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file, index) => {
          form.append(`${key}[${index}]`, file);
        });
      } else {
        form.append(key, value);
      }
    });

    try {
      // Get CSRF cookie first
      await axios.get('/sanctum/csrf-cookie');

      // Submit form with multipart data
      await axios.post('/vendor/vehicles/store', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Vehicle registered successfully!');
      window.location.href = '/vendor/vehicles';

    } catch (error) {
      console.error('❌ Submission error:', error.response?.data || error.message);
      alert('❌ Failed to register vehicle.');
    }
  };

  return (


    <AuthenticatedLayout>
    <div className="min-h-screen bg-gray-500 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-gray-300 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">🚗 Register a New Vehicle</h1>
        <form onSubmit={handleSubmit} className="space-y-6">


            <div>
                <label className="block text-gray-700 font-semibold">Vehicle Brand</label>
                <select
                    name="vehicle_brand_id"
                    value={formData.vehicle_brand_id}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="">-- Select a Brand --</option>
                    {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                        {brand.name}
                    </option>
                    ))}
                </select>
            </div>

          {/* Vehicle Model */}
          <div>
            <label className="block text-gray-700 font-semibold">Vehicle Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* <div>
                <label className="block text-gray-700 font-semibold">Body Type</label>
                <select
                    name="vehicle_brand_id"
                    value={formData.body_type}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="">-- Select a Body Type --</option>
                    {bodyTypes.map((bodyType) => (
                    <option key={bodyType.id} value={bodyType.id}>
                        {bodyType.name}
                    </option>
                    ))}
                </select>
            </div> */}


          {/* Manufacturer */}
          <div>
            <label className="block text-gray-700 font-semibold">Manufacturer</label>
            <select
              name="manufracture"
              value={formData.manufracture}
              onChange={handleInputChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">-- Select --</option>
              <option>Toyota</option>
              <option>Nissan</option>
              <option>Mercedes</option>
              <option>Audi</option>
              <option>Mitsubishi</option>
              <option>Honda</option>
              <option>Subaru</option>
              <option>BMW</option>
              <option>Boeing</option>
              <option>Airbus</option>
              <option>Cessna</option>
              <option>Yamaha</option>
              <option>Mercury</option>
            </select>
          </div>

          {/* Manufacture Year & Register Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Manufacture Year</label>
              <input
                type="number"
                name="manufracture_year"
                value={formData.manufracture_year}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Register Year</label>
              <input
                type="number"
                name="register_year"
                value={formData.register_year}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Vehicle Number & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Vehicle Number</label>
              <input
                type="text"
                name="vehicle_no"
                value={formData.vehicle_no}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Vehicle Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">-- Select --</option>
                <option value="air">Air</option>
                <option value="land">Land</option>
                <option value="sea">Sea</option>
              </select>
            </div>
          </div>

          {/* Conditional Fields Based on Category */}
          {formData.category === 'land' && (
            <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-700">Land Vehicle Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
                <label className="block text-gray-700 font-semibold">Body Type</label>
                <select
                    name="body_type"
                    value={formData.body_type}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">-- Select a Brand --</option>
                    {bodyTypes.map((bodyType) => (
                    <option key={bodyType.id} value={bodyType.id}>
                        {bodyType.bodyType}
                    </option>
                    ))}
                </select>
            </div>

                {/* <div>
                  <label className="block text-gray-700 font-semibold">Body Type</label>
                  <select
                    name="body_type"
                    value={formData.body_type}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">-- Select --</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Van</option>
                    <option>Hatchback</option>
                    <option>Coupe</option>
                    <option>Convertible</option>
                  </select>
                </div> */}

                <div>
                  <label className="block text-gray-700 font-semibold">Fuel Type</label>
                  <select
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">-- Select --</option>
                    <option>Petrol 92</option>
                    <option>Petrol 95</option>
                    <option>Normal Diesel</option>
                    <option>Super Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                    <option>CNG</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold">Transmission Type</label>
                  <select
                    name="transmission_type"
                    value={formData.transmission_type}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">-- Select --</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                    <option>CVT</option>
                    <option>Triptonic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">Pickup Location</label>
                  <input
                    type="text"
                    name="pickup_location"
                    value={formData.pickup_location}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Drop-off Policy</label>

                <select
                    name="drop_off_policy"
                    value={formData.drop_off_policy}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">-- Select --</option>
                    <option>One-way</option>
                    <option>Return-trip</option>
                    <option>Drop-off only</option>
                    <option>Drop-off and Return-trip</option>
                </select>
              </div>
            </div>
          )}

          {formData.category === 'air' && (
            <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-700">Air Vehicle Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold">Flight Fly Range (km)</label>
                  <input
                    type="number"
                    name="flight_fly_range_km"
                    value={formData.flight_fly_range_km}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Maximum flight range in kilometers"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">Airport Name</label>
                  <input
                    type="text"
                    name="airport_name"
                    value={formData.airport_name}
                    onChange={handleInputChange}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Primary airport of operation"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.category === 'sea' && (
            <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-700">Sea Vehicle Details</h3>

              <div>
                <label className="block text-gray-700 font-semibold">Port of Operation</label>
                <input
                  type="text"
                  name="port_of_operation"
                  value={formData.port_of_operation}
                  onChange={handleInputChange}
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Primary port where the vessel operates"
                />
              </div>
            </div>
          )}

          {/* Color, Condition, Ownership */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Color</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">-- Select --</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Black</option>
                <option>White</option>
                <option>Green</option>
                <option>Yellow</option>
                <option>Silver</option>
                <option>Gray</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">-- Select --</option>
                <option value="AC">AC</option>
                <option value="Non AC">Non AC</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Ownership Type</label>
              <select
                name="ownership_type"
                value={formData.ownership_type}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">-- Select --</option>
                <option value="owned">Owned</option>
                <option value="leased">Leased</option>
                <option value="rented">Rented</option>
              </select>
            </div>
          </div>

          {/* Capacity & Milage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Passenger Capacity</label>
              <input
                type="number"
                name="passenger_capacity"
                value={formData.passenger_capacity}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Current Milage</label>
              <input
                type="number"
                name="currect_milage"
                value={formData.currect_milage}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Provide detailed description about the vehicle"
            />
          </div>

          {/* Insurance Fields */}
          <div>
            <label className="block text-gray-700 font-semibold">Insurance Provider Name</label>
            <input
              type="text"
              name="insuarance_provider_name"
              value={formData.insuarance_provider_name}
              onChange={handleInputChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Insurance Document</label>
            <input
              type="file"
              name="insuarance_document"
              required
              accept="application/pdf,image/*"
              onChange={handleInputChange}
              className="mt-1 w-full"
            />
          </div>

          {/* Image Upload (Interactive) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Vehicle Images <span className="text-sm text-gray-500">(You can select multiple)</span>
            </label>

            <div
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
              onClick={() => document.getElementById('image-upload-input').click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                setFormData(prev => ({ ...prev, images: files }));
                setImagePreviews(files.map(file => URL.createObjectURL(file)));
              }}
            >
              <p className="text-gray-600">📁 Drag & Drop images here or <span className="text-blue-600 underline">Click to upload</span></p>
              <input
                type="file"
                id="image-upload-input"
                name="images"
                accept="image/*"
                multiple
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded shadow-md" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md font-semibold"
            >
              ➕ Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
    </AuthenticatedLayout>
  );
}
