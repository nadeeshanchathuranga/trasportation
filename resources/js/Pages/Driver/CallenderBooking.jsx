
import React, { useState } from 'react';

const EnhancedDateRangeCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDateKey = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date) => {
    if (!startDate || !endDate || !date) return false;
    return date >= startDate && date <= endDate;
  };

  const isInHoverRange = (date) => {
    if (!startDate || !hoveredDate || !date || endDate) return false;
    const start = new Date(startDate);
    const end = new Date(hoveredDate);
    const minDate = start < end ? start : end;
    const maxDate = start < end ? end : start;
    return date >= minDate && date <= maxDate;
  };

  const handleDateClick = (date) => {
    if (!date) return;
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
    if (startDate && !endDate && date) {
      setHoveredDate(new Date(date));
    }
  };

  const handleMouseLeave = () => {
    if (startDate && !endDate) {
      setHoveredDate(null);
    }
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
  };

  const setPresetRange = (days) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days - 1) * 24 * 60 * 60 * 1000);
    setStartDate(today);
    setEndDate(futureDate);
    setHoveredDate(null);
  };

  const getDateRangeInfo = () => {
    if (!startDate) return null;
    if (!endDate) return { single: startDate };
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return { start: startDate, end: endDate, days: diffDays };
  };

  const days = getDaysInMonth(currentMonth);
  const rangeInfo = getDateRangeInfo();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Date Range Calendar</h2>
        {rangeInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-blue-800">
            {rangeInfo.single ? (
              <div>
                <strong>Selected Date:</strong> {rangeInfo.single.toLocaleDateString()}
              </div>
            ) : (
              <>
                <div><strong>Date Range:</strong></div>
                <div><strong>From:</strong> {rangeInfo.start.toLocaleDateString()}</div>
                <div><strong>To:</strong> {rangeInfo.end.toLocaleDateString()}</div>
                <div className="mt-2 text-sm bg-blue-100 inline-block px-2 py-1 rounded">
                  <strong>{rangeInfo.days}</strong> day{rangeInfo.days !== 1 ? 's' : ''} selected
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h3 className="text-lg font-semibold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-full">→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" onMouseLeave={handleMouseLeave}>
        {days.map((date, index) => {
          if (!date) return <div key={index} className="h-10"></div>;

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = isInRange(date) || isInHoverRange(date);
          const isToday = isSameDay(date, new Date());

          let className = "h-10 w-full flex items-center justify-center text-sm cursor-pointer transition-all duration-150 relative ";
          if (isStart || isEnd) className += "bg-blue-500 text-white font-semibold ";
          else if (inRange) className += "bg-blue-100 text-blue-800 ";
          else if (isToday) className += "bg-gray-200 font-semibold text-gray-800 ";
          else className += "hover:bg-gray-100 text-gray-700 ";
          className += "rounded";

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => handleDateHover(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <button onClick={resetSelection} className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Clear</button>

        <button onClick={() => {
          const today = new Date();
          setStartDate(today);
          setEndDate(today);
          setHoveredDate(null);
        }} className="px-4 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">Today</button>
      </div>

      <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        <strong>Instructions:</strong> Click a date to start selection, then click another date to complete the range. Hover to preview range.
      </div>
    </div>
  );
};

export default EnhancedDateRangeCalendar;
