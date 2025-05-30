import React, { useState, useEffect } from 'react';

const EnhancedDateRangeCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);


  useEffect(() => {
  const sessionMessage = document.querySelector('meta[name="session-message"]')?.getAttribute('content');
  if (sessionMessage) {
    setBookingStatus({ type: 'success', message: sessionMessage });
    setTimeout(() => setBookingStatus(null), 5000);
  }
}, []);


  const formatDateForAPI = (date) => date.toISOString().split('T')[0];
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

  const isSameDay = (date1, date2) => date1 && date2 && date1.toDateString() === date2.toDateString();
  const isInRange = (date) => startDate && endDate && date >= startDate && date <= endDate;

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
    } else {
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

  const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const resetSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setHoveredDate(null);
    setBookingStatus(null);
  };

  const resetForm = () => {
    resetSelection();
  };

  const handleBooking = async () => {
    if (!startDate) {
      setBookingStatus({ type: 'error', message: 'Please select a start date to proceed with booking' });
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
        start_date: formatDateForAPI(startDate),
        end_date: endDate ? formatDateForAPI(endDate) : formatDateForAPI(startDate),
        description: 'Driver Entered Booking',
        _token: csrfToken
      };

      const response = await fetch('/date-range-booking-store', {
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
        setBookingStatus({
          type: 'success',
          message: result.message || 'Driver Booking created successfully!'
        });
        setTimeout(() => setBookingStatus(null), 5000);
        resetForm();
      } else if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(', ');
        setBookingStatus({ type: 'error', message: errorMessages });
      } else {
        setBookingStatus({ type: 'error', message: result.message || 'Booking failed. Please try again.' });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
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

  const setTodaySelection = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
    setBookingStatus(null);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = getDaysInMonth(currentMonth);
  const rangeInfo = getDateRangeInfo();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Driver Booking Calendar</h2>
      </div>

    {bookingStatus && (
  <div className={`border rounded-lg p-4 mb-6 transition-all duration-300 ${
    bookingStatus.type === 'success'
      ? 'bg-green-50 border-green-300 text-green-800 shadow-green-100'
      : 'bg-red-50 border-red-300 text-red-800 shadow-red-100'
  } shadow-md`}>
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded-full mr-3 ${bookingStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="font-medium">{bookingStatus.message}</span>
      <button onClick={() => setBookingStatus(null)} className="ml-auto text-gray-500 hover:text-gray-700">✕</button>
    </div>
  </div>
)}


      {rangeInfo && (
        <div className="bg-blue-50 text-blue-900 p-4 rounded-lg mb-6 border-l-4 border-blue-400 shadow-sm">
          {rangeInfo.single ? (
            <div className="font-semibold">
              <span className="text-blue-600">Selected Date:</span> {rangeInfo.single.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </div>
          ) : (
            <div className="space-y-1">
              <div><span className="font-semibold text-blue-600">From:</span> {rangeInfo.start.toLocaleDateString()}</div>
              <div><span className="font-semibold text-blue-600">To:</span> {rangeInfo.end.toLocaleDateString()}</div>
              <div><span className="font-semibold text-blue-600">Duration:</span> {rangeInfo.days} day{rangeInfo.days !== 1 ? 's' : ''}</div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Previous month">←</button>
        <h3 className="text-xl font-semibold text-gray-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={goToNextMonth} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Next month">→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6" onMouseLeave={handleMouseLeave}>
        {days.map((date, index) => {
          if (!date) return <div key={index} className="h-12"></div>;
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date) || isInHoverRange(date);
          const isToday = isSameDay(date, new Date());
          const isPastDate = date < new Date().setHours(0, 0, 0, 0);

          let className = "h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 font-medium ";
          if (isPastDate) {
            className += "text-gray-400 cursor-not-allowed ";
          } else if (isStart || isEnd) {
            className += "bg-blue-500 text-white font-bold shadow-md transform scale-105 ";
          } else if (inRange) {
            className += "bg-blue-100 text-blue-800 ";
          } else if (isToday) {
            className += "bg-gray-200 text-gray-800 border-2 border-gray-400 ";
          } else {
            className += "hover:bg-gray-100 hover:shadow-sm ";
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => !isPastDate && handleDateClick(date)}
              onMouseEnter={() => !isPastDate && handleDateHover(date)}
              disabled={isPastDate}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={resetSelection} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">Clear Dates</button>
        <button onClick={resetForm} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg">Reset All</button>
        <button onClick={setTodaySelection} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">Select Today</button>
        <button onClick={handleBooking} disabled={!startDate || isLoading} className={`px-6 py-2 rounded-lg font-semibold ${
          isLoading || !startDate ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
        }`}>
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Booking...
            </span>
          ) : 'Create Booking'}
        </button>
      </div>
    </div>
  );
};

export default EnhancedDateRangeCalendar;

