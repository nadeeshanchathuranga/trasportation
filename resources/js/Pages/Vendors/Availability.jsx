import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const AvailabilityPicker = ({ vendorId }) => {
    const [selectedDates, setSelectedDates] = useState([]);
  
    // Toggle date selection
    const handleDateChange = (date) => {
      const exists = selectedDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
  
      setSelectedDates((prev) =>
        exists
          ? prev.filter((d) => d.toDateString() !== date.toDateString())
          : [...prev, date]
      );
    };
  
    const handleSubmit = async () => {
      const formattedDates = selectedDates.map((d) =>
        d.toISOString().split('T')[0]
      );
  
      try {
        await axios.post( `/vendors/${vendorId}/available_dates`, {
          vendor_id: vendorId,
          available_dates: formattedDates,
        });
        alert('Availability updated!');
      } catch (err) {
        alert('Failed to save availability.');
        console.error(err);
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-4 rounded-xl shadow-md border bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Pick Your Available Dates</h2>
  
        <DatePicker
          inline
          onChange={handleDateChange}
          highlightDates={selectedDates}
          minDate={new Date()}
          placeholderText="Select dates"
        />
  
        {selectedDates.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Selected Dates:</h4>
            <ul className="list-disc list-inside text-sm">
              {selectedDates.map((date, i) => (
                <li key={i}>{date.toDateString()}</li>
              ))}
            </ul>
          </div>
        )}
  
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Save Availability
        </button>
      </div>
    );
  };

 export default AvailabilityPicker;
  
  