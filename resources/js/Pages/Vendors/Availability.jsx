
import { Link, usePage } from "@inertiajs/react";
import { BookImageIcon } from "lucide-react";
import React,{useState,useEffect} from "react";
import { useCalendarApp,ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import "./AvailabilityPicker.css";


const AvailableList = () => {

  const { customers = [] } = usePage().props;
  const [data, setData] = useState({ vendor_id: " " });


  // Calendar Setup
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-12-16",
        end: "2023-12-16",
      },
      // You can add dynamic events here if needed
    ],
    plugins: [eventsService],
  });

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className= "p-4">
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
                       <button type="button" className="px-4 py-2 bg-gray-300 rounded">Accept</button>
                      <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded">Reject</button>
                  </div>
                  </td>
                </tr>
                ))}
          </tbody>
        </table>
    </div> 

    <div className="bg-white p-3 rounded shadow-sm">
       <h4 className="mb-3">Calendar</h4>
       <ScheduleXCalendar calendarApp={calendar}/>
    </div>
    </div>  
      
  );
};

export default AvailableList;
