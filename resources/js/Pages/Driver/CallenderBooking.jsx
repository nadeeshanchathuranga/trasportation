import React, { useState } from 'react';

const EnhancedDateRangeCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  const [userId, setUserId] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [description, setDescription] = useState('');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

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

  const isSameDay = (date1, date2) => {
    return date1 && date2 && date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date) => {
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  const isInHoverRange = (date) => {
    if (!startDate || !hoveredDate || endDate) return false;
    const [minDate, maxDate] = [startDate, hoveredDate].sort((a, b) => a - b);
    return date >= minDate && date <= maxDate;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setBookingStatus(null);

    if (!startDate || (startDate && endDate)) {
      setStartDate(new Date(date));
      setEndDate(null);
      setHoveredDate(null);
    } else if (startDate && !endDate) {
      const start = new Date(startDate);
      const end = new Date(date);
      if (end >= start) {
        setEndDate(end);
      } else {
        setEndDate(start);
        setStartDate(end);
      }
      setHoveredDate(null);
    }
  };

  const handleDateHover = (date) => {
    if (startDate && !endDate && date) setHoveredDate(new Date(date));
  };

  const handleMouseLeave = () => {
    if (startDate && !endDate) setHoveredDate(null);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const resetSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setHoveredDate(null);
    setBookingStatus(null);
  };

  const resetForm = () => {
    resetSelection();
    setUserId('');
    setPickupLocation('');
    setDescription('');
  };

  const handleBooking = async () => {
    if (!startDate || !userId.trim() || !pickupLocation.trim()) {
      setBookingStatus({ type: 'error', message: 'Please fill all required fields and select a date' });
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (!csrfToken) {
      setBookingStatus({ type: 'error', message: 'CSRF token not found. Please reload the page.' });
      return;
    }

    setIsLoading(true);
    setBookingStatus(null);

    try {
      const bookingData = {
        user_id: userId,
        pickup_location: pickupLocation,
        start_date: formatDateForAPI(startDate),
        end_date: endDate ? formatDateForAPI(endDate) : formatDateForAPI(startDate),
        description: description || null,
        _token: csrfToken
      };

      const response = await fetch('/date-range-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok) {
        setBookingStatus({ type: 'success', message: result.message || 'Booking created successfully!' });
        resetForm(); // Optionally clear form after success
      } else if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(', ');
        setBookingStatus({ type: 'error', message: errorMessages });
      } else {
        setBookingStatus({ type: 'error', message: result.message || 'Booking failed' });
      }
    } catch (error) {
      setBookingStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getDateRangeInfo = () => {
    if (!startDate) return null;
    if (!endDate) return { single: startDate };
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    return { start: startDate, end: endDate, days: diffDays };
  };

  const days = getDaysInMonth(currentMonth);
  const rangeInfo = getDateRangeInfo();

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Driver Booking Calendar</h2>

      {bookingStatus && (
        <div className={`border rounded-lg p-4 mb-4 ${bookingStatus.type === 'success'
          ? 'bg-green-50 border-green-300 text-green-800'
          : 'bg-red-50 border-red-300 text-red-800'}`}>
          {bookingStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">User ID <span className="text-red-500">*</span></label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
            className="w-full border rounded p-2" placeholder="Enter user ID" />
        </div>

        <div>
          <label className="block font-medium mb-1">Pickup Location <span className="text-red-500">*</span></label>
          <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full border rounded p-2" placeholder="Enter pickup location" />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Description (optional)</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2" placeholder="Enter description" />
        </div>
      </div>

      {rangeInfo && (
        <div className="bg-blue-50 text-blue-900 p-3 rounded mb-4 border border-blue-200">
          {rangeInfo.single ? (
            <div><strong>Selected Date:</strong> {rangeInfo.single.toLocaleDateString()}</div>
          ) : (
            <>
              <div><strong>From:</strong> {rangeInfo.start.toLocaleDateString()}</div>
              <div><strong>To:</strong> {rangeInfo.end.toLocaleDateString()}</div>
              <div><strong>Days:</strong> {rangeInfo.days}</div>
            </>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <button onClick={goToPreviousMonth}>←</button>
        <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={goToNextMonth}>→</button>
      </div>

      <div className="grid grid-cols-7 text-center font-medium mb-1">
        {daysOfWeek.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4" onMouseLeave={handleMouseLeave}>
        {days.map((date, index) => {
          if (!date) return <div key={index}></div>;

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date) || isInHoverRange(date);
          const isToday = isSameDay(date, new Date());

          let className = "h-10 flex items-center justify-center rounded cursor-pointer ";
          if (isStart || isEnd) className += "bg-blue-500 text-white font-semibold ";
          else if (inRange) className += "bg-blue-100 text-blue-800 ";
          else if (isToday) className += "bg-gray-200 text-gray-800 ";
          else className += "hover:bg-gray-100 ";

          return (
            <button
              key={index}
              aria-label={`Select ${date.toDateString()}`}
              className={className}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => handleDateHover(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={resetSelection} className="bg-gray-200 px-3 py-1 rounded">Clear Dates</button>
        <button onClick={resetForm} className="bg-gray-400 text-white px-3 py-1 rounded">Reset All</button>
        <button onClick={() => {
          const today = new Date();
          setStartDate(today);
          setEndDate(today);
        }} className="bg-purple-500 text-white px-3 py-1 rounded">Today</button>
        <button
          onClick={handleBooking}
          disabled={!startDate || !userId.trim() || !pickupLocation.trim() || isLoading}
          className={`px-4 py-2 rounded text-white ${isLoading || !startDate || !userId.trim() || !pickupLocation.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'}`}>
          {isLoading ? 'Creating...' : 'Create Booking'}
        </button>
      </div>
    </div>
  );
};

export default EnhancedDateRangeCalendar;
