import React, { useState, useEffect } from 'react';

const EnhancedDateRangeCalendar = ({ bookings = [], bookedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  // Convert booked dates to a more usable format
  const [bookedDateRanges, setBookedDateRanges] = useState([]);

  useEffect(() => {
    // Process booked dates from props
    const processedDates = bookedDates.map(dateRange => ({
      start: new Date(dateRange.start),
      end: new Date(dateRange.end)
    }));
    setBookedDateRanges(processedDates);
  }, [bookedDates]);

  // Check if a date is already booked
  const isDateBooked = (date) => {
    return bookedDateRanges.some(range => {
      const checkDate = new Date(date);
      return checkDate >= range.start && checkDate <= range.end;
    });
  };

  // Check if a date range conflicts with existing bookings
  const hasConflictWithBookedDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return bookedDateRanges.some(bookedRange => {
      return (start <= bookedRange.end && end >= bookedRange.start);
    });
  };

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
    if (!date || isDateBooked(date)) return;

    setBookingStatus(null);

    if (!startDate || (startDate && endDate)) {
      setStartDate(new Date(date));
      setEndDate(null);
      setHoveredDate(null);
    } else {
      const start = new Date(startDate);
      const end = new Date(date);

      // Check for conflicts with booked dates
      const proposedStart = start <= end ? start : end;
      const proposedEnd = start <= end ? end : start;

      if (hasConflictWithBookedDates(proposedStart, proposedEnd)) {
        setBookingStatus({
          type: 'error',
          message: 'Selected date range conflicts with existing bookings. Please choose different dates.'
        });
        return;
      }

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
    if (startDate && !endDate && date && !isDateBooked(date)) {
      setHoveredDate(new Date(date));
    }
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

  const showSuccessMessage = (message, persistent = false) => {
    setBookingStatus({
      type: 'success',
      message: message,
      persistent: persistent,
      timestamp: new Date().toISOString()
    });
  };

  const showErrorMessage = (message, persistent = false) => {
    setBookingStatus({
      type: 'error',
      message: message,
      persistent: persistent,
      timestamp: new Date().toISOString()
    });
  };

  const handleBooking = async () => {
    if (!startDate) {
      showErrorMessage('Please select a start date to proceed with booking');
      return;
    }

    const effectiveEndDate = endDate || startDate;

    // Final check for conflicts
    if (hasConflictWithBookedDates(startDate, effectiveEndDate)) {
      showErrorMessage('Selected dates conflict with existing bookings.');
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (!csrfToken) {
      showErrorMessage('CSRF token not found. Please reload the page.', true);
      return;
    }

    setIsLoading(true);
    setBookingStatus(null);

    try {
      const bookingData = {
        start_date: formatDateForAPI(startDate),
        end_date: formatDateForAPI(effectiveEndDate),
        description: 'Driver Entered Booking',
        _token: csrfToken
      };

      const response = await fetch('/driver/date-range-booking-store', {
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
        const dateRange = endDate && !isSameDay(startDate, endDate)
          ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
          : startDate.toLocaleDateString();

        showSuccessMessage(
          `${result.message || 'Driver Booking created successfully!'}`
        );

        // Add the new booking to booked dates
        setBookedDateRanges(prev => [...prev, {
          start: new Date(startDate),
          end: new Date(effectiveEndDate)
        }]);

        // Reset form after successful booking
        setTimeout(() => {
          resetForm();
          // Optionally reload the page to get fresh data
          window.location.reload();
        }, 2000);

      } else if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(', ');
        showErrorMessage(errorMessages);
      } else {
        showErrorMessage(result.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      showErrorMessage('Network error. Please check your connection and try again.');
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
    if (!isDateBooked(today)) {
      setStartDate(today);
      setEndDate(today);
      setBookingStatus(null);
    } else {
      showErrorMessage('Today is already booked. Please select a different date.');
    }
  };

  const dismissMessage = () => {
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
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Driver Booking Calendar</h2>
        <p className="text-gray-600">Select your booking dates. Red dates are already booked.</p>
      </div>

      {/* Existing Bookings Summary */}
      {bookings && bookings.length > 0 && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Current Bookings ({bookings.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {bookings.slice(0, 6).map((booking, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">{booking.status}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {bookings.length > 6 && (
            <div className="text-center mt-3 text-sm text-gray-600">
              ... and {bookings.length - 6} more bookings
            </div>
          )}
        </div>
      )}

      {/* Status Messages */}
      {bookingStatus && (
        <div className={`border rounded-lg p-4 mb-6 transition-all duration-500 ease-in-out transform ${
          bookingStatus.type === 'success'
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800 shadow-green-100'
            : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-800 shadow-red-100'
        } shadow-lg`}>
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
              bookingStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <span className="text-white text-sm font-bold">
                {bookingStatus.type === 'success' ? '✓' : '!'}
              </span>
            </div>
            <div className="flex-1">
              <span className="font-semibold text-lg">{bookingStatus.message}</span>
              {bookingStatus.timestamp && (
                <div className="text-sm opacity-75 mt-1">
                  {new Date(bookingStatus.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
            <button
              onClick={dismissMessage}
              className={`ml-4 text-2xl font-bold transition-colors duration-200 ${
                bookingStatus.type === 'success'
                  ? 'text-green-600 hover:text-green-800'
                  : 'text-red-600 hover:text-red-800'
              }`}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Date Range Info */}
      {rangeInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 p-5 rounded-lg mb-6 border-l-4 border-blue-400 shadow-md">
          {rangeInfo.single ? (
            <div className="font-semibold text-lg">
              <span className="text-blue-600 font-bold">Selected Date:</span>
              <span className="ml-2 text-blue-800">
                {rangeInfo.single.toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-lg">
                <span className="font-bold text-blue-600">From:</span>
                <span className="ml-2 font-semibold">{rangeInfo.start.toLocaleDateString()}</span>
              </div>
              <div className="text-lg">
                <span className="font-bold text-blue-600">To:</span>
                <span className="ml-2 font-semibold">{rangeInfo.end.toLocaleDateString()}</span>
              </div>
              <div className="text-lg">
                <span className="font-bold text-blue-600">Duration:</span>
                <span className="ml-2 font-semibold text-blue-800">
                  {rangeInfo.days} day{rangeInfo.days !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-xl font-bold"
          aria-label="Previous month"
        >
          ←
        </button>
        <h3 className="text-2xl font-bold text-gray-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-xl font-bold"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-bold text-gray-700 py-3 text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-8" onMouseLeave={handleMouseLeave}>
        {days.map((date, index) => {
          if (!date) return <div key={index} className="h-14"></div>;

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date) || isInHoverRange(date);
          const isToday = isSameDay(date, new Date());
          const isPastDate = date < new Date().setHours(0, 0, 0, 0);
          const isBooked = isDateBooked(date);

          let className = "h-14 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 font-semibold text-lg relative ";

          if (isPastDate) {
            className += "text-gray-400 cursor-not-allowed opacity-50 ";
          } else if (isBooked) {
            className += "bg-red-500 text-white cursor-not-allowed shadow-md ";
          } else if (isStart || isEnd) {
            className += "bg-blue-600 text-white font-bold shadow-lg transform scale-110 ring-2 ring-blue-300 ";
          } else if (inRange) {
            className += "bg-blue-100 text-blue-800 shadow-md ";
          } else if (isToday) {
            className += "bg-yellow-100 text-gray-800 border-2 border-yellow-400 font-bold ";
          } else {
            className += "hover:bg-gray-100 hover:shadow-md hover:scale-105 ";
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => !isPastDate && !isBooked && handleDateClick(date)}
              onMouseEnter={() => !isPastDate && !isBooked && handleDateHover(date)}
              disabled={isPastDate || isBooked}
              title={isBooked ? "Already booked" : isPastDate ? "Past date" : ""}
            >
              {date.getDate()}
              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full opacity-75"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
          <span>Range</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <span>Available</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={resetSelection}
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
        >
          Clear Selection
        </button>

        <button
          onClick={resetForm}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
        >
          Reset All
        </button>

        <button
          onClick={setTodaySelection}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
        >
          Select Today
        </button>

        <button
          onClick={handleBooking}
          disabled={!startDate || isLoading || (startDate && endDate && hasConflictWithBookedDates(startDate, endDate))}
          className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 ${
            isLoading || !startDate || (startDate && endDate && hasConflictWithBookedDates(startDate, endDate))
              ? 'bg-gray-400 cursor-not-allowed text-gray-200'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Creating Booking...
            </span>
          ) : 'Create Booking'}
        </button>
      </div>
    </div>
  );
};

export default EnhancedDateRangeCalendar;
