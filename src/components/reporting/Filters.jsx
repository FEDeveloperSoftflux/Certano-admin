import React, { useState } from "react";
import Button from "@/components/common/Button";
import calendarIcon from "@/assets/icons/calender.svg";
import downloadIcon from "@/assets/icons/download.svg";

// Sample client data - replace with actual data in production
const clients = [
  { id: 1, name: "All Clients" },
  { id: 2, name: "TechCorp Inc" },
  { id: 3, name: "StartupXYZ" },
  { id: 4, name: "Enterprise Co" },
  { id: 5, name: "Local Business" },
];

const Filters = ({ onExportPDF }) => {
  const [selectedClient, setSelectedClient] = useState(clients[0].id);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleClientChange = (e) => {
    setSelectedClient(parseInt(e.target.value));
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleExportCSV = () => {
    // Implement CSV export functionality
    console.log("Exporting CSV...");
  };

  // Custom styled dropdown component
  const StyledDropdown = ({ options, value, onChange, className = "" }) => (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none bg-[#191919] border border-[#333] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  // Custom styled date input component
  const DateInput = ({ label, value, onChange, className = "" }) => (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img
          src={calendarIcon}
          alt="Calendar"
          className="w-4 h-4 text-gray-400"
        />
      </div>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 bg-[#191919] border border-[#333] text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
        placeholder={label}
      />
    </div>
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <StyledDropdown
          options={clients}
          value={selectedClient}
          onChange={handleClientChange}
          className="w-40"
        />

        <DateInput
          label="From Date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="w-42"
        />

        <DateInput
          label="To Date"
          value={toDate}
          onChange={handleToDateChange}
          className="w-42"
        />
      </div>

      {/* Export buttons styled to match Dashboard Monthly/Yearly buttons */}
      <div className="flex space-x-2 items-center justify-center">
        <Button
          variant="secondary"
          className="px-5 py-2 flex items-center justify-center space-x-2"
          onClick={handleExportCSV}
        >
          {/* Icon and text on a single line */}
          <span className="flex items-center space-x-2">
            <img
              src={downloadIcon}
              alt="Download"
              className="w-4 h-4 filter brightness-0 invert"
            />
            <span>Export CSV</span>
          </span>
        </Button>
        <Button
          variant="primary"
          className="px-5 py-2 text-black font-semibold bg-gradient-primary flex items-center justify-center space-x-2"
          onClick={onExportPDF}
        >
          {/* Icon and text on a single line */}
          <span className="flex items-center space-x-2">
            <img
              src={downloadIcon}
              alt="Download"
              className="w-4 h-4 filter brightness-0"
            />
            <span>Export PDF</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Filters;
