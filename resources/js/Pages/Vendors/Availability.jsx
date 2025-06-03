import { usePage ,router} from "@inertiajs/react";
import { BookImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import "./AvailabilityPicker.css";

const DateModal = ({ isOpen, onClose, onSave, selectedDate, onDescriptionChange}) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Selected Date</h2>
        <p>{selectedDate}</p>
        <input type="text"
         placeholder="Enter a description"
         onChange={(e) => onDescriptionChange(e.target.value)}
         className="border p-2 w-full mt-2"
         />
        {/* Add more inputs here if needed, like notes/description */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AvailableList = () => {
  const { customers = [], vendorId} = usePage().props;
  const [data, setData] = useState({ vendor_id:vendorId, description: "", });
  
  // 🚀 Add this to declare the state for selectedDate
  const [selectedDate, setSelectedDate] = useState(null);
  const[ isModalOpen,setIsModalOpen] = useState(false);

  const handleDescriptionChange = (description) => {
    SVGMetadataElement((prevData) => ({
     ...prevData,
       description,
  }));
 };

    const handleAccept = (vendorId) => {
      router.post(`/vendors/${vendorId}/accept`, {}, {
        onSuccess: () => {
          console.log("Accepted successfully!");
          // Optionally refresh the page or show a success message
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    };

    const handleReject = (vendorId) => {
      router.post(`/vendors/${vendorId}/reject`, {}, {
        onSuccess: () => {
          console.log("Rejected successfully!");
          // Optionally refresh the page or show a success message
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    };

  // Calendar Setup
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendar = useCalendarApp({
    views: [

      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [],
    plugins: [eventsService],
    callbacks: {
       dateClick: (info) => {
        const date = info.date || info.dateStr || info;
        setSelectedDate(date.toString());
        setIsModalOpen(true);
      },
    },
  });

  const saveSelectedDate = () => {
    if(!selectedDate) return;

    router.post("/vendors/{vendorId}/available_dates",{
       vendor_id : data.vendor_id,
       available_dates : selectedDate,
       description: data.description,
    });

    setIsModalOpen(false);
  };
 
  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className="p-4">
      <div className="table-responsive bg-white p-3 rounded shadow-sm mb-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Pick up location</th>
              <th>Date</th>
              <th>Vehicle Type</th>
              <th>Contact Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <th>{index + 1}</th>
                <td>{customer.user.name}</td>
                <td>{customer.pick_up_location}</td>
                <td>{customer.date}</td>
                <td>{customer.vehicle_type?.type}</td>
                <td>
                  {customer.user?.phone}
                  <br />
                  {customer.user?.email}
                </td>
                <td>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={() => handleAccept(customer.id)}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={() => handleReject(customer.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-3 rounded shadow-sm">
        <h4 className="mb-3">Calendar</h4>
        <ScheduleXCalendar calendarApp={calendar} />
       </div>

       <DateModal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        onSave={saveSelectedDate}
        selectedDate={selectedDate}
        onDescriptionChange={handleDescriptionChange}
        />
     </div>
  );
};

export default AvailableList;
