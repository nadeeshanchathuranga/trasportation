import React, { useState, useEffect } from 'react';

const EnhancedDateRangeCalendar = ({ bookings = [], bookedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookedDateRanges, setBookedDateRanges] = useState([]);

  useEffect(() => {
    const processedDates = bookedDates.map(dateRange => ({
      start: new Date(dateRange.start),
      end: new Date(dateRange.end),
      status: dateRange.status,
    }));
    setBookedDateRanges(processedDates);
  }, [bookedDates]);

  const normalizeDate = (date) => date.toISOString().split('T')[0];

  const isDateBooked = (date) => {
    const checkDateStr = normalizeDate(date);
    return bookedDateRanges.some(range => {
      const startStr = normalizeDate(range.start);
      const endStr = normalizeDate(range.end);
      return checkDateStr >= startStr && checkDateStr <= endStr;
    });
  };

  const hasConflictWithBookedDates = (startDate, endDate) => {
    const startStr = normalizeDate(startDate);
    const endStr = normalizeDate(endDate);
    return bookedDateRanges.some(range => {
      const bookedStart = normalizeDate(range.start);
      const bookedEnd = normalizeDate(range.end);
      return startStr <= bookedEnd && endStr >= bookedStart;
    });
  };

  const isSameDay = (d1, d2) => d1 && d2 && normalizeDate(d1) === normalizeDate(d2);
  const isInRange = (date) => startDate && endDate && date >= startDate && date <= endDate;

  const isInHoverRange = (date) => {
    if (!startDate || !hoveredDate || endDate) return false;
    const [minDate, maxDate] = [startDate, hoveredDate].sort((a, b) => a - b);
    return date >= minDate && date <= maxDate;
  };

  const handleDateClick = (date) => {
    if (!date || isDateBooked(date)) return;
    setBookingStatus(null);

    if (!startDate || (startDate && endDate)) {
      setStartDate(new Date(date));
      setEndDate(null);
      setHoveredDate(null);
    } else {
      const start = new Date(startDate);
      const end = new Date(date);

      const proposedStart = start <= end ? start : end;
      const proposedEnd = start <= end ? end : start;

      if (hasConflictWithBookedDates(proposedStart, proposedEnd)) {
        setBookingStatus({
          type: 'error',
          message: 'Selected date range conflicts with existing bookings.',
        });
        return;
      }

      setStartDate(proposedStart);
      setEndDate(proposedEnd);
      setHoveredDate(null);
    }
  };

  const handleDateHover = (date) => {
    if (startDate && !endDate && date && !isDateBooked(date)) {
      setHoveredDate(new Date(date));
    }
  };

  const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleBooking = async () => {
    if (!startDate) {
      setBookingStatus({ type: 'error', message: 'Please select a start date.' });
      return;
    }

    const effectiveEndDate = endDate || startDate;

    if (hasConflictWithBookedDates(startDate, effectiveEndDate)) {
      setBookingStatus({ type: 'error', message: 'Conflict with existing bookings.' });
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (!csrfToken) {
      setBookingStatus({ type: 'error', message: 'CSRF token missing.' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/driver/date-range-booking-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          start_date: normalizeDate(startDate),
          end_date: normalizeDate(effectiveEndDate),
          description: 'Driver Entered Booking',
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setBookedDateRanges(prev => [...prev, {
          start: new Date(startDate),
          end: new Date(effectiveEndDate),
          status: 'confirmed',
        }]);
        setBookingStatus({ type: 'success', message: result.message || 'Booking successful!' });

        setTimeout(() => {
          setStartDate(null);
          setEndDate(null);
          setHoveredDate(null);
          window.location.reload();
        }, 2000);
      } else {
        setBookingStatus({ type: 'error', message: result.message || 'Booking failed.' });
      }
    } catch (err) {
      console.error(err);
      setBookingStatus({ type: 'error', message: 'Network error.' });
    } finally {
      setIsLoading(false);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth}>←</button>
        <h2 className="text-xl font-bold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button onClick={goToNextMonth}>→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2 font-semibold">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1" onMouseLeave={() => setHoveredDate(null)}>
        {days.map((date, index) => {
          if (!date) return <div key={index} className="h-12"></div>;

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date) || isInHoverRange(date);
          const isToday = isSameDay(date, new Date());
          const isPast = date < new Date().setHours(0, 0, 0, 0);
          const isBooked = isDateBooked(date);

          let className = "h-12 flex items-center justify-center rounded-lg transition text-sm ";

          if (isPast) {
            className += "bg-gray-100 text-gray-400 cursor-not-allowed";
          } else if (isBooked) {
            className += "bg-red-500 text-white cursor-not-allowed";
          } else if (isStart || isEnd) {
            className += "bg-blue-600 text-white font-bold";
          } else if (inRange) {
            className += "bg-blue-100 text-blue-700";
          } else if (isToday) {
            className += "border-2 border-yellow-400 text-yellow-700";
          } else {
            className += "hover:bg-gray-200 cursor-pointer";
          }

          return (
            <div
              key={index}
              title={isBooked ? "Already booked" : ""}
              className={className}
              onClick={() => !isPast && !isBooked && handleDateClick(date)}
              onMouseEnter={() => !isPast && !isBooked && handleDateHover(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {bookingStatus && (
        <div className={`mt-4 p-3 rounded ${bookingStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {bookingStatus.message}
        </div>
      )}

      <div className="mt-4 flex justify-center gap-4">
        <button onClick={handleBooking} disabled={isLoading || !startDate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
          {isLoading ? 'Processing...' : 'Create Booking'}
        </button>
        <button onClick={() => { setStartDate(null); setEndDate(null); setHoveredDate(null); }} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Clear
        </button>
      </div>
    </div>
  );
};

export default EnhancedDateRangeCalendar;
