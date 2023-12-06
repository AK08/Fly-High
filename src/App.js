import React, { useState } from "react";
import DatePicker from "./components/Datepicker";

const App = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState(null);
    const [toValue, setToValue] = useState('Ernakulam');
    const [fromValue, setFromValue] = useState('Kozhikode');

    const handleFromDateFocus = () => {
        setSelectedInput("from");
        setIsDatePickerVisible(true);
    };

    const handleFromDateBlur = () => {
        setIsDatePickerVisible(false);
    };

    const handleToDateFocus = () => {
        setSelectedInput("to");
        setIsDatePickerVisible(true);
    };

    const handleToDateBlur = () => {
        setIsDatePickerVisible(false);
    };

    return (
        <div className='App'>
            <div className='header'>
                <nav>
                    <div className='logoname'>
                        <h1>Fly High</h1>
                    </div>

                    <div className="nav-links">
                        <ul>
                            <li><a href="#">Holiday Package</a></li>
                            <li><a href="#">Flight Schedule</a></li>
                            <li><a href="#">Account Setting</a></li>
                        </ul>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li><a href="./register.html">Register</a></li>
                            <li><a href="./signin.html">Sign In</a></li>
                        </ul>
                    </div>
                </nav>

                <div className="text-box">
                    <p className='tagline'>Hey Buddy! Where are you <br /><span style={{ fontWeight: 'bold' }}>Flying</span> to?</p>
                </div>
            </div>
            <div className='flight-box'>
                <div className='place'>
                    <h3>Departure</h3>
                    <input
                        type="text"
                        className='placestyle'
                        value={toValue}
                        onChange={(e) => setToValue(e.target.value)}
                    />
                    <p>Kerala, India</p>
                </div>
                <div className='place'>
                    <h3>Arrival</h3>
                    <input
                        type="text"
                        className='placestyle'
                        value={fromValue}
                        onChange={(e) => setFromValue(e.target.value)}
                    />
                    <p>Kerala, India</p>
                </div>
                <div className='place column-center'>
                    <div className="row-center">
                        <div className='half'>
                            <h3>From</h3>
                            <input
                                type="text"
                                value={fromDate}
                                onFocus={handleFromDateFocus}
                                onChange={(e) => setFromDate(e.target.value)}
                                placeholder="dd/mm/yyyy | hh:mm"
                            />
                        </div>
                        <div className='half'>
                            <h3>To</h3>
                            <input
                                type="text"
                                value={toDate}
                                onFocus={handleToDateFocus}
                                onChange={(e) => setToDate(e.target.value)}
                                placeholder="dd/mm/yyyy | hh:mm"
                            />
                        </div>
                    </div>
                    <button className="Search-button">Search Here <span className="right-arr">&rarr;</span></button>
                </div>
            </div>
            {isDatePickerVisible && (
                <DatePicker
                    selectedFromDate={fromDate}
                    selectedToDate={toDate}
                    onFromDateChange={(date) => setFromDate(date)}
                    onToDateChange={(date) => setToDate(date)}
                    printconsole={(date) => console.log("App.js Date: " + date)}
                    showDatePicker={isDatePickerVisible}
                    setShowDatePicker={setIsDatePickerVisible}
                    selectedInput={selectedInput}
                />
            )}
        </div>
    );
};

export default App;
