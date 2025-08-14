import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const initialState = {
  model: '',
  manufacture: '',
  manufactureYear: '',
  registerYear: '',
  number: '',
  category: '',
  colour: '',
  images: [],
  condition: '',
  ownershipType: '',
  passengerCapacity: '',
  mileage: '',
  description: '',
  insuranceProvider: '',
  insuranceDocs: [],
  bodyType: '',
  fuelType: '',
  transmissionType: '',
  gears: '',
  seats: '',
  doors: '',
  fuelTankCapacity: '',
  rentalPricePerDay: '',
  totalRentalPrice: '',
  deposit: '',
  advancePayment: '',
  gps: false,
  childSeat: false,
  wifi: false,
  insuranceCoverage: false,
  extra: '',
};

const bodyTypeOptions = ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Van', 'Bus', 'Coupe', 'Convertible', 'Wagon', 'Other'];
const fuelTypeOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG', 'Other'];
const transmissionOptions = ['Manual', 'Automatic', 'Semi-Automatic', 'CVT', 'Other'];
const conditionOptions = ['New', 'Excellent', 'Good', 'Fair', 'Needs Repair'];
const ownershipTypeOptions = ['Owned', 'Financed', 'Leased', 'Rented'];
const categoryOptions = ['Land', 'Air', 'Sea'];

const AddUnit = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm((prev) => ({
        ...prev,
        [name]: files,
      }));
    } else if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'images' || key === 'insuranceDocs') {
        // Multiple files
        if (value && value.length) {
          for (let i = 0; i < value.length; i++) {
            data.append(`${key}[]`, value[i]);
          }
        }
      } else {
        data.append(key, value);
      }
    });

    Inertia.post('/vendor/vehicles/store', data, {
      forceFormData: true,
      onError: (err) => setErrors(err),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded mt-14 mb-16">
      <h1 className="text-2xl font-bold mb-6">Add New Vehicle Unit</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold mb-1">Vehicle Model</label>
            <input name="model" className="w-full border rounded px-3 py-2" value={form.model} onChange={handleChange} />
            {errors.model && <div className="text-red-600 text-xs">{errors.model}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Manufacture</label>
            <input name="manufacture" className="w-full border rounded px-3 py-2" value={form.manufacture} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Manufacture Year</label>
            <input type="number" name="manufactureYear" className="w-full border rounded px-3 py-2" value={form.manufactureYear} onChange={handleChange} min="1900" max="2100" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Register Year</label>
            <input type="number" name="registerYear" className="w-full border rounded px-3 py-2" value={form.registerYear} onChange={handleChange} min="1900" max="2100" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Number</label>
            <input name="number" className="w-full border rounded px-3 py-2" value={form.number} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Category</label>
            <select name="category" className="w-full border rounded px-3 py-2" value={form.category} onChange={handleChange}>
              <option value="">Select</option>
              {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Colour</label>
            <input type="color" name="colour" className="w-full border rounded px-3 py-2 h-10" value={form.colour} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Condition</label>
            <select name="condition" className="w-full border rounded px-3 py-2" value={form.condition} onChange={handleChange}>
              <option value="">Select</option>
              {conditionOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Ownership Type</label>
            <select name="ownershipType" className="w-full border rounded px-3 py-2" value={form.ownershipType} onChange={handleChange}>
              <option value="">Select</option>
              {ownershipTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Passenger Capacity</label>
            <input type="number" min="1" name="passengerCapacity" className="w-full border rounded px-3 py-2" value={form.passengerCapacity} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Current Mileage (km)</label>
            <input type="number" min="0" name="mileage" className="w-full border rounded px-3 py-2" value={form.mileage} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">Description</label>
            <textarea name="description" className="w-full border rounded px-3 py-2" value={form.description} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
          <div>
            <label className="block font-semibold mb-1">Vehicle Images</label>
            <input name="images" type="file" multiple accept="image/*" onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Insurance Provider Name</label>
            <input name="insuranceProvider" className="w-full border rounded px-3 py-2" value={form.insuranceProvider} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Insurance Documents</label>
            <input name="insuranceDocs" type="file" multiple onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Body Type – Land</label>
            <select name="bodyType" className="w-full border rounded px-3 py-2" value={form.bodyType} onChange={handleChange}>
              <option value="">Select</option>
              {bodyTypeOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Vehicle Fuel Type</label>
            <select name="fuelType" className="w-full border rounded px-3 py-2" value={form.fuelType} onChange={handleChange}>
              <option value="">Select</option>
              {fuelTypeOptions.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Transmission Type</label>
            <select name="transmissionType" className="w-full border rounded px-3 py-2" value={form.transmissionType} onChange={handleChange}>
              <option value="">Select</option>
              {transmissionOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Gear Count</label>
            <input type="number" name="gears" min="1" className="w-full border rounded px-3 py-2" value={form.gears} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Seat Count</label>
            <input type="number" name="seats" min="1" className="w-full border rounded px-3 py-2" value={form.seats} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Number of Doors</label>
            <input type="number" name="doors" min="1" className="w-full border rounded px-3 py-2" value={form.doors} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Fuel Tank Capacity (litres)</label>
            <input type="number" name="fuelTankCapacity" min="1" className="w-full border rounded px-3 py-2" value={form.fuelTankCapacity} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Rental Price Per Day ($)</label>
            <input type="number" name="rentalPricePerDay" min="0" className="w-full border rounded px-3 py-2" value={form.rentalPricePerDay} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Total Rental Price ($)</label>
            <input type="number" name="totalRentalPrice" min="0" className="w-full border rounded px-3 py-2" value={form.totalRentalPrice} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Deposit Amount ($)</label>
            <input type="number" name="deposit" min="0" className="w-full border rounded px-3 py-2" value={form.deposit} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Advance Payment ($)</label>
            <input type="number" name="advancePayment" min="0" className="w-full border rounded px-3 py-2" value={form.advancePayment} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Extras</label>
          <div className="flex gap-4 items-center flex-wrap">
            <label><input type="checkbox" name="gps" checked={form.gps} onChange={handleChange} /> GPS Navigation</label>
            <label><input type="checkbox" name="childSeat" checked={form.childSeat} onChange={handleChange} /> Child Seat</label>
            <label><input type="checkbox" name="wifi" checked={form.wifi} onChange={handleChange} /> Wi-fi</label>
            <label><input type="checkbox" name="insuranceCoverage" checked={form.insuranceCoverage} onChange={handleChange} /> Insurance Coverage</label>
            <input name="extra" className="border rounded px-3 py-2 ml-2" placeholder="Add more extras (text)" value={form.extra} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="mt-7 w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Add Vehicle Unit
        </button>
      </form>
    </div>
  );
};

export default AddUnit;
