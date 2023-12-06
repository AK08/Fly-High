import React, { useState, useEffect, useRef } from "react";
import '../App.css'
import ClockIcon from '../assets/clock.png'
import CalenderIcon from '../assets/calendar.png'

const DatePicker = ({
    selectedFromDate,
    selectedToDate,
    onFromDateChange,
    onToDateChange,
    printconsole,
    showDatePicker,
    setShowDatePicker,
    selectedInput
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showLastOptions, setShowLastOptions] = useState(true);
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const datePickerRef = useRef(null);
    const blurTimeoutRef = useRef(null);

    const handleDateClick = (date) => {
        const formattedDate = formatDate(date);
        if (selectedInput === "from") {
            onFromDateChange(formattedDate);
        } else if (selectedInput === "to") {
            onToDateChange(formattedDate);
        }
        blurTimeoutRef.current = setTimeout(() => setShowDatePicker(false), 200);
        printconsole(formattedDate);
    };

    const handlePreviousMonthClick = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNextMonthClick = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const handlePreviousYearClick = () => {
        const newDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
        setCurrentDate(newDate);
    };

    const handleNextYearClick = () => {
        const newDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth());
        setCurrentDate(newDate);
    };

    const handleShowLastOptionsClick = () => {
        setShowLastOptions(!showLastOptions);
    };

    const handleLastOptionClick = (option) => {
        const now = new Date();
        const fromDate = new Date(now);
        const toDate = new Date(now);

        switch (option) {
            case "6h":
                fromDate.setHours(now.getHours() - 6);
                break;
            case "24h":
                fromDate.setDate(now.getDate() - 1);
                break;
            case "3d":
                fromDate.setDate(now.getDate() - 3);
                break;
            case "1w":
                fromDate.setDate(now.getDate() - 7);
                break;
            case "1m":
                fromDate.setMonth(now.getMonth() - 1);
                break;
            default:
                break;
        }

        onFromDateChange(formatDate(fromDate));
        onToDateChange(formatDate(toDate));
        setShowLastOptions(false);
    };

    const isDateInRange = (date) => {
        return (
            selectedFromDate &&
            selectedToDate &&
            date >= new Date(selectedFromDate) &&
            date <= new Date(selectedToDate)
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isInsideDatePicker =
                datePickerRef.current &&
                datePickerRef.current.contains(event.target);

            if (!isInsideDatePicker) {
                blurTimeoutRef.current = setTimeout(() => setShowDatePicker(false), 200);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            clearTimeout(blurTimeoutRef.current);
        };
    }, [datePickerRef, setShowDatePicker]);

    const handleHourChange = (e) => {
        const hours = parseInt(e.target.value, 10) || 0;
        setSelectedHours(hours > 23 ? 23 : hours);
    };

    const handleMinuteChange = (e) => {
        const minutes = parseInt(e.target.value, 10) || 0;
        setSelectedMinutes(minutes > 59 ? 59 : minutes);
    };
    
    const handleMonthChange = (event) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(event.target.value);
        setCurrentDate(newDate);
    };

    const handleYearChange = (event) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(event.target.value);
        setCurrentDate(newDate);
    };
    
    const renderCalendar = () => {
        const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

        const calendarBody = [];
        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 7; j++) {
                const date = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    i * 7 + j + 1
                );

                const isToday = date.toDateString() === new Date().toDateString();
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();

                const isInRange =
                    isDateInRange(date) && isCurrentMonth;

                const isSelected =
                    (selectedFromDate &&
                        formatDate(date) === formatDate(new Date(selectedFromDate))) ||
                    (selectedToDate &&
                        formatDate(date) === formatDate(new Date(selectedToDate)));

                const className = `calendar-cell ${isToday ? "today" : ""
                    } ${isInRange ? "in-range" : ""} ${isSelected ? "selected" : ""} ${isCurrentMonth ? "" : "outside-month"}`;

                row.push(
                    <td
                        key={date.toISOString()}
                        className={className}
                        onClick={() => handleDateClick(date)}
                    >
                        {date.getDate()}
                    </td>
                );
            }
            calendarBody.push(<tr key={i}>{row}</tr>);
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {days.map((day) => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{calendarBody}</tbody>
                </table>
                <div className="row-center" style={{ marginTop: '10px' }}>
                    <img src={ClockIcon} style={{ height: '17px', margin: '5px' }} />
                    <input
                        type="number"
                        placeholder="hh"
                        className="calenderTime-input"
                        value={selectedHours}
                        onChange={handleHourChange}
                    />
                    <input
                        type="number"
                        placeholder="mm"
                        className="calenderTime-input"
                        value={selectedMinutes}
                        onChange={handleMinuteChange}
                    />
                </div>
            </div>
        );
    };

    const renderLastOptions = () => {
        const options = ["6h", "24h", "3d", "1w", "1m"];

        return (
            <div className="last-options-container" style={{ padding: '10px', marginBottom: '40px' }}>
                <h4 style={{ color: 'rgb(100, 100, 100)' }} onClick={handleShowLastOptionsClick}>Show Last</h4>
                {showLastOptions && (
                    <ul style={{ display: 'flex', flexDirection: 'row' }}>
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleLastOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    const renderMonthNavigation = () => {
        if (showDatePicker) {
            return (
                <div className="DatePicker-fullcontainer" ref={datePickerRef}>
                    <div
                        className="month-navigation"
                        onMouseDown={() => clearTimeout(blurTimeoutRef.current)}
                    >
                        <button onClick={handlePreviousYearClick}>&lt;&lt;</button>
                        <button onClick={handlePreviousMonthClick}>&lt;</button>
                        

                        <select value={currentDate.getMonth()} onChange={handleMonthChange}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>

                        <select value={currentDate.getFullYear()} onChange={handleYearChange}>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={currentDate.getFullYear() - 5 + i}>
                                    {currentDate.getFullYear() - 5 + i}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleNextMonthClick}>&gt;</button>
                        <button onClick={handleNextYearClick}>&gt;&gt;</button>

                        <img src={CalenderIcon} style={{ height: '17px', marginLeft: '15px' }} />
                    </div>
                    {renderCalendar()}
                    {renderLastOptions()}
                </div>
            );
        }
        return null;
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = selectedHours.toString().padStart(2, '0');
        const minutes = selectedMinutes.toString().padStart(2, '0');
        return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year} | ${hours}:${minutes}`;
    };

    return (
        <div className="date-picker-container">
            {renderMonthNavigation()}
        </div>
    );
};

export default DatePicker;
